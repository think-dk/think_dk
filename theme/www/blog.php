<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "blog";


$page->bodyClass("blog");
$page->pageTitle("Blog");



// list specific blog posts
// /blog/#sindex#
if(count($action) === 1 || count($action) === 3 && $action[1] === "page") {

	$page->page(array(
		"templates" => "blog/view.php"
	));
	exit();

}
# View specific post
# /blog/#sindex#/#sindex#
else if(count($action) === 2) {

	$page->page([
		"templates" => "blog/post.php"
	]);
	exit();

}

# Blog overview
$page->page(array(
	"templates" => "blog/index.php"
));
exit();


?>
 