import TelaCadCandidato from "./telas/CadCandidato"
import TelaMenu from "./telas/TelaMenu"
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (    
      <div>
       <BrowserRouter>
          <Routes>
    
            <Route path="/cadastroCandidatos" element={<TelaCadCandidato/>}/>
            <Route path="/" element={<TelaMenu/>}/>
           
          </Routes>
        </BrowserRouter>
      </div>    
    
  );
}
export default App

