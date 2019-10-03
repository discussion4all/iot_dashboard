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

class DonutChart extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.drawChart(460, 340);
  }

  drawChart(widthP, heightP) {
    document.getElementById("donut-Chart").innerHTML = "";
    //let width = document.getElementById("chart").offsetWidth;
    let width = widthP;
    let height = 340;
    //height = Math.min(width, 500);
    var radius2 = Math.min(width, height) / 2;

    const arcLabel = () => {
      const radius = Math.min(width, height) / 4;

      return d3
        .arc()
        .innerRadius(radius * 0.67)
        .outerRadius(radius - 1);
    };

    let arc = d3
      .arc()
      .innerRadius(radius2 * 0.5)
      .outerRadius(radius2 * 0.8);

    let pie = d3
      .pie()
      .padAngle(0.005)
      .sort(null)
      .value(d => d.value);

    // let data = await d3.csv(
    //   "https://gist.githubusercontent.com/mbostock/a3541c73fdccd432acc8b11bf9f02641/raw/2bd0fce0bf34b020e93c5f6527b5a9d08c33ff06/population-by-age.csv",
    //   d3.autoType
    // );

    let data = [
      { name: "<5", value: 19912018 },
      { name: "5-9", value: 20501982 },
      { name: "10-14", value: 20679786 },
      { name: "15-19", value: 21354481 },
      { name: "20-24", value: 22604232 },
      { name: "25-29", value: 21698010 },
      { name: "30-34", value: 21183639 },
      { name: "35-39", value: 19855782 },
      { name: "40-44", value: 20796128 },
      { name: "45-49", value: 21370368 },
      { name: "50-54", value: 22525490 },
      { name: "55-59", value: 21001947 },
      { name: "60-64", value: 18415681 },
      { name: "65-69", value: 14547446 },
      { name: "70-74", value: 10587721 },
      { name: "75-79", value: 7730129 },
      { name: "80-84", value: 5811429 },
      { name: "=85", value: 5938752 },
      ["name", "value"]
    ];

    let color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const arcs = pie(data);

    const svg = d3
      .select(this.refs.chartDiv)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.name))
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });
    // .attr("fill", d => color(d.data.name))
    // .attr("d", arc)
    // .append("title")
    // .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", ".7em")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name)
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString())
      );
  }

  onResize = (width, height) => {
    this.drawChart(width, height);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Donut Chart
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
            <ReactResizeDetector handleWidth onResize={this.onResize}>
              <div className="chart-wrapper" ref="chartDiv" id="donut-Chart"></div>
            </ReactResizeDetector>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.donutData
});

export default connect(mapStateToProps)(DonutChart);
