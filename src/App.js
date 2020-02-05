import React, {Component} from 'react';
import Scene from './scenes/Scene'
const ppm = 100
const barStructure = [1,4]
const barRatio = 4*barStructure[0]/barStructure[1]
const milisec = barRatio*60000/ppm
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: 0,
      bar:0,
      interval: null,
      nextBarFunc: null
    };
  }
  componentDidMount(){
      document.addEventListener("keydown", this.handleKeyDown);
      this.handleKeyDown({key:' '})
  }
  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
  }
  nextBarFunc = (func)=>{
    this.setState({nextBarFunc:func})
  }
  handleKeyDown = (event) => {
    switch (event.key){
      case ' ': 
        if (this.state.interval){ 
          clearInterval(this.state.interval);
          this.setState({interval: null})
        }else{
          let functionToExecute = ()=> {
            if (this.state.nextBarFunc) this.state.nextBarFunc()
            this.setState((state)=>({bar:state.bar+1, nextBarFunc:null}))
          }
          this.setState({interval: setInterval(functionToExecute,milisec)})
        }
        break
      case 'ArrowRight':
        this.nextBarFunc(()=>this.setState({scene:this.state.scene+1, bar: 0}))
        break
      case 'ArrowLeft':
        this.nextBarFunc(()=>this.setState({scene:this.state.scene-1, bar: 0}))
        break
      case 'Escape':
        this.nextBarFunc(()=>this.setState({interval: null}))
        break
    }
  } 
  render() {
      return (
        <div>
          <div>{this.state.bar} {this.state.scene}</div>
          <Scene bar={this.state.bar} milisec={milisec}/>
        </div>
      
    );
  }
}
