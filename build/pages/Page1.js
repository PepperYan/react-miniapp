const e = 'e';

const onInit = function (config) {
  if (config.hasOwnProperty("constructor")) {
    config.constructor.call(config);
  }

  config.data = obj.state;
  return config;
};

Page(onInit({
  constructor: function (props) {
    this.state = {
      items: ["hello"],
      name: {
        a: {}
      } // this.state.name = { a: {}}

    };
    this.state.name.a.b = "s"; // fine

    this.state.name.ab = "me"; // bug1

    this.state.n = "n"; // bug2
  },
  onClick: function () {
    console.log('test click1' + e);
    this.setData({
      arr: [[{
        id: 3
      }, {
        id: 4
      }], [{
        id: 3
      }, {
        id: 4
      }], [{
        id: 3
      }, {
        id: 4
      }]]
    });
  }
}));