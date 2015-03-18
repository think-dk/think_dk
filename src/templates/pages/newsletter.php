<?php
global $action;
global $model;

$email = $model->getProperty("email", "value");
	
?>
<div class="scene newsletter i:newsletter">
	<h1>De nysgerriges klub</h1>

	<p>
		Det var sandsyneligvis ikke nysgerrighed der dræbte katten alene.
		Hvis ikke vi er lidt nysgerrige går alting i stå - og ærligt talt:
		Dét har vi ikke råd til.
	</p>
	<p>
		Når du tilmelder dig "klubben", modtager du straks en mail med et
		aktiveringslink og en kode, så du senere kan logge ind og afmelde dig
		igen, hvis det skulle blive nødvendigt.
	</p>

	<?= $model->formStart("/nysgerrig/tilmelding", array("class" => "labelstyle:inject")) ?>

<?	if(message()->hasMessages(array("type" => "error"))): ?>
		<p class="errormessage">
<?		$messages = message()->getMessages(array("type" => "error"));
		message()->resetMessages();
		foreach($messages as $message): ?>
			<?= $message ?><br>
<?		endforeach;?>
		</p>
<?	endif; ?>

		<fieldset>
			<?= $model->input("newsletter", array("type" => "hidden", "value" => "curious")); ?>
			<?= $model->input("email", array("label" => "Din email", "required" => true, "value" => $email, "hint_message" => "Indtast din email-adresse.", "error_message" => "Det indtastede er ikke en gyldig email-adresse.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Tilmeld", array("class" => "primary", "wrapper" => "li.signup")) ?>
		</ul>
	<?= $model->formEnd() ?>


	<p>
		Ønsker du i stedet at deltage mere aktivet 
		i udvikling og planlægning, så send en email til 
		<a href="mailto:stopknappen@think.dk">stopknappen@think.dk</a>.
	</p>

</div>
