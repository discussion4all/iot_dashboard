import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
// @material-ui/icons

import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import config from "../../config";
import axios from "axios";
import swal from "sweetalert";
import "./custom.css";

import { loginUser } from "../../actions/authActions";

let REST_API_DOMAIN = config.REST_API_DOMAIN;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      password: "",
      errors: "",
      showErrorFromApi: false,
      showErrorEmail: false,
      showErrorPassword: false,
      loading: false

    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // If logged in and user navigates to login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      // we add a hidden class to the card and after 700 ms we delete it and the transition appears
      this.timeOutFunction = setTimeout(
        function() {
          this.setState({ cardAnimaton: "" });
        }.bind(this),
        700
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        showErrorFromApi: true,
        loading: false
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    if (key === "username") {
      this.setState({
        [key]: value,
        showErrorEmail: false,
        showErrorFromApi: false
      });
    } else {
      this.setState({
        [key]: value,
        showErrorPassword: false,
        showErrorFromApi: false
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    if (this.state.username.length <= 0) {
      if (this.state.password.length <= 0) {
        // Email & Password both are empty
        this.setState({
          showErrorEmail: true,
          showErrorPassword: true
        });
      } else {
        // Email is empty
        this.setState({
          showErrorEmail: true
        });
      }
    } else if (this.state.password.length <= 0) {
      // Password is empty
      this.setState({
        showErrorPassword: true
      });
    } else {

      this.setState({ loading : true });
      // If input fields are not empty make the API call
      const userData = {
        username: this.state.username,
        password: this.state.password
      };

      this.props.loginUser(userData);
    }
  };

  render() {
    const { classes } = this.props;
    
    const { loading } =this.state;
    

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>            
            <form onSubmit={this.onSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="rose">
                  <h4 className={classes.cardTitle}>Log in</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: this.handleChange
                    }}
                    displayError={this.state.showErrorEmail}
                    helpText={this.state.showErrorEmail && "Email is required"}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    type="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                        </InputAdornment>
                      ),
                      onChange: this.handleChange
                    }}
                    displayError={this.state.showErrorPassword}
                    helpText={this.state.showErrorPassword && "Password is required"}
                  />
                  <Typography style={{ color: "red", textAlign: "center" }}>
                    {this.state.showErrorFromApi && this.state.errors}
                  </Typography>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <div style={{display: "flex" , alignItems : "center"}}>   
                                 
                      <Button color="rose" style={{paddingRight: "18px"}} simple size="lg" block type="submit" disabled={loading}>
                        Let's Go                      
                      </Button>
                      {loading && <CircularProgress size={24} color="secondary"  />}
                    
                  </div>  
                  
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(loginPageStyle)(LoginPage));
