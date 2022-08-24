import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [username, setUsername] = useState(false);
  const [userid, setUserid] = useState(false);

  const login = useCallback((username, token, expirationDate, userid) => {
    setToken(token);
    setUsername(username);
    setUserid(userid);
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 1930000);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: username,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        userid: userid,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUsername(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() &&
      storedData.userid
    ) {
      login(
        storedData.username,
        storedData.token,
        new Date(storedData.expiration),
        storedData.userid
      );
    }
  }, [login]);

  return { token, login, logout, username, userid };
};
