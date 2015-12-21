<?php
global $action;
global $IC;
global $itemtype;

$tag = urldecode($action[1]);
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => $itemtype.":".addslashes($tag), "extend" => array("tags" => true, "readstate" => true)));

?>

<div class="scene posts tag i:scene">
	<h1><?= $tag ?></h1>

<? 
  // CUSTOM TAG HEADERS - SHOULD BE DYNAMIC AT SOME POINT
  if($tag == "Detector"): ?>

	<p>Browsers, detection and segmentation.</p>

<? elseif($tag == "Segments"): ?>

	<p>Detector segments explained.</p>

<? elseif($tag == "Browsers"): ?>

	<p>Browsers in detail.</p>

<? elseif($tag == "Git"): ?>

	<p>Git with it. My notes on how to use Git.</p>

<? endif; ?>



<?	if($items): ?>

	<ul class="articles i:articlelist">
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
