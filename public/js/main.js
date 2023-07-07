const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_degree = document.getElementById('temp_degree');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const realDay = document.getElementById('day');
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const realMonth = document.getElementById('today_date');
  const humidity = document.getElementById('humidity');
  const status = document.getElementById('status');
  const visibility = document.getElementById('visibility');
const d = new Date();
let day = weekday[d.getDay()];
realDay.innerHTML=day;
let name = month[d.getMonth()];
let realDate = d.getDate();
realMonth.innerHTML=`${realDate}  ${name}`;

const getInfo = async(event)=>{
	event.preventDefault();
	let cityVal = cityName.value;
if(cityVal === ""){
city_name.innerText = `Please enter a city name!`;
datahide.classList.add('data_hide');
}
else{
	try{
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=e5a7140ebfdb839c552aa969f418a10c&units=metric`
	const response = await fetch(url);
	const data = await response.json();
	// console.log(data);
	datahide.classList.remove('data_hide');
	const arrData = [data];
city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
temp_degree.innerText = arrData[0].main.temp;
temp_status.innerText = arrData[0].weather[0].main;
humidity.innerText = `Humidity : ${arrData[0].main.humidity}%`;
const tempMood = temp_status.innerText;
status.innerText = `Weather Status : ${arrData[0].weather[0].description}`;
visibility.innerText = `Visibility : ${(arrData[0].visibility)/1000} KM`
console.log(tempMood);
if (tempMood ==="Clear") {
	temp_status.innerHTML=
	"<img class='pic' src='./images/sun.png'>";
}
else if (tempMood === "Clouds"){
	temp_status.innerHTML =
		" <img class='pic' src='./images/clouds.png'>";
}
else if (tempMood === "Rain"){
	temp_status.innerHTML =
		" <img class='pic' src='./images/rain.png'>";
}
else{
	temp_status.innerHTML =
		"<img class='pic' src='./images/sun.png'>";
}




}catch{
	city_name.innerText = `Please enter a city name properly!`;
	datahide.classList.add('data_hide');

}

}
}
submitBtn.addEventListener('click', getInfo);