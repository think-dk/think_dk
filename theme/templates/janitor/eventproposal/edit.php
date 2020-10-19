<?php
global $action;
global $IC;
global $model;
global $itemtype;


$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));


?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit eventproposal</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item, [
		"modify" => [
			"status" => false,
			"duplicate" => false,
			"list" => [
				"label" => "Event proposals list"
			]
		],
		"extend" => [
			"events" => [
				"label" => "Events list",
				"url" => "/janitor/event/admin-list",
				"options" => array("class" => "button", "wrapper" => "li.events")
			],
			"convert" => [
				"type" => "onebuttonform",
				"label" => "Convert to event",
				"success-function" => "convertedToEvent",
				"wrapper" => "li.convert.i:eventproposalConvert",
				"url" => "convertToEvent/".$item["id"]
			]
		]
	]) ?>

	<?= $JML->editSingleMedia($item, ["label" => "Main event image"]) ?>

	<div class="item i:defaultEdit">
		<h2>Event</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<h3>Event name</h3>
				<?= $model->input("name", array("value" => $item["name"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event time wishes</h3>
				<?= $model->input("desired_part_of_week", array("value" => $item["desired_part_of_week"])) ?>
				<?= $model->input("desired_start_time", array("value" => $item["desired_start_time"])) ?>
				<?= $model->input("desired_end_time", array("value" => $item["desired_end_time"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event details</h3>
				<?= $model->input("event_attendance_mode", array("value" => $item["event_attendance_mode"])) ?>
				<?= $model->input("event_type", array("value" => $item["event_type"])) ?>
				<?= $model->input("event_attendance_expectance", array("value" => $item["event_attendance_expectance"])) ?>
				<?= $model->input("tickets", array("value" => $item["tickets"])) ?>
				<?= $model->input("reoccurring", array("value" => $item["reoccurring"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event descriptions</h3>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
			</fieldset>

			<fieldset>
				<h3>Comment to event team</h3>
				<?= $model->input("comment_from_host", array("value" => $item["comment_from_host"])) ?>
			</fieldset>

			<fieldset>
				<h3>Hosting terms and conditions</h3>
				<?= $model->input("terms", array("value" => $item["terms"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

	<?= $JML->editTags($item, [
		"context" => "criteria"
	]) ?>

	<?= $JML->editOwner($item) ?>

</div>
