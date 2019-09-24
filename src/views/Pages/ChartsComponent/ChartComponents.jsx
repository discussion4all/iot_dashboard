import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ChartistGraph from "react-chartist";
import CardIcon from "components/Card/CardIcon.jsx";
import Timeline from "@material-ui/icons/Timeline";
import CardFooter from "components/Card/CardFooter.jsx";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  pieChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart
} from "variables/charts.jsx";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { withStyles } from "@material-ui/core";
import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import drawGauge from "./d3gauge.js";
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from "@syncfusion/ej2-circulargauge";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// mqtt
import { subscribe } from "mqtt-react";

am4core.useTheme(am4themes_animated);

class RoundedLineChart extends Component {
  state = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[]]
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data.length !== 0) {
      const newData = nextProps.data.slice(0, 7);
      console.log("newData", newData);
      let seriesA = this.state.series;
      seriesA[0] = newData;
      this.setState(prevState => {
        series: seriesA;
      });
    }
  }

  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;

    // console.log("in render", this.props.data);
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
          <h4 className={classes.cardTitle}>Rounded Line Chart </h4>
        </CardHeader>
        <CardBody style={{ height: "75%", backgroundColor: "#db2164" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={this.state}
            type="Line"
            options={roundedLineChart.options}
            listener={roundedLineChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class StraightLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
          <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
        </CardHeader>
        <CardBody style={{ height: "75%", backgroundColor: "#fc930a" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={straightLinesChart.data}
            type="Line"
            options={straightLinesChart.options}
            listener={straightLinesChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class SimpleBarChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
          <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
        </CardHeader>
        <CardBody style={{ height: "75%", backgroundColor: "#00bcd4" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={simpleBarChart.data}
            type="Bar"
            options={simpleBarChart.options}
            responsiveOptions={simpleBarChart.responsiveOptions}
            listener={simpleBarChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class PieChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="danger" icon style={{ height: "25%" }}>
          <CardIcon color="danger">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Pie Chart</h4>
        </CardHeader>
        <CardBody style={{ height: "50%" }}>
          <ChartistGraph
            data={pieChart.data}
            type="Pie"
            options={pieChart.options}
            style={{ height: "100%" }}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class ColouredLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="info" icon style={{ height: "15%" }}>
          <CardIcon color="info">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Coloured Line Chart <small>- Rounded</small>
          </h4>
        </CardHeader>
        <CardBody style={{ height: "75%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={colouredLineChart.data}
            type="Line"
            options={colouredLineChart.options}
            listener={colouredLineChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class MultipleBarchart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="rose" icon style={{ height: "15%" }}>
          <CardIcon color="rose">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Multiple Bars Chart <small>- Bar Chart</small>
          </h4>
        </CardHeader>
        <CardBody style={{ height: "75%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={multipleBarsChart.data}
            type="Bar"
            options={multipleBarsChart.options}
            listener={multipleBarsChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
          <Grid container className="close-btn">
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <DeleteIcon className="hoverText redcolorClass" />
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="hoverText redcolorClass"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => onRemoveItem()}>
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

class ColouredLinesChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="warning" icon style={{ height: "20%" }}>
          <CardIcon color="warning">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Coloured Lines Chart <small>- Rounded</small>
          </h4>
        </CardHeader>
        <CardBody style={{ height: "20%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={colouredLinesChart.data}
            type="Line"
            options={colouredLinesChart.options}
            listener={colouredLinesChart.animation}
          />
        </CardBody>
        <Grid container className="close-btn">
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <DeleteIcon className="hoverText redcolorClass" />
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="hoverText redcolorClass"
              style={{ marginTop: "2%", marginBottom: "2%" }}
              onClick={() => onRemoveItem()}>
              Remove
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

class Speedometer extends Component {
  componentDidMount() {
    var gauges = [];

    var opt = {
      gaugeRadius: 140,
      minVal: 0,
      maxVal: 100,
      needleVal: Math.round(35),
      tickSpaceMinVal: 1,
      tickSpaceMajVal: 10,
      divID: "gaugeBox",
      gaugeUnits: "%",
      outerEdgeCol: "#ea8723", //outer circle color
      tickColMin: "#80838f", //small lines
      innerCol: "#000", //inner circle color
      unitsLabelCol: "#80838f", //color of needle label color (35 number)
      tickLabelCol: "#80838f" //color of range numbers ( 0 10 20 etc)
    };

    gauges[0] = new drawGauge(opt);
  }

  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="warning" icon style={{ height: "15%" }}>
          <CardIcon color="warning">
            <Timeline />
          </CardIcon>
          <h4 style={{ color: "#000" }}>Speedometer Chart</h4>
        </CardHeader>
        <CardBody style={{ height: "75%" }}>
          <div id="gaugeBox" style={{ height: "100%", textAlign: "center" }}></div>
        </CardBody>
        <Grid container className="close-btn">
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <DeleteIcon className="hoverText redcolorClass" />
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="hoverText redcolorClass"
              style={{ marginTop: "2%", marginBottom: "2%" }}
              onClick={() => onRemoveItem()}>
              Remove
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

class DountChart extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = [
      {
        country: "Lithuania",
        litres: 501.9
      },
      {
        country: "Czech Republic",
        litres: 301.9
      },
      {
        country: "Ireland",
        litres: 201.1
      },
      {
        country: "Germany",
        litres: 165.8
      },
      {
        country: "Australia",
        litres: 139.9
      },
      {
        country: "Austria",
        litres: 128.3
      },
      {
        country: "UK",
        litres: 99
      },
      {
        country: "Belgium",
        litres: 60
      },
      {
        country: "The Netherlands",
        litres: 50
      }
    ];

    chart.innerRadius = am4core.percent(50);
    /*chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
      chart.exporting.menu.items = [{
       "label": "Export...",
      "menu": [
        { "type": "png", "label": "PNG" },
        { "type": "json", "label": "JSON" },
        { "label": "Print", "type": "print" }
      ]
    }];*/
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    //To disable lables for pie chart
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart;
  }

  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="warning" icon style={{ height: "10%" }}>
          <CardIcon color="warning">
            <Timeline />
          </CardIcon>
          <h4 style={{ color: "#000" }}>Donut Chart</h4>
        </CardHeader>
        <CardBody style={{ height: "80%" }}>
          <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
        </CardBody>
        <Grid container className="close-btn">
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <DeleteIcon className="hoverText redcolorClass" />
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="hoverText redcolorClass"
              style={{ marginTop: "2%", marginBottom: "2%" }}
              onClick={() => onRemoveItem()}>
              Remove
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

function Row(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

const PlainMqttMsg = props => {
  const root = {
    width: "100%",
    height: 400,
    maxWidth: "100%",
    backgroundColor: "white"
  };
  return (
    <div style={root} className="tr">
      <FixedSizeList height={400} width="100%" itemSize={46} itemCount={200}>
        {Row}
      </FixedSizeList>
      <Grid container className="close-btn">
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <DeleteIcon className="hoverText redcolorClass" />
        </Grid>
        <Grid item xs={6}>
          <Typography
            className="hoverText redcolorClass"
            style={{ marginTop: "2%", marginBottom: "2%" }}
            onClick={() => props.onRemoveItem()}>
            Remove
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const LineChartRound = subscribe({
  topic: "@mqtt/chart/roundline"
})(withStyles(chartsStyle)(RoundedLineChart));

const LineChartStraight = withStyles(chartsStyle)(StraightLineChart);
const BarChart = withStyles(chartsStyle)(SimpleBarChart);
const ChartPie = withStyles(chartsStyle)(PieChart);
const LineChartColoured = withStyles(chartsStyle)(ColouredLineChart);
const BarChartMultipleBars = withStyles(chartsStyle)(MultipleBarchart);
const LinesChartColoured = withStyles(chartsStyle)(ColouredLinesChart);
// const SimpleMqttMsgs = withStyles(chartsStyle)(PlainMqttMsg);

export {
  LineChartRound,
  LineChartStraight,
  BarChart,
  ChartPie,
  LineChartColoured,
  BarChartMultipleBars,
  LinesChartColoured,
  Speedometer,
  DountChart,
  PlainMqttMsg
  // SimpleMqttMsgs
};
