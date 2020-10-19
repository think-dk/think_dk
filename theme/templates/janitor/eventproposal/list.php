<?php
global $action;
global $IC;
global $model;
global $itemtype;


$items = $IC->getItems(array("itemtype" => $itemtype, "extend" => array("tags" => true, "mediae" => true, "user" => true)));


?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Event proposals</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New event proposal")) ?>
	</ul>

	<div class="all_items i:defaultList taggable filters"<?= $HTML->jsData(["tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>
				<dl class="info">
					<dt>Host name</dt>
					<dd class="host_name"><?= $item["user_nickname"] ?></dd>
				</dl>

				<?= $JML->tagList($item["tags"], [
					"context" => "criteria"
				]) ?>

				<?= $JML->listActions($item, [
					"modify" => [
						"status" => false
					]
				]) ?>
			 </li>
<?			endforeach; ?>

		</ul>
<?		else: ?>
		<p>No event porposals.</p>
<?		endif; ?>
	</div>

</div>
