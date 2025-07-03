//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // console.log(el, binding.value)
        //el: 指令绑定的元素
        //binding.value: 指令的值，这里是图片的URL
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting);
            if (isIntersecting) {
              // 当元素进入视口时，设置图片的src属性
              el.src = binding.value
              stop() // 停止观察
            }
          })
      }
    })
  }
}
