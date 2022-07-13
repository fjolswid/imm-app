import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import Api from '../../api/Api';
import EstateCard from './EstateCard';

function EstateList() {
    const [estates, setEstates] = useState([]);
    const [deletingEstate, setDeletingEstate] = useState(null);
    const [showDeletingDialog, setShowDeletingDialog] = useState(false);

    useEffect(() => {
        (async () => {
            setEstates(await Api.getEstates());
        })();
    }, []);

    async function onDeleteClicked(estate) {
        setDeletingEstate(estate);
        setShowDeletingDialog(true);
    }

    async function deletingDialogClicked(deleteConfirmed) {
        if(deleteConfirmed && deletingEstate) {
            await Api.deleteEstate({ id: deletingEstate.id });
            setEstates(estates.filter((estate) => estate.id !== deletingEstate.id));
        }

        setShowDeletingDialog(false);
    }

    return <div className="EstateList">
        <div className="EstateListContainer">
        {estates.map((estate) => <EstateCard
            img="https://static.suedtirol.com/alpines-lake-mountain-residence-fs-scg-20372c.jpg"
            estate={estate}
            onDeleteClicked={onDeleteClicked}
            key={estate.id.toString()}/>)}
        </div>
        <Dialog
            open={showDeletingDialog}
            onClose={() => deletingDialogClicked(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Do you really want to delete {deletingEstate?.title}?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => deletingDialogClicked(false)}>Cancel</Button>
                <Button onClick={() => deletingDialogClicked(true)} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>;
}

export default EstateList;
