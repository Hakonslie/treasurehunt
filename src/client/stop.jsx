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
                        Vipps, så må jeg legge en Cookie (informasjonskapsel) i nettleseren din for å huske på hvilke gåter du har løst. Lar du meg gjøre det?
                        <div className="allowCookieClick" onClick={this.userAcceptsCookies}>Trykk her for å tillate det</div>
                    </div>
                )
            }
        else if(this.state.acceptedCookie)
            {
            return (
                <div>
                    {!this.state.validated ? (
                        <div>
                            <div className="tooSoon">Vipps, så ble det feil QR-kode! Du må gjennomføre ruten i riktig rekkefølge ;)  <br />
                            Hvis du sitter fast kan du finne en vippser på Vipps-standen. Hvis du vil begynne på nytt kan du slette cookie-n i nettleseren</div>
                        </div>
                    ) : (
                    <div> Hurra! Du fant et stopp, her kommer neste gåte (Obs: Du får den kun en gang): {this.state.fetchedRiddle} </div>
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