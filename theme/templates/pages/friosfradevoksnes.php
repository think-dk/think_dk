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


		<div class="signup">
			<h2>Tilmelding</h2>

			<p>
				Du kan tilmelde dig ved at udfylde formularen herunder. Du er også meget velkommen til at skrive til os på 
				<a href="mailto:start@think.dk?subject=Fri%20os%20fra%20de%20voksnes">start@think.dk</a>, hvis du har spørgsmål :)
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
				Engagement og interesse vejer tungest for os, og derfor har vi budgetteret med et antal fripladser. 
				Det vigtigste for os er, at vi får samlet en gruppe unge, der ønsker at indgå i et givende og åbent 
				fællesskab, og som er nysgerrige og kan se værdien i at være med.
			</p>
			<p>
				Hvis du ønsker at søge om en friplads, så angiv dette i din ansøgning og fortæl os om din situation.
			</p>
		</div>

		<?= $HTML->frontendComments($page_item, "/janitor/admin/page/addComment") ?>

	</div>



<? else:?>

	<div class="article">
		<h1>Fri os fra de voksnes ...</h1>
		<p>This page is currently being updated.</p>
	</div>

<? endif; ?>

	<div class="people">
		<h2>Undervisere</h2>
		<ul class="items people">
			<li class="item person" data-image-src="/img/friosfradevoksnes/johannes.jpg">
				<h3>Den fortabte præstesøn vender hjem</h3>
				<p>
					Johannes T. Jensen har tidligere trænet og lavet uddannelser for tusindvis af mennesker. 
					Dels som organisationsansvarlig ansat på Christiansborg, dels i uddannelsesenheden i en 
					tænketank uddannede han ledere, meningsdannere, aktivister i at tage ansvar for deres 
					fællesskaber. Siden har han som selvstændig afviklet uddannelser, workshops og foredrag om 
					indre fred, frihed og lyksalighed. Samtidig har han fungeret som gæsteunderviser og 
					workshopholder i konfirmationsforberedelsesforløb rundt i landets kirker.
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