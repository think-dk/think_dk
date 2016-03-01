<?php
global $action;
global $model;

$type = $action[1];
$username = $action[2];

?>
<div class="scene newsletter i:scene">

	<h1>Tak!</h1>
	<p>Din <?= $type ?>: <?= $username ?>, er hermed bekræftet.</p>

	<p>
		Via <a href="/janitor/admin/profile">Janitor</a> kan du opdatere din profil og annullere din nysgerrighed,
		hvis det skulle blive nødvendigt.
	</p>

	<p>Tak for din nysgerrighed - du hører fra os!</p>
	<!--p>
		Selvom du nu kan kommentere på artiklerne, vil vi godt indrømme
		at Stopknappen udøver censur her på sitet. Hvis du bidrager positivt er du mere end velkommen,
		men hvis ikke, vil vi venligt henstille til at du finder et andet forum.
	</p-->

</div>