const base_class = "nav-link w3-bar-item w3-button w3-hide-small w3-hover-grey nav-link".split(
  " "
);

export const link = props => {
  const {
    title,
    onClick,
    onHover = undefined,
    style = [],
    _baseStyle = base_class
  } = props;
  return html`
    <a
      href="#"
      ${classFromProps(props)}
      on-hover=${onHover}
      on-click=${killDefault(onClick)}
    >
      ${title}
    </a>
  `;
};
