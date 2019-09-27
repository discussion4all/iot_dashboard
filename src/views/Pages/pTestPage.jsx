import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

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
  DountChart,
  SimpleMqttMsgs
} from "./ChartsComponent/ChartComponents";

import Button from "components/CustomButtons/Button.jsx";
import Grid from "@material-ui/core/Grid";
import { getDashboard, saveDashboard } from "../../actions/dashboard_actions";
import { setSubscriptions } from "../../actions/chartDataBindAction";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import ChartDataForm from "./Components/ChartDataForm";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts =
  getFromLS("layouts") ||
  [0, 1, 2, 4, 5, 7, 8].map(function(i, key, list) {
    if (i === 0 || i === 1 || i === 2) {
      return {
        i: i.toString(),
        x: i * 6,
        y: 0,
        w: 1,
        h: 10,
        minW: 1,
        minH: 10,
        maxW: 2,
        maxH: 10,
        add: i === (list.length - 1).toString()
      };
    } else {
      return {
        i: i.toString(),
        x: i % 2 === 0 ? 6 : 0,
        y: 9,
        w: 1,
        h: 11,
        minW: 1,
        minH: 11,
        maxW: 2,
        maxH: 11,
        add: i === (list.length - 1).toString()
      };
    }
  });

class pTestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayouts)),
      simpleSelect: "selectItem",
      newCounter: 0,
      selectedItem: null,
      alert: null,
      selectedData: null,
      makeChart: false
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
  }

  componentDidMount() {
    this.props.getDashboard("");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard.layout.length > 0) {
      let itemsData = JSON.parse(nextProps.dashboard.layout[0].layoutData);

      this.setState({
        items: itemsData.layouts
      });
      saveToLS("layouts", itemsData.layouts);
    } else {
      this.setState({
        items: JSON.parse(JSON.stringify(originalLayouts))
      });
      saveToLS("layouts", JSON.parse(JSON.stringify(originalLayouts)));
    }
  }
  static get defaultProps() {
    return {
      className: "",
      cols: { lg: 16, md: 2, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
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
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartRound removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(0)} />
        </div>
      );
    }
    if (i === "1") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartStraight removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(1)} />
        </div>
      );
    }
    if (i === "2") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(2)} />
        </div>
      );
    }
    if (i === "3") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(3)} />
        </div>
      );
    }
    if (i === "4") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <ChartPie removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(4)} />
        </div>
      );
    }
    if (i === "5") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChartMultipleBars
            removeStyle={removeStyle}
            onRemoveItem={() => this.onRemoveItem(5)}
          />
        </div>
      );
    }
    if (i === "6") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LinesChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(6)} />
        </div>
      );
    }
    if (i === "7") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <Speedometer removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(7)} />
        </div>
      );
    }
    if (i === "8") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <DountChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(8)} />
        </div>
      );
    }
    if (i === "9") {
      return (
        <div
          key={i}
          style={{ paddingBottom: "20px", paddingTop: "26px" }}
          data-grid={{ ...el, h: 10, i: "9", minH: 10, minW: 1, w: 1, maxW: 2, maxH: 10 }}>
          <SimpleMqttMsgs removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(9)} />
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
    let tmpdata = getFromLS("layouts");

    let obj = { layouts: tmpdata };
    let data = { layoutData: obj };
    this.props.saveDashboard(data);
  };

  resetLayout = () => {
    let DBLayout = getFromLS("layouts");

    const savedLayout = JSON.parse(JSON.stringify(DBLayout));

    this.setState({ items: [] });
    setTimeout(() => {
      this.setState({ items: savedLayout });
    }, 0);
  };

  addChart = event => {
    const selectedItem = event.target.value;
    this.setState({
      selectedItem: selectedItem
    });
    const { items } = this.state;
    this.dataFeedPopup();
    const query = items.filter(item => item.i === selectedItem);

    // if (query.length > 0) {
    //   alert("Chart Already On The Page");
    // } else {
    //   if (selectedItem === "0" || selectedItem === "1" || selectedItem === "2") {
    //     this.setState({
    //       items: this.state.items.concat({
    //         i: selectedItem,
    //         x: 0,
    //         y: Infinity, // puts it at the bottom
    //         w: 1,
    //         h: 10,
    //         minW: 1,
    //         minH: 10,
    //         maxW: 2,
    //         maxH: 10
    //       })
    //     });
    //   } else {
    //     this.setState({
    //       items: this.state.items.concat({
    //         i: selectedItem,
    //         x: selectedItem % 2 === 0 ? 6 : 0,
    //         y: Infinity, // puts it at the bottom
    //         w: 1,
    //         h: 11,
    //         minW: 1,
    //         minH: 11,
    //         maxW: 2,
    //         maxH: 11
    //       })
    //     });
    //   }
    // }
  };

  dataFeedPopup = () => {
    this.setState({
      alert: (
        <SweetAlert
          showCancel
          style={{ display: "block", marginTop: "-250px", width: "60%", marginLeft: "-29%" }}
          title="Set Configuration for this Chart "
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={this.props.classes.button + " " + this.props.classes.info}
          cancelBtnCssClass={this.props.classes.button + " " + this.props.classes.danger}>
          <ChartDataForm getsBindData={this.setChartData} />
        </SweetAlert>
      )
    });
  };

  inputConfirmAlert(e) {
    this.setState({ alert: null, makeChart: true });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  setChartData = config => {
    if (this.state.makeChart) {
      this.setState({
        selectedData: config,
        makeChart: false
      });
      this.props.setSubscriptions(this.state.selectedItem, config);
      this.makeChart(this.state.selectedItem, config);
    }
  };

  makeChart = (selectedItem, selectedData) => {
    const { items } = this.state;

    const query = items.filter(item => item.i === selectedItem);

    if (query.length > 0) {
      alert("Chart Already On The Page");
    } else {
      if (selectedItem === "0" || selectedItem === "1" || selectedItem === "2") {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: 0,
            y: Infinity, // puts it at the bottom
            w: 1,
            h: 10,
            minW: 1,
            minH: 10,
            maxW: 2,
            maxH: 10
          })
        });
      } else {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: selectedItem % 2 === 0 ? 6 : 0,
            y: Infinity, // puts it at the bottom
            w: 1,
            h: 11,
            minW: 1,
            minH: 11,
            maxW: 2,
            maxH: 11
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
        <Grid container>
          <Grid item md={8}>
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
              <MenuItem value="selectItem" disabled>
                Select Item
              </MenuItem>
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
              <MenuItem
                disabled={items.filter(item => item.i === "9").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="9">
                MQTT MSGs
              </MenuItem>
            </Select>
          </Grid>
          <Grid item md={2}>
            <Button
              color="primary"
              className={classes.marginRight}
              onClick={() => this.saveLayout()}>
              Save Your Layout
            </Button>
          </Grid>
          <Grid item md={2}>
            {" "}
            <Button
              color="primary"
              className={classes.marginRight}
              onClick={() => this.resetLayout()}>
              Reset Layout
            </Button>
          </Grid>
        </Grid>

        {this.state.alert}

        <ResponsiveReactGridLayout
          {...this.props}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          onBreakpointChange={this.onBreakpointChange}>
          {_.map(items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => {
  return {
    getDashboard: itemData => {
      dispatch(getDashboard(itemData));
    },
    saveDashboard: itemData => {
      dispatch(saveDashboard(itemData));
    },
    setSubscriptions: (chart, itsData) => {
      dispatch(setSubscriptions(chart, itsData));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(sweetAlertStyle)(pTestPage));

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
  //return JSON.stringify({[key]: value});
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
