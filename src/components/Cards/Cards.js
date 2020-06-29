import React from "react"
import "./Cards.css"
import CountUp from "react-countup"
import { FaBed, FaMedkit, FaUserCircle } from "react-icons/fa"

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return <div className='lds-hourglass'></div>
  }
  return (
    <div className='cards_container'>
      {/* confirmed case */}
      <div className='card'>
        <div className='layer'></div>
        <div className='content'>
          <div className='image'>
            <FaBed />
          </div>
          <p>Confirmed Cases</p>
          <div className='details'>
            <h2>
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=','
              />
            </h2>
          </div>
        </div>
      </div>

      {/* recovered */}
      <div className='card'>
        <div className='layer'></div>
        <div className='content'>
          <div className='image'>
            <FaMedkit />
          </div>
          <p>Recovered</p>
          <div className='details'>
            <h2>
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=','
              />
            </h2>
          </div>
        </div>
      </div>

      {/* deaths */}
      <div className='card'>
        <div className='layer'></div>
        <div className='content'>
          <div className='image'>
            <FaUserCircle />
          </div>
          <p>Deaths</p>
          <div className='details'>
            <h2>
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=','
              />
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
