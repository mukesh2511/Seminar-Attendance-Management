"use strict";
"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var socket;
var Home = function () {
    var _a = (0, react_1.useState)(""), message = _a[0], setMessage = _a[1];
    var _b = (0, react_1.useState)([]), chat = _b[0], setChat = _b[1];
    (0, react_1.useEffect)(function () {
        // Connect to the Socket.IO server
        socket = (0, socket_io_client_1.default)();
        socket.on("message", function (data) {
            setChat(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data], false); });
        });
        return function () {
            socket.disconnect();
        };
    }, []);
    var sendMessage = function () {
        socket.emit("message", message);
        setMessage("");
    };
    return (<div>
      <h1>Socket.IO Chat</h1>
      <input type="text" value={message} onChange={function (e) { return setMessage(e.target.value); }}/>
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {chat.map(function (msg, index) { return (<li key={index}>{msg}</li>); })}
        </ul>
      </div>
    </div>);
};
exports.default = Home;
