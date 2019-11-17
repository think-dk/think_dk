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

		$query->sql($sql);
		$count = $query->result(0, "sum");

		return $count ? intval($count) : 0;

	}

	// Find specific tickets in carts
	// TODO: carts with this ticket must expire (could be done in this method)
	function getReservedTickets($item_id) {

		$count = 0;

		$query = new Query();
		$sql = "SELECT items.id, items.quantity, carts.modified_at FROM ".SITE_DB.".shop_carts as carts, ".SITE_DB.".shop_cart_items as items WHERE items.item_id = $item_id AND carts.id = items.cart_id";

		$query->sql($sql);
		$cart_items = $query->results();

		foreach($cart_items as $cart_item) {
			if(strtotime($cart_item["modified_at"]) < strtotime("- 15 MIN")) {

				$sql = "DELETE FROM ".SITE_DB.".shop_cart_items WHERE id = ".$cart_item["id"];
				$query->sql($sql);

			}
			else {

				$count += intval($cart_item["quantity"]);

			}
		}

		return $count;
	}

	function ordered($order_item, $order) {

		// check for subscription error
		if($order && $order["user_id"] && $order_item && $order_item["item_id"]) {

			$item_id = $order_item["item_id"];
			$user_id = $order["user_id"];


			global $page;
			$page->addLog("ticket->ordered: item_id:$item_id, user_id:$user_id, order_id:".$order["id"].", order_item_id:".$order_item["id"]);


			// Issue ticket(s)
			$ticket = $this->issueTicket($item_id, $user_id, ["order" => $order, "order_item" => $order_item]);

		}

	}

	function orderCancelled($order_item, $order) {
		
	}

	function issueTicket($item_id, $user_id, $_options = false) {

		$order = false;
		$order_item = false;

		$quantity = 1;

		// overwrite defaults
		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "order"           : $order            = $_value; break;
					case "order_item"      : $order_item       = $_value; break;

					case "quantity"        : $quantity         = $_value; break;
				}
			}
		}
		

		$query = new Query();
		$query->checkDbExistence($this->db_user_tickets);


		if($user_id && $item_id) {

			// Tickets based on order
			if($order && $order_item) {

				// Use quantity from order
				$quantity = $order_item["quantity"];

				// variables for email
				$total_price = formatPrice(["price" => $order_item["total_price"], "vat" => $order_item["total_vat"], "country" => $order["country"], "currency" => $order["currency"]]);

			}
			// Free ticket
			else {

				$total_price = "0,-";

			}


			// Get item information
			$IC = new Items();
			$item = $IC->getItem(["id" => $item_id, "extend" => true]);
			$message_id = $item["ordered_message_id"];

			$ticket_files = [];


			// Generate ticket
			for($i = 0; $i < $quantity; $i++) {

				// Decide on next ticket number
				$sql = "SELECT ticket_no FROM ".$this->db_user_tickets." WHERE item_id = $item_id ORDER BY id desc LIMIT 1";
				if($query->sql($sql)) {
					preg_match("/\-([0-9]+)$/", $query->result(0, "ticket_no"), $match);
					$issued_ticket_counter = intval($match[1])+1;
				}
				else {
					$issued_ticket_counter = 1;
				}

				// Create ticket number
				$ticket_no = $item_id."-".time()."-".($issued_ticket_counter);

				// Insert ticket
				$sql = "INSERT INTO ".$this->db_user_tickets." SET user_id = $user_id, item_id = $item_id, ticket_no = '$ticket_no'";
				if($order_item) {
					$sql .= ", order_item_id = ".$order_item["id"];
				}
				$query->sql($sql);

				// Add batch information
				$batch = ($quantity > 1 ? "(".($i+1)."/$quantity)" : "");

				// Collect ticket files
				$ticket_files[] = $this->generateTicket($item_id, $ticket_no, $batch);


				global $page;
				$page->addLog("ticket->issueTicket: item_id:$item_id, user_id:$user_id, order_item_id:".$order_item["id"].", quantity:".$quantity.", ticket_no:".$ticket_no.($batch ? ", batch:".$batch : ""));

			}


			// Send ticket email
			$model = $IC->typeObject("message");
			$model->sendMessage([
				"item_id" => $message_id, 
				"user_id" => $user_id, 
				"values" => [
					"QUANTITY" => $quantity,
					"PRICE" => $total_price,
					"EVENT_NAME" => $item["name"],
					// "TICKET_NO" => $ticket_no,
					"TICKET_INFORMATION" => nl2br($item["ticket_information"])
				],
				"attachments" => $ticket_files
			]);

			message()->resetMessages();

		}

	}

	function getTicketInfo($ticket_no) {

		$query = new Query();
		$sql = "SELECT user_id, item_id, order_item_id FROM ".$this->db_user_tickets." WHERE ticket_no = '$ticket_no'";
		// debug([$sql]);

		if($query->sql($sql)) {

			$user_id = $query->result(0, "user_id");
			$item_id = $query->result(0, "item_id");
			$order_item_id = $query->result(0, "order_item_id");

			$ticket_info = [];
			$IC = new Items();
			$ticket_info["item"] = $IC->getItem(["id" => $item_id, "extend" => true]);

			$UC = new User();
			$ticket_info["user"] = $UC->getUserInfo(["user_id" => $user_id]);

			if($order_item_id) {
				$SC = new Shop();

				$sql = "SELECT * FROM ".$SC->db_order_items." WHERE id = '$order_item_id'";
				if($query->sql($sql)) {
					$order_item = $query->result(0);
					$order = $SC->getOrders(["order_id" => $order_item["order_id"]]);
					if($order) {
						$ticket_info["price"] = formatPrice(["price" => $order_item["unit_price"], "vat" => $order_item["unit_vat"], "country" => $order["country"], "currency" => $order["currency"]]);
						return $ticket_info;
					}
				}

			}
			else if($ticket_info["item"] && $ticket_info["name"]) {
				return $ticket_info;
			}

		}

		return false;
	}

	function generateTicket($item_id, $ticket_no, $batch = false) {

		if(is_string($ticket_no)) {

			// prepare print request url
			$url = SITE_URL."/tickets/print/$ticket_no".($batch ? "?batch=".urlencode($batch) : "");
			debug([$url]);

			// prepare save path
			$ticket_file = PRIVATE_FILE_PATH."/$item_id/ticket/$ticket_no/pdf";
			$public_ticket_file = PUBLIC_FILE_PATH."/$item_id/$ticket_no/$ticket_no.pdf";

			$fs = new FileSystem();
			$fs->makeDirRecursively(dirname($ticket_file));

			include_once("classes/helpers/pdf.class.php");

			$pdf = new PDF();
			$pdf->create($url, $ticket_file, ["format" => "A5", "delay" => 1500, "cookie" => ["name" => "PHPSESSID", "value" => $_COOKIE["PHPSESSID"]]]);

			$fs = new FileSystem();
			$fs->copy($ticket_file, $public_ticket_file);

			return $public_ticket_file;
		}

	}

}

?>