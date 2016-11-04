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
$payment_date = false;


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

		$membership_price = $model->getPrice($membership["item_id"]);
		if($membership_price["price"] == $total_order_price["price"]) {
			$subscription = $UC->getSubscriptions(array("subscription_id" => $membership["subscription_id"]));
			$payment_date = $subscription["renewed_at"] ? date("jS", strtotime($subscription["renewed_at"])) : date("jS", strtotime($subscription["created_at"]));
		}
	}

}



?>
<div class="scene shopReceipt i:scene">
	<h1>Receipt</h1>
	<h2>Thank you for supporting change.</h2>
	<p>We are so thrilled to have you on board - go ahead and check out our <a href="/events">upcoming events</a>!</p>

<? if($order): ?>
	<h2>Please be so kind ...</h2>

	<p>
	<? if($subscription_method && $payment_date): ?>
		Set up a re-occuring payment every <?= strtolower($subscription_method["name"]) ?> on the <?= $payment_date ?> to our bankaccount, using the information below:
	<? else: ?>
		Make a payment to our bankaccount, using the information below:
	<? endif; ?>
	</p>

	<dl>
		<dt class="amount">Amount</dt>
		<dd class="amount"><?= $amount ?></dd>

		<dt class="recipient">Recipient</dt>
		<dd class="recipient">think.dk</dd>

		<dt class="reference">Reference</dt>
		<? if($is_membership): ?>
		<dd class="reference">Member <?= $membership["id"] ?></dd>
		<? else: ?>
		<dd class="reference"><?= $order_no ?></dd>
		<? endif; ?>

		<dt class="bank">Bank</dt>
		<dd class="bank">Fælleskassen</dd>

		<dt class="account">Account no</dt>
		<dd class="account">8411 4145172</dd>

		<dt class="iban">IBAN</dt>
		<dd class="iban">DK3184110004145172</dd>

		<dt class="swift">SWIFT/BIC</dt>
		<dd class="swift">FAELDKK1</dd>
	</dl>

<? else: ?>

	<h2>Looking to make a payment?</h2>
	<p>You should <a href="/login">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>