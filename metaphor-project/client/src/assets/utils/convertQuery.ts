const convertQuery = (query: string) => {
    const newQuery = query.replace(' ', '%20');
    return newQuery;
}

export default convertQuery;