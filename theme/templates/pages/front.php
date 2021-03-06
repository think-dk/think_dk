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

$post_items = $IC->getItems(array("itemtype" => "post", "tags" => "on:frontpage", "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
$event_items = $IC->getItems(array("itemtype" => "event", "where" => "event.starting_at > NOW() AND event.event_status != 0" , "order" => "event.starting_at", "limit" => 4, "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));


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


	<div class="all_events">

		<h2>Upcoming events <a href="/events">(see all)</a></h2>

<? if($event_items): ?>
		<ul class="items events">
		<? foreach($event_items as $item): ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("l, F j, Y - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><a href="/events/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>

			</li>
	<?	endforeach; ?>
		</ul>

<? endif; ?>
	</div>



<? if($post_items): ?>
	<div class="news">
		<h2>Latest bulletins <a href="/bulletin">(see all)</a></h2>
		<ul class="items articles i:articlePreviewList articlePreviewList">
		<? foreach($post_items as $item): 
			$media = $IC->sliceMediae($item, "mediae"); ?>
			<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

				<? if($media): ?>
				<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
				<? endif; ?>


				<?= $HTML->articleTags($item, [
					"context" => ["post"],
					"url" => "/bulletin/tag",
					"default" => ["/bulletin", "Posts"]
				]) ?>


				<h3 itemprop="headline"><?= strip_tags($item["name"]) ?></h3>


				<?= $HTML->articleInfo($item, "/posts/".$item["sindex"], [
					"media" => $media
				]) ?>


				<? if($item["html"]): ?>
				<div class="articlebody" itemprop="articleBody">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
		<? endforeach; ?>
		</ul>

	</div>
<?	endif; ?>

</div>