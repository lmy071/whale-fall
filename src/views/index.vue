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
const cardList = ref([ // 模拟数据
  {
    color:  '#FCCF0A',
    height: '100px',
		index: 999,
		title:"备忘录",
		url:'/vvv/todoList'
  }
])
const list: { [key: string]: any }[] = Array.from({ length: 100 }, (_, index) => ({  
	color: generateLightHexColor(),
	height: generateRandomNumberBetween(60,200)+'px',
	id:index
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
