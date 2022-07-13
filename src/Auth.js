import { useEffect, useState } from 'react';
import Api from './api/Api';
import axios, { setAccessToken } from './api/axios';
import UserContext from './context/UserContext';

function Auth({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const localUser = JSON.parse(localStorage.getItem('user'));
            if (localUser) {
                setAccessToken(axios, localUser.accessToken);
                try {
                    setUser(await Api.me());
                } catch (err) {
                    localStorage.setItem('user', null);
                    console.log(err);
                }
            }

            setLoading(false);
        })();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>
        {loading ? <h1>Loading...</h1> : children}
    </UserContext.Provider>;
}

export default Auth;
