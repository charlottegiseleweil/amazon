import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { link } from "../common/link.lit.js";
import { navbar } from "../menuData.js";
import { classify, withState } from "../utilities.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

const tabs = [
  ["servicios ecosistemicos (Descargar Resultados)", "downloads and pdf"],
  ["modelos y metodologia", "eyes of peas, all black and white"],
  [
    "co-desarrollo de escenarios",
    html`
      <img src="static/pamp-icon.png" alt="eybals" />
    `
  ]
].map(([title, displayContent]) => ({
  onClick: (setState, state) => () => {
    setState({ displayContent });
  },
  title,
  displayContent
}));

const tabContainerStyle = "bg-black br2 white flex justify-center";
const tabStyle = i =>
  "bt bb br pa2 bg-black fl tc ttc link bg-animate hover-bg-dark-gray pointer" +
  (i === 0 ? " bl" : "");

const control_panel = ({
  tabs = [],
  state: { displayContent, isSelected },
  setState
}) => {
  console.log(displayContent);

  return html`
    <div class=${classMap(classify(tabContainerStyle))}>
      ${tabs.map((t, i) => {
        return html`
          <a
            @click=${t.onClick(setState, displayContent)}
            class=${classMap(classify(tabStyle(i)))}
          >
            <div>${t.title}</div>
          </a>
        `;
      })}
    </div>
    <div class="bg-black white pa3 flex justify-center">${displayContent}</div>
  `;
};

// (<div id="control_panel">
//   <div class="bg-black white flex justify-center">
//     <div class="br bt bb bl pa2 bg-black fl tc">
//       servicios ecosistemicos (Descargar Resultados)
//     </div>
//     <div class="bt bb br pa2 bg-black fl tc">modelos y metodologia</div>
//     <div class="bt bb br pa2 bg-black fl tc">co-desarrollo de escenarios</div>
//   </div>
//   <div class="bg-black white pa3 flex justify-center">
//     lot's of other content, like where to download data and so on
//   </div>
// </div>;)

withState({ displayContent: tabs[0].displayContent })(control_panel, {
  tabs
})(document.getElementById("control_panel"));
