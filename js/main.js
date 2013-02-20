document.onselectstart = function(){ return false; }
var dpr = window.devicePixelRatio;

YUI().use("node", "color-base", function (Y) {

  //--DOM
  var body = Y.one ('body');
  body.on ("mouseup", function (event) {
    mouse_left = 0;
    mouse_right = 0;
    hue_select_md = 0;
    sl_select_md = 0;
  });


  //--Set-values
  var grid_type = 'rect'; //rect=rectangle;
  var grid_cell_w = 20;
  var grid_cell_h = 20;
  var grid_width = Math.floor((body.get ('offsetWidth') - 40) /grid_cell_w);
  var grid_height = Math.floor((body.get ('offsetHeight') - 90)/grid_cell_h);
  var canvas_width = grid_width*grid_cell_w;
  var canvas_height = grid_height*grid_cell_h;


  //--Tool-select
  var t_all_icons = Y.all ('.nav-icon');
  var t_brush = Y.one ('#brush');
  var t_eraser = Y.one ('#eraser');
  var t_clear_all = Y.one ('#clear-all');
  var t_color = Y.one ('#color');
  var brush_color = '#000';
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
  t_clear_all.on ('click', function (e) {
    context.clearRect (0, 0, grid_width*grid_cell_w, grid_height*grid_cell_h);
  });

  //Generate-canvas-background-grid
  function getCanvasBg () {
    var canvas_bg = Y.Node.create('<canvas id="canvas-bg" width=\"'+ grid_cell_w +'\" height=\"'+ grid_cell_h +'\" style="display:block;"></canvas>');
    Y.one('#canvas-wrapper').appendChild(canvas);
    var bg_context = canvas_bg.getDOMNode ().getContext ('2d');
    bg_context.beginPath ();
    bg_context.moveTo (0, 0);
    bg_context.lineTo (grid_cell_w, 0);
    bg_context.lineTo (grid_cell_w, grid_cell_h);
    bg_context.strokeStyle= "rgba(0,0,0,0.1)";
    bg_context.stroke ();
    var bg_url = canvas_bg.getDOMNode ().toDataURL();
    var bg_style = 'url('+ bg_url +')';
    return bg_style;
  }


  //Color-picker
  var hue_select = Y.one ('#color-hue');
  var hue_select_b = Y.all ('#color-hue .range-button');
  var hue_select_md = 0;
  var sl_select = Y.one ('#color-sl');
  var sl_select_b = Y.all ('#color-sl .range-button');
  var sl_select_bg = Y.one ('#color-sl-bg');
  var sl_context = sl_select_bg.getDOMNode ().getContext ('2d');
  var sl_select_md = 0;
  var color_preview = Y.one ('#color-preview');
  var color_picked = '#000';
  var color_H = 0;
  var color_S = '100%';
  var color_L = '0%';

  function drawSL() {
    for (var i=0;i<280;i++){
      for (var j=0;j<280;j++){
        sl_context.fillStyle = 'hsl(' + color_H  + ',' + parseInt((i / 280) * 100, 10) + '%,' + (100 - parseInt((j / 280) * 100, 10)) + '%)';
        sl_context.fillRect(i,j,1,1);
      }
    }
  }
  drawSL ();

  hue_select.on ('mousedown', function (e) {
    hue_select_md = 1;
    var button_left = e.pageX-hue_select.getX ();
    hue_select_b.setStyle('left', button_left);
    color_H = parseInt( (button_left / parseInt(hue_select.getStyle ('width'), 10)) * 360, 10);
    color_picked = 'hsl(' + color_H + ',' + color_S + ',' + color_L + ')';
    color_preview.setStyle ('background', color_picked);
    brush_color = color_picked;
    drawSL ();
  });
  body.on ('mousemove', function (e) {
    if ( hue_select_md == 1) {
      var button_left = e.pageX-hue_select.getX ();
      hue_select_b.setStyle('left', button_left);
      color_H = parseInt( (button_left / parseInt(hue_select.getStyle ('width'), 10)) * 360, 10);
      color_picked = 'hsl(' + color_H + ',' + color_S + ',' + color_L + ')';
      color_preview.setStyle ('background-color', color_picked);
      brush_color = color_picked;
      drawSL ();
    }
  });

  sl_select.on ('mousedown', function (e) {
    sl_select_md = 1;
    var button_left = e.pageX-sl_select.getX ();
    var button_top = e.pageY-sl_select.getY ();
    if (button_left >= 0 && button_left < 280) {sl_select_b.setStyle('left', button_left);}
    if (button_top >= 0 && button_top < 280) {sl_select_b.setStyle('top', button_top);}
    color_S = parseInt((button_left / parseInt(sl_select.getStyle ('width'), 10)) * 100, 10) + '%';
    color_L = (100 - parseInt((button_top / parseInt(sl_select.getStyle ('height'), 10)) * 100, 10)) + '%';
    color_picked = 'hsl(' + color_H + ',' + color_S + ',' + color_L + ')';
    color_preview.setStyle ('background', color_picked);
    brush_color = color_picked;
    console.log (color_picked);
  });
  body.on ('mousemove', function (e) {
    if ( sl_select_md == 1) {
      var button_left = e.pageX-sl_select.getX ();
      var button_top = e.pageY-sl_select.getY ();
      if (button_left >= 0 && button_left < 280) {sl_select_b.setStyle('left', button_left);}
      if (button_top >= 0 && button_top < 280) {sl_select_b.setStyle('top', button_top);}
      color_S = parseInt((button_left / parseInt(sl_select.getStyle ('width'), 10)) * 100, 10) + '%';
      color_L = (100 - parseInt((button_top / parseInt(sl_select.getStyle ('height'), 10)) * 100, 10)) + '%';
      color_picked = 'hsl(' + color_H + ',' + color_S + ',' + color_L + ')';
      color_preview.setStyle ('background', color_picked);
      brush_color = color_picked;
      console.log (color_picked);
    }
  });






  //--Generate-canvas
  var canvas = Y.Node.create('<canvas id="canvas" width=\"'+ grid_width*grid_cell_w +'\" height=\"'+ grid_height*grid_cell_h +'\"></canvas>');
  //  canvas.setStyle ("height", (grid_height*grid_cell_h)/2 );
  //  canvas.setStyle ("width", (grid_width*grid_cell_w)/2 );
  Y.one('#canvas-wrapper').appendChild(canvas);
  var context = canvas.getDOMNode ().getContext ('2d');
  canvas.setStyle ('background', getCanvasBg ());



  //--Mouse-status
  var mouse_x = 0;
  var mouse_y = 0;
  var mouse_left = 0;
  var mouse_right = 0;
  canvas.on ("mousedown", function (event) {
    if (event.button == 1) {mouse_left = 1;}
  });

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

  canvas.on ("click", function (e) {
    mouse_x = e.pageX-canvas.getX ();
    mouse_y = e.pageY-canvas.getY ();
    cell_x = Math.floor(mouse_x/grid_cell_w)*grid_cell_w;
    cell_y = Math.floor(mouse_y/grid_cell_h)*grid_cell_h;
    if (tool==1) {
      fillCell [grid_type] ();
    }
    if (tool==0) {
      eraseCell [grid_type] ();
    }
  });


  var fillCell =  {
    rect: function () {
      context.fillStyle = brush_color;
      context.fillRect (cell_x, cell_y, grid_cell_w, grid_cell_h);
    }
  }

  var eraseCell =  {
    rect: function () {
      context.clearRect (cell_x, cell_y, grid_cell_w, grid_cell_h);
    }
  }

});
