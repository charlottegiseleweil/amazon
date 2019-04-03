import { html } from "../node_modules/lit-html/lit-html.js";
import { classFromProps, killDefault } from "./utilities.js";
import { classMap } from "../node_modules/lit-html/directives/class-map.js";

const base_class = "w3-button w3-hover-grey".split(" ");

export const link = ({
  title,
  onClick,
  onHover = undefined,
  style = [],
  _baseStyle = base_class
}) => {
  console.log(!!onClick);

  return html`
    <a
      href="#"
      @click=${onClick}
      class=${classMap(classFromProps({ style, _baseStyle }))}
    >
      ${title}
    </a>
  `;
};
