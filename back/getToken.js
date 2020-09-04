const getToken = req => {
  if (
    req.headers.autorization &&
    req.headers.autorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.autorization.split(" ")[1];
  } else {
    return null;
  }
};
module.exports = getToken;