<?
$IC = new Items();

$post_items = $IC->getItems(array("itemtype" => "post", "limit" => 3, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));

?>
<div class="scene front i:front">

	<ul class="items postings i:articlelist">
<?		foreach($post_items as $item):
			$media = $IC->sliceMedia($item); ?>
		<li class="item post id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/BlogPosting">

<?			if($media): ?>
			<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
				<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
			</div>
<?			endif; ?>

			<ul class="tags">
<?			if($item["tags"]): ?>
<?				if(arrayKeyValue($item["tags"], "context", "editing")): ?>
				<li class="editing" title="This post is work in progress">Still editing</li>
<?				endif; ?>
				<li><a href="/posts">Posts</a></li>
<?				foreach($item["tags"] as $item_tag): ?>
<?	 				if($item_tag["context"] == "post"): ?>
				<li><a href="/posts/tag/<?= urlencode($item_tag["value"]) ?>" itemprop="articleSection"><?= $item_tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
<?			endif; ?>
			</ul>

			<h3 itemprop="headline"><a href="/posts/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>

			<dl class="info">
				<dt class="published_at">Date published</dt>
				<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></dd>
				<dt class="author">Author</dt>
				<dd class="author" itemprop="author"><?= $item["user_nickname"] ?></dd>
			</dl>

<?			if($item["description"]): ?>
			<div class="description" itemprop="description">
				<p><?= nl2br($item["description"]) ?></p>
			</div>
<?			endif; ?>

		</li>
<?		endforeach; ?>
	</ul>


</div>