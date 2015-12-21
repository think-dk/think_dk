<?php
global $IC;
global $action;
global $itemtype;


$item = $IC->getItem(array("sindex" => $action[0], "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);

	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "exclude" => $item["id"]);

	// editing?
	$editing_tag = arrayKeyValue($item["tags"], "context", "editing");
}
else {
	// itemtype pattern for missing item
	$related_pattern = array("itemtype" => $itemtype);
}

// add base pattern properties
$related_pattern["limit"] = 5;
$related_pattern["extend"] = array("tags" => true, "readstate" => true);

// get related items
$related_items = $IC->getRelatedItems($related_pattern);

?>

<div class="scene article i:blogpost">


<? if($item):
	$media = $IC->sliceMedia($item); ?>

	<div class="article i:article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

<?		if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
<?		endif; ?>

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
<?			endif; ?>
				<li><a href="/blog">Posts</a></li>
<?			foreach($item["tags"] as $tag): ?>
<?	 			if($tag["context"] == $itemtype): ?>
			<li itemprop="articleSection"><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?				endif; ?>
<?			endforeach; ?>
<?		endif; ?>
		</ul>

		<h1 itemprop="name"><?= $item["name"] ?></h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d", strtotime($item["published_at"])) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author"><?= $item["user_nickname"] ?></dd>
			<dt class="hardlink">Hardlink</dt>
			<dd class="hardlink" itemprop="url"><?= SITE_URL."/blog/".$item["sindex"] ?></dd>
		</dl>

		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>

<?		if($item["mediae"]):
			foreach($item["mediae"] as $media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
<? 			endforeach;
		endif; ?>

	</div>

	<div class="readstate i:readstate item_id:<?= $item["item_id"] ?>"
		data-readstate-update="<?= $this->validPath("/janitor/admin/post/updateReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= $this->validPath("/janitor/admin/post/deleteReadstate/".$item["item_id"]) ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= strtotime($item["readstate"]) ?>"
		>
	</div>


	<div class="comments i:comments item_id:<?= $item["item_id"] ?>" 
		data-comment-add="<?= $this->validPath("/janitor/admin/post/addComment") ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<h2 class="comments">Commentaries for &quot;<?= $item["name"] ?>&quot;</h2>
<?	if($item["comments"]): ?>
		<ul class="comments">
<?		foreach($item["comments"] as $comment): ?>
			<li class="comment comment_id:<?= $comment["id"] ?>">
				<ul class="info">
					<li class="user"><?= $comment["nickname"] ?></li>
					<li class="created_at"><?= date("Y-m-d, H:i", strtotime($comment["created_at"])) ?></li>
				</ul>
				<p class="comment"><?= $comment["comment"] ?></p>
			</li>
<?		endforeach; ?>
		</ul>
<?	else: ?>
		<p>No comments yet</p>
<?	endif; ?>
	</div>


<? else: ?>


	<h1>Technology is clearly not the ultimate solution</h1>
	<p>
		The specified article could not be found.
	</p>


<? endif; ?>


<? if($related_items): ?>
	<div class="related">
		<h2>Related posts</h2>

		<ul class="articles i:articleList">
<?		foreach($related_items as $item): ?>
			<li class="article item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

<?				if($item["tags"]): ?>
				<ul class="tags">
<?					if(arrayKeyValue($item["tags"], "context", "editing")): ?>
					<li class="editing" title="This post is work in progress">Still editing</li>
<?					endif; ?>
<?					foreach($item["tags"] as $tag): ?>
<?	 					if($tag["context"] == $itemtype): ?>
					<li itemprop="articleSection"><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?						endif; ?>
<?					endforeach; ?>
				</ul>
<?				endif; ?>

				<h3><a href="/blog/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
				<p><?= $item["description"] ?></p>

			</li>
	<?	endforeach; ?>
		</ul>
	</div>
<? endif; ?>

</div>
