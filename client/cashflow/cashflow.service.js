app.factory('Cashflow', function($http) {
  var assets;
  // var resources;

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
        assets = response.data;
        resources = createResources();

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

    console.log(resources, date, delimiter);

    return Cashflow.getCashflow({
      resources: resources,
      date: date,
      delimiter: delimiter
    });
  };

  // console.log(Cashflow);
  //
  // var fixed = Cashflow.Fixed({
  //   name: 'position',
  //   each: 'month',
  //   value: 2
  // });
  //
  // var resource = Cashflow.Resource({
  //   name: 'position',
  //   cashflow: [{
  //     date: moment().startOf('month').subtract(5, 'day').toDate(),
  //     value: 3
  //   },{
  //     date: moment().startOf('month').subtract(3, 'day').toDate(),
  //     value: 2
  //   },{
  //     date: new Date(),
  //     value: 10
  //   }]
  // });
  //
  // var yearCash = Cashflow.getCashflow({
  //   resources: [fixed, resource],
  //   date: new Date(),
  //   delimiter: 'year'
  // });
  //
  // // console.log('year cashflow:', yearCash);
  // console.log('year cashflow:', 39 === yearCash);


  return {
    addAsset: addAsset,
    getAssets: getAssets,
    getAssetTypes: getAssetTypes,
    getCashflow: getCashflow,
    loadAssets: loadAssets
  };
});
