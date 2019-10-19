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
import ReactResizeDetector from "react-resize-detector";
import * as d3 from "d3";
import "./charts.css";

class PieChart extends Component {
  state = {
    isOpen: false,
    height: 320,
    width: 460,
    piechartData: []
  };
  componentDidMount() {
    this.Plot();
  }
  componentWillReceiveProps(nextProps) {
    //console.log('Component Will receive props..',nextProps);
    // if (nextProps.chartsMessages) {
    //   let newmessages = nextProps.chartsMessages.map((item, key) => {
    //     return JSON.parse(item);
    //   });

    //   if (newmessages.length > 0) {
    //     this.setState({ piechartData: newmessages });
    //     this.Plot(newmessages);
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
              this.setState({ piechartData: newMessages });
              this.Plot(newMessages);       
          }
       }        
    }
  }
  Plot(piechartData) {
    console.log('Plot called');
    // var chartData = [
    //   {
    //     Country: "USA",
    //     Total: 487
    //   },
    //   {
    //     Country: "INDIA",
    //     Total: 411
    //   },
    //   {
    //     Country: "CANADA",
    //     Total: 7
    //   }
    // ];

    let chartOptions = [
      {
        captions: [{ INDIA: "INDIA", CANADA: "CANADA", USA: "USA" }],
        color: [{ INDIA: "#5c6873", CANADA: "#8f9ba6", USA: "#c8ced3" }],
        xaxis: "year",
        yaxis: "value"
      }
    ];

    this.BuildPie("pieChart" + this.props.id, piechartData, chartOptions);
  }
  BuildPie(id, chartData, options) {
    console.log('Build pie');
    document.getElementById(id).innerHTML = "";

    let Data = this.TransformChartData(chartData, options);
   // console.log('Data---',Data);
    let runningData = Data["runningData"];
    let runningColors = Data["runningColors"];
    var xVarName;
    var divisionRatio = 2.5;
   // var legendoffset = 0;

    //chart = d3.select("#" + id + " .innerCont");
    var yVarName = options[0].yaxis;
    // let width = $(chart[0]).outerWidth();
    // let height = $(chart[0]).outerHeight();
    let width = 460;
    let height = 320;
    let radius = Math.min(width, height) / divisionRatio;

    xVarName = options[0].xaxis;

    var rcolor = d3.scaleOrdinal().range(runningColors);

    let arc = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - radius);

    var arcOver = d3
      .arc()
      .outerRadius(radius + 10)
      .innerRadius(radius - radius);

    let chart = d3
      .select("#pieChart" + this.props.id)
      .append("svg") //append svg element inside #chart
      .attr("width", width) //set width
      .attr("height", height) //set height
      .append("g")
      .attr(
        "transform",
        "translate(" + width / divisionRatio + "," + (height / divisionRatio + 30) + ")"
      );

    var pie = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

    var g = chart
      .selectAll(".arc")
      .data(pie(runningData))
      .enter()
      .append("g")
      .attr("class", "arc");

    var count = 0;

    var path = g
      .append("path")
      .attr("d", arc)
      .attr("id", function(d) {
        return "arc-" + count++;
      })
      .style("opacity", function(d) {
        return d.data["op"];
      });

    path
      .on("mouseenter", function(d) {
        d3.select(this)
          .attr("stroke", "white")
          .transition()
          .duration(200)
          .attr("d", arcOver)
          .attr("stroke-width", 1);
      })
      .on("mouseleave", function(d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc)
          .attr("stroke", "none");
      });

    path.append("svg:title").text(function(d) {
      return d.data["title"] + " (" + d.data[yVarName] + ")";
    });

    path.style("fill", function(d) {
      return rcolor(d.data[xVarName]);
    });

    g.append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("opacity", 1)
      .text(function(d) {
        return d.data[yVarName];
      });

    count = 0;

  }
  TransformChartData(chartData, opts) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    xVarName = opts[0].xaxis;

    for (var i in chartData) {
      hasMatch = false;
      for (var index = 0; index < result.length; ++index) {
        var data = result[index];
        if (data[xVarName] === chartData[i][xVarName]) {
          result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
          hasMatch = true;
          break;
        }
      }
      if (hasMatch === false) {
        let ditem = {};
        ditem[xVarName] = chartData[i][xVarName];
        ditem[yVarName] = chartData[i][yVarName];
        // ditem["caption"] =
        //   opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
        // ditem["title"] =
        //   opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
        ditem["caption"] = chartData[i][xVarName];
        ditem["title"] = chartData[i][xVarName];
        result.push(ditem);

        const getRandomInRange = (min,max) => {
          let v = (Math.random()*(256)|0).toString(16);//bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
          return "#" + v + v + v;
          //return Math.random() * (max - min) + min;
        }
        resultColors[counter] = getRandomInRange(0.2, 0.8);
         // opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

        counter += 1;
      }
    }

    let resultArr = [];
    resultArr["runningData"] = result;
    resultArr["runningColors"] = resultColors;
    return resultArr;
  }
  onResize = (width, height) => {
    this.setState({
      width: width,
      height: height
    });
  };

  render() {
     console.log("render Call...");
    const { id } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Pie Chart
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
            <div
              className="chart-wrapper"
              style={{ textAlign: "center" }}
              id={"pieChart" + id}
              ref={id}></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //chartsMessages: state.chartsMessages.pieData
  chartsMessages: Object.assign({},state.chartsMessages.pieData)
});

export default connect(mapStateToProps)(PieChart);
