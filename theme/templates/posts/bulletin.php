<?php
global $action;
global $IC;
global $itemtype;



$itemtype = "post";

// List extension (page > 1)
if(count($action) === 2) {
	$page = $action[1];
	$page_item = false;
}
// Default list
else {
	$page = false;
	$page_item = $IC->getItem([
		"tags" => "page:Bulletin", 
		"status" => 1, 
		"extend" => [
			"user" => true, 
			"mediae" => true, 
			"tags" => true
		]
	]);
}


if($page_item) {
	$this->sharingMetaData($page_item);
}

// Get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

$pagination_pattern = [
	"pattern" => [
		"itemtype" => $itemtype, 
		"status" => 1, 
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"readstate" => true
		]
	],
	"page" => $page,
	"limit" => 5
];


// Get posts
$items = $IC->paginate($pagination_pattern);






//$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => "post:".$selected_tag, "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
// $items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true, "readstate" => true, "mediae" => true)));
//
// $categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));
?>

<div class="scene bulletin i:bulletin">

<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/bulletin", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

<? else:?>

	<div class="article">
		<h1>Bulletin</h1>
		<h2>Posts, News, Updates and Notes.</h2>
	</div>

<? endif; ?>


<? if($categories): ?>
	<div class="categories">
		<h2>Categories</h2>
		<ul class="tags">
			<? foreach($categories as $tag): ?>
			<li><a href="/bulletin/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
			<li class="all selected"><a href="/bulletin">All posts</a></li>
		</ul>
	</div>
<? endif; ?>


	<?= $HTML->searchBox("/bulletin/search", [
		"headline" => "Search posts",
		"pattern" => $pagination_pattern["pattern"]
	]) ?>


	<div class="articles">
<? if($items): ?>

		<h2>All posts</h2>

		<?= $HTML->frontendPagination($items, [
			"base_url" => "/bulletin", 
			"direction" => "prev",
			"show_total" => false,
			"labels" => ["prev" => "Previous posts"]
		]) ?>

		<ul class="items articles articlePreviewList i:articlePreviewList">
			<? foreach($items["range_items"] as $item): 
				$media = $IC->sliceMediae($item, "mediae"); ?>
			<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

				<? if($media): ?>
				<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
				<? endif; ?>


				<?= $HTML->articleTags($item, [
					"context" => [$itemtype],
					"url" => "/bulletin/tag",
					"default" => ["/bulletin", "Posts"]
				]) ?>


				<h3 itemprop="headline"><a href="/bulletin/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


				<?= $HTML->articleInfo($item, "/posts/".$item["sindex"],[
					"media" => $media
				]) ?>


				<? if($item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>

		<?= $HTML->frontendPagination($items, [
			"base_url" => "/bulletin",
			"direction" => "next",
			"show_total" => false,
			"labels" => ["next" => "Next posts"]
		]) ?>

<? else: ?>
		<p>No posts</p>

<? endif; ?>
	</div>

</div>
