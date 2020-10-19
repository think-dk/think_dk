<?php
global $action;
global $IC;
global $model;
global $itemtype;

?>
<div class="scene i:scene defaultNew">
	<h1>New event proposal</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save/".$itemtype, array("class" => "i:defaultNew labelstyle:inject")) ?>
		<?= $model->input("html", ["type" => "hidden", "value" => "<p>[Add your specific event description here]</p><h3>About the event</h3><p>[Add the general/standard event series description here – only for recurring events with changing topics.]</p><h3>About the Host</h3><p>[Add description of the host of the event – who are you? What motivates or qualifies you to host this event?]</p><h3>Registration and Details</h3><p>[Add registration info, price and other details here]</p>"]) ?>
		<fieldset>
			<?= $model->input("name") ?>
			<?= $model->input("terms") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>

</div>
