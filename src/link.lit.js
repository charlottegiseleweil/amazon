import { html } from "lit-html";
import { classFromProps, killDefault } from "./utilities.js";
import { classMap } from "lit-html/directives/class-map.js";

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
