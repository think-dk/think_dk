<?php
global $action;
global $IC;
global $model;
global $itemtype;

?>
<div class="scene i:scene defaultNew">
	<h1>New event</h1>
	<h2>Event Admin</h2>

	<ul class="actions">
		<?= $HTML->link("List", "/janitor/event/admin-list", array("wrapper" => "li.list", "class" => "button")) ?>
	</ul>

	<?= $model->formStart("save/".$itemtype, array("class" => "i:defaultNew labelstyle:inject")) ?>
		<?= $model->input("return_to", ["type" => "hidden", "value" => "/janitor/event/admin-edit/"]) ?>
		<?= $model->input("memberevent", ["type" => "hidden", "value" => "true"]) ?>
		
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<?= $JML->newActions(["modify" => [
			"cancel" => [
				"url" => "/janitor/event/admin-list"
			]
		]]) ?>
	<?= $model->formEnd() ?>

</div>
