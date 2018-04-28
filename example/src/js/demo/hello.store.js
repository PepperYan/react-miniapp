import {observable, computed, reaction, action} from 'mobx'


export default class HelloStore{
  @observable msg = "world"

  @action sayHi(name){
  }

  @action changeMsg(msg){
    this.msg = msg
  }
}
