<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");
$order_no = $action[1];
$amount = "";
$user = $UC->getUser();

$order = $model->getOrders(array("order_no" => $order_no));
$membership = $UC->getMembership();



$is_membership = false;
$subscription_method = false;


if($order) {
	$total_order_price = $model->getTotalOrderPrice($order["id"]);
	if($total_order_price) {
		$amount = formatPrice($total_order_price);
	}


	if($membership && $membership["order"]) {
		$is_membership = ($membership["order"] && $order["id"] == $membership["order"]["id"]) ? true : false;
	}


	if($membership && $membership["item"] && $membership["item"]["subscription_method"] && $membership["item"]["subscription_method"]["duration"]) {
		$subscription_method = $membership["item"]["subscription_method"];
		$payment_date = $membership["renewed_at"] ? date("jS", strtotime($membership["renewed_at"])) : date("jS", strtotime($membership["created_at"]));
	}

}



?>
<div class="scene shopReceipt i:scene">
	<h1>Receipt</h1>
	<h2>Thank you for supporting change.</h2>
	<p>We are so thrilled to have you on board - go ahead and check out our <a href="/events">upcoming events</a>!</p>

<? if($order): ?>

	<h2>Please be so kind ...</h2>
	<p>Just bring <?= $amount ?> in cash next time you come to the Center.</p>

<? else: ?>

	<h2>Looking to make a payment?</h2>
	<p>You should <a href="/login">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>