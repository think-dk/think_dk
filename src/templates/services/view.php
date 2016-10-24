<?php
global $IC;
global $action;
global $itemtype;

$sindex = $action[0];
$item = $IC->getItem(array("sindex" => $sindex, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);

	$event_items = false;

	$service_tag = arrayKeyValue($item["tags"], "context", "service");
	if($service_tag) {
		$event_items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "tags" => "service:".addslashes($item["tags"][$service_tag]["value"]), "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
	}

	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "exclude" => $item["id"]);
	// add base pattern properties
	$related_pattern["limit"] = 5;
	$related_pattern["extend"] = array("tags" => true, "readstate" => true, "user" => true, "mediae" => true);

	// get related items
	$related_items = $IC->getRelatedItems($related_pattern);

}

?>

<div class="scene service i:scene">


<? if($item):
	$media = $IC->sliceMedia($item); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> service" itemscope itemtype="http://schema.org/Article"
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= $item["readstate"] ?>"
		data-readstate-update="<?= $this->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= $this->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<ul class="tags">
		<? if($item["tags"]):
			$editing_tag = arrayKeyValue($item["tags"], "context", "editing"); ?>
			<? if($editing_tag !== false): ?>
			<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
			<? endif; ?>
			<li><a href="/services">Services</a></li>
			<? foreach($item["tags"] as $item_tag): ?>
				<? if($item_tag["context"] == "servicecategory"): ?>
			<li itemprop="articleSection"><?= $item_tag["value"] ?></li>
				<? endif; ?>
			<? endforeach; ?>
		<? endif; ?>
		</ul>

		<h1 itemprop="headline"><?= $item["name"] ?></h1>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"></li>
			<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage" content="<?= SITE_URL."/services/".$item["sindex"] ?>"></li>
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

		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>

		<? if($item["mediae"]): ?>
			<? foreach($item["mediae"] as $media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
			<? endforeach; ?>
		<? endif; ?>


		<?= $HTML->frontendComments($item, "/janitor/service/addComment") ?>

	</div>

	<div class="all_events">
		<h2>Upcoming events <a href="/events">(see all)</a></h2>

	<? if($event_items): ?>

		<ul class="items events">
		<? foreach($event_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("l, F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
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


	<? if($related_items): ?>
		<div class="related">
			<h2>Related services <a href="/services">(see all)</a></h2>

			<ul class="items services">
	<?		foreach($related_items as $item): 
				$media = $IC->sliceMedia($item); ?>
				<li class="item service item_id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
					data-readstate="<?= $item["readstate"] ?>"
					>

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>

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

					<? if($item["description"]): ?>
					<div class="description" itemprop="description">
						<p><?= nl2br($item["description"]) ?></p>
					</div>
					<? endif; ?>

				</li>
		<?	endforeach; ?>
			</ul>
		</div>
	<? endif; ?>



<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified service.</p>


<? endif; ?>


</div>
