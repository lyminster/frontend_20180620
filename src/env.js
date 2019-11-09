(function (window) {
  window.__env = window.__env || {};

  //API url Development
  window.__env.serviceAPIBase = 'http://mission2wdevelopment-dcsl.azurewebsites.net/';
  // AUTH url Development
  window.__env.serviceBase = 'http://mission2wdevelopment-dcsl.azurewebsites.net/';
 
 // // URL SSO Astra
 window.__env.serviceSsoBase = 'https://devproxy.astra.co.id/hsohome/#/apps';

  // // window.__env.useSso = true;
  // // API url Live
  //window.__env.serviceAPIBase = 'http://dscl-api.azurewebsites.net/';
  // // AUTH url Live
  //window.__env.serviceBase = 'http://dscl-api.azurewebsites.net/';

  // // URL SSO Astra Live
  //window.__env.serviceSsoBase = 'https://astraapps.astra.co.id/hsohome/#/login';

  window.__env.useSso = false;
  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));