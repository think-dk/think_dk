<?php
global $action;
global $model;

$email = session()->value("signup_email");
	
?>
<div class="scene newsletter i:scene">
	<h1>Velkommen til de nysgerriges klub</h1>
	<p>
		Stopknappen har sendt en email på <em><?= $email ?></em> med et aktiveringslink.
		Den håber du er nysgerrig nok til at klikke på det - ellers får du ingen opdateringer.
	</p>
	<p>
		Der er også oprettet en bruger til dig. Koden finder du også 
		i den tilsendte email - men du kan først logge ind, når du har klikket på aktiveringslinket.
	</p>

	<p>På gensyn.</p>
</div>
