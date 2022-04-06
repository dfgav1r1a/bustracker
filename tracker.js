
//getting the token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGZnYXZpcmlhIiwiYSI6ImNsMWt0dWswajAzajMzY240Z2Ywb3FkdmUifQ.pQ7WUrdkispo_DLNcaEfDg';

//creating the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-71.0588801, 42.3600825],
    zoom: 10
});

 //this function will pull the getBusLocation, log a date and the locations and will be run every 15 seconds
 async function run() {
    const locations = await getBusLocation(); 
    console.log(new Date());
    console.log(locations);

    const locationUpdate = [] ;
    const vehicle = locations[2]; 
    
    let longitude = vehicle.attributes.longitude;
    let latitude = vehicle.attributes.latitude;
    locationUpdate.push(longitude, latitude);

    //creating the marker
    let marker = new mapboxgl.Marker()
    .setLngLat(locationUpdate)
    .addTo(map);
    console.log(locationUpdate);

    //creating the timer to call run
    setTimeout(run, 15000);
 }

//this async function is fetching the url
async function getBusLocation() {
  const url = 'https://api-v3.mbta.com/vehicles?page%5Blimit%5D=10'
  const response = await fetch(url); //waiting until the fetch is done
  const json = await response.json() //making sure the json data is fetched
  return json.data; 
}



