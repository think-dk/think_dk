<?php
global $action;
global $model;
$IC = new Items();
$UC = new User();

$this->pageTitle("Membership checkout");

// get current user id
$user_id = session()->value("user_id");



// get current cart
$cart = $model->getCart();

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


// update user on cart
if($user_id != 1) {

	$_POST["user_id"] = $user_id;
	$model->updateCart(array("updateCart"));

}
else {

	$username = stringOr(getPost("username"));
	$firstname = stringOr(getPost("firstname"));
	$lastname = stringOr(getPost("lastname"));
	$email = stringOr(getPost("email"));
	$mobile = stringOr(getPost("mobile"));
	$terms = stringOr(getPost("terms"));

}

?>
<div class="scene checkout i:signup">
	<h1>Sign up</h1>

	<?= $HTML->serverMessages() ?>

<? if($membership): ?>

	<div class="signup">
		<? if($membership == "Curious Cat"): ?>
		<h2>You are signing up for our Newsletter</h2>
		<? else: ?>
		<h2>You are signing up for a <br />&quot;<?= $membership ?>&quot; membership</h2>
		<? endif; ?>

		<p>Enter your details below and create your membership account now.</p>
		<?= $UC->formStart("signup", array("class" => "signup labelstyle:inject")) ?>

		<? if($membership == "Curious Cat"): ?>
			<?= $UC->input("maillist_name", array("type" => "hidden", "value" => "curious")); ?>
		<? else: ?>
			<?= $UC->input("maillist_name", array("type" => "hidden", "value" => "paying members")); ?>
		<? endif; ?>
			<?= $UC->input("maillist", array("type" => "hidden", "value" => 1)); ?>

			<fieldset>
				<?= $UC->input("firstname", array("value" => $firstname, "required" => true,)); ?>
				<?= $UC->input("lastname", array("value" => $lastname, "required" => true,)); ?>
				<?= $UC->input("email", array("value" => $email, "required" => true, "value" => $email, "hint_message" => "Type your email.", "error_message" => "You entered an invalid email.")); ?>
				<?= $UC->input("mobile", array("value" => $mobile)); ?>
				<?= $UC->input("password", array("hint_message" => "Type your new password - or leave it blank and we'll generate one for you.", "error_message" => "Your password must be between 8 and 20 characters.")); ?>
				<?= $UC->input("terms", array("value" => $terms)); ?>
			</fieldset>

			<ul class="actions">
				<?= $UC->submit("Continue", array("class" => "primary", "wrapper" => "li.signup")) ?>
			</ul>
		<?= $UC->formEnd() ?>

	</div>


	<div class="account">
		<h3>Already have an account?</h3>
		<p>If you already have an account you can change your membership on <a href="/janitor/admin/profile">account profile</a>.</p>
	</div>

	<div class="why_account">
		<h3>Why do I need an account?</h3>
		<p>
			As a think.dk member, an account is a natural extension of your membership. The account
			will also give you access to certain features on this site, that is only available to
			our members.
		</p>
		<p>
			For all other purchases we are legally required to keep a minimum set of information
			when we receive payments to prevent whitewashing and other types of fraud. For your convenience
			we officially associate this information with an account – to enable full transparency
			about what data is stored on our site.
		</p>
		<p>
			You can cancel your account or your membership anytime you like,
			but we are required to keep basic information about your payments for a minimum of 5 years.
		</p>
	</div>

<? else: ?>

	<div class="emptycart">
		<h2>You didn't select a membership yet.</h2>
		<p>Check out our <a href="/memberships">memberships</a> now.</p>
	</div>

	<div class="account">
		<h3>Already have an account?</h3>
		<p>If you already have an account you can change your membership on <a href="/janitor/admin/profile">account profile</a>.</p>
	</div>

<? endif; ?>

</div>
