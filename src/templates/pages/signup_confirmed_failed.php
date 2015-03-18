<?php
global $action;
global $model;

$type = $action[1];
$username = $action[2];
?>
<div class="scene confirmed i:scene">

	<h1>Hvad??</h1>
	<p>Din <?= $type ?>, <?= $username ?>, kunne IKKE verificeres.</p>

	<p>
		Tjek at linket i emailen er komplet og prøv igen. Hvis du stadig har problemer, så send en email 
		til <a href="mailto:<?= ADMIN_EMAIL ?>?subject=Signup verifikation fejlede for <?= $username ?>"><?= ADMIN_EMAIL ?></a>
		og vi hjælper dig hurtigst muligt med at verificere din tilmelding.
	</p>

</div>