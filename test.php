<?php 
$page = isset($_GET['page']) && !empty($_GET['page']) ? sanitize_text_field($_GET['page']) : 1;
$search_query = isset($_GET['s']) && !empty($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
$q = WP_Query([ 
    'posts_per_page' => 10, 
    'page' => $page, 
    's' => $search_query,
]); 
?> 
<h1>Page <?= $page ?> of <?= $pages ?> : Search for <?= esc_html($_GET['s']) ?></h1>
<?php 
while ($q->have_posts()) { 
    $q->the_post(); 
    $content = get_the_content(); 
    $content = preg_replace('[\[ad\]]', '<div class="ad ad-'.$m[1].'"></div>', $content );
    
    ?> 
    <h2><?php echo esc_html(the_title()) ?></h2>  
    <p><?php echo $content ?></p> 


    <?php
 }
