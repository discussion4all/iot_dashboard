import React, { Component } from "react";
import { Button, Col, Row, Input } from "reactstrap";
import ChartDataForm from "./components/ChartDataform";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import { setSubscriptions } from "../../actions/chartDataBindAction";
import {
  getDashboard,
  saveDashboard,
  saveChartConfig,
  getChartConfig
} from "../../actions/dashBoardActions";
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
      makeChart: false,
      configArr: []
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount() {
    this.props.getDashboard("");
    this.props.getChartConfig();
  }

  componentWillReceiveProps(nextProps) {
    //set Subscription according to selected types.
    if (nextProps.dashboard.config.length > 0) {
      for (let i = 0; i < nextProps.dashboard.config.length; i++) {
        this.props.setSubscriptions(
          nextProps.dashboard.config[i].selectedChartIndex,
          nextProps.dashboard.config[i].chartconfig
        );
      }
    }

    if (nextProps.dashboard.layout.length > 0) {
      if (nextProps.dashboard.layout[0].layoutData !== undefined) {
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
      rowHeight: 35
    };
  }

  createElement(el) {
    const i = el.i;

    if (i[0] === "0") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartRound onRemoveItem={() => this.onRemoveItem(i)} id={i} />
        </div>
      );
    }
    if (i[0] === "1") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartStraight onRemoveItem={() => this.onRemoveItem(i)} id={i} />
        </div>
      );
    }
    if (i[0] === "2") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChart onRemoveItem={() => this.onRemoveItem(i)} id={i} />
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
    if (i[0] === "4") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <PieChart onRemoveItem={() => this.onRemoveItem(i)} id={i} />
        </div>
      );
    }
    if (i[0] === "5") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChartMultipleBars onRemoveItem={() => this.onRemoveItem(i)} id={i} />
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
    if (i[0] === "7") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <Speedometer onRemoveItem={() => this.onRemoveItem(i)} id={i} />
        </div>
      );
    }
    if (i[0] === "8") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <DonutChart onRemoveItem={() => this.onRemoveItem(i)} id={i} />
        </div>
      );
    }
    if (i[0] === "9") {
      return (
        <div
          key={i}
          style={{ paddingBottom: "20px" }}
          data-grid={{ ...el, h: 9.25, i: "9", minH: 9.25, minW: 1, w: 1, maxW: 2, maxH: 9.25 }}>
          <PlainMqttMessages onRemoveItem={() => this.onRemoveItem(i)} id={i} />
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

    this.props.saveChartConfig(this.state.configArr);
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
    config.chartID = this.state.selectedItem + config.chartID;
    if (this.state.makeChart) {
      this.setState({
        selectedData: config,
        makeChart: false
      });

      //console.log(this.state.selectedItem,'Config....',config);
      this.props.setSubscriptions(this.state.selectedItem, config);
      this.makeChart(this.state.selectedItem, config);
      let newconfigobj = { chartconfig: config, selectedChartIndex: this.state.selectedItem };
      this.setState(prevState => ({
        configArr: [...prevState.configArr, newconfigobj]
      }));
    }
  };

  makeChart = (selectedItem, selectedData) => {
    const items = [...this.state.items];

    switch (selectedItem) {
      case "0":
        selectedItem = selectedData.chartID;
        break;
      case "1":
        selectedItem = selectedData.chartID;
        break;
      case "2":
        selectedItem = selectedData.chartID;
        break;
      case "4":
        selectedItem = selectedData.chartID;
        break;
      case "5":
        selectedItem = "5" + new Date().getTime().toString();
        break;
      case "7":
        selectedItem = selectedData.chartID;
        break;
      case "8":
        selectedItem = selectedData.chartID;
        break;
      case "9":
        selectedItem = selectedData.chartID;
        break;
      default:
        break;
      // }
    }

    const withNewItems = items.concat({
      i: selectedItem,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: 1,
      h: 11,
      minW: 1,
      minH: 11,
      maxW: 3,
      maxH: 11
    });
    this.setState({
      items: withNewItems
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="animated fadeIn" style={{ height: 0 }}>
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
              <option value="0">Rounded Line Chart</option>
              <option value="1">Straight Lines Chart</option>
              <option value="2">Simple Bar Chart</option>
              {/* <option value="3" >
                Coloured Line Chart
              </option> */}
              <option value="4">Pie Chart</option>
              {/* <option value="5">Multiple Bars Chart</option> */}
              {/* <option value="6" >
                Coloured Lines Chart
              </option> */}
              <option value="7">Speedometer</option>
              <option value="8">Donut chart</option>
              <option value="9">MQTT MSGs</option>
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
  },
  saveChartConfig: itemData => {
    dispatch(saveChartConfig(itemData));
  },
  getChartConfig: itemData => {
    dispatch(getChartConfig(itemData));
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
