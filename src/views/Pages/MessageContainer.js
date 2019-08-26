import React from 'react';




export default class MessageContainer extends React.Component {

    // addMessage(message) {
    //     const { mqtt } = this.props;
    //     mqtt.publish('@near/demo', message);
    // }

    render() {
        return (
            <div>
                {
                    this.props.data.map((val, index) => 
                        <div>{'xxxxxxxxxxxxxxxxxxx'+  val}</div>
                    )
                }
                {/* <MessageList data={this.props.data} /> */}
                {/* <MessageForm onSubmit={this.addMessage.bind(this)} /> */}
            </div>
        )

    }
}