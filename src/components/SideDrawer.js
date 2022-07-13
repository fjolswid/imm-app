import { Add, Inbox, Mail, List as ListIcon } from '@mui/icons-material';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';

function SideDrawer() {
    const options = [
        { title: 'My estates', icon: <ListIcon/>, link: '/dashboard/' },
        { title: 'Add estate', icon: <Add/>, link: '/dashboard/add' },
    ];

    const drawerWidth = 240;

    return (<Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <Toolbar/>
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {options.map(({ title, icon, link }) => (
                    <Link to={link}>
                        <ListItem key={title} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox/> : <Mail/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>);
}

export default SideDrawer;
