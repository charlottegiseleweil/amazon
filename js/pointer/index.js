const getNameForPixelValues = values =>
  values
    .map(getNameForPixelValue)
    .filter(x => x)
    .join("<br/>");

const getNameForPixelValue = pixel => {
  if (!pixel) {
    console.warn("pixel undefined");
    return undefined;
  }
  const [r, g, b, a] = pixel || [undefined, undefined, undefined, undefined];
  const colorMapFuturo = [
    [" ", 0, 0, 0, 0, 0],
    ["Bosque inundable", 1.0, 63, 143, 103, 255],
    ["Bosque no inundable ", 2.0, 15, 104, 55, 255],
    ["Vegetacion secundaria", 3.0, 51, 160, 44, 255],
    ["Humedales", 4.0, 112, 207, 204, 255],
    ["Sabana humedales", 5.0, 244, 223, 138, 255],
    // ["Sabana",6, ]
    // ["Herbazal",7, ]
    ["Pasto/Herbazal", 8.0, 253, 191, 111, 255],
    ["Pasto", 9.0, 253, 191, 111, 255],
    ["Pasto/Agricultura", 10.0, 253, 191, 189, 255],
    ["Agriculture", 11.0, 230, 160, 194, 255],
    ["Cuerpos de agua", 12.0, 165, 191, 221, 255],
    ["Urbano", 13.0, 197, 197, 193, 255],
    ["Mineria", 14.0, 255, 1, 1, 255],
    ["Suelo desnudo", 15.0, 241, 241, 225, 255],
    ["Aguajal", 16.0, 127, 216, 191, 255],
    ["Bosque montano", 17.0, 25, 78, 30, 255],
    ["Glaciar", 18.0, 254, 240, 231, 255],
    ["Matorral", 19.0, 178, 223, 138, 255],
    ["Pajonal andino", 20.0, 0, 255, 25, 255],
    ["Pedregales", 21.0, 186, 136, 226, 255],
    ["Carreteras no pavimentadas", 22.0, 201, 201, 201, 255],
    ["Carreteras pavimentadas", 23.0, 129, 129, 129, 255],
    ["Agroforesteria", 24.0, 199, 213, 0, 255],
    ["Silvopastoril", 25.0, 30, 255, 195, 255],
    ["Silvicultura", 26.0, 154, 30, 255, 255]
  ].reduce((agg, [title, id, r, g, b, a]) => {
    const key = `${r}:${g}:${b}:${a}`;
    agg[key] = { title, id };
    return agg;
  }, {});
  const key = `${r}:${g}:${b}:${a}`;

  return colorMapFuturo[key] && colorMapFuturo[key].title;
};

const handlers = inspectableMaps.map(map => [
  map.map,
  pixelValuesAtPoint(map, 256, ({ pixelValues, latlng: { lat, lng } }) => {
    return (document.getElementById(
      "mouse_tip"
    ).innerHTML = getNameForPixelValues(pixelValues));
  })
]);

handlers.forEach(([map, handler]) =>
  map.addEventListener("mousemove", handler)
);

document.addEventListener("mousemove", function(e) {
  document
    .getElementById("mouse_tip")
    .setAttribute("style", `left:${e.pageX + 5}px; top: ${e.pageY - 55}px;`);
});


/*

const getNameForPixelValues = values =>
  values
    .map(getNameForPixelValue)
    .filter(x => x)
    .join("<br/>");

const getNameForPixelValue = pixel => {
  if (!pixel) return undefined;
  const [r, g, b, a] = pixel || [undefined, undefined, undefined, undefined];
  const colorMapFuturo = [
    [" ", 0, 0, 0, 0, 0],
    ["Bosque inundable", 1.0, 63, 143, 103, 255],
    ["Bosque no inundable ", 2.0, 15, 104, 55, 255],
    ["Vegetacion secundaria", 3.0, 51, 160, 44, 255],
    ["Humedales", 4.0, 112, 207, 204, 255],
    ["Sabana humedales", 5.0, 244, 223, 138, 255],
    ["Pasto/Herbazal", 8.0, 253, 191, 111, 255],
    ["Pasto", 9.0, 253, 191, 111, 255],
    ["Pasto/Agricultura", 10.0, 253, 191, 189, 255],
    ["Agriculture", 11.0, 230, 160, 194, 255],
    ["Cuerpos de agua", 12.0, 165, 191, 221, 255],
    ["Urbano", 13.0, 197, 197, 193, 255],
    ["Mineria", 14.0, 255, 1, 1, 255],
    ["Suelo desnudo", 15.0, 241, 241, 225, 255],
    ["Aguajal", 16.0, 127, 216, 191, 255],
    ["Bosque montano", 17.0, 25, 78, 30, 255],
    ["Glaciar", 18.0, 254, 240, 231, 255],
    ["Matorral", 19.0, 178, 223, 138, 255],
    ["Pajonal andino", 20.0, 0, 255, 25, 255],
    ["Pedregales", 21.0, 186, 136, 226, 255],
    ["Carreteras no pavimentadas", 22.0, 201, 201, 201, 255],
    ["Carreteras pavimentadas", 23.0, 129, 129, 129, 255],
    ["Agroforesteria", 24.0, 199, 213, 0, 255],
    ["Silvopastoril", 25.0, 30, 255, 195, 255],
    ["Silvicultura", 26.0, 154, 30, 255, 255]
  ].reduce((agg, [title, id, r, g, b, a]) => {
    const key = `${r}:${g}:${b}:${a}`;
    agg[key] = { title, id };
    return agg;
  }, {});
  const key = `${r}:${g}:${b}:${a}`;

  return colorMapFuturo[key] && colorMapFuturo[key].title;
};

const callback = ({ pixelValues, latlng: { lat, lng } }) => {
  return (document.getElementById(
    "mouse_tip"
  ).innerHTML = getNameForPixelValues(pixelValues));
};

document.addEventListener("mousemove", e =>
  document
    .getElementById("mouse_tip")
    .setAttribute("style", `left:${e.pageX + 5}px; top: ${e.pageY - 55}px;`)
);

inspectableMaps.forEach(map => addPointerListenerToMap(map, callback));
*/
