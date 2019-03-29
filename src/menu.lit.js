import "../tachyons.min.csss";
import { killDefault, classFromProps } from "./utilities";
// test onClick and OnHover commands in lit

//TODO: figure out positioning magic such that the element displays over others
// takes a list of links and displays them on hover
export const dropdown = props => {
  const {
    title,
    links,
    onClick,
    onHover,
    style,
    _baseStyle = ["dropdown"]
  } = props;
  return html`
    <div
      on-hover=${onHover}
      on-click=${killDefault(onClick)}
      ${classFromProps(props)}
    >
      ${title}
      <div class="dropdown-content">
        ${links}
      </div>
    </div>
  `;
};
