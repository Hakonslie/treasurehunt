import React from "react";
import Cookies from 'universal-cookie';


const cookies = new Cookies();
export class Stop extends React.Component {


    constructor(props) {
        super(props);
        this.state = ({
            key: this.props.match.params.stopid,
            validated: false,
            acceptedCookie: false,
            fetchedRiddle: undefined
        });
    }

    authenticateKey = async () => {
        let response = await fetch('/api/stop',
            {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "key": this.state.key,
                        "user": cookies.get('session')
                    })
            })
            .then(response => response.json());

    this.setState({validated: response.validatedSuccess, fetchedRiddle: response.riddle});
    cookies.set('session', response.sessionUser.sessionId);
    };

    checkIfDidAcceptCookie = () => {
        let gotCookie = cookies.get('session');
        if(gotCookie !== undefined) {
            this.setState({acceptedCookie: true});
            this.authenticateKey();
        }
        // No cookie
    };
    userAcceptsCookies = () => {
        this.setState({acceptedCookie: true});
        this.authenticateKey();
    };

    componentDidMount() {
        if(this.state.acceptedCookie) {this.authenticateKey()}
        else this.checkIfDidAcceptCookie();

    }

    render() {
        if(!this.state.acceptedCookie) {
                return (
                    <div className="allowCookies">
                        I need to put a cookie in your browser in order to keep track of how you are doing in the QR-treasure hunt! will you allow it?
                        No personal info is stored and DB will be wiped 21st of April.
                        <div className="allowCookieClick" onClick={this.userAcceptsCookies}>Click me to allow cookies</div>
                    </div>
                )
            }
        else if(this.state.acceptedCookie)
            {
            return (
                <div>
                    {!this.state.validated ? (
                        <div>
                            <div className="tooSoon">Feil adresse! Finn riktig QR-kode! Eller gå til første stopp ;)</div>
                        </div>
                    ) : (
                    <div> Du fant et stopp. Her kommer neste gåte! {this.state.fetchedRiddle} </div>
                        )}
                </div>
            )
        }
        else {
            return (
                <div>
                    can't figure out if you accepted cookies or not :(
                </div>
            )
        }
    }
}