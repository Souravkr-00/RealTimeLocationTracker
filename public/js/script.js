const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
        const {latitude,longitude} = position.coords;
        socket.emit("send-location",{latitude,longitude});
    },
    (err)=>{
        console.log(err);
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    }
    );
}

const map = L.map("map").setView([0,0],16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

const markers = {};

socket.on("receive-location",(data)=>{
    const {id,longitude,latitude} = data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
})