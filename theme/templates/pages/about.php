<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:about", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}

$itemtype = "person";
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

?>
<div class="scene about i:scene">

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


		<?= $HTML->articleInfo($page_item, "/about", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>


		<?//= $HTML->frontendComments($page_item, "/janitor/admin/page/addComment") ?>

	</div>

<? else:?>

	<h1>About think.dk</h1>
	<p>This page is currently being updated.</p>

<? endif; ?>


<? if($items): ?>
	<div class="teams">
		<h2>Behind the scenes</h2>
		<ul class="items people">
			<? foreach($items as $item): ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if($item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>


</div>