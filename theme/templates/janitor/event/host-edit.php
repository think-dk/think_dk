<?php
global $action;
global $IC;
global $model;
global $itemtype;


$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));
$user_id = session()->value("user_id");

$editable = false;
$editors = $model->getEditors(["item_id" => $item["item_id"]]);
if($editors) {
	foreach($editors as $editor) {
		if($editor["user_id"] == $user_id) {
			$editable = true;
		}
	}
}

$eventtype_tag = arrayKeyValue($item["tags"], "context", "eventtype");

?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit event as event editor</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

<? if($eventtype_tag !== false && $item["tags"][$eventtype_tag]["value"] === "member" && $editable): ?>

	<?= $JML->editGlobalActions($item, ["modify" => [
		"list" => [
			"url" => "host-list"
		],
		"delete" => false,
		"duplicate" => false
	]]) ?>

	<?= $JML->editSingleMedia($item, ["label" => "Main event image"]) ?>

	<div class="item i:defaultEdit i:collapseHeader">
		<h2>Event details</h2>
		<?= $model->formStart("updateHost/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<h3>Event name and status</h3>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("event_status", array("value" => $item["event_status"])) ?>
			</fieldset>

			<fieldset>
				<h3>Event attendance</h3>
				<?= $model->input("event_attendance_mode", array("value" => $item["event_attendance_mode"])) ?>
				<?= $model->input("event_attendance_limit", array("value" => $item["event_attendance_limit"])) ?>
				<?= $model->input("accept_signups", array("value" => $item["accept_signups"])) ?>
			</fieldset>

			<fieldset>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

	<?= $JML->editSindex($item) ?>

<? else: ?>

	<p>You do not have permission to edit this event.</p>

<? endif; ?>

</div>
