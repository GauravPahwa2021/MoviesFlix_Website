import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    }
    catch (err) {
        return console.log(err);
    }

    if (existingAdmin) {
        return res.status(500).json({ message: "Admin already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    let newAdmin;
    try {
        newAdmin = new Admin({ email, password: hashedPassword });
        newAdmin = await newAdmin.save();
    }
    catch (err) {
        return console.log(err);
    }

    if (!newAdmin) {
        return res.status(500).json({ message: "Unable to store admin" });
    }
    res.status(201).json({ newAdmin });

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    }
    catch (err) {
        return console.log(err);
    }

    if (!existingAdmin) {
        return res.status(400).json({ message: "Admin not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Authentication complete" });
};