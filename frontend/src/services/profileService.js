import axios from 'axios';

const getMyProfile = async () => {
    const res = await axios.get('/profile/me');
    return res;
};

const getUserProfile = async (userId) => {
    const res = await axios.get(`/profile/user/${userId}`);
    return res;
};

const deleteProfile = async () => {
    const res = await axios.post('/profile/delete/', {});
    return res;
};
const checkConnection = async (toUserId) => {
    const res = await axios.post(`/profile/connected/${toUserId}`, {});
    return res;
};

const addLike = async (toUserId) => {
    await axios.post(`/profile/addinteraction/likes/${toUserId}`, {});
};

const removeLike = async (toUserId) => {
    await axios.post(`/profile/removeinteraction/likes/${toUserId}`, {});
};

const addInteraction = async (type, toUserId) => {
    const res = await axios.post(`/profile/addinteraction/${type}/${toUserId}`, {});
    return res;
};

const unblockUser = async (userId) => {
    const res = axios.post(`/profile/removeinteraction/blocked/${userId}`, {});
    return res;
};

const getTags = async () => {
    const res = await axios.get('profile/tags');
    return res.data;
};

export default {
    getMyProfile,
    getUserProfile,
    deleteProfile,
    checkConnection,
    addLike,
    removeLike,
    addInteraction,
    unblockUser,
    getTags,
};
