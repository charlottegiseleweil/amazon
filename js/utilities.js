import { render as renderize } from "../../../node_modules/lit-html/lit-html.js";
export const capitalize = string => string[0].toUpperCase() + string.slice(1);
export const killDefault = fx => e => {
  e.preventDefault();
  return fx(e);
};

export const classFromProps = ({ style = [], _baseStyle = [] }) =>
  classify(_baseStyle.concat(style));

export const classify = (classList = []) => {
  const cl = typeof classList === "string" ? classList.split(" ") : classList;
  return cl.reduce((agg, cur) => {
    agg[cur] = true;
    return agg;
  }, {});
};

export const withState = (init = {}, name = "state") => (fx, props) => {
  let state = init;
  let component = fx;
  let root;

  function render() {
    root &&
      renderize(
        component({
          ...props,
          [name]: state,
          ["set" + capitalize(name)]: setState
        }),
        root
      );
  }

  const setState = newState => {
    Object.assign(state, newState);
    console.log(state);
    render();
  };

  return newRoot => {
    root = newRoot;
    render();
  };
};
