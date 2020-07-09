<?php
global $action;
global $model;

$this->pageTitle("Stripe");

$MC = new Member();
$IC = new Items();

// get current user id
$user_id = session()->value("user_id");
$order_no = $action[3];
$remaining_order_price = false;
$is_membership = false;

$order = $model->getOrders(array("order_no" => $order_no));

if($order) {
	$remaining_order_price = $model->getRemainingOrderPrice($order["id"]);
	$membership = $MC->getMembership();

	if($membership && $membership["order"]) {
		$is_membership = ($membership["order"] && $order["id"] == $membership["order"]["id"]) ? true : false;
	}

}

?>
<div class="scene shopPayment stripe <?= $order ? "i:stripe" : "i:scene" ?>">

<? if($user_id > 1 && $order && $remaining_order_price && $remaining_order_price["price"] > 0): ?>

	<h1>Please enter your card details</h1>


	<?= $HTML->serverMessages() ?>


	<?= $model->formStart("/shop/payment-gateway/stripe/order/".$order_no."/process", array("class" => "card")) ?>
	
		<fieldset>
			<?= $model->input("card_number", array("type" => "tel")); ?>
			<?= $model->input("card_exp_month", array("type" => "tel")); ?><span class="slash">/</span><?= $model->input("card_exp_year", array("type" => "tel")); ?>
			<?= $model->input("card_cvc", array("type" => "tel")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Pay ".formatPrice($remaining_order_price), array("class" => "primary", "wrapper" => "li.pay")) ?>
		</ul>
	<?= $model->formEnd() ?>


	<div class="orderitems">
		<h3>Order summary</h3>
		<ul class="orderitems">
		<? foreach($order["items"] as $order_item):
		$item = $IC->getItem(["id" => $order_item["item_id"], "extend" => true]) ?>
			<li><?= $order_item["quantity"] ?> x <?= $item["name"] ?></li>
		<? endforeach; ?>
		</ul>
	</div>

	<p class="note">
		We are using <a href="https://stripe.com" target="_blank">Stripe</a> to process the payment. <br />No card information will be stored on our own server. <br />All communication is encrypted.
	</p>

<? elseif($user_id > 1 && !$order): ?>

	<h1>Order could not be found</h1>
	<p>Check if you have any other <a href="/shop/payments">outstanding payments</a>.</p>

<? else: ?>

	<h1>Looking to make a payment?</h1>
	<p>You should <a href="/login?login_forward=/shop/payments">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>