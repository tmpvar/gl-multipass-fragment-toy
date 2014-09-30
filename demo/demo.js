var createMultipass = require('../gl-multipass-fragment-toy');
var createShader = require('glslify');
var createQuad = require('gl-quad');

var fs = require('fc');

var gl = fc(render, true, 3);
var multipassShaders = [
  createShader({
    vertex: './shaders/quad.vert',
    fragment: './shaders/first-pass.frag'
  })(gl),

  createShader({
    vertex: './shaders/quad.vert',
    fragment: './shaders/second-pass.frag'
  })(gl)
];

var setupShader = createShader({
  vertex: './shaders/quad.vert',
  fragment: './shaders/setup.frag'
})(gl);

var displayShader = createShader({
  vertex: './shaders/quad.vert',
  fragment: './shaders/display.frag'
})(gl);

var quad = createQuad(gl);
var toy = createMultipass(gl, multipassShaders);

var shape = [gl.canvas.width, gl.canvas.height];

// render first "seed" frame
toy(shape, null, setupShader);


console.log(shape);
function render(dt) {

  shape[0] = gl.canvas.width;
  shape[1] = gl.canvas.height;

  var fbo = toy(shape, function(lastFBO, shader) {
    shader.uniforms.lastFBO = lastFBO.color[0].bind();
  });

  displayShader.bind();
  displayShader.uniforms.buffer = fbo.color[0].bind();
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  quad.draw();
}
