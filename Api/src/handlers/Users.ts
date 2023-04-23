import {Request, Response} from "express";
import {User} from "../models/User";

// create user

const addUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).send("error");
    }
};

// getUserById

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        user ? res.json(user) : res.status(404).send
    } catch (e) {
        res.status(500).send('error server');
    }

}

// getAllUsers

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).send('error server');
    }
};

// updateUserById

const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const update = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, update, {new: true});
        user ? res.json(user) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// deleteUserById

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        user ? res.json(user) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

export { addUser, getUserById, getAllUsers, updateUserById, deleteUserById }