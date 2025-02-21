const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, value);
};
const lookInSession = (key) => {
  return sessionStorage.getItem(key); //! Retrieves the stored JWT token
};
const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};
const logOutUser = () => {
  sessionStorage.clear();
};

export { storeInSession, lookInSession, removeFromSession, logOutUser };
