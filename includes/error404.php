	<section class="brad-site__cta" style="background-color: #fafaf9;">
		<div class="container">
			<div class="row ">
				<div class="col-12">
					<h2 style="text-transform: uppercase;">
						whoopsie
						<span class="orange-text"> 404</span>
					</h2>
					<p>
						Oops. You found a bad web page. <br />
						Search to your favorite page here:
					</p>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-4 brad-site-search" style="text-align: center; padding: 50px 0;">
					<?php

		if(isset($_GET['post_type']) && $_GET['post_type'] == 'product' && function_exists('get_product_search_form'))
		{
			get_product_search_form();
		}
		else
		{
			get_search_form();
		}

?>
				</div>
			</div>
		</div>
	</section>