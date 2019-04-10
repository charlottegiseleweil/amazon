import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { classify, withState } from "../utilities.js";

export const radioButton = () => html`
  <button
    type="button"
    class="year-button"
    id="year-button-2015"
    onclick="switchYear(false)"
  >
    2015
  </button>
`;

export const radioInp = html`
  <div class="input-radio">
    <input
      type="radio"
      class="radio_btn"
      name="radio2"
      id="b_radio-1"
      value="1"
    />
    <label for="b_radio-3">Fossil Fuels</label>
  </div>
`;
