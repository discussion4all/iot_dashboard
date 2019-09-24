import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

// core components
import Heading from "components/Heading/Heading.jsx";
import "./custom.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import {
  LineChartRound,
  LineChartStraight,
  BarChart,
  ChartPie,
  LineChartColoured,
  BarChartMultipleBars,
  LinesChartColoured,
  Speedometer,
  DountChart
} from "./ChartsComponent/ChartComponents";

import Button from "components/CustomButtons/Button.jsx";
import Grid from "@material-ui/core/Grid";
import { getDashboard, saveDashboard } from "../../actions/dashboard_actions";


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts =
  getFromLS("layouts") ||
  [0, 1, 2, 4, 5, 7, 8].map(function(i, key, list) {
    if (i === 0 || i === 1 || i === 2) {
      return {
        i: i.toString(),
        x: i * 4,
        y: 0,
        w: 4,
        h: 9,
        minW: 3,
        minH: 6,
        add: i === (list.length - 1).toString()
      };
    } else {
      return {
        i: i.toString(),
        x: i % 2 === 0 ? 6 : 0,
        y: 9,
        w: 6,
        h: 11,
        minW: 4,
        minH: 10,
        add: i === (list.length - 1).toString()
      };
    }
  });

class pTestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayouts)),
      simpleSelect: "selectItem",
      newCounter: 0
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
  }

  componentDidMount(){
    console.log('Component Did Mount>>>');
    //console.log(this.props);
    this.props.getDashboard('');
    //console.log('Prossssssssssssss',this.props);    
  }
  componentWillReceiveProps(nextProps){
    
    console.log('Will Receive');
     if(nextProps.dashboard.layout.length > 0){
        
       let itemsData = JSON.parse(nextProps.dashboard.layout[0].layoutData);
        console.log('Items Data........................',itemsData);
       this.setState({
          items : itemsData.layouts
       })
       saveToLS("layouts", itemsData.layouts);
     }else{
        console.log('Else............');
        this.setState({
          items : JSON.parse(JSON.stringify(originalLayouts))
       })
       saveToLS("layouts", JSON.parse(JSON.stringify(originalLayouts))); 
     }
      

  }
  static get defaultProps() {
    return {
      className: "",
      cols: { lg: 16, md: 12, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;

    if (i === "0") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartRound removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(0)} />
        </div>
      );
    }
    if (i === "1") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartStraight removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(1)} />
        </div>
      );
    }
    if (i === "2") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(2)} />
        </div>
      );
    }
    if (i === "3") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LineChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(3)} />
        </div>
      );
    }
    if (i === "4") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <ChartPie removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(4)} />
        </div>
      );
    }
    if (i === "5") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <BarChartMultipleBars
            removeStyle={removeStyle}
            onRemoveItem={() => this.onRemoveItem(5)}
          />
        </div>
      );
    }
    if (i === "6") {
      return (
        <div style={{ paddingBottom: "20px" }} key={i} data-grid={el}>
          <LinesChartColoured removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(6)} />
        </div>
      );
    }
    if (i === "7") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <Speedometer removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(7)} />
        </div>
      );
    }
    if (i === "8") {
      return (
        <div key={i} style={{ paddingBottom: "20px" }} data-grid={el}>
          <DountChart removeStyle={removeStyle} onRemoveItem={() => this.onRemoveItem(8)} />
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
    console.log('Data>>>',tmpdata);
    let obj = { layouts: tmpdata };
    let data = { layoutData : obj }
    this.props.saveDashboard(data);
  };

  resetLayout = () => {

    let DBLayout = getFromLS("layouts");
    console.log('DB layout...',DBLayout);
    const savedLayout = JSON.parse(JSON.stringify(DBLayout));
    
    this.setState({ items: [] });
    setTimeout(() => {
      this.setState({ items: savedLayout });
    }, 0);
  };

  addChart = event => {
    const selectedItem = event.target.value;
    const { items } = this.state;

    const query = items.filter(item => item.i === selectedItem);

    if (query.length > 0) {
      alert("Chart Already On The Page");
    } else {
      if (selectedItem === "0" || selectedItem === "1" || selectedItem === "2") {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: 0,
            y: Infinity, // puts it at the bottom
            w: 4,
            h: 9,
            minW: 3,
            minH: 6
          })
        });
      } else {
        this.setState({
          items: this.state.items.concat({
            i: selectedItem,
            x: selectedItem % 2 === 0 ? 6 : 0,
            y: Infinity, // puts it at the bottom
            w: 6,
            h: 11,
            minW: 4,
            minH: 10
          })
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { items } = this.state;
   // console.log('Items>>>>',items);
    return (
      <div>
        <Grid container md={12}>
          <Grid item md={8}>
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}
              style={{ marginRight: "15px" }}>
              Choose A Component To Display
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.addChart}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}>
              <MenuItem value="selectItem" disabled>
                Select Item
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "0").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="0">
                Rounded Line Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "1").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="1">
                Straight Lines Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "2").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2">
                Simple Bar Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "3").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3">
                Coloured Line Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "4").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="4">
                Pie Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "5").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="5">
                Multiple Bars Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "6").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="6">
                Coloured Lines Chart
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "7").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="7">
                Speedometer
              </MenuItem>
              <MenuItem
                disabled={items.filter(item => item.i === "8").length > 0}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="8">
                Donut chart
              </MenuItem>
            </Select>
          </Grid>
          <Grid item md={2}>
            <Button
              color="primary"
              className={classes.marginRight}
              onClick={() => this.saveLayout()}>
              Save Your Layout
            </Button>
          </Grid>
          <Grid item md={2}>
            {" "}
            <Button
              color="primary"
              className={classes.marginRight}
              onClick={() => this.resetLayout()}>
              Reset Layout
            </Button>
          </Grid>
        </Grid>

        <ResponsiveReactGridLayout
          {...this.props}
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

const mapDispatchToProps = dispatch => {
  return {
    getDashboard: itemData => {
      dispatch(getDashboard(itemData))
    },
    saveDashboard: itemData => {
      dispatch(saveDashboard(itemData))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(chartsStyle)(pTestPage));

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
