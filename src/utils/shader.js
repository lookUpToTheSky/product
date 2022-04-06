/**
 * 预览模型
 */
// import * as THREE from 'three'
// const vertexShader = `
// 		varying vec3 vPosition;
// 		varying vec2 vUv;
// 		void main() { 
// 			vUv = uv; 
// 			vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
// 			gl_Position = projectionMatrix * mvPosition;
// 		}
// 		`;
// const getMesh = (fragmentShader) => {
//     const geometry = new THREE.PlaneGeometry(20, 20);
//     const material = new THREE.ShaderMaterial({
//         uniforms: {
//             iTime: {
//                 value: 0
//             },
//             iResolution: {
//                 value: new THREE.Vector2(1900, 1900)
//             },
//             iChannel0: {
//                 value: window.iChannel0
//             },
//             iChannel1: {
//                 value: window.iChannel1
//             },

//         },
//         side: 2,
//         depthWrite: false,
//         transparent: true,
//         vertexShader: vertexShader,
//         fragmentShader: fragmentShader
//     })
//     const plane = new THREE.Mesh(geometry, material);
//     plane.rotation.x = -Math.PI / 2;
//     return plane;
// }
export default {
    shader1() {
        let fragmentShader = `
        uniform float iTime;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform vec3 color;
        void main(){
            vec4 texture = texture2D(tDiffuse, vUv);
            float x = vPosition.x;
            float lighty = -x*1.2 + iTime;
            float alpha = abs(vPosition.y - lighty) / 5.0;

            if(alpha < 0.1){
                float a = 1.0 - alpha / 0.1;
                float enda = smoothstep(0.0,1.0,a) + 0.8;
                gl_FragColor = texture* enda;
            }else{
                gl_FragColor = texture * 0.8;
            }
        }
        `
        return fragmentShader
    },
    shader2() {
        let fragmentShader = `
        uniform float iTime;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform vec3 color;
        void main(){
            vec4 texture = texture2D(tDiffuse, vUv);
            float x = vPosition.x;
            float lighty = -x*1.2 + iTime;
            float alpha = abs(vPosition.y - lighty);

            if(alpha < 0.1){
                float a = 1.0 - alpha / 0.1;
                float enda = smoothstep(0.0,1.0,a) + 1.0;
                gl_FragColor = texture* enda;
            }else{
                gl_FragColor = texture * 1.0;
            }
        }
        `
        return fragmentShader
    }
}