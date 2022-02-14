import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './elements/LandingPage/LandingPage';
import Home from "./elements/Home/Home"
import { Detail } from './elements/Detail/Detail';
import Formulario from './elements/formulario/formulario';
import FormularioPut from './elements/formulario/formularioPut';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/home/activity" element={<Formulario/>}/>
        <Route path="/home/activity/update" element={<FormularioPut/>} />
      </Routes>
    </Router>    
  );
}

export default App;
