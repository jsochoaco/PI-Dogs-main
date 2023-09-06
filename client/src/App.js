import './App.css';
import {Routes, Route, useLocation} from "react-router-dom"
import { connect } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Detail from "./components/Detail/Detail"
import Form from './components/Form/Form';
import Temperaments from './components/Temperaments/Temperaments';
import AboutDev from './components/AboutDev/AboutDev';
import * as actions from "./redux/actions"

// Función app
function App(props) {
  //Importo la data y la paso como props a los componenetes
  const data = ()=> {
    props.setTemperamentos()
    props.setApiDogs()
    props.setDBDogs()
    props.setIntermedia()}
  // Path para modificar Nav
  const { pathname } = useLocation()
  // Importo los estados 
  const {allDogs, allTemperamentos, intermedia, createdDog} = props
  //Renderizado de rutas 
  return (
    <div className="App">
      {pathname != "/" && <NavBar/>}
      <Routes>
        <Route //Landing page
        path='/'
        element={<Landing/>} />
        <Route // Home
        path='/home'
        element={<Home allDogs= {allDogs} temperamentos = {allTemperamentos} intermedia = {intermedia} data= {data}/>}/>
        <Route // Details
        path='/details/:id'
        element={<Detail dogs= {allDogs} temperamentos = {allTemperamentos} intermedia = {intermedia}/>} />
        <Route //Create dog/form
        path='/create'
        element= {<Form temperamentos = {allTemperamentos} created = {createdDog} data= {data}/>}/>
        <Route //Temperaments
        path='/temperaments'
        element= {<Temperaments temperamentos = {allTemperamentos} data= {data}/>}/>
        <Route //Info del dev
        path='/aboutDev'
        element= {<AboutDev/>}/>
      </Routes>
    </div>)};

// Estados y acciones como props a App
const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        allTemperamentos: state.allTemperamentos,
        intermedia: state.intermedia,
        createdDog: state.createdDog
    }};
const mapDispatchToProps = (dispatch) => {
    return {
        setApiDogs: () => dispatch(actions.setApiDogs()),
        setDBDogs: () => dispatch(actions.setDBDogs()),
        setTemperamentos: () => dispatch(actions.setTemperamentos()),
        setIntermedia: ()=> dispatch(actions.setIntermedia()),
    }};
export default connect(mapStateToProps, mapDispatchToProps)(App);

