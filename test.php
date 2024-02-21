<?php
if ( ! defined('ABSPATH') ){ die(); }
	
	global $avia_config;
	
	$avia_config['use_standard_lightbox'] = empty( avia_get_option( 'lightbox_active' ) ) || ( 'lightbox_active' == avia_get_option( 'lightbox_active' ) ) ? 'lightbox_active' : 'disabled';
	/**
	 * Allow to overwrite the option setting for using the standard lightbox
	 * Make sure to return 'disabled' to deactivate the standard lightbox - all checks are done against this string
	 * 
	 * @added_by G端nter
	 * @since 4.2.6
	 * @param string $use_standard_lightbox				'lightbox_active' | 'disabled'
	 * @return string									'lightbox_active' | 'disabled'
	 */
	$avia_config['use_standard_lightbox'] = apply_filters( 'avf_use_standard_lightbox', $avia_config['use_standard_lightbox'] );

	$style 					= $avia_config['box_class'];
	$responsive				= avia_get_option('responsive_active') != "disabled" ? "responsive" : "fixed_layout";
	$blank 					= isset($avia_config['template']) ? $avia_config['template'] : "";	
	$av_lightbox			= $avia_config['use_standard_lightbox'] != "disabled" ? 'av-default-lightbox' : 'av-custom-lightbox';
	$preloader				= avia_get_option('preloader') == "preloader" ? 'av-preloader-active av-preloader-enabled' : 'av-preloader-disabled';
	$sidebar_styling 		= avia_get_option('sidebar_styling');
	$filterable_classes 	= avia_header_class_filter( avia_header_class_string() );
	$av_classes_manually	= "av-no-preview"; /*required for live previews*/
	$av_classes_manually   .= avia_is_burger_menu() ? " html_burger_menu_active" : " html_text_menu_active";
	
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="<?php echo "html_{$style} ".$responsive." ".$preloader." ".$av_lightbox." ".$filterable_classes." ".$av_classes_manually ?> ">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"> 
  
	<style type="text/css">
	.col-centered {
    float: none;
    margin: 0 auto;
}
.carousel-control { 
    width: 8%;
    width: 0px;
}
.carousel-control.left,
.carousel-control.right { 
    margin-right: 40px;
    margin-left: 32px; 
    background-image: none;
    opacity: 1;
}
.carousel-control > a > span {
    color: white;
	  font-size: 29px !important;
}
.carousel-col { 
    position: relative; 
    min-height: 1px; 
    padding: 5px; 
    float: left;
 }
 .active > div { display:none; }
 .active > div:first-child { display:block; }
.video-container-yt {
   position: relative;
   padding-bottom: 56.25%;
   padding-top: 30px;
   height: 0;
   overflow: hidden;
}
.video-container-yt iframe, .video-container-yt object, .video-container-yt embed {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}
/*xs*/
@media (max-width: 767px) {
  .carousel-inner .active.left { left: -50%; }
  .carousel-inner .active.right { left: 50%; }
	.carousel-inner .next        { left:  50%; }
	.carousel-inner .prev		     { left: -50%; }
  .carousel-col                { width: 50%; }
	.active > div:first-child + div { display:block; }
}

/*sm*/
@media (min-width: 768px) and (max-width: 991px) {
  .carousel-inner .active.left { left: -50%; }
  .carousel-inner .active.right { left: 50%; }
	.carousel-inner .next        { left:  50%; }
	.carousel-inner .prev		     { left: -50%; }
  .carousel-col                { width: 50%; }
	.active > div:first-child + div { display:block; }
}
/*md*/
@media (min-width: 992px) and (max-width: 1199px) {
  .carousel-inner .active.left { left: -33%; }
  .carousel-inner .active.right { left: 33%; }
	.carousel-inner .next        { left:  33%; }
	.carousel-inner .prev		     { left: -33%; }
  .carousel-col                { width: 33%; }
	.active > div:first-child + div { display:block; }
  .active > div:first-child + div + div { display:block; }
}
/*lg*/
@media (min-width: 1200px) {
  .carousel-inner .active.left { left: -25%; }
  .carousel-inner .active.right{ left:  25%; }
	.carousel-inner .next        { left:  25%; }
	.carousel-inner .prev		     { left: -25%; }
  .carousel-col                { width: 25%; }
	.active > div:first-child + div { display:block; }
  .active > div:first-child + div + div { display:block; }
	.active > div:first-child + div + div + div { display:block; }
}
.block {
	width: 306px;
	height: 230px;
}
.red {background: red;}
.blue {background: blue;}
.green {background: green;}
.yellow {background: yellow;}
	</style>
	<!-- <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script> -->	
<?php
/*
 * outputs a rel=follow or nofollow tag to circumvent google duplicate content for archives
 * located in framework/php/function-set-avia-frontend.php
 */
 if (function_exists('avia_set_follow')) { echo avia_set_follow(); }

?>
<!-- mobile setting -->
<?php
if( strpos($responsive, 'responsive') !== false ) echo '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';
?>
<!-- Scripts/CSS and wp_head hook -->
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
​<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"> 
<?php
/* Always have wp_head() just before the closing </head>
 * tag of your theme, or you will break many plugins, which
 * generally use this hook to add elements to <head> such
 * as styles, scripts, and meta tags.
 */
wp_head();
?>
<script type="text/javascript" charset="utf-8">
	// window.onload=function(){
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
	// }

</script>
<script type="text/javascript">
 
//jQuery(document).ready(function(){

  //jQuery('video').prop('preload','none');
//});
jQuery('#myModal').on('shown.bs.modal', function () {
  jQuery('#myInput').trigger('focus')
})
</script>
</head>
<body  id="top" <?php body_class($style." ".$avia_config['font_stack']." ".$blank." ".$sidebar_styling); avia_markup_helper(array('context' => 'body')); ?>>
<?php //onload="_googWcmGet('telnumber', '303.691.0726')"
if(is_page('thank-you')) { ?>
<!-- Google Code for Main Website Contact Form Submission Conversion Page July 2, 2017 -->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 1063365072;
var google_conversion_language = "en";
var google_conversion_format = "3";
var google_conversion_color = "ffffff";
var google_conversion_label = "IHHJCMzdxXIQ0NOG-wM";
var google_remarketing_only = false;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1063365072/?label=IHHJCMzdxXIQ0NOG-wM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
	<script type="text/javascript">
	(function(a,e,c,f,g,h,b,d){var k={ak:"1063365072",cl:"kO2LCMjetXIQ0NOG-wM"};a[c]=a[c]||function(){(a[c].q=a[c].q||[]).push(arguments)};a[g]||(a[g]=k.ak);b=e.createElement(h);b.async=1;b.src="//www.gstatic.com/wcm/loader.js";d=e.getElementsByTagName(h)[0];d.parentNode.insertBefore(b,d);a[f]=function(b,d,e){a[c](2,b,k,d,null,new Date,e)};a[f]()})(window,document,"_googWcmImpl","_googWcmGet","_googWcmAk","script");
	</script>
<?php } ?>
	<?php 	
	if("av-preloader-active av-preloader-enabled" === $preloader)
	{
		echo avia_preload_screen(); 

	}
	?>
	<div id='wrap_all'>
	<?php 
	if(!$blank) //blank templates dont display header nor footer
	{ 
		 //fetch the template file that holds the main menu, located in includes/helper-menu-main.php
         get_template_part( 'includes/helper', 'main-menu' );

	} ?>	
	<div id='main' class='all_colors' data-scroll-offset='<?php echo avia_header_setting('header_scroll_offset'); ?>'>
	<?php 
		
		if(isset($avia_config['temp_logo_container'])) echo $avia_config['temp_logo_container'];
		do_action('ava_after_main_container'); 
	
		
		if(is_single()) {
			if (have_posts()) :

			while (have_posts()) : the_post();
				 ?>
				 <div class="custom_image"><?php echo the_post_thumbnail('full')?>
					<h1 class="post-title entry-title" style="z-index: 1;">
						<a href="<?php echo home_url()?>?p=<?php echo get_the_ID();?>" title="Permanent Link:<?php echo get_the_title()?>"><?php echo get_the_title()?></a>
					</h1>
				 </div>
				 <?php
			endwhile;
			endif;
		}
	?>