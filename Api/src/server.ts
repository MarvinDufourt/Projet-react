import express, {Application} from 'express';
import {connect} from 'mongoose';
import {addUser, deleteUserById, getAllUsers, getUserById, updateUserById} from "./handlers/Users";
import {addTask, deleteTaskById, getTaskById, getTasks, updateTaskById} from "./handlers/Tasks";

const port: number = 8080;
const cors = require('cors');
const app: Application = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000' //Autorise les requests depuis cette adresse
}));

// Routes pour users
app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.post('/users', addUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);

//Routes pour tasks
app.get('/tasks', getTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', addTask);
app.put('/tasks/:id', updateTaskById);
app.delete('/tasks/:id', deleteTaskById);


const dbConnect = async (): Promise<void> => {
    const uri: string = "mongodb+srv://Marvin:VrVKAYIdQZDZ3Srv@cluster0.4lvywd9.mongodb.net/?retryWrites=true&w=majority";
    try {
        const cnx = await connect(uri);
        console.log('Mongo connecté')
    } catch (error) {
        console.log(error);
    }
}


//Start server
app.listen(port, () => {
    //Connection base
    dbConnect();
    console.log('server listening on port', port);
});