var App = App || {};

$(function() {
  App.pagination = new App.Pagination;
  App.pagination.init();

  App.loader = new App.Loader;
  App.loader.init();
});
