import {io} from 'socket.io-client';
const socket = io('http://192.168.0.101:3000',{

    transports: ['websocket'],
});
export default socket;