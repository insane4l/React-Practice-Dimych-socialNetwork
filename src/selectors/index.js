import {createSelector} from 'reselect';

export const getUsers = (state) => {
    return state.usersPage.users;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getLoadingStatus = (state) => {
    return state.usersPage.isLoading;
};

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
};





