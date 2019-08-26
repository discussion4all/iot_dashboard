import React from "react";
import PropTypes from "prop-types";
//import '../../customStyle.scss';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink, Link } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";

// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

import avatar from "assets/img/faces/avatar.jpg";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Search from "@material-ui/icons/Search";
//import PubSub from 'PubSub';
//const pubsub = new PubSub();
var ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // pubsub.subscribe('DATA_MQTT', data => {
    //   console.log('xxxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxx DATA_MQTT' , data)
    // });

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    let msg = localStorage.getItem("msg");
    console.log("xxxxxx xxxxxx xxxxx", JSON.parse(msg));
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute("/components"),
      openForms: this.activeRoute("/forms"),
      openTables: this.activeRoute("/tables"),
      openMaps: this.activeRoute("/maps"),
      openPages: this.activeRoute("-page"),
      miniActive: true
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  // componentDidMount() {
  //   setInterval(this.timer, 3000);
  // }

  // timer = () => {
  //   let msg = localStorage.getItem('msg');

  //   if (msg){
  //     this.setState({
  //       msgMac: JSON.parse(msg).mac,

  //     })

  //   }

  // }
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  render() {
    const { classes, color, logo, image, logoText, routes, bgColor, rtlActive } = this.props;
    const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      cx({
        [classes.searchRTL]: rtlActive
      });
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextRTL]: rtlActive
      });
    const userWrapperClass =
      classes.user +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const caret =
      classes.caret +
      " " +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const collapseItemMini =
      classes.collapseItemMini +
      " " +
      cx({
        [classes.collapseItemMiniRTL]: rtlActive
      });
    const photo =
      classes.photo +
      " " +
      cx({
        [classes.photoRTL]: rtlActive
      });
    var user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}>
              <ListItemText
                primary={rtlActive ? "تانيا أندرو" : "Tania Andrew"}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={classes.itemLink + " " + classes.userCollapseLinks}>
                    <span className={collapseItemMini}>{rtlActive ? "مع" : "MP"}</span>
                    <ListItemText
                      primary={rtlActive ? "ملفي" : "My Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={classes.itemLink + " " + classes.userCollapseLinks}>
                    <span className={collapseItemMini}>{rtlActive ? "هوع" : "EP"}</span>
                    <ListItemText
                      primary={rtlActive ? "تعديل الملف الشخصي" : "Edit Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={classes.itemLink + " " + classes.userCollapseLinks}>
                    <span className={collapseItemMini}>{rtlActive ? "و" : "S"}</span>
                    <ListItemText
                      primary={rtlActive ? "إعدادات" : "Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          if (prop.collapse) {
            const navLinkClasses =
              classes.itemLink +
              " " +
              cx({
                [" " + classes.collapseActive]: this.activeRoute(prop.path)
              });
            const itemText =
              classes.itemText +
              " " +
              cx({
                [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
                [classes.itemTextMiniRTL]:
                  rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.itemTextRTL]: rtlActive
              });
            const collapseItemText =
              classes.collapseItemText +
              " " +
              cx({
                [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextMiniRTL]:
                  rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextRTL]: rtlActive
              });
            const itemIcon =
              classes.itemIcon +
              " " +
              cx({
                [classes.itemIconRTL]: rtlActive
              });
            const caret =
              classes.caret +
              " " +
              cx({
                [classes.caretRTL]: rtlActive
              });
            return (
              <ListItem key={key} className={classes.item}>
                <NavLink
                  to={"#"}
                  className={navLinkClasses}
                  onClick={() => this.openCollapse(prop.state)}>
                  <ListItemIcon className={itemIcon}>
                    {typeof prop.icon === "string" ? <Icon>{prop.icon}</Icon> : <prop.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name}
                    secondary={
                      <b
                        className={
                          caret + " " + (this.state[prop.state] ? classes.caretActive : "")
                        }
                      />
                    }
                    disableTypography={true}
                    className={itemText}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={classes.list + " " + classes.collapseList}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect) {
                        return null;
                      }
                      const navLinkClasses =
                        classes.collapseItemLink +
                        " " +
                        cx({
                          [" " + classes[color]]: this.activeRoute(prop.path)
                        });
                      const collapseItemMini =
                        classes.collapseItemMini +
                        " " +
                        cx({
                          [classes.collapseItemMiniRTL]: rtlActive
                        });
                      return (
                        <ListItem key={key} className={classes.collapseItem}>
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={collapseItemMini}>{prop.mini}</span>
                            <ListItemText
                              primary={prop.name}
                              disableTypography={true}
                              className={collapseItemText}
                            />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          const navLinkClasses =
            classes.itemLink +
            " " +
            cx({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          const itemText =
            classes.itemText +
            " " +
            cx({
              [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive
            });
          const itemIcon =
            classes.itemIcon +
            " " +
            cx({
              [classes.itemIconRTL]: rtlActive
            });
          return (
            <ListItem key={key} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
                  {typeof prop.icon === "string" ? <Icon>{prop.icon}</Icon> : <prop.icon />}
                </ListItemIcon>
                <ListItemText primary={prop.name} disableTypography={true} className={itemText} />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]: this.props.miniActive && this.state.miniActive,
        [classes.logoNormalSidebarMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.logoNormalRTL]: rtlActive
      });
    const logoMini =
      classes.logoMini +
      " " +
      cx({
        [classes.logoMiniRTL]: rtlActive
      });
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        <a href="https://www.creative-tim.com" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="https://www.creative-tim.com" className={logoNormal}>
          ROMA Dashboard
        </a>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            {brand}
            {/* <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={<HeaderLinks rtlActive={rtlActive} />}
              links={links}
            /> */}
            <Card className={classes.myIndextop}>
              <CardBody className={sidebarWrapper}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} className={classes.myclass}>
                    <div className="loginArea">
                      <Button
                        className={classes.myCustomButton}
                        component={Link}
                        to="/pages/register-page">
                        Sign up
                      </Button>
                      <Button
                        className={classes.myCustomButton}
                        component={Link}
                        to="/pages/login-page">
                        Log in
                      </Button>
                    </div>
                    <CustomInput
                      rtlActive={rtlActive}
                      formControlProps={{
                        className: classes.top + " " + classes.search
                      }}
                      inputProps={{
                        placeholder: rtlActive ? "بحث" : "Search",
                        inputProps: {
                          "aria-label": rtlActive ? "بحث" : "Search",
                          className: classes.searchInput
                        }
                      }}
                    />
                    <Button color="white" aria-label="edit" justIcon round className={searchButton}>
                      <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                    </Button>
                    <div className="cardClass">
                      <div>
                        <Button className={classes.myCustomButton}>Client</Button>
                        <Button color="primary" className={classes.myCustomButton}>
                          Application
                        </Button>
                        <Button color="info" className={classes.myCustomButton}>
                          GateWay
                        </Button>
                        <Button color="success" className={classes.myCustomButton}>
                          Technology
                        </Button>
                        <Button color="warning" className={classes.myCustomButton}>
                          Geo Graphy
                        </Button>
                        <Button color="danger" className={classes.myCustomButton}>
                          Status
                        </Button>
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}>
            {brand}

            <Card className={classes.myIndextop}>
              <CardBody className={sidebarWrapper}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} className={classes.myclass}>
                    <div className="loginArea">
                      <Button
                        className={classes.myCustomButton}
                        component={Link}
                        to="/pages/register-page">
                        Sign up
                      </Button>
                      <Button
                        className={classes.myCustomButton}
                        component={Link}
                        to="/pages/login-page">
                        Log in
                      </Button>
                    </div>
                    <CustomInput
                      rtlActive={rtlActive}
                      formControlProps={{
                        className: classes.top + " " + classes.search
                      }}
                      inputProps={{
                        placeholder: rtlActive ? "بحث" : "Search",
                        inputProps: {
                          "aria-label": rtlActive ? "بحث" : "Search",
                          className: classes.searchInput
                        }
                      }}
                    />
                    <Button color="white" aria-label="edit" justIcon round className={searchButton}>
                      <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                    </Button>
                    <div className="cardClass">
                      <div>
                        <Button className={classes.myCustomButton}>Client</Button>
                        <Button color="primary" className={classes.myCustomButton}>
                          Application
                        </Button>
                        <Button color="info" className={classes.myCustomButton}>
                          GateWay
                        </Button>
                        <Button color="success" className={classes.myCustomButton}>
                          Technology
                        </Button>
                        <Button color="warning" className={classes.myCustomButton}>
                          Geo Graphy
                        </Button>
                        <Button color="danger" className={classes.myCustomButton}>
                          Status
                        </Button>
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>

            {/* <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            /> */}

            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf(["white", "red", "orange", "green", "blue", "purple", "rose"]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(sidebarStyle)(Sidebar);
