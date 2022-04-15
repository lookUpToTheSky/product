<template>
  <div class="home">
    <div id="home-view" ref="views"></div>
    <div class="back">
        <el-button @click="$router.go(-1)" type="primary">退 出</el-button>
        <el-button @click="runAniamte" type="primary">转 动</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer' 
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass' 
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass' 
import { SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader } from 'three/examples/jsm/shaders/SMAAShader' 
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass' 
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass' 
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js' 
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect'
import TWEEN from 'tween'
import Effect from '@/utils/effect.js'
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
let scene, camera, render, render1, controler, composer, moveLightShader, clock = new THREE.Clock();
let mixer, actions,scene2,render2
var type = 'add', time;
export default {
  data() {
    return {
      ruleForm: {},
      views: null,
      animateId: null,
      lineList: [
        {start: {x: -80, y: 0, z: -30}, end: {x: 10, y: 0, z: -30}},
        {start: {x: 200, y: 0, z: 60}, end: {x: 10, y: 0, z: -30}},
        {start: {x: -110, y: 0, z: 120}, end: {x: 10, y: 0, z: -30}},
        {start: {x: -110, y: 0, z: -120}, end: {x: 10, y: 0, z: -30}},
        {start: {x: 20, y: 0, z: 220}, end: {x: 10, y: 0, z: -30}}
      ]
    }
  },
  methods: {
    createGeometry({geometry, position,rotation, effect, color, color1, wireframe}) {
        position = position || new THREE.Vector3(0,0,0)
        rotation = rotation || new THREE.Vector3(0,0,0)
        let material = null
        if(!!effect) {
          material = new THREE.ShaderMaterial({
                uniforms: {
                    iTime: {
                        value: 0
                    },
                    time: {
                      value: 0
                    },
                    color: { value: color || new THREE.Color(0xff0000) },
                    color1: { value: color1 || new THREE.Color(0x00ffff) },
                    iResolution: {
                        value: new THREE.Vector2(800, 800)
                    },
                    map: {
                      value: new THREE.ImageUtils.loadTexture('./images/smokeparticle.png')
                    }
                },
                side: 2,
                depthWrite: true,
                transparent: true,
                depthTest: false,
                wireframe: wireframe || false,
                blending: THREE.AdditiveBlending,
                vertexShader: vertexShader,
                fragmentShader: effect()
          })
        }else{
           material = new THREE.MeshBasicMaterial({
                color: color || new THREE.Color(0x00ffff),
                side: 2,
                transparent: true,
                depthTest: false,
                wireframe: wireframe || false,
                blending: THREE.AdditiveBlending,
          })
        }
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x,position.y,position.z )
        mesh.rotation.set(rotation.x,rotation.y,rotation.z)
        scene.add(mesh)
        return mesh
    },
    createEffect() {
      const circle1 = this.createGeometry({
        geometry: new THREE.CircleGeometry(30, 32, 32),
        effect: Effect.effect44,
        color: new THREE.Color(0xff0000),
        position: {x: -200, y: 0, z: 60},
        rotation: {x: Math.PI/2, y: 0, z: 0 }
      })

      const circle2 = this.createGeometry({
        geometry: new THREE.CircleGeometry(25, 32, 32),
        effect: Effect.effect35,
        color: new THREE.Color(0xff00ff),
        position: {x: 10, y: 0, z: -30},
        rotation: {x: Math.PI/2, y: 0, z: 0 },
        wireframe: true
      })

      const sphere = this.createGeometry({
        geometry: new THREE.SphereGeometry(20, 32, 32, 0, Math.PI*2, 0, Math.PI/2),
        effect: Effect.effect39,
        color: new THREE.Color(0x00ffff),
        position: {x: -80, y: 0, z: -30},
        rotation: {x: 0, y: 0, z: 0 }
      })
      
      const Cylinder = this.createGeometry({
        geometry: new THREE.CylinderBufferGeometry( 30, 30, 20, 32 , 32, true),
        effect: Effect.effect42,
        color: new THREE.Color(0xffff00),
        position: {x: -110, y: 10, z: 120},
        rotation: {x: 0, y: 0, z: 0 }
      })

      let tweenA = new TWEEN.Tween(Cylinder.scale).to({x: 2, y: 1, z: 2}, 2000)
      tweenA.start()
      tweenA.onComplete(() => {
        Cylinder.scale.set(0.1, 1, 0.1)
        tweenA.start()
      })
    },
    createPointGeo() {
        const geometryList = [
          { 
            geometry: new THREE.OctahedronGeometry( 3 ),
            color: new THREE.Color(0xffff00),
            position: {x: 10, y: 15, z: 120},
            time: 1000,
            text: '侯家塘'
          },
          { 
            geometry: new THREE.OctahedronGeometry( 5 ),
            color: new THREE.Color(0xff0000),
            position: {x: 100, y: 15, z: 180},
            time: 1500,
            text: '湘江中路'
          },
          { 
            geometry: new THREE.CylinderBufferGeometry( 5, 0, 10, 4 , 1),
            color: new THREE.Color(0xff00ff),
            position: {x: -20, y: 15, z: -120},
            time: 1200,
            text: '五一广场'
          },
          { 
            geometry: new THREE.CylinderBufferGeometry( 5, 0, 10, 4 , 1),
            color: new THREE.Color(0xddff00),
            position: {x: -100, y: 15, z: 20},
            time: 1000,
            text: '黄兴广场'
          },
          { 
            geometry: new THREE.CylinderBufferGeometry( 5, 0, 10, 4 , 1),
            color: new THREE.Color(0x00ff00),
            position: {x: 150, y: 15, z: 30},
            time: 800,
            text: '橘子洲'
          }
        ]
        geometryList.forEach(item => {
          const { geometry, color, position, time, wireframe, rotation, text} = item
          // 八面体
          const eightGeo = this.createGeometry({
            geometry,
            color,
            position,
            wireframe,
            rotation
          })
          let T1 = new TWEEN.Tween(eightGeo.position).to({ y: 15 }, time)
          let T2 = new TWEEN.Tween(eightGeo.position).to({ y: 20 }, time)
          T1.start()
          T1.chain(T2)
          T2.chain(T1)
          
          let T3 = new TWEEN.Tween(eightGeo.rotation).to({ y: Math.PI*2 }, time*5)
          let T4 = new TWEEN.Tween(eightGeo.rotation).to({ y: 0 }, time*5)
          T3.start()
          T3.chain(T4)
          T4.chain(T3)

          this.createText(text, position)
        })
        
    },
    // 文本
    createText(text, position) {
      let element = document.createElement('div')
      element.className = 'info'
      element.innerText = text
      let obj = new CSS3DObject(element)
      obj.position.set(position.x, position.y + 10, position.z)
      obj.scale.set(0.5, 0.5, 0.5)
      scene.add(obj)
    },
    createLineFly() {
      // 飞线
      this.lineList.forEach( (val, index) => {
        let start = new THREE.Vector3(val.start.x, val.start.y, val.start.z )
        let end = new THREE.Vector3(val.end.x, val.end.y, val.end.z )
        const { curve, mesh } = this.addLines(start, end)
        this.flyLine(curve) 
        scene.add(mesh)
        // var geometry = new THREE.TubeGeometry( curve, 32, 0.25, 4, false );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var mesh1 = new THREE.Mesh( geometry, material );
        // scene.add( mesh1 );
      })
    },
    // 曲线
    addLines( v0, v3 ) {
        var path = new THREE.LineCurve3(v0, v3)
        var p = path.getPoints(120)
        var d = v0.distanceTo( v3 )/3
        var v1 = new THREE.Vector3( p[40].x, p[40].y + d, p[40].z )
        var v2 = new THREE.Vector3( p[80].x, p[80].y + d, p[80].z )

        // 绘制三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3( v0, v1, v2, v3 );
        var geometry = new THREE.BufferGeometry();
        var points = curve.getPoints( 150 );
        var positions = [];
        var colors = [], index = [];
        var color = new THREE.Color();
        /**
         * HSL中使用渐变
         * h — hue value between 0.0 and 1.0
         * s — 饱和度 between 0.0 and 1.0
         * l — 亮度 between 0.0 and 1.0
         */
        for (var j = 0; j < points.length; j ++) {
            // color.setHSL( .31666+j*0.005,0.7, 0.7); //绿色
            color.setHSL( .81666+j*0.0025, 0.88, 0.88); //粉色
            colors.push( color.r, color.g, color.b );
            positions.push( points[j].x, points[j].y, points[j].z );
            index.push(j/(points.length - 1))
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1))
        var matLine = new THREE.LineBasicMaterial( {
            vertexColors: true,
            transparent: true,
            dashed: false
        } );
        return {
          curve,
          mesh: new THREE.Line( geometry, matLine )
        }
    },
    // 路径飞线
    flyLine(curve) {
      var positions = [], index = [], current = [];
      let points = curve.getPoints(5000)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      for (var j = 0; j < points.length; j ++) {
          positions.push( points[j].x, points[j].y, points[j].z );
          index.push(j/(points.length - 1))
          current.push(j)
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1))
      geometry.setAttribute('current', new THREE.Float32BufferAttribute(current, 1))
      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          size: { value: 200 },
          uRange: { value: 400 },
          uTotal: { value: points.length},
          uColor: { value: new THREE.Color(0x00ffff) },
          uColor1: { value: new THREE.Color(0x00ffff) }
        },
        transparent: true,
        depthTest: true,
        side: 2,
        vertexShader: `
        attribute float index;
        attribute float current;
        uniform float size;
        uniform vec3 uColor;
        uniform vec3 uColor1;
        uniform float uRange;
        uniform float uTotal;
        uniform float iTime;
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
           // 需要当前显示的索引  
            float showNumber = uTotal * mod(iTime/2.0, 1.0);
            float s = size;
            if (showNumber > current && showNumber < current + uRange) {
                vOpacity = 1.0;
                s *= (current + uRange - showNumber) / uRange;
            } else {
                vOpacity = 0.0;
                s = 0.0;
            }
            // 顶点着色器计算后的Position
            // mix 混淆颜色
            vColor = mix(uColor, uColor1, index);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition; 
            // 大小
            gl_PointSize = s* 5.0 / (-mvPosition.z);
        }`,
        fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uColor1;
        varying vec3 vColor; 
        varying float vOpacity; 
        void main() {
            gl_FragColor = vec4(vColor, vOpacity);
        }`
      })
      const mesh = new THREE.Points(geometry, material)
      scene.add(mesh)
    },
    // 天空盒
    createSky() {
        const sky = new THREE.Mesh(
          new THREE.SphereGeometry(8000, 64, 64),
          new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            side: THREE.BackSide,
            map: new THREE.ImageUtils.loadTexture('./images/sky.jpg')
          })
        )
        scene.add(sky)
    },
    objLoader(path, fileName, mtlName) {
        let mtlLoader = new MTLLoader()
        let objLoader = new OBJLoader()
        mtlLoader.setPath(path)
        mtlLoader.load(mtlName, material => {
            objLoader.setMaterials( material )
            objLoader.setPath(path)
            objLoader.load(fileName, (obj) => {
                obj.children[0].material.wireframe = false
                scene.add(obj)
            }) 
        })
    },
    fbxLoader(filePath) {
        let fbxLoader = new FBXLoader()
        fbxLoader.load(filePath, obj => {
            mixer = new THREE.AnimationMixer(obj)
            actions = mixer.clipAction(obj.animations[0]);
            actions.play()
            obj.scale.set(0.65,0.65,0.65)
            scene.add(obj)
        })
    },
    loadGeoJson() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', './geojson/cs_city.json', true)
      xhr.onload = () => {
        if(xhr.status === 200) {
          const data = JSON.parse(xhr.response)
          const cityArr = []
          data.features.forEach(item => {
              item.geometry.coordinates.forEach(ele => {
                let shape = new THREE.Shape()
                ele.forEach((val, i) => {
                  let x = val[0], y = val[1];
                  i === 0 ?  shape.moveTo(x, y) : shape.lineTo(x,y)
                })
                let extrudeSettings = { 
                  depth: item.properties.height/20000,
                  curveSegments: 6,
                  bevelEnabled: false
                }
                let Sgeo = new THREE.ExtrudeGeometry( shape, extrudeSettings );
                cityArr.push(Sgeo)
              })
          })
          const mesh = this.meryBuffer(cityArr)
          mesh.rotateX(-Math.PI/2)
          mesh.scale.set(3000,3000,3000)
          mesh.position.y = 10

          scene.add(mesh)
          this.createEffect()
        }
      }
      xhr.send()
    },
    meryBuffer(objects) {
      let geometry = mergeBufferGeometries(objects)
      geometry.center()
      const mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            time: { value: 0 },
            color: { value: new THREE.Color(0x00ffff) },
            color1: { value: new THREE.Color(0x0b1060) },
          },
          side: 2,
          depthWrite: true,
          transparent: false,
          depthTest: true,
          vertexShader: vertexShader,
          fragmentShader: Effect.effect45()
      }))
      return mesh
    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000f12)
      // scene.fog = new THREE.FogExp2(new THREE.Color(0x404040))
      camera = new THREE.PerspectiveCamera(75, this.views.clientWidth/this.views.clientHeight, 1, 10000)
      camera.position.set(0, 30, 290);
      render = new THREE.WebGLRenderer({antialias: true, alpha: true}) //antialias: true, 
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render.domElement)

      render1 = new CSS3DRenderer({alpha: true}) //antialias: true, 
      render1.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render1.domElement)
      render1.domElement.style.position = 'absolute'
      render1.domElement.style.top = 0
      render1.domElement.style.zIndex = 2

      // controler = new OrbitControls(camera, render.domElement)
      controler = new OrbitControls(camera, render1.domElement)
      // controler.autoRotate = true
      // controler.autoRotateSpeed = 5
      controler.minPolarAngle = Math.PI/3; 
      controler.maxPolarAngle = Math.PI/2.1;
      controler.minDistance = 1;
      controler.maxDistance = 400;
      controler.enableDamping = true
      let AmbientLight = new THREE.AmbientLight( 0x404040);
      scene.add( AmbientLight );
      var DirectionalLight = new THREE.DirectionalLight( 0xffffff);
      DirectionalLight.position.set( 0, 850, 300 );
      scene.add( DirectionalLight );

      let geo = new THREE.PlaneGeometry(3000, 3000, 64, 64)
      let plane = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
         color: 0x001060,
         transparent: true,
         opacity: 0.3
      }))
      plane.rotateX(-Math.PI/2)
      plane.position.y = -1.8
      scene.add(plane)
      // this.lineEffect()
    },
    lineEffect() {
      scene2 = new THREE.Scene()
      render2 = new THREE.WebGLRenderer({antialias: true, alpha: true}) //antialias: true, 
      render2.setSize(this.views.clientWidth, this.views.clientHeight)
      outLineRender = new OutlineEffect(render2, {defaultColor: [0, 1.0, 1.0]})
      render2.domElement.style.position = 'absolute'
      render2.domElement.style.top = 0
      render2.domElement.style.zIndex = 1
      this.views.appendChild(render2.domElement)
      
      let AmbientLight = new THREE.AmbientLight( 0x404040);
      scene2.add( AmbientLight );
      var DirectionalLight = new THREE.DirectionalLight( 0xffffff);
      DirectionalLight.position.set( 0, 850, 300 );
      scene2.add( DirectionalLight );
    },
    initComposer() {
      composer = new EffectComposer(render)
      composer.addPass(new RenderPass(scene, camera))

      let bloomPass = new UnrealBloomPass()
      composer.addPass(bloomPass)

      bloomPass.strength = 0.8
      bloomPass.radius = 0.6
      bloomPass.threshold = 0.3

      let smaaShader = new SMAAPass(SMAAEdgesShader)
      composer.addPass(smaaShader)

      moveLightShader = new THREE.ShaderMaterial({
            uniforms: {
                iTime: {
                    value: 0
                },
                tDiffuse: {type: "t", value: 0},
                color: { value: new THREE.Color(0xffffff) },
                iResolution: {
                    value: new THREE.Vector2(1800, 1800)
                }
            },
            side: 2,
            depthWrite: false,
            transparent: true,
            vertexShader: vertexShader,
            fragmentShader: Shader.shader1()
      })
      // let lightShader = new ShaderPass(moveLightShader)
      // composer.addPass(lightShader)
      // 
    },
    initCesium() {
      const viewer = new Cesium.Viewer("home-view",{
        baseLayerPicker: false,  // 影像切换
        animation: false,  //是否显示动画控件
        timeline: false, //是否显示时间线控件
        infoBox: false, //是否显示点击要素之后显示的信息
        geocoder: false, //是否显示地名查找控件
        navigationHelpButton: false, //是否显示帮助信息控件
      });
      Cesium.GeoJsonDataSource.load('cs_city.json').then(data => {
        viewer.dataSources.add(data, {
          stroke: new Cesium.Color(0.0, 0.0, 0.0, 1.0),
          fill: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
          strokeWidth: 3,
          markerSymbol: '?'
        })
        const entities = data.entities.values
        for(let i = 0; i < entities.length; i++) {
          var entity = entities[i]
          entity.polygon.extrudedHeight = entity.properties.height._value
        }
      })
    },
    runAniamte() {
        controler.autoRotate = !controler.autoRotate
    },
    setSkyBox(type) {
      var loader = new THREE.TextureLoader();
      var skyBox = new THREE.BoxGeometry(8000,8000,8000);
      var rootPath = './images/';
      var imgNameArr = ['_posx','_negx','_posy','_negy','_posz','_negz'];
      var format = '.jpg';
      var materialArr = [];
      for(let i=0; i< imgNameArr.length;i++) {
        materialArr.push(new THREE.MeshBasicMaterial({map:loader.load(rootPath+type+imgNameArr[i]+format),side: THREE.DoubleSide}));
      }
      const sky = new THREE.Mesh(skyBox, materialArr);
      scene.add(sky);
    },
    moveLight() {
      time = moveLightShader.uniforms[ 'iTime' ].value;
        if(time > 1.2){
            type = 'reduce'
        }else if(time < -1.2){
            type = 'add';
        }
        if(type =='add'){
            moveLightShader.uniforms[ 'iTime' ].value += 0.008;
        }else{
            moveLightShader.uniforms[ 'iTime' ].value -= 0.008;
        }
    },
    animation() {
        let delta = clock.getDelta()
        controler.update(delta)
        composer.render(scene, camera)
        render1.render(scene, camera)
        // outLineRender.render(scene2, camera)
        TWEEN.update()
        if(mixer) mixer.update(delta)
        const elapsedTime = clock.getElapsedTime()
        // Update passes
        scene.traverse((child) => {
            if(child.material && child.material.uniforms){

                child.material.uniforms.iTime.value = elapsedTime
                
                if(!!child.material.uniforms.time) {
                  if(child.material.uniforms.time.value > 1.0) {
                    child.material.uniforms.time.value = 0.0;
                  }
                  child.material.uniforms.time.value += 0.01;
                }
            }
            
        })
        // this.moveLight()
        this.animateId = requestAnimationFrame(this.animation);
    }
  },
  mounted() {
    this.init()
    this.initComposer()
    this.animation()
    this.createSky()
    this.loadGeoJson()
    this.createLineFly()
    this.createPointGeo()
    this.setSkyBox('dark')
    // this.initCesium()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      render1.setSize(this.views.clientWidth, this.views.clientHeight)
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
#home-view {
  width: 100%;
  height: 100%;
  position: relative;
  /* background: #888; */
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

<style>
.info {
  color: #ec0d0d;
  font-size: 12px;
  padding: 5px 10px;
  box-shadow: 0 0 5px 2px inset rgb(7, 189, 235)
}
</style>
