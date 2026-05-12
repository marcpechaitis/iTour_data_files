// Script to retrieve the Latitude and Longitude of a iTour data file
// To run, type 'node LatLngPlaces.js input_file_name' in terminal
// Process runs *synchronuously*
const inputFilename = process.argv[2];
const outputFilename = process.argv[2];

const jsonSource = require(`../${inputFilename}`);
const fs = require('fs');
const https = require('https');
const colors = require('colors');
const NodeGeocoder = require('node-geocoder');
const GooglePlaces = require('googleplaces');
const googlePlaces = new GooglePlaces(
  process.env.ITOUR_GOOGLE_GEOCODE_API_KEY_SCRIPT,
  'json'
);
let googlePlacesParameters = {};
let venue;

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.ITOUR_GOOGLE_GEOCODE_API_KEY_SCRIPT,
  formatter: null,
};
const geocoder = NodeGeocoder(options);
console.log(process.env.ITOUR_GOOGLE_GEOCODE_API_KEY_SCRIPT);

console.log(
  '\n\nFile: '.black.bgWhite +
    process.argv[2].black.bgWhite +
    '\n'.black.bgWhite
);

// 1st create backup copy
fs.writeFileSync(
  '../../bkp/' +
    inputFilename.replace('.json', '') +
    '_LatLngPlacesDistance_' +
    new Date().getTime() +
    '.json',
  JSON.stringify(jsonSource)
);

function handleErrors(error) {
  console.error('Something went wrong ', error);
}

var processItems = function (i) {
  if (i < jsonSource.length) {
    const event = jsonSource[i];

    if (false) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems(i + 1);
    } else {
      const searchString = `${event.venue}+${event.address},+${event.city},+${event.state}+${event.postal}+${event.country}`;

      geocoder.geocode(searchString).then((response) => {
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

var processItems2ndPass = function (i) {
  if (i < jsonSource.length) {
    const event = jsonSource[i];
    const searchString = `${event.address},+${event.city},+${event.state}+${event.postal}+${event.country}`;

    if (
      (event.hasOwnProperty('lat') || event.lat != 0) &&
      (event.hasOwnProperty('lng') || event.lng != 0) &&
      event.hasOwnProperty('confidence') &&
      event.confidence > 0.5
    ) {
      console.log(
        event.showID +
          ' Skipped! '.cyan +
          event.venue.cyan +
          ' already processed'.cyan
      );
      processItems2ndPass(i + 1);
    } else {
      geocoder.geocode(searchString).then((response) => {
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
    console.log('\n\nStart Places Photo Pass\n'.white.bgMagenta);
    placesItemsPlacesPhotoURL(0);
  }
};

var placesItemsPlacesPhotoURL = function (i) {
  if (i < jsonSource.length) {
    const event = jsonSource[i];
    const searchString = `${event.address},+${event.city},+${event.state}+${event.postal}+${event.country}`;

    if (
      (event.hasOwnProperty('lat') || event.lat != 0) &&
      (event.hasOwnProperty('lng') || event.lng != 0) &&
      event.hasOwnProperty('confidence') &&
      event.confidence >= 0.5
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
        googlePlacesParameters = {
          location: [event.lat, event.lng],
          keyword: event.venue,
        };
        console.log(JSON.stringify(googlePlacesParameters));

        googlePlaces.placeSearch(
          googlePlacesParameters,
          async function (error, responsePlaces) {
            try {
              console.log(JSON.stringify(responsePlaces.status));
              if (responsePlaces.status === 'OK') {
                console.log(JSON.stringify(responsePlaces));

                if (typeof responsePlaces.results[0].photos !== 'undefined') {
                  event.placesID = responsePlaces.results[0].place_id;
                  event.placesPhotoReference =
                    responsePlaces.results[0].photos[0].photo_reference;
                  console.log(
                    event.showID +
                      ' Success! '.green +
                      event.venue.green +
                      ' Photo URL: '.green +
                      event.placesPhotoReference +
                      ' Places ID: '.green +
                      event.placesID
                  );
                }
              } else {
                console.log(
                  '  ERROR generating place photo reference NOT FOUND!  '.white
                    .bgRed +
                    ' ' +
                    event.venue.blue
                );
                googlePlacesParameters = {
                  location: [event.lat, event.lng],
                };

                console.log(JSON.stringify(googlePlacesParameters));

                googlePlaces.placeSearch(
                  googlePlacesParameters,
                  async function (error, responsePlaces) {
                    try {
                      console.log(JSON.stringify(responsePlaces.status));
                      if (responsePlaces.status === 'OK') {
                        console.log(JSON.stringify(responsePlaces));

                        if (
                          typeof responsePlaces.results[0].photos !==
                          'undefined'
                        ) {
                          event.placesPhotoReference =
                            responsePlaces.results[0].photos[0].photo_reference;
                          console.log(
                            event.showID +
                              ' Success! '.green +
                              event.venue.green +
                              ' Photo URL: '.green +
                              event.placesPhotoReference
                          );
                        }
                      } else {
                        console.log(
                          '  ERROR generating place photo reference NOT FOUND!  '
                            .white.bgRed +
                            ' ' +
                            event.venue.blue
                        );
                        event.placesPhotoReference = '';
                      }
                    } catch (error) {
                      console.log(
                        '  ERROR generating place photo reference!  '.white
                          .bgRed +
                          ' ' +
                          event.venue.red
                      );
                      event.placesPhotoReference = '';
                    }
                    placesItemsPlacesPhotoURL(i + 1);
                  }
                );
              }
            } catch (error) {
              console.log(
                '  ERROR generating place photo reference!  '.white.bgRed +
                  ' ' +
                  event.venue.red
              );
            }
            placesItemsPlacesPhotoURL(i + 1);
          }
        );
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
    console.log('\n\nStart Driving Distance Pass\n'.white.bgMagenta);
    processDrivingDistances(0, 0);
  }
};

var processDrivingDistances = function (sectionIndex, eventIndex) {
  if (sectionIndex >= jsonSource.sections.length) {
    console.log('\n\nEnd Driving Distance Pass\n'.white.bgMagenta);

    // Sync drivingMilesFromPrev into flatData by matching showID
    jsonSource.flatData.forEach((flatEvent) => {
      jsonSource.sections.forEach((section) => {
        const match = section.data.find((e) => e.showID === flatEvent.showID);
        if (match) {
          flatEvent.drivingMilesFromPrev = match.drivingMilesFromPrev;
        }
      });
    });

    fs.writeFileSync(`../${outputFilename}`, JSON.stringify(jsonSource));
    console.log('fin');
    return;
  }

  const section = jsonSource.sections[sectionIndex];

  if (eventIndex >= section.data.length) {
    processDrivingDistances(sectionIndex + 1, 0);
    return;
  }

  const event = section.data[eventIndex];

  // First event in a leg has no previous — skip
  if (eventIndex === 0) {
    event.drivingMilesFromPrev = null;
    console.log(
      event.showID + ' Skipped (first in leg) '.cyan + event.venue.cyan
    );
    processDrivingDistances(sectionIndex, eventIndex + 1);
    return;
  }

  // Skip if already processed
  if (
    event.hasOwnProperty('drivingMilesFromPrev') &&
    event.drivingMilesFromPrev !== null &&
    event.drivingMilesFromPrev !== ''
  ) {
    console.log(
      event.showID +
        ' Skipped (already has driving distance) '.cyan +
        event.venue.cyan
    );
    processDrivingDistances(sectionIndex, eventIndex + 1);
    return;
  }

  const prevEvent = section.data[eventIndex - 1];

  // Same venue as previous — no drive needed
  if (prevEvent.venue === event.venue) {
    event.drivingMilesFromPrev = 0;
    console.log(
      event.showID +
        ' Skipped (same venue as previous) '.cyan +
        event.venue.cyan
    );
    processDrivingDistances(sectionIndex, eventIndex + 1);
    return;
  }

  const origins = `${prevEvent.lat},${prevEvent.lng}`;
  const destinations = `${event.lat},${event.lng}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&units=imperial&key=${process.env.ITOUR_GOOGLE_GEOCODE_API_KEY_SCRIPT}`;

  https
    .get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const element = parsed.rows[0].elements[0];
          if (element.status === 'OK') {
            const miles = Math.round(element.distance.value / 1609.34);
            event.drivingMilesFromPrev = miles;
            console.log(
              event.showID +
                ' Success! '.green +
                `${prevEvent.venue} → ${event.venue}: `.green +
                `${miles} mi`.green
            );
          } else {
            console.log(
              event.showID +
                ' WARNING '.black.bgYellow +
                ` Distance Matrix status: ${element.status} `.black.bgYellow +
                event.venue.black.bgYellow
            );
            event.drivingMilesFromPrev = null;
          }
        } catch (err) {
          console.log(
            ' ERROR '.white.bgRed +
              ` parsing Distance Matrix response for ${event.venue} `.white
                .bgRed
          );
          event.drivingMilesFromPrev = null;
        }
        processDrivingDistances(sectionIndex, eventIndex + 1);
      });
    })
    .on('error', (err) => {
      console.log(
        ' ERROR '.white.bgRed +
          ` Distance Matrix request failed for ${event.venue}: ${err.message} `
            .white.bgRed
      );
      event.drivingMilesFromPrev = null;
      processDrivingDistances(sectionIndex, eventIndex + 1);
    });
};

console.log('\n\nStart 1st Pass LatLng\n'.white.bgBlue);
processItems(0);
