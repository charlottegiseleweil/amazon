let n = 23;

let array_load_files = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22"
];
// array_load_files = Array(n).fill().map((e,i)=>'i+1');
console.log(array_load_files);
// topoLayer[1].addTo(map);
// topoLayer[12].addTo(map);
// topoLayer[17].addTo(map);
// array_load_files.push('Test');

function setFilterEvents() {
  document
    .getElementById("land-use-button")
    .addEventListener("click", handleLandUseButtonClick);
  document
    .getElementById("check-agriculture")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-water")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-swamp")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-floodable_forest")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-mountain_forest")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-non_floodable_forest")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-unpaved_roads")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-paved_roads")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-glacier")
    .addEventListener("click", handleCheckboxClick);
  // document.getElementById("check-pasture").addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-wetland")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-thicket")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-mining")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-andean_scrubland")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-grass")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-agriculture_grass")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-pasture_grass")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-rocky_ground")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-wet_savannah")
    .addEventListener("click", handleCheckboxClick);
  // document.getElementById("check-savannah").addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-naked_land")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-urban")
    .addEventListener("click", handleCheckboxClick);
  document
    .getElementById("check-secondary_vegetation")
    .addEventListener("click", handleCheckboxClick);
}

function handleCheckboxClick(event) {
  console.log("This is the event" + event);
  // console.log(event.id);
  // console.log(event.target.dataset.filter_id);
  // console.log(event.target.checked);
  // if  (event.target.checked === false)
  // {
  //     map.removeLayer(topoLayer[event.target.dataset.filter_id]);
  //     let index_rem = array_load_files.indexOf(event.target.dataset.filter_id);
  //     if (index_rem > -1) {
  //         array_load_files.splice(index_rem, 1);
  //         console.log("removing if false")
  //         console.log(array_load_files)
  //     }

  // }
  // if (array_load_files.length < 6 && event.target.checked === true )
  // if (array_load_files.length < 23)
  // {
  if (array_load_files.indexOf(event.target.dataset.filter_id) > -1) {
    console.log("Already exists!!!");
    map.removeLayer(topoLayer[event.target.dataset.filter_id]);
    index_rem = array_load_files.indexOf(event.target.dataset.filter_id);
    array_load_files.splice(index_rem, 1);
    //  document.querySelectorAll("[data-filter_id='"+ event.target.dataset.filter_id +"']")[0].checked = false;
    console.log(array_load_files);
  } else {
    array_load_files.push(event.target.dataset.filter_id);
    console.log("First Time adding! " + array_load_files);
    topoLayer[event.target.dataset.filter_id].addTo(map);
  }
  // }
  // else{

  //     if (array_load_files.indexOf(event.target.dataset.filter_id) > -1)
  //     {
  //         console.log("Already exists!!!")
  //          map.removeLayer(topoLayer[event.target.dataset.filter_id]);
  //          index_rem = array_load_files.indexOf(event.target.dataset.filter_id);
  //          array_load_files.splice(index_rem, 1);
  //         //  document.querySelectorAll("[data-filter_id='"+ event.target.dataset.filter_id +"']")[0].checked = false;
  //          console.log(array_load_files)
  //     }
  //     else
  //     {
  //         out = array_load_files.shift();
  //         document.querySelectorAll("[data-filter_id='"+ out +"']")[0].checked = false;
  //         map.removeLayer(topoLayer[out]);
  //         array_load_files.push(event.target.dataset.filter_id);
  //         topoLayer[event.target.dataset.filter_id].addTo(map);
  //         console.log(array_load_files)
  //     }

  // }
}

function handleLandUseButtonClick(event) {
  switch (document.getElementById("checkboxes-container").style.visibility) {
    case "visible":
      document.getElementById("checkboxes-container").style.visibility =
        "hidden";
      break;
    case "hidden":
      document.getElementById("checkboxes-container").style.visibility =
        "visible";
      break;
    default:
      document.getElementById("checkboxes-container").style.visibility =
        "hidden";
      break;
  }
}
