<?php
global $action;
global $IC;
global $model;
global $itemtype;

// include_once("classes/users/superuser.class.php");
// $UC = new SuperUser();

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));
$user_id = session()->value("user_id");

// $host_options = $model->toOptions($model->getHosts(), "id", "host");
// $hosts = $model->getHosts();
// $users = $UC->getUsers(["order" => "nickname ASC"]);

// $user_options_owner = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select event owner"]]);
// $user_options_1 = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select backer 1"]]);
// $user_options_2 = $model->toOptions($users, "id", "nickname", ["add" => ["" => "Select backer 2"]]);

$eventtype_tag = arrayKeyValue($item["tags"], "context", "eventtype");

?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit event</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

<? if($eventtype_tag !== false && $item["tags"][$eventtype_tag]["value"] === "member" && ($item["event_owner"] == $user_id || $item["backer_1"] == $user_id || $item["backer_2"] == $user_id)): ?>

	<?= $JML->editGlobalActions($item, ["modify" => [
		"list" => [
			"url" => "/janitor/event/host-list"
		],
		"delete" => false,
		"duplicate" => false
	]]) ?>

	<?= $JML->editSingleMedia($item) ?>

	<div class="item i:defaultEdit">
		<h2>Event</h2>
		<?= $model->formStart("updateHost/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("classname", array("value" => $item["classname"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

	<? //= $JML->editPrices($item) ?>

	<?= $JML->editTags($item) ?>

<? else: ?>

	<p>You do not have permission to edit this event.</p>

<? endif; ?>

</div>
