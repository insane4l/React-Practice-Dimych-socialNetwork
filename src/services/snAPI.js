import * as axios from 'axios';

const apiBase = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e88bb7e6-af23-49e2-8781-5099f9ee4dd5"
    }
})

export const usersAPI = {

    getUsers(pageSize, currentPage) {
        return apiBase.get(`users?count=${pageSize}&page=${currentPage}`)
    },

    setProfilePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return apiBase.put('profile/photo', formData)
    },

    getUserProfile(userId) {
        return apiBase.get(`profile/${userId}`)
    },

    getProfileStatus(userId) {
        return apiBase.get(`profile/status/${userId}`)
    },

    setProfileStatus(message) {
        return apiBase.put('profile/status', {status: message})
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

export const authAPI = {
    getUserAuthData() {
        return apiBase.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return apiBase.post('/auth/login', {email, password, rememberMe});
    },
    logout() {
        return apiBase.delete('auth/login');
    }
}

