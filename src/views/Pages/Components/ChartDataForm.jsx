import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

class ChartDataForm extends Component {
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
    const { classes } = this.props;
    const alignLeft = {
      textAlign: "left"
    };

    return (
      <div style={{ paddingLeft: "10%" }}>
        <GridContainer>
          <Grid xs={2}>
            <FormLabel
              className={classes.labelHorizontal + " " + classes.labelHorizontalRadioCheckbox}>
              Which type of data binding you want ?
            </FormLabel>
          </Grid>
          <Grid xs={3}>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "10%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.dataTypeBinding === "Live Data"}
                    onChange={this.bindData}
                    value="Live Data"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="Live Data"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "10%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.dataTypeBinding === "From Database"}
                    onChange={this.bindData}
                    value="From Database"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="From Database"
              />
            </div>
          </Grid>
          <Grid xs={2}>
            <FormLabel
              className={classes.labelHorizontal + " " + classes.labelHorizontalRadioCheckbox}>
              What topic would you like to bind ?
            </FormLabel>
          </Grid>
          <Grid xs={4}>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/roundline"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/roundline"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/roundline"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/straightline"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/straightline"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/straightline"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/barchart"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/barchart"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/barchart"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/piechart"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/piechart"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/piechart"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/colouredline"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/colouredline"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/colouredline"
              />
            </div>
            <div
              className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
              style={{ textAlign: "left", paddingLeft: "5%" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTopic === "@mqtt/chart/plainmqttmsgs"}
                    onChange={this.selectTopic}
                    value="@mqtt/chart/plainmqttmsgs"
                    name="radio button enabled"
                    aria-label="A"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="@mqtt/chart/plainmqttmsgs"
              />
            </div>
          </Grid>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(regularFormsStyle)(ChartDataForm);
