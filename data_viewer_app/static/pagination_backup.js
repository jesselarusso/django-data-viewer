var App = App || {};

App.Pagination = function() {

  // Setup
  // --------------------------------------------------------------------------
  var globals = {};

  var init = function() {
    setGlobals();
    setBindings();
    setPages();
  }

  var setGlobals = function() {
    globals.$pag = $('#pag-container');
    globals.$pagLinks = function() { return globals.$pag.find('a'); };
    // globals.$startLink = globals.$pag.find('#pag-start');
    globals.$prevLink = globals.$pag.find('#pag-prev');
    globals.$currentText = globals.$pag.find('#pag-current');
    globals.$nextLink = globals.$pag.find('#pag-next');
    // globals.$endLink = globals.$pag.find('#pag-end');
    globals.rowCount = globals.$pag.data('count')
    globals.limit = parseInt(getQueryVariable('limit') || 15);
    globals.offset = parseInt(getQueryVariable('offset')) || 0;
    globals.pageCount = Math.ceil(globals.rowCount / globals.limit);
    globals.currentPage = calculateCurrentPage()
    globals.pag
  };

  var setBindings = function() {
    bindPagLinks()
  };

  var setPages = function() {
    globals.$pag.find('.numbered-page-link').parent('li').remove()

    // Figure out which page numbers to add to the pagination bar
    var pages = []
    for (i = globals.currentPage - 4; i < globals.currentPage + 4; i ++) {
      if (i > 0 && i < globals.pageCount) { pages.push(i); };
    }

    // Append page number links
    var $nextLi = globals.$nextLink.parent('li')
    pages.forEach(function(page_num) {
      $nextLi.before(pageNumberTemplate(page_num))
    });

    bindNumberedPageLinks()
  };


  // Bindings
  // --------------------------------------------------------------------------
  var bindPagLinks = function() {
    globals.$pagLinks().parent('li').removeClass('active')

    if (globals.currentPage == 1) {
      // globals.$startLink.parent('li').addClass('active')
      globals.$prevLink.parent('li').addClass('active')
    } else {
      // globals.$startLink.on('click', function() { loadPage(1) });
      globals.$prevLink.on('click', function() {
        loadPage(globals.currentPage - 1)
      });
    }

    if (globals.currentPage == globals.pageCount) {
      globals.$nextLink.parent('li').addClass('active')
      // globals.$endLink.parent('li').addClass('active')
    } else {
      globals.$nextLink.on('click', function() {
        loadPage(globals.currentPage + 1)
      });
      // globals.$endLink.on('click', function() { loadPage(globals.pageCount) });
    }
  };

  var bindNumberedPageLinks = function() {
    globals.$pag.find('a.numbered-page-link').on('click', function() {
      loadPage(parseInt($(this).data('page')))
    });
  };


  // AJAX
  // --------------------------------------------------------------------------
  var loadPage = function(page_num) {
    globals.offset = (page_num - 1) * globals.limit;
    globals.currentPage = calculateCurrentPage()
    var uri = '?limit=' + globals.limit + '&offset=' + globals.offset;
    globals.$pagLinks().off('click')

    $.get(uri, function(data) {
      App.loader.switchContent(data);
      setPages()
      bindPagLinks()
    });
  };

  // Templates
  // --------------------------------------------------------------------------
  var pageNumberTemplate = function(num) {
    var active_class = globals.currentPage == num ? ' class="active"' : '';
    return '<li' + active_class + '>\
    <a data-page="' + num + '" class="numbered-page-link" \
    href="javascript:void(0)">\
    <span>' + num + '</span>\
    </a>\
    </li>'
  }

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
