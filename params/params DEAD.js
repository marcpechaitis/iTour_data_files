const params = {
  APP_NAME: 'iTour.dead',
  BAND: 'DEAD',
  BAND_COLOR: 'F64747',
  BAND_NAME: 'Dead & Co.',
  BAND_URL_DEFAULT: 'https://deadandcompany.com/',
  MUSIC_TITLE: 'JamBase Local Music',
  MUSIC_URL_NON_USA: 'http://www.jambase.com',
  MUSIC_URL1: 'http://www.jambase.com/shows?mode=all&start=',
  MUSIC_URL2: '&address=',
  MUSIC_URL3: '&region=&country=&radius=60',
  SEATING_TITLE: 'Seating Chart',
  SETLIST_TITLE: 'setlist.fm',
  TICKETS_TITLE: 'CashorTrade Tickets',
  TICKETS_URL: 'http://m.cashortrade.org/dead-and-company-tickets',
  UPGRADE_URL: 'itms://itunes.apple.com/us/app/apple-store/id397607743',
  VIDEO_TITLE: 'YouTube Videos',
  VIDEO_URL:
    'https://m.youtube.com/results?search_query=dead%20and%20company%20',
  WEATHER_TITLE: 'Dark Sky Weather',
  WEATHER_URL: 'https://darksky.net/',
  WIKIPEDIA_URL: 'https://en.wikipedia.org/wiki/',
  APPSTORE_GOOGLE:
    'https://play.google.com/store/apps/developer?id=Sugarloaf+App+Company',
  APPSTORE_IOS:
    'https://itunes.apple.com/us/developer/sugarloaf-app-company/id391888528',
  LOCK_AFTER_NBR: 7,
  extras: {
    SUPPORT_EMAIL: 'theitourapp@gmail.com',
  },
  in_app_purchase: {
    TIP_JAR_PRODUCT_IDS_ANDROID: [
      'dead.consumable.beer',
      'dead.consumable.coffee',
      'dead.consumable.dollar',
    ],
    TIP_JAR_PRODUCT_IDS_IOS: [
      'dead.consumable.beer',
      'dead.consumable.coffee',
      'dead.consumable.dollar',
    ],
    UNLOCK_PRODUCT_ID: 'dead.nonconsumable.unlock',
  },
};

module.exports = params;
