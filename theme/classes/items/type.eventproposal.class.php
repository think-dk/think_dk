<?php
/**
* @package janitor.items
* This file contains item type functionality
*/

class TypeEventproposal extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_eventproposal";

		$this->event_attendance_mode_options = [
			1 => "Physical",
			2 => "Physical and Online",
			3 => "Online"
		];
		$this->event_attendance_mode_schema_values = [
			1 => "OfflineEventAttendanceMode",
			2 => "MixedEventAttendanceMode",
			3 => "OnlineEventAttendanceMode"
		];


		$this->event_location_type_options = [
			1 => "Physical",
			2 => "Online"
		];

		$this->part_of_week = [
			"" => "Weekdays or weekends",
			1 => "Weekday (Monday - Thursday)",
			2 => "Weekend (Friday - Sunday)",
		];
		$this->event_types = [
			"" => "Type of event",
			1 => "Workshop",
			2 => "Physical activity",
			3 => "Talk",
			4 => "Course",
			5 => "Meeting",
			6 => "Seminar",
			7 => "Presentation",
			8 => "Performance",
			9 => "Conference",
			10 => "Festival"
		];


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name of your event",
			"required" => true,
			"hint_message" => "Please state the desired event name", 
			"error_message" => "An event needs a name."
		));

		// // Description
		// $this->addToModel("description", array(
		// 	"type" => "text",
		// 	"label" => "Short SEO description",
		// 	"max" => 155,
		// 	"hint_message" => "Write a short description of the event for SEO and listings (max 155 characters).",
		// 	"error_message" => "Your event needs a description – max 155 characters."
		// ));

		// HTML
		$this->addToModel("html", array(
			"type" => "html",
			"label" => "Full description",
			"allowed_tags" => "p,h2,h3,h4,ul,ol", //,mp4,vimeo,youtube",
			"hint_message" => "Write a full description of the event.",
			"error_message" => "A full description without any words? How weird."
		));



		// Single media
		$this->addToModel("single_media", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add single image by dragging it here. PNG or JPG allowed.",
			"error_message" => "Media does not fit requirements."
		));


		// Desired start time
		$this->addToModel("desired_start_time", array(
			"type" => "string",
			"label" => "Preferred starting time for event",
			"pattern" => "[0-9]+(:[0-9]{2})?",
			"hint_message" => "At what time would you like the event to start (HH:mm).",
			"error_message" => "You need to enter a valid time (HH fx. 10, or HH:mm fx. 10:30)."
		));

		// Desired end time 
		$this->addToModel("desired_end_time", array(
			"type" => "string",
			"label" => "Preferred ending time for event",
			"pattern" => "[0-9]+(:[0-9]{2})?",
			"hint_message" => "At what time would you like the event to end (HH:mm).",
			"error_message" => "You need to enter a valid time (HH fx. 10, or HH:mm fx. 10:30)."
		));
		// End datetime
		$this->addToModel("desired_part_of_week", array(
			"type" => "select",
			"options" => $this->part_of_week,
			"label" => "Preferred part of week",
			"hint_message" => "Does your event fit better for weekdays or weekends?",
			"error_message" => "You need to enter a valid option."
		));

		// Event attendance
		$this->addToModel("event_attendance_mode", array(
			"type" => "select",
			"label" => "Event attendance",
			"options" => $this->event_attendance_mode_options,
			"hint_message" => "Attendance option of the event.",
			"error_message" => "Indicate the attendance option of the event."
		));

		// Event type
		$this->addToModel("event_type", array(
			"type" => "select",
			"label" => "Which type of event is it (mostly).",
			"options" => $this->event_types,
			"hint_message" => "Perhaps your event fits into one of these categories?", 
			"error_message" => "The event type must be a valid category."
		));

		// Event attendance expectation
		$this->addToModel("event_attendance_expectance", array(
			"type" => "integer",
			"label" => "Expected attendance",
			"hint_message" => "How many people do you expect at this event.",
			"error_message" => "Attendance expectation must be stated as a number."
		));

		// Reoccurring
		$this->addToModel("reoccurring", array(
			"type" => "checkbox",
			"label" => "This is a reoccurring event or part of a series of events.",
			"hint_message" => "Would you like this to be a reoccurring event?", 
			"error_message" => "Must be a valid option."
		));

		// Tickets
		$this->addToModel("tickets", array(
			"type" => "checkbox",
			"label" => "I wish to sell tickets or otherwise charge and entry fee.",
			"hint_message" => "Do you plan to sell tickets or otherwise charge an entry fee?", 
			"error_message" => "Must be a valid option."
		));



		// Description for event team
		$this->addToModel("comment_from_host", array(
			"type" => "text",
			"label" => "Comments for the event team",
			"hint_message" => "Is there something we should know about your event, aside from what is stated in the event description above?", 
			"error_message" => "Comment must be a string."
		));


		// Terms
		$this->addToModel("terms", array(
			"type" => "checkbox",
			"label" => "I accept the <a href=\"#\">event hosting terms and conditions</a>.",
			"required" => true,
			"hint_message" => "You must accept the terms.", 
			"error_message" => "You must accept the terms."
		));

	}

	function convertToEvent($action) {


		// Get posted values to make them available for models
		$this->getPostedEntities();

		if(count($action) == 2) {

			$item_id = $action[1];

			$IC = new Items();
			$event_model = $IC->typeObject("event");

			// Set default location (think.dk)
			$locations = $event_model->getLocations();
			$think_location_id = false;
			$think_location_index = arrayKeyValue($locations, "location", "think.dk (Salen)");
			if($think_location_index !== false) {
				$think_location_id = $locations[$think_location_index]["id"];
			}



			$item = $IC->getItem(["id" => $item_id, "extend" => ["tags" => true, "mediae" => true]]);

			$_POST["name"] = $item["name"];
			// $_POST["description"] = $item["description"];
			$_POST["html"] = $item["html"];
			$_POST["event_attendance_mode"] = $item["event_attendance_mode"];
			$_POST["memberevent"] = "true";
			if($think_location_id) {
				$_POST["location"] = $think_location_id;
			}


			// create root item
			$event_item = $event_model->saveAdmin(["saveAdmin"]);
			unset($_POST);

			// Did we succeed in creating event item
			if($event_item) {

				$new_item_id = $event_item["id"];

				// add tags
				if($item["tags"]) {
					foreach($item["tags"] as $tag) {

						unset($_POST);
						$_POST["tags"] = $tag["id"];
						$event_model->addTag(array("addTags", $new_item_id));
						unset($_POST);

					}
				}

				// Copy/add "static" mediae
				if($item["mediae"]) {
					
					foreach($item["mediae"] as $media) {

						// Create insert statement
						$sql = "INSERT INTO ".UT_ITEMS_MEDIAE." SET ";
						$sql .= "item_id='".$new_item_id."',";
						
						$sql .= "name='".$media["name"]."',";
						$sql .= "format='".$media["format"]."',";
						$sql .= "variant='".$media["variant"]."',";
						$sql .= "width='".$media["width"]."',";
						$sql .= "height='".$media["height"]."',";
						$sql .= "filesize='".$media["filesize"]."',";
						$sql .= "position=".$media["position"];

						// Insert media
						if($query->sql($sql)) {

							// Copy media
							$fs->copy(
								PRIVATE_FILE_PATH."/".$media["item_id"].($media["variant"] ? "/".$media["variant"] : "")."/".$media["format"], 
								PRIVATE_FILE_PATH."/".$new_item_id.($media["variant"] ? "/".$media["variant"] : "")."/".$media["format"]
							);

						}

					}

				}

				// Copy/add "dynamic" mediae
				// We need model to find HTML input types
				$model = $IC->typeObject($item["itemtype"]);

				// Prepare POST array for updating HTML
				unset($_POST);


				// Look for media/files in HTML fields
				// – HTML must be updated and content must be copied to new item
				foreach($item as $property => $value) {
					if(is_string($value) && !preg_match("/^(id|status|sindex|itemtype|user_id|item_id|published_at|created_at|modified_at|tags|mediae)$/", $property)) {

						// Type is HTML
						if($model->getProperty($property, "type") === "html") {

							// Look for media div's
							preg_match_all("/\<div class\=\"(media|file) item_id\:[\d]+ variant\:HTMLEDITOR-[A-Za-z0-9\-_]+ name/", $value, $mediae_matches);
							if($mediae_matches) {

								// Loop over media div's
								foreach($mediae_matches[0] as $media_match) {

									// debug($media_match);

									preg_match("/(file|media) item_id\:([\d]+) variant\:(HTMLEDITOR-[A-Za-z0-9\-_]+)/", $media_match, $media_details);
									if($media_details) {
										// Get item_id and variant for each embedded media
										list(,$type, $old_item_id, $old_variant) = $media_details;


										// Get full media data set
										$sql = "SELECT * FROM ".UT_ITEMS_MEDIAE." WHERE item_id = $old_item_id AND variant = '$old_variant'";
										if($query->sql($sql)) {
											$media = $query->result(0);


											$new_variant = "HTMLEDITOR-".$property."-".randomKey(8);


											// Create insert statement
											$sql = "INSERT INTO ".UT_ITEMS_MEDIAE." SET ";
											$sql .= "item_id='".$new_item_id."',";
						
											$sql .= "name='".$media["name"]."',";
											$sql .= "format='".$media["format"]."',";
											$sql .= "variant='".$new_variant."',";
											$sql .= "width='".$media["width"]."',";
											$sql .= "height='".$media["height"]."',";
											$sql .= "filesize='".$media["filesize"]."',";
											$sql .= "position=".$media["position"];

											// debug($sql);

											// Insert media
											if($query->sql($sql)) {

												// Update HTML block
												// Div properties
												$value = str_replace("item_id:$old_item_id variant:$old_variant", "item_id:$new_item_id variant:$new_variant", $value);
												// a-href link
												$value = str_replace("/$old_item_id/$old_variant/", "/$new_item_id/$new_variant/", $value);

												// Add to POST array
												$_POST[$property] = $value;

												// Copy private media
												$fs->copy(
													PRIVATE_FILE_PATH."/".$old_item_id."/".$old_variant, 
													PRIVATE_FILE_PATH."/".$new_item_id."/".$new_variant
												);

												// Extra action for files
												if($type === "file") {

													// Copy public files (because public zip/pdf files are not yet auto re-generated)
													$fs->copy(
														PUBLIC_FILE_PATH."/".$old_item_id."/".$old_variant, 
														PUBLIC_FILE_PATH."/".$new_item_id."/".$new_variant
													);

												}

											}

										}

									}

								}

							}

						}

					}

				}

				// Do we have update HTML values
				if(isset($_POST)) {
					// Update item
					$event_model->updateAdmin(["updateAdmin", $event_item["id"]]);
				}
				unset($_POST);


				// Add owner as editor
				$_POST["item_editor"] = $item["user_id"];
				$event_model->addEditor(["addEditor", $event_item["id"]]);
				unset($_POST);
				


				message()->resetMessages();
				message()->addMessage("Proposal converted to Event");

				// Delete event proposal
				$this->delete(["delete", $item["id"]]);


				// get and return new device (id will be used to redirect to new item page)
				$item = $IC->getItem(array("id" => $event_item["id"]));
				return $item;

			}

		}

		message()->resetMessages();
		message()->addMessage("Item could not be converted", ["type" => "error"]);
		return false;

	}

}

?>