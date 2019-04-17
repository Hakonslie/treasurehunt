const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');


// Objects stores stopId and stopRiddle for next stop
class Stop {
    constructor(localStopId, stopRiddle) {
        this.localStopId = localStopId;
        this.localStopRiddle = stopRiddle;
    }
}

// Array of valid stops and riddle, is iterated through
const stopsArray = [
    new Stop("NHHt6LAcHr6mFaFB", "Riddle me this"),
    new Stop("847TqAvKdqEjZGad", "Fiddle my diddle"),
    new Stop("nJFERAsXRy724OaJ", "Waggle my doodle"),
    new Stop("8394L4UpRB0uHE84", "Noodle my that"),
    new Stop("tL25WSe35toTGBGg", "Skadoodle my not"),
    new Stop("uolbzEn3C9i9oKVC", "Ratatouille my Kahlua"),
    new Stop("28J23g2FC4MXLoRe", "Ingen flere gåter! Du nådde slutten. Gratulerer!")
];

// User objects storing where in the track the user is and sessionId generated by uuid
class User {
    constructor(newId) {
        this.sessionId = newId;
        // all new users start at 0
        this.userState = 0;
    }
    updateState(newState) {
        console.log('update State. Previous state: ' + this.userState + '\n new State: '+ newState);
        if(newState === this.userState + 1) {
            this.userState = newState;
            return true;
        }
        else {
            return false;
        }
    }
}
// Users are stored in memory
let usersArray = [];

createUser = () => {
    let user = new User(uuidv4());
    usersArray.push(user);
    return user;
};

// User validation, creates a new user if doesnt exist, returns a user object
userValidator = (userSessionId) => {
    if (usersArray.length > 0 && userSessionId !== null && userSessionId !== undefined) {
        return usersArray.find(element => element.sessionId === userSessionId);
    }
    else {
        return createUser();
    }
};

// Stop validation, returns stop object
stopValidator = (stopId) => {
    return stopsArray.find(element => element.localStopId === stopId);
};



router.post('/stop', (req, res) => {

    // Validate stop
    let validatedStop = stopValidator(req.body.key);
    // Validate user
    let validatedUser = userValidator(req.body.user);
    // Validate combination of stop and user
    let userAndStopValidation = validatedUser.updateState(stopsArray.indexOf(validatedStop) +1);

    let riddleForResponse = undefined;
    if(userAndStopValidation) riddleForResponse = validatedStop.localStopRiddle;

    res.status(200).json({
        sessionUser: validatedUser,
        validatedSuccess: userAndStopValidation,
        riddle: riddleForResponse
    });
});

module.exports = router;