export const getLoading = (state) => {
    return state.userAccess.isLoading;
}
export const getUserInfo = (state) => {
    return state.userAccess.userInfo;
}
export const getToken = (state) => {
    return state.userAccess.token;
}
export const getMessage = (state) => {
    return state.userAccess.message;
}