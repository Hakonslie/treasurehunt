import React from "react";

export class Stop extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            loggedIn: false,
            key: this.props.match.params.stopid,
            user: "Hakon",
            status: false
        });

        this.authenticateKey();
    }

    authenticateKey = async () => {
    let response = await fetch('/api/stop', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "key": this.state.key,
                "user": this.state.user})
            })
            .then(response => response.json());

    this.setState({status: response.validatedAddress});

    };

    render() {
        return (
            <div>
                {!this.state.status ? (
                    <div>
                        <h2>{this.state.key}</h2>
                    </div>
                ) : (

                <div> Du fant et stopp. Her kommer neste gåte </div>

                    )}
            </div>
        )
    }
}