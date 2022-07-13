import axios from './axios';

async function login({ email, password }) {
    const response = await axios.post('/auth/login',
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );

    const accessToken = response?.data?.jwt?.accessToken;
    const user = response?.data?.user;
    return { ...user, accessToken };
}


async function me() {
    const response = await axios.get('/user/me');

    return response?.data?.user;
}

async function getEstates() {
    const response = await axios.get('/property');
    return response?.data?.properties;
}

async function getEstate({ id }) {
    const response = await axios.get('/property/' + id);
    return response?.data?.property;
}

async function addEstate({ title, description }) {
    const response = await axios.post('/property',
        JSON.stringify({ title, description }),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );

    return response?.data?.property;
}

async function editEstate({ id, title, description }) {
    const response = await axios.put('/property/' + id,
        JSON.stringify({ title, description }),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );

    return response?.data?.property;
}

async function deleteEstate({ id }) {
    await axios.delete('/property/' + id);

    return true;
}

const Api = {
    login,
    me,
    getEstates,
    getEstate,
    addEstate,
    editEstate,
    deleteEstate,
};

export default Api;
