<?php
/**
* @package janitor.member
* Meant to allow local member additions/overrides, with superuser privileges
*/

include_once("classes/users/supermember.core.class.php");


class SuperMember extends SuperMemberCore {

	/**
	*
	*/
	function __construct() {

		parent::__construct(get_class());

	}


	function updateMembershipPrice($action) {

		// Get posted values to make them available for models
		$this->getPostedEntities();

		if(count($action) == 2 && $this->validateList(array("custom_price", "item_id"))) {

			$user_id = $action[1];
			$item_id = $this->getProperty("item_id", "value");
			$custom_price = $this->getProperty("custom_price", "value");

			$query = new Query();


			// TODO:
			// Get current membership price
			// if custom price er det samme som membership price, så slet custom price fra systemet.


			// Check that subscription for this membership type exists
			$sql = "SELECT * FROM ".$this->db_subscriptions." WHERE user_id = $user_id AND item_id = $item_id";
			// debug([$sql]);
			if($query->sql($sql)) {

				$subscription = $query->result(0);

				include_once("classes/shop/supershop.class.php");
				$SC = new SuperShop();

				// Get order to apply correct currency
				$order = $SC->getOrders(["order_id" => $subscription["order_id"]]);
				// debug([$subscription, $order]);

				if($order) {

					$sql = "UPDATE ".$this->db_subscriptions." SET custom_price = '$custom_price' WHERE id = ".$subscription["id"];
					if($query->sql($sql)) {

						message()->addMessage("Custom price has been saved");
						return formatPrice(["price" => $custom_price, "currency" => $order["currency"]]);

					}

				}


			}


		}

		message()->addMessage("Custom price could not be saved", array("type" => "error"));
		return false;
	}

}

?>
