export function generateRandomNumberBetween(min: number, max: number): number {  
  if (min >= max) {  
    throw new Error('min must be less than max');  
  }  
  // 生成一个介于0（包括）和max-min（不包括）之间的随机数  
  // 然后加上min，确保结果介于min和max之间（包括min和max）  
  return Math.floor(Math.random() * (max - min + 1)) + min;  
} 