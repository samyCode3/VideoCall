const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
console.log(myPeer)

const myVideo = document = document.createElement('video')
const peering = {}
myVideo.muted = true
navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(stream => {
   addVideoStream(myVideo, stream)
   myPeer.on('call', call => {
    call.answer(stream) 
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
   })
   socket.on('user-conneted', userId => {
    connectToNewUser(userId, stream)
   })
})
socket.on('user-disconnected', userId => {
    if(peering[userId]) peering[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) 
{
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('close', () => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
    peering[userId] = call
}

socket.on('user-connected', userId => {
    console.log('user-connected: ' + userId);
    
})

function addVideoStream(video, stream)
{
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play() 
    })
    videoGrid.append(video)
}