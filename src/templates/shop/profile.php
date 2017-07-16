<?php
global $action;
global $model;
$UC = new User();

// get posted variables
$nickname = stringOr(getPost("nickname"));
$email = stringOr(getPost("email"));
$mobile = stringOr(getPost("mobile"));

// get current user id
$user_id = session()->value("user_id");

$user = $UC->getUser();
//print_r($user);
?>
<div class="scene shopProfile i:shopProfile">
	<h1>Details</h1>


	<?= $HTML->serverMessages() ?>


	<div class="item">
		<h2>Name</h2>
		<?= $UC->formStart("updateProfile", array("class" => "details labelstyle:inject")) ?>
			<fieldset>
				<?= $UC->input("firstname", array("required" => true, "value" => $user["firstname"])) ?>
				<?= $UC->input("lastname", array("required" => true, "value" => $user["lastname"])) ?>
				<?= $UC->input("email", array("required" => true, "value" => $user["email"])) ?>
				<?= $UC->input("mobile", array("required" => true, "value" => $user["mobile"])) ?>
			</fieldset>

			<ul class="actions">
				<?= $UC->link("Cancel", "/shop/checkout/", array("class" => "button", "wrapper" => "li.cancel")) ?>
				<?= $UC->submit("Update", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
			</ul>
		<?= $UC->formEnd() ?>
	</div>

</div>