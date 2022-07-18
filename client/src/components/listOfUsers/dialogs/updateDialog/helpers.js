export const getQueries = (searchParams, arr) => {
    const queryNames = ['page', 'limit', 'contains', 'sortBy', 'isActive'];

    if (arr?.length) {
        for (const elem of arr) {
            queryNames.splice(queryNames.indexOf(elem), 1);
        }
    }
    return queryNames.reduce((acc, queryName) => {
        if (searchParams.get(queryName)) {
            acc[queryName] = searchParams.get(queryName);
        }
        return acc;
    }, {})
}

export const getExhbitQueries = (searchParams) => {
    const queryNames = ['page', 'limit', 'contains', 'sortBy', 'material', 'category', 'isActive'];

    queryNames.forEach((query) => {
        const value = searchParams.get(query);
        if (value) {
            searchParams.set(query, value);
        }
    })

    return Object.fromEntries([...searchParams]);
}
