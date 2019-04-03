let lastSecondLevelSelection;

function loadVisualization() {
    // console.log(document.getElementById('storyTelling').offsetWidth);
    //Width and height

    let w = document.getElementById("storyTelling").offsetWidth - 50;
    let h = 350;
    let padding = 35;

    //Tracks view state.  Possible values:
    // 0 = default (areas types)
    // 1 = areas (of one type)
    // 2 = areas (singular)
    let viewState = 0;

    //Tracks most recently viewed/clicked 'type'.  Possible values:
    //"Heavy_Machinery", "Single_Pumps" or undefined
    let viewType;

    let dataset, thisTypeDataset, xScale, yScale, xAxis, yAxis, area; //Empty, for now

    //For converting strings to Dates
    let parseTime = d3.timeParse("%Y-%m");

    //For converting Dates to strings
    let formatTime = d3.timeFormat("%Y");

    //Define key function, to be used when binding data
    let key = function (d) {
        return d.key;
    };

    //Set up stack methods
    let areaStack = d3.stack();
    let typeStack = d3.stack();

    let description;

    //Load in data
    // console.log(d3);
    d3.request("./assets/data/area.csv")
        .mimeType("text/csv")
        .get(function (response) {
            // DATA PARSING
            // Parse each row of the CSV into an array of string values
            let rows = d3.csvParseRows(response.responseText);
            // console.log(rows);

            // Make dataset an empty array, so we can start adding values
            dataset = [];

            // Loop once for each row of the CSV, starting at row 3,
            // since rows 0-2 contain only area info, not area values.
            for (let i = 2; i < rows.length; i++) {
                //Create a new object
                dataset[i - 2] = {
                    date: parseTime(rows[i][0]) //Make a new Date object for each year + month
                };

                //Loop once for each area in this row (i.e., for this date)
                for (let j = 1; j < rows[i].length; j++) {
                    let sector = rows[0][j];
                    let mining_type = rows[1][j];
                    let mining_type_sector = rows[1][j] + " " + rows[0][j]; //
                    let area_val = rows[i][j];
                    //If area value exists…
                    if (area_val) {
                        area_val = parseInt(area_val); //Convert from string to int
                    } else {
                        //Otherwise…
                        area_val = 0; //Set to zero
                    }

                    //Append a new object with data for this row
                    dataset[i - 2][mining_type_sector] = {
                        mining_type: mining_type,
                        sector: sector,
                        area_val: area_val
                    };
                }
            }

            // Log out the final state of dataset
            // console.log(dataset);

            //	TYPE DATA SERIES

            let typeDataset = [];

            //Loop once for each row of the CSV, starting at row 3,
            //since rows 0-2 contain only area info, not area values.
            for (let i = 2; i < rows.length; i++) {
                //Create a new object
                typeDataset[i - 2] = {
                    date: parseTime(rows[i][0]), //Make a new Date object for each year
                    Heavy_Machinery: 0,
                    Suction_Pumps: 0
                };

                //Loop once for each area in this row (i.e., for this date)
                for (let j = 1; j < rows[i].length; j++) {
                    let mining_type = rows[1][j]; //'Type' from 2 row in CSV
                    let area_val = rows[i][j]; //area value for this area

                    //If area value exists…
                    if (area_val) {
                        area_val = parseInt(area_val); //Convert from string to int
                    } else {
                        //Otherwise…
                        area_val = 0; //Set to zero
                    }

                    //Add area value to existing sum
                    typeDataset[i - 2][mining_type] += area_val;
                }
            }

            // Log out the final state of dataset
            // console.log(typeDataset);

            // STACKING

            //Tell stack function where to find the keys
            let types = ["Heavy_Machinery", "Suction_Pumps"];
            typeStack.keys(types);

            //Stack the data and log it out
            let typeSeries = typeStack(typeDataset);
            // console.log(typeSeries);

            //
            // MAKE THE CHART
            //

            //Create scale functions
            xScale = d3
                .scaleTime()
                .domain([
                    d3.min(dataset, function (d) {
                        return d.date;
                    }),
                    d3.max(dataset, function (d) {
                        return d.date;
                    })
                ])
                .range([padding, w - padding * 2.5]);

            yScale = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(typeDataset, function (d) {
                        let sum = 0;

                        //Loops once for each row, to calculate
                        //the total (sum) of sales of all areas
                        for (let i = 0; i < types.length; i++) {
                            sum += d[types[i]];
                        }

                        return sum;
                    })
                ])
                .range([h - padding, padding / 2])
                .nice();

            //Define axes
            xAxis = d3
                .axisBottom()
                .scale(xScale)
                .ticks(10)
                .tickFormat(formatTime);

            //Define Y axis
            yAxis = d3
                .axisRight()
                .scale(yScale)
                .ticks(5);

            //Define area generator
            area = d3
                .area()
                .x(function (d) {
                    return xScale(d.data.date);
                })
                .y0(function (d) {
                    return yScale(d[0]);
                })
                .y1(function (d) {
                    return yScale(d[1]);
                });

            //Create SVG element
            let svg = d3
                .select("#chartContainer")
                .append("svg")
                .attr("id", "svgMinerias")
                .attr("width", w)
                .attr("height", h);

            svg.append("g").attr("id", "Areas_ha");

            let showLeggend = function () {
                svg.append("text")
                    .attr("id", "types")
                    .selectAll("path")
                    .data(typeSeries, key)
                    .enter()
                    .append("path")
                    .attr("text-anchor", "middle") 
                    .attr(
                        "transform",
                        "translate(" + padding / 2 + "," + h / 2 + ")"
                    ) 
                    .text(function (d) {
                        // console.log(viewType);
                        return d.key;
                    });
            };

            //Create areas for TYPES
            svg.append("g")
                .attr("id", "types")
                .selectAll("path")
                .data(typeSeries, key)
                .enter()
                .append("path")
                .attr("class", "area")
                .attr("opacity", 1)
                .attr("d", area)
                .attr("fill", function (d) {
                    //Which type is this?
                    let thisType = d.key;
                    let type = d.key.normText();

                    //New color var
                    let color;

                    switch (type) {
                        case "heavymachinery":
                            color = COLORS['hm']['color'];
                            break;
                        case "suctionpumps":
                            color = COLORS['sp']['color'];
                            break;
                        default:
                            color = COLORS['hm']['color'];
                    }

                    return color;
                })
                .on("click", function (d) {
                    showLeggend();
                    //Update view state
                    viewState++;


                    let thisType = d.key;

                    // Update description
                    description.text(thisType.capitalize().replace("_", " "));

                    //Update this for later reference
                    viewType = thisType;

                    // Set the selection variables
                    let typeKey = thisType.match(/[A-Z]/g).join('').toLowerCase();
                    SELECTION[typeKey].categoryLevel = 2;
                    for (let key in SELECTION) {
                        if (key === typeKey) {
                            SELECTION[key].selected = true;
                            for (let sectorKey in SELECTION[key].sector) {
                                if (((key === 'hm' && sectorKey === 'pampa') || (key === 'sp' && sectorKey === 'huepetuhe')) ) {
                                    SELECTION[key].sector[sectorKey] = false;
                                } else {
                                SELECTION[key].sector[sectorKey] = true;
                                }
                            }
                        } else {
                            SELECTION[key].selected = false;
                            for (let sectorKey in SELECTION[key].sector) {
                                SELECTION[key].sector[sectorKey] = false;
                            }
                        }

                    }

                    updateButtonColors();

                    for (let mapLayer of topoLayer) {
                        mapLayer.eachLayer(handleLayer);
                    }
                    //this is for changing the text of the class on the html

                    for (let x of  document.getElementsByClassName(typeKey + '_text')) {
                        x.classList.add('active');
                    }


                    //Generate a new data set with all-zero values,
                    //except for this type's data
                    thisTypeDataset = [];

                    for (let i = 0; i < typeDataset.length; i++) {
                        thisTypeDataset[i] = {
                            date: typeDataset[i].date,
                            Heavy_Machinery: 0,
                            Suction_Pumps: 0,
                            [thisType]: typeDataset[i][thisType] //Overwrites the appropriate zero value above
                        };
                    }

                    // console.log(thisTypeDataset);

                    let thisTypeSeries = typeStack(thisTypeDataset);
                    // console.log(thisTypeSeries);

                    //Bind the new data set to paths, overwriting old bound data.
                    let paths = d3
                        .selectAll("#types path")
                        .data(thisTypeSeries, key)
                        .classed("unclickable", true);

                    let areaTransitions = paths
                        .transition()
                        .duration(1000)
                        .attr("d", area);

                    //Update scale
                    yScale.domain([
                        0,
                        d3.max(thisTypeDataset, function (d) {
                            let sum = 0;

                            //Calculate the total (sum) of sales of this type,
                            //ignoring the others (for now)
                            sum += d[thisType];

                            return sum;
                        })
                    ]);

                    //Append this transition to the one already in progress
                    //(from above).  Transition areas to newly updated scale.
                    areaTransitions
                        .transition()
                        .delay(200)
                        .on("start", function () {
                            //Transition axis to new scale concurrently
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                        })
                        .duration(1000)
                        .attr("d", area)
                        .transition()
                        .on("start", function () {
                            //Make areas visible instantly, so
                            //they are revealed when this fades out
                            d3.selectAll("g#Areas_ha path").attr("opacity", 1);
                        })
                        .duration(1000)
                        .attr("opacity", 0)
                        .on("end", function (d, i) {
                            //Reveal back button
                            if (i === 0) {
                                toggleBackButton();
                            }
                        });

                    //
                    // areas
                    //

                    //Get all possible keys (make + model), but toss out 'date'
                    let keysAll = Object.keys(dataset[0]).slice(1);
                    // console.log(keysAll);

                    //Loop once for each key, and save out just the ones of thisType
                    let keysOfThisType = [];
                    for (let i = 0; i < keysAll.length; i++) {
                        if (dataset[0][keysAll[i]].mining_type === thisType) {
                            keysOfThisType.push(keysAll[i]);
                        }
                    }
                    // console.log(keysOfThisType);

                    //Give the new keys to the stack function
                    areaStack
                        .keys(keysOfThisType)
                        .value(function value(d, key) {
                            return d[key].area_val;
                        });

                    //Stack the data and log it out
                    let areaSeries = areaStack(dataset);
                    // console.log(areaSeries);

                    //Create areas for individual areas
                    svg.select("g#Areas_ha")
                        .selectAll("path")
                        .data(areaSeries, key)
                        .enter()
                        .append("path")
                        .attr("class", "area")
                        .attr("opacity", 0)
                        .attr("d", area)
                        .attr("fill", function (d, i) {
                            //Which area is this?
                            let thisKey = d.key;

                            //What 'type' is this area?
                            let thisType = d[0].data[thisKey].mining_type;
                            let sector = d[0].data[thisKey].sector;
                            let color;
                            // console.log(thisType);

                            switch (thisType.normText()) {
                                case "heavymachinery":
                                    color = COLORS['hm']['sector'][sector.normText()];
                                    break;
                                case "suctionpumps":
                                    color = COLORS['sp']['sector'][sector.normText()];
                                    break;
                                default:
                                    color = COLORS['hm']['color'];
                            }

                            return color;
                        })
                        .on("click", function (d) {
                            showLeggend();

                            //Update view state
                            viewState++;

                            //Hide the back button during this view transition
                            toggleBackButton();

                            //Which area was clicked?
                            let thisType = d.key;

                            // Update description
                            description.text(
                                thisType.capitalize().replace("_", " ")
                            );

                            // Set the selection variables
                            let typeKey = thisType.substr(0, thisType.indexOf(" ")).match(/[A-Z]/g).join('').toLowerCase();
                            let sectorKey = thisType.substr(thisType.indexOf(" ") + 1).replace(" ", "").toLowerCase();
                            lastSecondLevelSelection = typeKey;
                            SELECTION[typeKey].categoryLevel = 2;
                            for (let key in SELECTION) {
                                if (key === typeKey) {
                                    SELECTION[key].selected = true;
                                    for (let secondKey in SELECTION[key].sector) {
                                        if (sectorKey === secondKey) {
                                            SELECTION[key].sector[secondKey] = true;
                                        } else {
                                            SELECTION[key].sector[secondKey] = false;
                                        }
                                    }
                                } else {
                                    SELECTION[key].selected = false;
                                    for (let secondKey in SELECTION[key].sector) {
                                        SELECTION[key].sector[secondKey] = false;
                                    }
                                }

                            }

                            updateButtonColors();

                            for (let mapLayer of topoLayer) {
                                mapLayer.eachLayer(handleLayer);
                            }

                            //Fade out all other areas
                            d3.selectAll("g#Areas_ha path")
                                .classed("unclickable", true) //Prevent future clicks
                                .filter(function (d) {
                                    //Filter out 'this' one
                                    if (d.key !== thisType) {
                                        return true;
                                    }
                                })
                                .transition()
                                .duration(1000)
                                .attr("opacity", 0);

                            //Define area generator that will be used just this one time
                            let singleArea_ha_Area = d3
                                .area()
                                .x(function (d) {
                                    return xScale(d.data.date);
                                })
                                .y0(function (d) {
                                    return yScale(0);
                                }) //Note zero baseline
                                .y1(function (d) {
                                    return yScale(d.data[thisType].area_val);
                                });
                            
                            //Use this new area generator to transition the area downward,
                            //to have a flat (zero) baseline.
                            let thisAreaTransition = d3
                                .select(this)
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("d", singleArea_ha_Area);

                            //Update y scale domain, based on the sales for this area only
                            yScale.domain([
                                0,
                                d3.max(dataset, function (d) {
                                    return d[thisType].area_val;
                                })
                            ]);

                            //Transitions the clicked area and y axis into place, to fit the new domain
                            thisAreaTransition
                                .transition()
                                .duration(1000)
                                .attr("d", singleArea_ha_Area)
                                .on("start", function () {
                                    //Transition axis to new scale concurrently
                                    d3.select("g.axis.y")
                                        .transition()
                                        .duration(1000)
                                        .call(yAxis);
                                })
                                .on("end", function () {
                                    //Restore clickability (is that a word?)
                                    d3.select(this).classed(
                                        "unclickable",
                                        "false"
                                    );

                                    //Reveal back button
                                    toggleBackButton();
                                });
                        })
                        // .on('mouseover', function (d) {
                        //     d3.select(this).attr('opacity', 0.85)
                        // })
                        // .on('mouseout', function (d) {
                        //     d3.select(this).attr('opacity', 1)
                        // })
                        .append("title") //Make tooltip
                        .text(function (d) {
                            return d.key.replace("_", " ");
                        });
                })
                .on('mouseover', function (d) {
                    d3.select(this).attr('opacity', 0.85)
                })
                .on('mouseout', function (d) {
                    d3.select(this).attr('opacity', 1)
                })
                .append("title") //Make tooltip
                .text(function (d) {
                    return d.key.replace("_", " ");
                });

            //Create axes
            svg.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            svg.append("text")
                .attr("transform", "translate(" + w / 2 + " ," + h + ")")
                .style("text-anchor", "middle")
                .text("Date");

            svg.append("g")
                .attr("class", "axis y")
                .attr("transform", "translate(" + (w - padding * 2.5) + ",0)")
                .call(yAxis);

            svg.append("text")
                .attr("text-anchor", "middle") 
                .attr(
                    "transform",
                    "translate(" +
                    (w - padding) +
                    "," +
                    h / 2 +
                    ")rotate(-90)"
                ) 
                .text("Area hm");

            // Add title
            description = svg
                .append("text")
                .attr("x", 20)
                .attr("y", h / 2)
                // .attr("text-anchor", "middle")
                .style("font-size", "14px");

            let transform =
                "translate(" +
                xScale.range()[0] +
                "," +
                yScale.range()[1] +
                ")";

            //Create back button
            let backButton = svg
                .append("g")
                .attr("id", "backButton")
                .attr("opacity", 0) //Initially hidden
                .classed("unclickable", true) //Initially not clickable
                .attr("transform", transform);

            backButton
                .append("rect")
                .attr("x", -15)
                .attr("y", 0)
                .attr("rx", 5)
                .attr("rx", 5)
                .attr("width", 70)
                .attr("height", 30);

            backButton
                .append("text")
                .attr("x", -8)
                .attr("y", 20)
                .html("&larr; Back");

            //Define click behavior
            backButton.on("click", function (a) {
                //Hide the back button, as it was just clicked
                toggleBackButton();

                if (viewState === 1) {
                    //Go back to default view

                    // Set the selection variables
                    SELECTION.hm.categoryLevel = 1;
                    SELECTION.sp.categoryLevel = 1;
                    for (let key in SELECTION) {
                        SELECTION[key].selected = true;
                        for (let sectorKey in SELECTION[key].sector) {
                            SELECTION[key].sector[sectorKey] = false;
                        }
                        for (let x of  document.getElementsByClassName(key + '_text')) {
                            x.classList.remove('active');
                        }
                    }

                    updateButtonColors();

                    for (let mapLayer of topoLayer) {
                        mapLayer.eachLayer(handleLayer);
                    }


                    // Update description
                    description.text("");

                    //Update view state
                    viewState--;

                    let typeAreaTransitions = d3
                        .selectAll("g#types path")
                        .data(typeSeries, key)
                        .transition()
                        .duration(250)
                        .attr("opacity", 1)
                        .on("end", function () {
                            //Remove all Areas_ha once this fades in;
                            //they will be recreated later as needed.
                            d3.selectAll("g#Areas_ha path").remove();
                        });

                    //Set y scale back to original domain
                    yScale.domain([
                        0,
                        d3.max(typeDataset, function (d) {
                            let sum = 0;

                            //Loops once for each row, to calculate
                            //the total (sum) of sales of all areas
                            for (let i = 0; i < types.length; i++) {
                                sum += d[types[i]];
                            }

                            return sum;
                        })
                    ]);

                    //Transition type areas and y scale back into place
                    typeAreaTransitions
                        .transition()
                        .duration(1000)
                        .on("start", function () {
                            //Transition axis to new scale concurrently
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                        })
                        .attr("d", area)
                        .on("end", function () {
                            d3.select(this).classed("unclickable", false);
                        });
                } else if (viewState === 2) {

                    // Set the selection variables
                    let typeKey = lastSecondLevelSelection;
                    SELECTION[typeKey].categoryLevel = 2;
                    for (let key in SELECTION) {
                        if (key === typeKey) {
                            SELECTION[key].selected = true;
                            for (let sectorKey in SELECTION[key].sector) {
                                if (((key === 'hm' && sectorKey === 'pampa') || (key === 'sp' && sectorKey === 'huepetuhe')) ) {
                                    SELECTION[key].sector[sectorKey] = false;
                                } else {
                                    SELECTION[key].sector[sectorKey] = true;
                                }
                            }
                        } else {
                            SELECTION[key].selected = false;
                            for (let sectorKey in SELECTION[key].sector) {
                                SELECTION[key].sector[sectorKey] = false;
                            }
                        }
                    }

                    updateButtonColors();

                    for (let mapLayer of topoLayer) {
                        mapLayer.eachLayer(handleLayer);
                    }

                    //Update view state
                    viewState--;

                    //Restore the old y scale
                    yScale.domain([
                        0,
                        d3.max(thisTypeDataset, function (d) {
                            let sum = 0;

                            //Calculate the total (sum) of sales of this type
                            sum += d[viewType];

                            return sum;
                        })
                    ]);

                    //Transition the y axis and visible area back into place
                    d3.selectAll("g#Areas_ha path")
                        .transition()
                        .on("start", function (d, i) {
                            description.text(
                                d.key
                                    .split(" ")[0]
                                    .capitalize()
                                    .replace("_", " ")
                            );

                            //Transition y axis
                            d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                        })
                        .duration(1000)
                        .attr("d", area) //changes only the selected area
                        .transition()
                        .duration(1000)
                        .attr("opacity", 1) //Fade in all areas
                        .on("end", function (d, i) {
                            //Restore clickability
                            d3.select(this).classed("unclickable", false);

                            //Reveal back button
                            if (i === 0) {
                                toggleBackButton();
                            }
                        });
                }
                
            });
        });

    let toggleBackButton = function () {
        //Select the button
        let backButton = d3.select("#backButton");

        //Is the button hidden right now?
        let hidden = backButton.classed("unclickable");

        //Decide whether to reveal or hide it
        if (hidden) {
            //Reveal it

            //Set up dynamic button text
            // let buttonText = "&larr; Return ";
            let buttonText = "&larr; Back ";
            
            //Set text
            backButton.select("text").html(buttonText);

            // Resize button depending on text width
            let rectWidth = Math.round(
                backButton
                    .select("text")
                    .node()
                    .getBBox().width + 16
            );

            if (
                rectWidth <
                document.getElementById("storyTelling").offsetWidth - 25
            ) {
                backButton.select("rect").attr("width", rectWidth);
            } else {
                backButton
                    .select("rect")
                    .attr(
                        "width",
                        document.getElementById("storyTelling").offsetWidth - 50
                    );
            }

            //Fade button in
            backButton
                .classed("unclickable", false)
                .transition()
                .duration(500)
                .attr("opacity", 1);
        } else {
            //Hide it
            backButton
                .classed("unclickable", true)
                .transition()
                .duration(200)
                .attr("opacity", 0);
        }
    };

    function wrap(text, width) {
        text.each(function () {
            let text = d3.select(this);
            let words = text
                .text()
                .split(/\s+/)
                .reverse();
            let word;
            let line = [];
            let lineNumber = 0;
            let lineHeight = 1.1; // ems
            let y = text.attr("y");
            let dy = parseFloat(text.attr("dy"));
            let tspan = text
                .text(null)
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", dy + "em");

            while ((word = words.pop())) {
                // Check this line to be functional
                line.push(word);
                tspan.text(line.join(" "));

                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text
                        .append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    }
}
