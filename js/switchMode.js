
let modesLabels = {
    title: {
        "LU" : "Uso del suelo",
        "Hidrico" : "Índice de servicios hídricos",
        "Dengue": "Riesgo epidemiológico" //(Población) 
    },
    subtitle: {
      "LU" : "Ver los riesgos",//"Ver los servicios hídricos",
      "Hidrico" : "Ver el uso del suelo",
      "Dengue": "Ver el uso del suelo",

    },
    leyenda: {
        "LU" : "<div id='leyendaMin'><img src='static/images/leyenda.png' style='max-height:10vh;'alt='Leyenda' /></div><div id='leyendaIntegral'><img src='static/images/leyenda_integral.png' style='max-height:10vh;' alt='Leyenda' /></div>",
        "Hidrico" : "<img src='static/images/leyenda_IndiceHidrico.png' style='max-height:10vh;'alt='Leyenda' />",
        "Dengue": "<img src='static/images/leyenda_dengue.png' style='max-height:20vh;'alt='Leyenda' />",
    }
};

let modeIsLU = false;     // Default mode (not LU)
let scenario = 'Sost';    // Default scenario (SOST) -- actually embedded in UpdateMap2 fct.

   function switchMode(notLUmode){

    mode = ((modeIsLU==true) ? 'LU' : notLUmode);
    console.log("Mode is "+mode)

    // Change Title & legend contents
    document.getElementById('leyendaTitle').innerHTML = modesLabels["title"][mode];
    document.getElementById('leyendaContents').innerHTML = modesLabels["leyenda"][mode];

    document.getElementById('titulo').innerHTML = modesLabels["title"][mode];
    document.getElementById('changeButton').innerHTML = modesLabels["subtitle"][mode];

    // Update Maps
    updateMap1(mode)
    updateMap2(mode,scenario)

    modeIsLU = !modeIsLU;

};