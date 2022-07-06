export const baseUrl = `http://localhost:5000/api/v1/`;

export const fetchData = async({endpoint, method, body}) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        body,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}
