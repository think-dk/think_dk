<?php
global $IC;
global $action;
global $itemtype;

$item = $IC->getItem(array("sindex" => $action[0], "extend" => array("tags" => true, "user" => true, "comments" => true, "readstate" => true)));
if($item) {
	$this->sharingMetaData($item);

	$todo_tag = $IC->getTags(array("item_id" => $item["item_id"], "context" => "todo"));
	if($todo_tag) {
		$todos = $IC->getItems(array("status" => 1, "tags" => "todo:".$todo_tag[0]["value"], "itemtype" => "todo", "order" => "todo.deadline DESC, todo.priority DESC", "extend" => true));
	}

	$qna_tag = $IC->getTags(array("item_id" => $item["item_id"], "context" => "qna"));
	if($qna_tag) {
		$qnas = $IC->getItems(array("status" => 1, "tags" => "qna:".$qna_tag[0]["value"], "itemtype" => "qna", "extend" => array("user" => true)));
	}

// DISABLED RELATED TOPICS BECAUSE IT DESTOYS THE FLOW INTENDED FOR THE 
// 	// set related pattern
// 	$related_article_pattern = array("itemtype" => "article", "tags" => $item["tags"], "no_readstate" => true, "exclude" => $item["id"]);
// 	$related_topic_pattern = array("itemtype" => $item["itemtype"], "tags" => $item["tags"], "no_readstate" => true, "exclude" => $item["id"]);
// }
// else {
// 	// itemtype pattern for missing item
// 	$related_article_pattern = array("itemtype" => "article", "no_readstate" => true);
// 	$related_topic_pattern = array("itemtype" => $itemtype, "no_readstate" => true);
}

// // add base pattern properties
// $related_article_pattern["limit"] = 3;
// $related_article_pattern["extend"] = array("tags" => true, "readstate" => true);
//
// $related_topic_pattern["limit"] = 5;
// $related_topic_pattern["extend"] = array("readstate" => true);

// get related items
$related_articles = false; //$IC->getRelatedItems($related_article_pattern);
$related_topics = false; //$IC->getRelatedItems($related_topic_pattern);

?>
<div class="scene stop i:scene">

<? if($item): ?>

	<div class="i:topic topic id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			if(arrayKeyValue($item["tags"], "context", "editing")): ?>
				<li class="editing" title="Denne artikel redigeres stadig"><?= $item["tags"][arrayKeyValue($item["tags"], "context", "editing")]["value"] ?></li>
<?			endif; ?>
<?		endif; ?>
		</ul>

		<h1 itemprop="name"><?= $item["name"] ?></h1>

		<div class="articlebody" itemprop="articleBody">

			<div class="problem">
				<h2 class="problem"><?= $item["problem_headline"] ?></h2>
				<div class="description">
					<?= $item["problem"] ?>
				</div>
			</div>

			<div class="solution">
				<h2 class="solution">Løsningen</h2>
				<div class="description">
					<?= $item["solution"] ?>
				</div>

<?				if($item["details"]): ?>
				<div class="details">
					<h3 class="details">Mere om &quot;<?= $item["name"] ?>&quot;</h3>
					<div class="description">
						<?= $item["details"] ?>
					</div>

<? 					if($related_articles): ?>
					<div class="related">
						<h2>Relaterede artikler</h2>
						<ul class="articles i:articleList">
<?						foreach($related_articles as $article): ?>
							<li class="article item_id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ?>">
								<h3><a href="/artikler/<?= $article["sindex"] ?>"><?= $article["name"] ?></a></h3>
								<p><?= preg_replace("/<br>|<br \/>/", "", $article["subheader"]) ?></p>
							</li>
<?						endforeach; ?>
						</ul>
					</div>
<? 					endif; ?>



				</div>
<? 				endif; ?>


			</div>

		</div>

		<div class="readstate i:readstate item_id:<?= $item["item_id"] ?>"
			data-readstate-update="<?= $this->validPath("/janitor/topic/updateReadstate/".$item["item_id"]) ?>" 
			data-readstate-delete="<?= $this->validPath("/janitor/topic/deleteReadstate/".$item["item_id"]) ?>" 
			data-csrf-token="<?= session()->value("csrf") ?>"
			data-readstate="<?= strtotime($item["readstate"]) ?>"
			>
		</div>


<?		if($todo_tag): ?>
		<div class="todos i:todos item_id:<?= $item["item_id"] ?>"
			data-todo-tag="<?= $todo_tag[0]["value"] ?>"
			data-todo-add="<?= $this->validPath("/janitor/admin/todo/save") ?>" 
			data-todo-edit="<?= $this->validPath("/janitor/admin/todo/edit") ?>"
			data-tag-add="<?= $this->validPath("/janitor/admin/todo/addTag") ?>" 
			data-csrf-token="<?= session()->value("csrf") ?>"
			>
			<h2 class="todos">TODOs til &quot;<?= $item["name"] ?>&quot;</h2>
<?			if($todos): ?>
			<ul class="todos">
<?				foreach($todos as $todo): ?>
				<li class="todo todo_id:<?= $todo["id"] ?>">
					<?= stringOr($HTML->link($todo["name"], "/janitor/admin/todo/edit/".$todo["id"], array("target" => "_blank")), $todo["name"]) ?>
				</li>
<?				endforeach; ?>
			</ul>
<?			else: ?>
			<p>Ingen TODOs</p>
<?			endif; ?>
		</div>
<?		endif; ?>


<?		if($qna_tag): ?>
		<div class="qnas i:qnas item_id:<?= $item["item_id"] ?>" 
			data-qna-tag="<?= $qna_tag[0]["value"] ?>"
			data-question-add="<?= $this->validPath("/janitor/admin/qna/save") ?>" 
			data-qna-edit="<?= $this->validPath("/janitor/admin/qna/edit") ?>"
			data-tag-add="<?= $this->validPath("/janitor/admin/qna/addTag") ?>" 
			data-csrf-token="<?= session()->value("csrf") ?>"
			>
			<h2 class="qnas">Spørgsmål til &quot;<?= $item["name"] ?>&quot;</h2>
<?			if($qnas): ?>
			<ul class="qnas">
<?				foreach($qnas as $qna): ?>
				<li class="qna qna_id:<?= $qna["id"] ?>">
					<ul class="info">
						<li class="user"><?= $qna["user_nickname"] ?></li>
						<li class="created_at"><?= date("Y-m-d, H:i", strtotime($qna["created_at"])) ?></li>
					</ul>
					<p class="question"><?= stringOr($HTML->link($qna["name"], "/janitor/admin/qna/edit/".$qna["id"], array("target" => "_blank")), $qna["name"]) ?></p>
<?					if($qna["answer"]): ?>
					<p class="answer"><?= $qna["answer"] ?></p>
<?					else: ?>
					<p class="answer">Ikke besvaret</p>
<? 					endif; ?>
				</li>
<?				endforeach; ?>
			</ul>
<?			else: ?>
			<p>Ingen spørgsmål endnu</p>
<?			endif; ?>
		</div>
<?		endif; ?>


		<div class="comments i:comments item_id:<?= $item["item_id"] ?>" 
			data-comment-add="<?= $this->validPath("/janitor/page/addComment") ?>" 
			data-csrf-token="<?= session()->value("csrf") ?>"
			>
			<h2 class="comments">Kommentarer til &quot;<?= $item["name"] ?>&quot;</h2>
<?			if($item["comments"]): ?>
			<ul class="comments">
<?				foreach($item["comments"] as $comment): ?>
				<li class="comment comment_id:<?= $comment["id"] ?>">
					<ul class="info">
						<li class="user"><?= $comment["nickname"] ?></li>
						<li class="created_at"><?= date("Y-m-d, H:i", strtotime($comment["created_at"])) ?></li>
					</ul>
					<p class="comment"><?= $comment["comment"] ?></p>
				</li>
<?				endforeach; ?>
			</ul>
<?			else: ?>
			<p>Ingen kommentarer endnu</p>
<?			endif; ?>
		</div>

	</div>


	<p>Tryk på <a href="/stopknappen">Stopknappen</a>.</p>


<? else: ?>


	<h1>Teknologi er tydeligvis ikke svaret på alting</h1>
	<p>
		Vi kunne ikke finde det angivne emne - måske er det flygtet for at undgå verdens undergang :)
		Heldigvis er det ikke det eneste emne om Stopknappen.
	</p>
	<p>Tryk på <a href="/stopknappen">Stopknappen</a>.</p>


<? endif; ?>


<? 	if($related_topics): ?>
	<div class="related">
		<h2>Andre emner</h2>
		<ul class="topics">
	<?		foreach($related_topics as $item): ?>
			<li class="topic">
				<h3><a href="/stopknappen/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			</li>
	<?		endforeach; ?>
		</ul>
	</div>
<? 	endif; ?>


</div>