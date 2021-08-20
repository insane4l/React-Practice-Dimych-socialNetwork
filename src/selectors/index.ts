import {createSelector} from 'reselect';
import {AppStateType} from '../reduxStore';

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getUsersListFilters = (state: AppStateType) => {
    return state.usersPage.filters;
};

export const getLoadingStatus = (state: AppStateType) => {
    return state.usersPage.isLoading;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};





