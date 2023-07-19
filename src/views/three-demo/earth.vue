<template>
  <div class="earth_home">
    <div class="home-view" ref="views"></div>
    <div class="back animate__animated animate__fadeInUp animate__slow animate__delay-3s" >
        <el-button @click="$router.go(-1)" type="primary" size="mini">退 出</el-button>
    </div>
    <div class="header animate__animated animate__fadeInDown animate__slow animate__delay-1s"></div>
    <div class="left animate__animated animate__fadeInLeft animate__slow animate__delay-2s"></div>
    <div class="right animate__animated animate__fadeInRight animate__slow animate__delay-2s"></div>
    <div class="footer animate__animated animate__fadeInUp animate__slow animate__delay-3s"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 控制器
import { dataBJ } from '@/utils/bj.js'
import Event from '@/utils/object3DEvent.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
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
let scene, camera, render, render1,render2, controler, clock = new THREE.Clock();
let composer, eventObj;
let map = new THREE.Group(), earthGlow;
let noteElement = null, noteObj = null
export default {
  name: 'effect',
  data() {
    return {
      city: [
        {name: '北京',
          note: '北京（Beijing），简称“京”，古称燕京、北平，是中华人民共和国的首都、直辖市、国家中心城市、超大城市，国务院批复确定的中国政治中心、文化中心、国际交往中心、科技创新中心。',
          lon: 116.3, lat: 39.9, rotate: -Math.PI},
        {name: '长沙',
          note: '长沙，别称星城，湖南省辖地级市、省会、特大城市，国务院批复确定的长江中游地区重要的中心城市、长株潭城市群中心城市。',
          lon: 112.58, lat: 28.12, rotate: -Math.PI },
        {name: '上海',
        note: '上海，简称“沪”或“申”，是中华人民共和国省级行政区、直辖市、国家中心城市、超大城市、上海大都市圈核心城市，国务院批复确定的中国国际经济、金融、贸易、航运、科技创新中心 [1]  。', lon: 120.52, lat: 30.4, rotate: -Math.PI },
        {name: '重庆', 
        note: '重庆，简称“渝”，别称山城，是中华人民共和国省级行政区、直辖市、国家中心城市、超大城市，国务院批复确定的国家重要的中心城市之一、长江上游地区经济中心、国家重要先进制造业中心、西部金融中心、西部国际综合交通枢纽和国际门户枢纽 [221]  。',lon: 106.55, lat: 29.57, rotate: -Math.PI },
        {name: '武汉', 
        note: '武汉，简称“汉”，别称江城，是湖北省省会，中部六省唯一的副省级市，特大城市，中国中部地区的中心城市，全国重要的工业基地、科教基地和综合交通枢纽，联勤保障部队机关驻地。',lon: 114.17, lat: 30.35, rotate: -Math.PI },
        {name: '莫斯科', 
        note: '莫斯科（俄语：Москва；英语：Moscow），是俄罗斯联邦首都、莫斯科州首府。莫斯科是俄罗斯的政治、经济、文化、金融、交通中心以及最大的综合性城市，是一座国际化大都市。',lon: 37.35, lat: 55.45, rotate: -Math.PI }, 
        {name: '纽约', 
        note: '纽约市（New York City，简称：NYC），位于美国纽约州东南部大西洋沿岸，是美国第一大城市及第一大港口，纽约都市圈为世界上最大的都市圈之一，与英国伦敦、中国香港并称为“纽伦港”（Nylonkong）。',lon: -73.86, lat: 40.85, rotate: Math.PI }, 
        {name: '东京', 
        note: '东京（日文：東京；英语：Tokyo），日本首都，位于日本关东平原中部，是面向东京湾的国际大都市，日本三大都市圈之一东京都市圈的中心城市。',lon: 139.69, lat: 35.69, rotate: -Math.PI }, 
        {name: '伦敦', 
        note: '伦敦，是大不列颠及北爱尔兰联合王国首都，世界金融中心，伦敦占全球外汇交易额的比重超过40%，与纽约和香港并称为“纽伦港”。',lon: 0.15, lat: 51.30, rotate: -Math.PI }, 
        {name: '巴基斯坦', 
        note: '巴基斯坦伊斯兰共和国（乌尔都语：اسلامی جمہوریہ پاکستان，英语：Islamic Republic of Pakistan），简称“巴基斯坦”，意为“圣洁的土地”、“清真之国”，95%以上的居民信奉伊斯兰教，是一个多民族伊斯兰国家。国语为乌尔都语。',lon: 73.09, lat: 31.25, rotate: -Math.PI }, 
        {name: '新加坡', 
        note: '新加坡共和国（英语：Republic of Singapore），简称新加坡，旧称新嘉坡、星洲或星岛，别称为狮城，是东南亚的一个岛国，政治体制实行议会共和制，首都为新加坡市。',lon: 103.49, lat: 1.21, rotate: -Math.PI },
        {name: '埃及', 
        note: '阿拉伯埃及共和国（阿拉伯语：جمهوريّة مصرالعربيّة），简称“埃及”。位于非洲东北部，地处欧亚非三大洲的交通要冲，是大西洋与印度洋之间海上航线的捷径。',lon: 29.66, lat: 26.80, rotate: -Math.PI },
        {name: '意大利', 
        note: '意大利共和国（意大利语：Repubblica Italiana；英语：The Republic of Italy），简称意大利（意大利语：Italia；英语：Italy），是一个欧洲国家，主要由南欧的亚平宁半岛及两个位于地中海中的岛屿西西里岛与撒丁岛所组成。国土面积为301333平方公里，人口6024万。',lon: 12.44, lat: 43.93, rotate: -Math.PI },
        {name: '澳大利亚', 
        note: '澳大利亚联邦（英语：Commonwealth of Australia），简称“澳大利亚”，其领土面积769.2万平方公里，位于南太平洋和印度洋之间，四面环海，是世界上唯一国土覆盖一整个大陆的国家，因此也称“澳洲”。',lon: 133.28, lat: -25.16, rotate: -Math.PI },
        {name: '加拿大', 
        note: '加拿大（英语/法语：Canada），位于北美洲北部。东临大西洋，西濒太平洋，西北部邻美国阿拉斯加州，南接美国本土，北靠北冰洋。',lon: -106.22, lat: 56.12, rotate: -Math.PI },
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
    // 重新计算图形uv
    accountUvs(geometry) {
      geometry.computeBoundingBox()
      const { max, min } = geometry.boundingBox
      const offset = new THREE.Vector2(0 - min.x, 0 - min.y)
      const range = new THREE.Vector2(max.x - min.x, max.y - min.y)
      const uvArray = []
      const array = geometry.attributes.uv.array
      const size = geometry.attributes.uv.itemSize
      for(let i = 0; i < array.length; i++) {
        let newUv = array[i]
        if(i%size === 0) {
          newUv = (newUv + offset.x) / range.x
        }else {
          newUv = (newUv + offset.y) / range.y
        }
        uvArray.push(newUv)
      }
      return uvArray
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
                            color: { value: new THREE.Color(0x00ffff) },
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

                            vec4 lightColor = vec4(mix(color*d, color, 0.1), 1.0);

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
        // geometry.addAttribute('position', new THREE.BufferAttribute( new Float32Array(positions), 3, true))

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
        const geometry = new THREE.SphereGeometry(30.2, 64, 64);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0xeeeeee,
          transparent: true,
          depthWrite: false,
          alphaMap: new THREE.ImageUtils.loadTexture( 'images/clouds.jpg' )
        })
        let earth = new THREE.Mesh(geometry, material);
        map.add(earth)

        let tween = new TWEEN.Tween(earth.rotation).to({x:0,y: Math.PI*2, z: 0}, 5*60000)
        tween.start()
        tween.onComplete(() => {
          earth.rotation.y = 0
          tween.start()
        })

        const geometry2 = new THREE.SphereGeometry(30, 64, 64);
        const material2 = new THREE.MeshPhongMaterial({ 
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
      const points = curve.getPoints(2000)
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

        // this.createPlane(css3Text.position)
        this.createCylinder(this.lgltToxyz(item.lon, item.lat, 33), item)
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

      render2 = new CSS2DRenderer({ alpha: true })
      render2.domElement.style.position = 'absolute'
      render2.domElement.style.zIndex = 10
      render2.domElement.style.top = 0
      render2.setSize(this.views.clientWidth, this.views.clientHeight)
      this.views.appendChild(render2.domElement)
      controler = new OrbitControls(camera, render2.domElement);
      controler.minDistance = 35;
      controler.maxDistance = 300;
      controler.enableDamping = true
      controler.autoRotate = true
      controler.autoRotateSpeed = -0.2
      controler.zoomSpeed = 0.5

      noteElement = document.createElement('div')
      noteElement.className = 'note'
      let title = document.createElement('div')
      title.className = 'title'
      noteElement.appendChild(title)
      let child = document.createElement('div')
      child.className = 'detail'
      noteElement.appendChild(child)
    },
    showTextNote(g, item) {
      if(noteObj!== null)
        map.remove(noteObj)
      noteElement.children[0].innerText = item.name
      noteElement.children[1].innerText = item.note
      noteObj = new CSS2DObject(noteElement)
      noteObj.position.set(g.position.x, g.position.y, g.position.z)
      map.add(noteObj)
    },
    // 扩散
    createPlane() {
        const geometry = new THREE.CircleGeometry(1, 32)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            color: { value: new THREE.Color(0x00ffff)}
          },
          side: 2,
          transparent: true,
          depthTest: true,
          wireframe: true,
          vertexShader,
          fragmentShader: Effect.effect35()
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y = 2.9
        mesh.rotateX(Math.PI/2)
        return mesh
    },
    // 光柱
    createCylinder( pos, item) {  
        let group = new THREE.Group()
        const geometry = new THREE.PlaneGeometry(1, 6, 32, 32)
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          side: THREE.DoubleSide,
          transparent: true,
          depthWrite: false,
          alphaMap: new THREE.ImageUtils.loadTexture('images/lightray.jpg'),
        })
        var mesh = new THREE.Mesh( geometry, material );
        var mesh1 = mesh.clone()
        mesh1.rotateY(Math.PI/2)
        let mesh2 = this.createPlane()
        group.add(mesh, mesh1, mesh2)
        //设置mesh位置
        group.position.set( pos.x, pos.y, pos.z );
        // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
        var coordVec3 = new THREE.Vector3( pos.x, pos.y, pos.z ).normalize();
        // mesh默认在XOY平面上，法线方向沿着y轴new THREE.Vector3(0, -1, 0)
        var meshNormal = new THREE.Vector3( 0, -1, 0 );
        // 四元数属性.quaternion表示mesh的角度状态
        //.setFromUnitVectors();计算两个向量之间构成的四元数值
        group.quaternion.setFromUnitVectors( meshNormal, coordVec3 );
        map.add(group)

        group.on('hover', () => {
          group.children.forEach(child => {
            if(child.material.uniforms) {
              child.material.uniforms.color.value = new THREE.Color(0xff00ff)
            }else{
              child.material.color.set(0xff00ff)
            }
          })
        }, () => {
          group.children.forEach(child => {
            if(child.material.uniforms) {
              child.material.uniforms.color.value = new THREE.Color(0x00ffff)
            }else{
              child.material.color.set(0x00ffff)
            }
          })
        })

        group.on('click', (g, m) => {
            let target = new THREE.Vector3()
            g.getWorldPosition(target)
            let t = new TWEEN.Tween(camera.position).to({
              x: target.x,
              y: target.y,
              z: target.z,
            }, 3000)
            t.easing(TWEEN.Easing.Quintic.Out)
            t.start()
            camera.lookAt(new THREE.Vector3().copy(target))
            this.showTextNote(g, item)
        })
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
            float showNumber = uTotal * mod(iTime/5.0, 1.2);
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

      eventObj = new Event(this.views, scene, camera, false)

      this.views.appendChild(render.domElement)
      let AmbientLight = new THREE.AmbientLight( 0x484848);
      scene.add( AmbientLight );
      
      var DirectionalLight = new THREE.DirectionalLight( 0xffffff);
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
        render2.render(scene, camera)
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
        map.rotation.y += 0.0005
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
      x: 0, y: 10, z: 100
    }, 2500)
    tween.delay(500)
    tween.easing(TWEEN.Easing.Quintic.Out)
    tween.start()
    window.onresize = () => {
      render.setSize(this.views.clientWidth, this.views.clientHeight)
      render1.setSize(this.views.clientWidth, this.views.clientHeight)
      render2.setSize(this.views.clientWidth, this.views.clientHeight)
      camera.aspect = this.views.clientWidth / this.views.clientHeight//相机重置可视范围
      camera.updateProjectionMatrix();
      eventObj.resize()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateId)
    eventObj.clear()
    scene.clear()
    render.dispose()
    composer = null 
    scene = null;
    camera = null;
    controler = null;
  }
}
</script>

<style lang="scss" scoped>
.earth_home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
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
  .back {
    position: absolute;
    bottom: 190px;
    right: 50%;
    z-index: 2019;
    transform: translateX(50%);
  }
} 
.header, .left, .right, .footer {
  position: absolute;
  z-index: 100;
  background-color: rgba(35, 95, 109, 0.1);
}
.header {
  left: 0;
  top: 0;
  width: 100vw;
  height: 80px;
  z-index: 20;
}

.left {
  left: 0;
  top: 80px;
  width: 220px;
  height: calc(100vh - 80px);
}

.right {
  right: 0;
  top: 80px;
  width: 220px;
  height: calc(100vh - 80px);
}

.footer {
  left: 220px;
  bottom: 0;
  width: calc(100vw - 440px);
  height: 180px;
}
</style>

<style lang="scss">

  .city {
    /* box-shadow: 0 0 12px 2px inset red; */
    padding: 0 5px;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
  }
  .note {
  position: relative;
  width: 120px;
  height: 60px;
  color: #fff;
  padding: 5px 10px;
  background: 100% 100% url('/images/1.png') no-repeat;
  background-position: 5px 24px;
  margin-left: 50px;
  margin-top: -30px;
}
.detail {
  position: absolute;
  text-align: start;
  left: calc(100% - 24px);
  bottom: 10px;
  z-index: 110;
  border: 1px solid #00ffff;
  background: rgba(0,0,0,0.5);
  width: 150px;
  line-height: 16px;
  font-size: 12px;
  padding: 5px;
  color: #fff;
}
</style>