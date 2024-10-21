let token = '';
const setLocalToken = (newToken:string) =>{
    token = newToken;
}

const getToken = () => {
    return token;
};

module.exports= { 
    getToken, setLocalToken
}