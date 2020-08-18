<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:Verdensborger", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}
?>
<div class="scene verdensborger i:verdensborger">

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
		<h1>Verdensborger ...</h1>
		<p>This page is currently being updated.</p>
	</div>

<? endif; ?>

	<div class="konfirmation">
		<h2>Konfirmation og Nonfirmation</h2>
		<p class="note">
			Konfirmation er en tradition i Danmark, hvor 7.-8. klasseselever ofte spenderer timevis i 
			præstegården, ofte blot for at få en fest med masser af gaver.
		</p>
		<p class="note">
			Nonfirmation er en begyndende tradition i Danmark, hvor 7.-8. klasseselever springer ritualet og dannelsesrejsen over og blot får en fest med masser af gaver.
		</p>
		<p class="note">Vi forstår at festen er vigtig, 
			men overgangen fra barndommen til det gryende voksenliv er vigtigere, og vi ønsker brændende at 
			klæde de unge bedre på til denne nye og udfordrende fase af deres liv.
		</p>
	</div>

	<div class="info_meeting">
		<h2>Mød os og hør mere på et intromøde</h2>
		<p>
			Introduktionsmøder bliver annonceret her meget snart.
		</p>
		<p>
			Alle interesserede er velkomne –
			Skriv til <a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du vil tilmeldes – eller opdateres når vi
			tilføjer nye intromøder til listen.
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
		<p>Forløbet foregår i København, hos think.dk i vores hyggelige lokaler med masser af bløde sofaer :)</p>
		<p>Forløbet løber fra d. 3. oktober 2020 til april 2021 og indebærer:</p>
		<ul>
			<li>22 lørdage fra 11.00-13.00</li>
			<li>1 weekend med overnatning</li>
			<li>Afslutningsweekend d. 7.-8. maj 2021</li>
			<li>Overgangsritual fredag, afslutningsceremoni med familien lørdag.</li>
			<li>Derefter fest i de respektive familiers regi.</li>
		</ul>
	</div>

	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Som alternativ til konfirmation kan du forhåndstilmelde dig forløbet 'Verdensborger' ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Verdensborger">start@think.dk</a>, hvis du har spørgsmål :)
		</p>
		<p>
			Kun 1/3 af kostprisen skal egenfinancieres – og forløbet koster derfor kun 4.500 kr./person. Der er også mulighed for at søge om friplads. Se nedenfor.
		</p>
		<p>
			Tilmelding senest 1. oktober 2020.
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

	<div class="more_info">
		<h2>Vil du vide mere?</h2>
		<p>
			Du kan tilmelde dig ved at udfylde formularen her på siden. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål til forløbet.
		</p>
	</div>

</div>