<?
global $itemtype;
global $IC;

$page = $IC->getItem(array("tags" => "page:stopknappen", "extend" => array("tags" => true, "comments" => true)));
$todo_tag = $IC->getTags(array("item_id" => $page["item_id"], "context" => "todo"));

if($todo_tag) {
	$todos = $IC->getItems(array("status" => 1, "tags" => "todo:".$todo_tag[0]["value"], "itemtype" => "todo", "order" => "todo.deadline DESC, todo.priority DESC", "extend" => true));
}

// topic items
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => array("tags" => true, "readstate" => true)));


?>
<div class="scene stop i:stop">

	<div class="article id:<?= $page["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<h1 itemprop="name"><?= $page["name"] ?></h1>
	
		<div class="articlebody" itemprop="articleBody">
			<h4>Manifest</h4>
			<h2><?= $page["subheader"] ?></h2>
	
			<?= $page["html"] ?>
		</div>

	</div>

	<ul class="topics">
<?	foreach($items as $item): ?>
		<li class="topic item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ?>">
			<h3><a href="/stopknappen/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
		</li>
<?	endforeach; ?>
	</ul>

<?	if($todo_tag): ?>
	<div class="todos i:todos item_id:<?= $page["item_id"] ?>"
		data-todo-tag="<?= $todo_tag[0]["value"] ?>"
		data-todo-add="<?= $this->validPath("/janitor/admin/todo/save") ?>" 
		data-todo-edit="<?= $this->validPath("/janitor/admin/todo/edit") ?>" 
		data-tag-add="<?= $this->validPath("/janitor/admin/todo/addTag") ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<h2 class="todos">TODOs til &quot;<?= $page["name"] ?>&quot;</h2>
<?		if($todos): ?>
		<ul class="todos">
<?			foreach($todos as $todo): ?>
			<li class="todo todo_id:<?= $todo["id"] ?>">
				<?= stringOr($HTML->link($todo["name"], "/janitor/admin/todo/edit/".$todo["id"], array("target" => "_blank")), $todo["name"]) ?>
			</li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>Ingen TODOs</p>
<?		endif; ?>
	</div>
<?	endif; ?>


	<div class="comments i:comments item_id:<?= $page["item_id"] ?>" 
		data-comment-add="<?= $this->validPath("/janitor/page/addComment") ?>" 
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<h2 class="comments">Kommentarer til &quot;<?= $page["name"] ?>&quot;</h2>
<?	if($page["comments"]): ?>
		<ul class="comments">
<?			foreach($page["comments"] as $comment): ?>
			<li class="comment comment_id:<?= $comment["id"] ?>">
				<ul class="info">
					<li class="user"><?= $comment["nickname"] ?></li>
					<li class="created_at"><?= date("Y-m-d, H:i", strtotime($comment["created_at"])) ?></li>
				</ul>
				<p class="comment"><?= $comment["comment"] ?></p>
			</li>
<?			endforeach; ?>
		</ul>
<?	else: ?>
		<p>Ingen kommentarer endnu</p>
<?	endif; ?>
	</div>

</div>