<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");

$order_no = $action[1];
//$payment_methods = $this->paymentMethods();

$amount = "";

$order = $model->getOrders(array("order_no" => $order_no));
$membership = $UC->getMembership();

if($order) {
	$total_order_price = $model->getTotalOrderPrice($order["id"]);
	if($total_order_price) {
		$amount = formatPrice($total_order_price);
	}

}

//print_r($user);
?>
<div class="scene shopPayment i:scene">
	<h1>Payment</h1>

<? if($order): ?>
	<h2>Please be so kind ...</h2>

	<p>
		We are currently working on extending our payment options in order to make 
		it easier for you to pay your subscription.
	</p>
	<p>
		Until then, you have two options:
	</p>
	<h2>Banktransfer</h2>
	<dl>
		<dt class="amount">Amount:</dt>
		<dd class="amount"><?= $amount ?></dd>

		<dt class="recipient">Recipient:</dt>
		<dd class="recipient">think.dk</dd>

		<dt class="reference">Reference:</dt>
		<? if($membership["order"] && $order["id"] == $membership["order"]["id"]): ?>
		<dd class="reference">Member <?= $membership["id"] ?></dd>
		<? else: ?>
		<dd class="reference"><?= $order_no ?></dd>
		<? endif; ?>

		<dt class="bank">Bank:</dt>
		<dd class="bank">Fælleskassen</dd>

		<dt class="account">Account no:</dt>
		<dd class="account">8411 4145172</dd>

		<dt class="iban">IBAN:</dt>
		<dd class="iban">DK3184110004145172</dd>

		<dt class="swift">SWIFT/BIC:</dt>
		<dd class="swift">FAELDKK1</dd>
	</dl>

	<h2>Or Paypal</h2>

	<p><a href="https://paypal.me/thinkdk/<?= preg_replace("/ /", "", $amount) ?>">paypal.me/thinkdk/<?= preg_replace("/ /", "", $amount) ?></a>.</p>

<? /* ?>
	<p>Please select a payment method.</p>
	<ul class="payment_methods">

		<? foreach($payment_methods as $payment_method): ?>
		<li class="payment_method">
			<h3></h3>
			<ul class="actions">
				<?= $JML->oneButtonForm($payment_method["name"], "/shop/payment/".$order["id"], array(
					"inputs" => array("order_no" => $order_no),
					"confirm-value" => false,
					"static" => true,
					"class" => "primary",
					"name" => "continue",
					"wrapper" => "li.continue",
				)) ?>
			</ul>
		</li>
		<? endforeach; ?>

	</ul>
<? */ ?>

<? else: ?>

	<h2>Looking to make a payment?</h2>
	<p>You should log into your account and initiate your payment from there.</p>

<? endif;?>

</div>