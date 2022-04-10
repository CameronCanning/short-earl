import { Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navbar";
import Redirect from './components/redirect';
import Short from "./components/short";

const App = () => {
    return (
        <div>
            <Routes>     
                <Route path=':earl' element={<Redirect/>}/>         
                <Route path='/' element={<Navigate to='/app'/>}/>
                <Route path='/app' element={<NavBar/>}>
                    <Route index element={<Short/>}/> 
                </Route>         
            </Routes>
        </div>
    )
}

export default App;
//<NavBar/>
//<Route path='/' element={<Navigate to='/app'/>}/>   
//<Route exact path="/" element={<RecordList />} />
//<Route path="/edit/:id" element={<Edit />} />