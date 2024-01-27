export const handleSetCookie = (key: string, payload: string, expire: number) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + expire);
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = `${key}=${payload}; ` + expires + "; path=/";
};

export const handleCleanCookie = (key: string) => {
  document.cookie = `${key}=;  path=/`;
};
