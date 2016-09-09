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

$payment_methods = $this->paymentMethods();

//print_r($user);
?>
<div class="scene shopPayment i:scene">
	<h1>Payment</h1>

<? print_r($payment_methods) ?>	

</div>