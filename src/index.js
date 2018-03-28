import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trophiesFused: new Set(),
      braintree: '#fff'
    };
  }

  componentDidUpdate(prev, next) {

  }

  fuseTrophy = (trophyId) => {
    console.log(trophyId)
    this.setState({trophiesFused: this.state.trophiesFused.add(trophyId), [trophyId]: '#00a0cc'});
  }

  fuseTrophy() {
    console.log('fused!')
  }

  render () {
    console.log(this.state.braintree)
    /* Entity Graveyard
        <Entity id="box"
          class="unfused"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 0, y: 1, z: -3}}
          events={{fusing: this.fuseTrophy.bind(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>
                <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

    */
    
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="material/paper.jpg"/>
        </a-assets>
 
        <Entity obj-model='obj: models/crowd-favorite.obj;'
                material={{color: '#de7e00'}}
                class="unfused"
                scale="0.05 0.05 0.05" 
                position={{x: 0, y: 0, z: -5}}
                rotation="-90 0 0"
                events={{fusing: this.fuseTrophy.bind(this)}}>
            <a-animation begin="fusing" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="3 3 3" to="0.1 0.1 0.1"></a-animation>
        </Entity>
        <Entity obj-model='obj: models/braintree.obj;'
            material={{color: this.state.braintree}}
            className="unfused"
            scale="0.05 0.05 0.05" 
            position={{x: 0, y: 0, z: 5}}
            rotation="-90 90 90"
            events={{fusing: () => this.fuseTrophy('braintree')}}>
          <a-animation 
            animationstart=""
            direction="alternate-reverse"
            begin="fusing" 
            attribute="rotation" 
            fill="both" 
            easing="linear" 
            dur="5000" 
            to="-90 450 90"
            repeat="10">
          </a-animation>
        </Entity>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>

        <Entity primitive="a-camera">
          <a-cursor raycaster="objects: .unfused" fuse="true" fuse-timeout="10000">
            <a-animation begin="fusing" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="3 3 3" to="0.1 0.1 0.1"></a-animation>
          </a-cursor>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
