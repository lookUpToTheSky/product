<template>
  <div class="earth_home">
    <div class="home-view" ref="views"></div>
    <div class="back">
        <el-button @click="$router.go(-1)" type="primary">退 出</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { dataBJ } from '@/utils/bj.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer' // 控制器
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass' // 控制器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass' // 控制器
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader' // 控制器
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass' // 控制器
import Effect from '@/utils/effect.js'
import TWEEN from 'tween'
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
let scene, camera, render, render1, controler, clock = new THREE.Clock();
let composer;
let map = new THREE.Group(), earthGlow;
export default {
  name: 'effect',
  data() {
    return {
      city: [
        {name: '北京', lon: 116.3, lat: 39.9, rotate: -Math.PI},
        {name: '长沙', lon: 112.58, lat: 28.12, rotate: -Math.PI },
        {name: '上海', lon: 120.52, lat: 30.4, rotate: -Math.PI },
        {name: '重庆', lon: 106.55, lat: 29.57, rotate: -Math.PI },
        {name: '武汉', lon: 114.17, lat: 30.35, rotate: -Math.PI },
        {name: '莫斯科', lon: 37.35, lat: 55.45, rotate: -Math.PI }, 
        {name: '纽约', lon: -73.86, lat: 40.85, rotate: Math.PI }, 
        {name: '东京', lon: 139.69, lat: 35.69, rotate: -Math.PI }, 
        {name: '伦敦', lon: 0.15, lat: 51.30, rotate: -Math.PI }, 
        {name: '巴基斯坦', lon: 73.09, lat: 31.25, rotate: -Math.PI }, 
        {name: '新加坡', lon: 103.49, lat: 1.21, rotate: -Math.PI },
        {name: '埃及', lon: 29.66, lat: 26.80, rotate: -Math.PI },
        {name: '意大利', lon: 12.44, lat: 43.93, rotate: -Math.PI },
        {name: '澳大利亚', lon: 133.28, lat: -25.16, rotate: -Math.PI },
        {name: '加拿大', lon: -106.22, lat: 56.12, rotate: -Math.PI },
      ],
      startPoint: {},
      views: null,
      animateId: null
    }
  },
  methods: {
    canvasTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext('2d')
      let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width)
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(225,255,255,1)');
      gradient.addColorStop(0.6, 'rgba(0,10,64,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.fillRect(0,0,canvas.width, canvas.height)
      ctx.closePath()
      const canvasT = new THREE.Texture(canvas)
      canvasT.needsUpdate = true
      canvasT.wrapS = THREE.RepeatWrapping
      canvasT.wrapT = THREE.RepeatWrapping
      canvasT.repeat.set(1,1)
      return canvasT
    },
    // 地图数据生成三维地图
    crateMap(data) {
      data.features.forEach( (item, index) => {
          if(index !== 2) {
            const coord = item.geometry.coordinates
            coord.forEach( val => {
                let position = []
                val.forEach( location => {
                  if(location.constructor === Array) {
                    let {x, y, z} = this.lgltToxyz(location[0],location[1],30.1)
                    position.push(new THREE.Vector3(x, y, z))
                  }
                })
                if(position.length > 0) {
                  var curve = new THREE.CatmullRomCurve3(position);
                  var geo = new THREE.TubeGeometry( curve, 256, 0.06, 8, false );
                  var material = new THREE.ShaderMaterial({
                        uniforms: {
                            iTime: {
                                value: 0
                            },
                            color: { value: new THREE.Color(0xff0000) },
                            iResolution: {
                                value: new THREE.Vector2(800, 800)
                            }
                        },
                        side: 2,
                        depthWrite: true,
                        transparent: true,
                        depthTest: true,
                        blending: THREE.AdditiveBlending,
                        vertexShader: vertexShader,
                        fragmentShader: `
                        uniform float iTime;
                        uniform vec3 color;
                        varying vec2 vUv;
                        void main() {
                            
                            float d = mod(vUv.x - iTime, 1.0);

                            d = pow(d, 10.0);

                            vec4 lightColor = vec4(mix(color*d, color, 0.2), 1.0);

                            gl_FragColor = lightColor;
                        }`
                  })
                  var mesh = new THREE.Mesh( geo, material );
                  map.add(mesh)
                }
            })
          }
      })
    },
    // 经纬度转三维坐标
    lgltToxyz(lng, lat, radius) {
      // const phi = (180 + lng) * (Math.PI / 180)
      // const theta = (90 - lat) * (Math.PI / 180)
      // return {
      //   x: -radius * Math.sin(theta) * Math.cos(phi),
      //   y: radius * Math.cos(theta),
      //   z: radius * Math.sin(theta) * Math.sin(phi),
      // }
      const theta = (90 + lng) * (Math.PI / 180)
      const phi = (90 - lat) * (Math.PI / 180)
      return (new THREE.Vector3(100,220,20)).setFromSpherical(new THREE.Spherical(radius, phi, theta))
    },
    // 天空盒子
    creatSkyCloud() {
        const geometry = new THREE.BufferGeometry()
        const positions = [], colors = [];
        for(let i = 0; i < 5000; i++) {
            let v = new THREE.Vector3(
                Math.random()*2-1,
                Math.random()*2-1,
                Math.random()*2-1
            )
            positions.push(v.x*200, v.y*200, v.z*200)
            let c = new THREE.Color(
                Math.random() * 0.2 + 0.5,
                0.55, 
                Math.random() * 0.25 + 0.55
            )
            colors.push(c.r, c.g, c.b)
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute( positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3))

        const m = new THREE.PointsMaterial({
            // map: this.canvasTexture(),
            size: 2,
            map: new THREE.ImageUtils.loadTexture('images/spikey.png'),
            transparent: true,
            depthTest: true,
            depthWrite: false, //禁止写入深度缓冲区数据,
        })
        const sky = new THREE.Points(geometry, m)
        scene.add(sky)
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
          side: THREE.BackSide
        }));
      }
      const sky = new THREE.Mesh(skyBox, materialArr);
      scene.add(sky);
    },
    // 地球
    earthGeometry() {
        const geometry2 = new THREE.SphereGeometry(30, 64, 64);
        const material2 = new THREE.MeshPhongMaterial({ 
          // color: 0xffffff,
          map: new THREE.ImageUtils.loadTexture( 'images/earth-day.jpg' )
        })
        let earth2 = new THREE.Mesh(geometry2, material2);
        map.add(earth2)

        map.position.y = 20
        map.rotation.set(0.3,Math.PI/1.15,0.1)

        var customMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 
          { 
            "c":   { type: "f", value: 0.3 },
            "p":   { type: "f", value: 2.4 },
            glowColor: { type: "c", value: new THREE.Color(0x0000ee) },
            viewVector: { type: "v3", value: camera.position }
          },
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false, //禁止写入深度缓冲区数据,
          vertexShader: `uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() 
          {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
          fragmentShader: `uniform vec3 glowColor;
          varying float intensity;
          void main() 
          {
            vec3 glow = glowColor * intensity;
              gl_FragColor = vec4( glow, 1.0 );
          }`
        });
          
        earthGlow = new THREE.Mesh( geometry2.clone(), customMaterial.clone() );
        earthGlow.position.set(map.position.x,map.position.y,map.position.z);
        earthGlow.scale.multiplyScalar(1.5);
        scene.add( earthGlow );
    },
    //卫星轨迹
    createMoon() {
      const curve = new THREE.EllipseCurve(0, 0, 50, 50, 0, 2*Math.PI)
      const points = curve.getPoints(1000)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const index = []
      for(let i = 0; i < points.length; i++) {
        index.push(i)
      }
      geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1))
      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          color: { value: new THREE.Color(0xffffff)},
          color1: { value: new THREE.Color(0x00ffff)}
        },
        side: 2,
        transparent: false,
        vertexShader: `
          attribute float index;
          uniform vec3 color;
          uniform vec3 color1;
          uniform float iTime;
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
            vColor = color1;
            float show = 1000.0 * mod(iTime/5.0, 1.0);
            float size = 10.0;
            if(show > index && show < index + 30.0) {
              vColor = color;
              vOpacity = 1.0;
              size *= (index + 30.0 - show)*2.0;
            }else{
              vOpacity = 1.0;
              vColor = color1;
              size = 1.0;
            }
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size / (-mvPosition.z);
          }`,
        fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(vColor, vOpacity);
        }`
      })
      const mesh = new THREE.Points(geometry, material)
      mesh.rotateX(Math.PI/2)
      map.add(mesh)
    },
    //城市文本
    createText() {
      render1 = new CSS3DRenderer({ alpha: true })
      this.city.forEach((item, index) => {
        let element = document.createElement('div')
        element.className = 'city'
        element.innerText = item.name
        const css3Text = new CSS3DObject(element)
        const {x,y,z} = this.lgltToxyz(item.lon, item.lat, 30.1)
        css3Text.scale.set(0.03, 0.03, 0.03)
        css3Text.position.set(x, y, z)
        
        var coordVec3 = new THREE.Vector3( x, y, z ).normalize();
        var meshNormal = new THREE.Vector3( 0, 0, 1 );
        css3Text.quaternion.setFromUnitVectors( meshNormal, coordVec3 );
        css3Text.lookAt(0,0,0)
        css3Text.rotateY(item.rotate)
        map.add(css3Text)

        this.createPlane(css3Text.position)
        this.createCylinder(this.lgltToxyz(item.lon, item.lat, 33))
        if(index !== 0) {
          const { curve, mesh } = this.addLines(this.startPoint, css3Text.position.clone())
          // map.add(mesh)
          this.flyLine(curve)
        }else{
          this.startPoint = css3Text.position
        }
      })
      render1.domElement.style.position = 'absolute'
      render1.domElement.style.zIndex = 2
      render1.domElement.style.top = 0
      render1.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render1.domElement)
      controler = new OrbitControls(camera, render1.domElement);
      controler.minDistance = 40;
      controler.maxDistance = 300;
      controler.enableDamping = true
      controler.autoRotate = true
      controler.autoRotateSpeed = -0.2
    },
    // 扩散
    createPlane({x,y,z}) {
        const geometry = new THREE.CircleGeometry(1, 32)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            color: { value: new THREE.Color(0x00ffff)}
          },
          side: 2,
          transparent: true,
          depthTest: true,
          vertexShader,
          fragmentShader: Effect.effect35()
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x,y,z)
        mesh.lookAt(0,0,0)
        map.add(mesh)
    },
    // 光柱
    createCylinder( pos ) {  
        const geometry = new THREE.CylinderGeometry(0.1, 0.4, 6, 32,32, true)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            color: { value: new THREE.Color(0x00ffff)}
          },
          side: THREE.FrontSide,
          transparent: true,
          depthTest: true,
          depthWrite: false, //禁止写入深度缓冲区数据,
          vertexShader,
          fragmentShader: Effect.effect42()
        })
        var mesh = new THREE.Mesh( geometry, material );
        //设置mesh位置
        mesh.position.set( pos.x, pos.y, pos.z );
        // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
        var coordVec3 = new THREE.Vector3( pos.x, pos.y, pos.z ).normalize();
        // mesh默认在XOY平面上，法线方向沿着y轴new THREE.Vector3(0, 1, 0)
        var meshNormal = new THREE.Vector3( 0, 1, 0 );
        // 四元数属性.quaternion表示mesh的角度状态
        //.setFromUnitVectors();计算两个向量之间构成的四元数值
        mesh.quaternion.setFromUnitVectors( meshNormal, coordVec3 );
        map.add(mesh)
    },
    // 曲线
    addLines( v0, v3 ) {
        // 夹角
        var angle = ( v0.angleTo( v3 ) * 1.8 ) / Math.PI / 0.1; // 0 ~ Math.PI
        var aLen = angle * 2.0, hLen = angle * angle * 100;
        var p0 = new THREE.Vector3( 0, 0, 0 );
        // 法线向量
        var rayLine = new THREE.Ray( p0, this.getVCenter( v0.clone(), v3.clone() ) );
        // 顶点坐标
        let target = new THREE.Vector3(0,0,0)
        rayLine.at( 1, target)
        rayLine.at( hLen / target.distanceTo( p0 ), target );
        
        // 控制点坐标
        var v1 = this.getLenVcetor( v0.clone(), target, aLen );
        var v2 = this.getLenVcetor( v3.clone(), target, aLen );

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
            color.setHSL( .81666+j*0.0025, 0.88, 0.715+j*0.0025); //粉色
            colors.push( color.r, color.g, color.b );
            positions.push( points[j].x, points[j].y, points[j].z );
            index.push(j/(points.length - 1))
        }
        // geometry.setPositions(positions)
        // geometry.setColors(colors)
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1))
        var matLine = new THREE.LineBasicMaterial( {
            vertexColors: true,
            transparent: true
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
          size: { value: 40 },
          uRange: { value: 100 },
          uTotal: { value: points.length},
          uColor: { value: new THREE.Color(0xff00ff) },
          uColor1: { value: new THREE.Color(0xff00ff) }
        },
        transparent: true,
        depthTest: true,
        depthWrite: false, //禁止写入深度缓冲区数据,
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
            // && showNumber < current + uRange
            if (showNumber > current) {
                vOpacity = 1.0;
                // s *= (current + uRange - showNumber) / uRange;
                s = 5.0;
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
      map.add(mesh)
    },
    getVCenter(v1,v2) {
      let v = v1.add(v2)
      return v.divideScalar(2)
    },
    getLenVcetor(v1,v2,len) {
      let length = v1.distanceTo(v2)
      return v1.lerp(v2, len / length)
    },
    init() {
      this.views = this.$refs.views
      scene = new THREE.Scene()
      scene.position.y = -20

      camera = new THREE.PerspectiveCamera(75, this.views.clientWidth/this.views.clientHeight, 0.1, 5000)
      camera.position.set(-100, 20, 380);

      render = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      render.sortObjects = true

      this.views.appendChild(render.domElement)
      let AmbientLight = new THREE.AmbientLight( 0x404040, 2);
      scene.add( AmbientLight );
      
      var DirectionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
      DirectionalLight.position.set( 0, 60, 1000 );
      scene.add( DirectionalLight );
      // this.initComposer()
    },
    initComposer() {
      composer = new EffectComposer(render)
      composer.addPass(new RenderPass(scene, camera))

      // let bloomPass = new UnrealBloomPass()
      // composer.addPass(bloomPass)

      // bloomPass.strength = 0.6
      // bloomPass.radius = 0.1
      // bloomPass.threshold = 0.2
      
      let fxaaShader = new ShaderPass(FXAAShader)
      const pixelRatio = render.getPixelRatio()
      fxaaShader.material.uniforms['resolution'].value.x = 1/(this.views.clientWidth * pixelRatio)
      fxaaShader.material.uniforms['resolution'].value.y = 1/(this.views.clientHeight * pixelRatio)
      composer.addPass(fxaaShader);
    },
    animation() {
        let delta = clock.getDelta()
        TWEEN.update()
        controler.update(delta)
        // composer.render(scene, camera)
        render.render(scene, camera)
        render1.render(scene, camera)
        const elapsedTime = clock.getElapsedTime()
        // Update passes
        scene.traverse((child) => {
            if(child.material && child.material.uniforms){
              try{
                child.material.uniforms.iTime.value = elapsedTime
              }catch{

              }
            }
        })
        this.animateId = requestAnimationFrame(this.animation);
        map.rotation.y += 0.002
        if(!!earthGlow) {
            earthGlow.material.uniforms.viewVector.value = 
            new THREE.Vector3().subVectors( camera.position, earthGlow.position );
        }
    }
  },
  mounted() {
    this.init()
    this.createText()
    this.animation()
    this.creatSkyCloud()
    this.setSkyBox('star')
    this.earthGeometry()
    this.crateMap(dataBJ)
    this.createMoon()
    scene.add(map)
    let tween = new TWEEN.Tween(camera.position).to({
      x: 0, y: 10, z: 80
    }, 4500)
    tween.delay(500)
    tween.easing(TWEEN.Easing.Elastic.InOut)
    tween.start()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      render1.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateId)
    scene.clear()
    render.dispose()
    composer = null 
    scene = null;
    camera = null;
    controler = null;
  }
}
</script>

<style lang="scss">
.earth_home {
  width: 100vw;
  height: 100vh;
  .home-view {
    width: 100%;
    height: 100%;
    background-color: #000;
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
  .city {
    /* box-shadow: 0 0 12px 2px inset red; */
    padding: 0 5px;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
  }
} 
</style>
