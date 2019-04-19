import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { link } from "../common/link.lit.js";
import { navbar } from "../menuData.js";
import { classify, withState } from "../utilities.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

const tabContainerStyle = "br2 flex justify-center avenir";
const tabStyle = (i, selected) =>
  "bt br pa3 fl tc ttc link bg-animate hover-bg-dark-gray pointer bg-black-10 w-100" +
  (i === 0 ? " bl" : "") +
  (i === selected ? "" : " bb");

export const control_panel = ({
  tabs = [],
  state: { content, selected },
  setState
}) => {
  return html`
    <div class=${classMap(classify(tabContainerStyle))}>
      ${tabs.map((t, i) => {
        return html`
          <a
            @click=${t.onClick(setState, content)}
            class=${classMap(classify(tabStyle(i, selected)))}
          >
            <div>${t.title}</div>
          </a>
        `;
      })}
    </div>
    <div
      class="bg-black-10 pa3 justify-center avenir overflow-scroll measure vh-75"
    >
      ${content}
    </div>
  `;
};
