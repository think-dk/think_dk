<?php
global $IC;
global $action;
global $itemtype;

$sindex = $action[0];


$pagination_pattern = [
	"pattern" => [
		"itemtype" => "project", 
		"status" => 1, 
		"order" => "project.position ASC",
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"readstate" => true,
			"comments" => true
		]
	],
	"sindex" => $sindex,
	"limit" => 1
];


// Get posts
$pagination_items = $IC->paginate($pagination_pattern);


if($pagination_items && $pagination_items["range_items"]) {

	$item = $pagination_items["range_items"][0];
	$this->sharingMetaData($item);


}

?>

<div class="scene project i:project">


<? if($item):
	$media = $IC->sliceMediae($item, "single_media"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> service" itemscope itemtype="http://schema.org/Article"
		data-csrf-token="<?= session()->value("csrf") ?>"
		data-readstate="<?= $item["readstate"] ?>"
		data-readstate-add="<?= security()->validPath("/janitor/admin/profile/addReadstate/".$item["item_id"]) ?>" 
		data-readstate-delete="<?= security()->validPath("/janitor/admin/profile/deleteReadstate/".$item["item_id"]) ?>" 
		>

		<? if($media): ?>
		<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($item, [
			"context" => [$itemtype],
		]) ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= $HTML->articleInfo($item, "/projects/".$item["sindex"], [
			"media" => $media,
			"sharing" => true
		]) ?>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>

			<div class="projectdetails">
				<?= $item["projectdetails"] ?>
			</div>
		</div>



		<?= $HTML->frontendComments($item, "/janitor/project/addComment") ?>

	</div>


	<?= $HTML->frontendPagination($pagination_items, [
		"class" => "pagination i:pagination",
		"type" => "sindex",
		"base_url" => "/projects", 
		"show_total" => false,
		"labels" => ["prev" => "{name}", "next" => "{name}"]
	]) ?>


<? else: ?>


	<h1>Technology clearly doesn't solve everything on it's own.</h1>
	<h2>Technology needs humanity.</h2>
	<p>We could not find the specified service.</p>


<? endif; ?>

</div>
