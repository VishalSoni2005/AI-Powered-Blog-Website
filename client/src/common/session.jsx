const storeInSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const lookInSession = key => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null; // Return null if no data found
};

const removeFromSession = key => {
  sessionStorage.removeItem(key);
};

const logOutUser = () => {
  sessionStorage.clear();
};

export { storeInSession, lookInSession, removeFromSession, logOutUser };
