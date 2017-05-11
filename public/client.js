/* globals saveAs */

$(function() {
  var canvas = document.getElementById("doItForHer");
  var ctx = canvas.getContext("2d");
  
  
  // awful hacks to bypass cross-origin weirdness
  var url = 'https://cdn.glitch.com/5060b8b9-3775-477c-ad08-f5a71270b612%2Fe45.png';
  var template = new Image();
  template.src = url + '?' + new Date().getTime();
  template.setAttribute('crossOrigin', '');  
  
  template.onload = function() {
    ctx.drawImage(template, 0, 0);
  }
  
  var $imageList = $('#sortable');
  
  $('#upload').change(function(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function() {
//           probably need to constrain the image somehow?
          // but also not mess it up for drawing it?
          // link thumbnail to a cached version?
          
          $imageList.append(img)
          
          draw();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  });
  
  $('.download').click(function () {
    canvas.toBlob(function(blob) {
      saveAs(blob, "doitforher.png");
    });
  });

//   x, y, and width, height for each place you want to draw an image
  var coordinates = [
    [101, 11, 159, 85],
    [532, 4, 143, 94],
    [519, 126, 149, 173],
    [432, 109, 115, 70],
    [233, 195, 108, 80],
    [270, 267, 226, 221],
    [557, 330, 79, 125],
    [100, 206, 169, 124],
    [4, 327, 83, 146],
    [183, 133, 47, 56],
    [219, 108, 32, 35]
  ];
  
  $imageList.sortable({
    revert: true
  });
  
  $("ul, li").disableSelection();

  $imageList.on( "sortchange", function(event, ui) {
    draw();
  });
  
  function draw () {
    document.querySelectorAll('.toolbar img').forEach(function(element, i) {
      if (i < coordinates.length) {
        var c = coordinates[i];
        ctx.drawImage(element, c[0], c[1], c[2], c[3]);
        
      }
    });
    ctx.drawImage(template, 0, 0);
  }
});
