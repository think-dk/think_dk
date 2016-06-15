<?php
global $IC;
global $action;
global $itemtype;
$model = $IC->typeObject($itemtype);

$countries = $this->countries();

$sindex = $action[0];
$item = $IC->getItem(array("sindex" => $sindex, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);

	// get host info
	$host = $model->getHosts(array("id" => $item["host"]));

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

		<ul class="tags">
		<? if($item["tags"]):
			$editing_tag = arrayKeyValue($item["tags"], "context", "editing"); ?>
			<? if($editing_tag !== false): ?>
			<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
			<? endif; ?>
			<li itemprop="category"><a href="/events">Events</a></li>
			<? foreach($item["tags"] as $item_tag): ?>
				<? if($item_tag["context"] == "service"): ?>
			<li itemprop="category"><?= $item_tag["value"] ?></li>
				<? endif; ?>
			<? endforeach; ?>
		<? endif; ?>
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
		<div class="description" itemprop="description">
			<?= $item["html"] ?>
		</div>

		<h2>Location</h2>
		<ul class="location" itemprop="location" itemscope itemtype="https://schema.org/Place">
			<li class="name" itemprop="name"><?= $host["host"] ?></li>
			<li class="address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
				<ul>
					<li class="streetaddress" itemprop="streetAddress"><?= $host["host_address1"] ?><?= $host["host_address1"] ? ", ".$host["host_address2"] : "" ?></li>
					<li class="city"><span class="postal" itemprop="postalCode"><?= $host["host_postal"] ?></span> <span class="locality" itemprop="addressLocality"><?= $host["host_city"] ?></span></li>
					<li class="country" itemprop="addressCountry"><?= $countries[arrayKeyValue($countries, "id", $host["host_country"])]["name"] ?></li>
				</ul>
			</li>
			<? if($host["host_googlemaps"]): ?>
			<li class="googlemaps" itemprop="hasMap" content="<?= $host["host_googlemaps"] ?>"><a href="<?= $host["host_googlemaps"] ?>" target="_blank">Map</a></li>
			<? endif; ?>
		</ul>

		<ul class="info">
			<li class="main_entity share" itemprop="mainEntityOfPage"><?= SITE_URL."/events/".$item["sindex"] ?></li>
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


<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified event.</p>


<? endif; ?>


</div>
