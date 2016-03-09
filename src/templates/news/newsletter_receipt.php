<?php
global $action;
global $model;

$IC = new Items();
$page = $IC->getItem(array("tags" => "page:newsletter-receipt", "extend" => array("user" => true, "mediae" => true)));

$email = session()->value("signup_email");
	
?>
<div class="scene newsletter i:scene">
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
			<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/curious" ?></li>
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
			<?= preg_replace("/{email}/", $email, $page["html"]) ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Newsletter</h1>
	<p>Thanks for signing up to our newsletter. You'll hear from us soon.</p>
<? endif; ?>

	<!--h1>Velkommen til de nysgerriges klub</h1>
	<p>
		Stopknappen har sendt en email på <em><?= $email ?></em> med et aktiveringslink.
		Den håber du er nysgerrig nok til at klikke på det - ellers får du ingen opdateringer.
	</p>
	<p>
		Der er også oprettet en bruger til dig. Koden finder du også 
		i den tilsendte email - men du kan først logge ind, når du har klikket på aktiveringslinket.
	</p>

	<p>På gensyn.</p-->
</div>
