import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Heading from "components/Heading/Heading.jsx";
import "./custom.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import {
  LineChartRound,
  LineChartStraight,
  BarChart,
  ChartPie,
  LineChartColoured,
  BarChartMultipleBars,
  LinesChartColoured,
  Speedometer,
  Circlechart,
  DountChart
} from "./ChartsComponent/ChartComponents";

import Button from "components/CustomButtons/Button.jsx";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts =
  getFromLS("layouts") ||
  [0, 1, 2, 4, 5, 7, 8].map(function(i, key, list) {
    if (i === 0 || i === 1 || i === 2) {
      console.log("if", i);
      return {
        i: i.toString(),
        x: i * 4,
        y: 0,
        w: 4,
        h: 9,
        minW: 3,
        minH: 6,
        add: i === (list.length - 1).toString()
      };
    } else {
      console.log("else", i);
      return {
        i: i.toString(),
        x: i % 2 === 0 ? 6 : 0,
        y: 9,
        w: 6,
        h: 11,
        minW: 4,
        minH: 10,
        add: i === (list.length - 1).toString()
      };
    }
  });

class pTestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayouts)),
      simpleSelect: "",
      newCounter: 0
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
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

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;

    if (i === "0") {
      return (
        <div key={i} data-grid={el}>
          <LineChartRound removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(0)} />
        </div>
      );
    }
    if (i === "1") {
      return (
        <div key={i} data-grid={el}>
          <LineChartStraight removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(1)} />
        </div>
      );
    }
    if (i === "2") {
      return (
        <div key={i} data-grid={el}>
          <BarChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(2)} />
        </div>
      );
    }
    if (i === "3") {
      return (
        <div key={i} data-grid={el}>
          <LineChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(3)} />
        </div>
      );
    }
    if (i === "4") {
      return (
        <div key={i} data-grid={el}>
          <ChartPie removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(4)} />
        </div>
      );
    }
    if (i === "5") {
      return (
        <div key={i} data-grid={el}>
          <BarChartMultipleBars
            removeStyle={removeStyle}
            onRemoveItem={() => this.onRemoveItem(5)}
          />
        </div>
      );
    }
    if (i === "6") {
      return (
        <div key={i} data-grid={el}>
          <LinesChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(6)} />
        </div>
      );
    }
    if (i === "7") {
      return (
        <div key={i} data-grid={el}>
          <Speedometer removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(7)} />
        </div>
      );
    }
    if (i === "8") {
      return (
        <div key={i} data-grid={el}>
          <DountChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(8)} />
        </div>
      );
    }
  }

  onRemoveItem = i => {
    this.setState({ items: _.filter(this.state.items, item => item.i !== i.toString()) });
  };

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout, layouts) {
    this.setState({ items: layout });
  }

  saveLayout = () => {
    saveToLS("layouts", this.state.items);
  };

  addChart = event => {
    const selectedItem = event.target.value;
    const { items } = this.state;

    const query = items.filter(item => item.i === selectedItem);

    if (query.length > 0) {
      alert("Chart Already On The Page");
    } else {
      console.log("selec", typeof selectedItem);
      if (selectedItem === "0" || selectedItem === "1" || selectedItem === "2") {
        console.log("selcted", selectedItem);
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: 0,
            y: Infinity, // puts it at the bottom
            w: 4,
            h: 9,
            minW: 3,
            minH: 6
          })
        });
      } else {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: selectedItem % 2 === 0 ? 6 : 0,
            y: Infinity, // puts it at the bottom
            w: 6,
            h: 11,
            minW: 4,
            minH: 10
          })
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { items } = this.state;

    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "90%" }}>
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}
              style={{ marginRight: "15px" }}>
              Choose A Component To Display
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.addChart}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}>
              <MenuItem
                disabled={items.filter(item => item.i === "0").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="0">
                Rounded Line Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "1").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="1">
                Straight Lines Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "2").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2">
                Simple Bar Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "3").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3">
                Coloured Line Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "4").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="4">
                Pie Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "5").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="5">
                Multiple Bars Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "6").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="6">
                Coloured Lines Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "7").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="7">
                Speedometer
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "8").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="8">
                Donut chart
              </MenuItem>
            </Select>
          </div>
          <div>
            <Button
              color="primary"
              className={classes.marginRight}
              onClick={() => this.saveLayout()}>
              Save Your Layout
            </Button>
          </div>
        </div>

        <ResponsiveReactGridLayout
          {...this.props}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}>
          {_.map(items, el => this.createElement(el))}
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
