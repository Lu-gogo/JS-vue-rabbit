import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
//优化两次获取数据的浪费

export const useCategoryStore = defineStore('category', () => {
  //state 导航列表数据
  const categoryList = ref([])
  //导航列表数据获取方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    // console.log(res)
    categoryList.value = res.result
    // console.log(categoryList)
  }

  return {
    categoryList,
    getCategory
  }
})
