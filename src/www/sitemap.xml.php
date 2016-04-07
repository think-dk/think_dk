<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");
$query = new Query();
$IC = new Items();

print '<?xml version="1.0" encoding="UTF-8"?>';

?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?
// FRONTPAGE
$item = $IC->getItem(array("tags" => "page:front"));
?>
	<url>
		<loc><?= SITE_URL ?>/</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<?
// NEWS PAGE
$item = $IC->getItem(array("tags" => "page:latest"));
?>
	<url>
		<loc><?= SITE_URL ?>/latest</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<?
// POSTS
$items = $IC->getItems(array("itemtype" => "post", "status" => 1)); 
foreach($items as $item):
?>
	<url>
		<loc><?= SITE_URL ?>/posts/<?= $item["sindex"] ?></loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<? endforeach; ?>
<?
// ABOUT PAGE
$item = $IC->getItem(array("tags" => "page:about"));
?>
	<url>
		<loc><?= SITE_URL ?>/about</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// CONTACT PAGE
$item = $IC->getItem(array("tags" => "page:contact"));
?>
	<url>
		<loc><?= SITE_URL ?>/contact</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// WISHLIST PAGE
$item = $IC->getItem(array("tags" => "page:wishlist"));
?>
	<url>
		<loc><?= SITE_URL ?>/wishlist</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
</urlset>