import { menu, link } from "menu.lit.js";
import { classFromProps } from "./utilities";

/** link object {
  title,
  onClick,
  onHover = undefined,
  style = [],
  _baseStyle = base_class
} */
// takes a list of link and menu props. optionally nested 1 deep.
// recognizes an optional links_r for links to be displayed right
// to style, pass class names as a list
// to put links on the right, add them to the end of the list and include class fr
export const navbar = props => {
  const { links, style = [], _baseStyle = base_class } = props;
  return html`
    <div ${classFromProps(props)}>
      ${links.map(l => {
        l.links ? menu(l) : l;
      })}
    </div>
  `;
};
