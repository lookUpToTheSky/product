<template>
  <div class="home">
    <div class="home-view" ref="views"></div>
    <ul class="effect-list">
      <li v-for="(item, k) in shaderList" :key="k">
        <el-button :plain="activeIndex !== k" size="mini" type="success" @click="setNewShader(item, k)">{{k}}</el-button>
      </li>
    </ul>
    <el-button @click="$router.go(-1)" class="back" type="primary">退 出</el-button>
  </div>
</template>

<script>
import * as THREE from 'three'
import Event from 'object3d-events'
// import Event from '@/utils/object3DEvent.js'
// import { Text3DRenderer, Text3D, Text3DS } from 'three-3d-text'
import { Text3DRenderer, Text3D, Text3DS } from '@/utils/object3DText.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer' // 控制器
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass' // 控制器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass' // 控制器
import { SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader } from 'three/examples/jsm/shaders/SMAAShader' 
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass' 
import Shader from '@/utils/shader.js'
const vertexShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() { 
        vUv = uv; 
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
    vPosition = position;
    }
`;
  
var type = 'add', time, objectEvent;
let scene, camera, render,textRenderer, mirrorCubeCamera, controler, composer,sweepingLightShader,shaderPass, flyControls, trackballControls, clock = new THREE.Clock();;
export default {
  name: 'shader',
  data() {
    return {
      list: [],
      image: '',
      views: null,
      shaderList: Shader,
      total: 0,
      activeIndex: 'shader1'
    }
  },
  methods: {
     // 使用canvas创建纹理
    generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;

        var context = canvas.getContext('2d');
        var gradient = context.createLinearGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(11,255,255,0.2)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 1);
        return texture;

    },
    getMesh(fragmentShader) {
        let Octahedron = new THREE.OctahedronGeometry(40, 0);
        let OctahedronMesh = new THREE.Mesh(Octahedron, new THREE.MeshPhysicalMaterial({
            color: '#bbaaff',
            wireframe: false
        }));
        // scene.add(OctahedronMesh)
        OctahedronMesh.position.set(0, 15, 120)
        
        
        let geometry1 = new THREE.BoxGeometry(80, 80, 120, 16, 16);
        let box = new THREE.Mesh(geometry1, new THREE.MeshPhysicalMaterial({color: '#41ddaa'}));
        // scene.add(box)
        box.position.set(-30, 5, 0)
        
        const group = new THREE.Group()
        group.add(OctahedronMesh, box)

        box.on('hover', (obj, t) => {
          t.material.color.set('red')
        }, (obj, t) => {
          t.material.color.set('green')
        })
        scene.add(group)

        const geometry = new THREE.CircleGeometry(250, 164);
        let plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: '#00ccdd'}));
        plane.rotation.x = -Math.PI/2;
        scene.add(plane)

        let geometry2 = new THREE.SphereGeometry(30, 32, 32);
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { 
          format: THREE.RGBFormat, 
          generateMipmaps: true, 
          minFilter: THREE.LinearMipmapLinearFilter
        } );
        let mirrorCubeCamera = new THREE.CubeCamera( 30, 12000, cubeRenderTarget );
        let sphere = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ envMap: cubeRenderTarget.texture}));
        scene.add(sphere, mirrorCubeCamera)
        sphere.position.set(80, 30, 0)
        mirrorCubeCamera.position.copy(sphere.position)
        mirrorCubeCamera.update( render, scene );
    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      // scene.background = new THREE.Color(0x000000)
      let fog = new THREE.Fog(0xffffff, 1, 1000)
      scene.fog = fog

      camera = new THREE.PerspectiveCamera(75, this.views.clientWidth/this.views.clientHeight, 1, 10000)
      camera.position.set(0, 300, 400);

      objectEvent = new Event(this.views, scene, camera) //事件初始化

      render = new THREE.WebGLRenderer({antialias: true, alpha: true})
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render.domElement)
      controler = new OrbitControls(camera, render.domElement)
      controler.minDistance = 350;
      controler.maxDistance = 800;
      controler.enableDamping = true
      let AmbientLight = new THREE.AmbientLight( 0x888888 );
      scene.add( AmbientLight );
      var DirectionalLight = new THREE.DirectionalLight( 0xeeeeee);
      DirectionalLight.position.set( 0, 50, 0 );
      scene.add( DirectionalLight );
      this.getMesh()
      this.initComposer()
      textRenderer = new Text3DRenderer()
      this.views.appendChild(textRenderer.domElement)
      textRenderer.setSize(this.views.clientWidth, this.views.clientHeight)
      textRenderer.domElement.style.background = '#000'

      const element = document.createElement('div')
      element.className = 'text3D'
      
      const text = document.createElement('div')
      text.className = 'text'
      text.innerText = '中华人民共和国万岁'
      element.appendChild(text)
      
      const text2 = document.createElement('div')
      text2.className = 'text2'
      text2.innerText = '中国人民万岁'
      element.appendChild(text2)

      let ele1 = element.cloneNode(true)
      let obj1 = new Text3D(ele1, 120, 40)
      obj1.position.x = 80
      scene.add(obj1)
      let ele2 = element.cloneNode(true)
      let obj2 = new Text3DS(ele2, 120, 40)
      
      obj2.position.x -= 80
      scene.add(obj2)

      obj1.on('click', () => {
        ele1.style.color = element.style.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*225)})`
      })

      obj2.on('click', () => {
        ele2.style.color = element.style.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*225)})`
      })
    },
    initComposer() {
        sweepingLightShader = new THREE.ShaderMaterial({
            uniforms: {
                iTime: {
                    value: 0
                },
                tDiffuse: {type: "t", value: null},
                size: { value: 2 },
                random: {
                    value: Math.random(),
                },
                color: { value: new THREE.Color(0xff00ff) },
                iResolution: {
                    value: new THREE.Vector2(800, 800)
                },
                iChannel0: {
                    value: window.iChannel0
                },
                iChannel1: {
                    value: window.iChannel1
                }
            },
            side: 2,
            depthWrite: false,
            transparent: true,
            vertexShader: vertexShader,
            fragmentShader: Shader[this.activeIndex]()
        })
      composer = new EffectComposer(render)
      composer.addPass(new RenderPass(scene, camera))

      shaderPass = new ShaderPass(sweepingLightShader)
      composer.addPass(shaderPass);

      let fxaaShader = new SMAAPass(SMAAEdgesShader)
      composer.addPass(fxaaShader);
    },
    setSkyBox(type) {
      var loader = new THREE.TextureLoader();
      var skyBox = new THREE.BoxGeometry(5000,5000,5000);
      var rootPath = './images/';
      var imgNameArr = ['_posx','_negx','_posy','_negy','_posz','_negz'];
      var format = '.jpg';
      var materialArr = [];
      for(let i=0; i< imgNameArr.length;i++) {
        materialArr.push(new THREE.MeshBasicMaterial({
          map:loader.load(rootPath+type+imgNameArr[i]+format),
          side: THREE.DoubleSide,
          fog: false
        }));
      }
      const sky = new THREE.Mesh(skyBox, materialArr);
      scene.add(sky);
    },
    setNewShader(shader, k) {
      this.activeIndex = k
      sweepingLightShader = new THREE.ShaderMaterial({
            uniforms: {
                iTime: {
                    value: 0
                },
                tDiffuse: {type: "t", value: null},
                size: { value: 2 },
                random: {
                    value: Math.random(),
                },
                color: { value: new THREE.Color(0xff00ff) },
                iResolution: {
                    value: new THREE.Vector2(800, 800)
                },
                iChannel0: {
                    value: window.iChannel0
                },
                iChannel1: {
                    value: window.iChannel1
                }
            },
            side: 2,
            depthWrite: false,
            transparent: true,
            vertexShader: vertexShader,
            fragmentShader: shader()
        })
        composer.removePass(shaderPass);
        shaderPass = new ShaderPass(sweepingLightShader)
        composer.addPass(shaderPass);
    },
    // 创建粒子系统
    createPointCloud(geometry) {
        var material = new THREE.PointsMaterial({
            color: 0xffff00,
            size: 2,
            transparent: true,
            map: this.generateSprite(),
            blending: THREE.AdditiveBlending,
            depthTest: false
        });
        var cloud = new THREE.Points(geometry, material);
        // cloud.sortParticles = true;
        return cloud;
    },
    animation() {
        let delta = clock.getDelta()
        controler.update(delta)
        const elapsedTime = clock.getElapsedTime()
        composer.render(scene, camera)
        textRenderer.render( scene, camera )
	      if(mirrorCubeCamera) mirrorCubeCamera.updateCubeMap( render, scene );
        time = sweepingLightShader.uniforms[ 'iTime' ].value;
        if(time > 1.0){
            type = 'reduce'
        }else if(time < -1.0){
            type = 'add';
        }
        if(type =='add'){
            sweepingLightShader.uniforms[ 'iTime' ].value += 0.01;
        }else{
            sweepingLightShader.uniforms[ 'iTime' ].value -= 0.01;
        }
        requestAnimationFrame(this.animation);
    }
  },
  mounted() {
    this.init()
    this.animation()
    this.setSkyBox('sea')
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
      objectEvent.resize()
      textRenderer.setSize(this.views.clientWidth, this.views.clientHeight)
      
    }
  },
  destroyed() {
    scene.clear()
    render.dispose()
    objectEvent.removeAll()
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
} 
.home-view {
  width: 100%;
  height: 100%;
}
.effect-list {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  overflow: auto;
  height: 100vh;
}
li > button {
  padding: 2px 5px;
  font-size: 14px;
  margin-bottom: 2px;
}
.back {
  position: absolute;
  bottom: 10px;
  right: 50%;
  z-index: 99;
  transform: translateX(50%);
}
</style>
<style lang="scss">
.text3D {
  line-height: 20px;
  font-size: 12px;
  background: linear-gradient(to bottom, #728c9e, #0783e9);
  border: 1px solid #0151c9;
  color: #fff;
}  
</style>

