<?php
global $action;
global $model;
$UC = new User();
$MC = new Member();

// get current user id
$user_id = session()->value("user_id");
$order_no = $action[1];
$remaining_order_price = false;

// Will only return orders from current user, so no need to check order ownership
$order = $model->getOrders(array("order_no" => $order_no));
$membership = $MC->getMembership();

if($order && $order["payment_status"] != 2) {

	$remaining_order_price = $model->getRemainingOrderPrice($order["id"]);

}


$payment_methods = $this->paymentMethods();

?>
<div class="scene shopPayment i:payment">
	<h1>Payment</h1>

<? if($order && $remaining_order_price["price"]): ?>

	<dl class="amount">
		<dt class="amount">Due amount</dt>
		<dd class="amount"><?= formatPrice($remaining_order_price) ?></dd>
	</dl>


	<h2>For the payment of:</h2>

	<ul class="orders">
		<li>
			<h3>Order no: <?= $order["order_no"] . ($order["comment"] ? (" – " . $order["comment"]) : "") ?></h3>
			<ul class="orderitems">
			<? foreach($order["items"] as $order_item): ?>
				<li><?= $order_item["quantity"] ?> x <?= $order_item["name"] ?></li>
			<? endforeach; ?>
			</ul>
		</li>
	</ul>


	<h2>Please choose a payment method:</h2>
	<ul class="payment_methods">

	<? foreach($payment_methods as $payment_method): ?>
		<? if($payment_method["classname"] != "disabled"): ?>

		<li class="payment_method<?= $payment_method["classname"] ? " ".$payment_method["classname"] : "" ?>">

			<ul class="actions">
				<?= $HTML->oneButtonForm("Pay with " . $payment_method["name"], "/shop/selectPaymentMethod", array(
					"inputs" => array("order_id" => $order["id"], "payment_method" => $payment_method["id"]),
					"confirm-value" => false,
					"static" => true,
					"class" => "primary",
					"name" => "continue",
					"wrapper" => "li.continue.".$payment_method["classname"],
				)) ?>
			</ul>
			<p><?= $payment_method["description"] ?></p>

		</li>
		<? endif; ?>
	<? endforeach; ?>

	</ul>

	<!--p class="note">* We pay the transaction fee – so feel free to choose a suited option with the smallest fee for us.</p-->

<? // No payments
elseif(session()->value("user_group_id") > 1): ?>

	<h2>Great news</h2>
	<p>You do not have any outstanding payments.</p>

<? 
// User not logged in
else:

	$model = new User();
	$username = stringOr(getPost("username"));
	?>

	<h2>Looking to make a payment?</h2>
	<p>Please log in to your account.</p>


	<?= $model->formStart("?login=true", array("class" => "labelstyle:inject")) ?>
		<?= $model->input("login_forward", ["type" => "hidden", "value" => $this->url]); ?>

		<? if(message()->hasMessages()): ?>
		<div class="messages">
		<?
		$all_messages = message()->getMessages();
		message()->resetMessages();
		foreach($all_messages as $type => $messages):
			foreach($messages as $message): ?>
			<p class="<?= $type ?>"><?= $message ?></p>
			<? endforeach;?>
		<? endforeach;?>
		</div>
		<? endif; ?>

		<fieldset>
			<?= $model->input("username", array("required" => true, "value" => $username)); ?>
			<?= $model->input("password", array("required" => true)); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Log in", array("class" => "primary", "wrapper" => "li.login")) ?>
		</ul>
	<?= $model->formEnd() ?>
	

<? endif;?>

</div>