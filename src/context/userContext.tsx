"use client";
import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// Define the types for state, action, and context
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "LOGOUT";
  payload?: User | string | null;
}

interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Initial state
const initialState: AuthState = {
  user:
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>({
  ...initialState,
  dispatch: () => null,
});

// Reducer function
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload as string,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
