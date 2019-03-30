import { html } from "../node_modules/lit-html/lit-html.js";
import { classFromProps, killDefault } from "./utilities.js";
import { classMap } from "../node_modules/lit-html/directives/class-map.js";

const base_class = "nav-link w3-bar-item w3-button w3-hide-small w3-hover-grey nav-link".split(
  " "
);

export const link = ({
  title,
  onClick,
  onHover = undefined,
  style = [],
  _baseStyle = base_class
}) => {
  return html`
    <a href="#" class=${classMap(classFromProps({ style, _baseStyle }))}>
      ${title}
    </a>
  `;
};
