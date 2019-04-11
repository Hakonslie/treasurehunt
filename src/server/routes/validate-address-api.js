const express = require('express');

const router = express.Router();

router.post('/stop', (req, res) => {
    console.log(req);
    let valid = false;

    switch(req.body.key) {
        case "NHHt6LAcHr6mFaFB":
        case "847TqAvKdqEjZGad":
        case "nJFERAsXRy724OaJ":
        case "9WgB4EjvXv7D1oOA":
        case "28J23g2FC4MXLoRe":
            valid = true;
            break;
    }


    res.status(200).json({validatedAddress: valid});
});


module.exports = router;