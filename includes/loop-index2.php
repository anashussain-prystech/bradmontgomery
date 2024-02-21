<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);  


	global $avia_config, $post_loop_count;
	
	$blog_style = !empty($avia_config['blog_style']) ? $avia_config['blog_style'] : avia_get_option('blog_style','multi-big');
	if(is_single()) $blog_style = avia_get_option('single_post_style','single-big');

	$blog_global_style = avia_get_option('blog_global_style',''); //alt: elegant-blog
	$initial_id = avia_get_the_ID();
	
	
	//if (have_posts()) :

	//while (have_posts()) : the_post();

	/*
     * get the current post id, the current post class and current post format
 	 */
	$url = "";
	$current_post = array();
	$current_post['post_loop_count']= $post_loop_count;
	$current_post['the_id']	   	= get_the_ID();
	$current_post['parity']	   	= $post_loop_count % 2 ? 'odd' : 'even';
	$current_post['last']      	= count($wp_query->posts) == $post_loop_count ? " post-entry-last " : "";
	$current_post['post_type']	= get_post_type($current_post['the_id']);
	$current_post['post_class'] 	= "post-entry-".$current_post['the_id']." post-loop-".$post_loop_count." post-parity-".$current_post['parity'].$current_post['last']." ".$blog_style;
	$current_post['post_class']	.= ($current_post['post_type'] == "post") ? '' : ' post';
	$current_post['post_format'] 	= get_post_format() ? get_post_format() : 'standard';
	$current_post['post_layout']	= avia_layout_class('main', false);
	
	$blog_content = !empty($avia_config['blog_content']) ? $avia_config['blog_content'] : "content";

	/*If post uses builder change content to exerpt on overview pages*/
    if( Avia_Builder()->get_alb_builder_status( $current_post['the_id'] ) && !is_singular($current_post['the_id']) && $current_post['post_type'] == 'post')
    {
	   $current_post['post_format'] = 'standard';
	   $blog_content = "excerpt_read_more";
    }
	
	
	/*
     * retrieve slider, title and content for this post,...
     */
    $size = strpos($blog_style, 'big') ? (strpos($current_post['post_layout'], 'sidebar') !== false) ? 'entry_with_sidebar' : 'entry_without_sidebar' : 'square';
    
    if(!empty($avia_config['preview_mode']) && !empty($avia_config['image_size']) && $avia_config['preview_mode'] == 'custom') $size = $avia_config['image_size'];
	$current_post['slider']  	= get_the_post_thumbnail($current_post['the_id'], $size);
	
	if(is_single($initial_id) && get_post_meta( $current_post['the_id'], '_avia_hide_featured_image', true ) ) $current_post['slider'] = "";
	
	
	 $current_post['title']   	= get_the_title();
	//$current_post['content'] 	= $blog_content == "content" ? get_the_content(__('Read more','avia_framework').'<span class="more-link-arrow"></span>') : get_the_excerpt();
	//$current_post['content'] 	= $blog_content == "excerpt_read_more" ? $current_post['content'].'<div class="read-more-link"><a href="'.get_permalink().'" class="more-link">'.__('Read more','avia_framework').'<span class="more-link-arrow"></span></a></div>' : $current_post['content'];
	$current_post['before_content'] = "";
 
	/*
     * ...now apply a filter, based on the post type... (filter function is located in includes/helper-post-format.php)
     */
	$current_post	= apply_filters( 'post-format-'.$current_post['post_format'], $current_post );
	$with_slider    = empty($current_post['slider']) ? "" : "with-slider";
	/*
     * ... last apply the default wordpress filters to the content
     */
     
    
	//$current_post['content'] = str_replace(']]>', ']]&gt;', apply_filters('the_content', $current_post['content'] ));

	/*
	 * Now extract the variables so that $current_post['slider'] becomes $slider, $current_post['title'] becomes $title, etc
	 */
	extract($current_post);

	
	echo "<article class='".implode(" ", get_post_class('post-entry post-entry-type-'.$post_format . " " . $post_class . " ".$with_slider))."' ".avia_markup_helper(array('context' => 'entry','echo'=>false)).">";
	
		//default link for preview images
        $link = !empty($url) ? $url : get_permalink();
         
      
        
        //preview image description
        $desc = get_post( get_post_thumbnail_id() );
        if(is_object($desc))  $desc = $desc -> post_excerpt;
		$featured_img_desc = ( $desc != "" ) ? $desc : the_title_attribute( 'echo=0' );

        //on single page replace the link with a fullscreen image
        if(is_singular())
        {
            $link = avia_image_by_id(get_post_thumbnail_id(), 'large', 'url');
        }

	
		//echo preview image
        if( strpos($blog_global_style, 'elegant-blog') === false )
        {
		    if(strpos($blog_style, 'big') !== false)
		    {
		        if($slider) $slider = '<a href="'.$link.'" title="'.$img.'">'.$slider.'</a>';
		        if($slider) echo '<div class="big-preview '.$blog_style.'">'.$slider.'</div>';
		    }
			
		    if(!empty($before_content))
		        echo '<div class="big-preview '.$blog_style.'">'.$before_content.'</div>';
		}
		 echo "<div class='blog-meta'>";
        $blog_meta_output = "";
        $icon =  '<span class="iconfont" '.av_icon_string($post_format).'></span>';

            if(strpos($blog_style, 'multi') !== false)
            {
                $gravatar = "";
                $link = get_post_format_link($post_format);
                if($post_format == 'standard')
                {
                	$author_name = apply_filters('avf_author_name', get_the_author_meta('display_name', $post->post_author), $post->post_author);
					$author_email = apply_filters('avf_author_email', get_the_author_meta('email', $post->post_author), $post->post_author);
                	
					$gravatar_alt = esc_html($author_name);
					$gravatar = get_avatar($author_email, '81', "blank", $gravatar_alt);
					$link = get_author_posts_url($post->post_author);
                }

                $blog_meta_output = "<a href='{$link}' class='post-author-format-type'><span class='rounded-container'>".$gravatar.$icon."</span></a>";
				
				
            }
            else if(strpos($blog_style, 'small')  !== false)
            {
				
                $blog_meta_output = "<a href='{$link}' class='small-preview' title='{$featured_img_desc}'>".$slider.$icon."</a>";
            }

        echo apply_filters('avf_loop_index_blog_meta', $blog_meta_output);

        echo "</div>";
	
		if( strpos($blog_global_style, 'elegant-blog') !== false )
        {
	            	$cat_output = "";
	            	
	            	if(!empty($cats))
                    {
                        $cat_output .= '<span class="blog-categories minor-meta">';
                        $cat_output .= $cats;
                        $cat_output .= '</span>';
                        $cats = "";
                    }
            
			//echo strpos($blog_global_style, 'modern-blog') === false ? $cat_output.$title : $title.$cat_output;
						
			//echo '<span class="av-vertical-delimiter"></span>';
						
			//echo preview image
			if(strpos($blog_style, 'big') !== false)
			{
					//if($slider) $slider = '<a href="'.$link.'" title="'.$featured_img_desc.'">'.$slider.'</a>';
					if($slider) 
				
					{
					
						echo '<div class="big-preview '.$blog_style.'">'.$slider;
						echo strpos($blog_global_style, 'modern-blog') === false ? $cat_output.$title : $title.$cat_output;
						echo '</div>';
					}
					if(!$slider)
					{
						echo '<div class="big-preview '.$blog_style.'">';
						echo '<img height="423" width="635" src="https://bradmontgomery.com/wp-content/uploads/2016/05/motivational-speakers-o.jpg" class="attachment-entry_without_sidebar size-entry_without_sidebar wp-post-image">';
						echo strpos($blog_global_style, 'modern-blog') === false ? $cat_output.$title : $title.$cat_output;
						echo '</div>';
					}
					
					
				        
			}
					
			 if(!empty($before_content))
				{
					echo '<div class="big-preview '.$blog_style.'">'.$before_content;
					//echo strpos($blog_global_style, 'modern-blog') === false ? $cat_output.$title : $title.$cat_output;
					echo '</div>';
				}	 
					
				/* echo $content_output;
					
				$cats = "";
				$title = "";
				$content_output = ""; */
		}
		
		
		
		
		/* echo "<div class='entry-content-wrapper clearfix {$post_format}-content'>";
            echo '<header class="entry-content-header">';
			//the_post_thumbnail( );
			if(get_post_meta(get_the_ID(),'_listing_image_id') ){
				$post_details = get_post_meta(get_the_ID(),'_listing_image_id');
				$image_url = wp_get_attachment_image_src($post_details[0],array(200,200));
				if(!empty($image_url)){
					
					echo '<div class="custom_image">';
					$img_src = $image_url[0];
					echo '<img src="'. $img_src.'">';

					echo '</div>';  	
				}
			}
			echo '</header>';
		echo '</div>'; */
		echo '</article>';
?>