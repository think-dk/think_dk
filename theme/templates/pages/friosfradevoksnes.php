<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:Fri os fra de voksnes", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

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


		<?= $HTML->frontendComments($page_item, "/janitor/admin/page/addComment") ?>

	</div>



<? else:?>

	<div class="article">
		<h1>Fri os fra de voksnes ...</h1>
		<p>This page is currently being updated.</p>
	</div>

<? endif; ?>


	<div class="help">
		<h2>Er du ekspert på teenagere?</h2>
		<p>Klik her</p>
	</div>

	
	<div class="signup">
		<h2>Tilmelding</h2>

		<p>
			Som alternativ til konfirmation kan du tilmelde dig ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål :)
		</p>
		<p>
			Forløbet koster 3000 kr/person. Der er dog mulighed for at søge om friplads. Se nedenfor.
		</p>
		<p>
			Tilmelding senest 8. maj 2020.
		</p>

		<?= $HTML->formStart("tilmelding", ["class" => "signup labelstyle:inject"]); ?>
			<fieldset>
				<?= $HTML->input("name", ["type" => "string", "label" => "Deltagers navn", "required" => true]); ?>
				<?= $HTML->input("parentname", ["type" => "string", "label" => "Forælder navn"]); ?>
				<?= $HTML->input("email", ["type" => "email", "label" => "Email", "required" => true]); ?>
				<?= $HTML->input("phone", ["type" => "tel", "label" => "Telefon"]); ?>
				<?= $HTML->input("comment", ["type" => "text", "label" => "Hvorfor vil du gerne deltage?", "required" => true, "class" => "autoexpand"]); ?>
			</fieldset>

			<ul class="actions">
				<?= $HTML->submit("Send", ["class" => "primary"]) ?>
			</ul>
		<?= $HTML->formEnd(); ?>


		<h3>Søg om en friplads</h3>
		<p>
			Engagement og interesse vejer tungest for os, og derfor har vi budgetteret med et antal fripladser til vores alternative
			konfirmationsfoberedelsesforløb. 
		</p>
		<p>
			Det vigtigste for os er, at vi får samlet en gruppe unge, der ønsker at indgå i et givende og åbent 
			fællesskab, og som er nysgerrige og kan se værdien i at være med.
		</p>
		<p>
			Hvis du ønsker at søge om en friplads, så angiv dette i din ansøgning og fortæl os om din situation.
		</p>
	</div>
	

	<div class="info_meeting">
		<h2>Mød os og hør mere på et intromøde</h2>
		<p>
			Onsdag d. 4 marts <br />kl. 19.30 - 20.30
		</p>
		<p>
			Søndag d. 8 marts <br />kl. 13.30 - 14.30
		</p>
		<p>
			Møderne foregår i think.dk’s lokaler på Østerbro. Alle interesserede er velkomne til at møde op.
		</p>
		<p>
			Adresse:<br />
			Æbeløgade 4<br />
			2100 København Ø
		</p>
	</div>

	<div class="more_info">
		<h2>Vil du vide mere?</h2>
		<p>
			Du kan tilmelde dig ved at udfylde formularen nederst på siden. Du er også meget velkommen til at skrive til os på 
			<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål til forløbet.
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




</div>