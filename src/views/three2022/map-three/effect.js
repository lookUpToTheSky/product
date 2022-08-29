/*
 * @Author: 1179373677@qq.com
 * @Date: 2022-06-16 11:40:34
 * @LastEditors: 1179373677@qq.com
 * @LastEditTime: 2022-06-29 10:55:13
 * @Description:
 */

export const vertexShader = `
varying vec3 vPosition;
varying vec2 vUv;
void main() { 
    vUv = uv; 
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vPosition = position;
}
`
export const pointSpread = `
  uniform float iTime; 
  varying vec2 vUv;  
  uniform vec3 color;
  uniform bool animate; 
  void main(void) {
      float time = 0.0;
      if(animate) {
        time = sin(fract(iTime / 2.5)) * 0.8 - 0.3;
      } 
      float d = length(vUv - vec2(0.5));
      vec3 f = (smoothstep(0.12, 0.1, d))*color;
      if(d < 0.25+time) {
          f += (smoothstep(0.0+time, 0.25+time, d))*0.5*color; 
      }else if(d < 0.3+time) {
          f += (smoothstep(0.3+time, 0.25+time, d))*0.5*color; 
      }
      if(d < 0.5+time ) {
          f += (smoothstep(0.0+time, 0.5+time, d))*0.08*color; 
      }
      vec3 colors = mix(f, color, 0.8);
      gl_FragColor = vec4(colors, f.r+f.g+f.b);
}`
export const bgPlane = `
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#define M_PI 3.1415926535897932384626433832795
float PI = 3.1415926;
uniform vec3 color;
uniform float iTime;
uniform vec2 iResolution; 
uniform sampler2D map;
varying vec2 vUv;

float moveCircle(vec2 uv, vec2 center, float radius, float width, float opening)
{
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    float theta0 = 250.0 * sin( iTime*0.5 );
    d = normalize(d);

    vec2 p = radius*vec2(cos(theta0*M_PI/180.0),
                        -sin(theta0*M_PI/180.0));
    float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 1.0) );
    float theta = mod(180.0*atan(d.y,d.x)/M_PI+theta0,360.0);
    float gradient = clamp(1.0-theta/90.0,0.0,1.0);

    if( gradient > opening )
        return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
    else
        return 0.0;
}
void main() { 
  vec2 _uv = vec2(vUv.x * iResolution.x, vUv.y * iResolution.y);
  vec3 finalColor;
  vec2 uv = _uv;
  vec2 c = vec2(iResolution.x / 2.0, iResolution.y / 2.0);
  vec4 mapcol = texture2D(map,vUv);
  float res = moveCircle(uv, c, 403.0, 4.0, 0.85);
  finalColor = res == 0.0 ? mapcol.rgb : res * color;
  gl_FragColor = vec4( finalColor, 1.0);
}
`
