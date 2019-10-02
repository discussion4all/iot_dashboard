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

class lineChartRound extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Line Chart Round
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class barChart extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Bar Chart
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class lineChartStraight extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Line Chart Straight
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class lineChartColoured extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Line Chart Coloured
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class pieChart extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Pie Chart
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class barchartMultipleBars extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Bar Chart Multiple Bars
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class linesChartColoured extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Lines Chart Coloured
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class speedometer extends Component {
  state = {
    isOpen: false
  };

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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class donutChart extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Donut Chart
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class plainMqttMessages extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Plain MQTT Messages
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
            <div className="chart-wrapper"></div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages
});

const LineChartRound = connect(mapStateToProps)(lineChartRound);
const BarChart = connect(mapStateToProps)(barChart);
const LineChartStraight = connect(mapStateToProps)(lineChartStraight);
const LineChartColoured = connect(mapStateToProps)(lineChartColoured);
const PieChart = connect(mapStateToProps)(pieChart);
const BarChartMultipleBars = connect(mapStateToProps)(barchartMultipleBars);
const LinesChartColoured = connect(mapStateToProps)(linesChartColoured);
const Speedometer = connect(mapStateToProps)(speedometer);
const DonutChart = connect(mapStateToProps)(donutChart);
const PlainMqttMessages = connect(mapStateToProps)(plainMqttMessages);

export {
  LineChartRound,
  BarChart,
  LineChartStraight,
  LineChartColoured,
  PieChart,
  BarChartMultipleBars,
  LinesChartColoured,
  Speedometer,
  DonutChart,
  PlainMqttMessages
};
