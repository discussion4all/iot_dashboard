import React, { Component } from "react";
import { Button, Col, Row, Input } from "reactstrap";
import ChartDataForm from "./components/ChartDataform";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import { setSubscriptions } from "../../actions/chartDataBindAction";

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

class Dashboard extends Component {
  state = {
    items: JSON.parse(JSON.stringify(originalLayouts)),
    simpleSelect: "selectItem",
    selectedItem: null,
    alert: null,
    selectedData: null,
    makeChart: false
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
    console.log(config);
    if (this.state.makeChart) {
      this.setState({
        selectedData: config,
        makeChart: false
      });
      this.props.setSubscriptions(this.state.selectedItem, config);
      // this.makeChart(this.state.selectedItem, config);
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Input
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
              <option value="3">Coloured Line Chart</option>
              <option value="4">Pie Chart</option>
              <option value="5">Multiple Bars Chart</option>
              <option value="6">Coloured Lines Chart</option>
              <option value="7">Speedometer</option>
              <option value="8">Donut chart</option>
              <option value="9">MQTT MSGs</option>
            </Input>
          </Col>
          <Col xs="12" sm="6" lg="3"></Col>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Button block>Save Your Layout</Button>
          </Col>
          <Col xs="12" sm="6" lg="3" className="mb-3 mb-xl-0">
            <Button block>Reset Layout</Button>
          </Col>
        </Row>
        <br />
        {this.state.alert}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => ({
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
