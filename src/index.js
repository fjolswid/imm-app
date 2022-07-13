import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Auth from './Auth';
import EstateAddForm from './components/Estate/EstateAddForm';
import EstateEditForm from './components/Estate/EstateEditForm';
import EstateList from './components/Estate/EstateList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

ReactDOM.render(
    <React.StrictMode>
        <Auth>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="/dashboard" element={<Dashboard/>}>
                            <Route path="" element={<EstateList/>}/>
                            <Route path="add" element={<EstateAddForm/>}/>
                            <Route path="edit/:estateId" element={<EstateEditForm/>}/>
                        </Route>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Auth>
    </React.StrictMode>,
    document.getElementById('root'),
);
