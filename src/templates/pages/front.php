<?
$IC = new Items();

$intros = $IC->getItems(array("itemtype" => "page", "tags" => "page:intro", "status" => 1, "extend" => true));
$intro = $intros[rand(0, count($intros)-1)];

$page_item = $IC->getItem(array("tags" => "page:front", "extend" => array("user" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$post_items = $IC->getItems(array("itemtype" => "post", "tags" => "on:frontpage", "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
$event_items = $IC->getItems(array("itemtype" => "event", "where" => "event.starting_at > NOW()" , "order" => "event.starting_at", "limit" => 2, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));


?>
<div class="scene front i:front">

<? if($intro && $intro["status"] && $intro["html"]): ?>
	<div class="intro" itemscope itemtype="http://schema.org/CreativeWork">

		<? if($intro["html"]): ?>
		<div class="text" itemprop="text">
			<?= $intro["html"] ?>
		</div>
		<? endif; ?>

	</div>
<? endif; ?>


<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page_item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page_item["modified_at"])) ?>"></li>
			<li class="author" itemprop="author"><?= $page_item["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage" content="<?= SITE_URL ?>"></li>
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
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page_item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? endif; ?>


<? if($event_items): ?>
	<div class="all_events">
		<h2>Upcoming events <a href="/events">(see all)</a></h2>

		<ul class="items events">
		<? foreach($event_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>

			</li>
	<?	endforeach; ?>
		</ul>

	</div>
<? endif; ?>



<? if($post_items): ?>
	<div class="news">
		<h2>Latest news <a href="/latest">(see all)</a></h2>
		<ul class="items articles">
		<? foreach($post_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

				<ul class="tags">
				<? if($item["tags"]):
					$editing_tag = arrayKeyValue($item["tags"], "context", "editing"); ?>
					<? if($editing_tag !== false): ?>
					<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
					<? endif; ?>
					<li><a href="/posts">Posts</a></li>
					<? foreach($item["tags"] as $item_tag): ?>
						<? if($item_tag["context"] == "post"): ?>
					<li itemprop="articleSection"><a href="/posts/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
						<? endif; ?>
					<? endforeach; ?>
				<? endif; ?>
				</ul>

				<h3 itemprop="headline"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></h3>

				<ul class="info">
					<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
					<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"></li>
					<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
					<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/posts/".$item["sindex"] ?>"></li>
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

				<? if($item["html"]): ?>
				<div class="articlebody" itemprop="articleBody">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
		<? endforeach; ?>
		</ul>

	</div>
<?	endif; ?>

</div>