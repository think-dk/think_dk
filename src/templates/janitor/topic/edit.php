<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true, "comments" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit topic</h1>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit">
		<h2>Topic introduction</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
			</fieldset>

			<fieldset>
				<h3>Problem</h3>
				<?= $model->input("problem_headline", array("value" => $item["problem_headline"])) ?>
				<?= $model->inputHTML("problem", array("value" => $item["problem"])) ?>
			</fieldset>

			<fieldset>
				<h3>Solution</h3>
				<?= $model->inputHTML("solution", array("value" => $item["solution"])) ?>
				<?= $model->inputHTML("details", array("value" => $item["details"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


	<?= $JML->editTags($item) ?>

	<?= $JML->editComments($item) ?>

	<?= $JML->listTodos($item) ?>

	<?= $JML->listQnas($item) ?>

</div>
