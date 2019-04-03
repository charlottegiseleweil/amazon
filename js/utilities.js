export const killDefault = fx => e => {
  e.preventDefault();
  return fx(e);
};

export const classFromProps = ({ style = [], _baseStyle = [] }) =>
  _baseStyle.concat(style).reduce((agg, cur) => {
    agg[cur] = true;
    return agg;
  }, {});
