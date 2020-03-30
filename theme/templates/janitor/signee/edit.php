<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => true));

$items = $IC->getItems(["itemtype" => "page", "status" => 1, "extend" => true]);
$item_options = $HTML->toOptions($items, "id", "name");

?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit signee</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit">
		<h2>Signee content</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("fullname", array("value" => $item["fullname"])) ?>
				<?= $model->input("email", array("value" => $item["email"])) ?>
				<?= $model->input("signed_item_id", ["type" => "select", "options" => $item_options]) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
