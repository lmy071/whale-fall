export function generateLightHexColor(): string {
  // 定义一个生成随机数的辅助函数，范围在min到max之间
  const randomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // 生成三个分量的随机数，每个分量的范围设置在较高的区间内，以生成浅色
  const r = randomInRange(180, 254).toString(16).padStart(2, '0'); // R分量的范围
  const g = randomInRange(180, 254).toString(16).padStart(2, '0'); // G分量的范围
  const b = randomInRange(180, 254).toString(16).padStart(2, '0'); // B分量的范围

  // 返回生成的16进制颜色值
  return `#${r}${g}${b}`;
}

// 使用函数生成一个随机浅色
console.log(generateLightHexColor());