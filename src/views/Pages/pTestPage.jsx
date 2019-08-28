import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import "./custom.css";

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart
} from "variables/charts.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

class pTestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  static get defaultProps() {
    return {
      className: "",
      cols: { lg: 16, md: 12, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    console.log("State to be replaced with", layouts);
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Heading
          textAlign="center"
          title="React Chartist with swapable functionality"
          category={
            <span>
              A react wrapper for{" "}
              <a
                target="_blank"
                href="https://gionkunz.github.io/chartist-js/"
                rel="noopener noreferrer">
                Chartist.js
              </a>
              . Please checkout the{" "}
              <a
                href="https://gionkunz.github.io/chartist-js/getting-started.html"
                target="_blank"
                rel="noopener noreferrer">
                full documentation of Chartist.js
              </a>{" "}
              and{" "}
              <a
                href="https://fraserxu.me/react-chartist/"
                target="_blank"
                rel="noopener noreferrer">
                full documentation of react-chartist
              </a>
              .
            </span>
          }
        />

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}>
          <div key="1" data-grid={{ w: 4, h: 8.7, x: 0, y: 0, minW: 2 }}>
            <Card chart style={{ height: "100%" }}>
              <CardHeader color="rose" style={{ height: "80%" }}>
                <ChartistGraph
                  style={{ height: "100%" }}
                  className="ct-chart-white-colors"
                  data={roundedLineChart.data}
                  type="Line"
                  options={roundedLineChart.options}
                  listener={roundedLineChart.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "20%" }}>
                <h4 className={classes.cardTitle}>Rounded Line Chart</h4>
                <p className={classes.cardCategory}>Line Chart</p>
              </CardBody>
            </Card>
          </div>
          <div key="2" data-grid={{ w: 4, h: 8.7, x: 4, y: 0, minW: 2 }}>
            <Card chart style={{ height: "100%" }}>
              <CardHeader color="warning" style={{ height: "80%" }}>
                <ChartistGraph
                  style={{ height: "100%" }}
                  className="ct-chart-white-colors"
                  data={straightLinesChart.data}
                  type="Line"
                  options={straightLinesChart.options}
                  listener={straightLinesChart.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "20%" }}>
                <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
                <p className={classes.cardCategory}>Line Chart with Points</p>
              </CardBody>
            </Card>
          </div>
          <div key="3" data-grid={{ w: 4, h: 8.7, x: 8, y: 0, minW: 2, minH: 3 }}>
            <Card chart style={{ height: "100%" }}>
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
              </CardHeader>
              <CardBody style={{ height: "20%" }}>
                <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
                <p className={classes.cardCategory}>Bar Chart</p>
              </CardBody>
            </Card>
          </div>
          <div key="4" data-grid={{ w: 6, h: 11, x: 0, y: 2, minW: 2, minH: 3 }}>
            <Card style={{ height: "100%" }}>
              <CardHeader color="info" icon style={{ height: "20%" }}>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Coloured Line Chart <small>- Rounded</small>
                </h4>
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
          </div>
          <div key="5" data-grid={{ w: 6, h: 11, x: 6, y: 2, minW: 2, minH: 3 }}>
            <Card style={{ height: "100%" }}>
              <CardHeader color="danger" icon style={{ height: "20%" }}>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Pie Chart</h4>
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
          </div>
          <div key="6" data-grid={{ w: 6, h: 11, x: 0, y: 4, minW: 2, minH: 3 }}>
            <Card style={{ height: "100%" }}>
              <CardHeader color="rose" icon style={{ height: "20%" }}>
                <CardIcon color="rose">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Multiple Bars Chart <small>- Bar Chart</small>
                </h4>
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
          </div>
          <div key="7" data-grid={{ w: 6, h: 11, x: 6, y: 4, minW: 2, minH: 3 }}>
            <Card style={{ height: "100%" }}>
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
            </Card>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default withStyles(chartsStyle)(pTestPage);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
