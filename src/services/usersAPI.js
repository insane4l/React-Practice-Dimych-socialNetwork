import * as axios from 'axios';

const apiBase = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e88bb7e6-af23-49e2-8781-5099f9ee4dd5"
    }
})

const usersAPI = {
    getUserAuthData() {
        return apiBase.get(`auth/me`)
    },

    getUsers(pageSize, currentPage) {
        return apiBase.get(`users?count=${pageSize}&page=${currentPage}`)
    },

    getUserProfile(userId) {
        return apiBase.get(`profile/${userId}`)
    },

    checkFollowStatus(userId) {
        return apiBase.get(`follow/${userId}`)
    },
    followToUser(userId) {
        return apiBase.post(`follow/${userId}`)
    },
    unfollowFromUser(userId) {
        return apiBase.delete(`follow/${userId}`)
    },
}

export default usersAPI;