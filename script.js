let missiles;

const addMissile = () => {
    const missile = missiles.shift();
    if (missile != undefined) {
        publishMessage(missile)
        const misslesOnAirDiv = document.getElementById("missilesOnAir-div")
        addMissileToList(missile.name, misslesOnAirDiv)
    }
    
     
}


const loadMissilesJson = async() => {
    const response = await fetch('/missiles.json');
    missiles = await response.json();
    const misslesDiv = document.getElementById("missiles-div")
    for (const missile of missiles) {
        addMissileToList(missile.name, misslesDiv)
    }
}
loadMissilesJson()

const addMissileToList = (missile, misslesDiv) => {
    const li = document.createElement("li")
    li.innerText = missile;
    misslesDiv.appendChild(li)
}

const socket = new WebSocket('ws://localhost:3108/MissileHandler');


const publishMessage = (missile) => {
  socket.send(JSON.stringify(missile));
}

setTimeout(function(){addMissile()}, 1000);

// Handle messages from the backend
socket.onmessage = (event) => {
    console.log('got message', JSON.stringify(event.data));
    const jsonString = JSON.stringify(event.data);
    const message = JSON.parse(jsonString);
    if (message.includes(true)){
        const missileSecceedDiv = document.getElementById("missileSecceed-div")
        addMissileToList(message, missileSecceedDiv)
    } else {
        const missilesFallDiv = document.getElementById("missilesFall-div")
        addMissileToList(message, missilesFallDiv)
    }
    
}