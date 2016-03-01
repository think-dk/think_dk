<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");
$query = new Query();
$IC = new Item();

print '<?xml version="1.0" encoding="UTF-8"?>';

?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>http://think.dk/</loc>
		<lastmod><?= date("Y-m-d", filemtime(LOCAL_PATH."/templates/pages/about.php")) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>

	<?
		// ARTICLES ITEMS
		$items = $IC->getItems(array("itemtype" => "post", "status" => 1)); 
	?>
	<url>
		<loc>http://think.dk/posts/</loc>
		<lastmod><?= date("Y-m-d", strtotime($items[0]["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
	<url>
		<loc>http://think.dk/about</loc>
		<lastmod><?= date("Y-m-d", filemtime(LOCAL_PATH."/templates/pages/about.php")) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>http://think.dk/contact</loc>
		<lastmod><?= date("Y-m-d", filemtime(LOCAL_PATH."/templates/pages/contact.php")) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>
</urlset>