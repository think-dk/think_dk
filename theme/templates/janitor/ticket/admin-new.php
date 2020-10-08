<?php
global $action;
global $IC;
global $model;
global $itemtype;

// Set default location (think.dk)
$messages = $IC->getItems(array("itemtype" => "message", "tags" => "message:Ticket", "extend" => true));

// debug([$messages]);

$default_ticket_mail_id = false;
$default_ticket_mail_index = arrayKeyValue($messages, "name", "Your ticket");
if($default_ticket_mail_index !== false) {
	$default_ticket_mail_id = $messages[$default_ticket_mail_index]["id"];
}
?>
<div class="scene i:scene defaultNew">
	<h1>New ticket</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("saveAdmin", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<?= $model->input("return_to", ["type" => "hidden", "value" => "/janitor/ticket/admin-edit/"]) ?>
		<?= $default_ticket_mail_id ? $model->input("ordered_message_id", ["type" => "hidden", "value" => $default_ticket_mail_id]) : "" ?>
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>
</div>
