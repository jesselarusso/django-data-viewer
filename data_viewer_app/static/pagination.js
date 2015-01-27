var App = App || {};

App.Pagination = function() {

  // Setup
  // --------------------------------------------------------------------------
  var globals = {};

  var init = function() {
    setGlobals();
    setBindings();
    setValues();
  }

  var setGlobals = function() {
    globals.$pag = $('#pag-container');
    globals.$pagLinks = globals.$pag.find('a')
    globals.$startLink = globals.$pag.find('#pag-start');
    globals.$prevLink = globals.$pag.find('#pag-prev');
    globals.$currentText = globals.$pag.find('#pag-current');
    globals.$nextLink = globals.$pag.find('#pag-next');
    globals.$endLink = globals.$pag.find('#pag-end');
    globals.rowCount = globals.$pag.data('count')
    globals.limit = parseInt(getQueryVariable('limit') || globals.rowCount);
    globals.offset = parseInt(getQueryVariable('offset')) || 0;
    globals.pageCount = Math.ceil(globals.rowCount / globals.limit);
    globals.currentPage = calculateCurrentPage()
  };

  var setBindings = function() {
    bindPagLinks()
  };

  var setValues = function() {
    var txt = "Page " + globals.currentPage + " of " + globals.pageCount;
    globals.$currentText.text(txt)
  };


  // Bindings
  // --------------------------------------------------------------------------
  var bindPagLinks = function() {
    globals.$pagLinks.parent('li').removeClass('active')

    if (globals.currentPage == 1) {
      globals.$startLink.parent('li').addClass('active')
      globals.$prevLink.parent('li').addClass('active')
    } else {
      globals.$startLink.on('click', function() { loadPage(1) });
      globals.$prevLink.on('click', function() {
        loadPage(globals.currentPage - 1)
      });
    }

    if (globals.currentPage == globals.pageCount) {
      globals.$nextLink.parent('li').addClass('active')
      globals.$endLink.parent('li').addClass('active')
    } else {
      globals.$nextLink.on('click', function() {
        loadPage(globals.currentPage + 1)
      });
      globals.$endLink.on('click', function() { loadPage(globals.pageCount) });
    }
  }


  // AJAX
  // --------------------------------------------------------------------------
  var loadPage = function(page_num) {
    globals.offset = (page_num - 1) * globals.limit;
    globals.currentPage = calculateCurrentPage()
    var uri = '?limit=' + globals.limit + '&offset=' + globals.offset;
    globals.$pagLinks.off('click')

    $.get(uri, function(data) {
      App.loader.switchContent(data);
      setValues()
      bindPagLinks()
    });
  };


  // Utility
  // --------------------------------------------------------------------------
  var getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return false;
  }

  var calculateCurrentPage = function() {
    return Math.ceil((globals.offset / globals.limit) + 0.0001);
  }


  // Reveal public interface
  // --------------------------------------------------------------------------
  return { init: function() { return init(); }};
};
