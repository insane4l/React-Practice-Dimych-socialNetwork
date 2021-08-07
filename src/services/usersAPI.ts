import {apiBase, ResponseType} from './API';
import {ProfileType, UserPhotosType, UserType} from '../types/types';

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type SavePhotoResponseDataType = {
    photos: UserPhotosType
}

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return apiBase.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(res => res.data)
    },

    setProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return apiBase.put< ResponseType<SavePhotoResponseDataType> >('profile/photo', formData).then(res => res.data)
    },

    setProfileData(data: ProfileType) {
        return apiBase.put<ResponseType>('profile', data).then(res => res.data)
    },

    getUserProfile(userId: number) {
        return apiBase.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },

    getProfileStatus(userId: number) {
        return apiBase.get<string>(`profile/status/${userId}`).then(res => res.data)
    },

    setProfileStatus(message: string) {
        return apiBase.put<ResponseType>('profile/status', {status: message}).then(res => res.data)
    },

    checkFollowStatus(userId: number) {
        return apiBase.get<boolean>(`follow/${userId}`).then(res => res.data)
    },
    followToUser(userId: number) {
        return apiBase.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollowFromUser(userId: number) {
        return apiBase.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
}