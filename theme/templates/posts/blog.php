<?php
global $action;
global $IC;
global $itemtype;

//$selected_tag = "post-page:Front";

$page_item = $IC->getItem(array("tags" => "page:blog", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

//$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => "post:".$selected_tag, "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true, "readstate" => true, "mediae" => true)));

$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));
?>

<div class="scene news i:scene">

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
	<h1>Bulletin</h1>
	<h2>Posts, News, Updates and Notes.</h2>
<? endif; ?>

<? if($categories): ?>
	<div class="categories">
		<ul class="tags">
			<li class="selected"><a href="/posts">All posts</a></li>
			<? foreach($categories as $tag): ?>
			<li><a href="/bulletin/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>

<? if($items): ?>
	<ul class="items articles i:articleMiniList readmore">
		<? foreach($items as $item): 
			$media = $IC->sliceMediae($item, "mediae"); ?>
		<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
			data-readstate="<?= $item["readstate"] ?>"
			>


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
<? endif; ?>


</div>
