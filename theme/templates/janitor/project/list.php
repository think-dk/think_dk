<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "status DESC, position ASC, published_at DESC", "extend" => array("tags" => true, "mediae" => true)));
?>

<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Projects</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New project")) ?>
	</ul>

	<div class="all_items i:defaultList taggable sortable filters"<?= $HTML->jsData(["order", "tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>

				<?= $JML->tagList($item["tags"]) ?>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No projects.</p>
<?		endif; ?>
	</div>

</div>
