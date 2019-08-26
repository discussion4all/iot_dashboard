/*eslint-disable*/
import Slide from "@material-ui/core/Slide";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components
import Heading from "components/Heading/Heading.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import React from "react";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tl: false,
            tc: false,
            tr: false,
            bl: false,
            bc: false,
            br: false,
            classicModal: false,
            noticeModal: false,
            smallModal: false
        };
    }
    // to stop the warning of calling setState of unmounted component
    componentWillUnmount() {
        var id = window.setTimeout(null, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }
    showNotification(place) {
        if (!this.state[place]) {
            var x = [];
            x[place] = true;
            this.setState(x);
            setTimeout(
                function () {
                    x[place] = false;
                    this.setState(x);
                }.bind(this),
                6000
            );
        }
    }
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }
    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Heading
                    title="Notifications"
                    textAlign="center"
                  
                />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardBody>
                                <div className={classes.cardHeader}>
                                    <h4 className={classes.cardTitle}>Node</h4>
                                </div>
                                <br />
                                <SnackbarContent
                                    message={
                                        "Node Notifacation"
                                    }
                                    close
                                    icon={AddAlert}
                                    color="info"
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardBody>
                                <div className={classes.cardHeader}>
                                    <h4 className={classes.cardTitle}>Node</h4>
                                </div>
                                <br />

                                <SnackbarContent
                                    message={
                                        "Node Notifacation"
                                    }
                                    close
                                    icon={AddAlert}
                                    color="info"
                                />

                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardBody>
                                <div>
                                    <div className={classes.cardHeader}>
                                        <h4 className={classes.cardTitle}>GateWay</h4>
                                    </div>
                                    <br />
                                    <SnackbarContent
                                        message={
                                            "GateWay Notifacation"
                                        }
                                        close
                                        icon={AddAlert}
                                        color="warning"
                                    />
                                   
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardBody>
                                <div>
                                    <div className={classes.cardHeader}>
                                        <h4 className={classes.cardTitle}>GateWay</h4>
                                    </div>
                                    <br />
                                    <SnackbarContent
                                        message={
                                            "GateWay Notifacation"
                                        }
                                        close
                                        icon={AddAlert}
                                        color="warning"
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                   
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(notificationsStyle)(Notifications);
