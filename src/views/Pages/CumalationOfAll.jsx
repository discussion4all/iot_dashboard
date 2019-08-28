import React, { Component } from "react";
/*import Example from "./Example";
import SpineChart from "./SpineChart";
import PieChartSection from "./piechart";
import BarChart from "./BarChart";
import logo from "../logo.svg";*/
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const originalLayouts =
  getFromLS("layouts") ||
  [0, 1, 2, 3, 4].map(function(i, key, list) {
    return {
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      add: i === (list.length - 1).toString()
    };
  });

class CumalationOfAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayouts)),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 150
  };

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;

    return (
      <div key={i} data-grid={el} style={{ border: "1px solid purple" }}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too.">
            Add +
          </span>
        ) : (
          <div className="text">
            <Example></Example>
          </div>
        )}
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout, layouts) {
    console.log("State to be replaced with ", layout);
    saveToLS("layouts", layout);
    this.setState({ items: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    const { items, breakpoint } = this.state;
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          verticalCompact={true}
          autoSize={true}
          {...this.props}>
          {_.map(items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
        {breakpoint === "md" && console.log("breakpoint", breakpoint)}
      </div>
    );
  }
}

export default CumalationOfAll;

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
