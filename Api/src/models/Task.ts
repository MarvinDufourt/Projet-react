import {Model, model, Schema} from "mongoose";

interface ITask {
    title: string;
    description: string;
    statut: string;
    userId: string;
    id: string;
}

const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    statut: {
        type: String
    },
    userId: {
        type: String
    },
    id: {
        type: String
    },
});

const Task: Model<ITask> = model('Task', TaskSchema);

export {Task, ITask};