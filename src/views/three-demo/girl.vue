<template>
  <div class="home">
    <div class="home-view" ref="views"></div>
    <div class="back">
        <el-button @click="$router.go(-1)" type="primary">退 出</el-button>
        <el-button @click="runAniamte" type="primary">转 动</el-button>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/user'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { FlyControls } from 'three/examples/jsm/controls/FlyControls' // 控制器
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls' // 控制器
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // 加载器
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader' // 加载器
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader' // 加载器
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
let scene, camera, render, controler, flyControls, trackballControls, clock = new THREE.Clock();
let mixer, actions;
export default {
  data() {
    return {
      list: [],
      image: '',
      views: null,
      effectList: Effect,
      total: 0,
      animateId: null,
      activeIndex: 'effect7'
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
    getMesh(fragmentShader) {
        // const geometry = new THREE.CylinderGeometry(0.2, 0.2, 100, 16, 16, true);
        // const geometry = new THREE.BoxGeometry(25, 25, 100, 16, 16, 16, true);
        // const geometry = new THREE.CircleGeometry(50, 64);
        const material = new THREE.ShaderMaterial({
              uniforms: {
                  iTime: {
                      value: 0
                  },
                  size: { value: 2 },
                  random: {
                      value: Math.random(),
                  },
                  color: { value: new THREE.Color(0xff00ff) },
                  color1: { value: new THREE.Color(0x00ffff) },
                  iResolution: {
                      value: new THREE.Vector2(1900, 1900)
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
          // let geometry = new THREE.CylinderGeometry(10, 10, 100, 16, 16, true);
        const geometry = new THREE.CircleGeometry(20, 64);
        let plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI/2;
        plane.position.y = 0.1
        return plane;
    },
    linderGeometry(fragmentShader) {
        // const geometry = new THREE.CylinderGeometry(20, 20, 80, 64, 64, true);
        const geometry = new THREE.SphereGeometry(40, 64, 64, true);
        const material = new THREE.ShaderMaterial({
              uniforms: {
                  iTime: {
                      value: 0
                  },
                  size: { value: 2 },
                  color: { value: new THREE.Color(0xff00ff) },
                  color1: { value: new THREE.Color(0x00ffff) },
                  iResolution: {
                      value: new THREE.Vector2(1900, 1900)
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
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 36
        scene.add(mesh)
    },
    objLoader(path, fileName, mtlName) {
        let mtlLoader = new MTLLoader()
        let objLoader = new OBJLoader()
        mtlLoader.setPath(path)
        mtlLoader.load(mtlName, material => {
            objLoader.setMaterials( material )
            objLoader.setPath(path)
            objLoader.load(fileName, (obj) => {
                obj.scale.set(0.2, 0.22, 0.2)
                // obj.children[0].material.wireframe = true
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        iTime: {
                            value: 0
                        },
                        size: { value: 2 },
                        random: {
                            value: Math.random(),
                        },
                        color: { value: new THREE.Color(0xff00ff) },
                        color1: { value: new THREE.Color(0x00ffff) },
                        iResolution: {
                            value: new THREE.Vector2(1900, 1900)
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
                    fragmentShader: Effect.effect39()
                })
                obj.traverse( child => {
                  if(child.isMesh) {
                    child.castShadow = true
                  }
                })
                let newObj = obj.clone()
                newObj.children[0].material = material      
                obj.castShadow = true;
                obj.receiveShadow  = true;
                scene.add(obj, newObj )
            }) 
        })
    },
    fbxLoader(filePath) {
        let fbxLoader = new FBXLoader()
        fbxLoader.load(filePath, obj => {
            mixer = new THREE.AnimationMixer(obj)
            actions = mixer.clipAction(obj.animations[0]);
            actions.play()
            obj.scale.set(0.4,0.6,0.4)
            obj.position.x = -50
            obj.traverse( child => {
              if(child.isMesh) {
                child.castShadow = true
              }
            })
            scene.add(obj)
        })
    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      scene.position.y = -20
      camera = new THREE.PerspectiveCamera(75, this.views.clientWidth/this.views.clientHeight, 0.1, 5000)
      camera.position.set(0, 10, 80);
      render = new THREE.WebGLRenderer({antialias: true, alpha: true})
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      render.shadowMapEnabled = true
      render.shadowMapSoft = true;//关键
      render.shadowMap.type = THREE.PCFSoftShadowMap;//关键
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
      controler.autoRotate = true
      controler.autoRotateSpeed = 5
      controler.minDistance = 1;
      controler.maxDistance = 800;
      controler.enableDamping = true
      let AmbientLight = new THREE.AmbientLight( 0x404040 );
      scene.add( AmbientLight );
      
      var DirectionalLight = new THREE.DirectionalLight( 0xffffff);
      DirectionalLight.position.set( -100, 160, 100 );
      DirectionalLight.shadow.mapSize.width = 2048*4;
      DirectionalLight.shadow.mapSize.height = 2048*4;
      DirectionalLight.castShadow = true;
      DirectionalLight.shadow.camera.near = -512;
      DirectionalLight.shadow.camera.far = 512;
      DirectionalLight.shadow.camera.left = -512;
      DirectionalLight.shadow.camera.right = 512;
      DirectionalLight.shadow.camera.top = -512;
      DirectionalLight.shadow.camera.bottom = 512;
      DirectionalLight.shadow.camera.fov = 10;
      scene.add( DirectionalLight );

      scene.add(this.getMesh(Effect[this.activeIndex]()))
      this.linderGeometry(Effect.effect39())
      this.setPlane()
    },
    setPlane() {
      // const material = new THREE.ShaderMaterial({
      //     uniforms: {
      //         iTime: {
      //             value: 0
      //         },
      //         size: { value: 2 },
      //         random: {
      //             value: Math.random(),
      //         },
      //         color: { value: new THREE.Color(0xff00ff) },
      //         color1: { value: new THREE.Color(0x00ffff) },
      //         iResolution: {
      //             value: new THREE.Vector2(1900, 1900)
      //         },
      //         iChannel0: {
      //             value: window.iChannel0
      //         },
      //         iChannel1: {
      //             value: window.iChannel1
      //         },

      //     },
      //     side: 2,
      //     depthWrite: false,
      //     transparent: true,
      //     vertexShader: vertexShader,
      //     fragmentShader: Effect.effect21()
      // })
      const material = new THREE.MeshPhongMaterial({color: 0xddccaa})
      let stage = new THREE.CircleGeometry(300, 128)
      let plane = new THREE.Mesh(stage, material)
      plane.rotation.x = -Math.PI/2
      plane.position.y = -0.01
      plane.receiveShadow = true;
      scene.add(plane)
    },
    runAniamte() {
        controler.autoRotate = !controler.autoRotate
        if(!!actions) {
            actions.paused ? actions.play() : actions.stop()
            actions.paused = !actions.paused
        }
    },
    animation() {
        render.render(scene,camera)
        let delta = clock.getDelta()
        controler.update(delta)
        if(mixer) mixer.update(delta)
        const elapsedTime = clock.getElapsedTime()
        // Update passes
        scene.traverse((child) => {
            if(child.material && child.material.uniforms){
                child.material.uniforms.iTime.value = elapsedTime
            }
        })
        this.animateId = requestAnimationFrame(this.animation);
    }
  },
  mounted() {
    this.getArticleList()
    this.init()
    this.objLoader('./obj/mm/', 'file.obj', 'file.mtl')
    // this.objLoader('./obj/', 'ln.obj', 'ln.mtl')
    // this.fbxLoader('./fbx/mn.FBX')
    this.fbxLoader('./fbx/xmm/xmm.FBX')
    this.animation()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
    }
  },
  destroyed() {
    scene.clear()
    cancelAnimationFrame(this.animateId)
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
  background: rgba(0, 0, 0, 1);
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
.back, .run {
  position: absolute;
  bottom: 10px;
  right: 50%;
  z-index: 99;
  transform: translateX(50%);
  display: flex;
}
</style>
