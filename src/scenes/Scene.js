import React, { Component } from "react";
import Sketch from "react-p5";
const FPS = 60
const objects = [{
    "id":"id1",
    "type":"ellipse",
    "alive": [0,3],
    "dead":[2,5],
    "keyFrames":{
        "0":{"x":0, "y":0,"rx":70, "ry":70},
        "2": {"x":50, "y":700,"rx":20, "ry":20},
        "5": {"x":50, "y":50,"rx":30, "ry":10}
    },
    "startAt":5    
}]    
const calculateVelocity = (pixels, milisec, fps)=>{
  // factor de conversio -> 1f * (1s/[fps]f) * 1000ms/1s * [pixels]/[milisec]
  if (fps==0) fps=FPS
  return (1000*pixels)/(FPS*milisec)
}
export default class Renderer extends Component {
    params = {
      x:35,
      y:window.innerHeight-35,
      rx: 70,
      ry: 70
    }
    changePosition = (zf, z0, z_name, bars)=>{
      this.params[z_name]-=calculateVelocity(zf - z0, bars*this.props.milisec)
    }
    setup = (p5, canvasParentRef) => {
      p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
      p5.frameRate(60)
    };
    draw = p5 => {
      p5.background(0);
      p5.ellipse(this.params.x, this.params.y, this.params.rx, this.params.ry);
      // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
      let y = calculateVelocity(window.innerHeight-35,5*this.props.milisec, p5.frameRate())
      this.changePosition(window.innerHeight-35, 35, 'y', 5)
      this.changePosition(5, 70, 'ry', 3)
      
      //this.x+=(1-this.props.bar%2)*2-1;
    };
   
    render() {
      return <Sketch setup={this.setup} draw={this.draw} />;
    }
  }
  