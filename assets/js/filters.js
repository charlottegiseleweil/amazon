function setFilterEvents() {
    document.getElementById("land-use-button").addEventListener("click", handleLandUseButtonClick);
    document.getElementById("check-agriculture").addEventListener("click", handleCheckboxClick);

}

function handleCheckboxClick(event) {
    console.log(event);
    console.log(event.target.dataset);
}

function handleLandUseButtonClick(event) {
    switch (document.getElementById("checkboxes-container").style.visibility) {
        case "visible":
            document.getElementById("checkboxes-container").style.visibility = "hidden";
            break;
        case "hidden":
            document.getElementById("checkboxes-container").style.visibility = "visible";
            break;
        default:
            document.getElementById("checkboxes-container").style.visibility = "visible";
            break;
    }
}
