import {Request, Response} from "express";
import {Task} from "../models/Task";

// addTask
const addTask = async (req: Request, res: Response): Promise<void> => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.json(task);
    } catch (e) {
        res.status(500).send("error");
    }
};

// getTaskById
const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        task ? res.json(task) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// getTasks
const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (e) {
        res.status(500).send('error server');
    }
};

// updateTaskById
const updateTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const update = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, update, {new: true});
        task ? res.json(task) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

// deleteTaskById
const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id);
        task ? res.json({message: 'Task deleted successfully'}) : res.status(404).send();
    } catch (e) {
        res.status(500).send('error server');
    }
};

export {addTask, getTaskById, getTasks, updateTaskById, deleteTaskById};