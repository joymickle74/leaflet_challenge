let map = L.map("map", {
    center: [0, -40],
    zoom: 3
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(data=>{

    console.log(data.features[100].properties.place);
    L.geoJSON(data, {
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
        },
        style: function ({geometry:{coordinates:coord},properties:{mag}}) {
            return {
                fillOpacity: .75,
                color: 'black',
                radius: mag*3,
                weight: 1,
                fillColor: 
                    coord[2]>90 ? 'red' : 
                    coord[2]>70 ? 'orange' : 
                    coord[2]>50 ? 'peach' : 
                    coord[2]>30 ? 'yellow' : 
                    coord[2]>10 ? 'lime' : 'green',
            };
        }
    }).bindPopup(function ({feature:{properties:{place,mag}}}) {
        return `<h2>${place}<br>Magnitude: ${mag}</h2>`;
    }).addTo(map);
  });

  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");


    // Add the minimum and maximum.
    let legendInfo = `
    <div style="background:green"> <10 </di>
    <div style="background: lime"> <20 </di>
    <div style="background: yellow"> <30 </di>
    <div style="background: peach"> <50 </di>
    <div style="background: orange"> <70 </di>
    <div style="background: red"> <90 </di>
    `;

    div.innerHTML = legendInfo;

    return div;
  };

  // Adding the legend to the map
  legend.addTo(map);


