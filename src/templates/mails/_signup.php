<?php

$subject = "Nysgerrigheden længe leve!";

preg_match("/PASSWORD\:([^\n]+)/", $message, $password_match);
preg_match("/EMAIL\:([^\n]+)/", $message, $email_match);
preg_match("/VERIFICATION\:([^\n]+)/", $message, $verification_match);

if($password_match && $email_match && $verification_match) {
	$password = $password_match[1];
	$email = $email_match[1];
	$verification = $verification_match[1];

	$message = "Tak for din nysgerrighed.\n\n";
	$message .= "Bekræft din tilmelding på linket nedenfor:\n";
	$message .= SITE_URL."/signup/bekræft/email/$email/$verification\n\n";

	$message .= "Du er samtidig oprettet som bruger på ".SITE_URL."\n\n"; 
	$message .= "Dit brugernavn er: $email\n";
	$message .= "Dit password er: $password\n\n";

	$message .= "Hvis du vil ændre din tilmelding eller dit password, kan du gøre det ved at logge ind på sitet.\n\n";

}
else {
	$message = "Der gik noget helt galt!?\n";
	$message .= "Besvar venligst denne email, så vi kan få løst problemet.\n\n";

}

$message .= "Med vilje og tro er vejen kortere,\n\n";
$message .= "think.dk / Stopknappen";

?>