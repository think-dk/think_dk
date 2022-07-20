<?php
global $IC;
global $action;
global $itemtype;

$sindex = $action[0];

$next = false;
$prev = false;

$item = $IC->getItem(array("sindex" => $sindex, "status" => 1, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);


	$next = $IC->getNext($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));
	$prev = $IC->getPrev($item["item_id"], array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));

	$event_items = false;

	$service_tag = arrayKeyValue($item["tags"], "context", "service");
	if($service_tag) {
		$event_items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at > NOW()", "order" => "event.starting_at ASC", "tags" => "service:".addslashes($item["tags"][$service_tag]["value"]), "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
	}

	// set related pattern
	$related_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "exclude" => $item["id"]);
	$related_title = "Related services";

}
else {
	// itemtype pattern for missing item
	$related_pattern = array("itemtype" => $itemtype);
	$related_title = "Other services";

}

// add base pattern properties
$related_pattern["limit"] = 5;
$related_pattern["extend"] = array("tags" => true, "readstate" => true, "user" => true, "mediae" => true);

// get related items
$related_items = $IC->getRelatedItems($related_pattern);

?>

<div class="scene service i:scene">


<? if($item):
	$media = $IC->sliceMediae($item, "single_media"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> service" itemscope itemtype="http://schema.org/Article"
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= $item["readstate"] ?>"
		data-readstate-add="<?= security()->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= security()->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($item, [
			"context" => ["servicecategory"],
			"default" => ["/services", "Services"]
		]) ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= $HTML->articleInfo($item, "/services/".$item["sindex"], [
			"media" => $media,
			"sharing" => true
		]) ?>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>


		<?= $HTML->frontendComments($item, "/janitor/service/addComment") ?>

	</div>


	<? if($next || $prev): ?>
	<div class="pagination i:pagination">
		<ul>
		<? if($prev): ?>
			<li class="previous">
				<!-- <h2>Previous</h2> -->
				<a href="/services/<?= $prev[0]["sindex"] ?>"><?= strip_tags($prev[0]["name"]) ?></a>
			</li>
		<? endif; ?>
		<? if($next): ?>
			<li class="next">
				<!-- <h2>Next</h2> -->
				<a href="/services/<?= $next[0]["sindex"] ?>"><?= strip_tags($next[0]["name"]) ?></a>
			</li>
		<? endif; ?>
		</ul>
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

				<? if($item["description"]): ?>
				<div class="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
		<?	endforeach; ?>
		</ul>

	<? else: ?>

		<p>No scheduled events.</p>

	<? endif; ?>
	</div>


<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified service.</p>


<? endif; ?>



<? if($related_items): ?>
	<div class="related">
		<h2><?= $related_title ?> <a href="/services">(see all)</a></h2>

		<ul class="items services">
<?		foreach($related_items as $item): 
			$media = $IC->sliceMediae($item, "single_media"); ?>
			<li class="item service item_id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

				<h3 itemprop="headline"><a href="/services/<?= $item["sindex"] ?>"><?= strip_tags($item["name"]) ?></a></h3>


				<?= $HTML->articleInfo($item, "/services/".$item["sindex"], [
					"media" => $media
				]) ?>


				<? if($item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
	<?	endforeach; ?>
		</ul>
	</div>
<? endif; ?>


</div>
