import React, {FC, useEffect, useState} from 'react';
import Task from "../types/Task";
import User from "../types/User";
import {addTask, deleteTaskById, getTasks, updateTaskById} from '../services/task.service';
import {getUsers} from '../services/user.service';
import Modal from './Modal';
import TaskForm from './TaskForm';

interface ListTaskProps {
    title: string;
}

const ListTasks: FC<ListTaskProps> = ({title}: ListTaskProps) => {
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [users, setUsers] = useState<User[] | null>([]);
    const onclick = () => {
        alert('click button')
    };
    const [isOpenForm, setOpenForm] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getTasksData = async () => {
            const tasks: Task[] = await getTasks();
            setTasks(tasks);
        }
        getTasksData();

        const getUsersData = async () => {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getUsersData();
    }, [refresh]);

    const sendNewTask = (formData: any) => {
        setOpenForm(false);
        const add = async (taskAdd: Task) => {
            taskAdd.statut = "En cours"
            const task = await addTask(taskAdd);
            setRefresh(refresh + 1);
        }
        add(formData);
    }

    const handleDeleteTask = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
            await deleteTaskById(id);
            setRefresh(refresh + 1);
        }
    }

    const getUserNameById = (userId: string | undefined) => {
        if (userId != null) {
            const user = users?.find(user => user._id === userId);
            return user ? user.name : '-';
        }
        return '';
    }

    const updateTaskStatut = (task: Task, newStatut: string) => {
        if (task) {
            task.statut = newStatut;
            updateTaskById(task._id, task)
                .catch((error) => {
                    console.error("Error updating task:", error);
                });
            setRefresh(refresh + 1);
        }
    };

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <button onClick={() => setOpenForm(true)}>Ajouter une tâche</button>
                <Modal
                    isOpen={isOpenForm}
                    onClose={() => setOpenForm(false)}
                    title="Enregistrer une tâche"
                    content={<TaskForm onSubmit={sendNewTask}/>}
                />
            </div>

            <table className='center'>
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Statut</th>
                    <th>Utilisateur associé</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks?.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.title}</td>
                            <td>{val.description}</td>
                            <td>
                                <select
                                    value={val.statut}
                                    onChange={(e) => updateTaskStatut(val, e.target.value)}
                                >
                                    <option value="En cours">En cours</option>
                                    <option value="Terminée">Terminée</option>
                                </select>
                            </td>
                            <td>{getUserNameById(val.userId)}</td>
                            <td>
                                <button onClick={() => handleDeleteTask(val._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListTasks;