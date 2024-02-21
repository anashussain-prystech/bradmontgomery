<?php
	if( ! defined( 'ABSPATH' ) )	{ die(); }

	global $avia_config;

	$lightbox_option = avia_get_option( 'lightbox_active' );
	$avia_config['use_standard_lightbox'] = empty( $lightbox_option ) || ( 'lightbox_active' == $lightbox_option ) ? 'lightbox_active' : 'disabled';

	/**
	 * Allow to overwrite the option setting for using the standard lightbox
	 * Make sure to return 'disabled' to deactivate the standard lightbox - all checks are done against this string
	 *
	 * @added_by Günter
	 * @since 4.2.6
	 * @param string $use_standard_lightbox				'lightbox_active' | 'disabled'
	 * @return string									'lightbox_active' | 'disabled'
	 */
	$avia_config['use_standard_lightbox'] = apply_filters( 'avf_use_standard_lightbox', $avia_config['use_standard_lightbox'] );


	$style = $avia_config['box_class'];
	$responsive = avia_get_option( 'responsive_active' ) != 'disabled' ? 'responsive' : 'fixed_layout';
	$blank = isset( $avia_config['template'] ) ? $avia_config['template'] : '';
	$preloader = avia_get_option( 'preloader' ) == 'preloader' ? 'av-preloader-active av-preloader-enabled' : 'av-preloader-disabled';

	$html_classes = array();
	$body_classes = array();

	$html_classes[] = "html_{$style}";
	$html_classes[] = $responsive;
	$html_classes[] = $preloader;
	$html_classes[] = avia_header_class_filter( avia_header_class_string() );
	$html_classes[] = $avia_config['use_standard_lightbox'] != 'disabled' ? 'av-default-lightbox' : 'av-custom-lightbox';
	$html_classes[] = 'av-no-preview'; /*required for live previews*/

	$body_classes[] = $style;
	$body_classes[] = $blank;
	$body_classes[] = avia_get_option( 'sidebar_styling' );

	/**
	 * Get footer stylings and post overrides
	 */
	$the_id = avia_get_the_id(); //use avia get the id instead of default get id. prevents notice on 404 pages
	$body_layout = avia_get_option( 'color-body_style' );
	$footer_options = avia_get_option( 'display_widgets_socket', 'all' );
	$footer_behavior = avia_get_option( 'footer_behavior' );
	$footer_media = avia_get_option( 'curtains_media' );

	$footer_post = get_post_meta( $the_id, 'footer', true );
	$footer_behavior_post = get_post_meta( $the_id, 'footer_behavior', true );

	/**
	 * Reset individual page override to defaults if widget or page settings are different (user might have changed theme options)
	 * (if user wants a page as footer he must select this in main options - on individual page it's only possible to hide the page)
	 */
	if( false !== strpos( $footer_options, 'page' ) )
	{
		/**
		 * User selected a page as footer in main options
		 */
		if( ! in_array( $footer_post, array( 'page_in_footer_socket', 'page_in_footer', 'nofooterarea' ) ) )
		{
			$footer_post = '';
		}
	}
	else
	{
		/**
		 * User selected a widget based footer in main options
		 */
		if( in_array( $footer_post, array( 'page_in_footer_socket', 'page_in_footer' ) ) )
		{
			$footer_post = '';
		}
	}

	$footer_option = ! empty( $footer_post ) ? $footer_post : $footer_options;

	switch ( $footer_behavior_post )
	{
		case 'scroll':
			$footer_behavior = '';
			break;
		case 'curtain_footer':
			$footer_behavior = 'curtain_footer';
			break;
		default:
			break;
	}

	if( 'stretched' != $body_layout )
	{
		$footer_behavior = '';
		$footer_media = '';
	}
	else
	{
		if( empty( $footer_media ) )
		{
			$footer_media = '70';
		}
	}

	$avia_config['footer_option'] = $footer_option;
	$avia_config['footer_behavior'] = $footer_behavior;
	$avia_config['footer_media'] = $footer_media;

	/**
	 * If title attribute is missing for an image default lightbox displays the alt attribute
	 *
	 * @since 4.7.6.2
	 * @param bool
	 * @return false|mixed			anything except false will activate this feature
	 */
	$body_classes[] = false !== apply_filters( 'avf_lightbox_show_alt_text', false ) ? 'avia-mfp-show-alt-text' : '';

	/**
	 * Allows to alter default settings Enfold-> Main Menu -> General -> Menu Items for Desktop
	 * @since 4.4.2
	 */
	$is_burger_menu = apply_filters( 'avf_burger_menu_active', avia_is_burger_menu(), 'header' );
	$html_classes[] = $is_burger_menu ? 'html_burger_menu_active' : 'html_text_menu_active';

	if( ! $is_burger_menu )
	{
		$handling = avia_get_option( 'header_mobile_device_handling' );
		$html_classes[] = 'mobile_switch_portrait' != $handling ? 'av-mobile-menu-switch-default' : 'av-mobile-menu-switch-portrait';
	}

	/**
	 * Add additional custom body classes
	 * e.g. to disable default image hover effect add av-disable-avia-hover-effect
	 *
	 * @since 4.4.2
	 */
	$body_classes[] = apply_filters( 'avf_custom_body_classes', '' );

	/**
	 * @since 4.2.3 we support columns in rtl order (before they were ltr only). To be backward comp. with old sites use this filter.
	 */
	$body_classes[] = 'yes' == apply_filters( 'avf_rtl_column_support', 'yes' ) ? 'rtl_columns' : '';

	/**
	 * @since 4.8.6.3
	 */
	$body_classes[] = 'curtain_footer' == $avia_config['footer_behavior'] ? 'av-curtain-footer' : '';
	$body_classes[] = is_numeric( $footer_media ) || empty( $footer_media ) ? 'av-curtain-numeric' : "av-curtain-screen {$footer_media}";


	$html_classes = implode( ' ', array_unique( array_filter( $html_classes ) ) );



?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="<?php echo $html_classes; ?>">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-896190-7"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	
	gtag('config', 'UA-896190-7');
	</script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha512-DUC8yqWf7ez3JD1jszxCWSVB0DMP78eOyBpMa5aJki1bIRARykviOuImIczkxlj1KhVSyS16w2FSQetkD4UU2w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
<?php

/*
 * outputs a rel=follow or nofollow tag to circumvent google duplicate content for archives
 * located in framework/php/function-set-avia-frontend.php
 */
 if( function_exists( 'avia_set_follow' ) )
 {
	 echo avia_set_follow();
 }

?>


<!-- mobile setting -->
<?php

$meta_viewport = ( strpos( $responsive, 'responsive' ) !== false ) ?  '<meta name="viewport" content="width=device-width, initial-scale=1">' : '';

/**
 * @since 4.7.6.4
 * @param string
 * @return string
 */
echo apply_filters( 'avf_header_meta_viewport', $meta_viewport );

?>
<!-- Scripts/CSS and wp_head hook -->
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
​<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"> 

<!-- Scripts/CSS and wp_head hook -->
<?php
/* Always have wp_head() just before the closing </head>
 * tag of your theme, or you will break many plugins, which
 * generally use this hook to add elements to <head> such
 * as styles, scripts, and meta tags.
 */

wp_head();

?>
</head>

<?php


$body_classes[] = $avia_config['font_stack'];
$body_classes = implode( ' ', array_unique( array_filter( $body_classes ) ) );

?>
<body id="top" <?php body_class( $body_classes ); avia_markup_helper( array( 'context' => 'body' ) ); ?>>

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
<script defer type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>

<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1063365072/?label=IHHJCMzdxXIQ0NOG-wM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
	<script defer type="text/javascript">
	(function(a,e,c,f,g,h,b,d){var k={ak:"1063365072",cl:"kO2LCMjetXIQ0NOG-wM"};a[c]=a[c]||function(){(a[c].q=a[c].q||[]).push(arguments)};a[g]||(a[g]=k.ak);b=e.createElement(h);b.async=1;b.src="//www.gstatic.com/wcm/loader.js";d=e.getElementsByTagName(h)[0];d.parentNode.insertBefore(b,d);a[f]=function(b,d,e){a[c](2,b,k,d,null,new Date,e)};a[f]()})(window,document,"_googWcmImpl","_googWcmGet","_googWcmAk","script");
	</script>
<?php } ?>

	<?php

	/**
	 * WP 5.2 add a new function - stay backwards compatible with older WP versions and support plugins that use this hook
	 * https://make.wordpress.org/themes/2019/03/29/addition-of-new-wp_body_open-hook/
	 *
	 * @since 4.5.6
	 */
	if( function_exists( 'wp_body_open' ) )
	{
		wp_body_open();
	}
	else
	{
		do_action( 'wp_body_open' );
	}

	do_action( 'ava_after_body_opening_tag' );

	if( 'av-preloader-active av-preloader-enabled' === $preloader )
	{
		echo avia_preload_screen();
	}

	?>

	<div id='wrap_all'>

	<?php
	if( ! $blank ) //blank templates dont display header nor footer
	{
		//fetch the template file that holds the main menu, located in includes/helper-menu-main.php
		get_template_part( 'includes/helper', 'main-menu' );

	} ?>

	<div id='main' class='all_colors' data-scroll-offset='<?php echo avia_header_setting( 'header_scroll_offset' ); ?>'>
	<?php

		if( isset( $avia_config['temp_logo_container'] ) )
		{
			echo $avia_config['temp_logo_container'];
		}

		do_action( 'ava_after_main_container' );


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
