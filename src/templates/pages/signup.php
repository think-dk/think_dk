<?php
global $action;
global $model;

// in case of signup failure, empty password field
$model->setProperty("password", "value", "");

?>
<div class="scene signup i:signup">

	<h1>Tilmelding</h1>
	<p>
		Indtast dit Navn, Email og Password nedenfor for at oprette en konto på <?= SITE_NAME ?>.
	</p>
	<?= $model->formStart("save", array("class" => "labelstyle:inject")) ?>

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
			<?= $model->input("nickname", array("label" => "Dit navn", "required" => true, "hint_message" => "Indtast dit navn.", "error_message" => "Det indtastede er ikke en gyldigt.")); ?>
			<?= $model->input("email", array("label" => "Din email", "required" => true, "hint_message" => "Indtast din email-adresse.", "error_message" => "Det indtastede er ikke en gyldig email-adresse.")); ?>
			<?= $model->input("password", array("required" => true, "hint_message" => "Indtast dit nye password.", "error_message" => "Dit password skal være mellem 8 og 20 tegn.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Tilmeld dig", array("class" => "primary", "wrapper" => "li.signup")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<p>
		Når du tilmelder dig Stopknappen, modtager du straks en mail med et
		aktiveringslink. Først når du har aktiveret din konto er din tilmelding afsluttet.
	</p>

</div>
