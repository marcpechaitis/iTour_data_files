const params = {
  APP_NAME: 'iTour.dmb',
  BAND: 'DMB',
  BAND_COLOR: 'C7A720',
  BAND_NAME: 'Dave Matthews Band',
  BAND_URL_DEFAULT: 'http://www.davematthewsband.com/',
  MUSIC_TITLE: 'JamBase Local Music',
  MUSIC_URL_NON_USA: 'http://www.jambase.com',
  MUSIC_URL1: 'http://www.jambase.com/shows?mode=all&start=',
  MUSIC_URL2: '&address=',
  MUSIC_URL3: '&region=&country=&radius=60',
  SEATING_TITLE: 'Seating Chart',
  SETLIST_TITLE: 'Antsmarching Setlist',
  TICKETS_TITLE: 'CashorTrade Tickets',
  TICKETS_URL: 'http://m.cashortrade.org/dave-matthews-band-tickets',
  UPGRADE_URL: 'itms://itunes.apple.com/us/app/apple-store/id398937827',
  VIDEO_TITLE: 'YouTube Videos',
  VIDEO_URL:
    'https://m.youtube.com/results?search_query=dave%20matthews%20band%20',
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
      'dmb.consumable.beer',
      'dmb.consumable.coffee',
      'dmb.consumable.dollar',
    ],
    TIP_JAR_PRODUCT_IDS_IOS: [
      'dmb.consumable.beer',
      'dmb.consumable.coffee',
      'dmb.consumable.dollar',
    ],
    UNLOCK_PRODUCT_ID: 'dmb.nonconsumable.unlock',
  },
};

module.exports = params;
