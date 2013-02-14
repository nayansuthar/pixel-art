document.onselectstart = function(){ return false; }
YUI().use("node", function (Y) {

  //--DOM
  var body = Y.one ('body');

  //--Navigation
  var t_all_icons = Y.all ('.nav-icon');
  var t_brush = Y.one ('#brush');
  var t_eraser = Y.one ('#eraser');
  var t_clear_all = Y.one ('#clear-all');
  var tool_color = '#888402';
  var tool = 1; //0=eraser; 1=brush;
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


  //--Generate-canvas
  var grid_width = 100;
  var grid_height = 40;
  var grid_type = 'rect'; //rect=rectangle;
  var grid_cell_w = 10;
  var grid_cell_h = 10;
  var canvas = Y.Node.create('<canvas id="canvas" width=\"'+ grid_width*grid_cell_w +'\" height=\"'+ grid_height*grid_cell_h +'\"></canvas>');
  Y.one('#canvas-wrapper').appendChild(canvas);
  var context = canvas.getDOMNode ().getContext ('2d');



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
    if (mouse_left==1) {
      fillCell [grid_type] ();
    }
  });


  var fillCell =  {
    rect: function () {
      context.fillStyle = tool_color;
      context.fillRect (cell_x, cell_y, grid_cell_w, grid_cell_h);
    }
  }

});
