import './App.css';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import { useState } from 'react';
import { connect } from 'react-redux';
import Detail from "./components/Detail/Detail"
import Form from './components/Form/Form';
import { NavBar } from './components/NavBar/NavBar';
import Temperaments from './components/Temperaments/Temperaments';

function App(props) {
  const { pathname } = useLocation()
  const {allDogs, allTemperamentos} = props
  return (
    <div className="App">
      { pathname != "/" && 
      <NavBar/>
      }
      <Routes>
      <Route
      path='/'
      element={<Landing/>} />
      <Route
      path='/home'
      element={<Home allDogs= {allDogs} temperamentos = {allTemperamentos}/>} />
      <Route
      path='/details/:id'
      element={<Detail/>} />
      <Route 
      path='/create'
      element= {<Form temperamentos = {allTemperamentos}/>}/>
      <Route 
      path='/temperaments'
      element= {<Temperaments temperamentos = {allTemperamentos}/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        allTemperamentos: state.allTemperamentos
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setApiDogs: () => dispatch(actions.setApiDogs()),
        setDBDogs: () => dispatch(actions.setDBDogs()),
        setTemperamentos: () => dispatch(actions.setTemperamentos()),
        setIntermedia: ()=> dispatch(actions.setIntermedia())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

