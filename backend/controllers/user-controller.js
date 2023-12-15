import User from '../models/User';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }

    return res.status(200).json({ users });

};

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
        res.status(422).json({ message: "Invalid Inputs" });
    }

    let user;
    try {
        user = new User({ name, email, password });
        user = await user.save();
    }
    catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ user });
}