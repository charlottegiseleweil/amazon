import { dropdown as menu } from "./menu.lit.js";
import { link } from "../common/link.lit.js";
import { classFromProps } from "../utilities.js";
import { navbar as d_navbar } from "../menuData.js";
import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";
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

  return html`
    <div class=${classMap(classFromProps({ style, _baseStyle }))}>
      ${links
        .map(l => ({
          ...l,
          style: l.style ? [...l.style, "pa3"] : ["pa3"]
        }))
        .map(l => {
          return l.links ? menu(l) : link(l);
        })}
    </div>
  `;
};

html`
  <a href="" class=""></a>
`;

render(navbar({ links: d_navbar }), document.getElementById("navbar"));
