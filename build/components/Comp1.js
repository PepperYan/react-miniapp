Component({
  properties: {
    aaa: {
      type: Number,
      value: 111
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
}); // Comp.defaultProps = {
//   aaa: 1121,
//   bbb: null,
//   ccc: "xxx",
//   a: true,
//   f: [],
//   ee: {}
// }