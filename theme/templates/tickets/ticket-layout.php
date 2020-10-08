<?
global $IC;
global $action;
global $itemtype;
global $model;

$ticket_no = $action[1];
$batch = getVar("batch");

$ticket_info = $model->getTicketInfo($ticket_no);
	
?>
<div class="scene printticket">

	<div class="ticketheader">
		<h4>AVOID PRINTING THIS TICKET</h4>
		<p>(save paper and bring it on your phone)</p>
	</div>

	<div class="ticket">
	<? if($ticket_info): ?>

		<h2>Ticket</h2>
		<h1><?= strip_tags($ticket_info["item"]["name"]) ?></h1>
		<? if($ticket_info["price"]): ?>
			<p class="price"><?= $ticket_info["price"] ?></p>
		<? endif; ?>
		<h3><?= $ticket_no ?></h3>

		<p class="name"><?= $ticket_info["user"]["nickname"] ?></p>

		<? if($batch): ?>
		<p class="batch"><?= $batch ?></p>
		<? endif; ?>

		<? if($ticket_info["item"]["ticket_information"]): ?>
		<?= $ticket_info["item"]["ticket_information"] ?>
		<? endif ?>

		<p class="note">This ticket is only valid when full payment is registered.</p>

	<? else: ?>

		<h1>Sorry</h1>
		<h2>Your ticket could not be issued</h2>
		<p>Please contact <a href="mailto:tickets@think.dk">tickets@think.dk</a> to issue this ticket.</p>

	<? endif; ?>
	</div>

	<div class="ticketfooter">
		<h1>think.dk</h1>
		<p>Tickets for good things</p>
	</div>

</div>
