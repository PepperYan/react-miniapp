const e = 'e';
Page({
  onClick: function () {
    console.log('test click' + e);
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
});