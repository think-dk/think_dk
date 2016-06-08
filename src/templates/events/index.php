<?php
global $IC;
global $action;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:events", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);

}

$items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>

<div class="scene events i:scene">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($page_item["tags"]):
			$editing_tag = arrayKeyValue($page_item["tags"], "context", "editing");
			if($editing_tag !== false): ?>
		<ul class="tags">
			<li class="editing" title="This page is work in progress"><?= $page_item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $page_item["tags"][$editing_tag]["value"] ?></li>
		</ul>
			<? endif; ?>
		<? endif; ?>

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page_item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page_item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page_item["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage"><?= SITE_URL."/events" ?></li>
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
<? else:?>
	<h1>Events</h1>
<? endif; ?>


	<div class="all_events">
		<h2>Upcoming events</h2>

	<? if($items): ?>

		<ul class="items events">
		<? foreach($items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>

				<? if($item["description"]): ?>
				<div class="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
	<?	endforeach; ?>
		</ul>

<? else: ?>

		<p>No scheduled events.</p>

<? endif; ?>
	</div>

</div>
