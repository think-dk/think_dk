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


# /verdensborger/tilmelding
if(count($action) && $action[0] == "tilmelding") {


	$name = getPost("name");
	$parentname = getPost("parentname");
	$email = getPost("email");
	$phone = getPost("phone");
	$comment = getPost("comment");

	mailer()->send([
		"subject" => "",
		"recipient" => "anja@think.dk",
		"message" => "Navn: $name<br>\nForælders navn: $parentname<br>\nEmail: $email<br>\nTelefon: $phone<br>\n\nAnsøgning:<br>\n$comment",
		"template" => "system",
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

$page->page(array(
	"templates" => "verdensborger/index.php"
));

?>
 