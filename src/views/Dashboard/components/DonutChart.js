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
    isOpen: false,
    height: 320,
    width: 420,
    data: [
      { name: "303AH1900000300", value: 19912018 },
      { name: "303AH1900000301", value: 20501982 },
      { name: "303AH1900000302", value: 20679786 },
      { name: "303AH1900000300", value: 21354481 },
      { name: "20-24", value: 22604232 },
      { name: "25-29", value: 21698010 }
      // { name: "30-34", value: 21183639 },
      // { name: "35-39", value: 19855782 },
      // { name: "40-44", value: 20796128 },
      // { name: "45-49", value: 21370368 },
      // { name: "50-54", value: 22525490 },
      // { name: "55-59", value: 21001947 }
      // { name: "60-64", value: 18415681 },
      // { name: "65-69", value: 14547446 },
      // { name: "70-74", value: 10587721 },
      // { name: "75-79", value: 7730129 },
      // { name: "80-84", value: 5811429 },
      // { name: "=85", value: 5938752 }
    ]
  };

  componentDidMount() {
    this.drawChart(460, 340, this.state.data);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.chartsMessages) {
    //   let newMessages = nextProps.chartsMessages.map((item, key) => {
    //     return JSON.parse(item);
    //   });

    //   if (newMessages.length > 0) {
    //     this.setState({ data: newMessages });
    //     this.drawChart(this.state.width, this.state.height, newMessages);
    //   }
    // }

    let myID = this.props.id;
    let foo = nextProps.chartsMessages;
    let v = foo[Object.keys(foo)[0]];
    console.log(Object.keys(foo));
    if(Object.keys(foo).indexOf(myID) !== -1){
      let keyIndex = Object.keys(foo).indexOf(myID);
      v = foo[Object.keys(foo)[keyIndex]];
       if(v !== undefined){
          let newMessages = v.map((item, key) => { 
            return JSON.parse(item);
          });
          if (newMessages.length > 0) {            
              this.setState({ data: newMessages });
              this.drawChart(this.state.width, this.state.height, newMessages);        
          }
       }        
    }
  }

  drawChart(widthP, heightP, newMessages) {
    document.getElementById("donutChart" + this.props.id).innerHTML = "";
    //let width = document.getElementById("chart").offsetWidth;
    let width = widthP;
    let height = 340;
    //height = Math.min(width, 500);
    var radius2 = Math.min(width, height) / 2;

    // const arcLabel = () => {
    //   const radius = Math.min(width, height) / 4;

    //   return d3
    //     .arc()
    //     .innerRadius(radius * 0.67)
    //     .outerRadius(radius - 1);
    // };

    let arc = d3
      .arc()
      .innerRadius(radius2 * 0.5)
      .outerRadius(radius2 * 0.8);

    let pie = d3
      .pie()
      .padAngle(0.005)
      .sort(null)
      .value(d => d.value);

    let data = newMessages;

    let color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.name))
      // .range(d3.quantize(t => { console.log('t value...',t);  return (d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse() } ));
      .range(d3.quantize(t => d3.interpolatePuBu(t * 0.8 + 0.1), data.length).reverse());
    const arcs = pie(data);

    const svg = d3
      .select("#donutChart" + this.props.id)
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
              <div className="chart-wrapper" ref={id} id={"donutChart" + this.props.id}></div>
            </ReactResizeDetector>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //chartsMessages: state.chartsMessages.donutData
  chartsMessages: Object.assign({},state.chartsMessages.donutData)
});

export default connect(mapStateToProps)(DonutChart);
