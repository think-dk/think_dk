
<?
global $action;
global $IC;
global $model;
global $itemtype;


$page_item = $IC->getItem(array("tags" => "page:wishlist", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}


$wishlist = $IC->getItem(array("itemtype" => "wishlist", "tags" => "wishlist:think.dk", "extend" => true));
$items = false;

if($wishlist) {
	$model_wishlist = $IC->typeObject("wishlist");

	// get ordered wishes
	$items = $model_wishlist->getOrderedWishes($wishlist["item_id"], array("status" => 1));

}

?>
<div class="scene wishes i:wishes">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
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


		<?= $HTML->articleInfo($page_item, "/wishlist", [
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
	<h1>Wishlist</h1>
<? endif; ?>


<?	if($items): ?>
	<ul class="items wishes images">
	<? foreach($items as $item):
		$media = $IC->sliceMedia($item); ?>
		<li class="item wish id:<?= $item["id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<h3><?= $item["name"] ?></h3>

			<? if($item["price"] || $item["link"]): ?>
			<dl class="info">
				<? if($item["price"]): ?>
				<dt class="price">Approximate price</dt>
				<dd class="price">DKK ~<?= $item["price"] ?></dd>
				<? endif; ?>
				<? if($item["link"]): ?>
				<dt class="link">Link</dt>
				<dd class="link"><a href="<?= $item["link"] ?>" target="_blank"><?= $item["link"] ?></a></dd>
				<? endif; ?>
			</dl>
			<? endif; ?>

			<? if($item["description"]): ?>
			<div class="description">
				<p><?= $item["description"] ?></p>
			</div>
			<? endif; ?>
		 </li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>
