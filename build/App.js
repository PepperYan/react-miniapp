const onInit = function (config) {
  if (config.hasOwnProperty("constructor")) {
    config.constructor.call(config);
  }

  config.data = obj.state;
  return config;
};

App(onInit({}));