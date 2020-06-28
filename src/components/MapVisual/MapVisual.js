import React, { useState, useEffect } from "react"
import styles from "./MapVisual.module.css"
import { FaMapMarker } from "react-icons/fa"
//Map stuff
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as countriesData from "../../data/temp.json"

const MapVisual = () => {
  const [viewport, setViewport] = useState({
    latitude: 32.427908,
    longitude: 53.688046,
    zoom: 5,
    width: "100vw",
    height: "100vh",
  })

  const [selectedRegion, setSelectedRegion] = useState(null)

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

  const mapbox_token =
    "pk.eyJ1Ijoic2FsbWFuZGF5YWwiLCJhIjoiY2tiemVzcG54MTkzZjJ6cDc2bndtaWg2byJ9.voSr5ZNIeuGRTV2Qqu4h3w"

  return (
    <div className={styles.MapContainer}>
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
              className={styles.Button}
              onClick={e => {
                e.preventDefault()
                setSelectedRegion(country)
              }}
            >
              <FaMapMarker color='red' />
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
            <h3>{selectedRegion.countryRegion}</h3>
            <p>Confirmed Cases:{selectedRegion.confirmed}</p>
            <p>Recovered Cases:{selectedRegion.recovered}</p>
            <p>Deaths:{selectedRegion.deaths}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default MapVisual
