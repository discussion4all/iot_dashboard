import React, { Component } from "react";
import { Container, Col, FormGroup, Label, Input, Row } from "reactstrap";

class ChartDataform extends Component {
  state = {
    dataTypeBinding: "Live Data",
    selectedTopic: "@mqtt/chart/roundline",
    deviceType: "BH12V",
    deviceID: "303AH1900000300"
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
  selectDeviceType = e => {
    this.setState({
      deviceType: e.target.value
    })
  };
  selectDeviceID = e => {
    this.setState({
      deviceID: e.target.value
    })
  }
  componentWillUnmount() {
    this.props.getsBindData({
      type: this.state.dataTypeBinding,
      //topic: this.state.selectedTopic
      topic: this.state.deviceType+'/'+this.state.deviceID,
      deviceType: this.state.deviceType,
      deviceID: this.state.deviceID,
      chartID: new Date().getTime()
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
          <Row>
            <Col md="12" style={{"textAlign": "left"}}>
                <h5>Which type of data binding you want ?</h5>
            </Col>
          </Row>
          <Row>
              <Col md="6">
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
                </Col>
                <Col md="6">
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
          </Row>
          <br/>
          <Row>
            <Col md="12" style={{"textAlign": "left"}}>
                <h5>What topic would you like to bind ?</h5>
            </Col>
          </Row>
          <Row>

              <Col xs="12" md="6">
                <Input type="text" id="text-input" value={this.state.deviceType} name="text-input" onChange={this.selectDeviceType} placeholder="Device Type" />                
              </Col>
              <Col xs="12" md="6">
                <Input type="text" id="text-input" value={this.state.deviceID} name="text-input" onChange={this.selectDeviceID} placeholder="Device ID" />                
              </Col>

               <Col md="6" style={{display: "none"}}>
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
               </Col>
               <Col md="6" style={{display: "none"}}>
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
               </Col>
               <Col md="6" style={{display: "none"}}>
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
               </Col> 
               <Col md="6" style={{display: "none"}}>
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
               </Col>
               <Col md="6" style={{display: "none"}}>
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
               </Col>
               <Col md="6" style={{display: "none"}}>
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChartDataform;
