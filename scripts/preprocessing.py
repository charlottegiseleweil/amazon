#!/usr/bin/env python
import pandas as pd
import geojson
import shapefile

from pyproj import Proj, transform
from collections import Sequence
from itertools import chain, count


DATA_FOLDER = '../data'
SAVE_TO = 0
INTERVALS = ['1985-1993', '1993-2001', '2001-2009', '2009-2017']
SPLIT_POINTS = [1985, 1993, 2001, 2009, 2017]
COLUMNS = ['Area_ha', 'MiningType', 'Year', 'Sector', 'coords']
# ALL_INFO = True


def change_to_latlon(s):
    inproj = Proj(init='epsg:32719')
    outproj = Proj(init='epsg:4326')

    for index, point in enumerate(s.points):
        s.points[index] = transform(inproj, outproj, point[0], point[1])
    return s


def depth(seq):
    seq = iter(seq)
    try:
        for level in count():
            seq = chain([next(seq)], seq)
            seq = chain.from_iterable(s for s in seq if isinstance(s, Sequence))
    except StopIteration:
        return level


def read_shapefile(shp_path):
    """
    Read a shapefile into a Pandas dataframe with a 'coords' column holding
    the geometry information. This uses the pyshp package
    """

    # read file, parse out the records and shapes
    sf = shapefile.Reader(shp_path)
    fields = [x[0] for x in sf.fields][1:]
    records = sf.records()

    list_records = [record[0:] for record in records]

    shps = []

    for s in sf.shapes():
        coord = change_to_latlon(s).__geo_interface__['coordinates']
        coord_depth = depth(coord)

        if coord_depth == 4:
            shps.append(coord)
        else:
            shps.append([coord])

    # write into a dataframe
    df = pd.DataFrame(columns=fields, data=list_records)
    df = df.assign(coords=shps)

    return df


def pd_to_geojson(df, filename, geo_col, prop_cols):
    features = []
    insert_features = lambda x: features.append(
        geojson.Feature(geometry=geojson.MultiPolygon(x[geo_col]),
                        properties=x[prop_cols].to_dict()))

    df.apply(insert_features, axis=1)
    with open('{}.geojson'.format(filename), 'w', encoding='utf8') as fp:
        geojson.dump(geojson.FeatureCollection(features), fp, sort_keys=True, ensure_ascii=False)


def save(df, filename, geo_col=None, prop_cols=None):
    if SAVE_TO == 0:
        # Save to GeoJSON
        pd_to_geojson(df, filename, geo_col=geo_col, prop_cols=prop_cols)
    elif SAVE_TO == 1:
        df.to_csv('{data}/{file}'.format(data=DATA_FOLDER, file=filename), index=False)


# Load shp
mineria_df = read_shapefile('{data}/shp/{file}'.format(data=DATA_FOLDER, file='Def_min_1984_2017.shp'))

mineria_df['Year'] = mineria_df['Year'].astype(int)

print(mineria_df.describe())

mineria_df['Interval'] = pd.cut(mineria_df['Year'], bins=4, labels=INTERVALS)

for i, interval in enumerate(INTERVALS):
    mineria_interval = mineria_df[mineria_df['Interval'] == interval]
    mineria_interval_data = mineria_interval[COLUMNS]

    save(mineria_interval_data, '{data}/geojson/{file}'.format(data=DATA_FOLDER, file='mineria_{}'.format(interval)),
         geo_col='coords', prop_cols=COLUMNS[0:4])


# Last Years
for split in SPLIT_POINTS:
    last_year = mineria_df[mineria_df['Year'] == split][COLUMNS]
    
    save(last_year, '{data}/geojson/{file}'.format(data=DATA_FOLDER, file='mineria_{}'.format(split)),
         geo_col='coords', prop_cols=COLUMNS[0:4])

# AGG
all_year_agg = mineria_df.groupby(['Year', 'MiningType']).sum().reset_index()

last_years_agg = all_year_agg[all_year_agg['Year'].isin(SPLIT_POINTS)][['Year', 'MiningType', 'Area_ha']]

last_years_agg.to_csv('{data}/{file}'.format(data=DATA_FOLDER, file='mineria_splitagg.csv'), index=False)
