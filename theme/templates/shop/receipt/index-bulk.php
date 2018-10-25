<?php
global $action;
global $model;
$UC = new User();

// get current user id
$user_id = session()->value("user_id");

$order_ids = false;
$receipt_type = false;

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

				$remaining_order_price = $model->getRemainingOrderPrice($order["id"]);
				
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

// receipt type indicated in url
if(isset($action[2])) {
	$receipt_type = $action[2];
}



?>
<div class="scene shopReceipt i:scene">

<? if($order_ids && $total_payment): ?>

	<h1>Thank you for supporting change.</h1>


<?	if($receipt_type == "banktransfer"): ?>

	<h2>Pay with Bank transfer</h2>

	<p>Make a payment to our bankaccount, using the information below:</p>

	<dl>
		<dt class="amount">Amount</dt>
		<dd class="amount"><?= formatPrice(["price" => $total_payment, "currency" => $total_order_price["currency"]]) ?></dd>

		<dt class="recipient">Recipient</dt>
		<dd class="recipient">think.dk</dd>

		<dt class="reference">Reference</dt>
		<dd class="reference"><?= implode(", ", $order_list) ?></dd>

		<dt class="bank">Bank</dt>
		<dd class="bank">Fælleskassen</dd>

		<dt class="account">Account no</dt>
		<dd class="account">8411 4145172</dd>

		<dt class="iban">IBAN</dt>
		<dd class="iban">DK3184110004145172</dd>

		<dt class="swift">SWIFT/BIC</dt>
		<dd class="swift">FAELDKK1</dd>
	</dl>


<?	elseif($receipt_type == "paypal"): ?>


	<h2>Pay with PayPal</h2>
	<p>
		Make a payment to our PayPal account, using the information below:
	</p>

	<dl>
		<dt class="amount">Amount</dt>
		<dd class="amount"><?= formatPrice(["price" => $total_payment, "currency" => $total_order_price["currency"]]) ?></dd>

		<dt class="recipient">PayPal account</dt>
		<dd class="recipient">payment@think.dk</dd>

		<dt class="reference">Reference</dt>
		<dd class="reference"><?= implode(", ", $order_list) ?></dd>
	</dl>


<?	elseif($receipt_type == "cash"): ?>


	<h2>Cash payment</h2>
	<p>Just bring <?= formatPrice(["price" => $total_payment, "currency" => $total_order_price["currency"]]) ?> in cash next time you come to the Center.</p>


<?	endif; ?>


<? else: ?>


	<h2>Thank you for supporting change.</h2>
	<p>It seems you have already paid your dues.</p>


<? endif; ?>

</div>