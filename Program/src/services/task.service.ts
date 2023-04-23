import Task from '../types/Task';

const getTasks = async () => {
    try {
        const response = await fetch('http://localhost:8080/tasks');
        return await response.json();
    } catch (error) {
        // traitement erreur
        console.log(error);
    }
};

const addTask = async (task: Task) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task),
    };
    try {
        const response = await fetch('http://localhost:8080/tasks', requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const updateTaskById = async (id: string, task: Task) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task),
    };
    try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const deleteTaskById = async (id: string) => {
    const requestOptions = {
        method: 'DELETE',
    };
    try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

const getTaskById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

export {getTasks, addTask, updateTaskById, deleteTaskById, getTaskById};