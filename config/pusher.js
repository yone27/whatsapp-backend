const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1149613",
    key: "2e7998c3dd19bb8eff12",
    secret: "323f5c51811520e2b3a8",
    cluster: "us2",
    useTLS: true
});

module.exports = pusher