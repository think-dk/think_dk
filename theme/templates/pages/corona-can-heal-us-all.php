<?
global $action;
global $IC;
$model = $IC->typeObject("signee");

$page_item = $IC->getItem(array("tags" => "page:Corona", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);

	$signee_items = $IC->getItems(["itemtype" => "signee", "where" => "signed_item_id = ".$page_item["item_id"], "extend" => true]);
}
?>
<div class="scene corona i:corona">

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


		<?= $HTML->articleInfo($page_item, "/corona-can-heal-us-all", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>

	</div>

	<div class="signee">
		<h2>Do you agree?</h2>
		<p>You too, can raise the bar and commit to becoming a better you for a better world.</p>

		<?= $model->formStart("signup", array("class" => "signup labelstyle:inject")) ?>
			<?= $model->input("signed_item_id", ["type" => "hidden", "value" => $page_item["item_id"]]) ?>
			<?= $model->input("name", ["type" => "hidden", "value" => gen_uuid()]) ?>
			<fieldset>
				<?= $model->input("fullname") ?>
				<?= $model->input("email") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("I agree, I commit", ["class" => "primary"]) ?>
			</ul>
		<?= $model->formEnd() ?>
	</div>

	<? if($signee_items): ?>
	<div class="signees">
		<h2>We agree, we commit</h2>
		<ul class="signees">
			<? foreach($signee_items as $signee_item): ?>
			<li class="signee">
				<?= $signee_item["fullname"] ?>
			</li>
			<? endforeach; ?>
		</ul>
	</div>
	<? endif; ?>

	<?= $HTML->frontendComments($page_item, "/janitor/admin/page/addComment") ?>



<? else:?>

	<h1>Corona can heal us all</h1>
	<p>This page is currently being updated.</p>

<? endif; ?>

</div>