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
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($page_item["tags"]):
			$editing_tag = arrayKeyValue($page_item["tags"], "context", "editing");
			if($editing_tag !== false): ?>
		<ul class="tags">
			<li class="editing" title="This page is work in progress"><?= $page_item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $page_item["tags"][$editing_tag]["value"] ?></li>
		</ul>
			<? endif; ?>
		<? endif; ?>

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page_item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page_item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page_item["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage" content="<?= SITE_URL."/services" ?>"></li>
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
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page_item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

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

					<!--ul class="tags">
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
					</ul-->

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>

					<ul class="info">
						<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
						<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/services/".$item["sindex"] ?>"></li>
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
					</ul>

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
			<p>Whether it is body-mind or work-life balance, with us it's easy to get everything in line.</p>
			<ul class="items services i:articleMiniList">
				<? foreach($items_balance as $item): ?>
				<li class="item service id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

					<!--ul class="tags">
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
					</ul-->

					<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>

					<ul class="info">
						<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
						<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/services/".$item["sindex"] ?>"></li>
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
					</ul>

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

					<ul class="info">
						<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
						<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
						<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/services/".$item["sindex"] ?>"></li>
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
					</ul>

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
