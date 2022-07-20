<?php
global $IC;
global $action;

$itemtype = "post";

$sindex = $action[2];
$selected_tag = urldecode($action[1]);

$pagination_pattern = [
	"pattern" => [
		"itemtype" => $itemtype, 
		"status" => 1, 
		"tags" => $itemtype.":".addslashes($selected_tag), 
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"readstate" => true,
			"comments" => true
		]
	],
	"sindex" => $sindex,
	"limit" => 1
];

// Get posts
$pagination_items = $IC->paginate($pagination_pattern);


// $item = $IC->getItem(array("sindex" => $sindex, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));
if($pagination_items && $pagination_items["range_items"]) {
	$item = $pagination_items["range_items"][0];
	$this->sharingMetaData($item);



	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "exclude" => $item["id"]);
	$related_title = "Related posts";

}
else {

	// itemtype pattern for missing item
	$related_pattern = array("itemtype" => $itemtype);
	$related_title = "Other posts";

}

// add base pattern properties
$related_pattern["limit"] = 5;
$related_pattern["extend"] = array("tags" => true, "readstate" => true, "user" => true, "mediae" => true);

// get related items
$related_items = $IC->getRelatedItems($related_pattern);

// Get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

?>

<div class="scene post tag i:bulletin">


<? if($item):
	$media = $IC->sliceMediae($item, "mediae"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/NewsArticle"
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= $item["readstate"] ?>"
		data-readstate-add="<?= security()->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= security()->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
		<? endif; ?>


		<?= $HTML->articleTags($item, [
			"context" => [$itemtype],
			"url" => "/bulletin/tag",
			"default" => ["/bulletin", "Posts"]
		]) ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= $HTML->articleInfo($item, "/bulletin/".$item["sindex"], [
			"media" => $media, 
			"sharing" => true
		]) ?>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>


		<?
		$mediae = $IC->filterMediae($item, "mediae");
		if($mediae): ?>
			<? foreach($mediae as $media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
			<? endforeach; ?>
		<? endif; ?>


		<?= $HTML->frontendComments($item, "/janitor/admin/post/addComment") ?>

	</div>

	<?= $HTML->pagination($pagination_items, [
		"class" => "pagination i:pagination",
		"type" => "sindex",
		"base_url" => "/bulletin/tag/".urlencode($selected_tag), 
		"show_total" => false,
		"labels" => ["prev" => "{name}", "next" => "{name}"]
	]) ?>



<? else: ?>

	<div class="article">
		<h1>Technology clearly doesn't solve everything on it's own.</h1>
		<h2>Technology needs humanity.</h2>
		<p>We could not find the specified post.</p>
	</div>

<? endif; ?>


<? if($related_items): ?>
	<div class="related">
		<h2><?= $related_title ?> <a href="/bulletin">(see all posts)</a></h2>

		<ul class="items articles articlePreviewList i:articlePreviewList">
<?		foreach($related_items as $related_item): 
			$media = $IC->sliceMediae($related_item, "mediae"); ?>
			<li class="item article item_id:<?= $related_item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $related_item["readstate"] ?>"
				>

<?				if($media): ?>
				<div class="image item_id:<?= $related_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
					<p>Image: <a href="/images/<?= $related_item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
				</div>
<?				endif; ?>


				<?= $HTML->articleTags($related_item, [
					"context" => [$itemtype],
					"url" => "/bulletin/tag",
					"default" => ["/bulletin", "Posts"]
				]) ?>


				<h3 itemprop="headline"><a href="/bulletin/<?= $related_item["sindex"] ?>"><?= strip_tags($related_item["name"]) ?></a></h3>


				<?= $HTML->articleInfo($related_item, "/bulletin/".$related_item["sindex"], [
					"media" => $media
				]) ?>


				<? if($related_item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($related_item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
	<?	endforeach; ?>
		</ul>
	</div>
<? endif; ?>


	<?= $HTML->search("/bulletin/search", [
		"headline" => "Search posts",
		"pattern" => $pagination_pattern["pattern"],
	]) ?>


<? if($categories): ?>
	<div class="categories">
		<h2>Categories</h2>
		<ul class="tags">
		<? foreach($categories as $tag):?>
			<li <?= ($item["tags"] && array_search($tag, $item["tags"]) !== false) ? ' class="selected"' : "" ?>><a href="/bulletin/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
		<? endforeach; ?>
			<li class="all"><a href="/bulletin">All postings</a></li>
		</ul>
	</div>
<? endif; ?>

</div>
