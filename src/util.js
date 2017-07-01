/**
 * 工具类
 */

//随机生成id
const generatorId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


//计算两点之间的斜率
const getSlope = (p1, p2) => {

  if (p1.lat - p2.lat == 0) {
    return { value: p1.lat, slope: null } 
  } 

  if (p1.lng- p2.lng == 0) {
    return { value: p1.lng, slope: 0 }
  }

  return {
    value: null,
    slope: (p1.lng - p2.lng) / (p1.lat - p2.lat)
  }
}

//获取垂直线段与正常线段的焦点
export const getIntersect = (k, x, p) => {

  let b = p.lng - k.slope * p.lat;
  let intersectX = x;
  let intersectY = k.slope * intersectX + b;

  return { 
    intersectX, 
    intersectY
  }
}


//判断两条线段之间是否相交
const twoLineIsIntersect = (line1, line2) => {
  let [p1, p2] = line1;
  let [p3, p4] = line2;
  let k1 = getSlope(p1, p2);
  let k2 = getSlope(p3, p4);

  let b1, b2, intersectX, intersectY;

  if (k1 !== null && k2 !== null) {
    b1 = p1.lng - k1.slope * p1.lat;
    b2 = p3.lng - k2.slope * p3.lat;
    intersectX = (b2 - b1) / (k1.slope - k2.slope);
    intersectY = k1.slope * intersectX + b1;
  } else {
    if(k1 === null && k2 ===null) {
      return false;
    } else {
      let obj;
      if(k1 === null) {
        obj = getIntersect(k2, p1.lat, p3)
      } else {
        obj = getIntersect(k1, p3.lat, p1);
      }
      intersectX = obj.intersectX;
      intersectY = obj.intersectY;
    }
  }

  if (intersectX >= Math.min(p1.lat, p2.lat) &&
     intersectX <= Math.max(p1.lat, p2.lat) &&
     intersectX >= Math.min(p3.lat, p4.lat) && 
     intersectX <= Math.max(p3.lat, p4.lat) && 
     intersectY >= Math.min(p1.lng, p2.lng) &&
     intersectY <= Math.max(p1.lng, p2.lng) &&
     intersectY >= Math.min(p3.lng, p4.lng) && 
     intersectY <= Math.max(p3.lng, p4.lng)) {
    return true;
  }  
  return false;
}


export default {
  generatorId,
  getSlope,
  twoLineIsIntersect
}