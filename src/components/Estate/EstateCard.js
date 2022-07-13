import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';

function EstateCard({ estate, img, onDeleteClicked}) {
    return <Card sx={{ width: 345, m: '10px' }}>
        <CardMedia
            component="img"
            height="140"
            image={img}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {estate.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {estate.description}
            </Typography>
            <Divider sx={{mt: '10px', mb: '10px'}}/>
            {estate.price && estate.approximateMonthlyRentPrice && <Typography variant="body2">
                Recoup {moment().to(moment().add('day', ((estate.price / estate.approximateMonthlyRentPrice) / 12) * 365))}
            </Typography> }
        </CardContent>
        <CardActions>
            <Link to={'/dashboard/edit/' + estate.id}>
                <IconButton variant="contained">
                    <Edit/>
                </IconButton>
            </Link>
            <IconButton onClick={() => onDeleteClicked(estate)} variant="contained">
                <Delete/>
            </IconButton>
        </CardActions>
    </Card>;
}

export default EstateCard;
