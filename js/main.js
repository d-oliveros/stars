var hash = window.location.hash,
	frontPage = 'front',
	initialPage = hash.length ? hash.substring(1) : frontPage;
	
$( function(){

	// Adds the playground scripts / animations
	//
	var isFrontPage = initialPage == frontPage;
	isFrontPage && initPlayground();

	function initPlayground() {
		var playgroundEnabled = $(window).width() >= 768;
		
		if (playgroundEnabled){
			playgroundConsole.init();
			playgroundGravityStars.init();
			playgroundStars.init();
		}
	}

	function destroyPlayground() {
		playgroundGravityStars.destroy();
		playgroundStars.destroy();
	};

	// Reposition the background in order to have consistency between browser sizes (Just for big screens)
	//
	function positionBG() {
		var originalWidth = 1440,
			originalHeight = 701,
			windowWidth = $(window).width(),
			backgroundPositionRule = '',

			verticalRatio = 1.25,
			fixedVerticalOffset = 485,
		
			horizontalRatio = .022,
			horizontalFixedOffset = -85,

			newHeight, verticalOffset, horizontalOffset;
		
		// Reposition the background
		if (windowWidth > 1440) {
			
			newHeight = (windowWidth * originalHeight) / originalWidth;
			verticalOffset = (((newHeight*-1) / 2)*verticalRatio)+fixedVerticalOffset;

			horizontalOffset = (windowWidth * horizontalRatio) + horizontalFixedOffset;

			backgroundPositionRule = horizontalOffset+'px '+verticalOffset+'px';
		}

		$('body').css('background-position', backgroundPositionRule);
	}

	positionBG();
	$(window).on('resize', positionBG);



	// Navigation Mini framework. Not being used on the example
	//	
	navigate(initialPage, false);

	function navigate (page, checkHash) {
		$('.page').hide();
		$('#'+page).show();

		if (checkHash) {
			window.location.hash = page != frontPage ? page : '';
		}
	};

	$('.navigator').click(function(e){
		e.preventDefault();

		var targetPage = $(this).data('page');
		targetPage && navigate(targetPage, true);
		targetPage == frontPage && initPlayground();
		targetPage != frontPage && destroyPlayground();

		return false;
	});

	$('.close-page').click(function(e){
		e.preventDefault();
		navigate(frontPage, true);
		initPlayground();
		return false;
	});
});
