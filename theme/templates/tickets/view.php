<?php
global $IC;
global $action;
global $itemtype;
global $model;

$sindex = $action[0];

$item = $IC->getItem(array("sindex" => $sindex, "status" => 1, "extend" => array("tags" => true, "user" => true, "mediae" => true, "comments" => true, "readstate" => true)));

$SC = new Shop();

?>

<div class="scene ticket i:scene">


<? if($item):
	$media = $IC->sliceMediae($item, "single_media");
	$remaining_tickets = $item["total_tickets"] - ($model->getSoldTickets($item["item_id"]) + $model->getReservedTickets($item["item_id"]));

	?>

	<div class="article i:article id:<?= $item["item_id"] ?> ticket" itemscope itemtype="http://schema.org/Article"
		data-csrf-token="<?= session()->value("csrf") ?>"
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= $HTML->articleInfo($item, "/services/".$item["sindex"], [
			"media" => $media,
			"sharing" => true
		]) ?>

		<ul class="ticket_info">
			<li class="price"><?= formatPrice($SC->getPrice($item["id"])) ?></li>

			<? if(strtotime($item["sale_closes"]) < time()): ?>
			<li class="remaining_tickets">Closed</li>
			<? elseif(strtotime($item["sale_opens"]) > time()): ?>
			<li class="remaining_tickets">Sale opens on <?= $item["sale_opens"] ?></li>
			<? else:?>
			<li class="remaining_tickets"><?= $remaining_tickets ?> tickets left</li>
			<li class="buy">
				<?= $model->formStart("/shop/addToCart", array("class" => "signup labelstyle:inject")) ?>
					<?= $model->input("quantity", array("value" => 1, "type" => "hidden")); ?>
					<?= $model->input("item_id", array("value" => $item["item_id"], "type" => "hidden")); ?>

					<ul class="actions">
						<?= $model->submit("Buy now", array("class" => "primary", "wrapper" => "li.buy")) ?>
					</ul>
				<?= $model->formEnd() ?>
			</li>
			<? endif; ?>
		</ul>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>


		<?= $HTML->frontendComments($item, "/janitor/service/addComment") ?>

	</div>

<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified service.</p>


<? endif; ?>

</div>
