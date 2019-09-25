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
    selectedEnabled: null
  };

  handleChangeEnabled = e => {
    console.log(e.target.value);
    this.setState({
      selectedEnabled: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const alignLeft = {
      textAlign: "left"
    };

    return (
      <GridContainer>
        <Grid xs={2}>
          <FormLabel
            className={classes.labelHorizontal + " " + classes.labelHorizontalRadioCheckbox}>
            Which type of data binding you want ?
          </FormLabel>
        </Grid>
        <Grid xs={4}>
          <div
            className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}
            style={{ textAlign: "left", paddingLeft: "5%" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "Live Data"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left", paddingLeft: "5%" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "From Database"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/roundline"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/straightline"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/barchart"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/piechart"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/colouredline"}
                  onChange={this.handleChangeEnabled}
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
            style={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "@mqtt/chart/plainmqttmsgs"}
                  onChange={this.handleChangeEnabled}
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
    );
  }
}

export default withStyles(regularFormsStyle)(ChartDataForm);
