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

$this->headerIncludes(["https://checkout.stripe.com/checkout.js"]);

?>
<div class="scene shopPayment stripe <?= $order ? "i:stripe" : "i:scene" ?>">

<? if($order): ?>

	<dl>
		<dt class="amount">Amount</dt>
		<dd class="amount"><?= $total_order_price["price"] ?></dd>
		<dt class="currency">Currency</dt>
		<dd class="currency"><?= $order["currency"] ?></dd>
		<dt class="reference">Reference</dt>
		<? if($is_membership): ?>
		<dd class="reference">Member <?= $membership["id"] ?></dd>
		<? else: ?>
		<dd class="reference"><?= $order_no ?></dd>
		<? endif; ?>
		<dt class="email">Email</dt>
		<dd class="email"><?= $user["email"] ?></dd>

	</dl>

	<h2>We're loading the payment window</h2>
	<p>Please wait ...</p>
	<p class="note">
		We are using <a href="https://stripe" target="_blank">Stripe</a> to process the payment. <br />No card information is sent to or stored on our own server.
	</p>


	<?= $UC->formStart("/shop/gateway/".$order_no."/stripe/token", array("class" => "token labelstyle:inject")) ?>
		<?= $UC->input("token", array("type" => "hidden", "id" => "token")); ?>
	<?= $UC->formEnd() ?>


<? else: ?>

	<h2>Looking to make a payment?</h2>
	<p>You should <a href="/login">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>