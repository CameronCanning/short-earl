import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
//import RecordList from "./components/recordList";
//import Edit from "./components/edit";
import Short from "./components/short";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Routes>                
                <Route path="/" element={<Short />} />
                <Route path="/finished" element={<Short />} />
            </Routes>
        </div>
    )
}

export default App;

//<Route exact path="/" element={<RecordList />} />
//<Route path="/edit/:id" element={<Edit />} />