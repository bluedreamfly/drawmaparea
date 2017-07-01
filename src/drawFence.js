import util from './util'
import events from 'events'
import FenceArea from './area'

const EventEmitter = events.EventEmitter
class DrawFence extends EventEmitter {

  constructor(map) {
    super();
    this.map = map;
    this.curClickPoint = [];
    this.isStartDraw = false;
    this.fenceLines = [];
    this.polygon = null;
    this.fenceArea = new FenceArea();
    this.initEvent();
  }
  
  initEvent() {
    this.map.on('click', this.drawFence)
  }
  
  startDraw() {
    this.isStartDraw = true;
  } 
  
  //画围栏
  drawFence = (e) => {
    if (this.isStartDraw) {
      let len = this.curClickPoint.length;
      if (len > 0) {
        let newLine = [this.curClickPoint[len - 1], e.lnglat]
       
        if(len > 2 && this.isIntersectExistLine(newLine)) {
          return;
        }

        let polyline = this.createLine(newLine);
        this.fenceLines.push(polyline);
        this.curClickPoint.push(e.lnglat);
        if (this.curClickPoint.length > 2) {
          this.emit('cansave');
        } 
      } else {
        this.curClickPoint = [e.lnglat];
      }
    }
  }
  
  //保存围栏
  saveFence() {
    this.isStartDraw = false;
    this.map.remove(this.fenceLines);
    this.drawFencePolyline();
    this.createFence(this.curClickPoint);
  }

  drawFencePolyline() {
    let points = [...this.curClickPoint, this.curClickPoint[0]];
    points.forEach((point, index) => {
      if (index < points.length - 1) {
        let line = this.createLine([point, points[index + 1]]);
        line.on('click', (e) => {
          console.log('hello world');
        })
      }
    })
  }

  createFence(paths) {
    let polygon = new window.AMap.Polygon({
      path: paths,
      fillColor: '#215342',
      strokeColor: 'blue',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillOpacity: 0.6,
      bubble: true
    });
    this.polygon = polygon;
  }

  //判断是否相交于当前存在的线
  isIntersectExistLine(curLine) {
    let points = this.curClickPoint;
    for (let i = 0; i < points.length - 2; i++) {
      if (util.twoLineIsIntersect([points[i], points[i + 1]], curLine)) {
        console.log('相交啦')
        return true;
      }
    }
    return false;
  }

  createLine(line) {
    let polyline = new window.AMap.Polyline({
      map: this.map,
      lineJoin: 'bevel',
      path: line,
      strokeColor: '#548594', //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 4, //线宽
      strokeStyle: 'solid', //线样式
      strokeDasharray: [10, 5] //补充线样式
    });
    return polyline;
  }

}

export default DrawFence;