<?php
global $IC;
global $action;
global $itemtype;
$model = $IC->typeObject($itemtype);

$countries = $this->countries();

$next = false;
$prev = false;

$sindex = $action[0];
$item = $IC->getItem(array("sindex" => $sindex, "status" => 1, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true, "prices" => true)));
if($item) {
	$this->sharingMetaData($item);


	$next = $IC->getNext($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at >= '".$item["starting_at"]."'", "order" => "event.starting_at ASC", "extend" => true));
	$prev = $IC->getPrev($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at <= '".$item["starting_at"]."'", "order" => "event.starting_at ASC", "extend" => true));

	// $next = $IC->getNext($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => true));
	// $prev = $IC->getPrev($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => true));

	// get host info
	$location = $model->getLocations(array("id" => $item["location"]));


	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "status" => 1, "tags" => $item["tags"], "exclude" => $item["id"]);
	$related_title = "Related events";
}
else {
	// itemtype pattern for missing item
	$related_pattern = array("itemtype" => $itemtype);
	$related_title = "Other events";
}

$related_pattern["where"] = "event.starting_at > NOW()";

// add base pattern properties
$related_pattern["limit"] = 5;
$related_pattern["extend"] = true;

// get related items
$related_items = $IC->getRelatedItems($related_pattern);


?>

<div class="scene event i:scene">

<? if($item):
	$media = $IC->sliceMediae($item, "single_media");
	$eventtype_tag = arrayKeyValue($item["tags"], "context", "eventtype"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> event<?= $eventtype_tag !== false ? " ".$item["tags"][$eventtype_tag]["value"] : "" ?>" itemscope itemtype="http://schema.org/Event"
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
	// Allow signups 30 minutes after event start
	/* if((strtotime($item["starting_at"]) + 1800) > time()):
?>
		<div class="signup">

		<? if($item["prices"]): ?>
			<?= $HTML->frontendOffer($item, SITE_URL."/events/".$item["sindex"]) ?>

			<?= $model->formStart("/shop/addToCart", array("class" => "signup labelstyle:inject")) ?>
				<?= $model->input("quantity", array("value" => 1, "type" => "hidden")); ?>
				<?= $model->input("item_id", array("value" => $item["item_id"], "type" => "hidden")); ?>

				<ul class="actions">
					<?= $model->submit("Get your ticket", array("class" => "primary", "wrapper" => "li.ticket")) ?>
				</ul>
			<?= $model->formEnd() ?>

		<? else: ?>

			<?= $model->formStart("/events/signup", array("class" => "signup labelstyle:inject")) ?>
				<?= $model->input("item_id", array("value" => $item["item_id"], "type" => "hidden")); ?>

				<ul class="actions">
					<?= $model->submit("Sign up for ". $item["name"], array("class" => "primary", "wrapper" => "li.ticket")) ?>
				</ul>
			<?= $model->formEnd() ?>


		<? endif; ?>

		</div>

<? endif; */ ?>

<? 
		$sponsor_tag = arrayKeyValue($item["tags"], "context", "sponsor");
		
		if($sponsor_tag !== false && isset($item["tags"][$sponsor_tag])):
			if($item["tags"][$sponsor_tag]["value"] === "Østerbro Lokaludvalg"): ?>
		<div class="sponsor lokaludvalg">
			<p>This events is kindly supported <br />by Østerbro Lokaludvalg.</p>
		</div>
<? 			endif; 
		endif; ?>

		<? if($item["location"]): ?>
		<div class="location">
			<h2>Location</h2>
			<ul class="location" itemprop="location" itemscope itemtype="https://schema.org/Place">
				<li class="name" itemprop="name"><?= $location["location"] ?></li>
				<li class="address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
					<ul>
						<li class="streetaddress" itemprop="streetAddress"><?= $location["location_address1"] ?><?= $location["location_address2"] ? ", ".$location["location_address2"] : "" ?></li>
						<li class="city"><span class="postal" itemprop="postalCode"><?= $location["location_postal"] ?></span> <span class="locality" itemprop="addressLocality"><?= $location["location_city"] ?></span></li>
						<li class="country" itemprop="addressCountry"><?= $countries[arrayKeyValue($countries, "id", $location["location_country"])]["name"] ?></li>
					</ul>
				</li>
				<? if($location["location_googlemaps"]): ?>
				<li class="googlemaps" itemprop="hasMap" content="<?= $location["location_googlemaps"] ?>"><a href="<?= $location["location_googlemaps"] ?>" target="_blank">Map</a></li>
				<? endif; ?>
			</ul>
		</div>
		<? endif; ?>

	</div>


	<? if($next || $prev): ?>
	<div class="pagination i:pagination">
		<ul>
		<? if($prev): ?>
			<li class="previous">
				<!-- <h2>Previous</h2> -->
				<a href="/events/<?= $prev[0]["sindex"] ?>"><?= strip_tags($prev[0]["name"]) ?></a>
			</li>
		<? endif; ?>
		<? if($next): ?>
			<li class="next">
				<!-- <h2>Next</h2> -->
				<a href="/events/<?= $next[0]["sindex"] ?>"><?= strip_tags($next[0]["name"]) ?></a>
			</li>
		<? endif; ?>
		</ul>
	</div>
	<? endif; ?>



<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified event.</p>


<? endif; ?>


<? if($related_items): ?>

<div class="related">
	<h2><?= $related_title ?> <a href="/events">(see all)</a></h2>

	<ul class="items events">
	<? foreach($related_items as $item): ?>
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

</div>
