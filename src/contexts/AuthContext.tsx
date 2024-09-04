import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import { LoginResponseDto } from "domain/dtos/auth.dto";
import { refreshToken } from "services/authService";
import { callForApiClient } from "services/apiClient";

interface AuthContextData {
  isAuthenticated: boolean;
  token: string | null;
  authUser: LoginResponseDto | null;
  login: (authUser: LoginResponseDto) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<LoginResponseDto | null>(null);

  useEffect(() => {
    const attToken = async () => {
      try {
        const response = await refreshToken();
        setAuthUser(response);
        if (response) setLoginCookie(response.token);
        else logout();
      } catch (error) {
        console.error(error);
      }
    };

    const { token: savedToken } = parseCookies();
    if (savedToken) {
      attToken();
      setToken(savedToken);
    }
  }, []);

  const login = (authUserReq: LoginResponseDto) => {
    setAuthUser(authUserReq);
    setLoginCookie(authUserReq.token);
  };

  const setLoginCookie = (token: string) => {
    setToken(token);
    setCookie(null, "token", token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    callForApiClient.jsonService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);
    destroyCookie(null, "token");
    delete callForApiClient.jsonService.defaults.headers.common[
      "Authorization"
    ];
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, authUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
