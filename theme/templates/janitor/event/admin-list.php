<?php
global $action;
global $IC;
global $model;
global $itemtype;


$items = $IC->getItems(array("itemtype" => $itemtype, "where" => $itemtype.".starting_at > NOW()", "tags" => "eventtype:member", "order" => "status DESC, ".$itemtype.".starting_at ASC", "extend" => array("tags" => true, "mediae" => true)));


?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Events</h1>
	<h2>Event Admin list</h2>

	<ul class="actions">
		<?= $HTML->link("New event", "/janitor/event/admin-new", array("wrapper" => "li.new", "class" => "button primary")) ?>
	</ul>

	<div class="all_items i:defaultList taggable filters"<?= $JML->jsData(["tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">

<?			if($items): ?>
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>
				<dl class="info">
					<dt>Starting</dt>
					<dd class="starting_at"><?= date("Y-m-d @ H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<?= $JML->tagList($item["tags"]) ?>

				<?= $JML->listActions($item, ["modify" => [
					"edit" => [
						"url" => "/janitor/event/admin-edit/". $item["id"]
					],
					"delete" => false
				]]) ?>
			 </li>
<?			endforeach; ?>
<?			endif; ?>

		</ul>
<?		else: ?>
		<p>No events.</p>
<?		endif; ?>
	</div>

</div>
