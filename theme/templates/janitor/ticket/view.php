<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true, "prices" => true, "comments" => true)));

$messages = $IC->getItems(array("itemtype" => "message", "tags" => "message:Ticket", "extend" => true));

$participants = $model->getParticipants($item_id);
?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>View ticket</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item, [
		"modify" => [
			"delete" => false
		]
	]) ?>


	<div class="participants i:defaultParticipants i:collapseHeader item_id:<?= $item["id"] ?>">
		<h2>Participants (<?= $participants && $participants["paid"] ? count($participants["paid"]) : "0" ?>)</h2>

		<div class="all_items paid">
			<h3>Paid tickets</h3>
		<? if($participants && isset($participants["paid"])): ?>
			<ul class="participants paid items">
				<? foreach($participants["paid"] as $participant): ?>
					<li class="item participant">
						<span class="ticket_no"><?= $participant["ticket_no"] ?></span>
						<span class="name"><?= $participant["nickname"] ?></span>
						<span class="username"><?= $participant["username"] ?></span>
					</li>
				<? endforeach; ?>
			</ul>
		<? else: ?>
			<p>No tickets have been ordered and paid.</p>
		<? endif; ?>
		</div>

		<div class="all_items unpaid">
			<h3>Unpaid tickets</h3>
		<? if($participants && isset($participants["unpaid"])): ?>
			<ul class="participants unpaid items">
				<? foreach($participants["unpaid"] as $participant): ?>
					<li class="item participant">
						<span class="ticket_no"><?= $participant["ticket_no"] ?></span>
						<span class="name"><?= $participant["nickname"] ?></span>
						<span class="username"><?= $participant["username"] ?></span>
					</li>
				<? endforeach; ?>
			</ul>
		<? else: ?>
			<p>No tickets have been ordered, but not paid.</p>
		<? endif; ?>
		</div>

	</div>

</div>
