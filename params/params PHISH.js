const params = {
  APP_NAME: 'iTour.phish',
  APPSTORE_GOOGLE:
    'https://play.google.com/store/apps/developer?id=Sugarloaf+App+Company',
  APPSTORE_IOS:
    'https://itunes.apple.com/us/developer/sugarloaf-app-company/id391888528',
  BAND: 'PHISH',
  BAND_COLOR: '228AE6',
  BAND_NAME: 'Phish',
  BAND_URL_DEFAULT: 'http://phish.com/',
  LOCK_AFTER_NBR: 7,
  MUSIC_TITLE: 'JamBase Local Music',
  MUSIC_URL_NON_USA: 'http://www.jambase.com',
  MUSIC_URL1: 'http://www.jambase.com/shows?mode=all&start=',
  MUSIC_URL2: '&address=',
  MUSIC_URL3: '&region=&country=&radius=60',
  SEATING_TITLE: 'Seating Chart',
  SETLIST_TITLE: 'Phish.net Setlist',
  TICKETS_TITLE: 'CashorTrade Tickets',
  TICKETS_URL: 'http://m.cashortrade.org/phish-tickets',
  UPGRADE_URL: 'itms://itunes.apple.com/us/app/apple-store/id391888525',
  VIDEO_TITLE: 'YouTube Videos',
  VIDEO_URL: 'https://m.youtube.com/results?search_query=phish%20',
  WEATHER_TITLE: 'Dark Sky Weather',
  WEATHER_URL: 'https://darksky.net/',
  WIKIPEDIA_URL: 'https://en.wikipedia.org/wiki/',
  extras: {
    SUPPORT_EMAIL: 'theitourapp@gmail.com',
  },
  in_app_purchase: {
    TIP_JAR_PRODUCT_IDS_ANDROID: [
      'phish.consumable.beer',
      'phish.consumable.coffee',
      'phish.consumable.dollar',
    ],
    TIP_JAR_PRODUCT_IDS_IOS: [
      'phish.consumable.beer',
      'phish.consumable.coffee',
      'phish.consumable.dollar',
    ],
    UNLOCK_PRODUCT_ID: 'phish.nonconsumable.unlock',
  },
};

module.exports = params;
