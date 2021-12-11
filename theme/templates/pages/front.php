<?
$IC = new Items();

$intros = $IC->getItems(array("itemtype" => "page", "tags" => "page:intro", "status" => 1, "extend" => true));
if($intros) {
	$intro = $intros[rand(0, count($intros)-1)];
}

$page_item = $IC->getItem(array("tags" => "page:front", "status" => 1, "extend" => array("user" => true, "tags" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$post_items = $IC->getItems(array("itemtype" => "post", "tags" => "on:frontpage", "limit" => 2, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
$event_items = $IC->getItems(array("itemtype" => "event", "where" => "event.starting_at > NOW() AND event.event_status != 0" , "order" => "event.starting_at", "limit" => 2, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));


?>
<div class="scene front i:front">

<? if(isset($intro) && $intro["html"]): ?>
	<div class="intro" itemscope itemtype="http://schema.org/CreativeWork">

		<? if($intro["html"]): ?>
		<div class="text" itemprop="text">
			<?= $intro["html"] ?>
		</div>
		<? endif; ?>

	</div>
<? endif; ?>


<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? endif; ?>

	<div class="projects">
		<h2>Projects</h2>
		<p>Engaged projects for the cause – not the profit. Because doing nothing is not an option.</p> 
		<p>Get on board.</p>

		<ul class="actions">
			<li><a href="/projects">Read more</a></li>
			<li><a href="/projects/join">Join a project</a></li>
		</ul>
	</div>

	<div class="services">
		<h2>Services</h2>
		<p>
			We offer a range of services, workshops and lectures, aiming to provide holistic alternatives and eyeopening input.
		</p>

		<ul class="actions">
			<li><a href="/services">Read more</a></li>
			<li><a href="/services">Offer a service</a></li>
		</ul>
	</div>

	<div class="events">
		<h2>Events</h2>
		<p>We arrange and host events that bring people together for a more caring, smarter and better world.</p>
		<p>You can do yours too.</p>

		<ul class="actions">
			<li><a href="/events">Calendar</a></li>
			<li><a href="/events/new-event">Host your event</a></li>
		</ul>
	</div>

	<div class="membership">
		<h2>Membership</h2>
		<p>
			We are a membership based community. The membership fees support the establishment and continuation of our
			projects.
		</p>
		
		<ul class="actions">
			<li><a href="/memberships">Join us</a></li>
			<li><a href="/memberships">Support us</a></li>
		</ul>
	</div>

	<div class="bulletin">
		<h2>Bulletin</h2>
		<p>Bulletins, latest news, organisational guidelines and all the stuff in-between.</p>

		<ul class="actions">
			<li><a href="/bulletin">Read more</a></li>
		</ul>
	</div>

	<div class="about">
		<h2>About</h2>
		<p>
			Our vision, mission, strategy and values. What we do and why we do it.
		</p>

		<ul class="actions">
			<li><a href="/about">Read more</a></li>
		</ul>
	</div>

	<div class="blog">
		<h2>Blog</h2>
		<p>
			Personal reflections on society, politics and life in general.
		</p>

		<ul class="actions">
			<li><a href="/blog">Read more</a></li>
			<li><a href="/blog/contribute">Contribute</a></li>
		</ul>
	</div>

	<div class="contact">
		<h2>Contact</h2>
		<p>
			We are at the other end of
			<a href="mailto:start@think.dk">start@think.dk</a> – feel free to reach out.
		</p>

		<ul class="actions">
			<li><a href="/contact">Read more</a></li>
		</ul>
	</div>

</div>