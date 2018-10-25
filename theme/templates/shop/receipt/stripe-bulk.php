<?php
global $action;
global $model;
$UC = new User();


$order = false;

$is_membership = false;
$subscription_method = false;
$payment_date = false;
$total_payment = 0;

$active_account = false;


// get current user id
$user_id = session()->value("user_id");
$user = $UC->getUser();
// has account been activated
if($user) {
	$active_account = $user["status"];
}

// order no indicated in url
if(count($action) == 4) {

	$payment_ids = $action[3];
	if($payment_ids) {
		$payment_ids = explode(",", $payment_ids);


		// Loop through all orders to get total payment amount
		foreach($payment_ids as $payment_id) {

			$payment = $model->getPayments(["payment_id" => $payment_id]);
			$total_payment += $payment["payment_amount"];

		}

	}

}

?>
<div class="scene shopReceipt i:scene">

<? if($payment_ids && $total_payment): ?>

	<h1>Thank you for supporting change</h1>

	<h2>Your payment of <?= formatPrice(["price" => $total_payment, "currency" => $payment["currency"]]) ?> has been processed successfully.</h2>

<? else: ?>

	<h1>No payment was made</h1>
	<p>Perhaps your dues was already paid.</p>

<? endif; ?>

</div>