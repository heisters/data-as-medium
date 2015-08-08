// https://github.com/stackgl/glslify/issues/41
var Papa = require('papaparse');
var createVAO = require('gl-vao');
var createBuffer = require('gl-buffer');
var createShader = require('gl-shader');
var glslify = require('glslify');
var shell = require('gl-now')( { clearColor: [ 0.12, 0.12, 0.12, 1.0 ] } );

Papa.parse( "/data/merged_expenditures_just_amount_and_date_50k.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: onDataReady
} );

var shaders = {
  vert: glslify( './shaders/vert.glsl' ),
  frag: glslify( './shaders/frag.glsl' )
};

var vao, shader, numVertices = 0, start = Date.now();

shell.on("gl-init", function() {
  var gl = shell.gl;

  //Create shader object
  shader = createShader( gl, shaders.vert, shaders.frag );
  shader.attributes.position.location = 0;

  gl.enable( gl.BLEND );
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
});

shell.on("gl-render", function(t) {
  var gl = shell.gl;

  //Bind the shader
  shader.bind();

  if ( vao ) {
    shader.uniforms.time = ( Date.now() - start ) / 1000;

    //Bind vertex array object and draw it
    vao.bind();
    vao.draw(gl.POINTS, numVertices);

    //Unbind vertex array when finished
    vao.unbind();
  }
});

function onDataReady( csv ) {
  console.log( "DATA READY" );

  var max = 0, avg, sum = 0, minDate = Number.MAX_VALUE, maxDate = Number.MIN_VALUE;

  // Run stats
  csv.data.forEach( function( row ) {
    row.amount = row.TRANSACTION_AMT;
    row.date = Date.parse( row.TRANSACTION_DT );
    // check for NaN and undefined
    if ( row.amount === undefined || row.amount !== row.amount ) return;
    if ( row.date === undefined || row.date !== row.date ) return;

    max = Math.max( max, row.amount );
    maxDate = Math.max( maxDate, row.date );
    minDate = Math.min( minDate, row.date );
    sum += row.amount;

    numVertices++;
  } );
  avg = sum / numVertices;

  // Create verts
  var vertices = csv.data.reduce( function( v, row ) {
    if ( row.amount === undefined || row.amount !== row.amount ) return v;
    if ( row.date === undefined || row.date !== row.date ) return v;

    var x = ( row.date - minDate ) / ( maxDate - minDate ) * 2.0 - 1.0 + ( Math.random() * 2.0 - 1.0 ) * 0.01;
    var y = ( row.amount - avg ) / max;
    v.push( x );
    v.push( y );

    return v;
  }, [] );

  var gl = shell.gl;
  //Create vertex array object
  vao = createVAO(gl, [
    { "buffer": createBuffer( gl, vertices ),
      "type": gl.FLOAT,
      "size": 2
    }
  ]);
}

