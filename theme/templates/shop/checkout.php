<?php
global $action;
global $model;
$IC = new Items();
$UC = new User();

$this->pageTitle("Checkout");


// get current user id
$user_id = session()->value("user_id");


// get current cart
$cart = $model->getCart();
// debug([$cart]);

$membership = false;
// attempt to find membership in cart
if($cart && $cart["items"]) {

	foreach($cart["items"] as $cart_item) {

		$item = $IC->getItem(array("id" => $cart_item["item_id"], "extend" => true));
		if($item["itemtype"] == "membership") {
			$membership = $item["name"];
			break;
		}

	}

}

// User is logged in
if($user_id != 1) {


	// update user on cart
	$_POST["user_id"] = $user_id;
	$model->updateCart(array("updateCart"));
	$cart = $model->getCart();


	$user = $UC->getUser();


	// Only get payment methods if cart has items
	if($cart["items"]) {

		// Get the total cart price
		$total_cart_price = $model->getTotalCartPrice($cart["id"]);

		if($total_cart_price && $total_cart_price["price"] > 0) {

			// Get payment methods
			$payment_methods = $this->paymentMethods();

			// Get payment methods
			$user_payment_methods = $UC->getPaymentMethods(["extend" => true]);

		}

	}


	// Get address info
	$delivery_address = $UC->getAddresses(array("address_id" => $cart["delivery_address_id"]));
	$billing_address = $UC->getAddresses(array("address_id" => $cart["billing_address_id"]));

}

// User not logged in yet
else {

	// enable re-population of fields
	$username = stringOr(getPost("username"));
	$firstname = stringOr(getPost("firstname"));
	$lastname = stringOr(getPost("lastname"));
	$email = stringOr(getPost("email"));
	$mobile = stringOr(getPost("mobile"));
	$terms = stringOr(getPost("terms"));
	$maillist = stringOr(getPost("maillist"));

}

// debug([$user_id, $cart, $membership]);

?>
<div class="scene checkout i:checkout">
	<h1>Checkout</h1>


	<?= $HTML->serverMessages() ?>


	<?
	// User is not logged in yet
	if($user_id == 1): ?>


	<div class="login">
		<h2>Login</h2>
		<p>If you already have an account, then log in now.</p>
		<?= $UC->formStart("/shop/checkout?login=true", array("class" => "login labelstyle:inject")) ?>
			<?= $UC->input("login_forward", ["type" => "hidden", "value" => "/shop/checkout"]); ?>
			<fieldset>
				<?= $UC->input("username", array("type" => "string", "label" => "Email or mobile number", "required" => true, "value" => $username, "pattern" => "[\w\.\-_]+@[\w\-\.]+\.\w{2,10}|([\+0-9\-\.\s\(\)]){5,18}", "hint_message" => "You can log in using either your email or mobile number.", "error_message" => "You entered an invalid email or mobile number.")); ?>
				<?= $UC->input("password", array("type" => "password", "label" => "Password", "required" => true, "hint_message" => "Type your password", "error_message" => "Your password should be between 8-20 characters.")); ?>
			</fieldset>

			<ul class="actions">
				<?= $UC->submit("Log in", array("class" => "primary", "wrapper" => "li.login")) ?>
				<li class="forgot">Did you <a href="/login/forgot" target="_blank">forget your password</a>?</li>
			</ul>
		<?= $UC->formEnd() ?>
	</div>

	<div class="signup">
		<h2>Or enter your details</h2>
		<p>This will create an account so you can continue checkout.</h2>
		<?= $UC->formStart("/shop/signup", array("class" => "signup labelstyle:inject")) ?>
			<? if($membership): ?>
				<?= $UC->input("maillist_name", array("type" => "hidden", "value" => "paying members")); ?>
			<? else: ?>
				<?= $UC->input("maillist_name", array("type" => "hidden", "value" => "curious")); ?>
			<? endif; ?>

			<fieldset>
				<?= $UC->input("firstname", array("value" => $firstname, "required" => true)); ?>
				<?= $UC->input("lastname", array("value" => $lastname, "required" => true)); ?>
				<?= $UC->input("email", array("value" => $email, "required" => true, "value" => $email, "hint_message" => "Type your email.", "error_message" => "You entered an invalid email.")); ?>
				<?= $UC->input("mobile", array("value" => $mobile)); ?>
				<?= $UC->input("password", array("hint_message" => "Type your new password - or leave it blank and we'll generate one for you.", "error_message" => "Your password must be between 8 and 20 characters.")); ?>
				<?= $UC->input("terms", array("value" => $terms)); ?>
				<?= $UC->input("maillist", array("type" => "checkbox", "value" => $maillist, "label" => "Yes, I want to receive the General newsletter.")); ?>
			</fieldset>

			<ul class="actions">
				<?= $UC->submit("Continue", array("class" => "primary", "wrapper" => "li.signup")) ?>
			</ul>
		<?= $model->formEnd() ?>

		<h3>Why do I need an account?</h3>
		<p>
			As a think.dk member, an account is a natural extension of your membership. The account
			will also give you access to certain features on this site, that is only available to
			our members.
		</p>
		<p>
			For all other purchases we are legally required to store a minimum of information 
			when we receive payments to prevent whitewashing. For your convenience
			we officially associate this information with an account – to enable full transparency
			about what data is stored on our side.
		</p>
		<p>
			You can cancel your account anytime you like,
			but we are required to keep basic information about your payments for a minimum of 5 years.
		</p>
	</div>


	<?
	// user is already logged in, show checkout overview
	else: ?>


	<div class="contact">
		<h2>Your details <a href="/shop/profile">(Edit)</a></h2>
		<dl class="list">
			<dt>Full name</dt>
			<dd><?= $user["firstname"] ?> <?= $user["lastname"] ?></dd>
			<dt>Email</dt>
			<dd><?= $user["email"] ?></dd>
			<dt>Mobile</dt>
			<dd><?= $user["mobile"] ?></dd>
		</dl>
	</div>

	<div class="all_items">
		<h2>Cart contents <a href="/shop/cart">(Edit)</a></h2>
		<? if($cart && $cart["items"]): ?>
		<ul class="items">
			<? foreach($cart["items"] as $cart_item):
				$item = $IC->getItem(array("id" => $cart_item["item_id"], "extend" => array("subscription_method" => true))); 
				$price = $model->getPrice($cart_item["item_id"], array("quantity" => $cart_item["quantity"], "currency" => $cart["currency"], "country" => $cart["country"]));
			?>
			<li class="item id:<?= $item["id"] ?>">
				<h3>
					<span class="quantity"><?= $cart_item["quantity"] ?></span>
					<span class="x">x </span>
					<span class="name"><?= $item["name"] ?> </span>
					<span class="a">á </span>
					<span class="unit_price"><?= formatPrice($price) ?></span>
					<span class="total_price">
						<?= formatPrice(array(
								"price" => $price["price"]*$cart_item["quantity"], 
								"vat" => $price["vat"]*$cart_item["quantity"], 
								"currency" => $cart["currency"], 
								"country" => $cart["country"]
							), 
							array("vat" => true)
						) ?>
					</span>
				</h3>
				<? if($item["subscription_method"] && $price["price"]): ?>
				<p class="subscription_method">
					Re-occuring payment every <?= strtolower($item["subscription_method"]["name"]) ?>.
				</p>
				<? endif; ?>

				<? if($item["itemtype"] == "membership"): ?>
				<p class="membership">
					<? if($price["price"]): ?>
					This purchase includes a membership.
					<? else: ?>
					Confirm order to sign up for our newsletter.
					<? endif; ?>
				</p>
				<? endif; ?>
			</li>
			<? endforeach; ?>

			<li class="total">
				<h3>
					<span class="name">Total</span>
					<span class="total_price">
						<?= formatPrice($total_cart_price, array("vat" => true)) ?>
					</span>
				</h3>
			</li>
		</ul>
		<? else: ?>
		<p>You don't have any items in your cart yet. <br />Check out our <a href="/memberships">memberships</a> now.</p>
		<? endif; ?>
	</div>


	<? 
	// Only show payment options if cart has items
	if($cart["items"] && $total_cart_price && $total_cart_price["price"] !== 0): ?>


	<div class="payment_method">
		<h2>Choose a payment method</h2>

		<? if($user_payment_methods): ?>
			<h3>Your payment methods</h3>
			<p>Choose one of your existing payment methods to continue processing this order.</p>
			<ul class="payment_methods">

			<? foreach($user_payment_methods as $user_payment_method): ?>

				<? if($user_payment_method && $user_payment_method["cards"]): ?>

					<? foreach($user_payment_method["cards"] as $card): ?>
				<li class="payment_method user_payment_method<?= $user_payment_method["classname"] ? " ".$user_payment_method["classname"] : "" ?>">
					<ul class="actions">
						<?= $HTML->oneButtonForm(
						"Pay order with card ending in " . $card["last4"], 
						"/shop/confirmCartAndSelectUserPaymentMethod",
						array(
							"inputs" => array(
								"cart_id" => $cart["id"], 
								"user_payment_method_id" => $user_payment_method["id"], 
								"payment_method_id" => $user_payment_method["payment_method_id"],
								"gateway_payment_method_id" => $card["id"]
							),
							"confirm-value" => false,
							"wait-value" => "Please wait",
							"dom-submit" => true,
							"class" => "primary",
							"name" => "continue",
							"wrapper" => "li.continue.".$user_payment_method["classname"],
						)) ?>
					</ul>
					<p><?= $user_payment_method["description"] ?></p>
				</li>
					<? endforeach; ?>

				<? else: ?>
				<li class="payment_method user_payment_method<?= $user_payment_method["classname"] ? " ".$user_payment_method["classname"] : "" ?>">
					<ul class="actions">
						<?= $HTML->oneButtonForm(
						"Pay order with " . $user_payment_method["name"], 
						"/shop/confirmCartAndSelectUserPaymentMethod",
						array(
							"inputs" => array(
								"cart_id" => $cart["id"], 
								"user_payment_method_id" => $user_payment_method["id"], 
								"payment_method_id" => $user_payment_method["payment_method_id"]
							),
							"confirm-value" => false,
							"wait-value" => "Please wait",
							"dom-submit" => true,
							"class" => "primary",
							"name" => "continue",
							"wrapper" => "li.continue.".$user_payment_method["classname"],
						)) ?>
					</ul>
					<p><?= $user_payment_method["description"] ?></p>
				</li>
				<? endif; ?>

			<? endforeach; ?>

			</ul>
		<? endif; ?>

		<? if($payment_methods): ?>
			<h3>Our <?= $user_payment_methods ? "other " : "" ?>payment options</h3>
			<p><?= $user_payment_methods ? "Or, p" : "P" ?>lease choose a payment method to continue processing this order.</p>
			<ul class="payment_methods">

			<? foreach($payment_methods as $payment_method): ?>
				<? if($payment_method["state"] === "public"): ?>

				<li class="payment_method<?= $payment_method["classname"] ? " ".$payment_method["classname"] : "" ?>">

					<ul class="actions">
						<?= $HTML->oneButtonForm(
						"Pay with " . $payment_method["name"], 
						"/shop/confirmCartAndSelectPaymentMethod", 
						array(
							"inputs" => array(
								"cart_id" => $cart["id"], 
								"payment_method_id" => $payment_method["id"]
							),
							"confirm-value" => false,
							"wait-value" => "Please wait",
							"dom-submit" => true,
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
		<? endif; ?>
	</div>


	<? 
	// Cart has items but total price is 0 – skip payment and confirm order
	elseif($cart["items"] && $total_cart_price && $total_cart_price["price"] === 0): ?>


	<div class="confirm">
		<h2>Confirm your order</h2>
		<p>Please review the content of your cart and confirm the order to finalize the process.</p>

		<ul class="actions">
			<?= $HTML->oneButtonForm("Confirm your order", "/shop/confirmOrder/".$cart["cart_reference"], array(
				"confirm-value" => false,
				"wait-value" => "Confirming",
				"dom-submit" => true,
				"class" => "primary",
				"name" => "continue",
				"wrapper" => "li.continue",
			)) ?>
		</ul>
	</div>


	<? endif; ?>



	<div class="delivery">
		<h2>Delivery address <a href="/shop/address/delivery">(Edit)</a></h2>

		<? if($cart["delivery_address_id"]): ?>
		<dl class="list">
			<dt>Name</dt>
			<dd><?= $delivery_address["address_name"] ?></dd>
			<dt>Att</dt>
			<dd><?= $delivery_address["att"] ?></dd>
			<dt>Address 1</dt>
			<dd><?= $delivery_address["address1"] ?></dd>
			<dt>Addresse 2</dt>
			<dd><?= $delivery_address["address2"] ?></dd>
			<dt>Postal and city</dt>
			<dd><?= $delivery_address["postal"] ?> <?= $delivery_address["city"] ?></dd>
			<dt>State</dt>
			<dd><?= $delivery_address["state"] ?></dd>
			<dt>Country</dt>
			<dd><?= $delivery_address["country"] ?></dd>
		</dl>

		<? else: ?>

		<p>You can <a href="/shop/address/delivery">add a delivery address</a> if you want it to be shown on your invoice, but this is not required.</p>
		
		<? endif; ?>
	</div>

	<div class="billing">
		<h2>Billing address <a href="/shop/address/billing">(Edit)</a></h2>

		<? if($cart["billing_address_id"]): ?>
		<dl class="list">
			<dt>Name</dt>
			<dd><?= $billing_address["address_name"] ?></dd>
			<dt>Att</dt>
			<dd><?= $billing_address["att"] ?></dd>
			<dt>Address 1</dt>
			<dd><?= $billing_address["address1"] ?></dd>
			<dt>Addresse 2</dt>
			<dd><?= $billing_address["address2"] ?></dd>
			<dt>Postal and city</dt>
			<dd><?= $billing_address["postal"] ?> <?= $billing_address["city"] ?></dd>
			<dt>State</dt>
			<dd><?= $billing_address["state"] ?></dd>
			<dt>Country</dt>
			<dd><?= $billing_address["country"] ?></dd>
		</dl>
		<? else: ?>

		<p>You can <a href="/shop/address/billing">add a billing address</a> if you want it to be shown on your invoice, but this is not required. </p>
		
		<? endif; ?>
	</div>

	<? endif; ?>

</div>
