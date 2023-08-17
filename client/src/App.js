import './App.css';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import Landing from "./components/Landing/Landing"
import CardDogs from './components/CardDogs/CardDogs';

function App() {
  
  return (
    <div className="App">
      <Routes>
      <Route
      path='/'
      element={<Landing/>} />
      <Route
      path='/home'
      element={<CardDogs/>} />
      </Routes>
    </div>
  );
}

export default App;
