<?php
global $IC;
global $action;
global $itemtype;
$model = $IC->typeObject($itemtype);

$ticket_model = $IC->typeObject("ticket");

$countries = $this->countries();
$location = false;
$next = false;
$prev = false;

$sindex = $action[0];


$pagination_pattern = [
	"pattern" => [
		"itemtype" => "event", 
		"status" => 1, 
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"comments" => true, 
			"readstate" => true,
			"prices" => true
		],
		"where" => "event.starting_at > NOW()",
		"order" => "event.starting_at ASC"
	],
	"sindex" => $sindex,
	"limit" => 1
];


// Get posts
$pagination_items = $IC->paginate($pagination_pattern);


if($pagination_items && $pagination_items["range_items"]) {

	$item = $pagination_items["range_items"][0];
	$this->sharingMetaData($item);

	// get host info
	$location = $model->getLocations(array("id" => $item["location"]));

	$SC = new Shop();
	$event_tickets = $model->getEventTickets(["item_id" => $item["item_id"]]);
	// debug(["event_tickets", $event_tickets]);

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

<div class="scene event i:event">

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


		<dl class="event_status" itemprop="eventStatus" content="<?= $model->event_status_schema_values[$item["event_status"]] ?>">
			<dt>Event status</dt>
			<dd class="<?= strtolower($model->event_status_schema_values[$item["event_status"]]) ?>"><?= $model->event_status_options[$item["event_status"]] ?></dd>
		</dl>


		<dl class="occurs_at">
			<dt class="starting_at">Starts</dt>
			<dd class="starting_at" itemprop="startDate" content="<?= date("Y-m-d H:i", strtotime($item["starting_at"])) ?>"><?= date("F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
			<? if($item["ending_at"]): ?>
			<dt class="ending_at">Ends</dt>
			<dd class="ending_at" itemprop="endDate" content="<?= date("Y-m-d H:i", strtotime($item["ending_at"])) ?>"><?= date("F j, Y - H:i", strtotime($item["ending_at"])) ?></dd>
			<? endif; ?>
		</dl>

		<dl class="event_attendance">
			<dt>Attendance</dt>
			<dd class="event_attendance_mode" itemprop="eventAttendanceMode" content="<?= $model->event_attendance_mode_schema_values[$item["event_attendance_mode"]] ?>"><?= $model->event_attendance_mode_options[$item["event_attendance_mode"]] ?></dd>

<? if($item["event_attendance_limit"]): ?>
			<dt>Max participants</dt>
	<? if($item["event_attendance_mode"] != 3): ?>
			<dd class="event_attendance_limit" itemprop="maximumPhysicalAttendeeCapacity" content="<?= $item["event_attendance_limit"] ?>"><?= $item["event_attendance_limit"] ?></dd>
	<? else: ?>
			<dd class="event_attendance_limit" itemprop="maximumVirtualAttendeeCapacity" content="<?= $item["event_attendance_limit"] ?>"><?= $item["event_attendance_limit"] ?></dd>
	<? endif; ?>

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


		<? if($location): ?>
		<div class="location">
			<h2>Location</h2>

			<? if($location["location_type"] == 1): ?>

			<ul class="location" itemprop="location" itemscope itemtype="https://schema.org/Place">
				<li class="name" itemprop="name"><?= $location["location"] ?></li>
				<li class="address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
					<ul>
						<li class="streetaddress" itemprop="streetAddress"><?= 
								($location["location_address1"] ? $location["location_address1"] : "") . 
								(($location["location_address1"] && $location["location_address2"]) ? ", " : "") . 
								($location["location_address2"] ? $location["location_address2"] : "")
						?></li>
						<li class="city"><span class="postal" itemprop="postalCode"><?= 
								$location["location_postal"] ? $location["location_postal"] : "" 
							?></span> <span class="locality" itemprop="addressLocality"><?= 
								$location["location_city"] ? $location["location_city"]  : ""
						?></span></li>
						<li class="country" itemprop="addressCountry"><?= 
							$location["location_country"] ? $countries[arrayKeyValue($countries, "id", $location["location_country"])]["name"] : ""
						?></li>
					</ul>
				</li>
				<? if($location["location_googlemaps"]): ?>
				<li class="googlemaps" itemprop="hasMap" content="<?= $location["location_googlemaps"] ?>"><a href="<?= $location["location_googlemaps"] ?>" target="_blank">Map</a></li>
				<? endif; ?>
				<? if($location["location_comment"]): ?>
				<li class="location_comment"><?= $location["location_comment"] ?></li>
				<? endif; ?>
			</ul>

			<? else: ?>

			<ul class="location" itemprop="location" itemscope itemtype="https://schema.org/VirtualLocation">
				<li class="name" itemprop="name"><?= $location["location"] ?></li>
				<? if($location["location_url"]): ?>
				<li class="url" itemprop="url" content="<?= $location["location_url"] ?>"><a href="<?= $location["location_url"] ?>" target="_blank"><?= $location["location_url"] ?></a></li>
				<? endif; ?>
				<? if($location["location_comment"]): ?>
				<li class="location_comment"><?= $location["location_comment"] ?></li>
				<? endif; ?>
			</ul>

			<? endif; ?>

		</div>
		<? endif; ?>


		<?= $HTML->pagination($pagination_items, [
			"class" => "pagination i:pagination",
			"type" => "sindex",
			"base_url" => "/events", 
			"show_total" => false,
			"labels" => ["prev" => "{name}", "next" => "{name}"]
		]) ?>

	</div>

	<? if($event_tickets): ?>
	<div class="tickets">
		<h2>Tickets</h2>
		<ul class="tickets">
			<? foreach($event_tickets as $event_ticket):

				if($event_ticket["status"] == 1):
					$remaining_tickets = $event_ticket["total_tickets"] - ($ticket_model->getSoldTickets($event_ticket["item_id"]) + $ticket_model->getReservedTickets($event_ticket["item_id"]));
					$ticket_price = $SC->getPrice($event_ticket["id"]);
			// debug([$event_ticket, $SC->getPrice($event_ticket["id"])]);
			?>
			<li class="ticket">

				<ul class="ticket_info">
					<li class="name"><?= $event_ticket["name"] ?></li>
					<? if($ticket_price): ?>
					<li class="price"><?= formatPrice($ticket_price) ?></li>
					<? endif; ?>

					<? if(strtotime($event_ticket["sale_closes"]) < time()): ?>
					<li class="remaining_tickets">Closed</li>
					<? elseif(strtotime($event_ticket["sale_opens"]) > time()): ?>
					<li class="remaining_tickets">Sale opens on <?= $event_ticket["sale_opens"] ?></li>
					<? elseif($remaining_tickets <= 0):?>
					<li class="remaining_tickets">Sold out</li>
					<? else:?>
					<li class="remaining_tickets"><?= $remaining_tickets ?> tickets left</li>
					<li class="buy">
						<ul class="actions">
							<?= $model->link("Buy ticket", "/tickets/".$event_ticket["sindex"], ["wrapper" => "li.buy", "class" => "button primary"]) ?>
						</ul>
					</li>
					<? endif; ?>
				</ul>

			</li>
				<? endif;
			endforeach; ?>
		</ul>
	</div>
	<? endif; ?>



<? else: ?>

	<div class="article">
		<h1>Technology clearly doesn't solve everything on it's own.</h1>
		<h2>Technology needs humanity.</h2>
		<p>We could not find the specified event.</p>
	</div>

<? endif; ?>


<? if($related_items): ?>

	<div class="related">
		<h2><?= $related_title ?> <a href="/events">(see all)</a></h2>

		<ul class="items events">
		<? foreach($related_items as $related_item): ?>
			<li class="item event item_id:<?= $related_item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("F j, Y - H:i", strtotime($related_item["starting_at"])) ?></dd>
				</dl>

				<h3><? if($related_item["event_status"] != 1): 
					?><span class="event_status <?= strtolower($model->event_status_schema_values[$related_item["event_status"]]) ?>"><?= strtoupper($model->event_status_options[$related_item["event_status"]]).": " ?></span><?
				endif; ?><a href="/events/<?= $related_item["sindex"] ?>"><?= strip_tags($related_item["name"]) ?></a></h3>

				<? if($related_item["description"]): ?>
				<div class="description">
					<p><?= nl2br($related_item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
		<?	endforeach; ?>
		</ul>
	</div>

<? endif; ?>

</div>
