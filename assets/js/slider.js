let years = ["1980","2000","2010","2016", "2019", "2035","2060"];


function createSlider() {
  let min_year, max_year, width, default_, tickvalues;
    min_year = years[0];
    max_year = years[6]
    width = 600;
    default_ = "2019";
    tickvalues = years;
  
  let slider = d3.sliderHorizontal()
    .min(min_year)
    .max(max_year)
    .step(50)
    .default(default_)
    .width(width)
    .tickValues(tickvalues)
    //.tickFormat(formatToData)
    .on("onchange", val => {
      console.log(val);
    });

  let group = d3.select(".map-slider").append("svg")
    .attr("width", 900)
    .attr("height", 70)
    .append("g")
    .attr("transform", "translate(" + 225 + "," + 12 + ")")
    .call(slider);
}






createSlider();


