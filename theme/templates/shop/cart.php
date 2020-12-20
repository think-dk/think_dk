<?php
global $action;
global $model;

$this->pageTitle("Cart");

$user_id = session()->value("user_id");


// if cart reference was passed to cart controller

if(count($action) > 1) {
	session()->value("cart_reference", $action[1]);
}
$cart = $model->getCart();
if($cart) {
	$total_cart_price = $model->getTotalCartPrice($cart["id"]);
}

$IC = new Items();

?>
<div class="scene cart i:cart">
	<h1>Your cart</h1>

	<?= $HTML->serverMessages() ?>

	<div class="all_items">
		<h2>Cart contents</h2>
		<? if($cart && $cart["items"]): ?>
		<ul class="items">
			<? foreach($cart["items"] as $cart_item):
				$item = $IC->getItem(array("id" => $cart_item["item_id"], "extend" => array("subscription_method" => true))); 
				$price = $model->getCartItemPrice($cart_item, $cart);
			?>
			<li class="item id:<?= $item["id"] ?>">
				<h3>

					<? if($item["itemtype"] != "membership"): ?>
					<?= $model->formStart("/shop/updateCartItemQuantity/".$cart["cart_reference"]."/".$cart_item["id"], array("class" => "updateCartItemQuantity labelstyle:inject")) ?>
						<fieldset>
							<?= $model->input("quantity", array(
								"type" => "integer",
								"value" =>  $cart_item["quantity"],
								"hint_message" => "State the quantity of this item"
							)) ?>
						</fieldset>
						<ul class="actions">
							<?= $model->submit("Update", array("name" => "update", "wrapper" => "li.save")) ?>
						</ul>
					<?= $model->formEnd() ?>
					<? else: ?>
					<span class="quantity"><?= $cart_item["quantity"] ?></span>
					<? endif; ?>

					<span class="x">x </span>
					<span class="name"><?= $item["name"] ?> </span>
					<span class="a">á </span>
					<span class="unit_price">
						<?= formatPrice([
							"price" => $price["cart_price"], 
							"vat" => $price["cart_vat"], 
							"currency" => $cart["currency"], 
							"country" => $cart["country"]
						]) ?>
					</span>
					<span class="total_price">
						<?= formatPrice(array(
								"price" => $price["cart_price"]*$cart_item["quantity"], 
								"vat" => $price["cart_vat"]*$cart_item["quantity"], 
								"currency" => $cart["currency"], 
								"country" => $cart["country"]
							), 
							array("vat" => false)
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
					This purchase includes a membership.
				</p>
				<? endif; ?>

				<ul class="actions">
					<?= $HTML->oneButtonForm("Delete", "/shop/deleteFromCart/".$cart["cart_reference"]."/".$cart_item["id"], array(
						"wrapper" => "li.delete",
						"static" => true
					)) ?>
				</ul>
			</li>
			<? endforeach; ?>

			<li class="total">
				<p>
					<span class="name">Hereof Moms</span>
					<span class="total_vat">
						(<?= formatPrice(array("price" => $total_cart_price["vat"], "currency" => $total_cart_price["currency"])) ?>)
					</span>
				</p>
				<h3>
					<span class="name">Total</span>
					<span class="total_price">
						<?= formatPrice($total_cart_price, array("vat" => false)) ?>
					</span>
				</h3>
			</li>
		</ul>
		<? else: ?>
		<p>You don't have any items in your cart yet. <br />Check out our <a href="/memberships">memberships</a> now.</p>
		<ul class="items">
			<li class="total">
				<h3>
					<span class="name">Total</span>
					<span class="total_price">
						<?= formatPrice(["price" => 0, "currency" => $this->currency()]) ?>
					</span>
				</h3>
			</li>
		</ul>
		<? endif; ?>
	</div>

<? if($cart && $cart["items"]) :?>
	<div class="checkout">
		<h2>Continue to checkout</h2>
		<p>When you are ready, click <em>Checkout</em> to proceed.</p>
		<ul class="actions">
			<?= $HTML->oneButtonForm("Checkout", "/shop/checkout", array(
				"confirm-value" => false,
				"dom-submit" => true,
				"class" => "primary",
				"name" => "continue",
				"wrapper" => "li.continue",
			)) ?>
		</ul>
	</div>
<? endif; ?>
</div>
