// Script to retrieve the Latitude and Longitude of a iTour data file
// To run, type 'node LatLng.js input_file_name' in terminal
// Process runs *synchronuously*

const inputFilename = process.argv[2];
const outputFilename = process.argv[2];

let jsonSource = require('../' + inputFilename);
const fs = require('fs');
const colors = require('colors');
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.ITOUR_GOOGLE_GEOCODE_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);
console.log(process.env.ITOUR_GOOGLE_GEOCODE_API_KEY);

console.log(
  '\n\nFile: '.black.bgWhite +
    process.argv[2].black.bgWhite +
    '\n'.black.bgWhite
);

// 1st create backup copy
fs.writeFileSync('../bkp/' + inputFilename, JSON.stringify(jsonSource));

var processItems = function(i) {
  if (i < jsonSource.length) {
    let event = jsonSource[i];
    let searchString =
      event.venue +
      '+' +
      event.address +
      ',+' +
      event.city +
      ',+' +
      event.state +
      '+' +
      event.postal +
      '+' +
      event.country;

    // console.log(searchString);
    if (
      (event.hasOwnProperty('lat') || event.lat == 0) &&
      event.hasOwnProperty('lng') &&
      event.hasOwnProperty('confidence') &&
      event.confidence > 0.5
    ) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems(i + 1);
    } else {
      geocoder.geocode(searchString).then(function(response) {
        if (typeof response[0] === 'undefined') {
          console.log(
            event.showID +
              ' ' +
              'WARNING '.black.bgYellow +
              event.venue.black.bgYellow +
              ' NOT FOUND in 1st pass '.black.bgYellow
          );
        } else {
          event.lat = JSON.stringify(response[0].latitude);
          event.lng = JSON.stringify(response[0].longitude);
          event.confidence = JSON.stringify(response[0].extra.confidence);
          console.log(
            event.showID +
              ' Success! '.green +
              event.venue.green +
              ' ('.green +
              event.lat.green +
              ','.green +
              event.lng.green +
              ')'.green +
              ' Confidence: '.green +
              event.confidence.green
          );
        }
        // console.log(
        //   event.showID +
        //     ' ' +
        //     event.venue +
        //     ' (' +
        //     event.lat +
        //     ',' +
        //     event.lng +
        //     ')'
        //   //  +
        //   // ' confidence: ' +
        //   // JSON.stringify(response[0].extra.confidence)
        // );
        processItems(i + 1);
        // jsonSource[i].lat = event.lat;
        // processItems(i + 1);
      });
    }
  } else {
    console.log('\n\nEnd 1 Pass\n'.white.bgBlue);
    console.log('\n\nStart 2nd Pass\n'.white.bgMagenta);
    // console.log(JSON.stringify(jsonSource));
    // fs.writeFileSync('iTour_PEARLJAM_data-2.json', JSON.stringify(jsonSource));
    processItems2(0);
  }
};

var processItems2 = function(i) {
  if (i < jsonSource.length) {
    // for (var i in jsonSource) {
    let event = jsonSource[i];
    let searchString =
      event.address +
      ',+' +
      event.city +
      ',+' +
      event.state +
      '+' +
      event.postal +
      '+' +
      event.country;

    // console.log(searchString);
    if (
      (event.hasOwnProperty('lat') || event.lat == 0) &&
      event.hasOwnProperty('lng') &&
      event.hasOwnProperty('confidence') &&
      event.confidence > 0.5
    ) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems2(i + 1);
    } else {
      geocoder
        .geocode(searchString)
        // function(response) {
        .then(function(response) {
          if (typeof response[0] === 'undefined') {
            console.log(
              ' ERROR '.white.bgRed +
                event.white.bgRed +
                ' NOT FOUND in 2nd pass '.white.bgRed
            );
          } else {
            event.lat = JSON.stringify(response[0].latitude);
            event.lng = JSON.stringify(response[0].longitude);
            event.confidence = JSON.stringify(response[0].extra.confidence);
            console.log(
              event.showID +
                ' Success! '.green +
                event.venue.green +
                ' ('.green +
                event.lat.green +
                ','.green +
                event.lng.green +
                ')'.green +
                ' Confidence: '.green +
                event.confidence.green
            );
          }
          // console.log(
          //   event.showID +
          //     ' ' +
          //     event.venue +
          //     ' (' +
          //     event.lat +
          //     ',' +
          //     event.lng +
          //     ')'
          //   //  +
          //   // ' confidence: ' +
          //   // JSON.stringify(response[0].extra.confidence)
          // );
          processItems2(i + 1);
          // jsonSource[i].lat = event.lat;
          // processItems(i + 1);
        });
    }
  } else {
    console.log('\n\nEnd 2nd Pass\n'.white.bgMagenta);
    // console.log(JSON.stringify(jsonSource));
    fs.writeFileSync('../' + outputFilename, JSON.stringify(jsonSource));
    console.log('fin');
  }
};
console.log('\n\nStart 1st Pass\n'.white.bgBlue);
processItems(0);
