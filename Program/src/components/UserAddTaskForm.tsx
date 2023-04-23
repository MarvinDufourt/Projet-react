import React, {FC, useEffect, useState} from "react";
import Task from "../types/Task";
import {getTasks, updateTaskById} from "../services/task.service";

interface FormProps {
    onSubmit: (formData: any) => void;
    userId: string;
}

interface FormData {
    task: Task | null;
}

const UserAddTaskForm: FC<FormProps> = ({onSubmit, userId}: FormProps) => {
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [formData, setFormData] = useState<FormData>({
        task: null,
    });

    useEffect(() => {
        const getData = async () => {
            const tasks: Task[] = await getTasks();
            setTasks(tasks);
        };
        getData();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const taskId = event.target.value;
        const task = tasks?.find((t) => t._id === taskId) || null;
        setFormData({task});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {task} = formData;
        if (task) {
            task.userId = userId;
            updateTaskById(task._id, task).then(() => {
                onSubmit(formData);
                setFormData({task: null});
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tâche :
                <select onChange={handleSelectChange}>
                    <option value=""></option>
                    {tasks?.map((t) => (
                        <option key={t._id} value={t._id}>
                            {t.title}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default UserAddTaskForm;