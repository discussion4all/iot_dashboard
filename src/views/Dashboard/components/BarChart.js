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

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      data: [
        { year: "2014", value: 0.07 },
        { year: "2015", value: 0.13 },
        { year: "2016", value: 0.56 },
        { year: "2017", value: 0.95 },
        { year: "2018", value: 0.81 }
      ],
      width: 460,
      height: 320
    };
    this.responsivefy = this.responsivefy.bind(this);
  }

  componentDidMount() {
    this.drawChart(460, 320, this.state.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartsMessages) {
      let newMessages = nextProps.chartsMessages.map((item, key) => {
        return JSON.parse(item);
      });

      if (newMessages.length > 0) {
        this.setState({ data: newMessages });
        this.drawChart(this.state.width, this.state.height, newMessages);
      }
    }
  }

  drawChart(widthP, heightP, newMessages) {
    document.getElementById("bar-chart").innerHTML = "";
    var margin = { top: 40, right: 30, bottom: 30, left: 50 },
      width = widthP - margin.left - margin.right,
      height = 320 - margin.top - margin.bottom;

    var greyColor = "#2f353a";

    var barColor = "#f0f3f5";
    var highlightColor = "#c8ced3";

    var formatPercent = d3.format(".0%");
    var svg = d3
      .select(this.refs.chartDiv)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(this.responsivefy)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.4);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3
      .axisBottom(x)
      .tickSize([])
      .tickPadding(10);
    var yAxis = d3.axisLeft(y).tickFormat(formatPercent);

    // var dataset = [
    //   { year: "2014", value: 0.07 },
    //   { year: "2015", value: 0.13 },
    //   { year: "2016", value: 0.56 },
    //   { year: "2017", value: 0.95 },
    //   { year: "2018", value: 0.81 }
    // ];

    let dataset = newMessages;

    x.domain(
      dataset.map(d => {
        return d.year;
      })
    );
    // y.domain([0, d3.max(dataset,  d => { return d.value; })]);
    y.domain([0, 1]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("display", d => {
        return d.value === null ? "none" : null;
      })
      .attr("fill", d => {
        return d.value ===
          d3.max(dataset, d => {
            return d.value;
          })
          ? "#c8ced3"
          : "#f0f3f5";
      })
      .style("stroke", d => {
        return d.value ===
          d3.max(dataset, d => {
            return d.value;
          })
          ? greyColor
          : greyColor;
      })
      .attr("x", d => {
        return x(d.year);
      })
      .attr("width", x.bandwidth())
      .attr("y", d => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay(function(d, i) {
        return i * 150;
      })
      .attr("y", d => {
        return y(d.value);
      })
      .attr("height", d => {
        return height - y(d.value);
      });

    svg
      .selectAll(".label")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("display", d => {
        return d.value === null ? "none" : null;
      })
      .attr("x", d => {
        return x(d.year) + x.bandwidth() / 2 - 8;
      })
      .style("fill", d => {
        return d.value ===
          d3.max(dataset, d => {
            return d.value;
          })
          ? highlightColor
          : greyColor;
      })
      .attr("y", d => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => {
        return i * 150;
      })
      .text(d => {
        return formatPercent(d.value);
      })
      .attr("y", d => {
        return y(d.value) + 0.1;
      })
      .attr("dy", "-.7em");
  }
  responsivefy(svg) {
    const resize = () => {
      let targetWidth = parseInt(container.style("width"));
      let targetHeight = Math.round(targetWidth / aspect);
      if (targetWidth > width2) {
        targetWidth = width2;
      }
      if (targetHeight > height2) {
        targetHeight = height2;
      }
      svg.attr("width", targetWidth);
      svg.attr("height", targetHeight);
    };
    // Container is the DOM element, svg is appended.
    // Then we measure the container and find its
    // aspect ratio.
    const container = d3.select(svg.node().parentNode),
      width2 = parseInt(svg.style("width"), 10),
      height2 = parseInt(svg.style("height"), 10),
      aspect = width2 / height2;
    // Add viewBox attribute to set the value to initial size
    // add preserveAspectRatio attribute to specify how to scale
    // and call resize so that svg resizes on page load
    svg
      .attr("viewBox", `0 0 ${width2} ${height2}`)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);
    d3.select(window).on("resize." + container.attr("id"), resize);
  }

  onResize = (width, height) => {
    this.setState({
      width: width,
      height: height
    });
    this.drawChart(width, height, this.state.data);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Bar Chart
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
              <div className="chart-wrapper" ref="chartDiv" id="bar-chart"></div>
            </ReactResizeDetector>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.barData
});

export default connect(mapStateToProps)(BarChart);
