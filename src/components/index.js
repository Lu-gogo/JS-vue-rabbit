//把components目录下的所有组件全局化注册
//插件
import ImgView from './imgView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    //app.component
    app.component('XtxImgView', ImgView)
    app.component('XtxSku', Sku)
  }
}
