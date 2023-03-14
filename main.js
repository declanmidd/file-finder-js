const request = require('request');
const fs = require('fs');

// Set the base URL of the site
const baseUrl = 'http://example.com';

// Set the list of directories to check
const directories = [
  '/admin',
  '/login',
  '/secret',
  '/hidden'
];

// Set the list of file extensions to check
const extensions = [
  '.php',
  '.html',
  '.asp',
  '.aspx'
];

// Set the list of status codes to consider a "successful" request
const successCodes = [200, 201, 202, 203, 204, 205, 206];

// Set the timeout for the requests (in milliseconds)
const timeout = 5000;

// Set the output file
const outputFile = 'found.txt';

// Initialize the list of found URLs
let found = [];

// Set up a function to make requests and check the status code
function checkUrl(url) {
  request({
    url: url,
    timeout: timeout
  }, function(error, response, body) {
    if (!error && successCodes.includes(response.statusCode)) {
      // If the request is successful, add the URL to the list
      found.push(url);
    }
  });
}

// Set up a function to check all combinations of directories and 
extensions
function checkAll() {
  // Loop through the directories
  for (let i = 0; i < directories.length; i++) {
    // Loop through the extensions
    for (let j = 0; j < extensions.length; j++) {
      // Construct the full URL
      let url = baseUrl + directories[i] + extensions[j];
      // Make a request to the URL
      checkUrl(url);
    }
  }
}

// Check all combinations of directories and extensions
checkAll();

// Wait for the requests to finish
setTimeout(function() {
  // Write the found URLs to the output file
  fs.writeFileSync(outputFile, found.join('\n'));
  console.log('Done!');
}, timeout + 1000);

