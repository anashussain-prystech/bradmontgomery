<?php
	if ( !defined('ABSPATH') ){ die(); }
	
	global $avia_config;

	/*
	 * get_header is a basic wordpress function, used to retrieve the header.php file in your theme directory.
	 */
	 get_header();
	 	echo avia_title(array('title' => __('Error 404 - page not found', 'avia_framework')));
	 	do_action( 'ava_after_main_title' );
?>
			
<?php 
	do_action('avia_404_extra');
?>
<?php
	get_template_part('includes/error404');
?>
<?php
	$avia_config['currently_viewing'] = 'page';
	get_sidebar();
?>
<?php get_footer(); ?>
