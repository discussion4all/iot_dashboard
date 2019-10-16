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

class BarchartMultipleBars extends Component {
  state = {
    isOpen: false,
    data: [],
    width: 460,
    height: 320
  };

  componentDidMount() {
    let array = [];
    array[0] = [
      "State",
      "Under 5 Years",
      "5 to 13 Years",
      "14 to 17 Years",
      "18 to 24 Years",
      "25 to 44 Years",
      "45 to 64 Years",
      "65 Years and Over"
    ];
    this.setState({
      data: array
    });
    this.drawChart(460, 320, array);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartsMessages) {
      let newMessages = nextProps.chartsMessages.map((item, key) => {
        return JSON.parse(item);
      });

      if (newMessages.length > 0) {
        let data = [this.state.data[0], ...newMessages];
        this.setState({ data: [this.state.data[0], ...newMessages] });
        this.drawChart(this.state.width, this.state.height, data);
      }
    }
  }

  drawChart(widthP, heightP, chartData) {
    document.getElementById("barsmultiple" + this.props.id).innerHTML = "";
    // let height = 500;
    // let width = 1000;
    let maxWidth = widthP;

    var margin = { top: 40, right: 30, bottom: 20, left: 30 };
    let width = maxWidth - margin.left - margin.right;
    let height = 320 - margin.top - margin.bottom;

    // let data = Object.assign(
    //    d3.csv(
    //     "https://gist.githubusercontent.com/mbostock/3887051/raw/805adad40306cedf1a513c252ddd95e7c981885a/data.csv",
    //     d3.autoType
    //   ),
    //   { y: "Population" }
    // );
    let data = chartData;
    // data[6] = {
    //   State: "CA",
    //   "Under 5 Years": 2704659,
    //   "5 to 13 Years": 4499890,
    //   "14 to 17 Years": 2159981,
    //   "18 to 24 Years": 3853788,
    //   "25 to 44 Years": 10604510,
    //   "45 to 64 Years": 8819342,
    //   "65 Years and Over": 4114496
    // };
    // data[1] = {
    //   State: "TX",
    //   "Under 5 Years": 2027307,
    //   "5 to 13 Years": 3277946,
    //   "14 to 17 Years": 1420518,
    //   "18 to 24 Years": 2454721,
    //   "25 to 44 Years": 7017731,
    //   "45 to 64 Years": 5656528,
    //   "65 Years and Over": 2472223
    // };
    // data[2] = {
    //   State: "NY",
    //   "Under 5 Years": 1208495,
    //   "5 to 13 Years": 2141490,
    //   "14 to 17 Years": 1058031,
    //   "18 to 24 Years": 1999120,
    //   "25 to 44 Years": 5355235,
    //   "45 to 64 Years": 5120254,
    //   "65 Years and Over": 2607672
    // };

    // data[3] = {
    //   State: "FL",
    //   "Under 5 Years": 1140516,
    //   "5 to 13 Years": 1938695,
    //   "14 to 17 Years": 925060,
    //   "18 to 24 Years": 1607297,
    //   "25 to 44 Years": 4782119,
    //   "45 to 64 Years": 4746856,
    //   "65 Years and Over": 3187797
    // };

    // data[4] = {
    //   State: "IL",
    //   "Under 5 Years": 894368,
    //   "5 to 13 Years": 1558919,
    //   "14 to 17 Years": 725973,
    //   "18 to 24 Years": 1311479,
    //   "25 to 44 Years": 3596343,
    //   "45 to 64 Years": 3239173,
    //   "65 Years and Over": 1575308
    // };

    // data[5] = {
    //   State: "PA",
    //   "Under 5 Years": 737462,
    //   "5 to 13 Years": 1345341,
    //   "14 to 17 Years": 679201,
    //   "18 to 24 Years": 1203944,
    //   "25 to 44 Years": 3157759,
    //   "45 to 64 Years": 3414001,
    //   "65 Years and Over": 1910571
    // };

    // data[0] = [
    //   "State",
    //   "Under 5 Years",
    //   "5 to 13 Years",
    //   "14 to 17 Years",
    //   "18 to 24 Years",
    //   "25 to 44 Years",
    //   "45 to 64 Years",
    //   "65 Years and Over"
    // ];

    const svg = d3
      .select("#barsmultiple" + this.props.id)
      .append("svg")
      //.call(this.responsivefy)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let groupKey = "State";

    let keys = data[0].slice(1);

    let legend = svg => {
      const g = svg
        .attr("transform", `translate(${width},0)`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("g")
        .data(
          color
            .domain()
            .slice()
            .reverse()
        )
        .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      g.append("rect")
        .attr("x", -19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

      g.append("text")
        .attr("x", -24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
    };

    let x0 = d3
      .scaleBand()
      .domain(data.map(d => d[groupKey]))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    let x1 = d3
      .scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    let color = d3
      .scaleOrdinal()
      //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      .range(["#5c6873", "#73818f", "#8f9ba6", "#acb4bc", "#c8ced3", "#e4e7ea", "#f0f3f5"]);

    let xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call(g => g.select(".domain").remove());

    let yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
      .selectAll("rect")
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.append("g").call(legend);
  }

  onResize = (width, height) => {
    this.setState({
      width: width,
      height: height
    });
    this.drawChart(width, height, this.state.data);
  };

  render() {
    const { id } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Bar Chart Multiple Bars
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
            <ReactResizeDetector handleWidth onResize={this.onResize} />
            <div className="chart-wrapper" ref={id} id={"barsmultiple" + id}></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.multiplebarData
});

export default connect(mapStateToProps)(BarchartMultipleBars);
