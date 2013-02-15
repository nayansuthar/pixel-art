document.onselectstart = function(){ return false; }
var dpr = window.devicePixelRatio;

YUI().use("node", function (Y) {

  //--DOM
  var body = Y.one ('body');

  //--Set-values
  var grid_width = 100;
  var grid_height = 40;
  var grid_type = 'rect'; //rect=rectangle;
  var grid_cell_w = 10;
  var grid_cell_h = 10;
  var canvas_width = grid_width*grid_cell_w;
  var canvas_height = grid_height*grid_cell_h;


  //--Tool-select
  var t_all_icons = Y.all ('.nav-icon');
  var t_brush = Y.one ('#brush');
  var t_eraser = Y.one ('#eraser');
  var t_clear_all = Y.one ('#clear-all');
  var t_color = Y.one ('#color');
  var tool = 1; //0=eraser; 1=brush;
  function getColor () {
    return t_color.get ("value");
  }

  t_eraser.on ('click', function (e) {
    tool = 0;
    t_all_icons.removeClass ('active');
    t_eraser.addClass ('active');
  });
  t_brush.on ('click', function (e) {
    tool = 1;
    t_all_icons.removeClass ('active');
    t_brush.addClass ('active');
  });
  t_clear_all.on ('click', function (e) {
      context.clearRect (0, 0, grid_width*grid_cell_w, grid_height*grid_cell_h);
  });


  //--Generate-canvas
  var canvas = Y.Node.create('<canvas id="canvas" width=\"'+ grid_width*grid_cell_w +'\" height=\"'+ grid_height*grid_cell_h +'\"></canvas>');
  //  canvas.setStyle ("height", (grid_height*grid_cell_h)/2 );
  //  canvas.setStyle ("width", (grid_width*grid_cell_w)/2 );
  Y.one('#canvas-wrapper').appendChild(canvas);
  var context = canvas.getDOMNode ().getContext ('2d');

  //Generate-background-grid
  var canvas_bg = Y.Node.create('<canvas id="canvas-bg" width=\"'+ grid_cell_w +'\" height=\"'+ grid_cell_h +'\" style="display:block;"></canvas>');
  Y.one('#canvas-wrapper').appendChild(canvas);
  var bg_context = canvas_bg.getDOMNode ().getContext ('2d');
  bg_context.beginPath ();
  bg_context.moveTo (0, 0);
  bg_context.lineTo (grid_cell_w, 0);
  bg_context.lineTo (grid_cell_w, grid_cell_h);
  bg_context.lineStyle= "rgba(0,0,0,0.2)";
  bg_context.stroke ();
  var bg_url = canvas_bg.getDOMNode.toDataURL();
  var bg_style = 'url('+ bg_url +')';
  canvas.setStyle ('background', bg_style);



  //--Mouse-status
  var mouse_x = 0;
  var mouse_y = 0;
  var mouse_left = 0;
  var mouse_right = 0;
  canvas.on ("mousedown", function (event) {mouse_left = 1;});
  body.on ("mouseup", function (event) {mouse_left = 0;});

  //--cell
  var cell_x = 0;
  var cell_y = 0;


  canvas.on ("mousemove", function (e) {
    mouse_x = e.pageX-canvas.getX ();
    mouse_y = e.pageY-canvas.getY ();
    cell_x = Math.floor(mouse_x/grid_cell_w)*grid_cell_w;
    cell_y = Math.floor(mouse_y/grid_cell_h)*grid_cell_h;
    if (mouse_left==1 && tool==1) {
      fillCell [grid_type] ();
    }
    if (mouse_left==1 && tool==0) {
      eraseCell [grid_type] ();
    }
  });


  var fillCell =  {
    rect: function () {
      context.fillStyle = getColor ();
      context.fillRect (cell_x, cell_y, grid_cell_w, grid_cell_h);
    }
  }

  var eraseCell =  {
    rect: function () {
      context.clearRect (cell_x, cell_y, grid_cell_w, grid_cell_h);
    }
  }

});
