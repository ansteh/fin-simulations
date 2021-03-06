app.factory('Cashflow', function($http) {
  var assets;
  var resources;

  var assetTypes = {
    fixed: function(asset) {
      return Cashflow.Fixed(asset);
    },
    resource: function(asset) {
      return Cashflow.Resource(asset);
    }
  };

  var getAssetTypes = function() {
    return assetTypes;
  };

  var loadAssets =  function() {
    return $http({ method: 'GET', url: '/api/cashflow' })
      .then(function (response) {
        assets = parseAssets(response.data);
        resources = createResources();

        return assets;
      });
  };

  var parseAssets = function(data) {
    return _.map(data, parseAsset);
  };

  var parseAsset = function(asset) {
    if(asset.type === 'resource') {
      asset.cashflow = _
        .chain(_.get(asset, 'cashflow', []))
        .map(function(transaction) {
          if(_.isString(transaction.date)) {
            transaction.date = new Date(transaction.date);
          }
          return transaction;
        })
        .sortBy('date')
        .value();
    }
    return asset;
  };

  var addAsset = function(asset) {
    return $http({
        method: 'POST',
        url: '/api/cashflow/insert',
        data: asset
      })
      .then(function (response) {
        var asset = parseAsset(response.data);
        assets.push(asset);
        assets = parseAssets(assets);
        resources = createResources();

        return asset;
      });
  };

  var updateAsset = function(asset) {
    return $http({
        method: 'POST',
        url: '/api/cashflow/update',
        data: asset
      })
      .then(function (response) {
        var asset = parseAsset(response.data);
        assets = parseAssets(assets);
        resources = createResources();

        return asset;
      });
  };

  var getAssets = function() {
    return assets;
  };

  var createResources = function() {
    return _.map(assets, function(asset) {
      var create = assetTypes[asset.type];
      return create(asset);
    });
  };

  var getCashflow = function(date, delimiter) {
    resources = resources || createResources();
    date = date || new Date();
    delimiter = delimiter || 'month';

    return Cashflow.getCashflow({
      resources: resources,
      date: date,
      delimiter: delimiter
    });
  };

  var getCashflowByRange = function(start, end, delimiter) {
    resources = resources || createResources();

    return Cashflow.getCashflowByRange({
      start: start,
      end: end,
      delimiter: delimiter,
      resources: resources
    });
  };

  var getLabels = function() {
    return Cashflow.getLabels();
  };

  return {
    addAsset: addAsset,
    getAssets: getAssets,
    getAssetTypes: getAssetTypes,
    getCashflow: getCashflow,
    getCashflowByRange: getCashflowByRange,
    getLabels: getLabels,
    loadAssets: loadAssets,
    updateAsset: updateAsset
  };
});
