"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContextProvider = exports.AuthContext = void 0;
var react_1 = require("react");
// Initial state
var initialState = {
    user: typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("user") || "null"),
    loading: false,
    error: null,
};
exports.AuthContext = (0, react_1.createContext)(__assign(__assign({}, initialState), { dispatch: function () { return null; } }));
// Reducer function
var AuthReducer = function (state, action) {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
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
var AuthContextProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(AuthReducer, initialState), state = _b[0], dispatch = _b[1];
    (0, react_1.useEffect)(function () {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
    return (<exports.AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch: dispatch,
        }}>
      {children}
    </exports.AuthContext.Provider>);
};
exports.AuthContextProvider = AuthContextProvider;
