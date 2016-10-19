<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");
$order_no = $action[1];
$amount = "";


$order = $model->getOrders(array("order_no" => $order_no));
$membership = $UC->getMembership();

if($order) {
	$total_order_price = $model->getTotalOrderPrice($order["id"]);
	if($total_order_price) {
		$amount = formatPrice($total_order_price);
	}

}

$payment_methods = $this->paymentMethods();

//print_r($user);
?>
<div class="scene shopPayment i:scene">
	<h1>Payment</h1>

<? if($order): ?>

	<dl class="amount">
		<dt class="amount">Due amount</dt>
		<dd class="amount"><?= $amount ?></dd>
	</dl>


	<h2>Please be so kind ...</h2>

	<p>
		Choose your preferred payment method:
	</p>

	<ul class="payment_methods">

		<? foreach($payment_methods as $payment_method): ?>
		<li class="payment_method">

			<ul class="actions">
			<? if($payment_method["classname"] == "disabled"): ?>

				<li><a class="button disabled"><?= $payment_method["name"] ?></a></li>

			<? else: ?>

				<?= $JML->oneButtonForm($payment_method["name"], "/shop/selectPaymentMethod", array(
					"inputs" => array("order_id" => $order["id"], "payment_method" => $payment_method["id"]),
					"confirm-value" => false,
					"static" => true,
					"class" => "primary",
					"name" => "continue",
					"wrapper" => "li.continue.".$payment_method["classname"],
				)) ?>

			<? endif; ?>
			</ul>
			<p><?= $payment_method["description"] ?></p>

		</li>
		<? endforeach; ?>

	</ul>

<? else: ?>

	<h2>Looking to make a payment?</h2>
	<p>You should log into your account and initiate your payment from there.</p>

<? endif;?>

</div>