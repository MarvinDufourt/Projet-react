import User from '../types/User';

const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:8080/users');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        return await response.json();
    } catch (error) {
        // traitement erreur
        console.log(error)
    }
}

const addUser = async (user: User) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch('http://localhost:8080/users', requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

const updateUserById = async (id: string, user: User) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

const deleteUserById = async (id: string) => {
    const requestOptions = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, requestOptions);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export {getUsers, getUserById, addUser, updateUserById, deleteUserById};