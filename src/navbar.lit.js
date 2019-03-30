import { dropdown as menu } from "./menu.lit.js";
import { link } from "./link.js";
import { classFromProps } from "./utilities.js";
import { navbar as d_navbar } from "./menuData.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { classMap } from "../node_modules/lit-html/directives/class-map.js";
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
const navbar = props => {
  const { links = [], style = [], _baseStyle = ["white", "bg-black"] } = props;
  console.log(classFromProps({ style, _baseStyle }));

  return html`
    <div class=${classMap(classFromProps({ style, _baseStyle }))}>
      ${links.map(l => {
        return l.links ? menu(l) : link(l);
      })}
    </div>
  `;
};

render(navbar({ links: d_navbar }), document.getElementById("navbar"));
