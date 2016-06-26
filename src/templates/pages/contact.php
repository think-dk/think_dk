<?
global $action;
global $IC;

$itemtype = "person";

$page_item = $IC->getItem(array("tags" => "page:contact", "extend" => array("user" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>
<div class="scene contact i:scene">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

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
			<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/contact" ?>"></li>
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
	<h1>Contact</h1>
<? endif; ?>



<? if($items): ?>
	<div class="teams">
		<h2>Behind the scenes</h2>
		<ul class="items people">
			<? foreach($items as $item): 
				$media = $IC->sliceMedia($item); ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if($item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>


	<div itemtype="http://schema.org/Organization" itemscope class="vcard company">
		<h2 class="name fn org" itemprop="name">think.dk</h2>

		<dl class="info basic">
			<dt class="address">Address</dt>
			<dd class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
				<ul>
					<li class="streetaddress" itemprop="streetAddress">Æbeløgade 4</li>
					<li class="city"><span class="postal" itemprop="postalCode">2100</span> <span class="locality" itemprop="addressLocality">København Ø</span></li>
					<li class="country" itemprop="addressCountry">Denmark</li>
				</ul>
			</dd>
			<dt class="cvr">CVR</dt>
			<dd class="cvr" itemprop="taxID">25 21 04 33</dd>
		</dl>

		<dl class="info contact">
			<dt class="contact">Contact</dt>
			<dd class="contact">
				<ul>
					<li class="email"><a href="mailto:start@think.dk" itemprop="email" content="start@think.dk">start@think.dk</a></li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a href="https://www.facebook.com/thinkdk-527647573938387/" target="_blank">Facebook</a></li>
					<li class="linkedin"><a href="https://www.linkedin.com/company/think-dk" target="_blank">LinkedIn</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="info financial">
			<dt class="bank">Bank</dt>
			<dd class="bank"><a href="http://faelleskassen.dk" target="_blank">Fælleskassen</a></dd>

			<dt class="account">Account no</dt>
			<dd class="account">8411 4145172</dd>

			<dt class="account">IBAN</dt>
			<dd class="account">DK3184110004145172</dd>

			<dt class="account">SWIFT/BIC</dt>
			<dd class="account">FAELDKK1</dd>
		</dl>

	</div>

</div>
