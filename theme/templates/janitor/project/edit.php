<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true, "comments" => true)));
?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit project</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item) ?>

	<?= $JML->editSingleMedia($item, array("label" => "Main project image")) ?>

	<div class="item i:defaultEdit">
		<h2>Project content</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
				<?= $model->input("projectdetails", array("value" => $item["projectdetails"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


	<?= $JML->editTags($item) ?>

	<?= $JML->editComments($item) ?>

	<?= $JML->editSindex($item) ?>

	<?= $JML->editDeveloperSettings($item) ?>

	<?= $JML->editOwner($item) ?>

</div>
