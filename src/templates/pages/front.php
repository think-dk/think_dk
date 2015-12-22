<?
$IC = new Items();
$posts = $IC->getItems(array("itemtype" => "post", "status" => 1, "extend" => array("tags" => true, "readstate" => true)));
	
?>
<div class="scene front i:front">

	<h1><span>t</span><span>hi</span><span>nk</span></h1>

	<h2>News</h2>
<?	if($posts): ?>
	<ul class="articles i:articleList">
<?		foreach($posts as $item): ?>
		<li class="article id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

			<ul class="tags">
<?			if($item["tags"]):

				// editing?
				$editing_tag = arrayKeyValue($item["tags"], "context", "editing");
				if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
<?				endif; ?>
				<li><a href="/posts">Posts</a></li>
<?				foreach($item["tags"] as $item_tag): ?>
<?	 				if($item_tag["context"] == $itemtype): ?>
				<li><a href="/posts/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
<?			endif; ?>
			</ul>

			<h3><a href="/posts/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			<p><?= $item["description"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<? endif; ?>


</div>