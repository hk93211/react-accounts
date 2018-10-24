import axios from 'axios';

export const getRecords = () => {
    return axios.get('https://5b8fe19feb676700148a4da5.mockapi.io/records');
};

export const addRecord = record => {
    return axios.post('https://5b8fe19feb676700148a4da5.mockapi.io/records', record);
};

export const updateRecord = (id, record) => {
    return axios.put(`https://5b8fe19feb676700148a4da5.mockapi.io/records/${id}`, record);
};

export const deleteRecord = id => {
    return axios.delete(`https://5b8fe19feb676700148a4da5.mockapi.io/records/${id}`);
};
