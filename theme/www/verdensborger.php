<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("verdensborger");
$page->pageTitle("Verdensborger – konfirmation");


# /friosfradevoksnes/tilmelding
if(count($action) && $action[0] == "tilmelding") {


	$name = getPost("name");
	$parentname = getPost("parentname");
	$email = getPost("email");
	$phone = getPost("phone");
	$comment = getPost("comment");

	mailer()->send([
		"recipient" => "martin@think.dk",
		"message" => "Navn: $name\nForælders navn: $parentname\nEmail: $email\nTelefon: $phone\n\nAnsøgning:\n$comment"
	]);


	header("Location: /verdensborger/kvittering");
	exit();

}
else if(count($action) && $action[0] == "kvittering") {

	$page->page(array(
		"templates" => "verdensborger/receipt.php"
	));
	exit();

}

# /friosfradevoksnes/tilmelding
if(count($action) && $action[0] == "2") {

	$page->page(array(
		"templates" => "verdensborger/index2.php"
	));
	exit();

}

$page->page(array(
	"templates" => "verdensborger/index.php"
));

?>
 