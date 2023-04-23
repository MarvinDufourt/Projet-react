import {FC, useEffect, useState} from 'react';
import User from "../types/User";
import {addUser, deleteUserById, getUsers} from '../services/user.service';
import Modal from './Modal';
import UserForm from './UserForm';
import UserTaskList from './UserTasksList';
import UserAddTaskForm from "./UserAddTaskForm";
import Task from "../types/Task";
import {addTask} from "../services/task.service";

interface ListUserProps {
    title: string;
}

const ListUsers: FC<ListUserProps> = ({title}: ListUserProps) => {
    const [users, setUsers] = useState<User[] | null>([]);
    const [isOpenFormUserAddTask, setOpenFormUserAddTask] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [isOpenForm, setOpenForm] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getData();
    }, [refresh]);

    const sendNewUser = (formData: any) => {
        setOpenForm(false);
        const add = async (userAdd: User) => {
            const user = await addUser(userAdd);
            setRefresh(refresh + 1);
        }
        add(formData);
    }

    const addTaskToUser = (formData: any) => {
        setOpenFormUserAddTask(false);
        const add = async (taskAdd: Task) => {
            const task = await addTask(taskAdd);
            setRefresh(refresh + 1);
            window.location.reload()
        }
        add(formData);
    }

    const handleDeleteUser = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            await deleteUserById(id);
            setRefresh(refresh + 1);
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <button onClick={() => setOpenForm(true)}>Ajouter un utilisateur</button>
                <Modal
                    isOpen={isOpenForm}
                    onClose={() => setOpenForm(false)}
                    title="Enregistrer un utilisateur"
                    content={<UserForm onSubmit={sendNewUser}/>}
                />
            </div>
            <table className='center'>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Tâches associées</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users?.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>
                                <div>
                                    <UserTaskList userId={val._id}/>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => {
                                    setCurrentUserId(val._id);
                                    setOpenFormUserAddTask(true);
                                }}>Ajouter une tâche
                                </button>
                                <Modal
                                    isOpen={isOpenFormUserAddTask && currentUserId === val._id}
                                    onClose={() => setOpenFormUserAddTask(false)}
                                    title="Ajouter une tâche"
                                    content={<UserAddTaskForm userId={currentUserId} onSubmit={addTaskToUser}/>}
                                />
                                <button onClick={() => handleDeleteUser(val._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
export default ListUsers;