
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home';
// import Company from './components/pages/Company';
// import Contact from './components/pages/Contact';
// import NewProject from './components/pages/NewProject';



function App() {

  return (
        <BrowserRouter>


            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/company' element={<Company />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/newproject' element={<NewProject />}></Route> */}
            </Routes>

        </BrowserRouter>
  );
}

export default App;
