#!/usr/bin/env bash

#install nodejs http://nodejs.org/
#install npm https://npmjs.org/doc/README.html
#run npm install -g topojson in your command prompt
# Install mapshaper and toposimplify

cd ../data/geojson

# Grouping geojson
for mineria in mineria_*
do
    echo "Grouping $mineria ..."
    mapshaper "$mineria" -dissolve MiningType,Sector -o "grouped_$mineria"
done

#Simplifying geojson
for mineria in grouped_*
do
    echo "Simplifying geojson $mineria ..."
    mapshaper "$mineria"  -simplify resolution=1920x1080 -o "simplified_geo_$mineria"
    #mapshaper grouped_mineria_2009-2017.geojson -simplify percentage=0.4 -o test.geojson
done

# Translate to topojson
for geo in simplified_geo_*
do
    filename=`echo "$geo" | cut -d'.' -f1`
    echo "Translating $geo to topojson ..."
    geo2topo -o "../topojson/$filename.json" "$geo"
done

for geo in grouped_*
do
    filename=`echo "$geo" | cut -d'.' -f1`
    echo "Translating $geo to topojson ..."
    geo2topo -o "../topojson/$filename.json" "$geo"
done

# Simplify topojson
cd ../topojson
for topo in *
do
    echo "Simplifying topo $topo ..."
    toposimplify -P 0.1 -o "simplified_topo_$topo" "$topo"
done

cp simplified_topo_simplified_geo_* ../../assets/data/
