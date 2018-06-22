
const react_miniapp_obj = {
  properties: {
    aaa: {
      type: Number,
      value: 1121
    },
    bbb: {
      type: null,
      value: null
    },
    ccc: {
      type: String,
      value: "xxx"
    },
    a: {
      type: Boolean,
      value: true
    },
    f: {
      type: Array,
      value: []
    },
    ee: {
      type: Object,
      value: {}
    }
  }
}
const onLoad = react_miniapp_obj.onLoad
react_miniapp_obj.onLoad = function(args){
  if(onLoad !== void 666)
      onLoad.call(this,args)
}
Page(react_miniapp_obj)