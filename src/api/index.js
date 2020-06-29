import axios from "axios"

// const locApi = "https://www.trackcorona.live/api/countries"
const url = "https://covid19.mathdro.id/api"
export const fetchData = async () => {
  const { data } = await axios.get(url)

  return data
}
