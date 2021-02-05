const Users = require('../models/Users')
const Rooms = require('../models/Rooms')
const bcrypt = require("bcryptjs");
const Messages = require('../models/Messages')

exports.signup = async (req, res) => {
    // TODO: Form validation

    Users.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: "Email or phone has already exists" });
            } else {
                const newUser = new Users({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password
                });

                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
}

exports.signin = async (req, res) => {
    res.send('signin')

    // TODO: Form validation
    // const email = req.body.email;
    // const password = req.body.password;

    // // Find user by email
    // User.findOne({ email }).then(user => {
    //     // Check if user exists
    //     if (!user) {
    //         return res.status(404).json({ emailnotfound: "Email not found" });
    //     }

    //     // Check password
    //     bcrypt.compare(password, user.password).then(isMatch => {
    //         if (isMatch) {
    //             // User matched
    //             // Create JWT Payload
    //             const payload = {
    //                 id: user.id,
    //                 name: user.name
    //             };

    //             // Sign token
    //             jwt.sign(
    //                 payload,
    //                 keys.secretOrKey,
    //                 {
    //                     expiresIn: 3600 // 1h
    //                 },
    //                 (err, token) => {
    //                     res.json({
    //                         success: true,
    //                         token: "Bearer " + token
    //                     });
    //                 }
    //             );
    //         } else {
    //             return res
    //                 .status(400)
    //                 .json({ passwordincorrect: "Password incorrect" });
    //         }
    //     });
    // });
}

exports.logout = async (req, res) => {
    res.send('logout')
}
exports.test = async (req, res) => {
    try {
        // Creamos room test
        // const data = {
        //     members: ['601d7d92ca90643128bfa8aa', '601d7d65ca90643128bfa8a9'],
        //     messages: ['601d7e13ca90643128bfa8b5', '601d7e0cca90643128bfa8b4', '601d7e09ca90643128bfa8b3','601d7e04ca90643128bfa8b2','601d7e01ca90643128bfa8b1', '601d7defca90643128bfa8b0','601d7dedca90643128bfa8af']
        // }


        // const res = await Rooms.create(data)
        // console.log(res)

        const data = await Rooms.find()
            .populate('members')
            .populate('messages')

        res.status(201).json(data)

        // if (data) {
        // } else {
        //     res.status(500).send(err)
        // }

    } catch (error) {
        res.status(500).send(error)
    }
}