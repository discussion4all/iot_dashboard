import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ChartistGraph from "react-chartist";
import CardIcon from "components/Card/CardIcon.jsx";
import Timeline from "@material-ui/icons/Timeline";
import CardFooter from "components/Card/CardFooter.jsx";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  pieChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart
} from "variables/charts.jsx";

import { withStyles } from "@material-ui/core";
import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

class RoundedLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
          <h4 className={classes.cardTitle}>Rounded Line Chart </h4>                              
        </CardHeader>
        <CardBody style={{ height: "75%" , backgroundColor: "#db2164" }}>
          	<ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={roundedLineChart.data}
            type="Line"
            options={roundedLineChart.options}
            listener={roundedLineChart.animation}
          />
        </CardBody>
        <CardFooter style={{height: "10%"}}>
	        <Grid container className="close-btn">
			      <Grid item xs={6} style={{textAlign: 'right'}}>
			        <DeleteIcon className="hoverText redcolorClass" /> 
			      </Grid>
			      <Grid item xs={6}>
			        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
			      </Grid>
	      	</Grid>
      	</CardFooter>
      </Card>
    );
  }
}

class StraightLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
          <h4 className={classes.cardTitle}>Straight Lines Chart</h4>                    
        </CardHeader>
        <CardBody style={{ height: "75%" , backgroundColor: "#fc930a" }}>          
          <ChartistGraph
            style={{ height: "100%" }}
            className="ct-chart-white-colors"
            data={straightLinesChart.data}
            type="Line"
            options={straightLinesChart.options}
            listener={straightLinesChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%" }}>
        	<Grid container className="close-btn">
		      <Grid item xs={6} style={{textAlign: 'right'}}>
		        <DeleteIcon className="hoverText redcolorClass" /> 
		      </Grid>
		      <Grid item xs={6}>
		        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
		      </Grid>
      		</Grid>
      	</CardFooter>
      </Card>
    );
  }
}

class SimpleBarChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card chart style={{ height: "100%" }} className="tr">
        <CardHeader style={{ height: "15%" }}>
        	<h4 className={classes.cardTitle}>Simple Bar Chart</h4>          	                   
        </CardHeader>
        <CardBody style={{ height: "75%" , backgroundColor: "#00bcd4"}}>          
	          <ChartistGraph
	            style={{ height: "100%" }}
	            className="ct-chart-white-colors"
	            data={simpleBarChart.data}
	            type="Bar"
	            options={simpleBarChart.options}
	            responsiveOptions={simpleBarChart.responsiveOptions}
	            listener={simpleBarChart.animation}
	          />	       	          
        </CardBody>           	    
	    <CardFooter style={{ height: "10%"}}>
	    	 <Grid container className="close-btn">
			      <Grid item xs={6} style={{textAlign: 'right'}}>
			        <DeleteIcon className="hoverText redcolorClass" /> 
			      </Grid>
			      <Grid item xs={6}>
			        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
			      </Grid>
      		 </Grid>
	    </CardFooter>
	    
      </Card>
    );
  }
}

class PieChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="danger" icon style={{ height: "25%" }}>
          <CardIcon color="danger">
            <Timeline />            
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Pie Chart</h4>
          <h6 className={classes.legendTitle}>Legend</h6>
	      <i className={"fas fa-circle " + classes.info} /> <Typography>Apple{` `}</Typography>
	      <i className={"fas fa-circle " + classes.warning} /> <Typography>Samsung{` `}</Typography>
	      <i className={"fas fa-circle " + classes.danger} /><Typography> Windows Phone{` `} </Typography>         
        </CardHeader>
        <CardBody style={{ height: "50%" }}>
          <ChartistGraph
            data={pieChart.data}
            type="Pie"
            options={pieChart.options}
            style={{ height: "100%" }}
          />
        </CardBody>
        <CardFooter style={{height : "10%"}}>
          
        
	        <Grid container className="close-btn">
			      <Grid item xs={6} style={{textAlign: 'right'}}>
			        <DeleteIcon className="hoverText redcolorClass" /> 
			      </Grid>
			      <Grid item xs={6}>
			        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
			      </Grid>
	      	</Grid>
      	</CardFooter>
      </Card>
    );
  }
}

class ColouredLineChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="info" icon style={{ height: "15%" }}>
          <CardIcon color="info">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Coloured Line Chart <small>- Rounded</small>
          </h4>          
        </CardHeader>
        <CardBody style={{ height: "75%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={colouredLineChart.data}
            type="Line"
            options={colouredLineChart.options}
            listener={colouredLineChart.animation}
          />
        </CardBody>
        <CardFooter style={{ height: "10%"}}>
	        <Grid container className="close-btn">
			      <Grid item xs={6} style={{textAlign: 'right'}}>
			        <DeleteIcon className="hoverText redcolorClass" /> 
			      </Grid>
			      <Grid item xs={6}>
			        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
			      </Grid>
	      	</Grid>
	    </CardFooter>  	
      </Card>
    );
  }
}

class MultipleBarchart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="rose" icon style={{ height: "15%" }}>
          <CardIcon color="rose">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Multiple Bars Chart <small>- Bar Chart</small>
          </h4>          
        </CardHeader>
        <CardBody style={{ height: "75%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={multipleBarsChart.data}
            type="Bar"
            options={multipleBarsChart.options}
            listener={multipleBarsChart.animation}
          />
        </CardBody>
        <CardFooter style={{height: "10%"}}>
	        <Grid container className="close-btn">
			      <Grid item xs={6} style={{textAlign: 'right'}}>
			        <DeleteIcon className="hoverText redcolorClass" /> 
			      </Grid>
			      <Grid item xs={6}>
			        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
			      </Grid>
	      	</Grid>
	    </CardFooter>  	
      </Card>
    );
  }
}

class ColouredLinesChart extends Component {
  render() {
    const { classes, removeStyle, onRemoveItem } = this.props;
    return (
      <Card style={{ height: "100%" }} className="tr">
        <CardHeader color="warning" icon style={{ height: "20%" }}>
          <CardIcon color="warning">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Coloured Lines Chart <small>- Rounded</small>
          </h4>          
        </CardHeader>
        <CardBody style={{ height: "20%" }}>
          <ChartistGraph
            style={{ height: "100%" }}
            data={colouredLinesChart.data}
            type="Line"
            options={colouredLinesChart.options}
            listener={colouredLinesChart.animation}
          />
        </CardBody>
        <Grid container className="close-btn">
		      <Grid item xs={6} style={{textAlign: 'right'}}>
		        <DeleteIcon className="hoverText redcolorClass" /> 
		      </Grid>
		      <Grid item xs={6}>
		        <Typography className="hoverText redcolorClass" style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => onRemoveItem()}>Remove</Typography>
		      </Grid>
      	</Grid>
      </Card>
    );
  }
}

const LineChartRound = withStyles(chartsStyle)(RoundedLineChart);
const LineChartStraight = withStyles(chartsStyle)(StraightLineChart);
const BarChart = withStyles(chartsStyle)(SimpleBarChart);
const ChartPie = withStyles(chartsStyle)(PieChart);
const LineChartColoured = withStyles(chartsStyle)(ColouredLineChart);
const BarChartMultipleBars = withStyles(chartsStyle)(MultipleBarchart);
const LinesChartColoured = withStyles(chartsStyle)(ColouredLinesChart);

export {
  LineChartRound,
  LineChartStraight,
  BarChart,
  ChartPie,
  LineChartColoured,
  BarChartMultipleBars,
  LinesChartColoured
};
