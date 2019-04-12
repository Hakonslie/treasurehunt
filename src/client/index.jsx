import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Stop} from "./stop";
import {Home} from "./home";


const notFound = () => {
    return (
        <div>
            <h2>file not found 404</h2>
            <p>
                Oops, couldn't find that!
            </p>
        </div>
    );
};

const App = ()  => {
    return (
        <BrowserRouter>
            <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/stop/:stopid" component={Stop} />
                        <Route component={notFound} />
                    </Switch>
            </div>
        </BrowserRouter>
    );

};

ReactDOM.render(<App />, document.getElementById("root"));