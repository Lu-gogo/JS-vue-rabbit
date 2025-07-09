//封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //定义sate - cartList
  const cartList = ref([])
  //定义action - addToCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //登陆后加入购物车的逻辑
      // console.log("登陆成功")
      await insertCartAPI({ skuId, count })
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    else {
      //已经添加过 count+1
      //未添加过 push
      //匹配skuId能不能在cartList中找到
      // console.log("未登陆")
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
  }


  //删除购物车
  const delCart = (skuId) => {
    //找到对应的商品
    //找到删除项下标值 splice
    //使用数组过滤方法filter
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }

  //计算属性
  //数量
  const allCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0)) //总数量
  //总价
  const allPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0)) //总数量

  //单选功能
  const singleCheck = (skuId, selected) => {
    //找到对应的商品 把selected状态传入
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }
  //已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count, 0)) //已选择商品数量
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count * item.price, 0)) //已选择商品数量

  //已选择商品价钱合计

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    singleCheck,
    isAll,
    allCheck
  }
}, {
  persist: true //持久化存储
})
