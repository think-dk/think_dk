<?
global $IC;
global $action;
global $itemtype;
global $model;

$ticket_no = $action[1];

$ticket_info = $model->getTicketInfo($ticket_no);
	
$this->headerIncludes(["/css/print-ticket.css"]);
?>
<div class="scene printticket">

	<div class="ticket">
	<? if($ticket_info): ?>
		<h4>AVOID PRINTING THIS TICKET</h4>
		<p>(just bring it on your phone)</p>

		<h1><?= strip_tags($ticket_info["item"]["name"]) ?></h1>
		<h2>Ticket</h2>
		<h3><?= $ticket_no ?></h3>

		<p><?= $ticket_info["user"]["nickname"] ?></p>
		<p><?= nl2br($ticket_info["item"]["ticket_information"]) ?></p>

	<? else: ?>
		<h1>Sorry – ticket could not be issued</h1>
	<? endif; ?>
	</div>

	<h1>think.dk</h1>
	<p>Tickets for good things</p>
</div>
