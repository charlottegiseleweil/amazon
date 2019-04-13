import { html } from "../lib/js/lit-html/lit-html.js";

const load_global = () => console.log("load_global");
const projection2D = () => console.log("projection2D");
const goto = (arg, filetype = ".html") => () =>
  (window.location.href = arg + filetype);
const show = arg => () => console.log("showing ", arg);

export const navbar = [
  //{ title: "Home", onClick: goto("index") },
  { title: "Reforestación de la Pampa", onClick: goto("pampa") },
  {
    title: "Desarollo futuro",
    links: [
      { title: "Region de Puerto Maldonado", onClick: goto("futuroPEM") },
      { title: "Region de Tahamanu-Cobija", onClick: goto("futuroTAH") }
    ]
  },
  {
    title: "Servicios ecosistemicos en Amazonía",
    links: [
      { title: "Region tri-nacional MAP", onClick: goto("MAP") },
      { title: "Todo el basin Amazonico", onClick: goto("amazonia") }
    ]
  },

  //{ title: "Todo el basin Amazonico", onClick: goto("methods_polli") },
  {
    title: html`
      &#9432;
    `,
    onClick: show("now"),
    style: ["fr"]
  },
  { title: "About", onClick: show("about"), style: ["fr"] }
];
