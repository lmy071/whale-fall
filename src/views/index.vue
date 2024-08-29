<template>
  <div  class="page-main">
    <div class="card">
        <div class="card-item" v-for="(item,index) in cardList" :key="index" :style="[{background: item.color},{height: item.height},{lineHeight: item.height}]" @click="elClick(item)">
             <p class="text">{{item.title}}</p>
        </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'

import {  useRouter } from 'vue-router'
import { generateRandomNumberBetween} from '../utils/number'
import { generateLightHexColor} from '../utils/color'

type cardListT = {
  color?:string,
  height:string,
  sort:number,
  title?:string,
  url?:string,
  img?:string
}


const cardList = ref<cardListT[]>([
  {
    color:  '#e6cc55',
    height: '100px',
		sort: 999,
		title:"备忘录",
		url:'/vvv/todoList',
    img:'',
  },
  {
    color:  '#efa651',
    height: '100px',
    sort: 998,
    title:"相册",
    url:'/vvv/photoAlbum',
    img:'',
  },
  {
    color:  '#fa8be4',
    height: '100px',
    sort: 997,
    title:"记账pc端",
    url:'/vvv/accountBookH5',
    img:'',
  },
	{
    color:  '#fa8be4',
    height: '100px',
    sort: 996,
    title:"登录",
    url:'/login',
    img:'',
  }
])
const list: cardListT[] = Array.from({ length: 100 }, (_, index) => ({
	color: generateLightHexColor(),
	height: generateRandomNumberBetween(60,200)+'px',
  sort:index,
}));



cardList.value = cardList.value.concat(list)

const router = useRouter()

const elClick = (item:any)=>{
	router.push(item.url)
}
</script>



<style lang="scss" scoped>
.page-main{
    background: #ffffff;
    min-height:100vh;
    padding: 0 30px;
    .card{
        column-count: 3; // 定义三列
        column-gap: 20px; // 列与列的距离为20px
      .card-item{
        text-align: center;
        width: 216px;
        border-radius: 16px;
        grid-row-start: auto;
        margin-bottom: 20px;
        break-inside: avoid; // 不被截断
      }
    }
}
</style>
