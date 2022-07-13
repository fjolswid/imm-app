import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../api/Api';

function EstateEditForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estate, setEstate] = useState(null);


    useEffect(() => {
        (async () => {
            const estate = await Api.getEstate({ id: params.estateId });
            setTitle(estate.title);
            setDescription(estate.description);
            setEstate(estate);
        })();
    }, []);


    async function onSaveClicked() {
        if (title) {
            const estateData = { title, description };

            await Api.editEstate({
                id: estate.id,
                ...estateData,
            });
            setTitle('');
            setDescription('');
            navigate('/dashboard');
        }
    }

    if (!estate) {
        return <Typography sx={{ mb: '20px' }} variant="h5">Loading...</Typography>;
    }

    return <div className="EstateForm">
        <Typography sx={{ mb: '20px' }} variant="h5">Edit Estate</Typography>
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
        <Button onClick={onSaveClicked} variant="contained">Edit</Button>
    </div>;
}

export default EstateEditForm;
