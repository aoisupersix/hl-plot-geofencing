const o_std = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

const map = L.map('map', {
    center: [35.627250,139.280955],
    zoom: 16,
    zoomControl: false,
    layers: [o_std]
});

/* 学内領域 */
// 体育寮付近
const fence1 = L.circle([35.63123,139.28226], 100,{
    color: '#FF0000',
    weight: 1,
    opacity: 0.8,
    fillColor: '#FF0000',
    fillOpacity: 0.3
}).addTo(map);
// グラウンド・A館付近
const fence2 = L.circle([35.62977,139.28065], 170,{
  color: '#FF0000',
  weight: 1,
  opacity: 0.8,
  fillColor: '#FF0000',
  fillOpacity: 0.3
}).addTo(map);
// 工学部棟付近
const fence3 = L.circle([35.62561,139.27954], 370,{
  color: '#FF0000',
  weight: 1,
  opacity: 0.8,
  fillColor: '#FF0000',
  fillOpacity: 0.3
}).addTo(map);

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://script.google.com/macros/s/AKfycbyJ9tQsEQd3vSkEtSsc0b_J28VDYbIZs6D4N_X234aYWFUUuIA/exec", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      data.forEach(d => {
        const lat = parseFloat(d.緯度);
        const lng = parseFloat(d.経度);
        const color = d.種別 === "侵入" ? "#0000FF": "#000000";
        L.circle([lat,lng], 16,{
          weight: 0,
          opacity: 0.8,
          fillColor: color,
          fillOpacity: 1
        }).addTo(map);
      });
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);