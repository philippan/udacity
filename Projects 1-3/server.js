// Get a server: Install node - npm install

// Get simplified server: Install express - npm install express --save

// Hookup express

const express = require('express');

const app = express();

// Enable parsing HTTP POSTS: Install body-parser - npm install body-parser

// Hookup bodyParser to express

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse using JSON. POST content must match body type.

// Enable website-website communication on top of XMLHttpRequest object: npm install cors --save

// Hookup cors

const cors = require('cors');

app.use (cors());


 // Indicate the main project folder

 app.use(express.static('weatherApp'));

 
 // Hookup server to the browser console

const port = 1234;
const server = app.listen(port, gotServed);

// Callback function in listener confirming successful hookup


function gotServed () {

		console.log(`you got served on localhost: ${port}`);
}

// Test in console: node server.js


// Empty object as an endpoint for all routes

const projectData = {
		message: "Now aren't you glad that you subscribe to Google Weather instead of Amazon Weather?"	
};


// GET route to enable getting ALL projectData

app.get ('/getData', sendData);

function sendData (request, response) {
		console.log(projectData);
		let returnedTarget = Object.assign(projectData,newData[0]);
		console.log(returnedTarget);
		response.send(returnedTarget);
}


// POST route to enable adding to newData

const newData = [];

app.post ('/addData', addData);

function addData (request, response) {
		newData.unshift(request.body);
		response.send(newData[0]);
}