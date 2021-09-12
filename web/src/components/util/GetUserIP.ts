const getUserIP = async () => {
    const response = await fetch('https://geolocation-db.com/json/');
    const data = await response.json();
    return data;
}

export default getUserIP;