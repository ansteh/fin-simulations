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

  var addResource = function(resource) {
    return add(resource.type, _.pick(resource, ['name', 'value']));
  };

  var find = function(pagename, name) {
    return _.find(get(pagename), { name: name });
  };

  var findResource = function(name) {
    return find('assets', name) || find('liabilities', name) || undefined;
  };

  var updateResource = function(resource) {
    var origin = findResource(resource.name);
    if(origin) {
      origin.value = resource.value;
    } else {
      add(resource.type, _.pick(resource, ['name', 'value']));
    }
  };

  var removeResource = function(name) {
    var resource = findResource(name);
    if(resource) {
      _.pull(get('assets'), resource);
      _.pull(get('liabilities'), resource);
    }
  };

  var getTotalResourcesOnly = function(pagename) {
    return _.chain(get(pagename))
      .filter(function(resource) {
        return _.includes(['profit', 'loss'], resource.name) === false;
      })
      .map('value')
      .sum()
      .value();
  };

  var applyProfitAndLoss = function() {
    var difference = getTotalResourcesOnly('assets') - getTotalResourcesOnly('liabilities');
    if(difference > 0) {
      updateResource({
        type: 'liabilities',
        name: 'profit',
        value: difference
      });
      removeResource('loss');
    } else {
      updateResource({
        type: 'assets',
        name: 'loss',
        value: -difference
      });
      removeResource('profit');
    }
  };

  var updateAll = function(resources) {
    _.forEach(resources, updateResource);
    applyProfitAndLoss();
  };

  var getBalance = function() {
    return balance;
  };

  var setBalance = function(newBalance) {
    balance = newBalance;
  };

  var findValueOf = function(name) {
    var resource = findResource(name);
    return _.get(resource, 'value');
  };

  return {
    isBalanced: isBalanced,
    get: get,
    add: add,
    addAsset: addAsset,
    addLiability: addLiability,
    isBalanced: isBalanced,
    total: total,
    updateAll: updateAll,
    updateResource: updateResource,
    applyProfitAndLoss: applyProfitAndLoss,
    getBalance: getBalance,
    setBalance: setBalance,
    findValueOf: findValueOf
  };
});
