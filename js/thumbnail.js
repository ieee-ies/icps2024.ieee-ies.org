function thumbnail() {
	const PAINT_INTERVAL = 20;
	const IDLE_TIME_OUT = 3000;
	const PAINT_SLOW_INTERVAL = 20000;

	const NAVPANEL_XRATIO = 0.8;
	const NAVPANEL_HEIGHT = 60;

	const NAVBUTTON_XOFFSET = 5;
	const NAVBUTTON_YOFFSET = 8;
	const NAVBUTTON_WIDTH = 20;
//	const NAVBUTTON_YRATIO = 0.8;
	
	const NAVBUTTON_ARROW_XOFFSET = 5;
	const NAVBUTTON_ARROW_YOFFSET = 15;

	const HL_OFFSET = 3;

	const THUMBNAIL_LENGTH = NAVPANEL_HEIGHT - NAVBUTTON_YOFFSET*2;
	const MIN_THUMBNAIL_LENGTH = 10;

	const NAVPANEL_COLOR = 'rgba(100, 100, 100, 0.2)';
	const NAVBUTTON_BACKGROUND = 'rgb(40, 40, 40)';
	const NAVBUTTON_COLOR = 'rgb(255, 255, 255)';
	const NAVBUTTON_HL_COLOR = 'rgb(100, 100, 100)';

	const ARROW_HEIGHT = 10;
	const BORDER_WRAPPER = 2;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var navRect;
	var lButtonRect;
	var rButtonRect;

	var imageLocations = [
		'Downloads/conference photo/Day1/_MG_1438.JPG',
'Downloads/conference photo/Day1/_MG_1453.JPG',
'Downloads/conference photo/Day1/_MG_1454.JPG',
'Downloads/conference photo/Day1/_MG_1478.JPG',
'Downloads/conference photo/Day1/_MG_1481.JPG',
'Downloads/conference photo/Day1/_MG_1487.JPG',
'Downloads/conference photo/Day1/_MG_1492.JPG',
'Downloads/conference photo/Day1/_MG_1511.JPG',
'Downloads/conference photo/Day1/_MG_1514.JPG',
'Downloads/conference photo/Day1/_MG_1537.JPG',
'Downloads/conference photo/Day1/_MG_1538.JPG',
'Downloads/conference photo/Day1/_MG_1672.JPG',
'Downloads/conference photo/Day1/_MG_1674.JPG',
'Downloads/conference photo/Day1/_MG_1675.JPG',
'Downloads/conference photo/Day1/_MG_1676.JPG',
'Downloads/conference photo/Day1/_MG_1677.JPG',
'Downloads/conference photo/Day1/_MG_1678.JPG',
'Downloads/conference photo/Day1/_MG_1687.JPG',
'Downloads/conference photo/Day1/_MG_1691.JPG',
'Downloads/conference photo/Day1/_MG_1696.JPG',
'Downloads/conference photo/Day1/_MG_1697.JPG',
'Downloads/conference photo/Day1/_MG_4604.JPG',
'Downloads/conference photo/Day1/_MG_4605.JPG',
'Downloads/conference photo/Day1/_MG_4626.JPG',
'Downloads/conference photo/Day1/_MG_4629.JPG',
'Downloads/conference photo/Day1/_MG_4632.JPG',
'Downloads/conference photo/Day1/_MG_4635.JPG',
'Downloads/conference photo/Day1/_MG_4636.JPG',
'Downloads/conference photo/Day1/_MG_4639.JPG',
'Downloads/conference photo/Day1/_MG_4641.JPG',
'Downloads/conference photo/Day1/_MG_4642.JPG',
'Downloads/conference photo/Day1/_MG_4648.JPG',
'Downloads/conference photo/Day1/_MG_4649.JPG',
'Downloads/conference photo/Day1/_MG_4651.JPG',
'Downloads/conference photo/Day1/_MG_4657.JPG',
'Downloads/conference photo/Day1/_MG_4658.JPG',
'Downloads/conference photo/Day1/_MG_4659.JPG',
'Downloads/conference photo/Day1/_MG_4660.JPG',
'Downloads/conference photo/Day1/_MG_4667.JPG',
'Downloads/conference photo/Day1/_MG_4709.JPG',
'Downloads/conference photo/Day1/_MG_4713.JPG',
'Downloads/conference photo/Day1/_MG_4720.JPG',
'Downloads/conference photo/Day1/_MG_4733.JPG',
'Downloads/conference photo/Day1/_MG_4740.JPG',
'Downloads/conference photo/Day1/_MG_4745.JPG',
'Downloads/conference photo/Day1/_MG_4750.JPG',
'Downloads/conference photo/Day1/_MG_4754.JPG',
'Downloads/conference photo/Day1/_MG_4758.JPG',
'Downloads/conference photo/Day1/_MG_4762.JPG',
'Downloads/conference photo/Day1/_MG_4764.JPG',
'Downloads/conference photo/Day1/_MG_4765.JPG',
'Downloads/conference photo/Day1/_MG_4771.JPG',
'Downloads/conference photo/Day1/_MG_4773.JPG',
'Downloads/conference photo/Day1/_MG_4776.JPG',
'Downloads/conference photo/Day1/_MG_4804.JPG',
'Downloads/conference photo/Day1/_MG_4807.JPG',
'Downloads/conference photo/Day1/_MG_4808.JPG',
'Downloads/conference photo/Day1/_MG_4810.JPG',
'Downloads/conference photo/Day1/_MG_4812.JPG',
'Downloads/conference photo/Day1/_MG_4813.JPG',
'Downloads/conference photo/Day1/_MG_4815.JPG',
'Downloads/conference photo/Day1/_MG_4816.JPG',
'Downloads/conference photo/Day1/_MG_4817.JPG',
'Downloads/conference photo/Day1/_MG_4821.JPG',
'Downloads/conference photo/Day1/_MG_4822.JPG',
'Downloads/conference photo/Day1/_MG_4828.JPG',
'Downloads/conference photo/Day1/_MG_4829.JPG',
'Downloads/conference photo/Day1/_MG_4834.JPG',
'Downloads/conference photo/Day1/_MG_4838.JPG',
'Downloads/conference photo/Day1/IMG_1584.JPG',
'Downloads/conference photo/Day1/IMG_1586.JPG',
'Downloads/conference photo/Day1/IMG_1587.JPG',
'Downloads/conference photo/Day1/IMG_1590.JPG',
'Downloads/conference photo/Day1/IMG_1597.JPG'
	];
	var imageCount = imageLocations.length;
	var images = new Array(imageCount);
	var imageRects = new Array(0);
	var loadedImages = false;

	var loopId;
	var loopInterval = PAINT_INTERVAL;
	var currentImage = 0;
	var firstImageIndex = 0;
	var thumbNailCount = 0;
	var maxThumbNailCount = 0;

	var idleTime = 0;

	var lastMousePos;

	this.load = function() {
		//resize
		resize();
		window.onresize = resize;
		
		//event binding
		canvas.onclick = onMouseClick;
		canvas.onmousemove = onMouseMove;

		loadImages();		

		startLoop();
		updateIdleTime();
	}

	function getTime() {
		return new Date().getTime();
	}

	function updateIdleTime() {
		idleTime = getTime();
		if (loopInterval != PAINT_INTERVAL) {
			clearInterval(loopId);
			loopId = setInterval(mainLoop, PAINT_INTERVAL);
			loopInterval = PAINT_INTERVAL;
		}
	}

	function mainLoop() {
		if (loopInterval == PAINT_INTERVAL &&
			idleTime && getTime() - idleTime > IDLE_TIME_OUT) {
			clearInterval(loopId);
			loopId = setInterval(mainLoop, PAINT_SLOW_INTERVAL);
			loopInterval = PAINT_SLOW_INTERVAL;
		}

		paint();
	}

	function startLoop() {
		loopId = setInterval(mainLoop, PAINT_INTERVAL);
	}

	function resize() {
		var size = getScreenSize();
		canvas.width = size.width;
		canvas.height = size.height;
		paint();
	}

	function getScreenSize() {
		return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
	}
	
	function pointIsInRect(point, rect) {
		return (rect.x < point.x && point.x < rect.x + rect.width && 
				rect.y < point.y && point.y < rect.y + rect.height);
	}

	function onMouseClick(event) {
		point = {x: event.clientX, y:event.clientY};
		lastMousePos = point;

		if (pointIsInRect(point, lButtonRect)) {
			nextPane(true);
		} else if (pointIsInRect(point, rButtonRect)) {
			nextPane(false);
		} else {
			var selectedIndex = findSelectImageIndex(point);
			if (selectedIndex != -1) {
				selectImage(selectedIndex);
			}
		}
		updateIdleTime();
	}

	function findSelectImageIndex(point) {
		for(var i = 0; i < imageRects.length; i++) {
			if (pointIsInRect(point, imageRects[i].rect))
				return i + firstImageIndex;
		}
		return -1;
	}

	function selectImage(index) {
		currentImage = index;
		paint();
	}

	function nextPane(previous) {
		if (previous) {
			firstImageIndex = firstImageIndex - maxThumbNailCount < 0? 0 : firstImageIndex - maxThumbNailCount;
		} else {
			firstImageIndex = firstImageIndex + maxThumbNailCount*2 - 1 > imageCount - 1? (imageCount - maxThumbNailCount > 0? imageCount - maxThumbNailCount: 0) : firstImageIndex + maxThumbNailCount;
			
		}
		currentImage = (firstImageIndex <= currentImage && currentImage <= firstImageIndex + maxThumbNailCount)? currentImage : firstImageIndex;
		paint();
	}

	function onMouseMove(event) {
		lastMousePos = {x:event.clientX, y:event.clientY};
		paint();
		updateIdleTime();
	}

	function loadImages() {
		var total = imageLocations.length;
		var imageCounter = 0;
		var onLoad = function(err, msg) {
			if (err) {
				console.log(msg);
			}
			imageCounter++;
			if (imageCounter == total) {
				loadedImages = true;
			}
		}

		for (var i = 0; i < imageLocations.length; i++) {
			var img = new Image();
			img.onload = function() { onLoad(false); };
			img.onerror = function() { onLoad(true, e);}; 
			img.src = imageLocations[i];
			images[i] = img;
		}
	}

	function paint() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		paintImage(currentImage);
		var paintInfo = {inLeftBtn:false, inRightBtn:false, inThumbIndex: null}

		if (lastMousePos && navRect && lButtonRect && rButtonRect) {
			if (pointIsInRect(lastMousePos, navRect)) {
				paintInfo.inLeftBtn = pointIsInRect(lastMousePos, lButtonRect);
				paintInfo.inRightBtn = pointIsInRect(lastMousePos, rButtonRect);
				if (!paintInfo.inLeftBtn && !paintInfo.inRightBtn) {
					var index = findSelectImageIndex(lastMousePos);
					if (index != -1) {
						paintInfo.inThumbIndex = index;
					}
				}
			}
		}
		if(idleTime && getTime() - idleTime <= IDLE_TIME_OUT) {
			paintNavigator(paintInfo);
		}
	}

	function paintLeftButton(navRect, color) {
		//left button
		lButtonRect = {
			x: navRect.x + NAVBUTTON_XOFFSET,
			y: navRect.y + NAVBUTTON_YOFFSET,
			width: NAVBUTTON_WIDTH,
			height: navRect.height - NAVBUTTON_YOFFSET * 2
		}

		context.save();
		context.fillStyle = color;
		context.fillRect(lButtonRect.x, lButtonRect.y, lButtonRect.width, lButtonRect.height);

		//left arrow
		context.save();
		context.fillStyle = NAVBUTTON_COLOR;
		context.beginPath();
		context.moveTo(lButtonRect.x + NAVBUTTON_ARROW_XOFFSET, lButtonRect.y + lButtonRect.height/2);
		context.lineTo(lButtonRect.x + lButtonRect.width - NAVBUTTON_ARROW_XOFFSET, lButtonRect.y + NAVBUTTON_ARROW_YOFFSET);
		context.lineTo(lButtonRect.x + lButtonRect.width - NAVBUTTON_ARROW_XOFFSET, lButtonRect.y + lButtonRect.height - NAVBUTTON_ARROW_YOFFSET);
		context.lineTo(lButtonRect.x + NAVBUTTON_ARROW_XOFFSET, lButtonRect.y + lButtonRect.height/2);
		context.closePath();
		context.fill();
		context.restore();

		context.restore();
	}

	function paintRightButton(navRect, color) {
		rButtonRect = {
			x: navRect.x + navRect.width - NAVBUTTON_XOFFSET - lButtonRect.width,
			y: lButtonRect.y,
			width: lButtonRect.width,
			height: lButtonRect.height
		}

		context.save();
		context.fillStyle = color;
		context.fillRect(rButtonRect.x, rButtonRect.y, rButtonRect.width, rButtonRect.height);

		//right button
		context.save();
		context.fillStyle = NAVBUTTON_COLOR;
		context.beginPath();
		context.moveTo(rButtonRect.x + NAVBUTTON_ARROW_XOFFSET, rButtonRect.y + NAVBUTTON_ARROW_YOFFSET);
		context.lineTo(rButtonRect.x + rButtonRect.width - NAVBUTTON_ARROW_XOFFSET, rButtonRect.y + rButtonRect.height/2);
		context.lineTo(rButtonRect.x + NAVBUTTON_ARROW_XOFFSET, rButtonRect.y + rButtonRect.height - NAVBUTTON_ARROW_YOFFSET);
		context.lineTo(rButtonRect.x + NAVBUTTON_ARROW_XOFFSET, rButtonRect.y + NAVBUTTON_ARROW_YOFFSET);
		context.closePath();
		context.fill();
		context.restore();

		context.restore();

	}

	function paintNavigator(paintInfo) {
		navRect = {
			x: canvas.width * (1-NAVPANEL_XRATIO)/2,
			y: canvas.height - NAVPANEL_HEIGHT,
			width: canvas.width * NAVPANEL_XRATIO,
			height: NAVPANEL_HEIGHT
		};
		
		//background
		context.save();
		context.fillStyle = NAVPANEL_COLOR;
		context.fillRect(navRect.x, navRect.y, navRect.width, navRect.height);
		context.restore();

		paintLeftButton(navRect, paintInfo && paintInfo.inLeftBtn? NAVBUTTON_HL_COLOR: NAVBUTTON_BACKGROUND);
		paintRightButton(navRect, paintInfo && paintInfo.inRightBtn? NAVBUTTON_HL_COLOR: NAVBUTTON_BACKGROUND);
		paintThumbNails(paintInfo? paintInfo.inThumbIndex:null);
	}

	function getSlicingSrcRect(rectSrc, rectDest) {
		var ratioDest = rectDest.width/rectDest.height;
		var ratioSrc = rectSrc.width/rectSrc.height;
		var sRect = {x:0, y:0, width:0, height:0};

		if (ratioSrc > ratioDest) {
			var ratio = rectSrc.height/rectDest.height;
			sRect.x = (rectSrc.width - rectDest.width*ratio)/2;
			sRect.y = 0;
			sRect.width = rectDest.width * ratio;
			sRect.height = rectSrc.height;
			return sRect;
		} else {
			var ratio = rectSrc.width/rectDest.width;
			sRect.x = 0;
			sRect.y = (rectSrc.height - rectDest.height*ratio)/2;
			sRect.width = rectDest.width;
			sRect.height = rectSrc.height * ratio;
			return sRect;
		}
	}

	function paintThumbNails(inThumbIndex) {
		if (!loadedImages)
			return;
		
		if(inThumbIndex != null) {
			inThumbIndex -= firstImageIndex;
		} else {
			inThumbIndex = -1;
		}

		var thumbnail_length = rButtonRect.x - lButtonRect.x - lButtonRect.width;
		maxThumbNailCount = Math.ceil(thumbnail_length / THUMBNAIL_LENGTH);
		var offset = (thumbnail_length - THUMBNAIL_LENGTH * maxThumbNailCount) / (maxThumbNailCount + 1);
		if (offset < MIN_THUMBNAIL_LENGTH) {
			maxThumbNailCount = Math.ceil(thumbnail_length/ (THUMBNAIL_LENGTH + MIN_THUMBNAIL_LENGTH));
			offset = (thumbnail_length - THUMBNAIL_LENGTH * maxThumbNailCount) / (maxThumbNailCount + 1);
		}

		thumbNailCount = maxThumbNailCount > imageCount - firstImageIndex? imageCount - firstImageIndex: maxThumbNailCount;

		imageRects = new Array(thumbNailCount);

		for (var i = 0; i < thumbNailCount; i++) {
			image = images[i+firstImageIndex];
			context.save();
			var x = lButtonRect.x + lButtonRect.width + (offset+THUMBNAIL_LENGTH)*i;
			srcRect = getSlicingSrcRect({width:image.width, height:image.height}, {width:THUMBNAIL_LENGTH, height: THUMBNAIL_LENGTH});
			imageRects[i] = {
				image:image, 
				rect: {
					x:x+offset, 
					y:inThumbIndex == i? navRect.y+NAVBUTTON_YOFFSET-HL_OFFSET: navRect.y+NAVBUTTON_YOFFSET, 
					height: THUMBNAIL_LENGTH, 
					width: THUMBNAIL_LENGTH
				}
			}

			if (inThumbIndex == i) {
				paintHighLightImage(srcRect, imageRects[i]);
			}

			context.translate(x, navRect.y);
			context.drawImage(image, srcRect.x, srcRect.y, srcRect.width, srcRect.height, 
							  offset, imageRects[i].rect.y - navRect.y, 
							  THUMBNAIL_LENGTH, THUMBNAIL_LENGTH);
			context.restore();
		}
	}

	function paintHighLightImage(srcRect, imageRect) {
		var ratio = imageRect.image.width == srcRect.width? THUMBNAIL_LENGTH/imageRect.image.width : THUMBNAIL_LENGTH/imageRect.image.height;
		ratio *= 1.5;

		var destRect = {
			x:imageRect.rect.x + imageRect.rect.width/2 - imageRect.image.width*ratio/2, 
			y:navRect.y - ARROW_HEIGHT - BORDER_WRAPPER - imageRect.image.height*ratio, 
			width: imageRect.image.width * ratio, 
			height: imageRect.image.height * ratio
		}

		var wrapperRect = {
			x: destRect.x - BORDER_WRAPPER, 
			y: destRect.y - BORDER_WRAPPER,
			width: destRect.width + BORDER_WRAPPER * 2,
			height: destRect.height + BORDER_WRAPPER * 2
		}

		var arrowWidth = ARROW_HEIGHT * Math.tan(30/180*Math.PI);

		context.save();
		context.fillStyle = 'white';
		context.translate(wrapperRect.x, wrapperRect.y);
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(wrapperRect.width, 0);
		context.lineTo(wrapperRect.width, wrapperRect.height);
		context.lineTo(wrapperRect.width/2 + arrowWidth, wrapperRect.height);
		context.lineTo(wrapperRect.width/2, wrapperRect.height+ARROW_HEIGHT);
		context.lineTo(wrapperRect.width/2 - arrowWidth, wrapperRect.height);
		context.lineTo(0, wrapperRect.height);
		context.lineTo(0, 0);
		context.closePath();
		context.fill();
		context.drawImage(imageRect.image, BORDER_WRAPPER, BORDER_WRAPPER, destRect.width, destRect.height);
		context.restore();
	}

	function getScaleRatio(rectSrc, rectDest) {
		var ratioDest = rectDest.width/rectDest.height;
		var ratioSrc = rectSrc.width/rectSrc.height;

		if (ratioSrc < ratioDest)
			return rectDest.height/rectSrc.height;
		else 
			return rectDest.width/rectSrc.width;
	}

	function paintImage(index) {
		if (!loadedImages)
			return;
		var image = images[index];
		var screen_h = canvas.height;
		var screen_w = canvas.width;
		var ratio = getScaleRatio({width:image.width, height:image.height}, {width:screen_w, height:screen_h});
		var img_h = image.height * ratio;
		var img_w = image.width * ratio;

		context.drawImage(image, (screen_w - img_w)/2, (screen_h - img_h)/2, img_w, img_h);
	}
}

	
	window.onload = function() {
		thumb = new thumbnail();
		thumb.load();
	}