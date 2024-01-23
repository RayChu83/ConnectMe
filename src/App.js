import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './Redux/store';
import AppLayout from './Layouts/AppLayout';
import ProtectedRouteLayout from './Layouts/ProtectedRouteLayout';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route element={<ProtectedRouteLayout />}>
              <Route index element={<Home />}/>
            </Route>
            <Route path='login' element={<h1>Login Page</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
