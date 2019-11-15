<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");
//$order_no = $action[1];
$amount = "";

// Will only return orders from current user, so no need to check order ownership
$orders = $model->getUnpaidOrders();


// Calculate total outstanding payment
$total_payment = 0;
$order_list = [];
$order_comment_list = [];

if($orders) {

	// Loop through all orders to get total payment amount
	foreach($orders as $order) {

		$remaining_order_price = $model->getRemainingOrderPrice($order["id"]);

		// $order_comment_list[] = $order["order_no"] . " - " . $order["comment"];
		$order_list[] = $order["id"];

		$total_payment += $remaining_order_price["price"];

	}
}

$payment_methods = $this->paymentMethods();

?>
<div class="scene shopPayment shopPayments i:payments">
	<h1>Payments</h1>

<? 
// Outstanding payments
if($orders && $total_payment): ?>

	<dl class="amount">
		<dt class="amount">Due amount</dt>
		<dd class="amount"><?= formatPrice(["price" => $total_payment, "currency" => $remaining_order_price["currency"]]) ?></dd>
	</dl>


	<h2>For the payment of:</h2>
	<ul class="orders">
	<? foreach($orders as $order): 
		$full_order = $model->getOrders(["order_id" => $order["id"]]); ?>
		<li>
			<h3><?= $full_order["order_no"] . ($full_order["comment"] ? (" – " . $full_order["comment"]) : "") ?></h3>
			<ul class="orderitems">
			<? foreach($full_order["items"] as $order_item): ?>
				<li><?= $order_item["quantity"] ?> x <?= $order_item["name"] ?></li>
			<? endforeach; ?>
			</ul>
		</li>
	<? endforeach; ?>
	</ul>


	<h2>Please choose a payment method:</h2>

	<ul class="payment_methods">

	<? foreach($payment_methods as $payment_method): ?>
		<? if($payment_method["classname"] != "disabled"): ?>

		<li class="payment_method<?= $payment_method["classname"] ? " ".$payment_method["classname"] : "" ?>">

			<ul class="actions">
				<?= $JML->oneButtonForm($payment_method["name"], "/shop/selectBulkPaymentMethod", array(
					"inputs" => array("order_ids" => implode($order_list, ","), "payment_method" => $payment_method["id"]),
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

<? 
// No payments
elseif(session()->value("user_group_id") > 1): ?>

	<h2>Great news</h2>
	<p>You do not have any outstanding payments.</p>

<? 
// User not logged in
else:

	$model = new User();
	$username = stringOr(getPost("username"));
	?>

	<h2>Looking to make payments?</h2>
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