import {FC} from 'react';

import './assets/css/App.css';
import Header from './components/Header';
import Navbar from './components/NavBar';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage'
import TasksPage from "./pages/TasksPage";


const App: FC = () => {


    return (

        <div className="App">


            <div>

                <Header/>
                <Navbar/>
            </div>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/tasks" element={<TasksPage/>}/>
            </Routes>


        </div>

    );
}

export default App;
