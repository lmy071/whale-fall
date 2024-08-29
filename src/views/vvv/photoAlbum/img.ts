import { gitee } from "../../../utils/urlContort"
const list: HTMLImageElement[] = []

const imgUrl = [
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
    'mhy/1.jpg',
]


const addImg = (url:string)=>{
    let img = new Image();
    img.src = gitee+url;
    img.onload=()=>{
        list.push(img)
    }
}




const getData = ()=>{
    imgUrl.forEach((v)=>{
        addImg(v)
        }
    )
    return list
}

export default getData