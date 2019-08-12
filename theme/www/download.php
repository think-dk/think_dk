<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

// pure
$action = $page->actions();



// File download (From public files only)
if(count($action) == 3) {

	$item_id = $action[0];
	$variant = $action[1];
	$file_name = $action[2];

	$file = PUBLIC_FILE_PATH."/".$item_id."/".$variant."/".$file_name;
	if(file_exists($file)) {

		header('Content-Description: File download');
		header('Content-Type: application/octet-stream');
		header("Content-Type: application/force-download");
		header('Content-Disposition: attachment; filename=' . $file_name);
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));

		ob_clean();
		// enable downloading large file without memory issues
		ob_end_flush();
		//flush();
		readfile($file);
		exit();
	}

}

// no valid actions
$page->page(array(
	"templates" => "pages/404.php"
	)
);


?>