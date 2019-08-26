import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
//import socketIOClient from "socket.io-client";


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

class AssignedTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
           // endpoint: "http://localhost:3000/",
            showWeb:'',
            showWeb1: ''
           // data: this.state.map((prop, key) => {
                // return {
                //     id: key,
                //     name: prop[0],
                //     position: prop[1],
                //     office: prop[2],
                //     age: prop[3],
                //     actions: (
                //         // we've added some custom button actions
                //         <div className="actions-right">
                //             {/* use this button to add a like kind of action */}
                //             <Button
                //                 justIcon
                //                 round
                //                 simple
                //                 onClick={() => {
                //                     let obj = this.state.data.find(o => o.id === key);
                //                     alert(
                //                         "You've clicked LIKE button on \n{ \nName: " +
                //                         obj.name +
                //                         ", \nposition: " +
                //                         obj.position +
                //                         ", \noffice: " +
                //                         obj.office +
                //                         ", \nage: " +
                //                         obj.age +
                //                         "\n}."
                //                     );
                //                 }}
                //                 color="info"
                //                 className="like"
                //             >
                //                 <Favorite />
                //             </Button>{" "}
                //             {/* use this button to add a edit kind of action */}
                //             <Button
                //                 justIcon
                //                 round
                //                 simple
                //                 onClick={() => {
                //                     let obj = this.state.data.find(o => o.id === key);
                //                     alert(
                //                         "You've clicked EDIT button on \n{ \nName: " +
                //                         obj.name +
                //                         ", \nposition: " +
                //                         obj.position +
                //                         ", \noffice: " +
                //                         obj.office +
                //                         ", \nage: " +
                //                         obj.age +
                //                         "\n}."
                //                     );
                //                 }}
                //                 color="warning"
                //                 className="edit"
                //             >
                //                 <Dvr />
                //             </Button>{" "}
                //             {/* use this button to remove the data row */}
                //             <Button
                //                 justIcon
                //                 round
                //                 simple
                //                 onClick={() => {
                //                     var data = this.state.data;
                //                     data.find((o, i) => {
                //                         if (o.id === key) {
                //                             // here you should add some custom code so you can delete the data
                //                             // from this component and from your server as well
                //                             data.splice(i, 1);
                //                             return true;
                //                         }
                //                         return false;
                //                     });
                //                     this.setState({ data: data });
                //                 }}
                //                 color="danger"
                //                 className="remove"
                //             >
                //                 <Close />
                //             </Button>{" "}
                //         </div>
                //     )
                // };
           // })
        };
    }
    componentDidMount() {
        api.getData()
            .then(res => {
               // console.log('xxxxxxx xxxxxxxxxxx xxxxxxxxxxx res from here is ', res.data.results);
                this.setState({ 

                    data: res.data.results.map((event, key) => {

                        return {
                            id: key,
                            assignedItemsID: event.assignedItemsID,
                            agentID: event.agentID,
                            productitemID: event.productitemID,
                            itemAssignDate: event.itemAssignDate,
                            itemAssignNote: event.itemAssignNote,
                            actions: (
                                <div className="actions-right">
                            {/* use this button to add a like kind of action */}
                            <Button
                                justIcon
                                round
                                simple
                                onClick={() => {
                                    let obj = this.state.data.find(o => o.id === key);
                                    alert(
                                        "You've clicked LIKE button on \n{ \nName: " +
                                        obj.name +
                                        ", \nposition: " +
                                        obj.position +
                                        ", \noffice: " +
                                        obj.office +
                                        ", \nage: " +
                                        obj.age +
                                        "\n}."
                                    );
                                }}
                                color="info"
                                className="like"
                            >
                                <Favorite />
                            </Button>{" "}
                            {/* use this button to add a edit kind of action */}
                            <Button
                                justIcon
                                round
                                simple
                                onClick={() => {
                                    let obj = this.state.data.find(o => o.id === key);
                                    alert(
                                        "You've clicked EDIT button on \n{ \nName: " +
                                        obj.name +
                                        ", \nposition: " +
                                        obj.position +
                                        ", \noffice: " +
                                        obj.office +
                                        ", \nage: " +
                                        obj.age +
                                        "\n}."
                                    );
                                }}
                                color="warning"
                                className="edit"
                            >
                                <Dvr />
                            </Button>{" "}
                            {/* use this button to remove the data row */}
                            <Button
                                justIcon
                                round
                                simple
                                onClick={() => {
                                    var data = this.state.data;
                                    data.find((o, i) => {
                                        if (o.id === key) {
                                            // here you should add some custom code so you can delete the data
                                            // from this component and from your server as well
                                            data.splice(i, 1);
                                            return true;
                                        }
                                        return false;
                                    });
                                    this.setState({ data: data });
                                }}
                                color="danger"
                                className="remove"
                            >
                                <Close />
                            </Button>{" "}
                        </div>
                            ),
                           
                };

                    })

                    
                
                
                });


            }).catch(err => {
               // console.log('xxxxxxx xxxxxxxxxxx xxxxxxxxxxx err from here is ', err);
            });

         const { endpoint } = this.state;
       // socketIOClient         const socket = socketIOClient(endpoint);
        // socket.on("message", data => this.setState({ response: data }));
        // console.log('xxxxxxx x xxxxx', this.state.response);

      //  socket.on('message',  (data) => { 
           // let json = JSON.stringify(this.state.showWeb1);
           // console.log(json);
         
            // this.setState({ 
            //     showWeb: data.topic,
            //     showWeb1: data.message,
            
            // });
            // console.log('xxx x x xx topic', this.state.showWeb);
            // console.log('xxx x x xx message', this.state.showWeb1);

       // });
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
                            <h4 className={classes.cardIconTitle}>Assigned Data</h4>
                        </CardHeader>
                        <CardBody>
                            <ReactTable
                                data={this.state.data}
                                filterable
                                
                               
                                columns={[
                                    {
                                        Header: "AssignedItemsID",
                                        accessor: "assignedItemsID"
                                    },
                                    {
                                        Header: "AgentID",
                                        accessor: "agentID"
                                    },
                                    {
                                        Header: "ProductitemID",
                                        accessor: "productitemID"
                                    },
                                    {
                                        Header: "itemAssignDate",
                                        accessor: "itemAssignDate"
                                    },
                                    {
                                        Header: "itemAssignNote",
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

export default withStyles(styles)(AssignedTables);
