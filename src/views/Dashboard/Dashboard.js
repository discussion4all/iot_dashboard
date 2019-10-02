import React, { Component } from "react";
import { Button, Col, Row, Input } from "reactstrap";
import ChartDataForm from "./components/ChartDataform";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import { setSubscriptions } from "../../actions/chartDataBindAction";
import { getDashboard, saveDashboard } from "../../actions/dashBoardActions";
import { Responsive } from "react-grid-layout";
import _ from "lodash";
import "./dashboard.css";
import { withResizeDetector } from "react-resize-detector";
// Chart Components
const BarChart = React.lazy(() => import("./components/BarChart"));
const LineChartRound = React.lazy(() => import("./components/LineChartRound"));
const LineChartStraight = React.lazy(() => import("./components/LineChartStraight"));
const LineChartColoured = React.lazy(() => import("./components/LineChartColoured"));
const PieChart = React.lazy(() => import("./components/PieChart"));
const BarChartMultipleBars = React.lazy(() => import("./components/BarChartMultipleBars"));
const LinesChartColoured = React.lazy(() => import("./components/LineschartColoured"));
const Speedometer = React.lazy(() => import("./components/Speedometer"));
const DonutChart = React.lazy(() => import("./components/DonutChart"));
const PlainMqttMessages = React.lazy(() => import("./components/PlainMqttMessages"));

const ResponsiveReactGridLayout = withResizeDetector(Responsive);
const originalLayouts =
  getFromLS("layouts") ||
  [].map(function(i, key, list) {
    if (i === 0 || i === 1 || i === 2) {
      return {
        i: i.toString(),
        x: i * 6,
        y: 0,
        w: 1,
        h: 10,
        minW: 1,
        minH: 10,
        maxW: 3,
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
        maxW: 3,
        maxH: 11,
        add: i === (list.length - 1).toString()
      };
    }
  });

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayouts)),
      simpleSelect: "selectItem",
      selectedItem: null,
      alert: null,
      selectedData: null,
      makeChart: false
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
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
      cols: { lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 },
      rowHeight: 25
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
          <LineChartRound onRemoveItem={() => this.onRemoveItem(0)} />
        </div>
      );
    }
    if (i === "1") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartStraight onRemoveItem={() => this.onRemoveItem(1)} />
        </div>
      );
    }
    if (i === "2") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChart onRemoveItem={() => this.onRemoveItem(2)} />
        </div>
      );
    }
    if (i === "3") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartColoured onRemoveItem={() => this.onRemoveItem(3)} />
        </div>
      );
    }
    if (i === "4") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <PieChart onRemoveItem={() => this.onRemoveItem(4)} />
        </div>
      );
    }
    if (i === "5") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChartMultipleBars onRemoveItem={() => this.onRemoveItem(5)} />
        </div>
      );
    }
    if (i === "6") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LinesChartColoured onRemoveItem={() => this.onRemoveItem(6)} />
        </div>
      );
    }
    if (i === "7") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <Speedometer onRemoveItem={() => this.onRemoveItem(7)} />
        </div>
      );
    }
    if (i === "8") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <DonutChart onRemoveItem={() => this.onRemoveItem(8)} />
        </div>
      );
    }
    if (i === "9") {
      return (
        <div
          key={i}
          style={{ paddingBottom: "20px" }}
          data-grid={{ ...el, h: 9.25, i: "9", minH: 9.25, minW: 1, w: 1, maxW: 2, maxH: 9.25 }}>
          <PlainMqttMessages onRemoveItem={() => this.onRemoveItem(9)} />
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
    this.dataFeedPopup();
  };

  dataFeedPopup = () => {
    this.setState({
      alert: (
        <SweetAlert
          showCancel
          style={{ display: "block", marginTop: "-250px", width: "60%", marginLeft: "-29%" }}
          title="Set Configuration for this Chart "
          confirmBtnText="Done"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default">
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
            h: 9,
            minW: 1,
            minH: 9,
            maxW: 3,
            maxH: 9
          })
        });
      } else {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: selectedItem % 2 === 0 ? 6 : 0,
            y: Infinity, // puts it at the bottom
            w: 1,
            h: 9,
            minW: 1,
            minH: 9,
            maxW: 3,
            maxH: 9
          })
        });
      }
    }
  };

  render() {
    const { items } = this.state;

    return (
      <div className="animated fadeIn" ref="mainDivRef">
        <Row>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Input
              style={{ color: "black" }}
              type="select"
              name="simpleSelect"
              id="simpleSelect"
              value={this.state.simpleSelect}
              onChange={this.addChart}>
              <option value="selectItem" disabled>
                Select Item
              </option>
              <option value="0" disabled={items.filter(item => item.i === "0").length > 0}>
                Rounded Line Chart
              </option>
              <option value="1" disabled={items.filter(item => item.i === "1").length > 0}>
                Straight Lines Chart
              </option>
              <option value="2" disabled={items.filter(item => item.i === "2").length > 0}>
                Simple Bar Chart
              </option>
              <option value="3" disabled={items.filter(item => item.i === "3").length > 0}>
                Coloured Line Chart
              </option>
              <option value="4" disabled={items.filter(item => item.i === "4").length > 0}>
                Pie Chart
              </option>
              <option value="5" disabled={items.filter(item => item.i === "5").length > 0}>
                Multiple Bars Chart
              </option>
              <option value="6" disabled={items.filter(item => item.i === "6").length > 0}>
                Coloured Lines Chart
              </option>
              <option value="7" disabled={items.filter(item => item.i === "7").length > 0}>
                Speedometer
              </option>
              <option value="8" disabled={items.filter(item => item.i === "8").length > 0}>
                Donut chart
              </option>
              <option value="9" disabled={items.filter(item => item.i === "9").length > 0}>
                MQTT MSGs
              </option>
            </Input>
          </Col>
          <Col xs="12" sm="6" lg="3"></Col>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Button block onClick={this.saveLayout}>
              Save Your Layout
            </Button>
          </Col>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Button block onClick={this.resetLayout}>
              Reset Layout
            </Button>
          </Col>
        </Row>
        <br />
        {this.state.alert}

        <ResponsiveReactGridLayout
          cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={30}
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

const mapDispatchToProps = dispatch => ({
  getDashboard: itemData => {
    dispatch(getDashboard(itemData));
  },
  saveDashboard: itemData => {
    dispatch(saveDashboard(itemData));
  },
  setSubscriptions: (chart, itsData) => {
    dispatch(setSubscriptions(chart, itsData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

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
