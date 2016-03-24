<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "status DESC, position ASC, published_at DESC", "extend" => array("tags" => true, "mediae" => true)));
?>

<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Services</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New service")) ?>
	</ul>

	<div class="all_items i:defaultList taggable sortable filters"<?= $JML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item draggable item_id:<?= $item["id"] ?>">
				<div class="drag"></div>
				<h3><?= $item["name"] ?></h3>

				<?= $JML->tagList($item["tags"]) ?>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No services.</p>
<?		endif; ?>
	</div>

</div>
