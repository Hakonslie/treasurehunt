# treasurehunt
React-app for treasurehunts (intended for use with QR-codes)

# What is this?
This is intended to be a react app for treasure hunts using QR-codes. It uses in memory databases for users and stores which users
has visited which stops. It does not allow jumping over stops and the riddles will be delivered from backend to frontend.
It is made with Node.js backend and React. Application uses cookies to store information on where in the path the users are. Cookies will last for 48 hours

# What do I need to use this?
- A server to run the application (Heroku is great!)
- Ability to generate QR codes and print them or otherwise present them (google: "QR code generator")
- Edit the stopsArray in validate-address-api.js - OBS: Users MUST follow the correct order so be sure to double check the order of these. 
- The landing page for each treasure hunt object will be: {{YOUR_SERVER}}/stop/{{CODE_FOR_STOP}} as an example if I create a stop with the localStopId: helloQR the address will be {{YOUR_SERVER}}/stop/helloQR
- Have fun!

# Feel free to contribute
Feel free to contribute PR and issues are welcome!
