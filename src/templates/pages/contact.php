<?
global $action;
global $IC;


$page_item = $IC->getItem(array("tags" => "page:contact", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

?>
<div class="scene contact i:scene">

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


		<?= $HTML->articleInfo($page_item, "/contact", [
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
	<h1>Contact</h1>
<? endif; ?>



	<div itemtype="http://schema.org/Organization" itemscope class="vcard company">
		<h2 class="name fn org" itemprop="name">think.dk</h2>

		<dl class="info basic">
			<dt class="location">Address</dt>
			<dd class="location" itemprop="location" itemscope itemtype="http://schema.org/Place">
				<ul class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<li class="streetaddress" itemprop="streetAddress">Æbeløgade 4</li>
					<li class="city"><span class="postal" itemprop="postalCode">2100</span> <span class="locality" itemprop="addressLocality">København Ø</span></li>
					<li class="country" itemprop="addressCountry">Denmark</li>
				</ul>
				<ul class="geo" itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
					<li class="latitude" itemprop="latitude" content="55.681159"></li>
					<li class="longitude" itemprop="longitude" content="12.58437"></li>
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
					<li itemprop="telephone" class="tel" content="+4560692819">+45 6069 2819</li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a href="https://www.facebook.com/thinkdk-527647573938387/" target="_blank">Facebook</a></li>
					<li class="meetup"><a href="https://www.meetup.com/think-dk" target="_blank">Meetup</a></li>
					<li class="twitter"><a href="https://twitter.com/think_denmark" target="_blank">Twitter</a></li>
					<li class="instagram"><a href="https://www.instagram.com/think.dk" target="_blank">Instagram</a></li>
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
