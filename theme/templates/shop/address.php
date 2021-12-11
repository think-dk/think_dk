<?php
global $action;
global $model;
$UC = new User();

$type = $action[1];

// get current user id
$user_id = session()->value("user_id");

$address_label = stringOr(getPost("address_label"));
$address_name = stringOr(getPost("address_name"));
$att = stringOr(getPost("att"));
$address1 = stringOr(getPost("address1"));
$address2 = stringOr(getPost("address2"));
$city = stringOr(getPost("city"));
$postal = stringOr(getPost("postal"));
$state = stringOr(getPost("state"));
$country = stringOr(getPost("country"));

// default values for testing
// $address_label = "label of address";
// $address_name = "name of address";
// $address1 = "adresse";
// $city = "by";
// $postal = "1234";


$user = $UC->getUser();
$cart = $model->getCart();
//print_r($user);


?>
<div class="scene shopAddress i:shopAddress">
	<h1><?= $type == "delivery" ? "Delivery" : "Billing" ?> address</h1>

	<?= $HTML->serverMessages() ?>

	<? if($user["addresses"]): ?>

	<div class="addresses">
		<ul class="addresses">
			<? foreach($user["addresses"] as $address): ?>
			<li class="address<?= ($address["id"] == $cart[$type."_address_id"]) ? " selected" : "" ?>">
				<?= $address["address_label"] ? ('<div class="address_label">' . $address["address_label"] . '</div>') : '' ?>
				<div class="address_name"><?= $address["address_name"] ?></div>
				<?= $address["att"] ? ('<div class="att">Att: ' . $address["att"] . '</div>') : '' ?>
				<div class="address1"><?= $address["address1"] ?></div>
				<?= $address["address2"] ? ('<div class="address2">' . $address["address2"] . '</div>') : '' ?>
				<div class="postal_city">
					<span class="postal"><?= $address["postal"] ?></span>
					<span class="city"><?= $address["city"] ?></span>
				</div>
				<?= $address["state"] ? ('<div class="state">' . $address["state"] . '</div>') : '' ?>
				<div class="country"><?= $address["country_name"] ?></div>

				<? /* if($address["id"] != $cart[$type."_address_id"]):*/ ?>
				<?= $UC->formStart("selectAddress", array("class" => "labelstyle:inject")) ?>
				<?= $UC->input($type."_address_id", array("type" => "hidden", "value" => $address["id"]))?>
				<ul class="actions">
					<?= $UC->submit("Select", array("wrapper" => "li.select")) ?>
				</ul>
				<?= $UC->formEnd() ?>
				<? /* endif; */ ?>
			</li>
			<? endforeach; ?>
		</ul>
	</div>

	<? endif; ?>


	<div class="item">
		<h2>Add new address</h2>
		<?= $UC->formStart("addAddress/$type", array("class" => "address labelstyle:inject")) ?>
			<fieldset>
				<?= $UC->input("address_label", array("value" => $address_label)) ?>
				<?= $UC->input("address_name", array("value" => $address_name)) ?>
				<?= $UC->input("att", array("value" => $att)) ?>
				<?= $UC->input("address1", array("value" => $address1)) ?>
				<?= $UC->input("address2", array("value" => $address2)) ?>
				<?= $UC->input("city", array("value" => $city)) ?>
				<?= $UC->input("postal", array("value" => $postal)) ?>
				<?= $UC->input("state", array("value" => $state, "tabindex" => 1)) ?>
				<?= $UC->input("country", array(
					"type" => "select",
					"options" => $UC->toOptions($this->countries(), "id", "name", ["add" => ["" => "Country"]]),
					"value" => $country
				)) ?>
			</fieldset>

			<ul class="actions">
				<?= $UC->link("Cancel", "/shop/checkout", array("class" => "button", "wrapper" => "li.cancel")) ?>
				<?= $UC->submit("Update", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
			</ul>
		<?= $UC->formEnd() ?>
	</div>

</div>