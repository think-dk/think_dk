<?php
global $action;
global $model;
$UC = new User();


$order = false;

$is_membership = false;
$subscription_method = false;
$payment_date = false;

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

	$order_id = $action[1];
	$payment_id = $action[3];

	if($order_id) {
		$order = $model->getOrders(array("order_id" => $order_id));


		// get potential user membership
		$membership = $UC->getMembership();


		if($order) {

			$payment_id = $action[3];
			$payment = $model->getPayments(["payment_id" => $payment_id]);

		}

	}

}


?>
<div class="scene shopReceipt i:scene">

<? if($order): ?>

	<h1>Thank you for supporting change.</h1>

	<h2>Your payment of <?= formatPrice(["price" => $payment["payment_amount"], "currency" => $payment["currency"]]) ?> has been processed successfully.</h2>

<? endif; ?>

</div>