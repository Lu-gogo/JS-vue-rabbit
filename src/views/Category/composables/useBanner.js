import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export function useBanner() {
  //获取banner数据
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2', // 2代表分类页
    })
    // console.log(res)
    bannerList.value = res.result
  }
  onMounted(() => getBanner())

  return {
    bannerList
  }
}
