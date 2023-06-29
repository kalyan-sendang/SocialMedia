import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
//registering new users
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashpass;

    const newUser = new UserModel(req.body)
    const { username } = req.body;
    try {

        const oldUser = await UserModel.findOne({ username })
        if (oldUser) {
            return res.status(400).json({ message: "User name is already registered" })
        }
        const user = await newUser.save();

        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })
        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
}
//login user

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username: username })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {

                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({ user, token })
            }
        } else {
            res.status(404).json("user dosesnot exists");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}