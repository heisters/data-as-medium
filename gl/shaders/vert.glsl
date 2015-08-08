attribute vec2 position;
uniform float time;
varying vec2 vposition;

void main() {
  float x = position.x;
  float y = position.y + sin( time * 0.1 + x * 2.0 ) * 0.2;

  vposition = position;
  gl_Position = vec4( x, y, 0, 1.0 );
  gl_PointSize = 15.0;
}
