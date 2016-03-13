<?
global $action;
global $IC;

$itemtype = "person";

$page = $IC->getItem(array("tags" => "page:contact", "extend" => array("user" => true, "mediae" => true)));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));


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
			<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/contact" ?></li>
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
	<div class="teams">
		<h2>Team</h2>
		<ul class="items people">
			<? foreach($items as $item): 
				$media = $IC->sliceMedia($item); ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email"><?= $item["email"] ?></a></li>
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
					<li itemprop="streetAddress">Æbeløgade 4</li>
					<li><span class="postal" itemprop="postalCode">2100</span> <span class="locality" itemprop="addressLocality">København Ø</span></li>
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
					<li class="facebook"><a href="https://facebook.com/think.dk">Facebook</a></li>
					<li class="linkedin"><a href="https://www.linkedin.com/company/think-dk">LinkedIn</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="info financial">
			<dt class="bank">Bank</dt>
			<dd class="bank"><a href="http://faelleskassen.dk">Fælleskassen</a></dd>

			<dt class="account">Account no</dt>
			<dd class="account">84114145172</dd>
		</dl>

	</div>

</div>
