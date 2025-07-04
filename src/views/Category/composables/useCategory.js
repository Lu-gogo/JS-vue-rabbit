import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  //获取category数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    // console.log(res)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  //监听路由变化 发送数据
  onBeforeRouteUpdate((to) => {
    // console.log('路由变化了')
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
