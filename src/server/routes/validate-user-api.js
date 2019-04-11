const express = require('express');
const router = express.Router();

/*

function getPayload(match){

    const quiz = match.quizzes[match.current];
    const shallowCopy = Object.assign({}, quiz);
    shallowCopy.indexOfRightAnswer = undefined;

    const payload = {
        id: match.id,
        currentIndex: match.current,
        currentQuiz: shallowCopy,
        victory: match.victory,
        defeat: match.defeat,
        numberOfQuizzes: match.quizzes.length
    };

    return payload;
}

/*
    Create a new match.
    Only logged in users can play online.

router.post('/matches', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const match = createMatch(req.user.id, 3);
    const payload = getPayload(match);

    res.status(201).json(payload);
});

*/
module.exports = router;