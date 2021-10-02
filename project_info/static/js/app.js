//Reference: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//Reference: https://github.com/ahop92/interactive-visualizations-challenge
function populateYears(yearList, userYear) {
  var yearMenu = d3.select("#selYear");
  yearMenu.html("");
  yearMenu
    .append("option")
    .attr("id", "selectedYearOption")
    .attr("disabled", true)
    .text(userYear);

  yearList.forEach((row) => {
    if (row != userYear) {
      yearMenu.append("option").text(row);
      // console.log(row);
    }
  });
}

function populateCounties(countyData, userCounty) {
  var countyMenu = d3.select("#selCounty");
  countyMenu.html("");
  countyMenu
    .append("option")
    .attr("id", "selectedCountyOption")
    .attr("disabled", true)
    .text(userCounty.toUpperCase());

  // console.log(countyData);

  countyData["countytotals"].forEach((row) => {
    if (row["countyname"] != userCounty) {
      countyMenu.append("option").text(row["countyname"].toUpperCase());
      // console.log(row);
    }
  });
}

//Reference: https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
function sortBy(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

function countyTotals(data_year) {
  county_totals = { countytotals: [] };
  all_county_names = [];
  all_county_CO2_vals = [];
  unique_counties = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_county_names.push(object["COUNTY NAME"]);
    all_county_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
  });

  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  all_county_names.forEach((county) => {
    if (!unique_counties.includes(county)) {
      unique_counties.push(county);
    }
  });

  // console.log(data_year);
  // console.log(unique_counties);
  // console.log(all_county_names);
  // console.log(all_county_CO2_vals);

  //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  unique_counties.sort();
  j = 0;
  unique_counties.forEach((county) => {
    // console.log(`Iteration for ${county}`);
    i = 0;
    emissions_total = 0;

    all_county_names.forEach((currentname) => {
      // console.log(`Current name is: ${currentname}`);
      if (currentname === county) {
        i = all_county_names.indexOf(county, i);
        // console.log(`Name match at ${county} and ${currentname}`);
        // console.log(`Index of current ${currentname} is ${i}`);
        emissions_total = emissions_total + all_county_CO2_vals[i];
        i = i + 1;
      }
    });

    // Reference: https://www.jsdiaries.com/how-to-add-an-array-element-to-json-object-in-javascript/
    unique_values.push(emissions_total);
    county_totals["countytotals"].push({
      countyname: `${unique_counties[j]}`,
      co2total: unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_counties);
  // console.log(all_county_CO2_vals);
  // console.log(county_totals);
  // console.log(county_totals instanceof Object);
  // console.log(county_totals["countytotals"].sort(sortBy("co2total")));
  county_totals["countytotals"] = county_totals["countytotals"].sort(
    sortBy("co2total")
  );
  return county_totals;
}

function parentTotals(data_year) {
  parent_totals = { parenttotals: [] };
  all_parent_names = [];
  all_parent_CO2_vals = [];
  all_parent_counties = [];
  all_facility_names = [];
  unique_parents = [];
  unique_parent_counties = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_parent_names.push(object["PARENT COMPANIES"]);
    all_parent_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
    all_parent_counties.push(object["COUNTY NAME"]);
  });

  // console.log(all_parent_names);
  // console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  i = 0;
  all_parent_names.forEach((parent) => {
    // console.log(`Iteration for ${parent}`);
    if (!unique_parents.includes(parent)) {
      unique_parents.push(parent);
      // console.log(parent);
      i = all_parent_names.indexOf(parent, i);
      unique_parent_counties.push(all_parent_counties[i]);
      // console.log(all_parent_counties[i]);
      i = i + 1;
    }
  });

  // console.log(unique_parents);
  // console.log(unique_parent_counties);

  //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  j = 0;
  unique_parents.forEach((parent) => {
    // console.log(`Iteration for ${parent}`);
    i = 0;
    emissions_total = 0;

    all_parent_names.forEach((currentparent) => {
      // console.log(`Current name is: ${currentparent}`);
      if (currentparent === parent) {
        i = all_parent_names.indexOf(currentparent, i);
        // console.log(`Name match at ${parent} and ${currentparent}`);
        // console.log(`Index of current ${currentparent} is ${i}`);
        emissions_total = emissions_total + all_parent_CO2_vals[i];
        i = i + 1;
      }
    });

    // Reference: https://www.jsdiaries.com/how-to-add-an-array-element-to-json-object-in-javascript/
    unique_values.push(emissions_total);
    parent_totals["parenttotals"].push({
      parentname: `${unique_parents[j]}`,
      countyname: `${unique_parent_counties[j]}`,
      co2total: unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_parents);
  // console.log(all_parent_CO2_vals);
  // console.log(unique_parent_counties);
  parent_totals["parenttotals"] = parent_totals["parenttotals"].sort(
    sortBy("co2total")
  );
  return parent_totals;
}

function facilityTotals(data_year) {
  facility_totals = { facilitytotals: [] };
  all_facility_names = [];
  all_facility_CO2_vals = [];
  all_facility_counties = [];
  all_parent_names = [];
  unique_facilities = [];
  unique_facility_counties = [];
  unique_facility_parent_names = [];
  unique_values = [];
  emissions_total = 0;

  Object.entries(data_year).forEach(([key, object]) => {
    // console.log(`${key}: ${object['COUNTY NAME']}`);
    all_facility_names.push(object["FACILITY NAME"]);
    all_facility_CO2_vals.push(object["GHG QUANTITY (METRIC TONS CO2e)"]);
    all_facility_counties.push(object["COUNTY NAME"]);
    all_parent_names.push(object["PARENT COMPANIES"]);
  });

  // console.log(all_parent_names);
  // console.log(all_county_CO2_vals);

  // Reference: https://stackoverflow.com/questions/35355920/how-can-i-check-that-a-string-does-not-include-the-text-of-another-string/35355946
  i = 0;
  all_facility_names.forEach((facility) => {
    // console.log(`Iteration for ${facility}`);
    if (!unique_facilities.includes(facility)) {
      unique_facilities.push(facility);
      // console.log(facility);
      i = all_facility_names.indexOf(facility, i);
      unique_facility_counties.push(all_facility_counties[i]);
      // console.log(all_facility_counties[i]);
      unique_facility_parent_names.push(all_parent_names[i]);
      i = i + 1;
    }
  });

  // console.log(all_facility_names);
  // console.log(unique_facilities);

  // console.log(unique_parents);
  // console.log(unique_parent_counties);

  //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  Reference: https: j = 0;
  unique_facilities.forEach((facility) => {
    // console.log(`Iteration for ${parent}`);
    i = 0;
    emissions_total = 0;

    all_facility_names.forEach((currentfacility) => {
      // console.log(`Current name is: ${currentparent}`);
      if (currentfacility === facility) {
        i = all_facility_names.indexOf(currentfacility, i);
        // console.log(`Name match at ${parent} and ${currentparent}`);
        // console.log(`Index of current ${currentparent} is ${i}`);
        emissions_total = emissions_total + all_facility_CO2_vals[i];
        i = i + 1;
      }
    });

    // Reference: https://www.jsdiaries.com/how-to-add-an-array-element-to-json-object-in-javascript/
    unique_values.push(emissions_total);
    facility_totals["facilitytotals"].push({
      facilityname: `${unique_facilities[j]}`,
      parentname: `${unique_facility_parent_names[j]}`,
      countyname: `${unique_facility_counties[j]}`,
      co2total: unique_values[j],
    });

    j = j + 1;
  });

  // console.log(unique_values);
  // console.log(unique_parents);
  // console.log(all_parent_CO2_vals);
  // console.log(unique_parent_counties);
  facility_totals["facilitytotals"] = facility_totals["facilitytotals"].sort(
    sortBy("countyname")
  );
  // console.log(facility_totals);
  return facility_totals;
}

function buildStaticBarCounties(county_totals) {
  //Construct horizontal bar chart
  //Reference: https://plotly.com/javascript/hover-text-and-formatting/
  //Reference: https://plotly.com/javascript/horizontal-bar-charts/
  //Reference: https://community.plotly.com/t/flipping-horizontal-bar-chart-to-descending-order/15456

  // console.log(county_totals);

  x_values = [];
  y_values = [];
  chart_labels = [];

  for (let i = 0; i < 10; i++) {
    x_values.push(county_totals["countytotals"][i]["co2total"]);
    y_values.push(
      county_totals["countytotals"][i]["countyname"].toString().toUpperCase()
    );
  }

  // console.log(x_values);
  // console.log(y_values);

  var trace = {
    x: x_values,
    y: y_values,
    orientation: "h",
    marker: {
      color: "#002366",
    },
    type: "bar",
  };

  var data = [trace];

  var layout = {
    title: `Top 10 Counties in CO2 Emissions`,
    xaxis: {
      title: "CO2 Emissions in (Metric Tons)",
    },
    font: {
      family: "Arial",
      size: "16",
      color: "black",
    },
    yaxis: {
      autorange: "reversed",
      title: "",
    },
    autosize: true,
    margin: {
      l: 150,
      r: 50,
      b: 200,
      t: 50,
      pad: 4,
    },
  };

  Plotly.newPlot("countybar", data, layout);
}

function buildStaticBarParents(parent_totals) {
  //Construct horizontal bar chart
  //Reference: https://plotly.com/javascript/hover-text-and-formatting/
  //Reference: https://plotly.com/javascript/horizontal-bar-charts/
  //Reference: https://community.plotly.com/t/flipping-horizontal-bar-chart-to-descending-order/15456

  // console.log(parent_totals);

  x_values = [];
  y_values = [];
  chart_labels = [];

  for (let i = 0; i < 5; i++) {
    x_values.push(parent_totals["parenttotals"][i]["co2total"]);
    y_values.push(parent_totals["parenttotals"][i]["parentname"]);
  }

  // console.log(x_values);
  // console.log(y_values);

  var trace = {
    x: y_values,
    y: x_values,
    marker: {
      color: "#FA8072",
    },
    type: "bar",
  };

  var data = [trace];

  var layout = {
    title: `Top 5 Parent Companies' <br>CO2 Emissions`,
    xaxis: {
      title: "",
    },
    yaxis: {
      title: `CO2 Emissions <br>in (Metric Tons)`,
    },
    font: {
      family: "Arial",
      size: "14",
      color: "black",
    },
    autosize: true,
    margin: {
      l: 100,
      r: 90,
      b: 80,
      t: 50,
      pad: 4,
    },
  };

  Plotly.newPlot("parentbar", data, layout);
}

//Reference: https://docs.anychart.com/Basic_Charts/Pie_Chart
function buildStaticPie(facility_data, countyName) {
  var county1 = [
    {
      values: [],
      labels: [],
      text: [],
      textinfo: 'none',
      type: "pie",
      hole: 0.5,
      hovertemplate: [],
      automargin: true,
      marker: {
        colors: ["#002366", "#0F52BA", "#FA8072", "#FFDAB9"],
      },
      margin: {
        l: 100,
        r: 50,
        b: 300,
        t: 200,
        pad: 4,
      },
    },
  ];
  var county2 = [
    {
      values: [],
      labels: [],
      type: "pie",
      hole: 0.6,
      hovertemplate: [],
    },
  ];

  // console.log(typeof chart1);
  // console.log(typeof chart2);
  // console.log(facility_data);

  var parentname = "";
  var countyNameCheck = 0;
  var countypiecontainer = d3.select("#countypie1");
  countypiecontainer.html("");

  facility_data["facilitytotals"].forEach((row) => {
    // console.log(row);

    if (countyName === row["countyname"]) {
      countyNameCheck = 1;
    }

    switch (row["countyname"]) {
      case countyName:
        parentname = row["parentname"].replaceAll(";", "<br>");
        // console.log(parentname);

        // https://stackoverflow.com/questions/57973985/how-to-break-a-long-line-in-a-hover-text-plotly
        county1[0]["values"].push(row["co2total"]);
        county1[0]["labels"].push(row["parentname"]);
        county1[0]["hovertemplate"].push(
          `<b>${row["facilityname"]}</b><br><br>` +
            `<b>Parent Company:</b> ${parentname}<br>` +
            `<b align="left">Total Emissions:</b> ${row["co2total"]}<br>` +
            `<b align="left">Percent of Total Emissions:</b> %{percent} <br>` + 
            `<extra></extra>`
        );

        break;
    }
  });

  // console.log(countyName, countyNameCheck, county1[0]["values"]);

  if (
    countyNameCheck === 0 ||
    (county1[0]["values"].length === 1 && county1[0]["values"][0] === 0)
  ) {
    countyName = `No facility data present for ${countyName.replace(
      countyName.charAt(0),
      countyName.charAt(0).toUpperCase()
    )} County`;
  }

  // console.log(county1);

  var layout1 = {
    autosize: true,
    showlegend: false,
    title: `CO2 Emissions<br>by Facility Name in County`,
    font: {
      family: "Arial",
      size: "18",
      color: "black",
    },
    annotations: [
      {
        font: { size: 20 },
        showarrow: false,
        text: countyName.toUpperCase(),
      },
    ],
  };

  Plotly.newPlot("countypie1", county1, layout1);
  // Plotly.newPlot("countypie2", county2, layout1);
}

function buildGHGAnalysis(userYear, userCounty) {
  /* data route */
  const url = "/api/GHGdata";
  d3.json(url)
    .then(function (ghgcountydata) {
      // console.log(ghgcountydata);

      console.log(userYear);
      yearArray = [
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
      ];

      data_2019 = [];
      data_2018 = [];
      data_2017 = [];
      data_2016 = [];
      data_2015 = [];
      data_2014 = [];
      data_2013 = [];
      data_2012 = [];
      data_2011 = [];
      data_2010 = [];
      selected_year_data = [];

      // For loop to push data specific variables for access by year
      Object.entries(ghgcountydata).forEach((object, key) => {
        switch (ghgcountydata[key]["REPORTING YEAR"]) {
          case 2010:
            data_2010.push(ghgcountydata[key]);
            break;

          case 2011:
            data_2011.push(ghgcountydata[key]);
            break;

          case 2012:
            data_2012.push(ghgcountydata[key]);
            break;

          case 2013:
            data_2013.push(ghgcountydata[key]);
            break;

          case 2014:
            data_2014.push(ghgcountydata[key]);
            break;

          case 2015:
            data_2015.push(ghgcountydata[key]);
            break;

          case 2016:
            data_2016.push(ghgcountydata[key]);
            break;

          case 2017:
            data_2017.push(ghgcountydata[key]);
            break;

          case 2018:
            data_2018.push(ghgcountydata[key]);
            break;

          case 2019:
            data_2019.push(ghgcountydata[key]);
            break;
        }
      });

      // Object.entries(data_2019).forEach((row) => {

      //   if(row[1]["COUNTY NAME"] === "indiana"){
      //   console.log(row);
      //   }
      // });

      switch (userYear) {
        case "2010":
          selected_year_data = data_2010;
          break;

        case "2011":
          selected_year_data = data_2011;
          break;

        case "2012":
          selected_year_data = data_2012;
          break;

        case "2013":
          selected_year_data = data_2013;
          break;

        case "2014":
          selected_year_data = data_2014;
          break;

        case "2015":
          selected_year_data = data_2015;
          break;

        case "2016":
          selected_year_data = data_2016;
          break;

        case "2017":
          selected_year_data = data_2017;
          break;

        case "2018":
          selected_year_data = data_2018;
          break;

        case "2019":
          selected_year_data = data_2019;
          break;
      }

      // console.log(selected_year_data);

      county_totals = countyTotals(selected_year_data);
      parent_totals = parentTotals(selected_year_data);
      facility_totals = facilityTotals(selected_year_data);

      populateYears(yearArray, userYear);
      populateCounties(county_totals, userCounty);

      // console.log(county_totals);
      // console.log(facility_totals);

      buildStaticBarCounties(county_totals);
      buildStaticBarParents(parent_totals);
      buildStaticPie(facility_totals, userCounty);
    })
    .catch((e) => {
      console.log(e);
    });
}

// function buildAirAnalysis() {
//   /* data route */
//   const url = "/api/AIRdata";

//   d3.json(url)
//     .then(function (data) {
//       // console.log(data);

//       var countiesAll = [];
//       var NAAQSAll = [];

//       Object.entries(data).forEach(([key, object]) => {
//         countiesAll.push(object["county"]);
//         NAAQSAll.push(object["NAAQS"]);
//       });

//       //console.log(NAAQSAll);

//       var testdict = countiesAll.map((county, i) => ({
//         county,
//         NAAQS: NAAQSAll[i],
//       }));
//       // console.log(testdict);

//       var countyair = [];
//       testdict.reduce(function (res, value) {
//         if (!res[value.county]) {
//           res[value.county] = { county: value.county, NAAQS: 0 };
//           countyair.push(res[value.county]);
//         }
//         res[value.county].NAAQS += value.NAAQS;
//         return res;
//       }, {});

//       console.log(countyair);

//       // console.log(countyair);

//       var airsort = countyair.sort((a, b) => (a.NAAQS > b.NAAQS ? -1 : 1));
//       //console.log(airsort);

//       var countiesUnique = [];
//       var NAAQSSum = [];

//       Object.entries(airsort).forEach(([key, object]) => {
//         countiesUnique.push(object["county"]);
//         NAAQSSum.push(object["NAAQS"]);

//         var trace1 = {
//           x: countiesUnique,
//           y: NAAQSSum,
//           type: "bar",
//         };

//         var data = [trace1];

//         var layout = {
//           title: "Air Quality by County, 2009-2018",
//           xaxis: { title: "County" },
//           yaxis: { title: "Days over NAAQS" },
//         };

//         // Plotly.newPlot("bar", data, layout);
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }

function buildAirAnalysis() {
  /* data route */
  const url = "/api/AIRdata";
  d3.json(url)
    .then(function (data) {
      //console.log(data);

      var countiesAll = [];
      var NAAQSAll = [];

      Object.entries(data).forEach(([key, object]) => {
        countiesAll.push(object["county"]);
        NAAQSAll.push(object["NAAQS"]);
      });

      //console.log(NAAQSAll);

      var testdict = countiesAll.map((county, i) => ({
        county,
        NAAQS: Number(NAAQSAll[i]),
      }));

      var countyair = [];

      //https://www.codegrepper.com/code-examples/javascript/javascript+group+by+sum+array+reduce
      testdict.reduce(function (res, value) {
        if (!res[value.county]) {
          res[value.county] = { county: value.county, NAAQS: 0 };
          countyair.push(res[value.county]);
        }
        res[value.county].NAAQS += value.NAAQS;
        return res;
      }, {});

      var airsort = countyair.sort((a, b) => (a.NAAQS > b.NAAQS ? -1 : 1));
      //console.log(airsort);

      //countyair.map(({ NAAQS }) => NAAQS).sort().reverse()
      var countiesUnique = [];
      var NAAQSSum = [];

      Object.entries(airsort).forEach(([key, object]) => {
        countiesUnique.push(object["county"]);
        NAAQSSum.push(object["NAAQS"]);
      });

      var countyX = countiesUnique.reverse().slice(23).reverse();
      var countyY = NAAQSSum.reverse().slice(23).reverse();
      var colors = "FA8072";
      var trace1 = {
        x: countyX,
        y: countyY,
        type: "bar",
        marker: { color: colors },
      };

      var data = [trace1];

      var layout = {
        title: "Air Quality by County, 2009-2018",
        font: {
          family: "Arial",
          size: "18",
          color: "black",
        },
        xaxis: { title: "County" },
        yaxis: { title: "Days over NAAQS" },
        margin: {
          l: 120,
          r: 50,
          b: 150,
          t: 100,
          pad: 4,
        },
      };

      Plotly.newPlot("top15air", data, layout);

      // var unique_counties = [...new Set(all_counties)];
      // console.log(unique_counties);
    })
    .catch((e) => {
      console.log(e);
    });
}

function buildAirTimeline() {
  const url = "/api/AIRdata";
  d3.json(url).then(function (data) {
    var yearsAll = [];
    var NAAQSAll = [];

    Object.entries(data).forEach(([key, object]) => {
      yearsAll.push(object["year"]);
      NAAQSAll.push(object["NAAQS"]);
    });

    var testdict = yearsAll.map((year, i) => ({
      year,
      NAAQS: Number(NAAQSAll[i]),
    }));

    var yearair = [];

    testdict.reduce(function (res, value) {
      if (!res[value.year]) {
        res[value.year] = { year: value.year, NAAQS: 0 };
        yearair.push(res[value.year]);
      }
      res[value.year].NAAQS += value.NAAQS;
      return res;
    }, {});

    //console.log(yearair);

    var yearsort = yearair.sort((a, b) => (a.year > b.year ? 1 : -1));

    //console.log(yearsort);

    var yearsList = [];
    var NAAQSSum = [];

    Object.entries(yearsort).forEach(([key, object]) => {
      yearsList.push(object["year"]);
      NAAQSSum.push(object["NAAQS"]);
    });

    var trace1 = {
      x: yearsList,
      y: NAAQSSum,
      type: "line",
      color: "#0F52BA",
    };

    var data = [trace1];

    var layout = {
      title: "PA Air Quality, 2009-2018",
      font: {
        family: "Arial",
        size: "18",
        color: "black",
      },
      xaxis: { title: "Year" },
      yaxis: { title: "Days over NAAQS" },
    };

    Plotly.newPlot("paair", data, layout);
  });
}

console.log("app.js is accessed.");
buildGHGAnalysis("2019", "armstrong");
buildAirTimeline();
buildAirAnalysis();

/////Megan Scatter/Bubble Chart Air GHG//////
///Reference: https://www.d3-graph-gallery.com/graph/bubble_tooltip.html///

// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 50, left: 50 },
  width = 1000 - margin.left - margin.right,
  height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#bubble")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// add chart title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", 0 - margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("GHG Emissions vs. Air Pollution (2018)");

//Add x axis label
svg
  .append("text")
  .style("font", "18px arial")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width - 400)
  .attr("y", height + 45)
  .text("2018 Total GHG Emissions (CO2e)");

// Add y axis label
svg
  .append("text")
  .style("font", "18px arial")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -50)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Air Pollution: # of Days Over Standard (NAAQS)");

//Read the data
d3.csv(
  "https://raw.githubusercontent.com/mspriest/bubblechart2018/main/2018_bubbledata.csv"
).then(function (data) {
  // console.log(data);
  // Add X axis
  const x = d3.scaleLinear().domain([0, 19000000]).range([0, width]);
  svg
    .append("g")
    .style("font", "14px arial")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
  svg.append("g").style("font", "14px arial").call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear().domain([20000, 16000000]).range([10, 40]);

  // -1- Create a tooltip div that is hidden by default:
  const tooltip = d3
    .select("#bubble")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "#FFDAB9")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black");

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function (event, d) {
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(`County: ${d.County}<br>Person Days: ${d.PersonDays}`)
      // .style("left", (event.x)/2 + "px")
      // .style("top", (event.y)/2+30 + "px")
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  };

  const moveTooltip = function (event, d) {
    tooltip
      // .style("left", (event.x)/2 + "px")
      // .style("top", (event.y)/2+30 + "px")
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  };
  const hideTooltip = function (event, d) {
    tooltip.transition().duration(200).style("opacity", 0);
  };

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("class", "bubbles")
    .attr("cx", (d) => x(d.GHG_2018))
    .attr("cy", (d) => y(d.NAAQS))
    .attr("r", (d) => z(d.PersonDays))

    // -3- Trigger the functions
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);
});

function countyOptionChanged(county) {
  year = d3.select("#selectedYearOption").text();
  // console.log(year);
  buildGHGAnalysis(year, county.toLowerCase());
}

function yearOptionChanged(year) {
  county = d3.select("#selectedCountyOption").text().toLowerCase();
  // console.log(county);
  buildGHGAnalysis(year, county);
  // console.log(year);
}
