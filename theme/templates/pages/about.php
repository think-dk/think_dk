<?
global $action;
global $IC;

$page_item = $IC->getItem(array("tags" => "page:about", "status" => 1, "extend" => array("comments" => true, "user" => true, "mediae" => true, "tags" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}

$itemtype = "person";
$daily_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "tags" => "person:daily", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
$volunteer_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "tags" => "person:volunteer", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

$board_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "tags" => "person:board", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));
$owner_items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "tags" => "person:owner", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));

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


<? if($daily_items || $volunteer_items || $board_items || $owner_items): ?>
	<div class="teams">
		<h2>Behind the scenes</h2>

		<? if($daily_items): ?>
		<h3>Daily operations / Primary contacts</h3>
		<ul class="items people">
			<? foreach($daily_items as $item): ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h4 itemprop="name" class="fn name"><?= $item["name"] ?></h4>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if(0 && $item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
		<? endif; ?>

		<? if($volunteer_items): ?>
		<h3>Volunteers</h3>
		<ul class="items people">
			<? foreach($volunteer_items as $item): ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if(0 && $item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
		<? endif; ?>

		<? if($board_items): ?>
		<h3>The Board</h3>
		<ul class="items people">
			<? foreach($board_items as $item): ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">think.dk</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if(0 && $item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
		<? endif; ?>

		<? if($owner_items): ?>
		<h3>Owners</h3>
		<ul class="items people">
			<? foreach($owner_items as $item): ?>
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
		<? endif; ?>

	</div>
<? endif; ?>


</div>