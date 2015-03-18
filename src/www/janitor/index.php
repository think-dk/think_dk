<?php
$access_item["/"] = true;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$qnas = $IC->getItems(array("itemtype" => "qna", "extend" => true));


$page->pageTitle("the Janitor @ ".SITE_URL)


?>
<? $page->header(array("type" => "janitor")) ?>

<div class="scene front">
	<h1><?= SITE_NAME ?></h1>


	<h2>Janitor</h2>
	<p>
		Stopknappen er bygget på <a href="http://janitor.parentnode.dk" target="_blank">Janitor</a>
		- og Janitor er bygget til Stopknappen.
	</p>

	<?= $JML->listUserTodos() ?>

	<?= $JML->listOpenQuestions() ?>

</div>

<? $page->footer(array("type" => "janitor")) ?>