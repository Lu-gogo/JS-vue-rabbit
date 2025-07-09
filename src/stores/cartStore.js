//封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  //定义sate - cartList
  const cartList = ref([])
  //定义action - addToCart
  const addCart = (goods) => {
    //已经添加过 count+1
    //未添加过 push
    //匹配skuId能不能在cartList中找到
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      item.count += goods.count
      //更新购物车列表
    }
    else {
      cartList.value.push(goods)
    }
  }
  //添加购物车操作
  return {
    cartList,
    addCart
  }
}, {
  persist: true //持久化存储
})
