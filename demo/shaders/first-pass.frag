precision highp float;

uniform sampler2D lastFBO;
varying vec2 uv;


void main() {
  vec4 c = texture2D(lastFBO, uv);

  float v = dot(c, c);
  if (v > 0.0) {
    gl_FragColor = c + 0.01;
  } else {
    gl_FragColor = c - 0.1;
  }
}
