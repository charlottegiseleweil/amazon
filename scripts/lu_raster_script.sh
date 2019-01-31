#!/usr/bin/env bash

#install nodejs http://nodejs.org/
#install npm https://npmjs.org/doc/README.html
#run npm install -g topojson in your command prompt
# Install mapshaper and toposimplify

cd ../data/geojson/LU

# Grouping geojson
#for lu in LU_*
#do
#    echo "Grouping $lu ..."
#    mapshaper "$lu" -dissolve -o "grouped_$lu"
#done

#Simplifying geojson
for lu in LU_*
do
    echo "Simplifying geojson $lu ..."
    mapshaper "$lu"  -simplify resolution=1920x1080 -o "simplified_geo_$lu"
    #mapshaper grouped_mineria_2009-2017.geojson -simplify percentage=0.4 -o test.geojson
done

# Translate to topojson
for geo in simplified_geo_LU_*
do
    filename=`echo "$geo" | cut -d'.' -f1`
    echo "Translating $geo to topojson ..."
    geo2topo -o "../../topojson/LU/$filename.json" "$geo"
done

#for geo in grouped_LU_*
#do
#    filename=`echo "$geo" | cut -d'.' -f1`
#    echo "Translating $geo to topojson ..."
#    geo2topo -o "../../topojson/LU/$filename.json" "$geo"
#done

# Simplify topojson
cd ../../topojson/LU
for topo in *
do
    echo "Simplifying topo $topo ..."
    toposimplify -P 0.1 -o "simplified_topo_$topo" "$topo"
done

#LUcp simplified_topo_simplified_geo_* ../../assets/data/
