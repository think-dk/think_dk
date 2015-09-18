	</div>

	<div id="navigation">
		<ul>
			<?= $HTML->link("Articles", "/janitor/article/list", array("wrapper" => "li.article")) ?>
			<?= $HTML->link("Topics", "/janitor/topic/list", array("wrapper" => "li.topic")) ?>

			<?= $HTML->link("Pages", "/janitor/page/list", array("wrapper" => "li.page")) ?>

			<?= $HTML->link("Questions", "/janitor/admin/qna/list", array("wrapper" => "li.qna")) ?>
			<?= $HTML->link("TODOs", "/janitor/admin/todo/list", array("wrapper" => "li.todo")) ?>
			<?= $HTML->link("Targets", "/janitor/target/list", array("wrapper" => "li.target")) ?>

			<?= $HTML->link("Navigations", "/janitor/admin/navigation/list", array("wrapper" => "li.navigation")) ?>

			<?= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>
			<?= $HTML->link("Users", "/janitor/admin/user/list", array("wrapper" => "li.user")) ?>
			<?= $HTML->link("Log", "/janitor/admin/log/list", array("wrapper" => "li.logs")) ?>

			<?= $HTML->link("Profile", "/janitor/admin/profile", array("wrapper" => "li.profile")) ?>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="copyright">Janitor, Manipulator, Modulator - parentNode - Copyright 2015</li>
		</ul>
	</div>
</div>

</body>
</html>