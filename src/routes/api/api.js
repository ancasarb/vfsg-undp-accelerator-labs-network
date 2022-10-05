const load = async function(path) {
    const response = await fetch(path);
    return await response.json();
}

export default load;