<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:Konfirmation", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}
?>
<div class="scene frios i:frios">

<? if($page_item): ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? 
		$mediae = $IC->filterMediae($page_item, "mediae");
		if($mediae): ?>
		<ul class="images">
			<? foreach($mediae as $media): ?>
			<li><div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div></li>
			<? endforeach; ?>
		<? endif; ?>
		</ul>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/friosfradevoksnes", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>


		<?= $HTML->frontendComments($page_item, "/janitor/admin/page/addComment", [
			"headline" => "Kommentarer",
			"no_comments" => "Ingen kommentarer ... endnu."
		]) ?>

	</div>



<? else:?>

	<div class="article">
		<h1>Fri os fra de voksnes ...</h1>
		<p>This page is currently being updated.</p>
	</div>

<? endif; ?>

	<div class="dictionary">
		<h2>Ord fra vores konfirmations ordbog:</h2>
		<p>
			<strong>Gud</strong> = Vi kan kalde det livet eller universet - ingen ord slår rigtig til: Den tilsyneladende uendelige og ufatteligt intelligente helhed, som står bag den evolution vi bor indeni og som virker gennem os alle. I østen kalder de den samme kraft Bevidstheden.
		</p>
		<p>
			<strong>Konfirmation</strong> = Gud bekræfter, at du er god nok som du er: Der er ikke noget du skal leve op til. Livet har gjort sig utroligt umage med at skabe præcis dig, som du er. Du er Guds gave til helheden. Tak for dig. Vores mål med denne alternative konfirmation er, at du med hver en celle i din krop, mærker at dette er sandt.
		</p>
		<p>
			<strong>Lykke og held</strong> = I dagens Danmark hersker der stor forvirring om, hvad der er lykke og hvad der er held: Vi ønsker hinanden Held og lykke med på vejen, og når der sker noget godt siger vi Tillykke. At disse ord gemmer på dyb visdom tænker vi ikke så meget over. Under dette forløb vil du lære at kende forskel på livets velsignelser (Held) og den lykke som vi alle har adgang til uanset vores situation (Lyksalighed).
		</p>
		<p>
			<strong>Lyksalighed</strong> =  en næsten glemt hemmelighed, der gemmer sig i alle verdensreligioner: Indre fred og frihed i dagligdagen uanset omstændigheder. Den form for lykke, der er ubetinget og aldrig forsvinder.
		</p>
	</div>

	<div class="info_meeting">
		<h2>Mød os og hør mere på et intromøde</h2>
		<p>
			Introduktionsmøder bliver annonceret her meget snart.
		</p>
		<p>
			Alle interesserede er velkomne –
			Skriv til <a href="mailto:tine@think.dk">tine@think.dk</a>, hvis du vil tilmeldes – eller opdateres når vi
			tilføjer nye intromøder til listen.
		<p>
			Møderne foregår i think.dk’s lokaler på Østerbro.
		</p>
		<p>
			Adresse:<br />
			Æbeløgade 4<br />
			2100 København Ø
		</p>
	</div>

	<div class="practicalities">
		<h2>Praktisk info</h2>
		<p>Forløbet foregår i København, på Østerbro, hos think.dk i vores hyggelige lokaler med masser af bløde sofaer :)</p>
		<p>Undervisningen varetages af Johannes og Tine, som I kan læse mere om længere nede på siden. Link</p>
		<p>Forløbet løber fra d. 26. september 2020 til april 2021 og indebærer:</p>
		<ul>
			<li>25 lørdage fra 11.00-13.00</li>
			<li>7 søndage med ekskursioner til forskellige trossamfund, ud i den vilde natur m.m.</li>
			<li>Afslutningsweekend d. 7.-8. maj 2021</li>
			<li>Overgangsritual fredag, afslutningsceremoni med familien lørdag.</li>
			<li>Derefter fest i de respektive familiers regi.</li>
		</ul>
	</div>

	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Som alternativ til konfirmation kan du tilmelde dig forløbet 'Fri os fra de voksnes rækker' ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål :)
		</p>
		<p>
			Kun 1/3 af kostprisen skal egenfinancieres – og forløbet koster derfor kun 3.500 kr./person. Der er også mulighed for at søge om friplads. Se nedenfor.
		</p>
		<p>
			Tilmelding senest 8. maj 2020.
		</p>

		<?= $HTML->formStart("tilmelding", ["class" => "signup labelstyle:inject"]); ?>
			<fieldset>
				<?= $HTML->input("name", ["type" => "string", "label" => "Deltagers navn", "required" => true, "value" => ""]); ?>
				<?= $HTML->input("parentname", ["type" => "string", "label" => "Forælder navn"]); ?>
				<?= $HTML->input("email", ["type" => "email", "label" => "Email", "required" => true]); ?>
				<?= $HTML->input("phone", ["type" => "tel", "label" => "Telefon"]); ?>
				<?= $HTML->input("comment", ["type" => "text", "label" => "Hvorfor vil du gerne deltage?", "required" => true, "class" => "autoexpand"]); ?>
			</fieldset>

			<ul class="actions">
				<?= $HTML->submit("Send", ["class" => "primary", "wrapper" => "li.send"]) ?>
			</ul>
		<?= $HTML->formEnd(); ?>


		<h3>Søg om en friplads</h3>
		<p>
			Engagement og interesse vejer tungest for os, og derfor har vi budgetteret med et antal fripladser til vores alternative
			konfirmationsforberedelsesforløb. 
		</p>
		<p>
			Det vigtigste for os er, at vi får samlet en gruppe unge, der ønsker at indgå i et givende og åbent 
			fællesskab, og som er nysgerrige og kan se værdien i at være med.
		</p>
		<p>
			Hvis du ønsker at søge om en friplads, så angiv dette i din ansøgning og fortæl os om din situation.
		</p>
	</div>

	<div class="people">
		<h2>Undervisere</h2>
		<ul class="items people">
			<li class="item person" data-image-src="/img/friosfradevoksnes/johannes.jpg">
				<h3>Johannes T. Jensen</h3>
				<p>
					Johannes har tidligere trænet og lavet uddannelser for tusindvis af mennesker. I uddannelsesenheden
					i en tænketank uddannede han ledere, meningsdannere og aktivister i at tage ansvar for deres 
					fællesskaber. Siden har han som selvstændig afviklet uddannelser, workshops og foredrag om indre 
					fred og frihed. Samtidig har han fungeret som gæsteunderviser og workshopholder rundt i landets 
					kirkers konfirmationsforberedelsesforløb.
				</p>
				<p>
					Johannes’ undervisning er først og fremmest erfaringsbaseret. Hans kald er: At mennesker erfarer 
					en kærlig indre ro (Lyksalighed) og begynder at leve ud fra den. Undervisningen tager begrebsmæssigt 
					udgangspunkt i Biblen, som han studerer dagligt. Men undervisningen drager også erfaring både fra 5 
					års dedikerede studier af Advaita (Hinduisme), 10 års intens buddhistisk meditationstræning (Dzogchen) 
					og ikke mindst sin Grundtvig-Tidehvervske børnelærdom som søn af to folkekirkepræster og en 
					højskoleforstander på Grundtvigs Højskole. 
				</p>
			</li>
			<li class="item person" data-image-src="/img/friosfradevoksnes/tine.jpg">
				<h3>Tine Gia Rosenkilde Fjeldsted</h3>
				<p>
					Med udgangspunkt i sin interesse for åben, aktiv og engagerende undervisning, kreativitet, 
					selvudfoldelse blev hun kandidat i engelsk og biologi fra Københavns Universitet med gymnasierettet 
					specialisering. Her var det især didaktik, undersøgelsesbaseret undervisning og tværkulturel læring 
					og kommunikation, der fangede interessen.
				</p>
				<p>
					Tine vil assistere Johannes under forløbet og vil derfor være at finde på undervisningsdagene. Hun 
					vil også fungere som kontaktperson for deltagerne og deres forældre, så I er altid velkomne.
				</p>
			</li>
		</ul>
	</div>

	<div class="more_info">
		<h2>Vil du vide mere?</h2>
		<p>
			Du kan tilmelde dig ved at udfylde formularen nederst på siden. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål til forløbet.
		</p>
	</div>

	<div class="help_us">
		<h2>Er du ekspert på teenagere?</h2>
		<p>Vi ved rigtig meget. Men måske ved du noget vi ikke ved?</p>
		<p>
			Vi ønsker at lave det bedst tænkelig forløb, fordi vi mener vi har fat i noget ekstremt vigtigt og 
			har muligheden for at gøre en fundamental forskel i de unges liv.
		</p>
		<p>
			Vi har rig erfaring med at lave engagerende uddannelsesforløb. Vi har stor indsigt i de emner vi gerne 
			vil formidle. Og vi ved også at indgående kendskab til målgruppen er helt afgørende, når man har så høje 
			ambitioner som vi har.
		</p>
		<p>
			Vi kender vores målgruppe ret godt. Men vi vil gerne kende målgruppen endnu bedre.
		</p>
		<ul>
			<li>er du opdateret på den nyeste forskning om unges adfærd?</li>
			<li>har du skrevet om læringsforløb målrettet teenagere?</li>
			<li>sidder du på en anonym rådgivning for unge?</li>
			<li>arbejder du terapeutisk med aldersgruppen 12-17?</li>
			<li>er du lærer i udskolingen med erfaringer, der er vigtige at dele?</li>
			<li>eller har du på anden måde essentiel erfaring med, eller viden om målgruppen?</li>
		</ul>
		<p>
			Hvis du kan hjælpe os med at gøre dette forløb endnu bedre, er du meget velkommen til at henvende dig til 
			Tine. Du kan ringe på tlf 6018 0410 i tidsrummet 17-18 Hvis du ikke kan i det tidsrum kan du sende en sms 
			eller mail på <a href="mailto:tine@think.dk">tine@think.dk</a>.
		</p>
	</div>



</div>