jQuery(document).ready(function(){
	

	//NAV
	jQuery('.dropdown ul li').hover(
		function(){
			$(this).find('ul').show();
		}, 	function(){
			$(this).find('ul').hide();
		}
	
	);


	//ACCORDION

	jQuery('.deal-row ul .deal').each(function(index,value){
		jQuery(value).find('#expander').click(function(){
			jQuery(value).find('.details').toggleClass('show');
			
		});
	});
	
	//MODAL
	
	
	jQuery('.deal-row ul .deal').each(function(index,value){
		jQuery(value).find('#modal').click(function(){
			
			//reposition modal
			var windowH = jQuery(window).height();
			var windowW = jQuery(window).width();
			
			var modalH = jQuery('.modalPopup').height();
			var modalW = jQuery('.modalPopup').width();
			
			var positionY = windowH/2 - modalH/2;
			var positionX = windowW/2 - modalW/2;
			
			windowH = positionY;
			windowW = positionX;
			
			
			//alert( windowH + ' ' + windowW);
	
			jQuery('body').prepend('<div class="bg"></div>');//creates lightbox style overlay
			jQuery(value).find('.modalPopup').css({
				'top' : windowH + 'px',
				'left' : windowW + 'px'
				
			});
			jQuery(value).find('.modalPopup').toggleClass('show');
			jQuery('body').css('overflow', 'hidden');
		});
		jQuery(value).find('.closeModal').click(function(){
			jQuery(value).find('.modalPopup').removeClass('show');
			jQuery('.bg').remove();
			jQuery('body').css('overflow', 'auto');
		});
	});
	
	

	
	
	
	
	//CAROUSEL
	jQuery('.deal-row-wrapper').each(function(index, value){

		//click the right arrow, and it moves the images to the right
		jQuery(value).find('.right-arrow').click(function(){
			jQuery(value).find('.deal-row ul').animate({
				right: "+=255"
				}, 500, function() {

			});
		});
	
		//click the right arrow, and it moves the images to the right
		jQuery(value).find('.left-arrow').click(function(){
			jQuery(value).find('.deal-row ul').animate({
				right: "-=390"
				}, 500, function() {

			});
		});
	
	
	});

	
	
	

});
