import React, { Component } from "react";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

class ChartDataform extends Component {
  state = {
    dataTypeBinding: null,
    selectedTopic: null
  };

  bindData = e => {
    this.setState({
      dataTypeBinding: e.target.value
    });
  };

  selectTopic = e => {
    this.setState({
      selectedTopic: e.target.value
    });
  };

  componentWillUnmount() {
    this.props.getsBindData({
      type: this.state.dataTypeBinding,
      topic: this.state.selectedTopic
    });
    this.setState({
      dataTypeBinding: null,
      selectTopic: null
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "5%", paddingLeft: "5%" }}>
        {" "}
        <Container>
          <FormGroup row>
            <Col md="2">
              <Label>Which type of data binding you want ?</Label>
            </Col>
            <Col md="3">
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio1"
                  name="data-bind"
                  value="Live Data"
                  checked={this.state.dataTypeBinding === "Live Data"}
                  onChange={this.bindData}
                />
                <Label check className="form-check-label" htmlFor="radio1">
                  Live Data
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio2"
                  name="data-bind"
                  value="From Database"
                  onChange={this.bindData}
                  checked={this.state.dataTypeBinding === "From Database"}
                />
                <Label check className="form-check-label" htmlFor="radio2">
                  From Database
                </Label>
              </FormGroup>
            </Col>
            <Col md="2">
              <Label>What topic would you like to bind ?</Label>
            </Col>
            <Col md="4">
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio3"
                  name="topic"
                  value="@mqtt/chart/roundline"
                  checked={this.state.selectedTopic === "@mqtt/chart/roundline"}
                  onChange={this.selectTopic}
                />
                <Label check className="form-check-label" htmlFor="radio3">
                  @mqtt/chart/roundline
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio4"
                  name="topic"
                  value="@mqtt/chart/straightline"
                  checked={this.state.selectedTopic === "@mqtt/chart/straightline"}
                  onChange={this.selectTopic}
                />
                <Label check className="form-check-label" htmlFor="radio4">
                  @mqtt/chart/straightline
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio5"
                  name="topic"
                  value="@mqtt/chart/barchart"
                  checked={this.state.selectedTopic === "@mqtt/chart/barchart"}
                  onChange={this.selectTopic}
                />
                <Label check className="form-check-label" htmlFor="radio5">
                  @mqtt/chart/barchart
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio6"
                  name="topic"
                  checked={this.state.selectedTopic === "@mqtt/chart/piechart"}
                  onChange={this.selectTopic}
                  value="@mqtt/chart/piechart"
                />
                <Label check className="form-check-label" htmlFor="radio6">
                  @mqtt/chart/piechart
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio7"
                  name="topic"
                  checked={this.state.selectedTopic === "@mqtt/chart/colouredline"}
                  onChange={this.selectTopic}
                  value="@mqtt/chart/colouredline"
                />
                <Label check className="form-check-label" htmlFor="radio7">
                  @mqtt/chart/colouredline
                </Label>
              </FormGroup>
              <FormGroup check className="radio" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="radio8"
                  name="topic"
                  checked={this.state.selectedTopic === "@mqtt/chart/plainmqttmsgs"}
                  onChange={this.selectTopic}
                  value="@mqtt/chart/plainmqttmsgs"
                />
                <Label check className="form-check-label" htmlFor="radio8">
                  @mqtt/chart/plainmqttmsgs
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default ChartDataform;
