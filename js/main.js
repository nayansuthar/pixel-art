YUI().use('node', function (Y) {

  //values
  var grid_width = 100;
  var grid_height = 40;
  var pixel_size = 10;

  //elements
  var pixel_grid = Y.one ('#pixel-grid');
  var pixels= Y.all ('.pixel');
  var body = Y.one ('body');
  var clear_all = Y.one ('#clear-all');
  var eraser = Y.one ('#eraser');
  var brush = Y.one ('#brush');
  var nav_icons = Y.all ('.nav-icon');

  //generate-grid
  pixel_grid.setStyle ('width', (grid_width*pixel_size)+1 +'px');
  pixel_grid.setStyle ('height', (grid_height*pixel_size)+1 +'px');
  for (i=1; i<=grid_width*grid_height; i++) {
    pixel_grid.append ('<li class="pixel"></li>');
  }
  var pixels= Y.all ('.pixel');



  //Mouse-status
  var mouse_clicked = 0;
  pixel_grid.on ("mousedown", function (event) {mouse_clicked = 1;});
  body.on ("mouseup", function (event) {mouse_clicked = 0;});


  //tool-selected
  var tool = 1; //0=eraser; 1=brush;
  eraser.on ('click', function (e) {
    tool = 0;
    nav_icons.removeClass ('active');
    eraser.addClass ('active');
  });

  brush.on ('click', function (e) {
    tool = 1;
    nav_icons.removeClass ('active');
    brush.addClass ('active');
  });

  //click-toggle
  pixel_grid.delegate ("click", function (event) {
    event.currentTarget.toggleClass ("colored");
  }, ".pixel");

  //tool-move
  pixel_grid.delegate ("mousemove", function (event) {
    if (mouse_clicked==1) {
      switch (tool) {
      case 0:
        event.currentTarget.removeClass ("colored");
        break;
      case 1:
        event.currentTarget.addClass ("colored");
      }
    };
  }, ".pixel");

  //clear-all-call
  clear_all.on ('click', function (e) {
    pixels.removeClass("colored");
  });



});
