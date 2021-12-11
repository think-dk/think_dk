<?php
global $action;
global $IC;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:projects", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$projects = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "$itemtype.position ASC", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>

<div class="scene projects i:scene">

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

	<div class="article">
		<h1>Projects</h1>
	</div>

<? endif; ?>

	<div class="all_projects">

		<? if($projects): ?>
		<ul class="items projects articles articlePreviewList i:articlePreviewList">
			<? foreach($projects as $item):
				$media = $IC->sliceMediae($item, "single_media"); ?>
			<li class="item article project id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

				<? if($media): ?>
				<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
				<? endif; ?>


				<?= $HTML->articleTags($item, [
					"context" => [$itemtype],
					"url" => "/projects/tag",
				]) ?>

				<h2 itemprop="headline"><a href="/projects/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h2>


				<?= $HTML->articleInfo($item, "/projects/".$item["sindex"], [
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
