# Amazonic Rain Forest Mining Activity

## Prerequites
In order to start the http server, you will need to have python installed.
Please follow the instuctions found in https://www.python.org/downloads/

To run preprocessing scripts you need to have PyShp, geojson, transform, MapShaper 
and topojson installed

You can follow the instructions on each github page:

 - PyShp : https://github.com/GeospatialPython/pyshp
 - GeoJson : https://github.com/frewsxcv/python-geojson
 - PyProj : https://github.com/jswhit/pyproj 
 - MapShaper : https://github.com/mbloch/mapshaper
 - TopoJSON : https://github.com/topojson/topojson

## Preprocessing
To run preprocessing scripts first you have to run the following commands:
```bash
python preprocessing.py
```
This will generate GeoJSON files from shp files on data folder in the root.
Then to simplify the spatial file an convert it to TopoJSON execute:
```bash
sh topojson.sh
```

## Starting the http server
You can start the http server by running the `start.sh` script.
In a console opened at the directory of the project files, run the following command
```bash
bash start.sh
```

Now open your web browser (preferably Google Chrome with a resolution of 1920x108p) 
and in the address bar enter: `localhost:8000`.



## Map Interactions

Use the buttons to filter mining activity data by mining type Mining activity has two types:

- Suction Pumps
- Heavy Machinery

Each mining type has its own group of sectors which can be:

- Delta
- Huepetuhe
- Small Mines
- Pampa

Those will be displayed as buttons above its mining type, try to use them to filter the map! Each combination of type and sector is using a different color for a better visualization.

Alongside this buttons, a slider is presented to display the evolution of mining types and sectors across the years Data available is from 1985 to 2017, slider uses 8 years interval to show map layers.

At the right side there is a storytelling content element where the user can scroll and watch the major insight of each interval. There are also a few animations and visualization charts linking maps with the storytelling, to make it easier to understand for any user.

## Contact

For any question or further information do not hesitate to contact us by our emails:
- Ariel Alba: ariel.albarios@epfl.ch
- Andrés Montero: andres.monterocassab@epfl.ch
- Elias Poroma: elias.poromawiri@epfl.ch