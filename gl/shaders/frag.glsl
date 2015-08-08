precision highp float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float time;
varying vec2 vposition;

void main() {
  float d = pow( abs( vposition.y ) * 3.0, 1.1 );
  float n = - snoise2( ( gl_PointCoord + gl_FragCoord.xy ) * 0.075 ) * 0.5;
  float r = 1.0 - length( ( gl_PointCoord.xy - vec2( 0.5 ) ) * 2.0 );
  float alpha = ( r + n ) * max( d, 0.01 );

  vec3 c1 = vec3( 1.0, 1.0, 1.0 );
  vec3 c2 = vec3( 1.0, 0.54, 0.0 );
  gl_FragColor = vec4( mix( c1, c2, d ), alpha );
}
