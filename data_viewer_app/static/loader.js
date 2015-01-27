var App = App || {};

App.Loader = function() {

  // Setup
  // --------------------------------------------------------------------------
  var globals = {};

  var init = function() {
    setGlobals();
  };

  var setGlobals = function() {
    globals.$tableBody = $('#results-table tbody')
  };


  // Templates
  // --------------------------------------------------------------------------
  var rowTemplate = function(item) {
    return "<tr> \
      <td>" + item.chrom + "</td> \
      <td>" + item.name + "</td> \
      <td>" + item.txStart + "</td> \
      <td>" + item.txEnd + "</td> \
    </tr>"
  };


  // Content
  // --------------------------------------------------------------------------
  var switchContent = function(json) {
    globals.$tableBody.empty()
    json.results.forEach(function(item) {
      $(rowTemplate(item)).hide().appendTo(globals.$tableBody).fadeIn(200);
    });
  };


  // Reveal public interface
  // --------------------------------------------------------------------------
  return {
    init: function() { return init(); },
    switchContent: switchContent
  };
};
