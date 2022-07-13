import { Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { useRef, useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Api from '../api/Api';
import axios, { setAccessToken } from '../api/axios';
import UserContext from '../context/UserContext';

const Login = () => {
    const errRef = useRef();
    useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await Api.login({ email, password });
            setAccessToken(axios, user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="Login">
            {user && <Navigate to="/dashboard"/>}
            <Card sx={{ maxWidth: '350px', ml: 'auto', mr: 'auto', mt: '65px', p: '20px' }} variant="outlined">
                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Typography variant="h5" component="div">Sign In</Typography>
                        <div className="LoginErrMsg">
                            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}
                               aria-live="assertive">{errMsg}</p>
                        </div>

                        <FormControl sx={{ mb: '10px', mt: '10px', width: '100%' }} variant="outlined">
                            <TextField sx={{ maxWidth: '250px', m: 'auto' }} id="email" label="Email"
                                       variant="outlined" autoComplete="off"
                                       onChange={(e) => setEmail(e.target.value)}
                                       value={email}
                                       required
                            />
                        </FormControl>

                        <FormControl sx={{ width: '100%', mb: '10px' }}>
                            <TextField sx={{ maxWidth: '250px', m: 'auto' }} id="password" label="Password"
                                       variant="outlined"
                                       autoComplete="off"
                                       type="password"
                                       onChange={(e) => setPassword(e.target.value)}
                                       value={password}
                                       required
                            />
                        </FormControl>

                        <Button onClick={handleSubmit} variant="contained">Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
