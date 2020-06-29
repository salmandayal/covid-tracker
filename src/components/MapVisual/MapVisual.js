import React, { useState, useEffect } from "react"
import "./MapVisual.css"
import { FaMapMarker } from "react-icons/fa"
import { FaArrowCircleUp } from "react-icons/fa"
//Map stuff
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import axios from "axios"

const MapVisual = props => {
  const [viewport, setViewport] = useState({
    latitude: 30.3308401,
    longitude: 71.247499,
    zoom: 5,
    width: "100vw",
    height: "100vh",
  })

  const [selectedRegion, setSelectedRegion] = useState(null)
  const [countries, setCountries] = useState([])

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

  useEffect(() => {
    axios
      .get("https://www.trackcorona.live/api/countries")
      .then(res => setCountries(res.data.data))
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

  //Back to top button
  const [showScroll, setShowScroll] = useState(false)
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  window.addEventListener("scroll", checkScrollTop)

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
        {countries.map(country => (
          <Marker
            latitude={country.latitude ? country.latitude : 0}
            longitude={country.longitude ? country.longitude : 0}
            key={country.updated}
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
            latitude={selectedRegion.latitude}
            longitude={selectedRegion.longitude}
            onClose={() => setSelectedRegion(null)}
          >
            <div>
              <h3>{selectedRegion.location}</h3>
              <p>Confirmed Cases:{selectedRegion.confirmed}</p>
              <p>Recovered Cases:{selectedRegion.recovered}</p>
              <p>Deaths:{selectedRegion.dead}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
      <FaArrowCircleUp
        className='scrollTop'
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      />
    </div>
  )
}

export default MapVisual
