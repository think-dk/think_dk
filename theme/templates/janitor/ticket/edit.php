<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true, "prices" => true, "comments" => true)));

$messages = $IC->getItems(array("itemtype" => "message", "tags" => "message:Ticket", "extend" => true));
?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit ticket</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item) ?>

	<?= $JML->editSingleMedia($item, array("label" => "Ticket image")) ?>

	<div class="item i:defaultEdit i:collapseHeader">
		<h2>Ticket content</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("classname", array("value" => $item["classname"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>
			</fieldset>

			<fieldset>
				<?= $model->input("ordered_message_id", array("type" => "select", "options" => $HTML->toOptions($messages, "id", "name", ["add" => ["" => "Choose message"]]), "value" => $item["ordered_message_id"])) ?>

				<?= $model->input("sale_opens", array("value" => $item["sale_opens"])) ?>
				<?= $model->input("sale_closes", array("value" => $item["sale_closes"])) ?>
				<?= $model->input("total_tickets", array("value" => $item["total_tickets"])) ?>

				<?= $model->input("ticket_information", array("value" => $item["ticket_information"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


	<?= $JML->editTags($item) ?>

	<?= $JML->editPrices($item) ?>

	<?= $JML->editComments($item) ?>



	<div class="participants i:defaultParticipants i:collapseHeader item_id:<?= $item["id"] ?>">
		<h2>Participants ()</h2>


	</div>

</div>
