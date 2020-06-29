import React, { useState, useEffect } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"

const Chart = () => {
  const [dailyData, setDailyData] = useState({})

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData())
    }
    fetchApi()
  }, [])

  return <h1>Charts</h1>
}

export default Chart
