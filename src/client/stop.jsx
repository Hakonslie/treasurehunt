import React from "react";
import Cookies from 'universal-cookie';


const cookies = new Cookies();
export class Stop extends React.Component {


    constructor(props) {
        super(props);
        this.state = ({
            loggedIn: false,
            key: this.props.match.params.stopid,
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
                "user": cookies.get('session')})
            })
            .then(response => response.json());

    this.setState({status: response.validatedAddress});
    cookies.set('session', response.sessionId, {path: "/", httpOnly: true, expires: new Date("2019-04-21")});

    };

    render() {


        if(cookies.get('session') === null) {
            console.log('new user')


        }

        return (
            <div>
                {!this.state.status ? (
                    <div>
                        <div class="tooSoon">Du har funnet et stopp på en skattejakt, men for å aktivere dette må du finne det forrige stoppet først!</div>
                    </div>
                ) : (

                <div> Du fant et stopp. Her kommer neste gåte </div>

                    )}
            </div>
        )
    }
}