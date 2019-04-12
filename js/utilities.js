import { render as renderize } from "../lib/js/lit-html/lit-html.js";
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
    render();
  };

  return newRoot => {
    root = newRoot;
    render();
  };
};

// any change to props triggers a re-render, can be memoized
// and old props can also be stored for merging
export const rerenderFactory = (component, root) => props => {
  renderize(component(props), root);
  return props;
};

//a subscription point gets all of the state
export const store = (init = {}) => {
  let state = init;
  let subscribers = [];

  const getState = () => state;

  const publish = () => {
    subscribers.forEach(subscription => subscription(state));
  };

  const subscribe = fx => {
    const id = subscribers.length;
    subscribers.push(fx);
    const unsubscribe = () => (subscribers[id] = undefined);
    return unsubscribe;
  };

  const update = (newState, path = undefined, silent = false, set = false) => {
    if (path) {
      const pathTokens = path.split(".");
      const last = pathTokens.slice(-1);
      const rest = pathTokens.slice(0, -1);
      const spot = rest.reduce((st, p) => st[p], state);
      spot[last] = newState;
    } else if (set) state = newState;
    else Object.assign(state, newState);

    !silent && publish();
    return state;
  };

  return { publish, subscribe, update, getState };
};
