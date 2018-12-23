<?php
global $IC;
global $action;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:events", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);

}

// year/month can be passed to define starting point
if(count($action) == 2) {
	$year = parseInt($action[0]);
	$month = parseInt($action[1]);
}
else {
	$year = date("Y");
	$month = date("m");
}

$date = date("d");

$items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at > '".date("Y-m-d", mktime(0,0,0, $month, $date, $year))."'", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
//print_r($items);
// get items from previous and running month until now (we need these events to show the initial calendar grid)
$past_items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at < '".date("Y-m-d", mktime(0,0,0, $month, $date, $year))."' AND event.starting_at > '".date("Y-m-d", mktime(0,0,0, $month-1, 1, $year))."'", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "mediae" => true, "user" => true)));


// get new events
// $items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
// //print_r($items);
// // get items from previous and running month until now (we need these events to show the initial calendar grid)
// $past_items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at < NOW() AND event.starting_at > '".date("Y-m-d", mktime(0,0,0, date("m")-1, 1, date("Y")))."'", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "mediae" => true, "user" => true)));


?>

<div class="scene events i:events" data-year="<?= $year ?>" data-month="<?= $month ?>">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/events", [
			"media" => $media,
			"sharing" => true
		]) ?>


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
<?		foreach($items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at" content="<?= date("Y-m-d H:i", strtotime($item["starting_at"])) ?>"><?= date("l, F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>

<?				if($item["description"]): ?>
				<div class="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
<?				endif; ?>

			</li>
<?		endforeach; ?>
		</ul>

	<? else: ?>

		<p>No scheduled events.</p>

	<? endif; ?>

	</div>


	<div class="all_events past_events">
		<h2>Events from the past month</h2>
		<p>If you missed one, <a href="mailto:start@think.dk">please let us know</a> - we're likely to repeat any event upon request.</p>

	<? if($past_items): ?>

		<ul class="items events">
<?		foreach($past_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Started at</dt>
					<dd class="starting_at" content="<?= date("Y-m-d H:i", strtotime($item["starting_at"])) ?>"><?= date("l, F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>

<?				if($item["description"]): ?>
				<div class="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
<?				endif; ?>

			</li>
<?		endforeach; ?>
		</ul>

	<? else: ?>

		<p>No past events.</p>

	<? endif; ?>

	</div>

</div>
