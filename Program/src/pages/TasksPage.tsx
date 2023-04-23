import {FC} from "react";
import ListTasks from '../components/ListTasks';


const TasksPage: FC = () => {
    return (
        <div>

            <div><ListTasks title="Liste des tâches"/></div>

        </div>
    )
}


export default TasksPage;