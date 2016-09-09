<?php
global $IC;
global $action;
global $itemtype;


$item = $IC->getItem(array("sindex" => $action[0], "extend" => array("tags" => true, "user" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);

	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "exclude" => $item["id"]);
}
else {
	// itemtype pattern for missing item
	$related_pattern = array("itemtype" => $itemtype);
}

// add base pattern properties
$related_pattern["limit"] = 3;
$related_pattern["extend"] = array("tags" => true, "readstate" => true);

// get related items
$related_items = $IC->getRelatedItems($related_pattern);

?>

<div class="scene article i:article">

<? if($item): ?>

	<div class="article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			if(arrayKeyValue($item["tags"], "context", "editing")): ?>
				<li class="editing" title="Denne artikel redigeres stadig">Redigeres</li>
<?			endif; ?>
<?		endif; ?>
				<li><a href="/articles">Artikler</a></li>
<?		if($item["tags"]): ?>
<?			foreach($item["tags"] as $tag): ?>
<?	 			if($tag["context"] == "about"): ?>
			<li itemprop="articleSection"><a href="/artikler/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?				endif; ?>
<?			endforeach; ?>
<?		endif; ?>
		</ul>

		<h1 itemprop="name"><?= $item["name"] ?></h1>
		<h2 itemprop="alternateName"><?= $item["subheader"] ?></h2>


		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d", strtotime($item["published_at"])) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author"><?= $item["user_nickname"] ?></dd>
			<dt class="hardlink">Hardlink</dt>
			<dd class="hardlink" itemprop="url"><?= SITE_URL."/artikler/".$item["sindex"] ?></dd>
		</dl>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>

	</div>

	<div class="readstate i:readstate item_id:<?= $item["item_id"] ?>"
		data-readstate-update="<?= $this->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= $this->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= strtotime($item["readstate"]) ?>"
		>
	</div>


	<?= $HTML->frontendComments($item, "/janitor/admin/article/addComment") ?>


<? else: ?>


	<h1>Teknologi er tydeligvis ikke svaret på alting</h1>
	<p>
		Vi kunne ikke finde den angivne artikel - måske er den flygtet for at undgå verdens undergang :)
		Heldigvis er det ikke den eneste artikel om Stopknappen.
	</p>


<? endif; ?>


<? if($related_items): ?>
	<div class="related">
		<h2>Andre artikler</h2>

		<ul class="articles i:articleList">
<?		foreach($related_items as $item): ?>
			<li class="article item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

<?				if($item["tags"]): ?>
				<ul class="tags">
<?					if(arrayKeyValue($item["tags"], "context", "editing")): ?>
						<li class="editing" title="Denne artikel redigeres stadig">Redigeres</li>
<?					endif; ?>
<?					foreach($item["tags"] as $tag): ?>
<?	 					if($tag["context"] == "about"): ?>
					<li itemprop="articleSection"><a href="/artikler/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?						endif; ?>
<?					endforeach; ?>
				</ul>
<?				endif; ?>

				<h3><a href="/artikler/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
				<p><?= preg_replace("/<br>|<br \/>/", "", $item["subheader"]) ?></p>

			</li>
	<?	endforeach; ?>
		</ul>
	</div>
<? endif; ?>

</div>
