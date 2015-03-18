<?
global $itemtype;
global $IC;

$page = $IC->getItem(array("tags" => "page:om-stopknappen", "extend" => array("tags" => true, "comments" => true, "user" => true)));
$todo_tag = $IC->getTags(array("item_id" => $page["item_id"], "context" => "todo"));

if($todo_tag) {
	$todos = $IC->getItems(array("status" => 1, "tags" => "todo:".$todo_tag[0]["value"], "itemtype" => "todo", "order" => "todo.deadline DESC, todo.priority DESC", "extend" => true));
}
?>
<div class="scene about i:scene">

	<div class="article id:<?= $page["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<h1 itemprop="name"><?= $page["name"] ?></h1>
		<h2 itemprop="alternateName"><?= $page["subheader"] ?></h2>
	
		<!--dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page["published_at"])) ?>"><?= date("Y-m-d", strtotime($page["published_at"])) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author"><?= $page["user_nickname"] ?></dd>
		</dl-->
	
		<div class="articlebody" itemprop="articleBody">
			<?= $page["html"] ?>
		</div>

	</div>


<? if($this->validatePath("/janitor/page/addComment")): ?>
	<div class="comments i:comments item_id:<?= $page["item_id"] ?>" 
		data-comment-add="<?= $this->validPath("/janitor/page/addComment") ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<h2 class="comments">Kommentarer til &quot;<?= $page["name"] ?>&quot;</h2>
<?	if($page["comments"]): ?>
		<ul class="comments">
<?		foreach($page["comments"] as $comment): ?>
			<li class="comment comment_id:<?= $comment["id"] ?>">
				<ul class="info">
					<li class="user"><?= $comment["nickname"] ?></li>
					<li class="created_at"><?= date("Y-m-d, H:i", strtotime($comment["created_at"])) ?></li>
				</ul>
				<p class="comment"><?= $comment["comment"] ?></p>
			</li>
<?		endforeach; ?>
		</ul>
<?	else: ?>
		<p>Ingen kommentarer endnu</p>
<?	endif; ?>
	</div>
<?	endif; ?>

</div>