export const killDefault = fx => e => {
  e.preventDefault();
  return fx(e);
};

export const classFromProps = ({ style, _baseStyle }) =>
  `class="${(_baseStyle + style).join(" ")}"`;
