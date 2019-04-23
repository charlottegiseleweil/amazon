// import { radioContainer } from "../mapController/controller.js";
// import { includeHTML } from "../lib/js/includehtml.js";
import { html } from "../lib/js/lit-html/lit-html.js";
import { control_panel } from "./control_panel/index.lit.js";
import { withState } from "./utilities.js";
import { servicios } from "../html/tab_servicios.js";
const tabs = [
  ["servicios ecosistemicos", servicios()],
  ["modelos", "Coming soon ... Metodologias etc y enlaces a InVEST"],
  [
    "escenarios",
    html`
      <img
        src="static/images/desarollando_escenarios.JPG"
        height="200px"
        alt="Img"
      />
      <p>Desarollando Escenarios</p>
      <img
        src="static/images/desarollando_escenarios1.JPG"
        height="200px"
        alt="Img"
      />
    `
  ]
].map(([title, displayContent], i) => ({
  onClick: (setState, state) => () => {
    setState({ displayContent, selected: i });
  },
  title,
  displayContent
}));

withState({ displayContent: tabs[0].displayContent, selected: 0 })(
  control_panel,
  {
    tabs
  }
)(document.getElementById("control_panel"));
