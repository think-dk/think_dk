<?php
global $action;
global $IC;
global $itemtype;


// get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true, "readstate" => true)));

?>

<div class="scene posts i:scene">
	<h1>Posts, News, Updates</h1>


<? if($categories): ?>
	<div class="categories">
		<ul class="tags">
			<li class="selected"><a href="/posts">All posts</a></li>
			<? foreach($categories as $tag): ?>
			<li><a href="/posts/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>


<?	if($items): ?>
	<ul class="items articles i:articleMiniList">
		<? foreach($items as $item): 
			$media = $IC->sliceMedia($item); ?>
		<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
			data-readstate="<?= $item["readstate"] ?>"
			>


			<?= $HTML->articleTags($item, [
				"context" => [$itemtype],
				"url" => "/posts/tag",
				"default" => ["/posts", "Posts"]
			]) ?>


			<h3 itemprop="headline"><a href="/posts/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


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
