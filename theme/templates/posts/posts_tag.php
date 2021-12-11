<?php
global $IC;
global $action;
global $itemtype;

$selected_tag = urldecode($action[1]);


// List extension (page > 1)
if(count($action) === 4) {
	$page = $action[3];
	$page_item = false;
}
// Default list
else {
	$page = false;
	$page_item = $IC->getItem([
//		"itemtype" => "page",
		"tags" => "page:tag-".$selected_tag, 
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
else {
	$this->sharingMetaData(["description" => "Something about $selected_tag"]);
}




// get log tags for listing
$categories = $IC->getTags(array("context" => $itemtype));


$pagination_pattern = [
	"pattern" => [
		"itemtype" => $itemtype, 
		"status" => 1, 
		"tags" => $itemtype.":".addslashes($selected_tag), 
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


?>


<div class="scene bulletin tag i:bulletin">

<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/bulletin/tag/".urlencode($selected_tag), [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

<? elseif($items): ?>

	<div class="article">
		<h1><?= $selected_tag ?> posts</h1>
	</div>

<? else: ?>

	<div class="article">
		<h1>Posts</h1>
	</div>

<? endif; ?>


	<div class="articles">
<? if($items): ?>

		<h2><?= pluralize($items["total"], "post", "posts") ?></h2>

		<?= $HTML->pagination($items, [
			"base_url" => "/bulletin/tag/".urlencode($selected_tag), 
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


				<h3 itemprop="headline"><a href="/bulletin/tag/<?= urlencode($selected_tag) ?>/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


				<?= $HTML->articleInfo($item, "/bulletin/".$item["sindex"],[
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

		<?= $HTML->pagination($items, [
			"base_url" => "/bulletin/tag/".urlencode($selected_tag),
			"direction" => "next",
			"show_total" => false,
			"labels" => ["next" => "Next posts"]
		]) ?>

<? else: ?>

		<h2>Technology needs humanity.</h2>
		<p>We could not find any posts with the selected tag.</p>

<? endif; ?>
	</div>


	<?= $HTML->search("/bulletin/search", [
		"headline" => "Search posts",
		"pattern" => $pagination_pattern["pattern"]
	]) ?>


<? if($categories): ?>
	<div class="categories">
		<h2>Categories</h2>
		<ul class="tags">
			<? foreach($categories as $tag): ?>
			<li<?= $tag["value"] === $selected_tag ? ' class="selected"' : '' ?>><a href="/bulletin/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
			<li class="all"><a href="/bulletin">All postings</a></li>
		</ul>
	</div>
<? endif; ?>

</div>
