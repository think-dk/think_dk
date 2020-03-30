<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(["itemtype" => "page", "status" => 1, "extend" => true]);
$item_options = $HTML->toOptions($items, "id", "name");

?>
<div class="scene i:scene defaultNew">
	<h1>New signee</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<fieldset>
			<?= $model->input("name", ["type" => "hidden", "value" => gen_uuid()]) ?>
			<?= $model->input("fullname") ?>
			<?= $model->input("email") ?>
			<?= $model->input("signed_item_id", ["type" => "select", "options" => $item_options]) ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>
</div>
