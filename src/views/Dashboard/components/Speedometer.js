import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import Gauge from "./gauge";

class Speedometer extends Component {
  state = {
    isOpen: false,
    gauges: []
  };

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    this.createGauges();
    // setInterval(this.updateGauges, 5000);
    this.updateGauges();
  }

  createGauges() {
    this.createGauge("memory", "Memory");
  }

  createGauge(name, label, min, max) {
    var config = {
      size: 320,
      label: label,
      min: undefined != min ? min : 0,
      max: undefined != max ? max : 100,
      minorTicks: 5
    };

    var range = config.max - config.min;
    config.yellowZones = [{ from: config.min + range * 0.75, to: config.min + range * 0.9 }];
    config.redZones = [{ from: config.min + range * 0.9, to: config.max }];

    this.state.gauges[name] = new Gauge(name + "GaugeContainer", config);
    this.state.gauges[name].render();
  }

  updateGauges() {
    for (var key in this.state.gauges) {
      var value = this.getRandomValue(this.state.gauges[key]);
      console.log(value);
      this.state.gauges[key].redraw(value);
    }
  }

  getRandomValue(gauge) {
    var overflow = 0; //10;
    return (
      gauge.config.min -
      overflow +
      (gauge.config.max - gauge.config.min + overflow * 2) * Math.random()
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Speedometer
            <div className="card-header-actions">
              <ButtonGroup className="float-right">
                <ButtonDropdown
                  id="card1"
                  isOpen={this.state.isOpen}
                  toggle={() => {
                    this.setState({ isOpen: !this.state.isOpen });
                  }}>
                  <DropdownToggle caret className="p-0" color="">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.onRemoveItem}>Remove</DropdownItem>
                    <DropdownItem disabled>Change chart's config</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
            </div>
          </CardHeader>
          <CardBody>
            <div
              className="chart-wrapper"
              id="memoryGaugeContainer"
              style={{ textAlign: "center" }}></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.speedometerData
});

export default connect(mapStateToProps)(Speedometer);
