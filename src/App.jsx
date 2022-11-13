import {React, useState} from 'react'
import './App.css'
import { MapContainer, TileLayer,  GeoJSON, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { states } from "./states"
import { popups } from "./popups"
import  bridgeLogo  from './images/bridge.png'
import  concreteLogo  from './images/concrete.png'
import  consultingLogo  from './images/consulting.png'
import  utilityLogo  from './images/utility.png'
import  pavementLogo  from './images/pavement.png'
import Logo from './images/logo-infrasense-300x200.png'

const mapIcon = new L.icon({
  iconUrl: require("./images/marker.png"),
  iconSize: [20, 20]
});

function App() {
  const [ activePopup, setActivePopup ] = useState( null );

 

  const mapPolygonColorToDensity=(density => {
    return density > 100
        ? '#a50f15'
        : density > 50
        ? '#de2d26'
        : density > 25
        ? '#fb6a4a'
        : density > 5
        ? '#fc9272'
        : density > 0
        ? '#fcbba1'
        : '#fee5d9';
    })
 
  const style = (feature => {
      var index = popups.findIndex(obj => obj.State === feature.properties.NAME);
      // console.log(popups[index].Population)

    return ({
        fillColor: mapPolygonColorToDensity(popups[index].ProjectTotal),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.5
    });
  });

  // const GetGraph = (props) => {
  //   console.log(graphMap[props.active.State])
  //   return graphMap[props.active.State]
  // }
  return (
    <div>
      <div className='logo'>
        <img src={Logo} style={{width: 100,}} alt='alt' />
      </div>
      <div className="legend font-bold text-center text-[#d3d3d3] flex flex-col items-center">
            <div className='text-[20px]'>LEGEND</div>(Number of Projects)
            <div className='border-4 border-[#a50f15] w-[50%] mt-2'> {'>'} 100 </div>
            <div className='border-4 border-[#de2d26] w-[50%]' >50 - 99 </div>
            <div className='border-4 border-[#fb6a4a] w-[50%]'> 25 - 49 </div>
            <div className='border-4 border-[#fc9272] w-[50%]'> 5 - 24 </div>
            <div className='border-4 border-[#fcbba1] w-[50%]'> 1 - 4 </div>
            <div className='border-4 border-[#fee5d9] w-[50%]'> ZERO </div>
      </div>
      <MapContainer center = { [ 38, -97 ] } zoom = { 3.5 } scrollWheelZoom = { true }>
      {states && (<GeoJSON data={states} style={style}/>)}  
      <TileLayer url = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"/>

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
          <div >
            <div className='flex justify-center '>
            <h1 className='text-xl font-bold border-b-2 border-[#de2d26] w-fit font-serif'>{ activePopup.State }</h1>
            </div>
            <div className='text-[14px] flex items-center pt-2'>Total Number of Projects:&nbsp;<section className='font-bold'> { activePopup.ProjectTotal }&nbsp;</section> projects</div>
            <div className='text-[14px] flex items-center'>Bridge Deck Area Inspected:&nbsp;<section className='font-bold'> { activePopup.BridgeDeckArea.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) }&nbsp;</section> sqft</div>
            <div className='text-[14px] flex items-center'>Roadway Distance Inspected:&nbsp;<section className='font-bold'> { activePopup.PavementDistance.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) }&nbsp;</section> miles</div>
            {/* <div className='text-[14px]'>&nbsp;&nbsp; Infrasense has inspected over { activePopup.BridgeDeckArea.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) } sqft of bridge 
            deck and over { activePopup.PavementDistance.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) } miles of paved roadway in state of { activePopup.State }</div> */}

            {activePopup && (
            
            <div>
              <p className='text-[15px] font-bold h-fit pt-2'>Project Distribution:</p>
              <div className='flex justify-around font-bold text-center space-x-2'>
              <div className='flex flex-col items-center'><section className='text-[14px]'>{activePopup.BridgeDeckScanning} </section>
              <a href='https://infrasense.com/bridge-deck-scanning/'><img className="min-w-[55px] h-[35px] rounded-sm hover:border-[#de2d26] hover:border-2 hover:opacity-85" alt='img' src={bridgeLogo}></img></a>Bridges</div>
              <div className='flex flex-col items-center'><section className='text-[14px]'>{activePopup.PavementStructureEvaluation}</section>
              <a href='https://infrasense.com/pavement-structure-evaluation/'><img className="min-w-[55px] h-[35px] rounded-sm hover:border-[#de2d26] hover:border-2 hover:opacity-85" alt='img' src={pavementLogo}></img></a>Pavement Structures</div>
              <div className='flex flex-col items-center'><section className='text-[14px]'>{activePopup.SubsurfaceUtilityEngineering}</section>
              <a href='https://infrasense.com/services/utility-locating-mapping/'><img className="min-w-[55px] h-[35px] rounded-sm hover:border-[#de2d26] hover:border-2 hover:opacity-85 " alt='img' src={utilityLogo}></img></a>Utilities</div>
              <div className='flex flex-col items-center'><section className='text-[14px]'>{activePopup.ConcreteStructureScanning}</section>
              <a href='https://infrasense.com/services/concrete-structure-scanning/'><img className="min-w-[55px] h-[35px] rounded-sm hover:border-[#de2d26] hover:border-2 hover:opacity-85" alt='img' src={concreteLogo}></img></a>Concrete Structures</div>
              <div className='flex flex-col items-center'><section className='text-[14px]'>{activePopup.ConsultingResearch}</section>
              <a href='https://infrasense.com/services/consulting-research/'><img className="min-w-[55px] h-[35px] rounded-sm hover:border-[#de2d26] hover:border-2 hover:opacity-85" alt='img' src={consultingLogo}></img></a>Research</div>
              
              
              </div>
              <div className='pt-2 text-[13px] font-style: italic'>Other Projects: {activePopup.OtherProjects}</div>
            </div>
            )}
          </div>
        </Popup>
      )} 
      </MapContainer>
      
    </div>
  );
}

export default App;



