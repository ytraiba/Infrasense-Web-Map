import {React, useState} from 'react'
import './App.css'
import { MapContainer, TileLayer,  GeoJSON, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { states } from "./states"
import { popups } from "./popups"
import Logo from './images/logo-infrasense-300x200.png'

const mapIcon = new L.icon({
  iconUrl: require("./images/marker.png"),
  iconSize: [20, 20]
});

// const states_index = { Alabama: 1,
//   'Alaska': 2,
//   'Arizona': 3,
//   'Arkansas': 4,
//   'California': 5,
//   'Colorado': 6,
//   'Connecticut': 7,
//   'Delaware': 8,
//   'Florida': 9,
//   'Georgia': 10,
//   'Hawaii': 11,
//   'Idaho': 12,
//   'Illinois': 13,
//   'Indiana': 14,
//   'Iowa': 15,
//   'Kansas': 16,
//   'Kentucky': 17,
//   'Louisiana': 18,
//   'Maine': 19,
//   'Maryland': 20,
//   'Massachusetts': 21,
//   'Michigan': 22,
//   'Minnesota': 23,
//   'Mississippi': 24,
//   'Missouri': 25,
//   'Montana': 26,
//   'Nebraska': 27,
//   'Nevada': 28,
//   'New Hampshire': 29,
//   'New Jersey': 30,
//   'New Mexico': 31,
//   'New York': 32,
//   'North Carolina': 33,
//   'North Dakota': 34,
//   'Ohio': 35,
//   'Oklahoma': 36,
//   'Oregon': 37,
//   'Pennsylvania': 38,
//   'Rhode Island': 39,
//   'South Carolina': 40,
//   'South Dakota': 41,
//   'Tennessee': 42,
//   'Texas': 43,
//   'Utah': 44,
//   'Vermont': 45,
//   'Virginia': 46,
//   'Washington': 47,
//   'West Virginia': 48,
//   'Wisconsin': 49,
//   'Wyoming': 50,
//   'Puerto Rico': 51,
//   'District of Columbia': 52,
// }

function App() {
  const [ activePopup, setActivePopup ] = useState( null );

  const mapPolygonColorToDensity=(density => {
    return density > 3000000
        ? '#a50f15'
        : density > 2000000
        ? '#de2d26'
        : density > 1000000
        ? '#fb6a4a'
        : density > 500000
        ? '#fc9272'
        : density > 100000
        ? '#fcbba1'
        : '#fee5d9';
    })
  
  
  const style = (feature => {
      var index = popups.findIndex(obj => obj.State === feature.properties.NAME);
      // console.log(popups[index].Population)

    return ({
        fillColor: mapPolygonColorToDensity(popups[index].Population),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.5
    });
  });

  return (
    <div>
      <div className='logo'><img src={Logo} style={{width: 200,}} alt='alt' /></div>
      <MapContainer center = { [ 38, -97 ] } zoom = { 4.5 } scrollWheelZoom = { true }>
      {states && (<GeoJSON data={states} style={style}/>)}  
      <TileLayer attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

       {popups.map(eachData => (
         <Marker 
            key={eachData.State} 
            position= {[eachData.Lat, eachData.Long]}
            eventHandlers={{
              click: () => {
                setActivePopup(eachData)
              }
            }}
            icon= { mapIcon }
          />
       ))}
       

      { activePopup && (
        <Popup 
          position={ [ activePopup.Lat, activePopup.Long ] }
          onClose={()=>{
            setActivePopup(null)
          }}
        >
          <div>
            <h1>{ activePopup.State }</h1>
            <p>Types of Projects: Bridge, Roadway, Consulting</p>
            <p>Distance Covered: 1,000,000 miles</p>

          </div>
        </Popup>
      )} 
      
      </MapContainer>
    </div>  
  );
}

export default App;
