<?php
global $action;
global $IC;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:services", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "$itemtype.position ASC", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>

<div class="scene services i:scene">

<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/services", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Services</h1>
<? endif; ?>

	<div class="all_services">

		<? if($items): ?>
			<ul class="items services articles articlePreviewList i:articlePreviewList">
				<? foreach($items as $item):
					$media = $IC->sliceMediae($item, "single_media"); ?>
				<li class="item article service id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

					<? if($media): ?>
					<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
					<? endif; ?>

					<?= $HTML->articleTags($item, [
						"context" => ["service"]
					]) ?>

					<h2 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h2>


					<?= $HTML->articleInfo($item, "/services/".$item["sindex"], [
						"media" => $media
					]) ?>


					<? if($item["description"]): ?>
					<div class="description" itemprop="description">
						<p><?= nl2br($item["description"]) ?></p>
					</div>
					<? endif; ?>

				</li>
				<? endforeach; ?>
			</ul>
		<? endif; ?>

	</div>

</div>
