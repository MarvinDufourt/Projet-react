import React, {useEffect, useState} from 'react';
import {getTasks} from '../services/task.service';
import {getUsers} from '../services/user.service';
import Task from '../types/Task';
import User from '../types/User';

interface Props {
    userId: string;
}

const UserTaskList: React.FC<Props> = ({userId}) => {
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const users = await getUsers();
            const currentUser = users.find((user: { id: string; }) => user.id === userId);
            setUser(currentUser);
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await getTasks();
            const userTasks = allTasks.filter((task: { userId: string; }) => task.userId === userId);
            setTasks(userTasks);
        };
        fetchTasks();
    }, [userId]);

    const toggleList = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="userTask">
            <div className="list-header" onClick={toggleList}>
                {tasks.length === 0 ? (
                    <p className="no-tasks">Aucune tâche associée</p>
                ) : (
                    <p className="task-count">
                        <span>Il y a {tasks.length} tâche{tasks.length > 1 ? "s" : ""} associée
                            {tasks.length > 1 ? "s" : ""}{" "}</span>
                        <span className={`icon ${expanded ? "minus" : "plus"}`}></span>
                    </p>
                )}
            </div>
            {expanded && (
                <div className="task-list">
                    {tasks.map((task) => (
                        <div key={task._id} className="task-title">
                            {task.title} - Statut : {task.statut}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserTaskList;