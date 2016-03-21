
<?
global $action;
global $IC;
global $model;
global $itemtype;


$page = $IC->getItem(array("tags" => "page:wishlist", "extend" => array("user" => true, "mediae" => true)));


$wishlist = $IC->getItem(array("itemtype" => "wishlist", "tags" => "wishlist:think.dk", "extend" => true));
$items = false;

if($wishlist) {
	$model_wishlist = $IC->typeObject("wishlist");

	// get ordered wishes
	$items = $model_wishlist->getOrderedWishes($wishlist["item_id"], array("status" => 1));

}


$this->sharingMetaData($page);
?>
<div class="scene wishes i:wishes">

<? if($page && $page["status"]): 
	$media = $IC->sliceMedia($page); ?>
	<div class="article i:article id:<?= $page["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page["name"] ?></h1>

		<? if($page["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page["user_nickname"] ?></li>
			<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/wishlist" ?></li>
			<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
				<ul class="publisher_info">
					<li class="name" itemprop="name">think.dk</li>
					<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					</li>
				</ul>
			</li>
			<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
			<? if($media): ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Wishlist</h1>
<? endif; ?>


<?	if($items): ?>
	<ul class="items wishes">
	<? foreach($items as $item):
		$media = $IC->sliceMedia($item); ?>
		<li class="item wish id:<?= $item["id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<h3><?= $item["name"] ?></h3>

			<? if($item["price"] || $item["link"]): ?>
			<dl class="info">
				<? if($item["price"]): ?>
				<dt class="price">Approximate price</dt>
				<dd class="price">DKK <?= $item["price"] ?></dd>
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
