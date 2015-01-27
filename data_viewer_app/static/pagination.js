var App = App || {};

App.Pagination = function() {

  // Setup
  // --------------------------------------------------------------------------
  var globals = {};

  var init = function() {
    setGlobals();
    setSimplePagination();
  }

  var setGlobals = function() {
    globals.$pag = $('#pag-container');
    globals.rowCount = globals.$pag.data('count')
    globals.limit = 15
    globals.offset = 0
    globals.pageCount = Math.ceil(globals.rowCount / globals.limit);
    globals.currentPage = calculateCurrentPage()
  };

  var setSimplePagination = function() {
    globals.$pag.pagination({
      items: globals.rowCount,
      itemsOnPage: globals.limit,
      edges: 1,
      currentPage: globals.currentPage,
      onPageClick: function(page_num) { loadPage(page_num) }
    });
  };


  // AJAX
  // --------------------------------------------------------------------------
  var loadPage = function(page_num) {
    globals.$pag.pagination('disable')
    globals.offset = (page_num - 1) * globals.limit;
    globals.currentPage = calculateCurrentPage()

    var params = {
      limit: globals.limit,
      offset: globals.offset
    }

    $.get('/refgene', params, function(data) {
      globals.rowCount = data.count
      App.loader.switchContent(data);
      globals.$pag.pagination('updateItems', data.count)
      globals.$pag.pagination('enable')
    });
  };

  var calculateCurrentPage = function() {
    return Math.ceil((globals.offset / globals.limit) + 0.0001);
  }


  // Reveal public interface
  // --------------------------------------------------------------------------
  return { init: function() { return init(); }};
};
