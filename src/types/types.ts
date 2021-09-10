export type ProfileContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
};

export type UserPhotosType = {
    small: string | null
    large: string | null
};

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: UserPhotosType
    aboutMe: string
};

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: UserPhotosType
    status: string | null
    followed: boolean
}

export type PostType = {
    id: number
    postDate: string
    label: string
    likesCount: number
    comments: number
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
