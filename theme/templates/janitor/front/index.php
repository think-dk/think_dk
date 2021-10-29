<div class="scene front">
	<h1><?= SITE_NAME ?></h1>

	<?= $JML->listOrderStatus() ?>

	<?= $JML->listMemberStatus() ?>

	<?= $JML->listUserTodos() ?>

	<div class="common">
		<h2>Common tasks</h2>

		<ul class="common">
			<li class="account"><h3><a href="/janitor/admin/profile">Your account</a></h3></li>

	<? if($this->validatePath("/janitor/admin/event/list")) { ?>
			<li class="events"><h3><a href="/janitor/admin/event/list">Events</a></h3></li>
	<? } else if($this->validatePath("/janitor/event/admin-list")) { ?>
			<li class="events"><h3><a href="/janitor/event/admin-list">Events</a></h3></li>
	<? } else if($this->validatePath("/janitor/event/host-list")) { ?>
			<li class="events"><h3><a href="/janitor/event/host-list">Your events</a></h3></li>
	<? } ?>

	<? if($this->validatePath("/janitor/admin/post/list")) { ?>
			<li class="events"><h3><a href="/janitor/admin/post/list">Posts</a></h3></li>
	<? } ?>

	<? if($this->validatePath("/janitor/admin/page/list")) { ?>
			<li class="events"><h3><a href="/janitor/admin/page/list">Pages</a></h3></li>
	<? } ?>

		</ul>
	</div>

</div>