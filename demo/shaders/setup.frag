precision highp float;

varying vec2 uv;

void main() {
  gl_FragColor = vec4(sin(uv.x*100.0) * sin(uv.y*10.0), 0.0, 0.0, 1.0);
}
