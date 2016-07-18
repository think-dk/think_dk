	</div>

	<div id="navigation">
		<ul class="navigation">
			<li class="content">
				<h3>Content</h3>
				<ul class="subjects">
					<?= $HTML->link("Posts", "/janitor/admin/post/list", array("wrapper" => "li.post")) ?>
					<?= $HTML->link("Articles", "/janitor/admin/article/list", array("wrapper" => "li.article")) ?>
					<?= $HTML->link("Pages", "/janitor/admin/page/list", array("wrapper" => "li.page")) ?>
					<?= $HTML->link("Services", "/janitor/service/list", array("wrapper" => "li.service")) ?>
					<?= $HTML->link("Events", "/janitor/admin/event/list", array("wrapper" => "li.event")) ?>
					<?= $HTML->link("TODOs", "/janitor/admin/todo/list", array("wrapper" => "li.todo")) ?>
					<?= $HTML->link("Wishes", "/janitor/admin/wish/list", array("wrapper" => "li.wish")) ?>
					<?= $HTML->link("People", "/janitor/admin/person/list", array("wrapper" => "li.person")) ?>
					<?= $HTML->link("Memberships", "/janitor/admin/membership/list", array("wrapper" => "li.membership")) ?>
				</ul>
			</li>
			<li class="site">
				<h3>Site</h3>
				<ul class="subjects">
					<?= $HTML->link("Navigations", "/janitor/admin/navigation/list", array("wrapper" => "li.navigation")) ?>
					<?= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>
					<?= $HTML->link("Log", "/janitor/admin/log/list", array("wrapper" => "li.logs")) ?>
				</ul>
			</li>
			<li class="users">
				<h3>Users</h3>
				<ul class="subjects">
					<?= $HTML->link("Users", "/janitor/admin/user/list", array("wrapper" => "li.user")) ?>
					<?= $HTML->link("Groups", "/janitor/admin/user/group/list", array("wrapper" => "li.usergroup")) ?>
					<?= $HTML->link("Members", "/janitor/admin/user/member/list", array("wrapper" => "li.member")) ?>
					<?//= $HTML->link("Subscribers", "/janitor/admin/user/subscriber/list", array("wrapper" => "li.subscriber")) ?>
					<?= $HTML->link("Profile", "/janitor/admin/profile", array("wrapper" => "li.profile")) ?>
				</ul>
			</li>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="totop"><a href="#header">To top</a></li>
		</ul>

		<p class="copyright">Copyright 2016, parentNode.dk</p>
	</div>
</div>

</body>
</html>