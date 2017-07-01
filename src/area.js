/*
  区域类
*/ 
 
class Fence {
  
  constructor(id) {
    this.id = id;
    this.areas = [];
  }
  
  initAreas(areas) {
    this.areas = areas;
  }

  addArea(area) {
    this.areas.push(area);
  } 
  
  delArea(id) {
    let index = this.findArea(id);
    if(index > -1) {
      this.areas.splice(index, 1);
    }
  }
  
  //获取区域信息
  getArea(id) {
    let index = this.findArea(id);
    if (index > -1) {
      return this.areas[index];
    } 
    return null;
  }
  
  //根据当前区域多边形对象来获取
  getAreaByPolygon(polygon) {
    let index = this.findArea(polygon);
    if (index > -1) {
      return this.areas[index];
    } 
    return null;
  }
  
  //更新区域信息
  updateArea(id) {

  }
  //根据多边形对象来获取
  findAreaByPolygon(polygon) {
    return this.findArea(polygon, 'polygon');
  }

  //通过id来搜索
  findAreaById(id) {
    return this.findArea(id, 'id');
  }

  //在一个围栏中根据不同字段搜索一个区域
  findArea(obj, field) {
    for (let i = 0; i < this.areas.length; i++) {
      if (this.areas[i][field] === obj) {
        return i;
      }
    }
    return -1;
  }
}

export default Fence;