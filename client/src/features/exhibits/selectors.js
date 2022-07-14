export const getExhibitsSelector = (state) => {
    return state.exhibits.exhibitsPerPage
}

export const getExhibitsCount = (state) => {
    return state.exhibits.count
}

export const getFilteredCount = (state) => {
    return state.exhibits.filteredCount;
}

export const getLoading = (state) => {
    return state.exhibits.loading;
}