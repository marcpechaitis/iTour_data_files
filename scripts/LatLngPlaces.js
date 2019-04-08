// Script to retrieve the Latitude and Longitude of a iTour data file
// To run, type 'node LatLngPlaces.js input_file_name' in terminal
// Process runs *synchronuously*
const inputFilename = process.argv[2];
const outputFilename = process.argv[2];

const jsonSource = require(`../${inputFilename}`);
const fs = require('fs');
const colors = require('colors');
const NodeGeocoder = require('node-geocoder');
const GooglePlaces = require('googleplaces');
const googlePlaces = new GooglePlaces(
  process.env.ITOUR_GOOGLE_GEOCODE_API_KEY,
  'json'
);
let googlePlacesParameters = {};
let venue;

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
fs.writeFileSync(
  '../bkp/' +
    inputFilename.replace('.json', '') +
    '_LatLngPlaces_' +
    new Date().getTime() +
    '.json',
  JSON.stringify(jsonSource)
);
function handleErrors(error) {
  console.error('Something went wrong ', error);
}

var processItems = function(i) {
  if (i < jsonSource.length) {
    // for (var i in jsonSource) {
    const event = jsonSource[i];

    if (
      (event.hasOwnProperty('lat') || event.lat != 0) &&
      (event.hasOwnProperty('lng') || event.lng != 0) &&
      (event.hasOwnProperty('confidence') && event.confidence > 0.5)
    ) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems(i + 1);
    } else {
      const searchString = `${event.venue}+${event.address},+${event.city},+${
        event.state
      }+${event.postal}+${event.country}`;

      geocoder.geocode(searchString).then(response => {
        if (typeof response[0] === 'undefined') {
          console.log(
            `${event.showID} ${'WARNING '.black.bgYellow}${
              event.venue.black.bgYellow
            }${' NOT FOUND in 1st pass '.black.bgYellow}`
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
        processItems(i + 1);
      });
    }
  } else {
    console.log('\n\nEnd 1 Pass LatLng\n'.white.bgBlue);
    console.log('\n\nStart 2nd Pass LatLng\n'.white.bgMagenta);
    processItems2ndPass(0);
  }
};

var processItems2ndPass = function(i) {
  if (i < jsonSource.length) {
    const event = jsonSource[i];
    const searchString = `${event.address},+${event.city},+${event.state}+${
      event.postal
    }+${event.country}`;

    if (
      (event.hasOwnProperty('lat') || event.lat != 0) &&
      (event.hasOwnProperty('lng') || event.lng != 0) &&
      (event.hasOwnProperty('confidence') && event.confidence > 0.5)
    ) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems2ndPass(i + 1);
    } else {
      geocoder.geocode(searchString).then(response => {
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
        processItems2ndPass(i + 1);
      });
    }
  } else {
    console.log('\n\nEnd 2nd Pass\n'.white.bgMagenta);
    // fs.writeFileSync('../' + outputFilename, JSON.stringify(jsonSource));
    console.log('\n\nStart Places Photo Pass\n'.white.bgMagenta);
    placesItemsPlacesPhotoURL(0);
  }
};

var placesItemsPlacesPhotoURL = function(i) {
  if (i < jsonSource.length) {
    const event = jsonSource[i];
    const searchString = `${event.address},+${event.city},+${event.state}+${
      event.postal
    }+${event.country}`;

    if (
      (event.hasOwnProperty('lat') || event.lat != 0) &&
      (event.hasOwnProperty('lng') || event.lng != 0) &&
      (event.hasOwnProperty('confidence') && event.confidence > 0.5)
    ) {
      if (
        typeof event.placesPhotoReference === 'undefined' ||
        event.placesPhotoReference === '' ||
        event.placesPhotoReference === ' '
      ) {
        console.log(
          event.showID +
            ' Generating Places Photo URL: '.blue +
            event.venue.white
        );
        // venue = event.venue;
        googlePlacesParameters = {
          location: [event.lat, event.lng],
          keyword: event.venue,
        };
        console.log(JSON.stringify(googlePlacesParameters));

        googlePlaces.placeSearch(googlePlacesParameters, async function(
          // googlePlaces.nearBySearch(googlePlacesParameters, async function(
          error,
          responsePlaces
        ) {
          try {
            console.log(JSON.stringify(responsePlaces.status));
            if (responsePlaces.status === 'OK') {
              console.log(JSON.stringify(responsePlaces));

              if (typeof responsePlaces.results[0].photos !== 'undefined') {
                event.placesID = responsePlaces.results[0].id;
                event.placesPhotoReference =
                  responsePlaces.results[0].photos[0].photo_reference;
                //   responsePlaces.results[0].photos[0].photo_reference
                console.log(
                  event.showID +
                    ' Success! '.green +
                    event.venue.green +
                    ' Photo URL: '.green +
                    event.placesPhotoReference
                );
              }

              // placesItemsPlacesPhotoURL(i + 1);
            } else {
              console.log(
                '  ERROR generating place photo reference NOT FOUND!  '.white
                  .bgRed +
                  ' ' +
                  event.venue.blue
              );
              // Place not found, try again without the keyword using nearby Search
              googlePlacesParameters = {
                location: [event.lat, event.lng],
              };

              console.log(JSON.stringify(googlePlacesParameters));

              googlePlaces.placeSearch(googlePlacesParameters, async function(
                // googlePlaces.nearBySearch(googlePlacesParameters, async function(
                error,
                responsePlaces
              ) {
                try {
                  console.log(JSON.stringify(responsePlaces.status));
                  if (responsePlaces.status === 'OK') {
                    console.log(JSON.stringify(responsePlaces));

                    if (
                      typeof responsePlaces.results[0].photos !== 'undefined'
                    ) {
                      event.placesPhotoReference =
                        responsePlaces.results[0].photos[0].photo_reference;
                      //   responsePlaces.results[0].photos[0].photo_reference
                      console.log(
                        event.showID +
                          ' Success! '.green +
                          event.venue.green +
                          ' Photo URL: '.green +
                          event.placesPhotoReference
                      );
                    }

                    // placesItemsPlacesPhotoURL(i + 1);
                  } else {
                    console.log(
                      '  ERROR generating place photo reference NOT FOUND!  '
                        .white.bgRed +
                        ' ' +
                        event.venue.blue
                    );

                    event.placesPhotoReference = '';
                    // placesItemsPlacesPhotoURL(i + 1);
                  }
                } catch (error) {
                  console.log(
                    '  ERROR generating place photo reference!  '.white.bgRed +
                      ' ' +
                      event.venue.red
                  );
                  // placesItemsPlacesPhotoURL(i + 1);
                  event.placesPhotoReference = '';
                }
                placesItemsPlacesPhotoURL(i + 1);
              });

              // event.placesPhotoReference = '';
              // placesItemsPlacesPhotoURL(i + 1);
            }
          } catch (error) {
            console.log(
              '  ERROR generating place photo reference!  '.white.bgRed +
                ' ' +
                event.venue.red
            );
            // placesItemsPlacesPhotoURL(i + 1);
          }
          placesItemsPlacesPhotoURL(i + 1);
        });
      } else {
        console.log(
          event.showID +
            ' Places Photo Reference already exists: '.red +
            event.venue.red
        );
        placesItemsPlacesPhotoURL(i + 1);
      }
    } else {
      console.log(
        event.showID +
          ' Missing LatLng! NOT Generating Places Photo URL: '.red +
          event.venue.red
      );
      placesItemsPlacesPhotoURL(i + 1);
    }
  } else {
    console.log('\n\nEnd Places Photo Pass\n'.white.bgMagenta);
    fs.writeFileSync(`../${outputFilename}`, JSON.stringify(jsonSource));
    console.log('fin');
  }
};

console.log('\n\nStart 1st Pass LatLng\n'.white.bgBlue);
processItems(0);
