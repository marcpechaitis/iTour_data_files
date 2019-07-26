const params = {
  APP_NAME: 'iTour.sci',
  BAND: 'SCI',
  BAND_COLOR: '9370db',
  BAND_NAME: 'String Cheese Incident',
  BAND_URL_DEFAULT: 'http://stringcheeseincident.com/tour/',
  MUSIC_TITLE: 'JamBase Local Music',
  MUSIC_URL_NON_USA: 'http://www.jambase.com',
  MUSIC_URL1: 'http://www.jambase.com/shows?mode=all&start=',
  MUSIC_URL2: '&address=',
  MUSIC_URL3: '&region=&country=&radius=60',
  SEATING_TITLE: 'Seating Chart',
  SETLIST_TITLE: 'FriendsOfCheese Setlist',
  TICKETS_TITLE: 'CashorTrade Tickets',
  TICKETS_URL: 'http://m.cashortrade.org/the-string-cheese-incident-tickets',
  UPGRADE_URL: 'itms://itunes.apple.com/us/app/apple-store/id467289582',
  VIDEO_TITLE: 'YouTube Videos',
  VIDEO_URL:
    'https://m.youtube.com/results?search_query=string%20cheese%20incident%20',
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
      'sci.consumable.beer',
      'sci.consumable.coffee',
      'sci.consumable.dollar',
    ],
    TIP_JAR_PRODUCT_IDS_IOS: [
      'sci.consumable.beer',
      'sci.consumable.coffee',
      'sci.consumable.dollar',
    ],
    UNLOCK_PRODUCT_ID: 'sci.nonconsumable.unlock',
  },
};

module.exports = params;
