<?php
global $action;
global $IC;
global $itemtype;

$selected_tag = urldecode($action[1]);
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => $itemtype.":".addslashes($selected_tag), "extend" => array("tags" => true, "user" => true, "readstate" => true, "mediae" => true)));

$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

?>

<div class="scene posts tag i:scene">
	<h1>Posts</h1>


<? if($categories): ?>
	<div class="categories">
		<ul class="tags">
			<li><a href="/posts">All posts</a></li>
		<? foreach($categories as $tag): ?>
			<li<?= ($selected_tag == $tag["value"] ? ' class="selected"' : '') ?>><a href="/posts/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>


<? if($items): ?>
	<ul class="items articles i:articleMiniList">
		<? foreach($items as $item):
			$media = $IC->sliceMedia($item); ?>
		<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
			data-readstate="<?= $item["readstate"] ?>"
			>

			<ul class="tags">
			<? if($item["tags"]):
				$editing_tag = arrayKeyValue($item["tags"], "context", "editing");
				if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
				<? endif; ?>
				<li><a href="/posts">Posts</a></li>
				<? foreach($item["tags"] as $item_tag): ?>
					<? if($item_tag["context"] == $itemtype): ?>
				<li itemprop="articleSection"><a href="/posts/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
					<? endif; ?>
				<? endforeach; ?>
			<? endif; ?>
			</ul>

			<h3 itemprop="headline"><a href="/posts/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>

			<ul class="info">
				<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
				<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
				<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
				<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/posts/".$item["sindex"] ?></li>
				<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
					<ul class="publisher_info">
						<li class="name" itemprop="name">think.dk</li>
						<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
							<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
							<span class="image_width" itemprop="width" content="720"></span>
							<span class="image_height" itemprop="height" content="405"></span>
						</li>
					</ul>
				</li>
				<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
				<? if($media): ?>
					<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
					<span class="image_width" itemprop="width" content="720"></span>
					<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
				<? else: ?>
					<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
					<span class="image_width" itemprop="width" content="720"></span>
					<span class="image_height" itemprop="height" content="405"></span>
				<? endif; ?>
				</li>
			</ul>

			<? if($item["description"]): ?>
			<div class="description" itemprop="description">
				<p><?= nl2br($item["description"]) ?></p>
			</div>
			<? endif; ?>

		</li>
		<? endforeach; ?>
	</ul>

<? else: ?>

	<h2>Technology needs humanity.</h2>
	<p>We could not find any posts with the selected tag.</p>

<? endif; ?>

</div>
