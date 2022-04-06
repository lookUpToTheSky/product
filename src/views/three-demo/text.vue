<template>
  <div class="home">
    <div class="home-view" ref="views"></div>
    <div class="back">
        <el-button @click="$router.go(-1)" type="primary">退 出</el-button>
        <el-button @click="start" type="primary">重新开始</el-button>
    </div>
    <audio src="@/assets/10.wav" muted="muted" ref="audio" autoplay loop></audio>
  </div>
</template>

<script>
import { getArticle } from '@/api/user'
import TWEEN from 'tween'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader' // 加载器
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry' // 加载器
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer' // 控制器
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass' // 控制器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass' // 控制器
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader' // 控制器
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass' // 控制器


import Effect from '@/utils/effect.js'
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
let scene, camera, render, controler, clock = new THREE.Clock();
let composer;
export default {
  data() {
    return {
      list: [],
      image: '',
      views: null,
      effectList: Effect,
      total: 0,
      times: null,
      activeIndex: 'effect35'
    }
  },
  methods: {
     // 使用canvas创建纹理
    generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;

        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width/1.5);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,10,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        return texture;
    },
    getMesh(fragmentShader) {
          const material = new THREE.ShaderMaterial({
              uniforms: {
                  iTime: {
                      value: 0
                  },
                  size: { value: 2 },
                  random: {
                      value: Math.random(),
                  },
                  color: { value: new THREE.Color(0x419cdd) },
                  color1: { value: new THREE.Color(0x00ffff) },
                  iResolution: {
                      value: new THREE.Vector2(800, 800)
                  },
                  iChannel0: {
                      value: window.iChannel0
                  },
                  iChannel1: {
                      value: window.iChannel1
                  },

              },
              side: 2,
              depthWrite: false,
              transparent: true,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader
          })
          const geometry = new THREE.CircleGeometry(100, 32, 32);
          let Octahedron = new THREE.OctahedronGeometry(10, 0);

          let OctahedronMesh = new THREE.Line(Octahedron, new THREE.LineBasicMaterial({color: 0x41ddcc}));
          OctahedronMesh.position.y = -60;

          let plane = new THREE.Mesh(geometry, material);
          plane.rotation.x = Math.PI/2
          plane.position.y = -50
          scene.add(plane, OctahedronMesh)
    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, this.views.clientWidth/this.views.clientHeight, 0.1, 10000)
      camera.position.set(0, -60, 360);
      render = new THREE.WebGLRenderer({ alpha: true })
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render.domElement)
      controler = new OrbitControls(camera, render.domElement);
      controler.minDistance = 1;
      controler.maxDistance = 800;
      controler.enableDamping = true
      // let AmbientLight = new THREE.AmbientLight( 0xffffff );
      // scene.add( AmbientLight );
      // var DirectionalLight = new THREE.DirectionalLight( 0xffffff);
      // DirectionalLight.position.set( 0, 50, 0 );
      // scene.add( DirectionalLight );
      this.getMesh(Effect[this.activeIndex]())
      this.initComposer()
    },
    initComposer() {
      composer = new EffectComposer(render)
      composer.addPass(new RenderPass(scene, camera))

      let bloomPass = new UnrealBloomPass()
      composer.addPass(bloomPass)

      bloomPass.strength = 3.2
      bloomPass.radius = 0.5
      bloomPass.threshold = 0

      // let glitchPass = new GlitchPass()
      // composer.addPass(glitchPass)

      // let dots = new AfterimagePass()
      // composer.addPass(dots)
      // dots.uniforms.damp.value = 0.82
      
      let fxaaShader = new ShaderPass(FXAAShader)
      const pixelRatio = render.getPixelRatio()
      fxaaShader.material.uniforms['resolution'].value.x = 1/(this.views.clientWidth * pixelRatio)
      fxaaShader.material.uniforms['resolution'].value.y = 1/(this.views.clientHeight * pixelRatio)
      composer.addPass(fxaaShader);
    },
    // 创建粒子系统
    createPointCloud(geometry) {
        var material = new THREE.MeshBasicMaterial({
            map: this.generateSprite(),
            blending: THREE.AdditiveBlending,
            depthTest: false
        });
        var cloud = new THREE.Mesh(geometry, material);
        cloud.sortParticles = true;
        return cloud;
    },
    // 文字生成
    createText(number) {
        number = number.toString()
        new FontLoader().load('../font/helvetiker_regular.typeface.json', (text) => {
            var gem = new TextGeometry(number, {
                size: 40, //字号大小，一般为大写字母的高度
                height: 5, //文字的厚度
                weight: 'normal', //值为'normal'或'bold'，表示是否加粗
                font: text, //字体，默认是'helvetiker'，需对应引用的字体文件
                style: 'normal', //值为'normal'或'italics'，表示是否斜体
                bevelThickness: 2, //倒角厚度
                bevelSize: 2, //倒角宽度
                curveSegments: 32,
                bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切
            });
            gem.center();
            let obj = this.createPointCloud(gem)
            obj.position.y = 50
            scene.remove(scene.getObjectByName('text'))
            obj.name = 'text'
            scene.add(obj);

            let tween = new TWEEN.Tween(obj.scale).to({x: 1.5, y: 1.5, z: 1.5}, 200)
            tween.start() 
            let tween1 = new TWEEN.Tween(obj.position).to({x: 0, y: 0, z: 0}, 200)
            tween1.start() 

        });
    },
    start() {
      this.$refs.audio.volume = 1.0
      this.$refs.audio.play()
      let count = 10
      if(!!this.times){
        clearInterval(this.times)
        this.$refs.audio.currentTime = 0
      }
      this.times = setInterval(() => {
        if(count === 0) {
          this.createText('hello world !')
          clearInterval(this.times)
          this.times = null
          this.$refs.audio.pause()
          this.$refs.audio.currentTime = 0
        }else{
          this.createText(count)
          count--
        }
      }, 1000)
    },
    animation() {
        let delta = clock.getDelta()
        controler.update(delta)
        TWEEN.update()
        composer.render()
        const elapsedTime = clock.getElapsedTime()
        scene.traverse((child) => {
            if (child.material){
                if(child.material.uniforms) {
                    child.material.uniforms.iTime.value = elapsedTime 
                }
            }
        })
        requestAnimationFrame(this.animation);
    }
  },
  mounted() {
    this.init()
    this.animation()
    this.start()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
    }
  },
  destroyed() {
    scene.clear()
    render.dispose()
    clearInterval(this.times)
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
  /* background: rgb(0, 0, 0.5); */
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

