<?php
global $IC;
global $action;
global $itemtype;


$blog_sindex = $action[0];
$post_sindex = $action[1];



$blog_item = $IC->getItem([
	"itemtype" => "blog",
	"sindex" => $blog_sindex, 
	"status" => 1, 
	"extend" => [
		"user" => true, 
		"mediae" => true, 
		"tags" => true
	]
]);

$pagination_pattern = [
	"pattern" => [
		"itemtype" => "post", 
		"tags" => "blog:" . $blog_item["name"],
		"status" => 1, 
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"readstate" => true,
			"comments" => true
		]
	],
	"sindex" => $post_sindex,
	"limit" => 1
];


// Get posts
$pagination_items = $IC->paginate($pagination_pattern);


if($pagination_items && $pagination_items["range_items"]) {

	$item = $pagination_items["range_items"][0];
	$this->sharingMetaData($item);


}

?>

<div class="scene blog post i:blog">


<? if($item && $blog_item):
	$media = $IC->sliceMediae($item, "mediae"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/BlogPosting"
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= $item["readstate"] ?>"
		data-readstate-add="<?= $this->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= $this->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($item, [
			"context" => ["post"],
			"url" => "/bulletin/tag",
			"default" => ["/blog/".$blog_sindex, $blog_item["name"]]
		]) ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= $HTML->articleInfo($item, "/blog/".$blog_sindex."/".$item["sindex"],[
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
		"base_url" => "/blog/".$blog_sindex, 
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


<? if($blog_item):
	$media = $IC->sliceMediae($blog_item, "single_media"); ?>

	<div class="bio i:article id:<?= $blog_item["item_id"] ?>">

		<h2><?= $blog_item["name"] ?></h2>

		<? if($media): ?>
		<div class="image item_id:<?= $blog_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<dl class="author">
			<dt class="author">Author</dt>
			<dd class="author"><?= $blog_item["author"] . ($blog_item["title"] ? ", " . $blog_item["title"] : "") ?></dd>
			<dt class="bio">Bio</dt>
			<dd class="bio"><?= nl2br($blog_item["bio"]) ?></dd>
		</dl>

	</div>
<? endif; ?>

</div>
