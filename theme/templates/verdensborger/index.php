<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:Verdensborger", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}

$name = getPost("name");
$parentname = getPost("parentname");
$email = getPost("email");
$phone = getPost("phone");
$comment = getPost("comment");

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
		<h3>
			29. marts 2022 – online
		</h3>
		<p>
			Kl. 19:30-20:00 – <a href="/events/verdensborger-infomoede-6">læs mere</a>.
		</p>
		<h3>
			26. april 2022 – online
		</h3>
		<p>
			Kl. 19:30-20:00 – <a href="/events/verdensborger-infomoede-7">læs mere</a>.
		</p>
		<!-- <h3 class="overdue">
			9. juni 2021
		</h3>
		<p class="overdue">
			Kl. 19:00-20:00 – <a href="/events/verdensborger-infomoede-2">læs mere</a>.
		</p> -->

		<p>
			Alle interesserede er velkomne – skriv derfor til <a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du vil være sikker på en plads – eller opdateres når vi
			tilføjer nye intromøder til listen. 
		</p>
		<p>
			Møderne foregår enten <a href="https://meet.jit.si/verdensborger">online</a> eller hos Relational Spaces.
		</p>
		<p>
			Adresse:<br />
			Ryesgade 15<br />
			2200 København N
		</p>
	</div>

	<div class="practicalities">
		<h2>Praktisk info</h2>
		<p>Forløbet foregår i København, hos think.dk</p>

		<h3>2021/2022</h3>
		<p>Det nuværende forløb, fra oktober 2021 til maj 2022 er fuldt booket og i fuld gang.</p>
		<ul>
			<li>16 lørdage fra 10.00-12.00.</li>
			<li>1 lørdag fra 10:00 til 16:00.</li>
			<li>Ingen lektioner i skolernes ferier.</li>
			<li>Debatinspirerende oplæg eller tur, hver lørdag, efterfulgt af dialog med de unge.</li>
			<li>Afslutningsweekend med overgangsritual og ceremoni i maj 2022.</li>
		</ul>
		
		<h3>2022/2023</h3>
		<p>Næste forløb, fra oktober 2022 til maj 2023 er åbent for tilmelding.</p>
		<p>Vi har startet planlægningen, og forløbet vil ligne det vi lige nu er i gang med – bare bedre. Det der ligger helt fast er:</p>
		<ul>
			<li>Et antal lørdage, fra kl. 10.</li>
			<li>Ingen lektioner i skolernes ferier.</li>
			<li>Debatinspirerende oplæg eller tur, hver lørdag, efterfulgt af dialog med de unge.</li>
			<li>Afslutningsweekend med overgangsritual og ceremoni i maj 2023.</li>
		</ul>
	</div>

	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Du kan tilmelde dig forløbet <em>Verdensborger</em> ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål :)
		</p>
		<p>
			Standardprisen for Verdensborger konfirmationsforløbet 2021/2022 er 7.500,- kr. pr. deltager. Der er 12 pladser på hvert hold. 
			Prisen for forløbet 2022/2023 er vi i gang med at regne ud.
		</p>

		<?= $HTML->formStart("tilmelding", ["class" => "signup labelstyle:inject"]); ?>
			<?= $HTML->serverMessages() ?>
			<fieldset>
				<?= $HTML->input("name", ["type" => "string", "label" => "Deltagers navn", "required" => true, "value" => $name]); ?>
				<?= $HTML->input("parentname", ["type" => "string", "label" => "Forælder navn", "value" => $parentname]); ?>
				<?= $HTML->input("email", ["type" => "email", "label" => "Email", "required" => true, "value" => $email]); ?>
				<?= $HTML->input("phone", ["type" => "tel", "label" => "Telefon", "required" => true, "value" => $phone]); ?>
				<?= $HTML->input("comment", ["type" => "text", "label" => "Hvorfor vil du gerne deltage?", "class" => "autoexpand", "value" => $comment]); ?>
			</fieldset>

			<ul class="actions">
				<?= $HTML->submit("Send", ["class" => "primary", "wrapper" => "li.send"]) ?>
			</ul>
		<?= $HTML->formEnd(); ?>


		<!--h3>Fra 1.000,- til 8.000,- kr.?</h3>
		<p>
			Den formelle pris på dette forløb er 4.500,- kr., men vi ønsker at forløbet skal være tilgængeligt for familier og unge fra alle 
			indkomstgrupper. Derfor har vi lavet en fleksibel prismodel, der tilgodeser alle. Vi opfordrer dem der kan til at betale lidt ekstra, 
			for at dem der ikke har så meget også kan være med. Lad os blot høre hvad der er den rigtige pris for dig.
		</p>
		<p>
			Det vigtigste for os er, at vi får samlet en gruppe unge, der ønsker at indgå i et givende og åbent 
			fællesskab, og som er nysgerrige og kan se værdien i at være med.
		</p-->
	</div>

	<div class="more_info">
		<h2>Vil du vide mere?</h2>
		<p>
			Du kan tilmelde dig ved at udfylde formularen her på siden. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål til forløbet.
		</p>
	</div>

</div>