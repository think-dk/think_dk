<?php
	
$model = new Model();
$username = stringOr(getPost("username"));
	
?>
<div class="scene login i:login">
	<h1>Login</h1>

	<h2>Et troværdigt alternativ <br />kræver forberelse ...</h2>
	<p>
		 - specielt hvis man tager det seriøst. Mens vi arbejder med at gøre materialet klar, 
		har vi valgt at begrænse adgangen. Kontakt os på 
		<a href="mailto:stopknappen@think.dk">stopknappen@think.dk</a> hvis du ønsker at deltage
		i udvikling og planlægning.
	</p>

	<?= $model->formStart("?login=true", array("class" => "labelstyle:inject")) ?>

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
			<?= $model->input("username", array("type" => "string", "label" => "Email eller mobilnummer", "required" => true, "value" => $username, "pattern" => "[\w\.\-\_]+@[\w-\.]+\.\w{2,4}|([\+0-9\-\.\s\(\)]){5,18}", "hint_message" => "Du kan logge ind med enten dit mobilnummer eller din email-adresse.", "error_message" => "Det indtastede er ikke et gyldigt mobilnummer eller email-adresse.")); ?>
			<?= $model->input("password", array("type" => "password", "label" => "password", "required" => true, "hint_message" => "Indtast din kode", "error_message" => "Din kode skal være 8-20 tegn.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Log ind", array("class" => "primary", "wrapper" => "li.login")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<h3>Vil du holdes orienteret?</h3>
	<p>
		Det er ingen skam at være nysgerrig - Stopknappen ville ikke være her uden nysherrighed.
		Faktisk så har vi en <a href="/nysgerrig" class="button primary">klub for nysgerrige</a>.
	</p>

</div>
