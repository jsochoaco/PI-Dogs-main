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
import AboutDev from './components/AboutDev/AboutDev';
import * as actions from "./redux/actions"

function App(props) {
  const data = ()=> {
    props.setTemperamentos()
    props.setApiDogs()
    props.setDBDogs()
    props.setIntermedia()}
  const { pathname } = useLocation()
  const {allDogs, allTemperamentos, intermedia, createdDog} = props
  return (
    <div className="App">
      { pathname != "/" && <NavBar/>}
      <Routes>
      <Route
      path='/'
      element={<Landing data = {data} />} />
      <Route
      path='/home'
      element={<Home allDogs= {allDogs} temperamentos = {allTemperamentos} intermedia = {intermedia} data= {data}/>} />
      <Route
      path='/details/:id'
      element={<Detail/>} />
      <Route 
      path='/create'
      element= {<Form temperamentos = {allTemperamentos} created = {createdDog}/>}/>
      <Route 
      path='/temperaments'
      element= {<Temperaments temperamentos = {allTemperamentos}/>}/>
      <Route
      path='/aboutDev'
      element= {<AboutDev/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        allTemperamentos: state.allTemperamentos,
        intermedia: state.intermedia,
        createdDog: state.createdDog
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setApiDogs: () => dispatch(actions.setApiDogs()),
        setDBDogs: () => dispatch(actions.setDBDogs()),
        setTemperamentos: () => dispatch(actions.setTemperamentos()),
        setIntermedia: ()=> dispatch(actions.setIntermedia()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

