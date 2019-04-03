let COLORS = {
  hm: {
    color: "#013a90",
    sector: {
      delta: "#a56e00",
      huepetuhe: "#019bdd",
      smallmines: "#6868ac",
      pampa: "#013a90"
    }
  },
  sp: {
    color: "#bd0736",
    sector: {
      delta: "#d765d3",
      huepetuhe: "#bd0736",
      smallmines: "#ffa4d4",
      pampa: "#a494ff"
    }
  }
};
let SELECTION = {
  hm: {
    categoryLevel: 1,
    selected: true,
    sector: {
      delta: false,
      huepetuhe: false,
      smallmines: false,
      pampa: false
    }
  },
  sp: {
    categoryLevel: 1,
    selected: true,
    sector: {
      delta: false,
      huepetuhe: false,
      smallmines: false,
      pampa: false
    }
  }
};

let option1Selected = false;
let option2Selected = true;
let hmSelected = true;
let spSelected = true;
let sliderElement;
let firstLoad = true;
let topoLayer = [];
let map;
let resizeTimeout;
const introHeight = 800;
const blockHeight = 350;
let currentBlock = 0;
const highlights = [
  null,
  {
    lat: -70.466134,
    long: -13.033585,
    zoom: 13,
    year: 1985
  },
  {
    lat: -70.507609,
    long: -13.025237,
    zoom: 12,
    year: 1993
  },
  {
    lat: -69.583434,
    long: -12.68704,
    zoom: 12,
    year: 2001
  },
  {
    lat: -69.959516,
    long: -12.839984,
    zoom: 12,
    year: 2009
  },
  {
    lat: -69.605402,
    long: -12.77298,
    zoom: 9.5,
    year: 2017
  },
  {
    lat: -69.605402,
    long: -12.77298,
    zoom: 9.5,
    year: 2017
  }
];

window.onload = () => {
  const maxBounds = [
    [13.39029, -16.33247], //Southwest
    [-59.450451, -109.47493] //Northeast
  ];
  map = new L.map("map", {
    center: [-12.8, -69.5],
    zoom: 9,
    maxBounds: maxBounds,
    maxBoundsViscosity: 1.0,
    zoomSnap: 1,
    zoomDelta: 1,
    wheelPxPerZoomLevel: 150,
    attributionControl: false
  });
  const layerOptions = {
    maxZoom: 13,
    minZoom: 5
  };

  const customOption1 = L.Control.extend({
    options: {
      position: "bottomRight"
    },

    onAdd: function(map) {
      let container = L.DomUtil.get("option1");

      container.onclick = function() {
        if (hmSelected) {
          // let groups = document.getElementById('sectorBtnshm');
          // groups.style.opacity = '0';

          map._controlCorners.bottomRight.classList.remove("open-hm");
          document.getElementById("sectorBtnshm").remove();
          container.classList.remove("selected");
        } else {
          addSectorBtns(container, "hm");
          map._controlCorners.bottomRight.classList.add("open-hm");
          container.classList.add("selected");

          // let groups = document.getElementById('sectorBtnshm');
          // groups.style.opacity = '1';
        }

        hmSelected = !hmSelected;
        for (let x of document.getElementsByClassName("hm" + "_text")) {
          x.classList.remove("active");
        }

        // Update colors in the map
        sectorSelected = false;
        for (let key in SELECTION.hm.sector) {
          if (SELECTION.hm.sector[key]) {
            sectorSelected = true;
            break;
          }
        }
        SELECTION.hm.selected = spSelected;
        SELECTION.hm.categoryLevel = spSelected ? (sectorSelected ? 2 : 1) : 1;

        SELECTION.hm.selected = hmSelected;
        for (let mapLayer of topoLayer) {
          mapLayer.eachLayer(handleLayer);
        }
      };
      return container;
    }
  });

  const customOption2 = L.Control.extend({
    options: {
      position: "bottomRight"
    },

    onAdd: function(map) {
      let container = L.DomUtil.get("option2");

      container.onclick = () => {
        if (spSelected) {
          // let groups = document.getElementById('sectorBtnssp');
          // groups.style.opacity = '0';

          map._controlCorners.bottomRight.classList.remove("open-sp");
          document.getElementById("sectorBtnssp").remove();
          container.classList.remove("selected");
        } else {
          addSectorBtns(container, "sp");
          map._controlCorners.bottomRight.classList.add("open-sp");
          container.classList.add("selected");

          // let groups = document.getElementById('sectorBtnshm');
          // groups.style.opacity = '0';
        }

        for (let x of document.getElementsByClassName("sp" + "_text")) {
          x.classList.remove("active");
        }

        spSelected = !spSelected;
        // Update colors in the map
        sectorSelected = false;
        for (let key in SELECTION.sp.sector) {
          if (SELECTION.sp.sector[key]) {
            sectorSelected = true;
            break;
          }
        }
        SELECTION.sp.selected = spSelected;
        SELECTION.sp.categoryLevel = spSelected ? (sectorSelected ? 2 : 1) : 1;
        for (let mapLayer of topoLayer) {
          mapLayer.eachLayer(handleLayer);
        }
      };
      return container;
    }
  });

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    layerOptions
  ).addTo(map);

  let option1 = L.DomUtil.get("option1");
  let option2 = L.DomUtil.get("option2");

  const corners = map._controlCorners;
  const container = map._controlContainer;

  corners["bottomRight"] = L.DomUtil.create(
    "div",
    "leaflet-horizontal-right",
    container
  );
  map.addControl(new customOption1());
  map.addControl(new customOption2());

  addSectorBtns(option1, "hm");
  map._controlCorners.bottomRight.classList.add("open-hm");
  addSectorBtns(option2, "sp");
  map._controlCorners.bottomRight.classList.add("open-sp");

  L.TopoJSON = L.GeoJSON.extend({
    addData: function(jsonData) {
      if (jsonData.type === "Topology") {
        for (key in jsonData.objects) {
          geojson = topojson.feature(jsonData, jsonData.objects[key]);
          L.GeoJSON.prototype.addData.call(this, geojson);
        }
      } else {
        L.GeoJSON.prototype.addData.call(this, jsonData);
      }
    }
  });

  document
    .getElementById("storyTelling")
    .addEventListener("scroll", handleScroll);
  document.getElementById("back-to-top").addEventListener("click", goBackToTop);
  loadMapFiles();

  initializeSlider();
  loadVisualization();
  animateValue("value_counter_0", 0, 50, 1000);
};

function addSectorBtns(container, type) {
  let sectors = document.getElementById("sectorBtns").cloneNode(true);
  sectors.id = "sectorBtns" + type;

  let buttons = sectors.children;

  for (let button of buttons) {
    button.setAttribute("data-type", type);
  }

  container.parentNode.insertBefore(sectors, container);

  sectors.querySelectorAll(".button").forEach(function(button) {
    let sector = button.getAttribute("data-sector");
    if (
      (type === "hm" && sector === "pampa") ||
      (type === "sp" && sector === "huepetuhe")
    ) {
      button.classList.add("disabled");
    } else {
      button.addEventListener("click", sectorClkEvent);
      if (SELECTION[type].sector[sector]) {
        button.classList.add("selected");
      }
    }
  });
}

function sectorClkEvent() {
  if (this.classList.contains("selected")) {
    this.classList.remove("selected");
  } else {
    this.classList.add("selected");
  }

  let sector = this.getAttribute("data-sector");
  let type = this.getAttribute("data-type");
  console.log(type + " " + sector);
  for (let x of document.getElementsByClassName(type + "_text")) {
    x.classList.add("active");
  }

  // Update colors in the map
  SELECTION[type].categoryLevel = 2;
  SELECTION[type].sector[sector] = !SELECTION[type].sector[sector];
  goBackCategory = true;
  for (let key in SELECTION) {
    if (key === type) {
      for (let secondKey in SELECTION[key].sector) {
        if (SELECTION[key].sector[secondKey]) {
          goBackCategory = false;
          break;
        }
      }
    }
  }
  if (goBackCategory) {
    SELECTION[type].categoryLevel = 1;
    SELECTION[type].selected = true;
  }

  for (let mapLayer of topoLayer) {
    mapLayer.eachLayer(handleLayer);
  }
}

function readJsonFile(filename, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", filename, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function initializeSlider() {
  sliderElement = document.getElementById("slider");
  noUiSlider.create(sliderElement, {
    start: 2017,
    step: 8,
    range: {
      min: 1985,
      max: 2017
    },
    // For Scale
    pips: {
      mode: "count",
      values: 5,
      density: 100,
      format: wNumb({
        decimals: 0
      })
    }
  });
  sliderElement.noUiSlider.on("update", onSliderUpdate);
}

function onSliderUpdate(values) {
  if (firstLoad) {
    firstLoad = false;
  } else {
    const newValue = parseInt(values[0]);
    fileName = "";
    switch (newValue) {
      case 1985:
        topoLayer[0].addTo(map);
        // topoLayer[1].addTo(map);
        // topoLayer[2].addTo(map);
        // topoLayer[3].addTo(map);
        // topoLayer[4].addTo(map);
        // map.removeLayer(topoLayer[0]);
        map.removeLayer(topoLayer[1]);
        map.removeLayer(topoLayer[2]);
        map.removeLayer(topoLayer[3]);
        map.removeLayer(topoLayer[4]);
        break;
      case 1993:
        // topoLayer[0].addTo(map);
        topoLayer[1].addTo(map);
        // topoLayer[2].addTo(map);
        // topoLayer[3].addTo(map);
        // topoLayer[4].addTo(map);
        map.removeLayer(topoLayer[0]);
        // map.removeLayer(topoLayer[1]);
        map.removeLayer(topoLayer[2]);
        map.removeLayer(topoLayer[3]);
        map.removeLayer(topoLayer[4]);
        break;
      case 2001:
        // topoLayer[0].addTo(map);
        topoLayer[1].addTo(map);
        topoLayer[2].addTo(map);
        // topoLayer[3].addTo(map);
        // topoLayer[4].addTo(map);
        map.removeLayer(topoLayer[0]);
        // map.removeLayer(topoLayer[1]);
        // map.removeLayer(topoLayer[2]);
        map.removeLayer(topoLayer[3]);
        map.removeLayer(topoLayer[4]);
        break;
      case 2009:
        // topoLayer[0].addTo(map);
        topoLayer[1].addTo(map);
        topoLayer[2].addTo(map);
        topoLayer[3].addTo(map);
        // topoLayer[4].addTo(map);
        map.removeLayer(topoLayer[0]);
        // map.removeLayer(topoLayer[1]);
        // map.removeLayer(topoLayer[2]);
        // map.removeLayer(topoLayer[3]);
        map.removeLayer(topoLayer[4]);
        break;
      case 2017:
        // topoLayer[0].addTo(map);
        topoLayer[1].addTo(map);
        topoLayer[2].addTo(map);
        topoLayer[3].addTo(map);
        topoLayer[4].addTo(map);
        map.removeLayer(topoLayer[0]);
        // map.removeLayer(topoLayer[1]);
        // map.removeLayer(topoLayer[2]);
        // map.removeLayer(topoLayer[3]);
        // map.removeLayer(topoLayer[4]);
        break;
    }
  }
}

function loadMapFiles() {
  readJsonFile("data/V5/grouped_mineria_1985.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[0] = new L.TopoJSON();
    topoLayer[0].addData(data);
    topoLayer[0].eachLayer(handleLayer);
  });
  readJsonFile("data/V5/grouped_mineria_1985-1993.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[1] = new L.TopoJSON();
    topoLayer[1].addData(data);
    topoLayer[1].eachLayer(handleLayer);
    topoLayer[1].addTo(map);
  });
  readJsonFile(
    "data/simplified_topo_simplified_geo_grouped_mineria_1993-2001.json",
    function(text) {
      let data = JSON.parse(text);
      topoLayer[2] = new L.TopoJSON();
      topoLayer[2].addData(data);
      topoLayer[2].eachLayer(handleLayer);
      topoLayer[2].addTo(map);
    }
  );
  readJsonFile(
    "data/simplified_topo_simplified_geo_grouped_mineria_2001-2009.json",
    function(text) {
      let data = JSON.parse(text);
      topoLayer[3] = new L.TopoJSON();
      topoLayer[3].addData(data);
      topoLayer[3].eachLayer(handleLayer);
      topoLayer[3].addTo(map);
    }
  );
  readJsonFile(
    "data/simplified_topo_simplified_geo_grouped_mineria_2009-2017.json",
    function(text) {
      let data = JSON.parse(text);
      topoLayer[4] = new L.TopoJSON();
      topoLayer[4].addData(data);
      topoLayer[4].eachLayer(handleLayer);
      topoLayer[4].addTo(map);
    }
  );

  // readJsonFile("data/simplified_topo_simplified_geo_LU_Agua.json", function (text) {
  //     let data = JSON.parse(text);
  //     topoLayer[0] = new L.TopoJSON();
  //     topoLayer[0].addData(data);
  //     topoLayer[0].eachLayer(handleLayer);
  //     topoLayer[0].addTo(map);
  // });

  // readJsonFile("data/simplified_topo_simplified_geo_LU_Bosque_no_inundable.json", function (text) {
  //     let data = JSON.parse(text);
  //     topoLayer[1] = new L.TopoJSON();
  //     topoLayer[1].addData(data);
  //     topoLayer[1].eachLayer(handleLayer);
  //     topoLayer[1].addTo(map);
  // });
}

function updateButtonColors() {
  let sectorHm = document.getElementById("sectorBtnshm");
  let sectorSp = document.getElementById("sectorBtnssp");

  console.log(sectorHm);
  console.log(SELECTION.hm.selected);
  if (sectorHm && !SELECTION.hm.selected) {
    map._controlCorners.bottomRight.classList.remove("open-hm");
    document.getElementById("sectorBtnshm").remove();
  }
  if (!sectorHm && SELECTION.hm.selected) {
    addSectorBtns(L.DomUtil.get("option1"), "hm");
    map._controlCorners.bottomRight.classList.add("open-hm");
  }
  if (sectorSp && !SELECTION.sp.selected) {
    map._controlCorners.bottomRight.classList.remove("open-sp");
    document.getElementById("sectorBtnssp").remove();
  }
  if (!sectorSp && SELECTION.sp.selected) {
    addSectorBtns(L.DomUtil.get("option2"), "sp");
    map._controlCorners.bottomRight.classList.add("open-sp");
  }

  let buttons = document.querySelectorAll(".leaflet-horizontal-right .button");

  for (let button of buttons) {
    let sector = button.getAttribute("data-sector");
    let miningType = button.getAttribute("data-type");
    console.log(sector, "and", miningType);

    if (sector) {
      if (SELECTION[miningType]["sector"][sector]) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    } else {
      if (SELECTION[miningType].selected) {
        switch (miningType) {
          case "hm":
            document.getElementById("option1").classList.add("selected");
            hmSelected = true;
            break;
          case "sp":
            document.getElementById("option2").classList.add("selected");
            spSelected = true;
            break;
        }
      } else {
        switch (miningType) {
          case "hm":
            document.getElementById("option1").classList.remove("selected");
            hmSelected = false;
            break;
          case "sp":
            document.getElementById("option2").classList.remove("selected");
            spSelected = false;
            break;
        }
      }
    }
  }
}

function handleLayer(layer) {
  let miningType = (layer.feature.properties.MiningType || "hm").normText();
  let sector = (layer.feature.properties.Sector || "smallmines").normText();
  let colorOfLayer, fillOpacity;
  if (SELECTION[miningType].categoryLevel === 1) {
    colorOfLayer = COLORS[miningType].color;
    fillOpacity = SELECTION[miningType].selected ? 1 : 0;
  } else {
    colorOfLayer = COLORS[miningType]["sector"][sector];
    fillOpacity = SELECTION[miningType]["sector"][sector] ? 1 : 0;
  }
  layer.setStyle({
    color: colorOfLayer,
    // Uncomment this line to see only the ones with fillOpacity = 1
    fillOpacity: fillOpacity,
    weight: fillOpacity
  });
}

function handleScroll(event) {
  const scroll = event.srcElement.scrollTop;
  let blockScrolling = scroll - introHeight;

  if (
    scroll ===
    event.srcElement.scrollHeight - event.srcElement.clientHeight
  ) {
    blockScrolling = highlights.length - 1;
  } else {
    if (blockScrolling < 0) {
      blockScrolling = 0;
    } else {
      blockScrolling = parseInt(blockScrolling / blockHeight) + 1;
    }
  }
  blockScrolling = Math.min(blockScrolling, highlights.length - 1);
  if (blockScrolling !== currentBlock) {
    if (highlights[blockScrolling]) {
      // Move to the corresponding year
      sliderElement.noUiSlider.set(highlights[blockScrolling].year);
      switch (highlights[blockScrolling].year) {
        case 1985:
          animateValue("value_counter_11", 0, 1, 1000);
          animateValue("value_counter_12", 0, 1, 1000);
          break;
        case 1993:
          animateValue("value_counter_21", 0, 10, 1000);
          animateValue("value_counter_22", 0, 10, 1000);
          animateValue("value_counter_23", 0, 10, 1000);
          animateValue("value_counter_24", 0, 10, 1000);
          break;
        case 2001:
          animateValue("value_counter_31", 0, 1, 1000);
          animateValue("value_counter_32", 0, 4, 1000);
          animateValue("value_counter_33", 0, 1, 1000);
          animateValue("value_counter_34", 0, 10, 1000);
          break;
        case 2009:
          animateValue("value_counter_41", 0, 20, 1000);
          animateValue("value_counter_42", 0, 20, 1000);
          animateValue("value_counter_43", 0, 20, 1000);
          break;
        case 2017:
          animateValue("value_counter_51", 0, 100, 1000);
          animateValue("value_counter_52", 0, 90, 1000);
          break;
        default:
          console.log("animate default!!");

          break;
      }

      map.flyTo(
        [highlights[blockScrolling].long, highlights[blockScrolling].lat],
        highlights[blockScrolling].zoom,
        {
          animate: true,
          duration: highlights[blockScrolling].year === 1985 ? 1.2 : 2
        }
      );
    } else {
      animateValue("value_counter_0", 0, 100, 1000);
    }
    elements = document.getElementsByClassName("story-container");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("inFocus");
    }
    document
      .getElementById("container" + blockScrolling)
      .classList.add("inFocus");
    currentBlock = blockScrolling;
  }
}

function goBackToTop(event) {
  document.getElementById("storyTelling").scrollTop = 0;
}

function animateValue(id, start = 0, step = 1, duration = 2000) {
  let obj = document.getElementById(id);
  let end = parseFloat(obj.innerHTML);
  let range = end - start;
  let current = start;
  let increment = end > start ? step : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(function() {
    current += increment;
    obj.innerHTML = current;
    if (current >= end) {
      obj.innerHTML = end;
      clearInterval(timer);
    }
  }, stepTime);
}
