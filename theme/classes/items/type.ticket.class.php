<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeTicket extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_ticket";
		$this->db_user_tickets = SITE_DB.".user_item_tickets";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Ticket name",
			"required" => true,
			"hint_message" => "Name of the ticket", 
			"error_message" => "Name must be filled out."
		));

		// Class
		$this->addToModel("classname", array(
			"type" => "string",
			"label" => "CSS Class for list",
			"hint_message" => "CSS class for custom styling. If you don't know what this is, just leave it empty"
		));

		// description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Short description",
			"required" => true,
			"hint_message" => "Write a short SEO description of what the ticket is for",
			"error_message" => "A short description without any words? How weird."
		));

		// HTML
		$this->addToModel("html", array(
			"hint_message" => "Write the full description of what the ticket is for",
			"required" => true,
			"allowed_tags" => "p,h2,h3,h4,ul,ol,download,jpg,png"
		));


		// ordered_message_id
		$this->addToModel("ordered_message_id", [
			"type" => "integer",
			"label" => "Ticket message",
			"required" => true,
			"hint_message" => "Select a message to send to users along with ticket, when they order this ticket."
		]);

		// Available from
		$this->addToModel("sale_opens", array(
			"type" => "datetime",
			"label" => "Ticket sale opens",
			"required" => true,
			"hint_message" => "State when the ticket sale should start.",
			"error_message" => "Start date/time must be a valid date/time."
		));

		// Available until
		$this->addToModel("sale_closes", array(
			"type" => "datetime",
			"label" => "Ticket sale closes",
			"required" => true,
			"hint_message" => "State when the ticket sale should end.",
			"error_message" => "End date/time must be a valid date/time."
		));

		// Total tickets
		$this->addToModel("total_tickets", array(
			"type" => "integer",
			"label" => "Total number of tickets",
			"required" => true,
			"hint_message" => "How many tickets can be sold.",
			"error_message" => "Total number of tickets must be a number."
		));

		// description
		$this->addToModel("ticket_information", array(
			"type" => "text",
			"label" => "Event information for ticket",
			"required" => true,
			"hint_message" => "A text to print on the ticket – preferably containing event location and date.",
			"error_message" => "A short description without any words? How weird."
		));

	}

	// Find specific tickets in orders
	function getParticipants($item_id) {

		// $query = new Query();
		// $sql = "SELECT nickname as sum FROM ".SITE_DB.".shop_orders as orders, ".SITE_DB.".shop_order_items as items WHERE items.item_id = $item_id AND items.order_id = orders.id AND orders.status != 3";
		// // debug([$sql]);
		// $query->sql($sql);
		// $count = $query->result(0, "sum");

	}

	// Find specific tickets in orders
	function getSoldTickets($item_id) {

		$query = new Query();
		$sql = "SELECT SUM(quantity) as sum FROM ".SITE_DB.".shop_orders as orders, ".SITE_DB.".shop_order_items as items WHERE items.item_id = $item_id AND items.order_id = orders.id AND orders.status != 3";
		// debug([$sql]);
		$query->sql($sql);
		$count = $query->result(0, "sum");

		// debug([$count]);

		return $count ? intval($count) : 0;
	}

	// Find specific tickets in carts
	// TODO: carts with this ticket must expire (could be done in this method)
	function getReservedTickets($item_id) {

		$count = 0;

		$query = new Query();
		$sql = "SELECT items.id, items.quantity, carts.modified_at FROM ".SITE_DB.".shop_carts as carts, ".SITE_DB.".shop_cart_items as items WHERE items.item_id = $item_id AND carts.id = items.cart_id";
		// debug([$sql, strtotime("- 15 MIN"), date("H:i", strtotime("- 15 MIN"))]);

		$query->sql($sql);
		$cart_items = $query->results();
		// debug([$cart_items]);
		foreach($cart_items as $cart_item) {
			if(strtotime($cart_item["modified_at"]) < strtotime("- 15 MIN")) {

				$sql = "DELETE FROM ".SITE_DB.".shop_cart_items WHERE id = ".$cart_item["id"];
				$query->sql($sql);

			}
			else {
				$count += intval($cart_item["quantity"]);
			}
		}
		// debug([$count]);

		// print_r($carts);
		return $count;
	}

	function ordered($order_item, $order) {

		// debug([$order_item, $order]);

		// check for subscription error
		if($order && $order["user_id"] && $order_item && $order_item["item_id"]) {

			$item_id = $order_item["item_id"];
			$user_id = $order["user_id"];

			global $page;
			$page->addLog("ticket->ordered: item_id:$item_id, user_id:$user_id, order_id:".$order["id"]);

			// variables for email
			$price = formatPrice(["price" => $order_item["total_price"], "vat" => $order_item["total_vat"], "country" => $order["country"], "currency" => $order["currency"]]);


			$ticket = $this->issueTicket($item_id, $user_id, $order["id"], $price);
			
		}

	}

	function orderCancelled($order_item, $order) {
		
	}

	function issueTicket($item_id, $user_id, $order_id = false, $price = false) {

		$query = new Query();
		$query->checkDbExistence($this->db_user_tickets);

		$sql = "SELECT ticket_no FROM ".$this->db_user_tickets." WHERE item_id = $item_id ORDER BY id desc LIMIT 1";
		// debug([$sql]);
		if($query->sql($sql)) {
			preg_match("/\-([0-9]+)$/", $query->result(0, "ticket_no"), $match);
			$ticket_count = intval($match[1])+1;
		}
		else {
			$ticket_count = 1;
		}

		$ticket_no = $item_id."-".time()."-".$ticket_count;

		$sql = "INSERT INTO ".$this->db_user_tickets." SET user_id = $user_id, item_id = $item_id, ticket_no = '$ticket_no'";
		if($order_id) {
			$sql .= ", order_id = $order_id";
		}

		$query->sql($sql);
		$ticket_id = $query->lastInsertId();


		$IC = new Items();
		$item = $IC->getItem(["id" => $item_id, "extend" => true]);
		$message_id = $item["ordered_message_id"];

		$ticket_file = $this->generateTicket($ticket_no);

		$model = $IC->typeObject("message");

		$model->sendMessage([
			"item_id" => $message_id, 
			"user_id" => $user_id, 
			"values" => [
				"PRICE" => ($price ? $price : "0,-"),
				"EVENT_NAME" => $item["name"],
				"TICKET_NO" => $ticket_no,
				"TICKET_INFORMATION" => nl2br($item["ticket_information"])
			],
			"attachments" => $ticket_file
		]);


		global $page;
		$page->addLog("ticket->issueTicket: item_id:$item_id, user_id:$user_id, order_id:".$order_id);

	}

	function getTicketInfo($ticket_no) {

		$query = new Query();
		$sql = "SELECT user_id, item_id FROM ".$this->db_user_tickets." WHERE ticket_no = '$ticket_no'";

		if($query->sql($sql)) {

			$user_id = $query->result(0, "user_id");
			$item_id = $query->result(0, "item_id");

			$ticket_info = [];
			$IC = new Items();
			$ticket_info["item"] = $IC->getItem(["id" => $item_id, "extend" => true]);

			$UC = new User();
			$ticket_info["user"] = $UC->getUserInfo(["user_id" => $user_id]);

			return $ticket_info;

		}

		return false;
	}

	function generateTicket($ticket_no) {

		// prepare print request url
		$url = escapeshellarg(SITE_URL."/tickets/print/".$ticket_no);
		// prepare save path
		$ticket_file = PRIVATE_FILE_PATH."/ticket/".$ticket_no.".pdf";

		$fs = new FileSystem();
		$fs->makeDirRecursively(dirname($ticket_file));

		include_once("classes/helpers/pdf.class.php");

		$pdf = new PDF();
		$pdf->create($url, $ticket_file, ["format" => "A5", "delay" => 5000]);




		// // prepare request url
		// $url = escapeshellarg(SITE_URL."/tickets/print/".$ticket_no);
		//
		//
		// // prepare save path + declaration id
		// $ticket_file = PRIVATE_FILE_PATH."/ticket/".$ticket_no.".pdf";
		//
		// $fs = new FileSystem();
		// $fs->makeDirRecursively(dirname($ticket_file));
		//
		// // Putting together the command for `shell_exec()`
		// $command = wkhtmltoPath()." -s A6 $url --javascript-delay 4000 --no-stop-slow-scripts --enable-javascript $ticket_file";
		// // debug([$command]);
		//
		// // Generate the image
		// $output = shell_exec($command." 2>&1");
		// // debug([$output]);


		return $ticket_file;
	}

}

?>