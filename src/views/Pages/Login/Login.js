import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Form,
  FormFeedback,
  Spinner
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: "",
    showErrorFromApi: false,
    showErrorEmail: false,
    showErrorPassword: false,
    loading: false
  };

  componentDidMount() {
    // If logged in and user navigates to login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      //this.props.history.push("");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({
        errors: "",
        showErrorFromApi: false
      });

      //this.props.history.push("");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        showErrorFromApi: true,
        loading: false
      });
    }
  }

  handleInput = event => {
    const key = event.target.name;
    const value = event.target.value;

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
  };

  handleLogin = event => {
    event.preventDefault();

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
      this.setState({ loading: true });
      // If input fields are not empty make the API call
      const userData = {
        username: this.state.username,
        password: this.state.password
      };

      this.props.loginUser(userData);
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="username"
                          placeholder="Username / Email"
                          value={this.state.username}
                          onChange={this.handleInput}
                          invalid={this.state.showErrorEmail}
                        />
                        <FormFeedback>Username / Email is Required</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleInput}
                          invalid={this.state.showErrorPassword}
                        />
                        <FormFeedback>Password is Required</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="dark"
                            className="px-4"
                            type="submit"
                            disabled={this.state.loading}>
                            Login
                          </Button>{" "}
                          {this.state.loading && (
                            <Spinner style={{ width: "1.5rem", height: "1.5rem" }} color="dark" />
                          )}
                        </Col>
                        {this.state.showErrorFromApi && this.state.errors}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
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
)(Login);
