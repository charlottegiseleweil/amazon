const load_global = () => console.log("load_global");
const projection2D = () => console.log("projection2D");
const goto = arg => () => console.log("gotoing ", arg);
const show = arg => () => console.log("showing ", arg);

export const navbar = [
  { title: "Home", onClick: load_global },
  { title: "Reforestación de la Pampa", onClick: projection2D },
  { title: "Old desarollo futuro", onClick: goto("../viz_risk/poll_pop") },
  {
    title: "Desarollo futuro",
    links: [
      { title: "Region de Puerto Maldonado", onClick: goto("#") },
      { title: "Region de Tahamanu-Cobija", onClick: goto("#") }
    ]
  },
  {
    title: "Servicios ecosistemicos area MAP",
    onClick: goto("Pollination_historical")
  },
  { title: "Todo el basin Amazonico", onClick: goto("methods_polli") },
  { title: "&#9432;", onClick: show("now"), style: "fr" },
  { title: "About", onClick: show("about"), style: "fr" }
];
