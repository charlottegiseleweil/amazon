const title_filter = [
  ["Agriculture", "0"],
  ["Grass", "14"],
  ["Agriculture Grass", "15"],
  ["Pasture Grass", "16"],
  ["Swamp", "2"],
  ["Mountain Forest", "4"],
  ["Non-Floodable Forest", "5"],
  ["Secondary Vegetation", "22"],
  ["Thicket", "11"],
  ["Andean Scrubland", "13"],
  ["Rocky Ground", "17"],
  ["Water", "1"],
  ["Glacier", "8"],
  ["Wetland", "10"],
  ["Wet Savannah", "19"],
  ["Floodable Forest", "3"],
  ["Mining", "12"],
  ["Unpaved Roads", "6"],
  ["Paved Roads", "7"],
  ["Naked Land", "20"],
  ["Urban", "21"]
];

export const checkbox = (title = "", filterId) => html`
  <label class="checkbox-container">
    ${title}
    <input
      id="check-${title.toLower().replace()}"
      type="checkbox"
      checked="true"
      data-filter_id="${filterId}"
    />
    <span class="checkmark round"></span>
  </label>
`;
