import React, { Component } from "react"
import { Cards, Chart, CountryPicker, MapVisual } from "./components"
import styles from "./App.module.css"
import { fetchData } from "./api"

export default class App extends Component {
  async componentDidMount() {
    const data = await fetchData()
  }

  render() {
    return (
      <div className={styles.Container}>
        <MapVisual />
      </div>
    )
  }
}
