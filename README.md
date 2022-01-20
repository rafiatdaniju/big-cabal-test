# BCM Developer Test

`Kindly note that solutions to each question are attached directly beneath them.`
`Some questions also have link attached to them. This link contains codes for each solution`
### Thank you

## PHP 
The code below is meant to: 
output title and content for 10 posts on page 1, or alternatively the page number specified in the page query parameter 
support limiting the posts returned to posts matching the search term from the s query parameter 
Replace any instances of [ad] in the content with an HTML div element that will in turn be replaced with an ad by some Javascript code unrelated to this test 
Find the errors in the code below and list them -- assume language level PHP 8 and that this is being run in a WordPress context (e.g. as index.php in a theme) 
$page = $_GET['page'] ?? 1;
```$q = WP_Query([ ```
 ```'posts_per_page' => 10,```
 ```'page' => $page,``` 
``` 's' => $_GET['s'] ```
```]); ```
``` ?> ```
```<h1> Page <?= $page ?> of <?= $pages ?> : Search for <?= esc_html($_GET['s']) ?> ```
```<?php ```
while ($q->have_posts()) { 
 $q->the_post(); 
 $content = get_the_content(); 
 $content = preg_replace_callback('#[ad]#', function() {  echo '<div class="ad ad-'.$m[1].'"></div>'; # leave for Javascript handler to replace with live ad 
 }); 
 ?> 
 ```<h2><?= esc_html(the_title()) ?></h2> ```
 ```<p><?php echo $content ?></p> ```
 ```<?php ```
}


### Solution
- No opening php tag at the top 
- $page = $_GET['page'] ?? 1; wrong use of ternary operator, $_GET['page']wasn’t checked if it was set or empty neither was it sanitized against illegal characters.The right way should have been 
``` $page = isset($_GET['page']) && !empty($_GET['page']) ? sanitize_text_field($_GET['page']) : 1; ```
- 's' => $_GET['s']; $_GET['s']wasn’t checked and sanitized. Instead of calling $_GET['s']inside the query, I would assigned it as a variable first before passing it to the query.
``` $search_query = isset($_GET['s']) && !empty($_GET['s']) ? sanitize_text_field($_GET['s']) : ''; ``` it is then passed in to the wp_query like this 
``` 's' => $search_query ```
- ```<h1>Page <?= $page ?> of <?= $pages ?> : Search for <?= esc_html($_GET['s']); no closing </h1>```, $pages wasn’t declared and assigned a value before use
- $content = preg_replace_callback('#[ad]#', function() {  echo '<div class="ad ad-'.$m[1].'"></div>'; # leave for Javascript handler to replace with live ad 
 }); The regex pattern is wrong, the third parameter(input)is missing. Since we just want to search and replace I prefer to use  preg_replace()

``` $content = preg_replace('[\[ad\]]', '<div class="ad ad-'.$m[1].'"></div>', $content );```
- ```<h2><?= esc_html(the_title()) ?></h2> ```
The_title() will only retrieve the title without printing. You have to use echo or print function to output.
``` <h2><?php echo esc_html(the_title()) ?></h2> ```
- At the end you reset the query 
	[See for refactored code in test.php](./test.php)

## WordPress admin 
1. A member of the editorial staff is complaining they can't upload images to the WordPress setup. Can you identify at least three (more is OK) likely/common reasons for this issue?

### Solution
- File and directory permission; wrong file permissions can prevent WordPress from reading or uploading files onthe server.
- Wrong file path/directory; When upload is not from the default wordpress upload folder but rather from a specified folder
- File size too large
- Invalid image file name

2. What techniques would you use with a WordPress site to make sure it was served in the fastest, most efficient manner possible? 

### Solution
- I would ensure resources are closer to the host server by using CDN(content delivery network)
- Cache files that don’t change frequently
- Use optimization plugin to optimize media suchas images and video

## CSS 
A new site is being set up. The requirement is for it to contain sections that vary in their placement on the page on mobile and desktop, like this: 
Desktop:Mobile: 


A 
B
C 
D 
E
F 
G 
H



A
D
B
C
G




How do you achieve this with a single HTML and CSS file? 
You are not allowed to use any JavaScript. 

### Solution
Use media query in CSS
[see query.html for example](./query.html)

## HTML 
Consider the following HTML: 
```<html><head><title>Example</title></head></html> ```
``<body>`` 
 ```<h1>Hello, world</h1> ```
 ```<p>```Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor  
 auctor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum.   Morbi leo risus, porta ac consectetur ac, vestibulum at eros ```</p> ```  
 ```<p>``` Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit
libero, a pharetra augue. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.```</p> ```
  
``` <p>``` Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia ```<a href=https://www.bigcabal.com> odio sem nec elit. Sed posuere </a >``` consectetur est at ```<abbr name="lobortis">lbrt</abbr>``` . Maecenas faucibus mollis interdum. Aenean lacinia ```<img src=test.jpeg with=300 height=auto> bibendum nulla sed consectetur. Praesent <code><b>commodo cursus magna, vel scelerisque nisl consectetur et.</code></b></p>  <button>Hit me</button>``` 
```</body> ``
Find any issues with the above that is not valid HTML 5? 

### Solution
The ```<html>``` tag is not wrapping the entire content. ```<body>``` tag  is supposed to be inside the <html> tag
[see index.html for more details](./index.html)

Mention at least three techniques for this page (any page) that would improve how it would perform in search engines   using HTML only 

### Solution
- Use title tag  in the head section
- Add meta description with catching description
- Add open graph meta tag
- Add alt attribute to images
- Use heading (```<h1>``` to ```<h5>```) tags appropriately 

## Javascript 
Using a corrected version of the above HTML as a starting point, create a Javascript function that adds three new paragraphs each time you hit the button. 
These paragraphs should be copies of the three original paragraphs but each time be added in randomised order. They should follow the last paragraph. 
Also make it so that an HR element is inserted between every two paragraphs (so P1, P2, HR, P3, P4, HR and so on), including any new ones added by hitting the button. This should apply even before hitting the button the first time. 
Finally, without changing the HTML (so in Javascript only), add a new button and make it trigger a function that changes between hiding and showing any paragraphs that contain an image in them.

[see script.js for solution](./script.js)

