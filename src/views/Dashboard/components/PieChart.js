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
import * as d3 from 'd3';
import "./charts.css";

class PieChart extends Component {
  state = {
    isOpen: false,
    height: 320,
    width: 460,
    piechartData: []
  };
  componentDidMount(){
    this.Plot();
  }
  componentWillReceiveProps(nextProps){
    console.log('NextProps....',nextProps);
    if(nextProps.chartsMessages){
        let newmessages = nextProps.chartsMessages.map((item,key) => {
           
           return JSON.parse(item)
        } )
        
        if(newmessages.length > 0){
           console.log('New messages...',newmessages);
           this.setState({ piechartData: newmessages});
           this.Plot(newmessages);
        }    
    }
  }
  Plot(piechartData){
    var chartData = [
    {
      "Country": "USA",
      "Model": "Model 1",
      "Total": 487
    },
    {
      "Country": "INDIA",
      "Model": "Model 1",
      "Total": 411
    },
    {
      "Country": "CANADA",
      "Model": "Model 1",
      "Total": 7
    }
    ];

    let chartOptions = [{
      "captions": [{ "INDIA": "INDIA", "CANADA": "CANADA", "USA": "USA" }],
      "color": [{ "INDIA": "#FFA500", "CANADA": "#0070C0", "USA": "#ff0000" }],
      "xaxis": "Country",
      "yaxis": "Total"
    }];
   
    this.BuildPie("pieChart", piechartData, chartOptions);
  }
  BuildPie(id,chartData,options){

    document.getElementById(id).innerHTML = '';
   
    let Data = this.TransformChartData(chartData,options);
    
    let runningData = Data['runningData'];
    let runningColors = Data['runningColors'];
    var xVarName;
    var divisionRatio = 2.5;
    var legendoffset = 0;

    //chart = d3.select("#" + id + " .innerCont");
    var yVarName = options[0].yaxis;
    // let width = $(chart[0]).outerWidth();
    // let height = $(chart[0]).outerHeight();
    let width = 460;
    let height = 320;
    let radius = Math.min(width, height) / divisionRatio;

    xVarName = options[0].xaxis;


    var rcolor = d3.scaleOrdinal().range(runningColors);

    let arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - radius);

    var arcOver = d3.arc().outerRadius(radius + 10 ).innerRadius(radius - radius);

    let chart = d3.select(this.refs.pieChart)
            .append("svg")  //append svg element inside #chart
            .attr("width", width)    //set width
            .attr("height", height)  //set height
            .append("g")
            .attr("transform", "translate(" + (width / divisionRatio) + "," + ((height / divisionRatio) + 30) + ")");

            var pie = d3.pie()
            .sort(null)
            .value(function (d) {
              return d.Total;
            });

            var g = chart.selectAll(".arc")
            .data(pie(runningData))
            .enter().append("g")
            .attr("class", "arc");

            var count = 0;

            var path = g.append("path")
            .attr("d", arc)
            .attr("id", function (d) { return "arc-" + (count++); })
            .style("opacity", function (d) {
              return d.data["op"];
            });

            path.on("mouseenter", function (d) {
              console.log('Mouse Enter...',arcOver);
              d3.select(this)
              .attr("stroke", "white")
              .transition()
              .duration(200)
              .attr("d", arcOver)
              .attr("stroke-width", 1);
            })
            .on("mouseleave", function (d) {
              console.log('Mouse leave')
              d3.select(this).transition()
              .duration(200)
              .attr("d", arc)
              .attr("stroke", "none");
            })

            path.append("svg:title")
            .text(function (d) {
              return d.data["title"] + " (" + d.data[yVarName] + ")";
            });

            path.style("fill", function (d) {
              return rcolor(d.data[xVarName]);
            })

            g.append("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("opacity", 1)
            .text(function (d) {
              return d.data[yVarName];
            });


            count = 0;
            //  var legend = chart.selectAll(".legend")
            // .data(runningData).enter()
            // .append("g").attr("class", "legend")
            // .attr("legend-id", function (d) {
            //   return count++;
            // })
            // .attr("transform", function (d, i) {
            //   return "translate(15," + (parseInt("-" + (runningData.length * 10)) + i * 28 + legendoffset) + ")";
            // })
            // .style("cursor", "pointer")

            // var leg = legend.append("rect");
            // leg.attr("x", (width / 2))
            // .attr("y",0)
            // .attr("width", 18).attr("height", 18)
            // .style("fill", function (d) {
            //   return rcolor(d[yVarName]);
            // })
            // legend.append("text").attr("x", (width / 2) - 5)
            // .attr("y", 9).attr("dy", ".35em")
            // .style("text-anchor", "end").text(function (d) {
            //   return d.caption;
            // });

            // leg.append("svg:title")
            // .text(function (d) {
            //   return d["title"] + " (" + d[yVarName] + ")";
            // });
   }
  TransformChartData(chartData,opts){
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

        if (data[xVarName] == chartData[i][xVarName]) {
          result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
          hasMatch = true;
          break;
        }
      }
      if (hasMatch == false) {
        let ditem = {};
        ditem[xVarName] = chartData[i][xVarName];
        ditem[yVarName] = chartData[i][yVarName];
        ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
        ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
        result.push(ditem);

        resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

        counter += 1;
      }
    }

    let resultArr = new Array();
    resultArr['runningData'] = result;
    resultArr['runningColors'] = resultColors;
    return resultArr;
  }
  onResize = (width, height) => {
    console.log('Resize Called...');
    this.setState({
      width: width,
      height: height
    });
  };

  render() {
     console.log('Render Called');
    // console.log(this.state.height);
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
            <div className="chart-wrapper" style={{ textAlign: "center" }} id="pieChart" ref="pieChart" >
              
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.pieData
});

export default connect(mapStateToProps)(PieChart);
