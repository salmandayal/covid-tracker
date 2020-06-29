import React, { Component } from "react"
import { Cards, Chart, MapVisual } from "./components"
import "./App.css"
import { fetchData } from "./api"

export default class App extends Component {
  state = {
    data: {},
  }

  async componentDidMount() {
    const fetchedData = await fetchData()
    this.setState({ data: fetchedData })
  }

  render() {
    const { data } = this.state
    return (
      <div className='container'>
        <div className='stats'>
          <Cards data={data} />
          <Chart />
        </div>
        <div className='mapbox'>
          <MapVisual />
        </div>
      </div>
    )
  }
}
