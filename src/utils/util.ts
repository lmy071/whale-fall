import {getDict} from "../api/util"

export const getDictData = async (dictName: string):Promise<any> => {
	const res =	await getDict({dictName})
	return res.data
}

export const  formatDate = (date:Date)=> {  
	let year = date.getFullYear();  

	let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的  
	let day = String(date.getDate()).padStart(2, '0');  

	let hours = String(date.getHours()).padStart(2, '0');  
	let minutes = String(date.getMinutes()).padStart(2, '0');  
	let seconds = String(date.getSeconds()).padStart(2, '0');  

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
}