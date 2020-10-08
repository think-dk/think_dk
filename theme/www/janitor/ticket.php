<?php
$access_item["/"] = true;
$access_item["/admin"] = true;
$access_item["/admin-list"] = "/admin";
$access_item["/admin-new"] = "/admin";
$access_item["/admin-edit"] = "/admin";
$access_item["/saveAdmin"] = "/admin";
$access_item["/updateAdmin"] = "/admin";
$access_item["/host"] = true;
$access_item["/host-list"] = "/host";
$access_item["/host-edit"] = "/host";
$access_item["/updateHost"] = "/host";
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "ticket";
$model = $IC->typeObject($itemtype);


$page->bodyClass($itemtype);
$page->pageTitle("Tickets");


if(is_array($action) && count($action)) {

	// LIST/EDIT/NEW ITEM
	if(preg_match("/^(admin-list|admin-new|admin-edit|admin-view|host-list|host-edit|host-view)$/", $action[0])) {

		$page->page(array(
			"type" => "janitor",
			"templates" => "janitor/".$itemtype."/".$action[0].".php"
		));
		exit();
	}

	// participant download
	else if($page->validateCsrfToken() && count($action) == 2 && $action[0] === "downloadParticipantList") {

		$item_id = $action[1];
		$form_item = $IC->getItem(["id" => $item_id, "extend" => true]);
		if($form_item) {

			$file_name = date("Ymd_His")."-".superNormalize($form_item["name"]).".csv";
			$data = $model->prepareParticipantListForDownload($item_id);

			header('Content-Description: File download');
			header('Content-Type: text/csv');
			header("Content-Type: application/force-download");
			header('Content-Disposition: attachment; filename=' . $file_name);
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Pragma: public');
			header('Content-Length: ' . strlen($data));

			ob_clean();
			// enable downloading large file without memory issues
			ob_end_flush();
			print($data);
		}
		exit();

	}

	// Class interface
	else if($page->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

		// check if custom function exists on User class
		if($model && method_exists($model, $action[0])) {

			$output = new Output();
			$output->screen($model->{$action[0]}($action));
			exit();
		}
	}

}

$page->page(array(
	"templates" => "pages/404.php"
));

?>
