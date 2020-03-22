<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "post";


$page->bodyClass("bulletin");
$page->pageTitle("Bulletin");


if(is_array($action) && count($action)) {


	# Search
	# /posts/search
	if(count($action) >= 1 && $action[0] === "search") {

		$page->page([
			"templates" => "posts/search.php"
		]);
		exit();

	}

	# View specific post
	# /posts/#sindex#
	else if(count($action) === 1) {

		$page->page([
			"templates" => "posts/post.php"
		]);
		exit();

	}

	# Tags
	else if(count($action) >= 1 && $action[0] === "tag") {

		# View specific post (tag listed)
		# /posts/tag/#tag#/#sindex#
		if(count($action) === 3) {

			$page->page([
				"templates" => "posts/post_tag.php"
			]);
			exit();
		}

		# List by tag
		# /posts/tag/#tag#
		# /posts/tag/#tag#/page/#sindex#
		else if((count($action) === 2) || (count($action) === 4 && $action[2] === "page")) {

			$page->page([
				"templates" => "posts/posts_tag.php"
			]);
			exit();

		}

	}

}


$page->page(array(
	"templates" => "posts/bulletin.php"
));
exit();


?>
 