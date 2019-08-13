const params = {
  APP_NAME: 'iTour.umphreys',
  BAND: 'UMPHREYS',
  BAND_COLOR: '95A5A6',
  BAND_NAME: "Umphrey's McGee",
  BAND_URL_DEFAULT: 'http://umphreys.com',
  MUSIC_TITLE: 'JamBase Local Music',
  MUSIC_URL_NON_USA: 'http://www.jambase.com',
  MUSIC_URL1: 'http://www.jambase.com/shows?mode=all&start=',
  MUSIC_URL2: '&address=',
  MUSIC_URL3: '&region=&country=&radius=60',
  SEATING_TITLE: 'Seating Chart',
  SETLIST_TITLE: "AllThings Umphrey's Setlist",
  TICKETS_TITLE: 'CashorTrade Tickets',
  TICKETS_URL: 'http://m.cashortrade.org/umphreys-mcgee-tickets',
  UPGRADE_URL: 'itms://itunes.apple.com/us/app/apple-store/id400042273',
  VIDEO_TITLE: 'YouTube Videos',
  VIDEO_URL: 'https://m.youtube.com/results?search_query=umphreys%20mcgee%20',
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
      'umphreys.consumable.beer',
      'umphreys.consumable.coffee',
      'umphreys.consumable.dollar',
    ],
    TIP_JAR_PRODUCT_IDS_IOS: [
      'umphreys.consumable.beer',
      'umphreys.consumable.coffee',
      'umphreys.consumable.dollar',
    ],
    UNLOCK_PRODUCT_ID: 'umphreys.nonconsumable.unlock',
  },
};

module.exports = params;
