<?php
global $action;
global $IC;
global $itemtype;


$page_item = $IC->getItem([
	"itemtype" => "page",
	"tags" => "page:Blog", 
	"status" => 1, 
	"extend" => [
		"user" => true, 
		"mediae" => true, 
		"tags" => true
	]
]);

if($page_item) {
	$this->sharingMetaData($page_item);
}

$items = $IC->getItems([
	"itemtype" => $itemtype, 
	"status" => 1, 
	"extend" => [
		"tags" => true, 
		"user" => true, 
		"readstate" => true, 
		"mediae" => true
	]
]);

?>

<div class="scene blogs i:blogs">

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


		<?= $HTML->articleInfo($page_item, "/blog", [
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
		<h1>Blogs</h1>
		<h2>Personal commentaries with substance. <br />Pick your flavor.</h2>
	</div>

<? endif; ?>


<? if($items): ?>
	<ul class="items articles blogs articlePreviewList">
		<? foreach($items as $item): 
			$media = $IC->sliceMediae($item, "single_media"); ?>
		<li class="item article blog id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/BlogPosting">


			<? if($media): ?>
			<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
			<? endif; ?>


			<h3 itemprop="headline"><a href="/blog/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


			<?= $HTML->articleInfo($item, "/blog/".$item["sindex"],[
				"media" => $media
			]) ?>


			<dl class="author">
				<dt>By</dt>
				<dd><?= $item["author"] . ($item["title"] ? ", " . $item["title"] : "") ?></dd>
			</dl>


			<? if($item["description"]): ?>
			<div class="description" itemprop="description">
				<p><?= nl2br($item["description"]) ?></p>
			</div>
			<? endif; ?>

		</li>
		<? endforeach; ?>
	</ul>
<? endif; ?>


</div>
