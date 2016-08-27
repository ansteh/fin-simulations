app.factory('Accounting', function(Request) {
  var balance = {
    assets: [],
    liabilities: []
  };

  var get = function(pagename) {
    return balance[pagename];
  };

  var getValues = function(pagename) {
    return _.map(get(pagename), 'value');
  };

  var total = function(pagename) {
    return _.sum(getValues(pagename));
  };

  var isBalanced = function() {
    return total('assets') === total('liabilities');
  };

  var add = function(pagename, item) {
    return get(pagename).push(item);
  };

  var addAsset = function(asset) {
    return add('assets', asset);
  };

  var addLiability = function(liability) {
    return add('liabilities', liability);
  };

  return {
    isBalanced: isBalanced,
    get: get,
    add: add,
    addAsset: addAsset,
    addLiability: addLiability,
    isBalanced: isBalanced,
    total: total
  };
});
