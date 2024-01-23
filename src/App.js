import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLayout from './Layouts/HomeLayout';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
