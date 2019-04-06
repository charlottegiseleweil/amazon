import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { link } from "../common/link.lit.js";
import { navbar } from "../menuData.js";
import { classify, withState } from "../utilities.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

const tabs = [
  ["servicios ecosistemicos", "downloads and pdf"],
  ["modelos", "eyes of peas, all black and white"],
  [
    "escenarios",
    html`
      <img src="../../static/pamp-icon.png" alt="eyballs" />
    `
  ]
].map(([title, displayContent], i) => ({
  onClick: (setState, state) => () => {
    setState({ displayContent, selected: i });
  },
  title,
  displayContent
}));

const tabContainerStyle = "bg-black br2 white flex justify-center";
const tabStyle = (i, selected) =>
  "bt br pa3 bg-black fl tc ttc link bg-animate hover-bg-dark-gray pointer" +
  (i === 0 ? " bl" : "") +
  (i === selected ? "" : " bb");

const control_panel = ({
  tabs = [],
  state: { displayContent, selected },
  setState
}) => {
  return html`
    <div class=${classMap(classify(tabContainerStyle))}>
      ${tabs.map((t, i) => {
        return html`
          <a
            @click=${t.onClick(setState, displayContent)}
            class=${classMap(classify(tabStyle(i, selected)))}
          >
            <div>${t.title}</div>
          </a>
        `;
      })}
    </div>
    <div class="bg-black white pa3 flex justify-center">
      ${displayContent}
    </div>
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

withState({ displayContent: tabs[0].displayContent, selected: 0 })(
  control_panel,
  {
    tabs
  }
)(document.getElementById("control_panel"));
