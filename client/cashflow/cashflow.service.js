app.factory('Cashflow', function($http) {
  var assets;

  var loadAssets =  function() {
    return $http({ method: 'GET', url: '/api/cashflow' })
      .then(function (response) {
        assets = response.data;
        return assets;
      });
  };

  var addAsset = function(asset) {
    return $http({
        method: 'POST',
        url: '/api/cashflow/insert',
        data: asset
      })
      .then(function (response) {
        var asset = response.data;
        assets.push(asset);
        return asset;
      });
  };

  var getAssets = function() {
    return assets;
  };

  return {
    addAsset: addAsset,
    getAssets: getAssets,
    loadAssets: loadAssets
  };
});
