import React, { useState, useEffect } from "react"
import "./MapVisual.css"
import { FaMapMarker } from "react-icons/fa"
//Map stuff
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as countriesData from "../../data/region.json"

const MapVisual = () => {
  const [viewport, setViewport] = useState({
    latitude: 32.427908,
    longitude: 53.688046,
    zoom: 1.5,
    center: [0, 20],
    width: "100vw",
    height: "100vh",
  })

  const [selectedRegion, setSelectedRegion] = useState(null)

  //For escape key binding
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedRegion(null)
      }
    }
    window.addEventListener("keydown", listener)
    //removing key binding after MapVisual rendering ended
    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  //marker color based on confirmed cases
  const getColorFromCount = count => {
    if (count < 10000) {
      return "tomato"
    } else if (count < 50000) {
      return "#ad1c1c"
    }
    return "#800404"
  }

  const mapbox_token =
    "pk.eyJ1Ijoic2FsbWFuZGF5YWwiLCJhIjoiY2tiemVzcG54MTkzZjJ6cDc2bndtaWg2byJ9.voSr5ZNIeuGRTV2Qqu4h3w"

  return (
    <div className='MapContainer'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapbox_token}
        mapStyle='mapbox://styles/salmandayal/ckbzhl5gn414q1io9bkh5cyci'
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {countriesData.countries.map(country => (
          <Marker
            latitude={country.lat ? country.lat : 0}
            longitude={country.long ? country.long : 0}
            key={country.uid}
          >
            <button
              className='Button'
              onClick={e => {
                e.preventDefault()
                setSelectedRegion(country)
              }}
            >
              <FaMapMarker color={getColorFromCount(country.confirmed)} />
            </button>
          </Marker>
        ))}
        {selectedRegion && (
          // to add pop on marker
          <Popup
            latitude={selectedRegion.lat}
            longitude={selectedRegion.long}
            onClose={() => setSelectedRegion(null)}
          >
            <div>
              <h3>{selectedRegion.countryRegion}</h3>
              <p>Confirmed Cases:{selectedRegion.confirmed}</p>
              <p>Recovered Cases:{selectedRegion.recovered}</p>
              <p>Deaths:{selectedRegion.deaths}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default MapVisual
