<?php
global $IC;
global $action;
global $itemtype;


$year = $action[1];
$month = $action[2];

// get items from  year/month
$items = $IC->getItems(array("itemtype" => "event", "status" => 1, "where" => "event.starting_at < '".date("Y-m-d", mktime(0,0,0, $month+1, 1, $year))."' AND event.starting_at > '".date("Y-m-d", mktime(0,0,0, $month, 1, $year))."'", "order" => "event.starting_at ASC", "extend" => array("tags" => true, "mediae" => true, "user" => true)));

$this->headerIncludes(["/css/print.css", "/js/lib/desktop/i-print.js"]);
// debug($items);

$total = 0;
?>

<div class="scene events i:print">


	<div class="all_events">

	<? if($items): ?>

		<ul class="items events i0">
		<? foreach($items as $i => $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item event item_id:<?= $item["item_id"] ?>">

				<dl class="occurs_at">
					<dt class="starting_at">Starts</dt>
					<dd class="starting_at"><?= date("l \\t\\h\\e jS  - H:i", strtotime($item["starting_at"])) ?></dd>
				</dl>

				<h3><?= strip_tags($item["name"]) ?></h3>

				<? if($item["description"]): ?>
				<div class="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
			<? /*if($i && !($i % 8)): ?>
				</ul>
				<? if(!($i % 16)): ?>
				<hr />
				<? endif; ?>
				<ul class="items events <?= "i".($i%16) ?>">
			<? endif;*/ ?>


		<?	endforeach; ?>
		</ul>

	<? else: ?>

		<p>No scheduled events.</p>

	<? endif; ?>

	</div>
	
	<div class="events columns">
		<div class="header">
			<div class="logo">
				<h2>think.dk</h2>
			</div>
			<div class="tagline">
				<p>Learn something new.<br />Try something different.<br />Join us.</p>
			</div>
			<div class="month">
				<h2><?= date("F Y", mktime(0,0,0, $month, 1, $year)) ?></h2>
			</div>
		</div>
	</div>

</div>
