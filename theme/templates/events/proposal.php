<?php
global $action;
global $IC;
$itemtype = "eventproposal";
$model = $IC->typeObject($itemtype);


$tags = $IC->getTags(["context" => "criteria"]);

?>
<div class="scene i:eventProposal eventProposal">
	<h1>Event proposal</h1>

	<div class="proposal">

		<?= $model->formStart("saveProposal", array("class" => "labelstyle:inject")) ?>
			<div class="criteria">
				<p>
					Select at least 4 of our event criteria that fit with your event.
				</p>
				<ul class="criteria">
				<? foreach($tags as $tag): ?>
					<li class="criteria <?= preg_replace("/-/", "_", superNormalize($tag["value"])) ?>">
						<?= $model->input("criteria[".$tag["id"]."]", ["label" => $tag["value"], "type" => "checkbox"]) ?>
						<p><?= $tag["description"] ?></p>
					</li>
				<? endforeach; ?>
			</div>

			<div class="item i:defaultEdit">
				<h2>Your event</h2>

				<fieldset>
					<h3>Event image</h3>
					<p>
						Adding a meaningful image to your event helps to promote your event. You must ensure that you have legal rights to use the image you upload.
					</p>
					<?= $model->input("single_media") ?>
				</fieldset>

				<fieldset>
					<h3>Event name</h3>
					<p>
						What is the desired name of your event?
					</p>
					<?= $model->input("name") ?>
				</fieldset>

				<fieldset>
					<h3>Event description</h3>
					<p>
						Add the full description of your event, including information about the host and registration details. 
					</p>
					<?//= $model->input("description", array("class" => "autoexpand short")) ?>
					<?= $model->input("html", array("type" => "text", "class" => "autoexpand")) ?>
				</fieldset>

				<fieldset>
					<h3>Event time wishes</h3>
					<p>
						What are your event time preferences? Providing this information helps us in allocating ressources and may speed up the processing of your proposal.
					</p>
					<?= $model->input("desired_part_of_week") ?>
					<?= $model->input("desired_start_time") ?>
					<?= $model->input("desired_end_time") ?>
				</fieldset>

				<fieldset>
					<h3>Event details</h3>
					<p>
						What type of event are you planning? Providing this information helps us find the right room for you and may speed up the processing of your proposal.
					</p>
					<?= $model->input("event_attendance_mode") ?>
					<?= $model->input("event_type") ?>
					<?= $model->input("event_attendance_expectance") ?>
					<?= $model->input("reoccurring") ?>
				</fieldset>

				<fieldset>
					<h3>Event price</h3>
					<p>
						Do you want to charge a fee for participating in your event? Be aware that special conditions apply for non-free events. 
						think.dk offers a ticket platform – and we strongly encourage you to use this platform for selling tickets for your event.
					</p>
					<?= $model->input("tickets") ?>
				</fieldset>

				<fieldset>
					<h3>Comments</h3>
					<p>
						Leave a comment for the event team. If you have specific dates in mind or already have some 
						agreements about your event, you can state it here.
					</p>
					<?= $model->input("comment_from_host", array("class" => "autoexpand short")) ?>
				</fieldset>

				<fieldset>
					<h3>Hosting terms and conditions</h3>
					<?= $model->input("terms") ?>
				</fieldset>

				<ul class="actions">
					<?= $model->submit("Send your proposal", array("class" => "primary", "wrapper" => "li.send")) ?>
				</ul>

			</div>
		<? $model->formEnd() ?>
	</div>

	<div class="info">
		<h2>The Criteria</h2>
		<p>
			The Criteria has been developed to ensure the continuous exploration with a clear orientation towards holistic sustainability.
		</p> 
		<h2>think.dk</h2>
		<p>As a think member you can host your cultural and freely accessible event free of charge.</p>
			
	</div>

</div>
