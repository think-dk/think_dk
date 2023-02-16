<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:verdensborger", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}

$name = getPost("name");
$parentname = getPost("parentname");
$email = getPost("email");
$phone = getPost("phone");
$comment = getPost("comment");

?>
<div class="scene verdensborger i:verdensborger" lang="DA">

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
			Kært barn har mange navne – Konfirmation, Nonfirmation, alternativ, borgerlig eller humanistisk konfirmation – overgangsritual og dannelsesrejse. 
			Alt sammen udspringer de af ønsket om at markere overgangen fra barn til tidlig voksen og ritualet har af gode grunde eksisteret i mere end 1000 år. 
			Det markerer nemlig en både meget vigtig og meget svær overgang i vores liv.
		</p>
		<p class="note">
			Konfirmation har været en tradition i Danmark siden 1736, hvor 7.-8. klasseselever bekræfter dåben, gennem en kirkelig handling, udført i regi af folkekirken eller lignende.
		</p>
		<p class="note">
			Nonfirmation er en begyndende tradition i Danmark, hvor 7.-8. klasseselever, i mange tilfælde, springer ritualet og dannelsesrejsen over og blot markerer overgangen fra barn til voksen med en fest.
		</p>
		<p class="note">Vi forstår at festen er vigtig, 
			men overgangen fra barndommen til det gryende voksenliv er vigtigere, og vi ønsker brændende at 
			klæde de unge bedre på til denne nye og udfordrende fase af deres liv.
		</p>
		<p class="note">
			Vi kalder Verdensborger forløbet for en alternativ konfirmation – vi bekræfter lysten til livet, vores forståelse af os selv og vores omverden og vores vilje til at tage ansvar for vores eget liv.
		</p>
	</div>

	<div class="info_meeting">
		<h2>Mød os og hør mere på et intromøde</h2>
		<h3 class="overdue">
			16. februar 2023 – online
		</h3>
		<p class="overdue">
			Kl. 19:30-20:00 – <a href="/events/verdensborger-infomoede-14">læs mere</a>.
		</p>
		<h3>
			23. februar 2023 – online
		</h3>
		<p>
			Kl. 19:30-20:00 – <a href="/events/verdensborger-infomoede-15">læs mere</a>.
		</p>
		<!--h3 class="overdue">
			25. april 2022 – online
		</h3>
		<p class="overdue">
			Kl. 19:30-20:00 – <a href="/events/verdensborger-infomoede-7">læs mere</a>.
		</p-->


		<p>
			Alle interesserede er velkomne – skriv meget gerne til <a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a> hvis I ønsker at deltage. 
		</p>
		<p>
			Intromøderne foregår <a href="https://meet.jit.si/verdensborger">online</a>.
		</p>
	</div>

	<div class="practicalities">
		<h2>Praktisk info</h2>
		<p>I 2023 starter vi også et hold på Stevns.</p>
		<p>Forløbet foregår derfor på to hold, ét i København og ét på Stevns.</p>

		<h3>2023/2024</h3>
		<p>Næste forløb, fra oktober 2023 til maj 2024 er åbent for tilmelding.</p>
		<ul>
			<li>1 lørdag fra 10:00 til 16:00 – inkl. tur til Xjump.</li>
			<li>11 lørdage, fra kl. 10 til 13.</li>
			<li>Afslutningsweekend med overgangsritual og ceremoni i maj 2024.</li>
			<li>Ingen lektioner i skolernes ferier.</li>
			<li>Debatinspirerende oplæg eller tur, efterfulgt af dialog med de unge.</li>
			<li>Endelige datoer er ikke fastlagt – skriv eller ring for mere information.</li>
		</ul>


		<h3>2022/2023</h3>
		<p>Forløbet er i gang og afsluttes i maj 2023. Forløbet er lukket for nye tilmeldinger.</p>

		<h3>2021/2022</h3>
		<p>Forløbet er afsluttet med konfirmation i 2022.</p>

		<h3>2020/2021</h3>
		<p>Forløbet er afsluttet med konfirmation i 2021.</p>

	</div>

	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Du kan tilmelde dig forløbet <em>Verdensborger</em> ved at udfylde formularen herunder.
		</p>
		<p>
			Standardprisen for Verdensborger konfirmationsforløbet 2023/24 er 6.500,- kr. pr. deltager. Der er 12 pladser på hvert hold. Vi ønsker at alle kan være med, uanset økonomisk situation – der kan derfor ansøges om deltagelse til reduceret pris. Kontakt os for mere information.
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
		
		<p>
			Du er også meget velkommen til at skrive til os på 
						<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål :)
		</p>


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