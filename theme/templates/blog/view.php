<?php
global $IC;
global $action;
global $itemtype;


$sindex = $action[0];

$page_item = $IC->getItem([
	"itemtype" => "blog",
	"sindex" => $sindex, 
	"status" => 1, 
	"extend" => [
		"user" => true, 
		"mediae" => true, 
		"tags" => true
	]
]);

// List extension (page > 1)
if(count($action) === 3) {
	$page = $action[2];
}
// Default list
else {
	$page = false;
}


if($page_item) {
	$this->sharingMetaData($page_item);

	$pagination_pattern = [
		"pattern" => [
			"itemtype" => "post",
			"tags" => "blog:" . $page_item["name"],
			"status" => 1,
			"extend" => [
				"tags" => true,
				"user" => true,
				"mediae" => true,
				"readstate" => true,
				"comments" => true
			]
		],
		"page" => $page,
		"limit" => 5
	];

	// Get posts
	$items = $IC->paginate($pagination_pattern);
}
else {
	$items = false;
}







?>

<div class="scene blog i:blog">


<? if($page_item):
	$media = $IC->sliceMediae($page_item, "single_media"); ?>

	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>


		<?= $HTML->articleInfo($page_item, "/blog/".$page_item["sindex"],[
			"media" => $media,
			"sharing" => true
		]) ?>


		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>

	</div>

	<div class="bio i:article id:<?= $page_item["item_id"] ?>">

		<h2>About the author</h2>

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<dl class="author">
			<dt class="author">Author</dt>
			<dd class="author"><?= $page_item["author"] . ($page_item["title"] ? ", " . $page_item["title"] : "") ?></dd>
			<dt class="bio">Bio</dt>
			<dd class="bio"><?= nl2br($page_item["bio"]) ?></dd>
		</dl>

	</div>

<? else: ?>

	<div class="article">
		<h1>Technology clearly doesn't solve everything on it's own.</h1>
		<h2>Technology needs humanity.</h2>
		<p>We could not find the specified post.</p>
	</div>

<? endif; ?>


<? if($items): ?>
	<div class="articles">
		<h2><?= pluralize($items["total"], "post", "posts") ?></h2>

		<?= $HTML->frontendPagination($items, [
			"base_url" => "/blog/".$sindex, 
			"direction" => "prev",
			"show_total" => false,
			"labels" => ["prev" => "Previous posts"]
		]) ?>

		<ul class="items articles articlePreviewList i:articlePreviewList">
<?		foreach($items["range_items"] as $item): 
			$media = $IC->sliceMediae($item, "mediae"); ?>
			<li class="item article item_id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

<?				if($media): ?>
				<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
<?				endif; ?>


				<?= $HTML->articleTags($item, [
					"context" => ["post"],
					"url" => "/bulletin/tag",
					"default" => ["/blog/".$sindex, $page_item["name"]]
				]) ?>


				<h3 itemprop="headline"><a href="/blog/<?= $sindex ?>/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


				<?= $HTML->articleInfo($item, "/blog/".$sindex."/".$item["sindex"],[
					"media" => $media
				]) ?>


				<? if($item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
	<?	endforeach; ?>
		</ul>

		<?= $HTML->frontendPagination($items, [
			"base_url" => "/blog/".$sindex,
			"direction" => "next",
			"show_total" => false,
			"labels" => ["next" => "Next posts"]
		]) ?>

	</div>
<? endif; ?>


</div>
