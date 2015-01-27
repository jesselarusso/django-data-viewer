var App = App || {};

$(function() {
  var pagination = new App.Pagination;
  pagination.init();

  App.loader = new App.Loader
  App.loader.init()
});
