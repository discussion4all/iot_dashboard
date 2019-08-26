import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import TestApi from '../../services/TestApi';

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
const api = new TestApi();

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class pTestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        };
    }

    componentDidMount() {
        api.getPdataData()
            .then(res => {
                console.log('xxxxxxx xxxxxxxxxxx xxxxxxxxxxx res from here is P test ', res.data.results);
                this.setState({ dataList: res.data.results });


            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx xxxxxxxxxxx err from here is P test ', err);
            });
    }
   
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                                <Assignment />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>P Test Data</h4>
                        </CardHeader>
                        <CardBody>
                            <ReactTable
                                data={this.state.data}
                                filterable


                                columns={[
                                    {
                                        Header: "Item ID",
                                        accessor: "assignedItemsID"
                                    },
                                    {
                                        Header: "PAYG Product ID",
                                        accessor: "agentID"
                                    },
                                    {
                                        Header: "Code Count",
                                        accessor: "productitemID"
                                    },
                                    {
                                        Header: "Last Code",
                                        accessor: "itemAssignDate"
                                    },
                                    {
                                        Header: "New Code",
                                        accessor: "itemAssignNote"
                                    },
                                    {
                                        Header: "Code History",
                                        accessor: "itemAssignNote"
                                    },
                                    {
                                        Header: "Actions",
                                        accessor: 'actions',

                                    }
                                ]}
                                defaultPageSize={10}
                                showPaginationTop
                                showPaginationBottom={false}
                                className="-striped -highlight"
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(styles)(pTestPage);
