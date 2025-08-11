const socket = io();
const map = L.map("map").setView([0, 0], 10);

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("locationUpdate", { latitude, longitude });
    },
    (error) => {
      console.error("Error watching position:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "TrackMe",
}).addTo(map);

const markers = {};

socket.on("locationUpdate", (data) => {
  const { id, latitude, longitude } = data;

  map.setView([latitude, longitude]);

  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]); // update existing marker
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map); // add new marker
  }
});

socket.on("userDisconnected", (data) => {
  const { id } = data;

  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
