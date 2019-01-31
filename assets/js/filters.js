function setFilterEvents() {
    document.getElementById("check-agriculture").addEventListener("click", handleCheckboxClick);

}

function handleCheckboxClick(event) {
    console.log(event);
    console.log(event.target.dataset);
}
