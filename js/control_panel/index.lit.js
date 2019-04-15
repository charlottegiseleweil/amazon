import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { link } from "../common/link.lit.js";
import { navbar } from "../menuData.js";
import { classify, withState } from "../utilities.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

const tabContainerStyle = "bg-black br2 white flex justify-center avenir";
const tabStyle = (i, selected) =>
  "bt br pa3 bg-black fl tc ttc link bg-animate hover-bg-dark-gray pointer" +
  (i === 0 ? " bl" : "") +
  (i === selected ? "" : " bb");

export const control_panel = ({
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
    <div class="bg-black white pa3 justify-center avenir">
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
