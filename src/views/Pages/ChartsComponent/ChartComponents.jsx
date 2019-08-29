import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ChartistGraph from "react-chartist";
import CardIcon from "components/Card/CardIcon.jsx";
import Timeline from "@material-ui/icons/Timeline";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  pieChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart
} from "variables/charts.jsx";

import { withStyles } from "@material-ui/core";
import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

class RoundedLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader color="rose" style={{ height: "80%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={roundedLineChart.data}
            type="Line"
            options={roundedLineChart.options}
            listener={roundedLineChart.animation}
          />
          <span className="close-btn" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "20%" }}>
          <h4 className={classes.cardTitle}>Rounded Line Chart </h4>{" "}
          <p className={classes.cardCategory}>Line Chart</p>
        </CardBody>
      </Card>
    );
  }
}

class StraightLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader color="warning" style={{ height: "80%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={straightLinesChart.data}
            type="Line"
            options={straightLinesChart.options}
            listener={straightLinesChart.animation}
          />
          <span className="close-btn" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "20%" }}>
          <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
          <p className={classes.cardCategory}>Line Chart with Points</p>
        </CardBody>
      </Card>
    );
  }
}

class SimpleBarChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader color="info" style={{ height: "80%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={simpleBarChart.data}
            type="Bar"
            options={simpleBarChart.options}
            responsiveOptions={simpleBarChart.responsiveOptions}
            listener={simpleBarChart.animation}
          />
          <span className="close-btn" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "20%" }}>
          <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
          <p className={classes.cardCategory}>Bar Chart</p>
        </CardBody>
      </Card>
    );
  }
}

class PieChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="danger" icon style={{ height: "20%" }}>
          <CardIcon color="danger">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Pie Chart</h4>
          <span className="close-btn black-sign" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "80%" }}>
          <ChartistGraph
            data={pieChart.data}
            type="Pie"
            options={pieChart.options}
            style={{ height: "100%" }}
          />
        </CardBody>
        <CardFooter stats className={classes.cardFooter}>
          <h6 className={classes.legendTitle}>Legend</h6>
          <i className={"fas fa-circle " + classes.info} /> Apple{` `}
          <i className={"fas fa-circle " + classes.warning} /> Samsung{` `}
          <i className={"fas fa-circle " + classes.danger} /> Windows Phone{` `}
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
        <CardHeader color="info" icon style={{ height: "20%" }}>
          <CardIcon color="info">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Coloured Line Chart <small>- Rounded</small>
          </h4>
          <span className="close-btn black-sign" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "80%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={colouredLineChart.data}
            type="Line"
            options={colouredLineChart.options}
            listener={colouredLineChart.animation}
          />
        </CardBody>
      </Card>
    );
  }
}

class MultipleBarchart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="rose" icon style={{ height: "20%" }}>
          <CardIcon color="rose">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Multiple Bars Chart <small>- Bar Chart</small>
          </h4>
          <span className="close-btn black-sign" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
        </CardHeader>
        <CardBody style={{ height: "80%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={multipleBarsChart.data}
            type="Bar"
            options={multipleBarsChart.options}
            listener={multipleBarsChart.animation}
          />
        </CardBody>
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
          <span className="close-btn black-sign" style={removeStyle} onClick={() => onRemoveItem()}>
            <b>X</b>
          </span>
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
      </Card>
    );
  }
}

const LineChartRound = withStyles(chartsStyle)(RoundedLineChart);
const LineChartStraight = withStyles(chartsStyle)(StraightLineChart);
const BarChart = withStyles(chartsStyle)(SimpleBarChart);
const ChartPie = withStyles(chartsStyle)(PieChart);
const LineChartColoured = withStyles(chartsStyle)(ColouredLineChart);
const BarChartMultipleBars = withStyles(chartsStyle)(MultipleBarchart);
const LinesChartColoured = withStyles(chartsStyle)(ColouredLinesChart);

export {
  LineChartRound,
  LineChartStraight,
  BarChart,
  ChartPie,
  LineChartColoured,
  BarChartMultipleBars,
  LinesChartColoured
};
