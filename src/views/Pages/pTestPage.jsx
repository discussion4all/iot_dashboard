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
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
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
          title="React Chartist"
          category={
            <span>
              A react wrapper for{" "}
              <a
                target="_blank"
                href="https://gionkunz.github.io/chartist-js/"
                rel="noopener noreferrer"
              >
                Chartist.js
              </a>. Please checkout the{" "}
              <a
                href="https://gionkunz.github.io/chartist-js/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                full documentation of Chartist.js
              </a>{" "}
              and{" "}
              <a
                href="https://fraserxu.me/react-chartist/"
                target="_blank"
                rel="noopener noreferrer"
              >
                full documentation of react-chartist
              </a>.
            </span>
          }
        />

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}>
          <div
            key="1"
            data-grid={{ w: 3.5, h: 8, x: 0, y: 0, minW: 2, minH: 8 }}
            style={{ border: "1px solid purple" }}>
            <GridItem xs={12} sm={12} md={10}>
            <Card chart>
              <CardHeader color="rose">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={roundedLineChart.data}
                  type="Line"
                  options={roundedLineChart.options}
                  listener={roundedLineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Rounded Line Chart</h4>
                <p className={classes.cardCategory}>Line Chart</p>
              </CardBody>
            </Card>
          </GridItem>
          </div>
          <div
            key="2"
            data-grid={{ w: 4, h: 8, x: 2, y: 0, minW: 2, minH: 8 }}
            style={{ border: "1px solid purple" }}>
            <GridItem xs={12} sm={12} md={10}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={straightLinesChart.data}
                  type="Line"
                  options={straightLinesChart.options}
                  listener={straightLinesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
                <p className={classes.cardCategory}>Line Chart with Points</p>
              </CardBody>
            </Card>
          </GridItem>


            
          </div>
          <div
            key="3"
            data-grid={{ w: 4, h: 8, x: 4, y: 0, minW: 2, minH: 8 }}
            style={{ border: "1px solid purple" }}>
             <GridItem xs={12} sm={12} md={10}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={simpleBarChart.data}
                  type="Bar"
                  options={simpleBarChart.options}
                  responsiveOptions={simpleBarChart.responsiveOptions}
                  listener={simpleBarChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
                <p className={classes.cardCategory}>Bar Chart</p>
              </CardBody>
            </Card>
          </GridItem>
          </div>
          <div
            key="4"
            data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}
            style={{ border: "1px solid purple" }}>
            <span className="text">4</span>
          </div>
          <div
            key="5"
            data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}
            style={{ border: "1px solid purple" }}>
            <span className="text">5</span>
          </div>
        </ResponsiveReactGridLayout>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="rose">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={roundedLineChart.data}
                  type="Line"
                  options={roundedLineChart.options}
                  listener={roundedLineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Rounded Line Chart</h4>
                <p className={classes.cardCategory}>Line Chart</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={straightLinesChart.data}
                  type="Line"
                  options={straightLinesChart.options}
                  listener={straightLinesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
                <p className={classes.cardCategory}>Line Chart with Points</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={simpleBarChart.data}
                  type="Bar"
                  options={simpleBarChart.options}
                  responsiveOptions={simpleBarChart.responsiveOptions}
                  listener={simpleBarChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
                <p className={classes.cardCategory}>Bar Chart</p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Coloured Line Chart <small>- Rounded</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={colouredLineChart.data}
                  type="Line"
                  options={colouredLineChart.options}
                  listener={colouredLineChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Multiple Bars Chart <small>- Bar Chart</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={multipleBarsChart.data}
                  type="Bar"
                  options={multipleBarsChart.options}
                  listener={multipleBarsChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Coloured Lines Chart <small>- Rounded</small>
                </h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={colouredLinesChart.data}
                  type="Line"
                  options={colouredLinesChart.options}
                  listener={colouredLinesChart.animation}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Pie Chart</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={pieChart.data}
                  type="Pie"
                  options={pieChart.options}
                />
              </CardBody>
              <CardFooter stats className={classes.cardFooter}>
                <h6 className={classes.legendTitle}>Legend</h6>
                <i className={"fas fa-circle " + classes.info} /> Apple{` `}
                <i
                  className={"fas fa-circle " + classes.warning}
                /> Samsung{` `}
                <i className={"fas fa-circle " + classes.danger} /> Windows
                Phone{` `}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
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

