import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Clients from './pages/Clients'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            {/* Para el login */}
          <Route path="/" element={<Login />} /> 

          {/* Aquí creen sus páginas para enrutarlos */}
          <Route path="/dashboard" element={ <Dashboard/> }/>
          <Route path="/sales" element={ <Sales/>} />
          <Route path="/clients" element={ <Clients/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
