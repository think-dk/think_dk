<?
global $itemtype;
global $IC;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "readstate" => true)));
	
?>
<div class="scene pages i:articles">

	<h1>The hidden pages</h1>

	<ul class="articles">
<?	foreach($items as $item): ?>
		<li class="article item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

<?			if($item["tags"]): ?>
			<ul class="tags">
<?				foreach($item["tags"] as $tag): ?>

<?				if(arrayKeyValue($item["tags"], "context", "editing")): ?>
					<li class="editing" title="Denne side redigeres stadig">Redigeres</li>
<?				else: ?>
					<li itemprop="articleSection"><?= $tag["value"] ?></li>
<?				endif; ?>

<?				endforeach; ?>
			</ul>
<?			endif; ?>

			<h3><a href="/sider/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			<p><?= preg_replace("/<br>|<br \/>/", "", $item["description"]) ?></p>

		</li>
<?	endforeach; ?>
	</ul>

</div>