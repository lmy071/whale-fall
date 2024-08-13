<script setup lang="ts">
import { onMounted } from 'vue';
import getImgData from './img.ts'

type imgDataT = { img: HTMLImageElement; x: number; y: number;w: number; h: number; }

// canvas对象容器
let canvas: HTMLCanvasElement | null = null
// canvas 2d上下文
let content: CanvasRenderingContext2D | null = null
// 图片的总数
let img_total = 99
// 图片排列的总列数
let row_max = 7
// 图片排列的总行数
let line_max = 4
// 源图片的实际宽高，这里因为图片太大，会占据画布太多位置，故除以一个数让其缩小
let img_width = 350
let img_height = Math.floor(1000 / 2)
// 图片间的上下左右间距
let img_margin = 5
// 所有图片纵横排列之后的总宽高，用作图片超出范围的界限判定
let total_width = 0
let total_height = 0
// 图片数据，用以储存每张图片的源以及xy坐标位置
let img_data: imgDataT[] = []
// 当前画布是否可以移动
let if_movable = false
let imgOriginData:HTMLImageElement[] = []

const init = () => {
	canvas = document.querySelector(".photo-box");
	if (!canvas) return
	content = canvas.getContext("2d");
	// 总宽度等于横向排列的所有图片的宽度和间隔相加，最后一张图片没有右间隔，故需要减去一个间隔，总高度同理
	total_width = row_max * (img_width + img_margin) - img_margin;
	total_height = line_max * (img_height + img_margin) - img_margin;
	resize();
	create_events();
	create_img_data();
}

const resize = () => {
	if (!canvas) return
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	// 修改canvas宽高之后，画布内容会被清除，故需要调用一次move_imgs函数，重新生成所有图片
	if (img_data) move_imgs(0, 0)
}

const create_img_data = () => {
	img_data = [];
  imgOriginData = getImgData()
	for (let i = 0; i < imgOriginData.length; i++) {
		const img = imgOriginData[i]
    // img.src=  gitee + 'mhy/1.jpg'
		
		// 当图片加载完成之后，创建对应图片数据并添加到img_data中
		img.onload = () => {
      img.height = img.height * img_width / img.width
      img.width = img_width
			// 计算该序号图片处于第几行第几列
			let col_index = i % row_max;
			let line_index = Math.floor(i / row_max);
			// 通过行列序号算出xy坐标
			let x = col_index * (img_width + img_margin);
			let y = line_index * (img_height + img_margin);
			// 将其添加到img_data中
			img_data.push({ img, x, y,w: img_width, h: img_height });
			// 创建完成之后就绘制一次，确保在进入页面的时候，图片会全部显示
			content && content.drawImage(img, x, y, img.width, img.height);
		};
		
	}
}



const create_events = () => {
	if (!canvas) return
	window.addEventListener("resize", () => {
		resize();
	});
	// 当鼠标按下时，才可以移动所有图片
	canvas.addEventListener("mousedown", (e) => {
		if_movable = true;
	});
	// 当鼠标弹起时，图片无法被移动，并且调用check_img函数，获取当前鼠标所指向的图片
	canvas.addEventListener("mouseup", (e) => {
		if_movable = false;
		check_img(e.x, e.y);
	});
	// 当鼠标离开选区时，图片无法被移动，
	canvas.addEventListener("mouseleave", () => {
		if_movable = false;
	});
	// 当鼠标移动时，调用move_imgs函数，移动所有图片
	canvas.addEventListener("mousemove", (e) => {
		// if_movable为flase则不可以移动图片，即鼠标未按下时
		if (!if_movable) return 0;
		move_imgs(e.movementX, e.movementY);
	});
}

const move_imgs = (x: number, y: number) => {
	if (!content || !canvas) return
	// 清除content，重新进行绘制
	content.clearRect(0, 0, canvas.width, canvas.height);
	// 遍历所有图片，对每一张图片进行移动，并进行判断
	img_data.forEach((img) => {
		img.x += x;
		// 当图片超出总宽度范围时，将图片移动到最右侧，
		// 注意这里减去一个图片宽度是为了让图片提前位移，防止最左侧的图片出现空白行
		if (img.x > (total_width - img_width))
			img.x -= total_width + img_margin;
		// 当图片小于一个负的图片宽度，即向左超出总宽度范围时，将图片移动到最右侧
		if (img.x < -img_width)
			img.x += total_width + img_margin;
		// 竖向同上
		img.y += y;
		if (img.y > (total_height - img_height))
			img.y -= total_height + img_margin;
		if (img.y < -img_height)
			img.y += total_height + img_margin;
		// 绘制图片，更新画布
		content && content.drawImage(img.img, img.x, img.y, img_width, img_height);
	});
}
const check_img = (x: number, y: number) => {
	// 遍历所有图片，找出鼠标xy坐标处于图片内部的那张图片
	let img = img_data.find(img =>
		x >= img.x && x < img.x + img_width &&
		y >= img.y && y < img.y + img_height
	);
	// 如果存在，则输出
	if (img) console.log(img, img.img);
}

const getImg = ()=>{

}

onMounted(() => {
  getImg()
	init();
})


</script>

<template>
	<canvas class="photo-box"></canvas>
</template>

<style scoped>
.photo-box {
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
  top: 0;
  left: 0;
}
</style>