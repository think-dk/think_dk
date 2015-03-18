<?
global $itemtype;
global $IC;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => array("tags" => true, "readstate" => true)));
	
?>
<div class="scene articles i:articles">

	<h1>Artikler</h1>
	<h2>Om Stopknappens idegrundlag, menneskesyn og hvorfor tro kan flytte bjerge.</h2>
	<p>
		Stopknappen er en ideologi der tror på mennesker. En ideologi der fuldt ud accepterer, at vi kan meget mere
		end vi får lov til. At det er på tide at vi selv tager et ansvar og giver os selv lov til at afgøre vores
		fremtid. Vi kan nemlig godt.
	</p>

	<ul class="articles i:articleList">
<?	foreach($items as $item): ?>
		<li class="article item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ?>">

<?			if($item["tags"]): ?>
			<ul class="tags">
<?				if(arrayKeyValue($item["tags"], "context", "editing")): ?>
					<li class="editing" title="Denne artikel redigeres stadig">Redigeres</li>
<?				endif; ?>
<?				foreach($item["tags"] as $tag): ?>
<?	 				if($tag["context"] == "about"): ?>
				<li itemprop="articleSection"><a href="/artikler/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
			</ul>
<?			endif; ?>

			<h3><a href="/artikler/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			<p><?= preg_replace("/<br>|<br \/>/", "", $item["subheader"]) ?></p>

		</li>
<?	endforeach; ?>
	</ul>

</div>