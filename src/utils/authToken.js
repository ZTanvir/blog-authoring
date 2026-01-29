let authToken;

const getStoredAuthToken = () => authToken;

const setStoredAuthToken = (token) => {
  authToken = token;
};

export { getStoredAuthToken, setStoredAuthToken };
