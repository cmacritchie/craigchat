import socketIOClient from "socket.io-client";
const endPoint = 'http://localhost:5000'
export default socketIOClient(endPoint);