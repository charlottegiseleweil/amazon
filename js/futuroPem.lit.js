import { control_panel } from "./control_panel/index.lit.js";
import { withState } from "./utilities.js";
import {
  tab_escenarios,
  tab_servicios,
  pickEscenario,
  tab_modelos
} from "../html/index.js";

const tabs = [
  { title: "servicios ecosistemicos", content: tab_servicios },
  { title: "modelos", content: tab_modelos },
  { title: "escenarios", content: tab_escenarios }
].map(({ title, content }, i) => ({
  onClick: setState => () => {
    setState({ content, selected: i });
  },
  title,
  content
}));

withState({ content: tabs[0].content, selected: 0 })(control_panel, { tabs })(
  document.getElementById("control_panel")
);
