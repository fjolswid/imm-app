import {
    Box,
    createTheme,
    CssBaseline,
    ThemeProvider,
    Toolbar,
} from '@mui/material';
import { useContext} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideDrawer from './components/SideDrawer';
import UserContext from './context/UserContext';

const defaultTheme = createTheme({
    palette: {
        primary: {
            light: '#e8fdbe',
            main: '#b5ca8d',
            dark: '#85995f',
        },
        secondary: {
            light: '#9dd3ff',
            main: '#6ba2ce',
            dark: '#38749d',
        },
    },
});


function App() {
    const { user } = useContext(UserContext);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                <Header/>
                {user ? <SideDrawer/> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar/>
                    <Outlet/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
