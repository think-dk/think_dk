<?
global $action;
global $IC;

$itemtype = "person";

$page = $IC->getItem(array("tags" => "page:contact", "extend" => array("user" => true, "mediae" => true)));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));


$this->sharingMetaData($page);
?>
<div class="scene contact i:scene">

<? if($page && $page["status"]): 
	$media = $IC->sliceMedia($item); ?>
	<div class="article i:article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

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
			<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/news" ?></li>
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
	<h1>Contact</h1>
<? endif; ?>





<? if($items): ?>
	<h2>Employees, staff and consultants</h2>
	<ul class="items people">
		<? foreach($items as $item): 
			$media = $IC->sliceMedia($item); ?>
		<li class="item person id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle">

			<ul class="tags">
			<? if($item["tags"]):
				$editing_tag = arrayKeyValue($item["tags"], "context", "editing"); ?>
				<? if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
				<? endif; ?>
				<li><a href="/posts">Posts</a></li>
				<? foreach($item["tags"] as $item_tag): ?>
					<? if($item_tag["context"] == $itemtype): ?>
				<li itemprop="articleSection"><a href="/posts/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
					<? endif; ?>
				<? endforeach; ?>
			<? endif; ?>
			</ul>

			<h3 itemprop="headline"><?= $item["name"] ?></h3>

			<!--ul class="info">
				<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
				<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
				<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
				<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/posts/".$item["sindex"] ?></li>
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
					<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
					<span class="image_width" itemprop="width" content="720"></span>
					<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
				<? else: ?>
					<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
					<span class="image_width" itemprop="width" content="720"></span>
					<span class="image_height" itemprop="height" content="405"></span>
				<? endif; ?>
				</li>
			</ul-->

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