var createQuad = require('gl-quad');
var createShader = require('glslify');
var createFBO = require('gl-fbo');

module.exports = createMultipassFragmentToy;

function createMultipassFragmentToy(gl, shader, fn) {
  var myShape = [1, 1];
  var fboIndex = 0;
  var fbos = [
    createFBO(gl, myShape),
    createFBO(gl, myShape)
  ];

  var quad = createQuad(gl);

  function render(shape) {

    var shapeChanged =

    if (shape[0] !== myShape[0] || shape[1] !== myShape[1]) {
      myShape[0] = shape[0];
      myShape[1] = shape[1];

      fbos.forEach(function(fbo) {
        fbo.shape = shape;
      });

      gl.viewport(0, 0, myShape[0], myShape[1]);
    }

    shader.bind();
    var last = fbos[fboIndex];
    fboIndex = (fboIndex+1) % 2;
    fbos[fboIndex].bind();

    // allow the user to setup uniforms
    fn(last, shader, myShape);

    quad.draw();

    return fbos[fboIndex];
  }

  return render;
}
