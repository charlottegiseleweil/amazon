import { html } from "../../lib/js/lit-html/lit-html.js";
import { classFromProps, killDefault } from "../utilities.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

export const link = ({
  title = undefined,
  content = undefined,
  onClick,
  onHover = undefined,
  style = [],
  _baseStyle = "link white hover-bg-dark-gray".split(" ")
}) => {
  console.log(classFromProps({ style, _baseStyle }), style, _baseStyle);

  return html`
    <a
      href="#"
      @click=${onClick}
      class=${classMap(classFromProps({ style, _baseStyle }))}
    >
      ${title} ${content}
    </a>
  `;
};
