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
import { getArticle } from '@/api/user'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { FlyControls } from 'three/examples/jsm/controls/FlyControls' // 控制器
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls' // 控制器
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer' // 控制器
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass' // 控制器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass' // 控制器
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader' // 控制器
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
  
var type = 'add', time;
let scene, camera, render, mirrorCubeCamera, controler, composer,sweepingLightShader,shaderPass, flyControls, trackballControls, clock = new THREE.Clock();;
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
    async getArticleList() {
      const params = {
        size: 10,
        current: 1
      }
      const { data,code } = await getArticle(params)
      if(code === 200) {
        this.list = data.records
        this.total = data.total
        this.image = this.list[0].image_uri
      }
    },
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
        let Octahedron = new THREE.OctahedronGeometry(10, 0);
        let OctahedronMesh = new THREE.Mesh(Octahedron, new THREE.MeshPhysicalMaterial({
            color: '#bbaaff',
            wireframe: true
        }));
        scene.add(OctahedronMesh)
        OctahedronMesh.position.set(0, 15, 0)

        let geometry1 = new THREE.BoxGeometry(10, 10, 20, 16, 16);
        let box = new THREE.Mesh(geometry1, new THREE.MeshPhysicalMaterial({color: '#41ddaa'}));
        scene.add(box)
        box.position.set(-30, 5, 0)

        const geometry = new THREE.CircleGeometry(150, 164);
        let plane = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({color: '#ffffff'}));
        plane.rotation.x = -Math.PI/2;
        scene.add(plane)

        let geometry2 = new THREE.SphereGeometry(10, 32, 32);
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { 
          format: THREE.RGBFormat, 
          generateMipmaps: true, 
          minFilter: THREE.LinearMipmapLinearFilter
        } );
        let mirrorCubeCamera = new THREE.CubeCamera( 10, 6000, cubeRenderTarget );
        let sphere = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ envMap: cubeRenderTarget.texture}));
        scene.add(sphere, mirrorCubeCamera)
        sphere.position.set(30, 10, 0)
        mirrorCubeCamera.position.copy(sphere.position)
        mirrorCubeCamera.update( render, scene );

    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      let fog = new THREE.Fog(0xff00ff, 1, 1000)
      scene.fog = fog

      camera = new THREE.PerspectiveCamera(45, this.views.clientWidth/this.views.clientHeight, 0.1, 10000)
      camera.position.set(0, 100, 105);
      render = new THREE.WebGLRenderer({antialias: true, alpha: true})
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render.domElement)
      controler = new OrbitControls(camera, render.domElement);
      // trackballControls = new TrackballControls(camera, render.domElement);
      // trackballControls.rotateSpeed = 5
      // flyControls = new FlyControls(camera, render.domElement);
      // flyControls.movementSpeed = 50; //设置移动的速度
      // flyControls.rollSpeed = Math.PI / 50; //设置旋转速度
      // flyControls.autoForward = true;
      // flyControls.dragToLook = false;
      // controler.minPolarAngle = 0; 
      // controler.maxPolarAngle = Math.PI/2;
      // controler.autoRotate = true
      // controler.autoRotateSpeed = 3
      controler.minDistance = 1;
      controler.maxDistance = 800;
      controler.enableDamping = true
      let AmbientLight = new THREE.AmbientLight( 0x888888 );
      scene.add( AmbientLight );
      var DirectionalLight = new THREE.DirectionalLight( 0xeeeeee);
      DirectionalLight.position.set( 0, 50, 0 );
      scene.add( DirectionalLight );
      this.getMesh()
      this.initComposer()
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

      let fxaaShader = new ShaderPass(FXAAShader)
      const pixelRatio = render.getPixelRatio()
      fxaaShader.material.uniforms['resolution'].value.x = 1/(this.views.clientWidth * pixelRatio)
      fxaaShader.material.uniforms['resolution'].value.y = 1/(this.views.clientHeight * pixelRatio)
      composer.addPass(fxaaShader);
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
        composer.render()
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
    this.getArticleList()
    this.init()
    this.animation()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
    }
  },
  destroyed() {
    scene.clear()
    render.dispose()
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
  background: rgb(0, 0, 0.5);
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
