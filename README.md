# Natural Capital en la Amazonia ~ Visualizador (prototipo)
## The PRO-Agua project

* Building a community of practice that includes decision-makers, researchers, students, and decision-
makers, to achieve community-driven outcomes.
* Advancing scientific knowledge and adapting models and software tools to local conditions and priorities.
* Building a case for integrated watershed planning, by linking land management to water and other benefits that nature provides for people.
* Empowering decision makers who influence land use planning: leaders, practitioners, technical staff, and students.


## El Proyecto PRO-Agua
El Proyecto PRO-Agua tiene las siguientes metas compartidas:

* Construir una comunidad de práctica que incluye tomadores de decisión, investigadores, estudiantes y
representantes de la comunidad para lograr resultados relevantes para la gente local.
* Avanzar en el conocimiento científico adaptando herramientas para las condiciones y prioridades locales.
* Construir un caso para la planificación integrada de cuencas, al conectar el manejo del suelo con agua y otros beneficios que tiene la naturaleza para la gente.
* Empoderar a los tomadores de decisión que influyen en el ordenamiento territorial: líderes, personal técnico, estudiantes y otros actores clave.

## Preprocessing scripts you need to have PyShp, geojson, transform, MapShaper 
 - PyShp : https://github.com/GeospatialPython/pyshp
 - GeoJson : https://github.com/frewsxcv/python-geojson
 - PyProj : https://github.com/jswhit/pyproj 
 - MapShaper : https://github.com/mbloch/mapshaper
 - TopoJSON : https://github.com/topojson/topojson

```bash
python preprocessing.py
```
This will generate GeoJSON files from shp files on data folder in the root.
Then to simplify the spatial file an convert it to TopoJSON execute:
```bash
sh topojson.sh
```
