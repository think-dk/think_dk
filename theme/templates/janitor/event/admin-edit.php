<?php
global $action;
global $IC;
global $model;
global $itemtype;

include_once("classes/users/superuser.class.php");
$UC = new SuperUser();

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));


// $host_options = $model->toOptions($model->getHosts(), "id", "host");
$location_options = $model->toOptions($model->getLocations(), "id", "location", ["add" => ["" => "Select event location"]]);
$users = $UC->getUsers(["order" => "nickname ASC"]);

$user_options_owner = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select event owner"]]);
$user_options_1 = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select backer 1"]]);
$user_options_2 = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select backer 2"]]);

$eventtype_tag = arrayKeyValue($item["tags"], "context", "eventtype");

?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit event as event admin</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

<? if($eventtype_tag !== false && $item["tags"][$eventtype_tag]["value"] === "member"): ?>

	<?= $JML->editGlobalActions($item, ["modify" => [
		"list" => [
			"url" => "admin-list"
		],
		"delete" => false
	]]) ?>

	<?= $JML->editSingleMedia($item, ["label" => "Main event image"]) ?>

	<div class="item i:defaultEdit i:collapseHeader">
		<h2>Event details</h2>
		<?= $model->formStart("updateAdmin/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<h3>Event name and status</h3>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("event_status", array("value" => $item["event_status"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event time</h3>
				<?= $model->input("starting_at", array("value" => $item["starting_at"])) ?>
				<?= $model->input("ending_at", array("value" => $item["ending_at"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event attendance</h3>
				<?= $model->input("event_attendance_mode", array("value" => $item["event_attendance_mode"])) ?>
				<?= $model->input("event_attendance_limit", array("value" => $item["event_attendance_limit"])) ?>
				<?= $model->input("accept_signups", array("value" => $item["accept_signups"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event location</h3>
				<?= $model->input("location", array("type" => "select", "options" => $location_options, "value" => $item["location"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event descriptions</h3>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

	<?= $JML->editEventTickets($item) ?>

	<?= $JML->editEditors($item) ?>

	<?= $JML->editTags($item) ?>

	<?= $JML->editSindex($item) ?>

	<?= $JML->editDeveloperSettings($item) ?>

<? else: ?>

	<p>You do not have permission to edit this event.</p>

<? endif; ?>

</div>
