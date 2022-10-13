<?php
global $action;
global $model;

$IC = new Items();
$UC = new User();

$page_item = $IC->getItem(array("tags" => "page:support", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}


$memberships = $IC->getItems(array("itemtype" => "membership", "tags" => "membership:v4", "order" => "position ASC", "status" => 1, "extend" => array("prices" => true, "subscription_method" => true)));
$donations = $IC->getItems(array("itemtype" => "donation", "order" => "position ASC", "status" => 1, "extend" => array("prices" => true)));

$options = array_merge($memberships, $donations);
foreach($options as $i => $option) {
	if(!isset($option["subscription_method"])) {
		$options[$i]["frequency"] = "Only once";
	}
	else if($option["subscription_method"]["duration"] === "annually") {
		$options[$i]["frequency"] = "Every year";
	}
	else if($option["subscription_method"]["duration"] === "biannually") {
		$options[$i]["frequency"] = "Every 6 months";
	}
	else if($option["subscription_method"]["duration"] === "quarterly") {
		$options[$i]["frequency"] = "Every 3 months";
	}
	else if($option["subscription_method"]["duration"] === "monthly") {
		$options[$i]["frequency"] = "Every month";
	}
}


$support_options = $HTML->toOptions($options, "item_id", "frequency");
// $maillist = session()->value("user_id") === 1 ? true : false;

?>
<div class="scene signup i:support">

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


		<?= $HTML->articleInfo($page_item, "/support", [
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
	<h1>Support our organization</h1>
<? endif; ?>


	<?= $HTML->serverMessages() ?>


	<div class="membership">
		<?= $model->formStart("/support/addToCart", array("class" => "membership labelstyle:inject")) ?>
			<?= $model->input("quantity", array("value" => 1, "type" => "hidden")); ?>


			<?= $model->input("custom_price", array("value" => 500, "type" => "range", "min" => 50, "max" => 5000, "step" => 10)); ?>

			<?= $model->input("item_id", array(
				"label" => "Repeat payment", 
				"required" => true, 
				"options" => $support_options, 
				"hint_message" => "Please choose a frequency for your support", 
				"error_message" => "A frequency for your support must be selected", 
				"type" => "radiobuttons"
			)); ?>

			<ul class="actions">
				<?= $model->submit("Yes, I'll do it", array("class" => "primary", "wrapper" => "li.signup")) ?>
			</ul>
		<?= $model->formEnd() ?>
	</div>

</div>
