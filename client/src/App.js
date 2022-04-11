import { Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navbar";
import Redirect from './components/redirect';
import Earl from "./components/earl";

const App = () => {
    return (
        <div>
            <Routes>     
                <Route path=':earl' element={<Redirect/>}/>         
                <Route path='/' element={<Navigate to='/app'/>}/>
                <Route path='/app' element={<NavBar/>}>
                    <Route index element={<Earl/>}/> 
                </Route>         
            </Routes>
        </div>
    )
}

export default App;
