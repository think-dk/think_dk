<?php
global $IC;
global $action;
global $itemtype;
$model = $IC->typeObject($itemtype);

$countries = $this->countries();

$next = false;
$prev = false;

$sindex = $action[0];
$item = $IC->getItem(array("sindex" => $sindex, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true, "prices" => true)));
if($item) {
	$this->sharingMetaData($item);


	$next = $IC->getNext($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => true));
	$prev = $IC->getPrev($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => true));

	// get host info
	$host = $model->getHosts(array("id" => $item["host"]));


	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "status" => 1, "where" => "event.starting_at > NOW()", "tags" => $item["tags"], "exclude" => $item["id"]);
	// add base pattern properties
	$related_pattern["limit"] = 5;
	$related_pattern["extend"] = array("tags" => true, "readstate" => true, "user" => true, "mediae" => true);

	// get related items
	$related_items = $IC->getRelatedItems($related_pattern);

}

?>

<div class="scene event i:scene">


<? if($item):
	$media = $IC->sliceMedia($item); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> event" itemscope itemtype="http://schema.org/Event"
		data-csrf-token="<?= session()->value("csrf") ?>"
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($item, [
			"context" => ["service"],
			"default" => ["/events", "Events"],
			"schema" => false
		]) ?>


		<h1 itemprop="name"><?= $item["name"] ?></h1>

		<dl class="occurs_at">
			<dt class="starting_at">Starts</dt>
			<dd class="starting_at" itemprop="startDate" content="<?= date("Y-m-d H:i", strtotime($item["starting_at"])) ?>"><?= date("F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
			<? if($item["ending_at"]): ?>
			<dt class="ending_at">Ends</dt>
			<dd class="ending_at" itemprop="endDate" content="<?= date("Y-m-d H:i", strtotime($item["ending_at"])) ?>"><?= date("F j, Y - H:i", strtotime($item["ending_at"])) ?></dd>
			<? endif; ?>
		</dl>

		<h2>Description</h2>
		<div class="articlebody" itemprop="description">
			<?= $item["html"] ?>
		</div>

		<?
		/*
		<? if($item["prices"]): ?>
			<?= $HTML->frontendOffer($item, SITE_URL."/events/".$item["sindex"]) ?>

			<?= $model->formStart("/shop/addToCart", array("class" => "signup labelstyle:inject")) ?>
				<?= $model->input("quantity", array("value" => 1, "type" => "hidden")); ?>
				<?= $model->input("item_id", array("value" => $item["item_id"], "type" => "hidden")); ?>

				<ul class="actions">
					<?= $model->submit("Get your ticket", array("class" => "primary", "wrapper" => "li.ticket")) ?>
				</ul>
			<?= $model->formEnd() ?>

		<? endif; ?>
		*/
		?>

		<h2>Location</h2>
		<ul class="location" itemprop="location" itemscope itemtype="https://schema.org/Place">
			<li class="name" itemprop="name"><?= $host["host"] ?></li>
			<li class="address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
				<ul>
					<li class="streetaddress" itemprop="streetAddress"><?= $host["host_address1"] ?><?= $host["host_address2"] ? ", ".$host["host_address2"] : "" ?></li>
					<li class="city"><span class="postal" itemprop="postalCode"><?= $host["host_postal"] ?></span> <span class="locality" itemprop="addressLocality"><?= $host["host_city"] ?></span></li>
					<li class="country" itemprop="addressCountry"><?= $countries[arrayKeyValue($countries, "id", $host["host_country"])]["name"] ?></li>
				</ul>
			</li>
			<? if($host["host_googlemaps"]): ?>
			<li class="googlemaps" itemprop="hasMap" content="<?= $host["host_googlemaps"] ?>"><a href="<?= $host["host_googlemaps"] ?>" target="_blank">Map</a></li>
			<? endif; ?>
		</ul>

		<ul class="info">
			<li class="main_entity share" itemprop="mainEntityOfPage" content="<?= SITE_URL."/events/".$item["sindex"] ?>"></li>
			<li class="url" itemprop="url"><?= SITE_URL."/events/".$item["sindex"] ?></li>
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


		<? if($item["mediae"]): ?>
			<? foreach($item["mediae"] as $media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
			<? endforeach; ?>
		<? endif; ?>


	</div>


	<? if($next || $prev): ?>
	<div class="pagination i:pagination">
		<ul>
		<? if($prev): ?>
			<li class="previous"><a href="/events/<?= $prev[0]["sindex"] ?>"><?= strip_tags($prev[0]["name"]) ?></a></li>
		<? endif; ?>
		<? if($next): ?>
			<li class="next"><a href="/events/<?= $next[0]["sindex"] ?>"><?= strip_tags($next[0]["name"]) ?></a></li>
		<? endif; ?>
		</ul>
	</div>
	<? endif; ?>


	<? if($related_items): ?>

	<div class="related">
		<h2>Related events <a href="/events">(see all)</a></h2>

		<ul class="items events">
		<? foreach($related_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>

				<? if($item["description"]): ?>
				<div class="description">
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
	<p>We could not find the specified event.</p>


<? endif; ?>


</div>