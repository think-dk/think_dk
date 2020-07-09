<?php
global $action;
global $model;
$UC = new User();

$this->pageTitle("Stripe");

// get current user id
$user_id = session()->value("user_id");

$order_ids = false;
$total_payment = 0;


// order IDs indicated in url
if(isset($action[3])) {

	$order_ids = $action[3];
	if($order_ids) {
		$order_ids = explode(",", $order_ids);


		// Loop through all orders to get total payment amount
		foreach($order_ids as $order_id) {

			$order = $model->getOrders(array("order_id" => $order_id));
			if($order) {

				$remaining_order_price = $model->getRemainingOrderPrice($order["id"]);

				$order_list[] = $order["order_no"];

				$total_payment += $remaining_order_price["price"];

			}

		}

	}

}


?>
<div class="scene shopPayment stripe <?= $order ? "i:stripe" : "i:scene" ?>">

<? if($user_id > 1 && $order_ids && $total_payment): ?>


	<h1>Please enter your card details</h1>


	<?= $HTML->serverMessages() ?>


	<?= $model->formStart("/shop/payment-gateway/stripe/orders/".implode(",", $order_ids)."/process", array("class" => "card")) ?>
	
		<fieldset>
			<?= $model->input("card_number", array("type" => "tel")); ?>
			<?= $model->input("card_exp_month", array("type" => "tel")); ?><span class="slash">/</span><?= $model->input("card_exp_year", array("type" => "tel")); ?>
			<?= $model->input("card_cvc", array("type" => "tel")); ?>
			
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Pay ".formatPrice(["price" => $total_payment, "currency" => $remaining_order_price["currency"]]), array("class" => "primary", "wrapper" => "li.pay")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<div class="orderitems">
		<h3>For orders</h3>
		<p><?= implode(", ", $order_list) ?></p>
	</div>

	<p class="note">
		We are using <a href="https://stripe.com" target="_blank">Stripe</a> to process the payment. <br />No card information will be stored on our own server. <br />All communication is encrypted.
	</p>

<? elseif($user_id > 1 && !$total_payment): ?>

	<h1>Orders could not be found</h1>
	<p>Check if you have any other <a href="/shop/payments">outstanding payments</a>.</p>

<? else: ?>

	<h1>Looking to make a payment?</h1>
	<p>You should <a href="/login?login_forward=/shop/payments">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>