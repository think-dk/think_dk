<?php
global $action;
global $model;

$this->pageTitle("Stripe");

$IC = new Items();

// get current user id
$user_id = session()->value("user_id");
$cart_reference = $action[3];
$total_cart_price = false;


$cart = $model->getCarts(["cart_reference" => $cart_reference]);
if($cart) {

	$total_cart_price = $model->getTotalCartPrice($cart["id"]);

	$has_error = false;
	if(message()->hasMessages(["type" => "error"])) {
		$has_error = true;
	}

}

?>
<div class="scene shopPayment stripe i:stripe">

<? if($user_id > 1 && $cart && $total_cart_price && $total_cart_price["price"] > 0): ?>


	<h1>Please enter you card details</h1>


	<?= $HTML->serverMessages() ?>


	<?= $model->formStart("/shop/payment-gateway/stripe/cart/".$cart["cart_reference"]."/process", array("class" => "card")) ?>
	
		<fieldset>
			<?= $model->input("card_number", array("type" => "tel")); ?>
			<?= $model->input("card_exp_month", array("type" => "tel")); ?><span class="slash">/</span><?= $model->input("card_exp_year", array("type" => "tel")); ?>
			<?= $model->input("card_cvc", array("type" => "tel")); ?>
			
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Pay ".formatPrice($total_cart_price), array("class" => "primary", "wrapper" => "li.pay")) ?>
		</ul>
	<?= $model->formEnd() ?>


	<div class="cartitems">
		<h3>Order summary</h3>
		<ul class="cartitems">
		<? foreach($cart["items"] as $cart_item):
		$item = $IC->getItem(["id" => $cart_item["item_id"], "extend" => true]) ?>
			<li><?= $cart_item["quantity"] ?> x <?= $item["name"] ?></li>
		<? endforeach; ?>
		</ul>

		<ul class="actions">
			<?= $model->link("Modify your order", "/shop/cart", array("class" => "button", "wrapper" => "li.modify")) ?>
		</ul>

	</div>

	<? if($has_error): ?>
	<div class="confirm">
		<h2>Or, confirm your order and pay later</h2>
		<p>You can also choose to complete your order and pay later.</p>
		<ul class="actions">
			<?= $HTML->oneButtonForm("Confirm order", "/shop/confirmOrder/".$cart["cart_reference"], array(
				"confirm-value" => false,
				"wait-value" => "Confirming",
				"dom-submit" => true,
//				"static" => true,
				"class" => "primary",
				"name" => "continue",
				"wrapper" => "li.continue",
			)) ?>
		</ul>
	</div>
	<? endif; ?>

	<p class="note">
		We are using <a href="https://stripe.com" target="_blank">Stripe</a> to process the payment. <br />No card information will be stored on our servers. <br />All communication is encrypted.
	</p>

<? elseif($user_id > 1 && !$cart): ?>

	<h1>Cart could not be found</h1>
	<p>Check out <a href="/shop/cart">your cart</a> to continue any interrupted checkout process.</p>

<? else: ?>

	<h1>Looking to make a payment?</h1>
	<p>You should <a href="/login?login_forward=/shop/payments">log in</a> to your account and initiate your payment from there.</p>

<? endif;?>

</div>