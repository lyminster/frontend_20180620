/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin')
    .config(localForageConfig);

  /** @ngInject */
  function localForageConfig($localForageProvider) {
    $localForageProvider.config({
      driver: 'localforage.WEBSQ', // if you want to force a driver
      name: 'myApp', // name of the database and prefix for your data, it is "lf" by default
      size: 4980736,
      version: 1.0, // version of the database, you shouldn't have to use this
      storeName: 'keyvaluepairs', // name of the table
      description: 'some description'
    });
  }
})();