<?php
global $action;
global $IC;
global $model;
global $itemtype;


$items = $IC->getItems(array("itemtype" => $itemtype, "extend" => true));


?>

<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Signees</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New signee")) ?>
	</ul>

	<div class="all_items i:defaultList filters"<?= $HTML->jsData(["search"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["fullname"]) ?> - <?= $item["email"] ?></h3>


				<?= $JML->listActions($item) ?>

			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No signees.</p>
<?		endif; ?>
	</div>

</div>
