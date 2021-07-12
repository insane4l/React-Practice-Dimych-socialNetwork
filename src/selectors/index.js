import {createSelector} from 'reselect';

export const getUsers = (state) => {
    return state.friendsPage.users;
};

export const getTotalUsersCount = (state) => {
    return state.friendsPage.totalUsersCount;
};

export const getPageSize = (state) => {
    return state.friendsPage.pageSize;
};

export const getCurrentPage = (state) => {
    return state.friendsPage.currentPage;
};

export const getLoadingStatus = (state) => {
    return state.friendsPage.isLoading;
};

export const getFollowingInProgress = (state) => {
    return state.friendsPage.followingInProgress;
};





