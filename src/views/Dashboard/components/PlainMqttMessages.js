import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

class PlainMqttMessages extends Component {
  state = {
    isOpen: false,
    messageItems: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      messageItems: nextProps.chartsMessages
    });
  }

  render() {
    const root = {
      width: "100%",
      height: 270,
      maxWidth: "100%",
      backgroundColor: "white",
      overflow: "auto"
    };
    const messageItems = [...this.state.messageItems];
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
            <div className="chart-wrapper" style={root}>
              <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <ListGroup>
                  {messageItems &&
                    messageItems.map((row, key) => {
                      return <ListGroupItem key={key}>{row}</ListGroupItem>;
                    })}
                </ListGroup>
              </Scrollbars>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartsMessages: state.chartsMessages.plainmessagesData
});

export default connect(mapStateToProps)(PlainMqttMessages);
