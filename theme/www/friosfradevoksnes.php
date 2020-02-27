<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("frios");
$page->pageTitle("Fri os fra de voksnes");


# /friosfradevoksnes/tilmelding
if(count($action) && $action[0] == "tilmelding") {


	$name = getPost("name");
	$parentname = getPost("parentname");
	$email = getPost("email");
	$phone = getPost("phone");
	$comment = getPost("comment");

	mailer()->send([
		"recipient" => "martin@think.dk,rosenkildetine@gmail.com",
		"message" => "Navn: $name\nForælders navn: $parentname\nEmail: $email\nTelefon: $phone\n\nAnsøgning:\n$comment"
	]);


	header("Location: /friosfradevoksnes/kvittering");
	exit();

}
else if(count($action) && $action[0] == "kvittering") {

	$page->page(array(
		"templates" => "pages/friosfradevoksnes-receipt.php"
	));
	exit();

}

$page->page(array(
	"templates" => "pages/friosfradevoksnes.php"
));

?>
 