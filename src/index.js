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
      unfusedTrophies: ['braintree', 'camera'],
      position: 1,
      narrationInProgress: false,
      playParticles: false,
      experienceStarted: false
    };
  }

  begin = () => {
    setTimeout(() => {
      document.querySelector('#begin1').emit('begin');
      document.querySelector('#begin2').emit('begin');
      document.querySelector('#begin3').emit('begin');
      this.setState({experienceStarted: true})
    }, 5000)
  }

  fuseTrophy = (trophyId) => {
    if (!this.state.narrationInProgress) {
      let pos = this.state.position;
      let i = 1;
      // PLAY TROPHY ID MUSIC (HAVE NARRATION IN PROGRESS TRUE, THEN FALSE, it will also EMIT PARTICLES)

      if (!this.state.trophiesFused.has(this.state.unfusedTrophies[pos])) {
        console.log('fading in ', this.state.unfusedTrophies[pos])
        document.querySelector(`#${this.state.unfusedTrophies[pos]}`).emit('fadeIn');
      }

      this.setState({
        trophiesFused: this.state.trophiesFused.add(trophyId),
        position: this.state.position < this.state.unfusedTrophies.length ? this.state.position + 1 : this.state.position,
      });
    }
  }

  render () {

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
                

        <Entity obj-model='obj: models/crowd-favorite.obj;'
                material={{color: '#de7e00', opacity: 0}}
                className="unfused"
                id="crowdfave"
                scale="0.05 0.05 0.05" 
                position={{x: 0, y: 0, z: -5}}
                rotation="-90 0 0"
                events={{fusing: this.fuseTrophy.bind(this)}}>
            <a-animation begin="fusing" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="0 0 0" to="0.05 0.05 0.05"></a-animation>
            <a-animation attribute="material.opacity" begin="fadeIn" to="100"></a-animation>
        </Entity>

    */
    
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="material/sky.jpg"/>
          <img id="skyTexture" src="material/sky.jpg"/>
        </a-assets>

        { this.state.narrationInProgress ? 
          <Entity particle-system={{preset: 'snow', particleCount: 2000}}/> 
       : null }

       { !this.state.experienceStarted ? 
          <Entity 
              id="begin1"
              text={{value: 'These trophies were made by the 2018 Emoticon Fellows! Focus on a trophy to hear its story.', align: 'center'}} 
              position={{x: 0, y: 2, z: -1}}
          >
          <a-animation begin="begin" easing="ease-out" attribute="scale" dur="6000" fill="backwards" from="1 1 1" to="0 0 0"></a-animation>
          </Entity>
        :  null }
        { !this.state.experienceStarted ? 
          <Entity 
            id="begin2"
            text={{value: 'Begin', align: 'center'}} 
            material={{color: '#fff'}}
            position={{x: 0, y: 1.87, z: -1}}
          >
          <a-animation begin="begin" easing="ease-out" attribute="scale" dur="6000" fill="backwards" from="1 1 1" to="0 0 0"></a-animation>
          </Entity>
          
        :  null }
        { !this.state.experienceStarted ? 
          <Entity
            id="begin3"
            className="unfused"
            geometry="primitive: box; width: 0.2; height: 0.08; depth: 0.01;"
            material="shader: flat; side: double; color: #271970; "
            position={{x: 0, y: 1.9, z: -1.1}}
            rotation="0 0 0"
            scale="1 1 1"
            grabbable
            stretchable
            dynamic-body
            events={{fusing: this.begin.bind(this)}}
          >
          <a-animation begin="fusing" easing="ease-in" attribute="scale" dur="2000" fill="forwards" from="1 1 1" to="1.01 1.01 1.01"></a-animation>
          <a-animation begin="begin" easing="ease-out" attribute="scale" dur="5000" fill="backwards" from="1 1 1" to="0 0 0"></a-animation>

          </Entity>
        :  null }


        
        <Entity obj-model='obj: models/braintree.obj;'
            material={{color: '#00a0cc'}}
            className="unfused"
            id="braintree"
            scale="0.1 0.1 0.1" 
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
          <a-animation begin="fadeIn" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="0 0 0" to="0.05 0.05 0.05"></a-animation>
        </Entity>

        <Entity obj-model='obj: models/camera.obj;'
          material={{color: '#de7e00'}}
          className="unfused"
          id="camera"
          scale="0 0 0" 
          position={{x: 12, y: 0, z: 10}}
          rotation="-90 120 90"
          events={{fusing: () => this.fuseTrophy('camera')}}>
          <a-animation begin="fadeIn" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="0 0 0" to="0.1 0.1 0.1"></a-animation>
        </Entity>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>

        <Entity primitive="a-camera">
          <a-cursor raycaster="objects: .unfused" fuse="true" timeout="1000">
            <a-animation begin="fusing" easing="ease-in" attribute="scale" dur="1000" fill="backwards" from="3 3 3" to="0.1 0.1 0.1"></a-animation>
          </a-cursor>
        </Entity>
      </Scene>
    );
  }
}


ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
