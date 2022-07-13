import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Api from '../../api/Api';

function EstateAddForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function onSaveClicked() {
        if (title) {
            const estateData = { title, description };
            await Api.addEstate(estateData);
            setTitle('');
            setDescription('');
            navigate('/dashboard');
        }
    }

    return <div className="EstateForm">
        <Typography sx={{ mb: '20px' }} variant="h5">Add Estate</Typography>
        <FormControl sx={{ mb: '20px', width: '100%' }}>
            <TextField
                sx={{ maxWidth: '250px' }}
                variant="outlined"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
        </FormControl>
        <FormControl sx={{ mb: '20px', width: '100%' }}>
            <TextField
                sx={{ maxWidth: '250px' }}
                variant="outlined"
                label="Description"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
        </FormControl>
        <Button onClick={onSaveClicked} variant="contained">Add</Button>
    </div>;
}

export default EstateAddForm;
