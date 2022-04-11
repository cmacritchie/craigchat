import socketIOClient from "socket.io-client";
// const endPoint = 'http://localhost:5000'
const endPoint = 'http://localhost:5001' //'/api  //change this to make it 'dockerized' 
export default socketIOClient(endPoint);