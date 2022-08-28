import {React, useState} from 'react'
import './App.css'
import { MapContainer, TileLayer,  GeoJSON, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import * as states from "./states.json"
import { popups } from "./popups"
import Logo from './images/logo-infrasense-300x200.png'


const mapIcon = new L.icon({
  iconUrl: require("./images/marker.png"),
  iconSize: [20, 20]
});


function App() {
  const [ activePopup, setActivePopup ] = useState( null );

  const mapPolygonColorToDensity=(density => {
    return density > 600000
        ? '#a50f15'
        : density > 200000
        ? '#de2d26'
        : density > 100000
        ? '#fb6a4a'
        : density > 50000
        ? '#fc9272'
        : density > 20000
        ? '#fcbba1'
        : '#fee5d9';
    })
  const style = (feature => {
    return ({
        fillColor: mapPolygonColorToDensity(feature.properties.CENSUSAREA),
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


// import { Icon } from 'leaflet'
// import covidData from './data.json'
// import icon1 from './images/covid19.svg'

// const covidIcon = new Icon({
//   iconUrl: icon1,
//   iconSize: [25, 25]
// })