<template>
  <div class="earth_home" ref="threeWrap">
    <div class="home-view" ref="views"></div>
    <!-- <div class="video-wrap" ref="videoWrap">
      <video id="video" src="/source/earth_v.mp4" ref="video" muted></video>
    </div> -->
    <div class="loading-wrap" ref="loading">
      <span>正在加载资源({{ progress }}%)</span>
      <Progress
        :percent="progress"
        :stroke-width="15"
        status="active"
        style="width: 240px"
        hide-info
      ></Progress>
    </div>
    <!-- 底部 -->
    <div class="footer" v-if="videoEnded">
      <ul class="foot-nav">
        <li
          v-for="item in waterWorksType"
          :key="item.value"
          :class="{ [item.className]: active === item.value }"
        >
          <div
            @click="pointShowAniamte(item.value)"
            class="border-inner"
            :class="{ [item.className]: active === item.value }"
          >
            <SWIcon :type="item.icon" :size="item.size" class="type-icon" />
            <div class="nav-text">
              <h6>{{ item.lable }}</h6>
              <span>{{ item.alias }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 信息框 -->
    <div class="point-note" v-show="noteShow">
      <div class="trangle"></div>
      <div class="info-box">
        <div class="top-wrap" @click="routerInto">
          <SWIcon
            v-if="selecteFactories !== null"
            :type="waterWorksType[selecteFactories.bizType - 1].icon"
            :size="waterWorksType[selecteFactories.bizType - 1].size - 10"
            class="type-icon"
          />
          <div>
            <div class="title"></div>
            <div class="detail"></div>
          </div>
          <img
            class="right-icon"
            src="@/assets/arrow.png"
            width="16"
            height="14"
            alt=""
            srcset=""
          />
        </div>
        <ul class="info-content">
          <li v-for="item in showNodeData" :key="item.id">
            <span class="name">{{ item.displayName }}</span>
            <span class="value"
              >{{ item.dataValue }}<span class="unit">{{ item.dataUnit }}</span></span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import appService from './api'
  import * as THREE from 'three'
  import { OrbitControls } from '@/utils/OrbitControls' // 控制器
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
  import Object3DEvent from '@/utils/object3DEvent.js'
  import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
  import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
  import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
  import { SMAAEdgesShader, SMAAWeightsShader } from 'three/examples/jsm/shaders/SMAAShader'
  import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
  import { vertexShader, pointSpread, bgPlane } from './effect'
  let scene; let camera; let render; let render1; let render2; let composer; let outlinePass; let controler; const clock = new THREE.Clock()
  let map = new THREE.Group()
  let textGroup = new THREE.Group()
  let modelGroup = new THREE.Group()
  const pointModel = new THREE.Group()
  let AmbientLight, DirectionalLight, objEvent
  let infoObj, infoElement, infoStartPoint
  const textureLoader = new THREE.TextureLoader()
  export default {
    data() {
      return {
        factories: null,
        selecteFactories: null,
        showNodeData: [],
        nodeData: [],
        views: null,
        videoRef: null,
        animateId: null,
        active: null,
        videoEnded: false,
        noteShow: false,
        progress: 0,
        areaText: [{ name: '宝安区', position: { x: -43.85707054323405, y: 6, z: -3.8569488892345327 } },
                   { name: '光明区', position: { x: -33.89367959864091, y: 6, z: -18.70377690382958 } },
                   { name: '龙华区', position: { x: -20.791392249007615, y: 6, z: -8.04661735891984 } },
                   { name: '龙岗区', position: { x: 1.4430810801444973, y: 6, z: -7.906977311650373 } },
                   { name: '坪山区', position: { x: 23.008000562118, y: 6, z: -8.552855612845365 } },
                   { name: '大鹏新区', position: { x: 43.02894601290143, y: 6, z: 10.854145262604652 } },
                   { name: '南山区', position: { x: -34.67715635549325, y: 6, z: 15.152619970603602 } },
                   { name: '福田区', position: { x: -18.4557872886727, y: 6, z: 12.436954685944727 } },
                   { name: '罗湖区', position: { x: -3.820589246963976, y: 6, z: 7.662604891478809 } },
                   { name: '盐田区', position: { x: 10.840856944882267, y: 6, z: 5.901830331234198 } }
        ],
        color: ['#00FFF6', '#FEDA33', '#2BA7FF'],
        waterWorksType: [
          {
            lable: '水厂',
            alias: 'SHUICHANG',
            icon: 'changfang',
            size: 28,
            className: 'active1',
            value: 1,
            points: []
          },
          {
            lable: '水质净化厂',
            alias: 'SHUIZHIJINGHUACHANG',
            size: 36,
            icon: 'wushuikoujiancezhan',
            className: 'active2',
            value: 2,
            points: []
          },
          {
            lable: '泵站',
            alias: 'BENGZHAN',
            size: 30,
            icon: 'xiaofangshuibeng',
            className: 'active3',
            value: 3,
            points: []
          }
        ]
      }
    },
    created() {
      this.getFactories()
    },
    watch: {
      progress(val) {
        if (val === 100) {
          this.animation()
          this.mapIntoAnimate()
          this.$refs.views.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast')
          this.$refs.loading.classList.add('animate__animated', 'animate__fadeOut', 'animate__fast')
        }
      }
    },
    methods: {
      async getFactories() {
        const factories = await appService.getAllFactories()
        this.factories = JSON.parse(JSON.stringify(factories))
        this.nodes = this.factories.filter(x => x.mapCoord.length > 0)
        this.pointSetInwaterWorksType(this.nodes)
      },
      pointSetInwaterWorksType(data) {
        this.waterWorksType.forEach((item, i) => {
          this.$set(this.waterWorksType, i, {
            ...item,
            points: data.filter(val => val.bizType === item.value)
          })
        })
        console.log(this.waterWorksType)
        this.modelLoad()
      },
      // 播放开场动画
      playVideo() {
        this.videoRef = this.$refs.video
        this.videoRef.play()
        this.videoRef.addEventListener('ended', () => {
          document.body.style.cursor = 'default'
          this.videoRef.pause()
          this.videoRef.classList.add('animate__animated', 'animate__fadeOut', 'animate__slower')
          this.modelLoad()
          this.mapIntoAnimate()
        })
      },
      // 初始化文本渲染器
      init3dTextRender() {
        render1 = new CSS3DRenderer({ alpha: true })
        render1.domElement.style.position = 'absolute'
        render1.domElement.style.zIndex = 2
        render1.domElement.style.top = 0
        render1.domElement.style.left = 0
        render1.setSize(this.views.clientWidth, this.views.clientHeight)
        this.views.appendChild(render1.domElement)

        render2 = new CSS2DRenderer({ alpha: true })
        render2.domElement.style.position = 'absolute'
        render2.domElement.style.zIndex = 10
        render2.domElement.style.top = 0
        render2.setSize(this.views.clientWidth, this.views.clientHeight)
        this.views.appendChild(render2.domElement)

        controler = new OrbitControls(camera, this.views)
        controler.minPolarAngle = -Math.PI / 2
        controler.maxPolarAngle = Math.PI / 2.2
        controler.enableDamping = true
        controler.dampingFactor = 0.3
        // controler.autoRotate = true
        controler.autoRotateSpeed = -0.2
        controler.zoomSpeed = 0.2
      },
      // 设置地区文本
      createText() {
        this.areaText.forEach(item => {
          const element = document.createElement('div')
          element.className = 'city-area'
          element.innerText = item.name
          const css3Text = new CSS3DSprite(element)
          css3Text.scale.set(0, 0, 0)
          const { x, y, z } = item.position
          css3Text.position.set(x, y, z)
          textGroup.add(css3Text)
        })
        scene.add(textGroup)
        // 信息文本
        infoElement = document.querySelector('.point-note')
      },
      // 覆盖加载
      getGeoJson() {
        const xhr = new XMLHttpRequest()
        xhr.open('get', '/source/深圳市.json', true)
        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.response)
            const meshGroup = new THREE.Group()
            data.features.forEach((item, index) => {
              item.geometry.coordinates.forEach(ele => {
                const shape = new THREE.Shape()
                const borderLine = []
                ele.forEach(val => {
                  val.forEach((p, i) => {
                    const x = p[0] - 114.19; const y = p[1] - 22.63
                    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
                    // borderLine.push(x*25.6 * 5, y*28 * 5, 0)
                    borderLine.push(new THREE.Vector3(x * 25.6 * 5, y * 28 * 5, 0))
                  })
                })
                const curveLine = this.addBorderLine(borderLine, 0xffffff)
                const Sgeo = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(Sgeo, new THREE.MeshBasicMaterial({
                  color: 0xE99033,
                  depthWrite: false,
                  transparent: true,
                  opacity: 0
                }))
                if (item.geometry.coordinates.length === 4) {
                  mesh.scale.set(25.6 * 5, 28 * 5, 1)
                  meshGroup.add(mesh, curveLine)
                } else {
                  mesh.rotateX(-Math.PI / 2)
                  mesh.scale.set(25.6 * 5, 28 * 5, 1)
                  mesh.position.y = 5.05
                  curveLine.rotateX(-Math.PI / 2)
                  curveLine.position.y = 5.05
                  map.add(mesh, curveLine)
                  mesh.on('hover', () => {
                    outlinePass.edgeStrength = 2
                    outlinePass.visibleEdgeColor = new THREE.Color(0xE99033)
                    outlinePass.selectedObjects = [mesh, curveLine]
                    curveLine.material.color.set(new THREE.Color(0xE99033))
                    curveLine.position.y += 0.05
                    const tween = new TWEEN.Tween(mesh.material).to({ opacity: 0.3 }, 100)
                    tween.start()
                  }, () => {
                    outlinePass.selectedObjects = []
                    curveLine.material.color.set(new THREE.Color(0xffffff))
                    curveLine.position.y -= 0.05
                    const tween = new TWEEN.Tween(mesh.material).to({ opacity: 0 }, 100)
                    tween.start()
                  })
                }
              })
              // 南山区四个mesh组合
              if (item.geometry.coordinates.length === 4) {
                meshGroup.rotateX(-Math.PI / 2)
                meshGroup.position.y = 5.05
                map.add(meshGroup)
                meshGroup.on('hover', (g) => {
                  outlinePass.edgeStrength = 2
                  outlinePass.visibleEdgeColor = new THREE.Color(0xE99033)
                  outlinePass.selectedObjects = [meshGroup]
                  g.position.y += 0.05
                  g.traverse(child => {
                    if (child.isMesh) {
                      if (child.geometry.constructor === THREE.ShapeGeometry) {
                        const tween = new TWEEN.Tween(child.material).to({ opacity: 0.3 }, 100)
                        tween.start()
                      } else {
                        child.material.color.set(new THREE.Color(0xE99033))
                      }
                    }
                  })
                }, (g) => {
                  outlinePass.selectedObjects = []
                  g.position.y -= 0.05
                  g.traverse(child => {
                    if (child.isMesh) {
                      if (child.geometry.constructor === THREE.ShapeGeometry) {
                        const tween = new TWEEN.Tween(child.material).to({ opacity: 0 }, 100)
                        tween.start()
                      } else {
                        child.material.color.set(new THREE.Color(0xffffff))
                      }
                    }
                  })
                })
              }
            })
          }
          this.progress += 20
        }
        xhr.send()
      },
      // 添加边框线
      addBorderLine(borderLine, color) {
        // const geometry = new THREE.BufferGeometry()
        // geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(borderLine), 3)
        // const material = new THREE.LineBasicMaterial({
        //   color
        // })
        // const line = new THREE.Line(geometry, material)
        const curvePath = new THREE.CurvePath()
        borderLine.forEach((p, i) => {
          if ((i + 1) % 2 === 0) {
            const line = new THREE.LineCurve3(borderLine[i - 1], borderLine[i])
            curvePath.curves.push(line)
          }
        })
        const geometry = new THREE.TubeGeometry(curvePath, borderLine.length, 0.08, 16, true)
        const material = new THREE.MeshBasicMaterial({
          color: color
        })
        const mesh = new THREE.Mesh(geometry, material)
        return mesh
      },
      // 场景初始化
      init() {
        this.views = this.$refs.views
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(45, this.views.clientWidth / this.views.clientHeight, 1, 5000)
        camera.position.set(-24.5, 135, 160)

        render = new THREE.WebGLRenderer({ antialias: true, alpha: false })
        render.setPixelRatio(window.devicePixelRatio)
        render.setSize(this.views.clientWidth, this.views.clientHeight)
        this.views.appendChild(render.domElement)

        AmbientLight = new THREE.AmbientLight(0x404040)
        scene.add(AmbientLight)
        DirectionalLight = new THREE.DirectionalLight(0xffffff, 2)
        DirectionalLight.position.set(0, 50, 100)
        scene.add(DirectionalLight)

        objEvent = new Object3DEvent(this.views, scene, camera, false)
        this.init3dTextRender()
        this.initComposer()
      },
      initComposer() {
        render.render(scene, camera)
        composer = new EffectComposer(render)
        composer.addPass(new RenderPass(scene, camera))

        outlinePass = new OutlinePass(new THREE.Vector2(this.views.clientWidth, this.views.clientHeight), scene, camera)
        composer.addPass(outlinePass)
        outlinePass.edgeStrength = 5
        outlinePass.edgeThickness = 1

        const smaaShader = new SMAAPass(SMAAEdgesShader)
        composer.addPass(smaaShader)
      },
      // 加载地图模型
      loadObj() {
        let lastLoad1 = 0; let lastLoad2 = 0
        let progress1 = 0; let progress2 = 0
        new OBJLoader().load(`/source/obj/sz-side2.obj`, (obj) => {
          // 初始展示的模型的缩放比例
          obj.scale.set(5, 5, 5)
          const color = 0x0B424D
          obj.position.y = 5
          obj.traverse(child => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhongMaterial({
                color: color,
                specular: 0x083039,
                shininess: 50
              })
            }
          })
          map.add(obj)
          this.progress += 20
        }, (xhr) => {
          console.log(xhr, 1)
          // progress1 = Math.floor(xhr.loaded / xhr.total * 20)
          // this.progress += progress1 - lastLoad1
          // lastLoad1 = progress1
        })
        new OBJLoader().load(`/source/map.obj`, (obj) => {
          // 初始展示的模型的缩放比例
          obj.scale.set(5, 5, 5)
          obj.traverse(child => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhongMaterial({
                map: textureLoader.load('/source/tietu/manshe_h.png'),
                bumpMap: textureLoader.load('/source/tietu/dem.png')
              })
            }
          })
          map.add(obj)
          this.progress += 20
        }, (xhr) => {
          console.log(xhr, 2)
          // progress2 = Math.floor(xhr.loaded / xhr.total * 20)
          // this.progress += progress2 - lastLoad2
          // lastLoad2 = progress2
        })
        scene.add(map)
      },
      // 背景加载
      planeMesh() {
        const planeGeo = new THREE.PlaneGeometry(900, 750, 64)
        const planeMesh = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
          transparent: true,
          blending: THREE.AdditiveBlending,
          map: textureLoader.load('/source/tietu/Tech_021.png')
        }))
        planeMesh.rotateX(-Math.PI / 2)
        planeMesh.position.y = -0.1
        planeMesh.position.z = -1
        map.add(planeMesh)
        const planeGeo1 = new THREE.PlaneGeometry(150, 150 * 1080 / 1920, 64)
        const planeMesh1 = new THREE.Mesh(planeGeo1, new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            map: { value: textureLoader.load('/source/bg-plane.png') },
            color: { value: new THREE.Color(0xE99033) },
            iResolution: { value: new THREE.Vector2(1500, 1500 * 1080 / 1920) }
          },
          transparent: true,
          depthWrite: false,
          side: 2,
          vertexShader,
          fragmentShader: bgPlane,
          blending: THREE.AdditiveBlending
        }))
        planeMesh1.rotateX(-Math.PI / 2)
        map.add(planeMesh1)
      },
      // 场景进入
      mapIntoAnimate() {
        const tween = new TWEEN.Tween(camera.position)
          .to({ x: 0, y: 60, z: 100 }, 1500)
          .easing(TWEEN.Easing.Quintic.Out)
          .start()
          .onComplete(() => {
            // 区域文本显示动画
            textGroup.traverse(child => {
              if (child.isCSS3DSprite) {
                new TWEEN.Tween(child.position)
                  .to({ x: child.position.x + 2, y: child.position.y, z: child.position.z }, 300)
                  .easing(TWEEN.Easing.Quintic.Out)
                  .start()
                new TWEEN.Tween(child.scale)
                  .to({ x: 0.1, y: 0.1, z: 0.1 }, 300)
                  .easing(TWEEN.Easing.Quintic.Out)
                  .start()
              }
            })
          })
        const tweenNext = new TWEEN.Tween(camera.position)
          .to({ x: 0, y: 100 * 1920 / this.views.clientWidth, z: 55 }, 1200)
          .easing(TWEEN.Easing.Quintic.Out)
          .onComplete(() => {
            controler.minDistance = 30
            controler.maxDistance = 200
            // if(controler) controler.enableZoom = false
            this.videoEnded = true
            // document.querySelector('.header').style.zIndex = 300
            // this.$nextTick(() => {
            //   document.querySelector('.header').classList.add('animate__animated', 'animate__fadeInDown', 'animate__fast')
            //   document.querySelector('.footer').classList.add('animate__animated', 'animate__fadeInUp', 'animate__fast')
            // })
          })
        tween.chain(tweenNext)
      },
      // 加载点模型
      modelLoad() {
        const circle = new THREE.Mesh(
          new THREE.CircleBufferGeometry(15, 64),
          new THREE.ShaderMaterial({
            uniforms: {
              iTime: { value: 0 },
              animate: { value: false },
              color: { value: new THREE.Color(0xFEDA33) }
            },
            side: 2,
            transparent: true,
            depthTest: false,
            vertexShader,
            fragmentShader: pointSpread
          })
        )
        circle.rotateX(-Math.PI / 2)
        circle.position.y = -1.2
        circle.scale.set(0.1, 0.1, 0.1)
        pointModel.add(circle)
        modelGroup = new THREE.Group()
        this.pointShowAniamte(null, true)
        modelGroup.rotateX(-Math.PI / 2)
        scene.add(modelGroup)
      },
      // 点位显示和切换
      pointShowAniamte(value, isFirst) {
        if (infoObj !== null) { scene.remove(infoObj, infoStartPoint) }
        this.active = this.active === value ? null : value
        this.waterWorksType.forEach((item, i) => {
          if (this.active === null) {
            if (isFirst) {
              // 提示文本创建
              const tipElement = document.createElement('div')
              tipElement.className = 'tipElement'
              item.points.forEach(point => {
                const newEle = tipElement.cloneNode(true)
                newEle.innerText = point.name
                const css2dText = new CSS2DObject(newEle)
                css2dText.visible = false
                css2dText.position.set(0, -3, 0)
                const newObj = pointModel.clone(true)
                newObj.add(css2dText)
                const { x, y } = { x: (point.mapCoord[0] - 114.19) * 25.6 * 5, y: (point.mapCoord[1] - 22.63) * 28 * 5 }
                newObj.position.set(x, y, 4 + Math.random() / 10)
                newObj.rotateX(-Math.PI / 2)
                newObj.traverse(child => {
                  if (child.isMesh) {
                    child.name = point.businessCode
                    child.visible = false
                    if (child.material && child.material.uniforms) {
                      try {
                        child.material = new THREE.ShaderMaterial({
                          uniforms: {
                            iTime: { value: 0 },
                            animate: { value: false },
                            color: { value: new THREE.Color(this.color[i]) }
                          },
                          side: 2,
                          transparent: true,
                          depthWrite: false,
                          depthTest: true,
                          vertexShader,
                          fragmentShader: pointSpread
                        })
                      } catch (e) {}
                    }
                  }
                })
                modelGroup.add(newObj)
              })
            } else {
              item.points.forEach(point => {
                modelGroup.traverse(child => { // 隐藏所有
                  if (child.isMesh) {
                    child.parent.offAll()
                    child.visible = false
                  }
                })
              })
            }
          } else if (this.active !== item.value) { // 隐藏
            item.points.forEach(point => {
              modelGroup.traverse(child => {
                if (child.isMesh) {
                  if (child.name === point.businessCode) {
                    child.parent.offAll()
                    child.visible = false
                  }
                }
              })
            })
          } else {
            item.points.forEach(point => {
              modelGroup.traverse(child => { // 显示当前
                if (child.isMesh) {
                  if (child.name === point.businessCode) {
                    this.setEventOfModel(child.parent, point)
                    child.visible = true
                    if (child.material && child.material.uniforms) {
                      try {
                        child.material.uniforms.animate.value = false
                      } catch (e) {}
                    }
                  }
                }
              })
            })
          }
        })
      },
      // 添加信息text
      addTextInfo(g, m, item) {
        // 提示文本创建if(infoObj!== null)
        if (infoObj !== null) {
          scene.remove(infoObj, infoStartPoint)
        }
        if (item.mapSubTitle === infoElement.querySelector('.detail').innerText && this.noteShow) {
          this.noteShow = false
          m.material.uniforms.animate.value = false
          return false
        } else {
          this.noteShow = true
          modelGroup.traverse(child => {
            if (child.isMesh) {
              if (child.material && child.material.uniforms) {
                try {
                  child.material.uniforms.animate.value = false
                } catch (e) {}
              }
            }
          })
          m.material.uniforms.animate.value = true
        }
        this.showNodeData = this.nodeData.filter(x => x.factoryId === item.id)
        infoElement.querySelector('.title').innerText = item.name
        infoElement.querySelector('.detail').innerText = item.mapSubTitle
        infoObj = new CSS2DObject(infoElement)
        const v3 = new THREE.Vector3()
        g.getWorldPosition(v3)
        const { x, y, z } = v3
        infoObj.position.set(x, y + 1.5, z)
        scene.add(infoObj)
      },
      routerInto() {
      },
      // 点模型设置事件
      setEventOfModel(model, value) {
        // hover事件
        model.on('hover', (g, m) => {
          outlinePass.edgeStrength = 2
          outlinePass.visibleEdgeColor = new THREE.Color(this.color[this.active - 1])
          outlinePass.selectedObjects = [model]
          g.children[1].visible = true
        }, (g, m) => {
          outlinePass.selectedObjects = []
          g.children[1].visible = false
        })
        // 点击事件
        model.on('click', (g, m) => {
          g.children[1].visible = false
          this.addTextInfo(g, m, value)
          this.selecteFactories = value
        })
      },
      // 视频宽高自适应
      autoSizeVideo() {
        if (window.innerWidth / 1920 > window.innerHeight / 1080) {
          this.$refs.video.style.width = '100%'
          this.$refs.video.style.height = 'auto'
        } else {
          this.$refs.video.style.width = 'auto'
          this.$refs.video.style.height = '100%'
        }
      },
      // 场景自适应
      resizeView() {
        render.setSize(this.views.clientWidth, this.views.clientHeight)
        render1.setSize(this.views.clientWidth, this.views.clientHeight)
        render2.setSize(this.views.clientWidth, this.views.clientHeight)
        camera.aspect = this.views.clientWidth / this.views.clientHeight// 相机重置可视范围
        camera.updateProjectionMatrix()
        objEvent.resize()
        // this.autoSizeVideo()
      },
      sceneClear() {
        scene.traverse(child => {
          if (child.isMesh) {
            child.geometry.dispose()
            child.material.dispose()
          }
        })
        map = new THREE.Group()
        textGroup = new THREE.Group()
        modelGroup = new THREE.Group()
        objEvent.clear()
        scene.clear()
        render.dispose()
        scene = null
        camera = null
        controler = null
        cancelAnimationFrame(this.animateId)
        window.removeEventListener('resize', this.resizeView)
      },
      animation() {
        const delta = clock.getDelta()
        TWEEN.update()
        controler.update(delta)
        // render.render(scene, camera)
        composer.render(scene, camera)
        render1.render(scene, camera)
        render2.render(scene, camera)
        const elapsedTime = clock.getElapsedTime()
        // Update passes
        scene.traverse((child) => {
          if (child.material && child.material.uniforms) {
            try {
              child.material.uniforms.iTime.value = elapsedTime
            } catch (e) {}
          }
        })
        this.animateId = requestAnimationFrame(this.animation)
        // console.log(camera.position)
      },
      delayTime(time, timer = null) {
        let count = 0
        timer = setInterval(() => {
          this.progress += 1
          count++
          if (count === 40) {
            clearInterval(timer)
          }
        }, 40 * 1000 / time)
      }
    },
    mounted() {
      // document.body.style.cursor = 'none'
      // document.querySelector('.header').style.zIndex = '-10'
      // this.autoSizeVideo()
      // this.$refs.video.addEventListener('loadedmetadata', () => {
      // this.playVideo()
      this.init()
      this.loadObj()
      this.getGeoJson()
      this.planeMesh()
      this.createText()
      this.delayTime(1000)
      // })
      window.addEventListener('resize', this.resizeView)
    },
    beforeDestroy() {
      this.sceneClear()
    }
  }
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
$normalColor: #1e606d;
.earth_home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  .home-view {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .video-wrap {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    #video {
      display: block;
    }
  }
  .loading-wrap {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    ::v-deep .ivu-progress-bg {
      background-color: #20cabf;
    }
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
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
    display: flex;
  }
}
.header,
.footer {
  position: absolute;
  z-index: 100;
  font-family: 'zuiguan';
}
.header {
  left: 0;
  top: 0;
  width: 100vw;
  height: 80px;
  z-index: 20;
  padding: 10px 20px;
  .nav-left {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: 26px;
    .header-title {
      color: #fff;
      font-family: 'zuiguan';
      margin-top: 10px;
    }
  }
}
.footer {
  width: 100%;
  bottom: 60px;
  user-select: none;
  .foot-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      padding: 6px;
      background: linear-gradient(to left, $normalColor, $normalColor) left top no-repeat,
        linear-gradient(to bottom, $normalColor, $normalColor) left top no-repeat,
        linear-gradient(to left, $normalColor, $normalColor) right top no-repeat,
        linear-gradient(to bottom, $normalColor, $normalColor) right top no-repeat,
        linear-gradient(to left, $normalColor, $normalColor) left bottom no-repeat,
        linear-gradient(to bottom, $normalColor, $normalColor) left bottom no-repeat,
        linear-gradient(to left, $normalColor, $normalColor) right bottom no-repeat,
        linear-gradient(to bottom, $normalColor, $normalColor) right bottom no-repeat;
      background-size: 1.5px 10px, 10px 1.5px, 1.5px 10px, 10px 1.5px;
      &.active1 {
        background: linear-gradient(to left, #2ca796, #2ca796) left top no-repeat,
          linear-gradient(to bottom, #2ca796, #2ca796) left top no-repeat,
          linear-gradient(to left, #2ca796, #2ca796) right top no-repeat,
          linear-gradient(to bottom, #2ca796, #2ca796) right top no-repeat,
          linear-gradient(to left, #2ca796, #2ca796) left bottom no-repeat,
          linear-gradient(to bottom, #2ca796, #2ca796) left bottom no-repeat,
          linear-gradient(to left, #2ca796, #2ca796) right bottom no-repeat,
          linear-gradient(to bottom, #2ca796, #2ca796) right bottom no-repeat;
        background-size: 1.5px 10px, 10px 1.5px, 1.5px 10px, 10px 1.5px;
      }
      &.active2 {
        background: linear-gradient(to left, #aaab4e, #aaab4e) left top no-repeat,
          linear-gradient(to bottom, #aaab4e, #aaab4e) left top no-repeat,
          linear-gradient(to left, #aaab4e, #aaab4e) right top no-repeat,
          linear-gradient(to bottom, #aaab4e, #aaab4e) right top no-repeat,
          linear-gradient(to left, #aaab4e, #aaab4e) left bottom no-repeat,
          linear-gradient(to bottom, #aaab4e, #aaab4e) left bottom no-repeat,
          linear-gradient(to left, #aaab4e, #aaab4e) right bottom no-repeat,
          linear-gradient(to bottom, #aaab4e, #aaab4e) right bottom no-repeat;
        background-size: 1.5px 10px, 10px 1.5px, 1.5px 10px, 10px 1.5px;
      }
      &.active3 {
        background: linear-gradient(to left, #2c94a7, #2c94a7) left top no-repeat,
          linear-gradient(to bottom, #2c94a7, #2c94a7) left top no-repeat,
          linear-gradient(to left, #2c94a7, #2c94a7) right top no-repeat,
          linear-gradient(to bottom, #2c94a7, #2c94a7) right top no-repeat,
          linear-gradient(to left, #2c94a7, #2c94a7) left bottom no-repeat,
          linear-gradient(to bottom, #2c94a7, #2c94a7) left bottom no-repeat,
          linear-gradient(to left, #2c94a7, #2c94a7) right bottom no-repeat,
          linear-gradient(to bottom, #2c94a7, #2c94a7) right bottom no-repeat;
        background-size: 1.5px 10px, 10px 1.5px, 1.5px 10px, 10px 1.5px;
      }
      .type-icon {
        background-color: rgba(225, 225, 255, 0.3);
        border-radius: 50%;
        margin-right: 20px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .border-inner {
        position: relative;
        display: flex;
        align-items: center;
        text-align: start;
        justify-content: center;
        color: #fff;
        width: 300px;
        padding: 10px 0;
        background-color: rgba(23, 88, 107, 0.3);
        &.active1,
        &.active2,
        &.active3 {
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            animation: opacityShow 0.5s forwards;
          }
        }
        @keyframes opacityShow {
          from {
            opacity: 0.3;
          }
          to {
            opacity: 1;
          }
        }
        &.active1::after {
          background: linear-gradient(0deg, #127c6e, #2ca796);
        }
        &.active2::after {
          background: linear-gradient(0deg, #877631, #aaab4e);
        }
        &.active3::after {
          background: linear-gradient(0deg, #13597d, #2c94a7);
        }
        &:hover:not([class*='active']) {
          background-color: rgba(23, 88, 107, 0.6);
        }
      }
      &:nth-child(2) {
        margin: 0 20px;
      }
      h6 {
        font-size: 22px;
        font-family: 'zuiguan';
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
$activeColor: #ffcd10;
.city-area {
  padding: 4px 4px 0px 4px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'zuiguan';
}
.tipElement {
  padding: 5px 5px 1px 5px;
  font-size: 12px;
  color: $activeColor;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'zuiguan';
}
.point-note {
  text-align: start;
  position: relative;
  line-height: 16px;
  color: $activeColor;
  .trangle {
    position: absolute;
    left: calc(50% + 1px);
    top: 50%;
    transform: translate(-50%, -100%) rotateZ(8deg);
    width: 8px;
    height: 8px;
    border-top: 16px solid $activeColor;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    opacity: 0;
    animation: my_fadeInleft 0.2s ease-in forwards;
  }
  &::after {
    content: '';
    display: block;
    width: 0px;
    height: 1.5px;
    background: $activeColor;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: rotateZ(-80deg);
    transform-origin: left center;
    animation: my_widthShow1 0.3s linear 0.2s forwards;
    @keyframes my_widthShow1 {
      from {
        width: 0;
      }
      to {
        width: 80px;
      }
    }
  }
  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 1.5px;
    background: $activeColor;
    position: absolute;
    transform: rotateZ(-5deg);
    transform-origin: left center;
    left: calc(50% + 13.1px);
    top: calc(50% - 79px);
    animation: my_widthShow2 0.2s linear 0.5s forwards;
    @keyframes my_widthShow2 {
      from {
        width: 0;
      }
      to {
        width: 20px;
      }
    }
  }
  .info-box {
    width: 290px;
    position: absolute;
    top: 50%;
    left: calc(50% + 33px);
    transform: translateY(calc(-50% - 79px));
    padding: 10px 15px 0px 15px;
    background: rgba(41, 47, 36, 0.7);
    border-left: 2px solid $activeColor;
    border-right: 2px solid $activeColor;
    opacity: 0;
    animation: my_fadeInleft 0.3s ease-in 0.2s forwards;
    @keyframes my_fadeInleft {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    &::before {
      content: '';
      display: block;
      width: calc(100% + 4px);
      height: 10px;
      background: url('/img/card_bg_top.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -9.7px;
      left: -2px;
    }
    &::after {
      content: '';
      display: block;
      width: calc(100% + 4px);
      height: 10px;
      background: url('/img/card_bg_footer.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: -9.8px;
      left: -2px;
    }
    .top-wrap {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 246, 94, 0.5);
      margin-bottom: 10px;
      padding: 2px;
      position: relative;
      .type-icon {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        margin-top: -5px;
        margin-right: 12px;
        background-color: rgba(115, 109, 17, 1);
        color: rgba(255, 246, 94, 1);
        border-radius: 50%;
      }
      .head-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .title {
        width: 190px;
        font-family: 'zuiguan';
        font-size: 14px;
        line-height: 22px;
        color: $activeColor;
      }
      .detail {
        width: 190px;
        font-size: 12px;
        color: $activeColor;
        margin-bottom: 8px;
      }
      .right-icon {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .info-content {
      color: #fff;
      width: 100%;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'zuiguan';
        line-height: 24px;
        .name {
          font-size: 12px;
        }
        .value {
          font-size: 14px;
        }
        .unit {
          font-size: 12px;
          transform: scale(0.8);
          color: #aaaaaa;
          display: inline-block;
          width: 50px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
