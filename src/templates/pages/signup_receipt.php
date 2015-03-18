<?php
global $action;
global $model;

$email = session()->value("signup_email");
	
?>
<div class="scene signup i:scene">
	<h1>Tak!</h1>
	<p>Du er næsten hjemme.</p>
	<p>
		Vi har sendt en email til <em><?= $email ?></em> med et
		aktiviringslink. Tjek din inbox og klik på linket for at aktivere din nye konto.
	</p>

	<p>På snarligt gensyn.</p>
</div>
