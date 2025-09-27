export const getJWT = () => sessionStorage.getItem("jwt");
export const setJWT = (token) => sessionStorage.setItem("jwt", token);
export const removeJWT = () => sessionStorage.removeItem("jwt");
