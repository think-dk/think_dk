<?php
	
$model = new Model();
$username = stringOr(getPost("username"));
	
?>
<div class="scene login i:login">
	<h1>Login</h1>

<?	if(defined("SITE_SIGNUP") && SITE_SIGNUP): ?>
	<p>Not registered yet? <a href="<?= SITE_SIGNUP ?>">Create your account now</a>.</p>
<?	endif; ?>

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
			<?= $model->input("username", array("type" => "string", "label" => "Email or mobile number", "required" => true, "value" => $username, "pattern" => "[\w\.\-\_]+@[\w-\.]+\.\w{2,4}|([\+0-9\-\.\s\(\)]){5,18}", "hint_message" => "You can log in using either your email or mobile number.", "error_message" => "You entered an invalid email or mobile number.")); ?>
			<?= $model->input("password", array("type" => "password", "label" => "Password", "required" => true, "hint_message" => "Type your password", "error_message" => "Your password should be between 8-20 characters.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Log in", array("class" => "primary", "wrapper" => "li.login")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<p>Did you <a href="/login/forgot">forget your password</a>?</p>

</div>
