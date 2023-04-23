import {FC} from "react";
import ListUsers from '../components/ListUsers';


const HomePage: FC = () => {
    return (
        <div>

            <div><ListUsers title="Liste des utilisateurs"/></div>

        </div>
    )
}


export default HomePage;