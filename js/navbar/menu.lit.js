import { killDefault, classFromProps } from "../utilities.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
import { link } from "./link.lit.js";
import { classMap } from "../../../node_modules/lit-html/directives/class-map.js";

// test onClick and OnHover commands in lit

//TODO: figure out positioning magic such that the element displays over others
// takes a list of links and displays them on hover
export const dropdown = props => {
  const { title, links, onClick, onHover } = props;
  return html`
    <div
      class=${classMap(
        classFromProps({ _baseStyle: ["dropdown", "bg-black"], ...props })
      )}
    >
      ${title}
      <div
        class=${classMap(
          classFromProps({
            _baseStyle: ["dropdown-content", "bg-black"],
            ...props
          })
        )}
      >
        ${links.map(l => link({ style: ["bg-black"], ...l }))}
      </div>
    </div>
  `;
};
