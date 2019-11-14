<?php
global $action;
global $IC;
global $itemtype;
global $model;

$page_item = $IC->getItem(array("tags" => "page:tickets", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$ticket_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "where" => $itemtype.".sale_closes > NOW()", "order" => "$itemtype.sale_opens ASC", "extend" => array("tags" => true, "mediae" => true, "prices" => true, "user" => true)));

$SC = new Shop();
?>

<div class="scene tickets i:scene">

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


		<?= $HTML->articleInfo($page_item, "/services", [
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

	<h1>Tickets</h1>

<? endif; ?>

	<div class="tickets">

		<? if($ticket_items): ?>

		<ul class="items tickets i:articleMiniList">
			<? foreach($ticket_items as $item):
				$media = $IC->sliceMediae($item, "single_media");
				$remaining_tickets = $item["total_tickets"] - ($model->getSoldTickets($item["item_id"]) + $model->getReservedTickets($item["item_id"]));
			?>
			<li class="item ticket id:<?= $item["item_id"] ?><?= $item["classname"] ? " ".$item["classname"] : "" ?>" itemscope itemtype="http://schema.org/Article">

				<h3 itemprop="headline"><a href="/tickets/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


				<?= $HTML->articleInfo($item, "/tickets/".$item["sindex"], [
					"media" => $media
				]) ?>

				<ul class="ticket_info">
					<li class="price"><?= formatPrice($SC->getPrice($item["id"])) ?></li>
					<? if(strtotime($item["sale_closes"]) < time()): ?>
					<li class="remaining_tickets">Closed</li>
					<? elseif(strtotime($item["sale_opens"]) > time()): ?>
					<li class="remaining_tickets">Sale opens on <?= $item["sale_opens"] ?></li>
					<? else:?>
					<li class="remaining_tickets"><?= $remaining_tickets ?> tickets left</li>
					<? endif; ?>
				</ul>


				<? if($item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>

		<? else: ?>

		<p>No tickets for sale at the moment.</p>

		<? endif; ?>
	</div>

</div>
