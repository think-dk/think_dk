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
// LATEST PAGE
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
		<priority>0.9</priority>
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
// SERVICES PAGE
$item = $IC->getItem(array("tags" => "page:services"));
?>
	<url>
		<loc><?= SITE_URL ?>/services</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// SERVICES
$items = $IC->getItems(array("itemtype" => "service", "status" => 1)); 
foreach($items as $item):
?>
	<url>
		<loc><?= SITE_URL ?>/services/<?= $item["sindex"] ?></loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>0.9</priority>
	</url>
<? endforeach; ?>
<?
// EVENTS PAGE
$item = $IC->getItem(array("tags" => "page:events"));
?>
	<url>
		<loc><?= SITE_URL ?>/events</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// EVENTS
$items = $IC->getItems(array("itemtype" => "event", "status" => 1)); 
foreach($items as $item):
?>
	<url>
		<loc><?= SITE_URL ?>/events/<?= $item["sindex"] ?></loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
<? endforeach; ?>
<?
// WISHLIST PAGE
$item = $IC->getItem(array("tags" => "page:wishlist"));
?>
	<url>
		<loc><?= SITE_URL ?>/wishlist</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.5</priority>
	</url>
</urlset>
<?
// SIGNUP PAGE
$item = $IC->getItem(array("tags" => "page:Signup"));
?>
	<url>
		<loc><?= SITE_URL ?>/signup</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
</urlset>
<?
// MEMBERSHIPS PAGE
$item = $IC->getItem(array("tags" => "page:Memberships"));
?>
	<url>
		<loc><?= SITE_URL ?>/memberships</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
</urlset>