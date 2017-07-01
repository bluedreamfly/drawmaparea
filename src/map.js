import React, { Component } from 'react'
import DrawFence from './drawFence'
import Modal from './Modal'
import './map.css'

const AMap = window.AMap;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSave: false,
      canDrawArea: false,
      visiable: false
    }    
  }
  
  initMap() {
    var map = new window.AMap.Map('container',{
      resizeEnable: true,
      zoom: 10,
      mapStyle: 'dark'
    });
    this.Fence = new DrawFence(map, this);
    this.map = map;
    this.Fence.on('cansave', () => {
      this.setState({
        canSave: true
      })
    })
  }

  drawFence = () => {
    this.Fence.startDraw();
  }

  saveFence = () => {
    this.Fence.saveFence();
    this.setState({
      canDrawArea: true
    })
  }

  addArea = () =>  {
    this.setState({
      visiable: !this.state.visiable
    })
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    let { canSave, canDrawArea, visiable } = this.state;    
    return (
      <div className="main">
        <div id="container" className="map-container">
          <div className="toolbar">
            <button onClick={this.drawFence} className="positive ui button">画围栏</button>
            { canSave && <button onClick={this.saveFence} className="positive ui button">保存围栏</button> }
            { canDrawArea && <div className="area-buttons">
              <button className="positive ui button" onClick={this.addArea}>添加区域</button>
              <button className="positive ui button">编辑区域</button>
              <button className="positive ui button">保存</button>
              <button className="positive ui button">舍弃</button>
              <button className="positive ui button">修改区域名称</button>
              <button className="negative ui button">删除区域</button>
            </div>}
          </div>
        </div>
        <Modal visiable={visiable}/>
      </div>
    )
  }
}