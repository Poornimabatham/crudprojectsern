import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from './Create';
function App() {
  return (
  
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/create' element={<Create/>}/>

   </Routes>
  );
}

export default App;
