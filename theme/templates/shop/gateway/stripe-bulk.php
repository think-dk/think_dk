<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");

$order_ids = false;
$total_payment = 0;


// order IDs indicated in url
if(isset($action[1])) {

	$order_ids = $action[1];
	if($order_ids) {
		$order_ids = explode(",", $order_ids);


		// Loop through all orders to get total payment amount
		foreach($order_ids as $order_id) {

			$order = $model->getOrders(array("order_id" => $order_id));
			if($order) {

				$total_order_price = $model->getTotalOrderPrice($order["id"]);

				$payments = $model->getPayments(["order_id" => $order["id"]]);
				$total_order_payments = 0;
				if($payments) {
					foreach($payments as $payment) {
						$total_order_payments += $payment["payment_amount"];
					}
				}

				$order_list[] = $order["order_no"];

				$total_payment += ($total_order_price["price"]-$total_order_payments);

			}

		}

	}

}

//
//
// $order = $model->getOrders(array("order_no" => $order_no));
// $membership = $UC->getMembership();
//
//
//
// $is_membership = false;
// $subscription_method = false;
//
//
// if($order) {
// 	$total_order_price = $model->getTotalOrderPrice($order["id"]);
// 	if($total_order_price) {
// 		$amount = formatPrice($total_order_price);
// 	}
//
//
// 	if($membership && $membership["order"]) {
// 		$is_membership = ($membership["order"] && $order["id"] == $membership["order"]["id"]) ? true : false;
// 	}
//
//
// 	if($membership && $membership["item"] && $membership["item"]["subscription_method"] && $membership["item"]["subscription_method"]["duration"]) {
// 		$subscription_method = $membership["item"]["subscription_method"];
// 		$payment_date = $membership["renewed_at"] ? date("jS", strtotime($membership["renewed_at"])) : date("jS", strtotime($membership["created_at"]));
// 	}
//
// }
//
// if($is_membership) {
// 	$reference = "Member ".$membership["id"];
// }
// else {
// 	$reference = $order_no;
// }

//$this->headerIncludes(["https://checkout.stripe.com/checkout.js"]);

?>
<div class="scene shopPayment stripe <?= $order ? "i:stripe" : "i:scene" ?>">

<? if($order_ids && $total_payment): ?>


	<h1>Please enter you card details</h1>

	<?= $model->formStart("/shop/bulk-payment-gateway/".implode(",", $order_ids)."/stripe/process", array("class" => "card")) ?>
		<?//= $model->input("reference", array("type" => "hidden", "value" => implode(",", $order_ids))); ?>
		<?//= $model->input("email", array("type" => "hidden", "value" => $user["email"])); ?>
	
		<fieldset>
			<?= $model->input("card_number", array("type" => "tel")); ?>
			<?= $model->input("card_exp_month", array("type" => "tel")); ?><span class="slash">/</span><?= $model->input("card_exp_year", array("type" => "tel")); ?>
			<?= $model->input("card_cvc", array("type" => "tel")); ?>
			
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Pay ".formatPrice(["price" => $total_payment, "currency" => $total_order_price["currency"]]), array("class" => "primary", "wrapper" => "li.pay")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<p>Payment reference: <?= implode(", ", $order_list) ?>.</p>
	<p class="note">
		We are using <a href="https://stripe.com" target="_blank">Stripe</a> to process the payment. <br />No card information will be stored on our own server. <br />All communication is encrypted.
	</p>

<? else: ?>

	<h1>Looking to make a payment?</h1>
	<p>You should <a href="/login">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>