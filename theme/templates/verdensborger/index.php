<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:Verdensborger", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}
?>
<div class="scene verdensborger i:verdensborger" lang="da">

<? if($page_item):
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/verdensborger", [
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
		<h1>Verdensborger ...</h1>
		<p>This page is currently being updated.</p>
	</div>

<? endif; ?>

	<div class="konfirmation">
		<h2>Konfirmation og Nonfirmation</h2>
		<p class="note">
			Konfirmation har været en tradition i Danmark siden 1736, hvor 7.-8. klasseselever bekræfter dåben, gennem en kirkelig handling, udført i regi af folkekirken.
		</p>
		<p class="note">
			Nonfirmation er en begyndende tradition i Danmark, hvor 7.-8. klasseselever i mange tilfælde springer ritualet og dannelsesrejsen over og blot markere overgangen fra barn til voksen med en fest
		</p>
		<p class="note">Vi forstår at festen er vigtig, 
			men overgangen fra barndommen til det gryende voksenliv er vigtigere, og vi ønsker brændende at 
			klæde de unge bedre på til denne nye og udfordrende fase af deres liv.
		</p>
	</div>

	<div class="info_meeting">
		<h2>Mød os og hør mere på et intromøde</h2>
		<h3 class="overdue">
			6. september 2020
		</h3>
		<p class="overdue">
			Kl. 19:30-20:30 – <a href="/events/verdensborger-intromoede">læs mere</a>.
		</p>
		<h3 class="overdue">
			20. september 2020
		</h3>
		<p class="overdue">
			Kl. 19:30-20:30 – <a href="/events/verdensborger-intromoede-1">læs mere</a>.
		</p>
		<h3 class="overdue">
			11. oktober 2020
		</h3>
		<p class="overdue">
			Kl. 19:30-20:30 – <a href="/events/verdensborger-infomoede">læs mere</a>.
		</p>
		<h3>
			18. oktober 2020
		</h3>
		<p>
			Kl. 19:30-20:30 – <a href="/events/verdensborger-infomoede-1">læs mere</a>.
		</p>
		<p>
			Alle interesserede er velkomne –
			Bemærk at grundet Corona, er der begrænsninger på hvor mange vi kan samles – skriv derfor til <a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du vil være sikker på en plads – eller opdateres når vi
			tilføjer nye intromøder til listen. 
		</p>
		<p>
			Møderne foregår i think.dk’s lokaler.
		</p>
		<p>
			Adresse:<br />
			Charlotte Ammundsens Plads 3<br />
			1359 København K
		</p>
	</div>

	<div class="practicalities">
		<h2>Praktisk info</h2>
		<p>Forløbet foregår i København, hos think.dk</p>
		<p>Forløbet løber fra d. 24. oktober 2020 til 8. maj 2021 og indebærer:</p>
		<ul>
			<li>14 lørdage fra 10.00-12.00 (24/10, 7/11, 14/11, 21/11, 5/12, 12/12, 16/1, 23/1, 30/1, 27/2, 6/3, 20/3, 10/4, 24/4).</li>
			<li>1 lørdag fra 10:00 til 20:00 (30/10).</li>
			<li>Ingen lektioner i skolernes ferier.</li>
			<li>Debatinspirerende oplæg eller tur, hver lørdag, efterfulgt af dialog med de unge.</li>
			<li>Afslutningsweekend den 7.-8. maj 2021.</li>
			<li>Overgangsritual fredag den 7. maj.</li>
			<li>Afslutningsceremoni med familien lørdag den 8. maj.</li>
			<li>Derefter fest i de respektive familiers regi.</li>
		</ul>
		<h3>Corona information</h3>
		<p>
			Forløbet gennemføres i Kulturhuset Indre By under skarp hensynstagen til Corona-situationen. 
			Vi har rigtig god plads og alle forholdsregler på plads, så vi kan gennemfører forløbet, også selvom der sker yderligere skærpelse af forsamlingsreglerne.
		</p>
	</div>

	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Du kan tilmelde dig forløbet <em>Verdensborger</em> ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål :)
		</p>
		<p>
			Forløbet koster fra 1000,- til 8.000,- kr. pr. deltager. Se nedenfor.
		</p>
		<p>
			Tilmelding senest 19. oktober 2020.
		</p>

		<?= $HTML->formStart("tilmelding", ["class" => "signup labelstyle:inject"]); ?>
			<fieldset>
				<?= $HTML->input("name", ["type" => "string", "label" => "Deltagers navn", "required" => true, "value" => ""]); ?>
				<?= $HTML->input("parentname", ["type" => "string", "label" => "Forælder navn"]); ?>
				<?= $HTML->input("email", ["type" => "email", "label" => "Email", "required" => true]); ?>
				<?= $HTML->input("phone", ["type" => "tel", "label" => "Telefon", "required" => true]); ?>
				<?= $HTML->input("comment", ["type" => "text", "label" => "Hvorfor vil du gerne deltage?", "class" => "autoexpand"]); ?>
			</fieldset>

			<ul class="actions">
				<?= $HTML->submit("Send", ["class" => "primary", "wrapper" => "li.send"]) ?>
			</ul>
		<?= $HTML->formEnd(); ?>


		<h3>Fra 1.000,- til 8.000,- kr.?</h3>
		<p>
			Den formelle pris på dette forløb er 4.500,- kr., men vi ønsker at forløbet skal være tilgængeligt for familier og unge fra alle 
			indkomstgrupper. Derfor har vi lavet en fleksibel prismodel, der tilgodeser alle. Vi opfordrer dem der kan til at betale lidt ekstra, 
			for at dem der ikke har så meget også kan være med. Lad os blot høre hvad der er den rigtige pris for dig.
		</p>
		<p>
			Det vigtigste for os er, at vi får samlet en gruppe unge, der ønsker at indgå i et givende og åbent 
			fællesskab, og som er nysgerrige og kan se værdien i at være med.
		</p>
	</div>

	<div class="more_info">
		<h2>Vil du vide mere?</h2>
		<p>
			Du kan tilmelde dig ved at udfylde formularen her på siden. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål til forløbet.
		</p>
	</div>

</div>