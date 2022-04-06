import * as THREE from 'three'

const eventList = [];
var lastObj = null

class EVENT {
    constructor({ element, camera, scene }) {
        this.element = element
        this.width = element.clientWidth
        this.height = element.clientHeight
        this.scene = scene
        this.camera = camera
        this.raycaster  = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        THREE.Object3D.prototype.on = this.object3DEvent

        element.addEventListener( 'mousedown', () => {
            this.mouseEvent.call(this, event, 'mousedown')
        }, false );

        element.addEventListener( 'mouseup', () => {
            this.mouseEvent.call(this, event, 'mouseup')
        }, false );

        element.addEventListener( 'click', () => {
            this.mouseEvent.call(this, event, 'click')
        }, false );

        element.addEventListener( 'mousemove', () => {
            this.mouseHover.call(this, event)
        }, false );
    }

    object3DEvent(type, callBack, callBack1) {
        eventList.push({ type, callBack, callBack1, object: this})
    }
    
    //click
    mouseEvent(event, clickType) {
        const mousedownList = eventList.filter(item => item.type === clickType)
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = - (event.clientY / this.height) * 2 + 1;
        if(mousedownList.length === 0) return false
        const list = mousedownList.map(item => item.object)
        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera( this.mouse, this.camera );
        // 计算物体和射线的焦点
        var intersects = this.raycaster.intersectObjects( list );
        
        if(intersects.length > 0) {
            const object = mousedownList.find(item => item.object.uuid === intersects[ 0 ].object.uuid)
            if( !!object && object.type === clickType) {
                object.callBack()
            }
        }
    }
    //hover
    mouseHover(event) {
        const mouseHoverList = eventList.filter(item => item.type === 'hover')
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = - (event.clientY / this.height) * 2 + 1;
        if(mouseHoverList.length === 0) return false
        const list = mouseHoverList.map(item => item.object)
        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera( this.mouse, this.camera );

        // 计算物体和射线的焦点
        var intersects = this.raycaster.intersectObjects( list );
        
        if(intersects.length > 0) {
            const active = mouseHoverList.find(item => item.object.uuid === intersects[ 0 ].object.uuid)
            if( !!active && active.type === 'hover' ) {
                if( lastObj === null || lastObj.object.uuid !== active.object.uuid ) {
                    if(lastObj !== null && lastObj.callBack1 !== undefined) lastObj.callBack1()
                    lastObj = active
                    active.callBack()
                }else if(lastObj.object.uuid !== active.object.uuid){
                    if(lastObj.callBack1 !== undefined) lastObj.callBack1()
                }
            }
        }else if( lastObj !== null ) {
            if(lastObj.callBack1 !== undefined) lastObj.callBack1()
            lastObj = null
        }
    }

    resize() {
        this.width = this.element.clientWidth
        this.height = this.element.clientHeight  
    }
}

export default EVENT