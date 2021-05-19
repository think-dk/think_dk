<?
global $action;
global $IC;


$page_item = $IC->getItem(array("tags" => "page:contact", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$daily_items = $IC->getItems(array("itemtype" => "person", "status" => 1, "order" => "person.position", "tags" => "person:daily", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>
<div class="scene contact i:contact">

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


<? if($daily_items): ?>
	<div class="teams">
		<h2>Primary contacts</h2>

		<? if($daily_items): ?>
		<ul class="items people">
			<? foreach($daily_items as $item): ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if(0 && $item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
		<? endif; ?>
	</div>
<? endif; ?>

	<div itemtype="http://schema.org/Organization" itemscope class="vcard company">
		<h2 class="name fn org" itemprop="name">think.dk</h2>

		<dl class="info basic">
			<dt class="location">Address</dt>
			<dd class="location" itemprop="location" itemscope itemtype="http://schema.org/Place">
				<ul class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<li class="streetaddress" itemprop="streetAddress">Ryesgade 15</li>
					<li class="city"><span class="postal" itemprop="postalCode">2200</span> <span class="locality" itemprop="addressLocality">København N</span></li>
					<li class="country" itemprop="addressCountry">Denmark</li>
				</ul>
				<ul class="geo" itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
					<li class="latitude" itemprop="latitude" content="55.6912109"></li>
					<li class="longitude" itemprop="longitude" content="12.5631139"></li>
				</ul>
			</dd>
			<dt class="cvr">CVR</dt>
			<dd class="cvr" itemprop="taxID">40 20 18 90</dd>
		</dl>

		<dl class="info contact">
			<dt class="contact">Contact</dt>
			<dd class="contact">
				<ul>
					<li class="email"><a href="mailto:start@think.dk" itemprop="email" content="start@think.dk">start@think.dk</a></li>
					<li itemprop="telephone" class="tel" content="+4520742819">+45 2074 2819</li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a itemprop="sameAs" href="https://www.facebook.com/thinkcopenhagen" target="_blank">Facebook</a></li>
					<li class="meetup"><a itemprop="sameAs" href="https://www.meetup.com/think-dk" target="_blank">Meetup</a></li>
					<li class="twitter"><a itemprop="sameAs" href="https://twitter.com/think_denmark" target="_blank">Twitter</a></li>
					<li class="instagram"><a itemprop="sameAs" href="https://www.instagram.com/think.dk" target="_blank">Instagram</a></li>
					<li class="linkedin"><a itemprop="sameAs" href="https://www.linkedin.com/company/think-dk" target="_blank">LinkedIn</a></li>
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
