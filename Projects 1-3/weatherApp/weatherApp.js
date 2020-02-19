// Variables

let baseURL = "http://api.openweathermap.org/data/2.5/weather?q="
let apiKey = "502a9819b3164849d0a6198f44bdc9ca";
let submitButton = document.getElementById('submit');
let zipcodeInput = document.getElementById('zipcode');


// Helper functions

function monthName(monthNum) {

		let monthList = new Array();
				monthList[0] = "Jan";
				monthList[1] = "Feb";
				monthList[2] = "Mar";
				monthList[3] = "Apr";
				monthList[4] = "May";
				monthList[5] = "Jun";
				monthList[6] = "Jul";
				monthList[7] = "Aug";
				monthList[8] = "Sep";
				monthList[9] = "Oct";
				monthList[10] = "Nov";
				monthList[11] = "Dec";

		let month = monthList[monthNum];
		return month;

}

function convertStamp(timestamp) { 
           
        let date = new Date(timestamp*1000);
        let month = date.getMonth();
        month = monthName(month);
        let day = date.getDay();
        let year = date.getFullYear();

        date = `${month} ${day}, ${year}`;

        return date;
} 

function convertTemp(kelvin) {

	let farenheit = Math.round(((kelvin-273.15)*1.8)+32);
  	return farenheit;
}



// Global functions

const getWeather = async (baseURL, zipcode, key) => {
	
	const response = await fetch(`${baseURL}${zipcode},us&appid=${key}`);

	try {
			const data = await response.json();
			return data;
	}

	catch (error) {
			console.log("error", error);
	}

}


const postData = async (url = '', serverData = {}) => {	

		// Fetch data from URL

		const response = await fetch (url, { 
				method: 'POST',
				credentials: 'same-origin', //  Send user credentials to other wbsite if the URL is on the same origin as the calling script
				headers: {
						'Content-Type': 'application/json'
				},

				// Stringify JSON body data
				
				body: JSON.stringify(serverData),
		});


		try{
				let postResponse = await response.json();
				console.log(postResponse);
				return postResponse;				
		}

		catch(error) {
				console.log("error", error);
		}

}


const updateUI = async () => {

		const request = await fetch('/getData');
		
		try {
				let allData = await request.json();
				let timestamp = allData.date;
				let date = convertStamp(timestamp);
				let kelvin = allData.temperature;
				let temperature = convertTemp(kelvin);
				

				document.getElementById("getWeather").innerHTML = `
				
				<div id="details">
						<div class="flexCol">
								<h2>${temperature}&#176;</h2>
						</div>
						<div class="flexCol" id="moreInfo">
								<h4><span>Location:</span> ${allData.zipcode}</h4>
								<h4><span>Date:</span> ${date}</h4>
						</div>
				</div>
				<p>I think you feel...</p>
				<p>${allData.entry}</p>
				<h4>*${allData.message}</h4>

		`
				
		}
		catch(error) {
				console.log("error",error);
		}

}


// Actions

// Listen for user zipcode submit

submitButton.addEventListener('click', performAction);
zipcodeInput.addEventListener('keypress', function (e){
		if (e.key === 'Enter') {
      			performAction();
    	}
});


// On submit perform these Actions

function performAction(event) {
		
		
		document.getElementById("getWeather").classList.remove("hide");

		const zipcode = document.getElementById('zipcode').value; // Collect zipcode from field
		const feelings = document.getElementById('feelings').value; // Collect zipcode from field
		
		// FETCH data from openweather API via URL; THEN post data to server.js

		let postResponse = getWeather(baseURL, zipcode, apiKey) 
		
		.then(function(data) {
						
				postData('/addData', {temperature: data.main.temp, date: data.dt, zipcode: zipcode, entry: feelings} );
						
		})

		.then(function(data) {

				updateUI();

		 });

}

