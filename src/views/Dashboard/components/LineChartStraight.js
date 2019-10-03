import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import ReactResizeDetector from "react-resize-detector";

class LineChartStraight extends Component {
  state = {
    isOpen: false
  };

  // componentDidMount() {
  //   this.drawChart(460, 320);
  // }

  drawChart = (widthP, heightP) => {
    var chartConfig = {
      lineConnectorLength: 40,
      axisLabel: {
        xAxis: "Date",
        yAxis: "Value"
      },
      lineLabel: {
        height: 20,
        width: 60
      },
      data: [
        {
          sale: "202",
          year: "0"
        },
        {
          sale: "215",
          year: "1"
        },
        {
          sale: "179",
          year: "2"
        },
        {
          sale: "199",
          year: "3"
        },
        {
          sale: "149",
          year: "4"
        },
        {
          sale: "179",
          year: "5"
        },
        {
          sale: "157",
          year: "6"
        },
        {
          sale: "161",
          year: "7"
        },
        {
          sale: "159",
          year: "8"
        },
        {
          sale: "176",
          year: "10"
        }
      ],
      data2: [
        {
          sale: "150",
          year: "0"
        },
        {
          sale: "155",
          year: "1"
        },
        {
          sale: "169",
          year: "2"
        },
        {
          sale: "149",
          year: "3"
        },
        {
          sale: "145",
          year: "4"
        },
        {
          sale: "144",
          year: "5"
        },
        {
          sale: "158",
          year: "6"
        },
        {
          sale: "140",
          year: "8"
        },
        {
          sale: "180",
          year: "10"
        }
      ]
    };

    var svgConfig = {
      id: "straight-chart",
      width: widthP,
      height: 320,
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
      }
    };

    var tooltipDiv = d3
      .select("#straight-chart")
      .append("div")
      .attr("class", "tooltip");

    var bodySelection = d3.select("#straight-chart");

    var svgSelection = bodySelection
      .append("svg")
      .attr("id", svgConfig.id)
      .attr("width", svgConfig.width)
      .attr("height", svgConfig.height)
      .call(this.responsivefy);

    // create x scale
    let xScale = d3
      .scaleLinear()
      .range([svgConfig.margin.left, svgConfig.width - svgConfig.margin.right])
      .domain([
        d3.min(chartConfig.data, function(d) {
          return +d.year;
        }),
        d3.max(chartConfig.data, function(d) {
          return +d.year;
        })
      ]);

    // create y scale
    let yScale = d3
      .scaleLinear()
      .range([svgConfig.height - svgConfig.margin.top, svgConfig.margin.bottom])
      .domain([134, 215]);

    //let's create the axes using the scales
    let xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickFormat(d3.format("d"));
    // .innerTickSize(-(svgConfig.height-56));

    let yAxis = d3.axisLeft().scale(yScale);
    // .innerTickSize(-svgConfig.width);

    // add xaxis to chart - it will add it to top of the svg
    svgSelection
      .append("svg:g")
      .attr("id", "xAxis")
      .attr("class", "axis")
      .call(xAxis);

    // The X axis is drawn but First, we need to position it vertically downwards using transform property
    d3.select("#xAxis").attr(
      "transform",
      "translate(0," + (svgConfig.height - svgConfig.margin.bottom) + ")"
    );

    // give label to xaxis
    svgSelection
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "#777")
      .attr("transform", "translate(" + svgConfig.width / 2 + "," + svgConfig.height + ")")
      .text(chartConfig.axisLabel.xAxis);

    // add yaxis to chart, but this will not add it to correct oorientation
    svgSelection
      .append("svg:g")
      .attr("id", "yAxis")
      .attr("class", "axis")
      .call(yAxis);

    // apply transform logic to bring it to correct place
    d3.select("#yAxis").attr("transform", "translate(" + svgConfig.margin.left + ",0)");

    // now lets generate line
    var lineSelection = d3
      .line()
      .x(function(d) {
        return xScale(d.year);
      })
      .y(function(d) {
        return yScale(d.sale);
      });

    //create legend function
    const createLegend = (legendColor, lineId, legendText) => {
      var legendGroup = svgSelection.append("g");

      legendGroup
        .append("rect")
        .attr("width", chartConfig.lineLabel.width + 5)
        .attr("height", chartConfig.lineLabel.height)
        .attr("x", (svgConfig.width + marginLegend - 45) / 1.3)
        .attr("y", svgConfig.margin.top - 15)
        .attr("stroke", legendColor)
        .attr("fill", legendColor)
        .attr("stroke-width", 1)
        .style("opacity", 0)
        .transition()
        .duration(600)
        .style("opacity", 1);

      legendGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .style("cursor", "pointer")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr(
          "transform",
          "translate(" + (svgConfig.width + marginLegend) / 1.3 + "," + svgConfig.margin.top + ")"
        )
        .text("X  " + legendText)
        .on("click", function() {
          var opacity = d3.select("." + lineId).style("opacity") == 1 ? 0 : 1;
          d3.select("." + lineId)
            .transition()
            .duration(500)
            .style("opacity", opacity);
        });
      marginLegend += 100;
    };

    //drawLine function
    const drawLine = (lineData, lineColor, lineLabel, lineId) => {
      // append line to svg
      var group = svgSelection.append("g").attr("class", lineId);

      var path = group
        .append("svg:path")
        .attr("d", lineSelection(lineData))
        .attr("stroke", lineColor)
        .attr("stroke-width", 2)
        .attr("fill", "none");

      //animate the line
      var totalLength = path.node().getTotalLength();
      console.log("Totla Length...", totalLength);
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
        .duration(2500) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

      // prepare label for line
      group
        .append("rect")
        .attr("width", chartConfig.lineLabel.width)
        .attr("height", chartConfig.lineLabel.height)
        .attr("x", xScale(lineData[0].year) - 100)
        .attr("y", yScale(lineData[0].sale) - chartConfig.lineLabel.height / 2)
        .attr("stroke", lineColor)
        .attr("fill", lineColor)
        .attr("stroke-width", 1);

      // draw line label text
      group
        .append("text")
        .attr("dx", xScale(lineData[0].year) - (chartConfig.lineConnectorLength + 7))
        .attr("dy", yScale(lineData[0].sale) + 4) // 4 is padding
        .attr("text-anchor", "end")
        .attr("class", "lineLabel")
        .style("fill", "white")
        .text(lineLabel);

      // line to label connector
      // group.append("line")
      // .attr({
      //    x1: xScale(lineData[0].year), y1: yScale(lineData[0].sale), //start of the line
      //    x2: xScale(lineData[0].year)-chartConfig.lineConnectorLength, y2: yScale(lineData[0].sale)  //end of the line
      // })
      // .attr('stroke', lineColor)
      // .attr('stroke-width', 2)
      // .attr('fill', lineColor);

      return group;
    };

    //drawpoints function
    const drawPoints = (pointData, pointColor, onLine) => {
      onLine
        .selectAll(".points")
        .data(pointData)
        .enter()
        .append("svg:circle")
        .style("cursor", "pointer")
        .attr("stroke", pointColor)
        .attr("fill", function(d, i) {
          return pointColor;
        })
        .attr("cx", function(d, i) {
          return xScale(d.year);
        })
        .attr("cy", function(d, i) {
          return yScale(d.sale);
        })
        .attr("r", function(d, i) {
          return 3;
        })
        .on("mouseover", function(d) {
          // animate point useful when we have points ploted close to each other.
          d3.select(this)
            .transition()
            .duration(300)
            .attr("r", 6);

          // code block for tooltip
          tooltipDiv
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltipDiv
            .html(d.year + " : " + d.sale)
            .style("background", pointColor)
            .style("left", d3.event.pageX - 30 + "px")
            .style("top", d3.event.pageY - 40 + "px");
        })
        .on("mouseout", function(d) {
          // animate point back to origional style
          d3.select(this)
            .transition()
            .duration(300)
            .attr("r", 3);

          tooltipDiv
            .transition()
            .duration(500)
            .style("opacity", 0);
        });
    };

    // plot lines
    let lineOne = drawLine(chartConfig.data, "#00b7d4", "15 Days", "line1");
    let lineTwo = drawLine(chartConfig.data2, "#f57738", "30 Days", "line2");

    // plot points
    drawPoints(chartConfig.data, "#00b7d4", lineOne);
    drawPoints(chartConfig.data2, "#f57738", lineTwo);

    // add legend
    var marginLegend = 0; // this can be dynamic later and no need to call create legend per line
    createLegend("#00b7d4", "line1", "15 Days");
    createLegend("#f57738", "line2", "30 Days");
  };

  // onResize = (width, height) => {
  //   this.drawChart(width, height);
  // };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Line Chart Straight
            <div className="card-header-actions">
              <ButtonGroup className="float-right">
                <ButtonDropdown
                  id="card1"
                  isOpen={this.state.isOpen}
                  toggle={() => {
                    this.setState({ isOpen: !this.state.isOpen });
                  }}>
                  <DropdownToggle caret className="p-0" color="">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.onRemoveItem}>Remove</DropdownItem>
                    <DropdownItem disabled>Change chart's config</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.straightlineData
});

export default connect(mapStateToProps)(LineChartStraight);
