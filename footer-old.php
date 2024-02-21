<?php
do_action( 'ava_before_footer' );
global $avia_config;
$blank = isset($avia_config['template']) ? $avia_config['template'] : "";
//reset wordpress query in case we modified it
wp_reset_query();
//get footer display settings


$the_id 				= avia_get_the_id(); //use avia get the id instead of default get id. prevents notice on 404 pages
$footer 				= get_post_meta($the_id, 'footer', true);
$footer_widget_setting 	= !empty($footer) ? $footer : avia_get_option('display_widgets_socket');
//check if we should display a footer
if(!$blank && $footer_widget_setting != 'nofooterarea' ){
			if( $footer_widget_setting != 'nofooterwidgets' )
			{
				//get columns
				$columns = avia_get_option('footer_columns');
		?>
				<div class='container_wrap footer_color' id='footer'>
					<div class='container'>
						<?php
						do_action('avia_before_footer_columns');

						//create the footer columns by iterating

						
				        switch($columns)
				        {
				        	case 1: $class = ''; break;
				        	case 2: $class = 'av_one_half'; break;
				        	case 3: $class = 'av_one_third'; break;
				        	case 4: $class = 'av_one_fourth'; break;
				        	case 5: $class = 'av_one_fifth'; break;
				        	case 6: $class = 'av_one_sixth'; break;
				        }
				        
				        $firstCol = "first el_before_{$class}";

						//display the footer widget that was defined at appearenace->widgets in the wordpress backend
						//if no widget is defined display a dummy widget, located at the bottom of includes/register-widget-area.php
						for ($i = 1; $i <= $columns; $i++)
						{
							$class2 = ""; // initialized to avoid php notices
							if($i != 1) $class2 = " el_after_{$class}  el_before_{$class}";
							echo "<div class='flex_column {$class} {$class2} {$firstCol}'>";
							if (function_exists('dynamic_sidebar') && dynamic_sidebar('Footer - column'.$i) ) : else : avia_dummy_widget($i); endif;
							echo "</div>";
							$firstCol = "";
						}

						do_action('avia_after_footer_columns');

						?>
					</div>
				<!-- ####### END FOOTER CONTAINER ####### -->
				</div>
	<?php   } //endif nofooterwidgets ?>	
			<?php

			//copyright
			$copyright = do_shortcode( avia_get_option('copyright', "© ".__('Copyright','avia_framework')."  - <a href='".home_url('/')."'>".get_bloginfo('name')."</a>") );

			// you can filter and remove the backlink with an add_filter function
			// from your themes (or child themes) functions.php file if you dont want to edit this file
			// you can also remove the kriesi.at backlink by adding [nolink] to your custom copyright field in the admin area
			// you can also just keep that link. I really do appreciate it ;)
			$kriesi_at_backlink = kriesi_backlink(get_option(THEMENAMECLEAN."_initial_version"), 'Enfold');


			
			if($copyright && strpos($copyright, '[nolink]') !== false)
			{
				$kriesi_at_backlink = "";
				$copyright = str_replace("[nolink]","",$copyright);
			}

			if( $footer_widget_setting != 'nosocket' )
			{

			?>
				<footer class='container_wrap socket_color' id='socket' <?php avia_markup_helper(array('context' => 'footer')); ?>>
                    <div class='container'>
                        <!-- <span class='copyright'><?php echo $copyright . $kriesi_at_backlink; ?></span> -->
                        <span class='copyright'><?php echo $copyright; ?></span>
                        <?php
                        	if(avia_get_option('footer_social', 'disabled') != "disabled")
                            {
                            	$social_args 	= array('outside'=>'ul', 'inside'=>'li', 'append' => '');
								echo avia_social_media_icons($social_args, false);
                            }
                        
                            
                                $avia_theme_location = 'avia3';
                                $avia_menu_class = $avia_theme_location . '-menu';

                                $args = array(
                                    'theme_location'=>$avia_theme_location,
                                    'menu_id' =>$avia_menu_class,
                                    'container_class' =>$avia_menu_class,
                                    'fallback_cb' => '',
                                    'depth'=>1,
                                    'echo' => false,
                                    'walker' => new avia_responsive_mega_menu(array('megamenu'=>'disabled'))
                                );

                            $menu = wp_nav_menu($args);
                            
                            if($menu){ 
                            echo "<nav class='sub_menu_socket' ".avia_markup_helper(array('context' => 'nav', 'echo' => false)).">";
                            echo $menu;
                            echo "</nav>";
							}
                        ?>
                    </div>
	            <!-- ####### END SOCKET CONTAINER ####### -->
				</footer>
			<?php
			} //end nosocket check
		
		} //end blank & nofooterarea check
		?>
		<!-- end main -->
		</div>
		<?php
		if(avia_get_option('disable_post_nav') != "disable_post_nav")
		{
			//display link to previous and next portfolio entry
			echo avia_post_nav();
		}
		echo "<!-- end wrap_all --></div>";
		if(isset($avia_config['fullscreen_image']))
		{ ?>
			<!--[if lte IE 8]>
			<style type="text/css">
			.bg_container {
			-ms-filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<?php echo $avia_config['fullscreen_image']; ?>', sizingMethod='scale')";
			filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<?php echo $avia_config['fullscreen_image']; ?>', sizingMethod='scale');
			}
			</style>
			<![endif]-->
		<?php
			echo "<div class='bg_container' style='background-image:url(".$avia_config['fullscreen_image'].");'></div>";
		}
	/* Always have wp_footer() just before the closing </body>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to reference JavaScript files.
	 */
	wp_footer();
?>
<a href='#top' title='<?php _e('Scroll to top','avia_framework'); ?>' id='scroll-top-link' <?php echo av_icon_string( 'scrolltop' ); ?>><span class="avia_hidden_link_text"><?php _e('Scroll to top','avia_framework'); ?></span></a>
<div id="fb-root"></div>
<script defer type="text/javascript" charset="utf-8">
    // Instantiate the Bootstrap carousel
    jQuery('.carousel[data-type="multi"] .item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = jQuery(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo(jQuery(this));

        for (var i = 0; i < 4; i++) {
            next = next.next();
            if (!next.length) {
                next = jQuery(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo(jQuery(this));
        }
    });
</script>
<script defer type="text/javascript">
    jQuery('#myModal').on('shown.bs.modal', function () {
        jQuery('#myInput').trigger('focus')
    })
</script>
<script defer type="text/javascript">
window.loadEvents = [];
loadEvents.push(function() { 
	
	<?php
	if (is_front_page() || is_page('test-home')) 
	{
	
	?>
	
	jQuery(document).ready(function(){
     jQuery('html, body').animate({
        scrollTop: jQuery(window).scrollTop() + 200
    },"slow");
	jQuery("html, body").animate({ scrollTop: 0 }, "slow");	
	jQuery('video').trigger('play');	
	//jQuery('video').prop("controls",false);	
});

	
	<?php
	}
	?>

	jQuery(document).ready(function(){
	if(jQuery(".big-preview.single-big").length > 1){
		jQuery(".big-preview.single-big").not('.big-preview.single-big:first').remove();
	}
	});

});
jQuery.each(loadEvents, function(_,f) { f(); });
</script>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script defer>
jQuery("#mc-embedded-subscribe").click(function () {
	 
var v = grecaptcha.getResponse();
    if(v.length == 0)
    {

  document.getElementById('captcha').innerHTML="You can't leave Captcha Code empty";

        return false;
    }
    else
    {

        //document.getElementById('captcha').innerHTML="Captcha completed";
        return true; 
    }
 } );
if(jQuery('.ImageStike .avia-image-container-inner .avia_image').offset()){
var ImageStike = jQuery('.ImageStike .avia-image-container-inner .avia_image').offset().top;

var faqSticky = jQuery('.faqSticky').offset().top;
}



jQuery(window).scroll(function($) {
	var currentScroll = jQuery(window).scrollTop();
	if (currentScroll >= ImageStike) {
			jQuery('.ImageStike').css({
					position: 'fixed',
					top: '0',
					left: '0',
					width:jQuery('.ImageStike .avia-image-container-inner .avia_image').width(),
			});
	} else {
			jQuery('.ImageStike').css({
					position: 'static'
			});
	};

	if (currentScroll >= faqSticky) {
			jQuery('.faqSticky').css({
					position: 'fixed',
					width: jQuery('.Scroll_bar').outerWidth(),
					top: '0',
					right: '0',
					margin:'0',
					//zindex:'99999',
			});
                      jQuery('.faqSticky').css('z-index', 99999);


	} else {
			jQuery('.faqSticky').css({
					position: 'static',
				
			});

      jQuery('.faqSticky').css("margin", "");
	};

});

 </script>

</body>
</html>