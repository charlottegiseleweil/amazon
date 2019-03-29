export const navbar = [
  { title: "Home", onclick: load_global },
  { title: "Reforestación de la Pampa", onclick: projection2D },
  { title: "Old desarollo futuro", onclick: goto("../viz_risk/poll_pop") },
  {
    title: "Desarollo futuro",
    links: [
      { title: "Region de Puerto Maldonado", onclick: goto("#") },
      { title: "Region de Tahamanu-Cobija", onclick: goto("#") }
    ]
  },
  {
    title: "Servicios ecosistemicos area MAP",
    onclick: goto("Pollination_historical")
  },
  { title: "Todo el basin Amazonico", onclick: goto("methods_polli") },
  { title: "&#9432;", onclick: show("now"), style: "fr" },
  { title: "About", onclick: show("about"), style: "fr" }
];
