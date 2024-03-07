import axios from "axios"

export default async function CalcularRota(ceps: Array<string>) {
  let coords: Array<Array<string>> = []


  
  const res = await axios({
    method: 'post',
    url: 'https://api.openrouteservice.org/v2/directions/driving-car/json',
    headers: {
      'Authorization': '5b3ce3597851110001cf62484a3d16c943644572a76382940ddcbdbd',
      'Content-Type': 'application/json1'
    },
    data: {
      'coordinates': coords
    }
  })

  return 0
}
