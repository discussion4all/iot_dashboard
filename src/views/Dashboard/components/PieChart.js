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
import { Pie } from "react-d3-pie";
import ReactResizeDetector from "react-resize-detector";
import "./charts.css";

class PieChart extends Component {
  state = {
    isOpen: false,
    height: 320,
    width: 460
  };

  onResize = (width, height) => {
    this.setState({
      width: width,
      height: height
    });
  };

  render() {
    const initData = [
      { name: "test1", value: 1 },
      { name: "test2", value: 2 },
      { name: "test3", value: 3 }
    ];
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
            <ReactResizeDetector handleWidth onResize={this.onResize} />
            <div className="chart-wrapper" style={{ textAlign: "center" }}>
              <Pie
                width={this.state.width}
                height={this.state.height}
                data={initData}
                colors={["#b0b5ba", "#999999", "#2f353a"]}
                innerRadius={0}
                outerRadius={0.8}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.pieData
});

export default connect(mapStateToProps)(PieChart);
