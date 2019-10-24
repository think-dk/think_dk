<?php
global $action;
global $IC;
global $model;
global $itemtype;

// Set default location (think.dk)
$locations = $model->getLocations();
$think_location_id = false;
$think_location_index = arrayKeyValue($locations, "location", "think.dk");
if($think_location_index !== false) {
	$think_location_id = $locations[$think_location_index]["id"];
}
?>
<div class="scene i:scene defaultNew">
	<h1>New event</h1>
	<h2>Event Admin</h2>

	<ul class="actions">
		<?= $HTML->link("List", "/janitor/event/admin-list", array("wrapper" => "li.list", "class" => "button")) ?>
	</ul>

	<?= $model->formStart("saveAdmin", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<?= $model->input("return_to", ["type" => "hidden", "value" => "/janitor/event/admin-edit/"]) ?>
		<?= $model->input("memberevent", ["type" => "hidden", "value" => "true"]) ?>
		<?= $think_location_id ? $model->input("location", ["type" => "hidden", "value" => $think_location_id]) : "" ?>
		<?= $model->input("html", ["type" => "hidden", "value" => "<p>[Add your specific event description here]</p><h3>About the event</h3><p>[Add the general/standard event series description here – only for recurring events with changing topics.]</p><h3>About the Host</h3><p>[Add description of the host of the event – who are you? What motivates or qualifies you to host this event?]</p><h3>Registration and Details</h3><p>[Add registration info, price and other details here]</p>"]) ?>
		
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<?= $JML->newActions(["modify" => [
			"cancel" => [
				"url" => "/janitor/event/admin-list"
			]
		]]) ?>
	<?= $model->formEnd() ?>

</div>
