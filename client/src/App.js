import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";
//import RecordList from "./components/recordList";
//import Edit from "./components/edit";
import Short from "./components/short";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Routes>                
                <Route path='/' element={<Navigate to='/app'/>}/>
                <Route path='/app' element={<Short/>}/>
                <Route path='/app/earls' element={<Short/>/**<Earls/>*/}/>
            </Routes>
        </div>
    )
}

export default App;

//<Route exact path="/" element={<RecordList />} />
//<Route path="/edit/:id" element={<Edit />} />