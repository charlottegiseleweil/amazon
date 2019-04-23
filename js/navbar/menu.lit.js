import { killDefault, classFromProps } from "../utilities.js";
import { html } from "../../lib/js/lit-html/lit-html.js";
import { link } from "../common/link.lit.js";
import { classMap } from "../../lib/js/lit-html/directives/class-map.js";

// test onClick and OnHover commands in lit

//TODO: figure out positioning magic such that the element displays over others
// takes a list of links and displays them on hover
export const dropdown = props => {
  const { title, links, onClick, onHover } = props;
  const classes = classFromProps({
    _baseStyle: ["dropdown", "bg-black"],
    ...props
  });

  return html`
    <div class=${classMap(classes)}>
      ${title}
      <div
        class=${classMap(
          classFromProps({
            _baseStyle: ["dropdown-content", "bg-black", "white"],
            ...props
          })
        )}
      >
        ${links.map(l =>
          link({ style: "bg-black white pb2 db".split(" "), ...l })
        )}
      </div>
    </div>
  `;
};
