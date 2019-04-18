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
    cookies.set('session', response.sessionUser.sessionId, { maxAge: 2 * 24 * 60 * 60 * 1000 });
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
                        Velkommen til TG skattejakt 2019 av Vipps, kom til vår stand om du lurer på noe.
                        <p>
                        Jeg vil gjerne legge en Cookie i nettleseren din for å huske på hvilke gåter du har løst. Lar du meg gjøre det?
                        <div className="allowCookieClick" onClick={this.userAcceptsCookies}>Trykk her for å tillate det</div>
                        </p>
                    </div>
                )
            }
        else if(this.state.acceptedCookie)
            {
            return (
                <div>
                    {!this.state.validated ? (
                        <div>
                            <div className="tooSoon"> Skattejakten må gjennomføres i riktig rekkefølge. Første stopp er Vipps-standen ;) </div>
                        </div>
                    ) : (
                    <div> Hurra!
                        <p>Du fant et stopp, her kommer neste gåte(du får den kun en gang ;))</p>
                        <p>"{this.state.fetchedRiddle}"</p>
                    </div>

                        )}
                </div>
            )
        }
        else {
            return (
                <div>
                    Noe gikk galt :( Kom og snakk med oss
                </div>
            )
        }
    }
}