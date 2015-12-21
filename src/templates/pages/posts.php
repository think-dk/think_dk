<?php
global $action;
global $IC;
global $itemtype;


// get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "readstate" => true)));

?>

<div class="scene posts i:scene">
	<h1>bLog</h1>
	<p>
		Tech stuff all over. It's not really a Blog. <br />You'll figure it out, otherwise read the <a href="http://google.com?q=manual" target="_blank">manual</a>.
	</p>

	<div class="categories">
<?	if($categories): ?>
		<h2>Categories</h2>
		<ul class="tags">
<?		foreach($categories as $tag): ?>
			<li><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?		endforeach; ?>
		</ul>
<?	endif; ?>
	</div>

	<h2>Posts</h2>
<?	if($items): ?>
	<ul class="articles i:articleList">
<?		foreach($items as $item): ?>
		<li class="article id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

			<ul class="tags">
<?			if($item["tags"]):

				// editing?
				$editing_tag = arrayKeyValue($item["tags"], "context", "editing");
				if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
<?				endif; ?>
				<li><a href="/blog">Posts</a></li>
<?				foreach($item["tags"] as $item_tag): ?>
<?	 				if($item_tag["context"] == $itemtype): ?>
				<li><a href="/blog/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
<?			endif; ?>
			</ul>

			<h3><a href="/blog/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			<p><?= $item["description"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<? endif; ?>

</div>
