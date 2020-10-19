<?php
global $action;
global $IC;
global $model;
global $itemtype;

// additional parameter
$past_events = false;
if(count($action) == 2 && $action[1] == "past") {
	$past_events = "past";
}


// get past events
if($past_events) {
	$items = $IC->getItems(array("itemtype" => $itemtype, "where" => $itemtype.".starting_at < NOW()", "order" => "status DESC, ".$itemtype.".starting_at DESC", "extend" => array("tags" => true, "mediae" => true)));	
}
// get upcoming events
else {
	$items = $IC->getItems(array("itemtype" => $itemtype, "where" => $itemtype.".starting_at > (NOW() - INTERVAL 5 HOUR)", "order" => "status DESC, ".$itemtype.".starting_at ASC", "extend" => array("tags" => true, "mediae" => true)));
}

?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Events</h1>
	<h2>Event Admin list</h2>

	<ul class="actions">
		<?= $HTML->link("New event", "/janitor/event/admin-new", array("wrapper" => "li.new", "class" => "button primary")) ?>
	</ul>

	<ul class="tabs">
		<?= $HTML->link("Upcoming events", "/janitor/event/admin-list", array("wrapper" => "li.".(!$past_events ? "selected" : ""))) ?>
		<?= $HTML->link("Past events", "/janitor/event/admin-list/past", array("wrapper" => "li.".($past_events ? "selected" : ""))) ?>
	</ul>

	<div class="all_items i:defaultList taggable filters"<?= $HTML->jsData(["tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">

<?			if($items): ?>
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>
				<dl class="info">
					<dt>Starting</dt>
					<dd class="starting_at"><?= date("Y-m-d @ H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<?= $JML->tagList($item["tags"], ["context" => "criteria,eventtype"]) ?>

				<?= $JML->listActions($item, ["modify" => [
					"edit" => [
						"url" => "/janitor/event/admin-edit/". $item["id"]
					],
					"delete" => false
				]]) ?>
			 </li>
<?			endforeach; ?>
<?			endif; ?>

		</ul>
<?		else: ?>
		<p>No events.</p>
<?		endif; ?>
	</div>

</div>
