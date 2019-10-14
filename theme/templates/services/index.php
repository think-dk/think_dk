<?php
global $action;
global $IC;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:services", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$items_convenience = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "$itemtype.position ASC", "tags" => "servicecategory:Convenience", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
$items_balance = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "$itemtype.position ASC", "tags" => "servicecategory:Balance", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
$items_culture = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "$itemtype.position ASC", "tags" => "servicecategory:Culture", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>

<div class="scene services i:scene">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMediae($page_item); ?>
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

		<? if($items_convenience): ?>
		<div class="servicegroup provisioning">

			<h2>Convenience</h2>
			<p>We all need stuff. think.dk helps you to find new sustainable alternatives and ways of getting it.</p>
			<ul class="items services">
				<? foreach($items_convenience as $item): ?>
				<li class="item service id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


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
		</div>
		<? endif; ?>

		<? if($items_balance): ?>
		<div class="servicegroup regulating">

			<h2>Balance</h2>
			<p>Whether it is body-mind, work-life or duty-passion balance, with us it's easy to get everything in line.</p>
			<ul class="items services i:articleMiniList">
				<? foreach($items_balance as $item): ?>
				<li class="item service id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


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
		</div>
		<? endif; ?>

		<? if($items_culture): ?>
		<div class="servicegroup cultural">

			<h2>Culture</h2>
			<p>We have a natural need to learn, experience and play, to challenge our senses and grow in new ways.</p>

			<ul class="items services i:articleMiniList">
				<? foreach($items_culture as $item): ?>
				<li class="item service id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


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
		</div>
		<? endif; ?>

	</div>

</div>
