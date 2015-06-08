<?php
global $IC;
global $action;
global $itemtype;


$item = $IC->getItem(array("sindex" => $action[0], "extend" => array("tags" => true, "user" => true, "comments" => true, "readstate" => true)));
?>

<div class="scene article i:article">

<? if($item): ?>

	<div class="article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			foreach($item["tags"] as $tag): ?>
<?				if(arrayKeyValue($item["tags"], "context", "editing")): ?>
			<li class="editing" title="Denne artikel redigeres stadig">Redigeres</li>
<?				else: ?>
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
		</dl>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>

	</div>

	<div class="readstate i:readstate item_id:<?= $item["item_id"] ?>"
		data-readstate-update="<?= $this->validPath("/janitor/article/updateReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= $this->validPath("/janitor/article/deleteReadstate/".$item["item_id"]) ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= strtotime($item["readstate"]) ?>"
		>
	</div>


	<div class="comments i:comments item_id:<?= $item["item_id"] ?>" 
		data-comment-add="<?= $this->validPath("/janitor/article/addComment") ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<h2 class="comments">Kommentarer til &quot;<?= $item["name"] ?>&quot;</h2>
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
		<p>Ingen kommentarer endnu</p>
<?	endif; ?>
	</div>


<? else: ?>


	<h1>Teknologi er tydeligvis ikke svaret på alting</h1>
	<p>
		Vi kunne ikke finde den angivne side - måske er den flygtet for at undgå verdens undergang :)
	</p>


<? endif; ?>



</div>
