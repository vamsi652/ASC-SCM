import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Log from './lp';
import LoginPage from './Login';
import ADST from './ADST';
import ADRR from './ADRR';
import ADSTDashboard from './req';
import DDSTDashboard from './DDST';
import  DDRR  from './DDRR';
import Manufacturer from './Manufac'
import Req from './ReqSent'
import DGST from './DGST'
import DGRR from './DGRR'
import Trans from './TransactionHistory'
import Md from './md'
import Transportation from './Transportation';
import Dreg from './Dreg';
import CheckStatus from './CheckStatus';
function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Log/>} />
        <Route exact path="/ADST" element={<ADST/>} />
        <Route exact path="/Dreg" element={<Dreg/>} />
        <Route exact path="/TransactionHistory" element={<Trans/>} />
        <Route exact path="/ADRR" element={<ADRR/>} />
        <Route exact path="/req" element={<ADSTDashboard/>} />
        <Route exact path="/DDST" element={<DDSTDashboard/>}/>
        <Route exact path="/DDRR" element={<DDRR/>}/>
        <Route exact path="/md" element={<Md/>}/>
        <Route exact path="/Manufac" element={<Manufacturer/>}/>
        <Route exact path="/ReqSent" element={<Req/>}/>
        <Route exact path="/DGST" element={<DGST/>}/>
        <Route exact path="/DGRR" element={<DGRR/>}/>
        <Route path="/Transportation" element={<Transportation/>}/>
          <Route path="/CheckStatus" element={<CheckStatus/>}/>
        <Route exact path="*" element={<Log/>}/>
      </Routes>
    </Router>
  );
}

export default App;

