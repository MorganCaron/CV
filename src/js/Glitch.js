/*
 * Glitch Animation
 * 2017 - by Morgan
 * https://morgancaron.fr/
 */

Math.degtorad = function(degrees) {
	return degrees * Math.PI / 180;
};

Math.radtodeg = function(radians) {
	return radians * 180 / Math.PI;
};

Math.random_int = function(integer) {
	return Math.floor((integer + 1) * Math.random());
};

$(document).ready(function() {
	$('.stars').each(function(i) {
		var $stars = $(this);
		var note = parseInt($stars.attr('note'), 10);
		var star0 = '<i class="fas fa-star"></i>';
		var star1 = '<i class="far fa-star"></i>';
		var code = star0.repeat(note) + star1.repeat(5 - note)
		$stars.append(code);
	})
	$('img.glitch').each(function(i) {
		var $img = $(this);
		var width = $(this).width();
		var height = $(this).height();
		var classes = $(this).attr('class');
		var style = $(this).attr('style');

		var $canvas = $('<canvas></canvas>');
		$img.after($canvas);
		$canvas.addClass(classes).attr('style', style).attr('width', width).attr('height', height).html($img);
		$img = $canvas.find("> img");
		var $src = $img.attr('src');
		var context = $canvas.get(0).getContext("2d");
        /*
        var redbuf = document.createElement('canvas');
        redbuf.width = width;
        redbuf.height = height;
        var redcontext = redbuf.getContext('2d');
        redcontext.fillStyle = '#FF0000';
        redcontext.fillRect(0, 0, width, height);
        redcontext.globalCompositeOperation = "multiply";
        redcontext.drawImage($img.get(0), 0, 0);
        */
		var distance = 0;
		var angle = 90;
		var segmented = 0;
		var separated = 0;
		var chance = 20;
		function glitchImage() {
			requestAnimationFrame(glitchImage);
			context.clearRect(0, 0, width, height);
			if (!distance) {
				if (!Math.random_int(7 * chance))
					distance = Math.random() * Math.min(width, height);
			}
			else if (!Math.random_int(chance)) {
				var i = Math.random_int(2) - 1;
				distance = (i != 0) * (distance + i);
			}

			if (!angle) {
				if (!Math.random_int(2 * chance))
					angle = Math.random() * 360;
			}
			else if (!Math.random_int(chance)) {
				var i = Math.random_int(2) - 1;
				angle = (i != 0) * (angle + i * 10);
			}

			if (!segmented) {
				if (!Math.random_int(5 * chance))
					segmented = 5 + Math.random() * 10;
			}
			else if (!Math.random_int(chance)) {
				var i = Math.random_int(2) - 1;
				segmented = (i != 0) * (segmented + i) + (i == 0) * (5 + Math.random() * 10);
			}
			else if (!Math.random_int(3 * chance))
				segmented = 0;

			if (!separated) {
				if (!Math.random_int(5 * chance))
					separated = 5 + Math.random() * 5;
			}
			else if (!Math.random_int(chance)) {
				var i = Math.random_int(2) - 1;
				separated = (i != 0) * (separated + i + (i > 0)) + (i == 0) * (5 + Math.random() * 5)
			}
			else if (!Math.random_int(3 * chance))
				separated = 0;

			var x = distance * Math.cos(Math.degtorad(angle));
			var y = distance * Math.sin(Math.degtorad(angle));

			for (var i = -1; i < 2; i += 1) for (var j = -1; j < 2; j += 1)
				context.drawImage($img.get(0), i * width + x, j * height + y, width, height);

			for (i = 0; i < Math.round(segmented); i += 1) {
				var sx = width * Math.abs(Math.sin(segmented / 15 + i * 5.6531));
				var sy = height * Math.abs(Math.sin(segmented / 15 + i * 7.1451))
				var w = (width - sx) * 0.5 + Math.abs(Math.sin(segmented / 15 + i * 3.6478)) / 2;
				var h = 15 * Math.abs(Math.sin(segmented / 15 + i * 2.3854));
				var dx = (width - w / 2) * Math.abs(Math.sin(segmented / 15 + i * 9.1402));
				var dy = (height - h / 2) * Math.abs(Math.sin(segmented / 15 + i * 5.6043));
				context.drawImage($img.get(0), sx, sy, w, h, dx, dy, w, h);
			}

			if (separated) {
				var r = distance + angle + segmented;
				r = 10 * Math.abs(Math.sin(separated / 10 + r * 5.5608));
				context.globalCompositeOperation = 'difference';
				for (var i = -1; i < 2; i += 1) for (var j = -1; j < 2; j += 1)
					context.drawImage($img.get(0), i * width + 20 * Math.abs(Math.sin(separated / 10 + r / 2.1524)), j * height + 5 * Math.abs(Math.sin(separated / 10 + r * 6.8025)), width, height);
				for (var i = -1; i < 2; i += 1) for (var j = -1; j < 2; j += 1)
					context.drawImage($img.get(0), i * width + 20 * Math.abs(Math.sin(separated / 10 + r / 5.4098)), j * height + 5 * Math.abs(Math.sin(separated / 10 + r * 8.0678)), width, height);
				context.globalCompositeOperation = 'normal';
			}
		}
		glitchImage();
	})
});
