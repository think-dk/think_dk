<?
global $action;
global $IC;

$page = $IC->getItem(array("tags" => "page:about", "extend" => array("comments" => true, "user" => true, "mediae" => true)));
?>
<div class="scene about i:scene">

<? if($page && $page["status"]): 
	$media = $IC->sliceMedia($item); ?>
	<div class="article i:article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page["name"] ?></h1>

		<? if($page["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage"><?= SITE_URL."/about" ?></li>
			<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
				<ul class="publisher_info">
					<li class="name" itemprop="name">think.dk</li>
					<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					</li>
				</ul>
			</li>
			<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
			<? if($media): ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page["html"] ?>
		</div>
		<? endif; ?>


		<div class="comments i:comments item_id:<?= $page["item_id"] ?>" 
			data-comment-add="<?= $this->validPath("/janitor/admin/page/addComment") ?>" 
			data-csrf-token="<?= session()->value("csrf") ?>"
			>
			<h2 class="comments">Comments for &quot;<?= $page["name"] ?>&quot;</h2>
			<? if($page["comments"]): ?>
			<ul class="comments">
				<? foreach($page["comments"] as $comment): ?>
				<li class="comment comment_id:<?= $comment["id"] ?>" itemprop="comment" itemscope itemtype="https://schema.org/Comment">
					<ul class="info">
						<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($comment["created_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($comment["created_at"])) ?></li>
						<li class="author" itemprop="author"><?= $comment["nickname"] ?></li>
					</ul>
					<p class="comment" itemprop="text"><?= $comment["comment"] ?></p>
				</li>
				<? endforeach; ?>
			</ul>
			<? else: ?>
			<p>No comments yet</p>
			<? endif; ?>
		</div>

	</div>



<? else:?>

	<h1>About think.dk</h1>
	<p>This page is currently being updated.</p>

<? endif; ?>

</div>