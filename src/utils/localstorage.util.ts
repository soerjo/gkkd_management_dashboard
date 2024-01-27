// Function to set JWT with expiration in local storage
export const setLocalStorage = (keyName: string, data: any, expirationMinutes: number) => {
  const expirationMS = expirationMinutes * 60 * 1000; // Convert minutes to milliseconds
  const expirationTime = new Date().getTime() + expirationMS;

  const tokenData = {
    data: data,
    expiration: expirationTime,
  };

  localStorage.setItem(keyName, JSON.stringify(tokenData));
};

// Function to get JWT from local storage and check expiration
export const getLocalStorage = (keyName: string) => {
  const data = localStorage.getItem(keyName);

  if (!data) return null;

  const localData = JSON.parse(data);
  const currentTime = new Date().getTime();

  if (currentTime > localData.expiration) {
    localStorage.removeItem(keyName);
    return null;
  }

  return localData.data;
};

export const cleanLocalStorage = () => {
  const data = localStorage.clear();
};
