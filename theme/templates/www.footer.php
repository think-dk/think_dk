<? $navigation = $this->navigation("main"); ?>
	</div>

	<div id="navigation">
		<ul class="navigation">
<?		if($navigation): ?>
<?			foreach($navigation["nodes"] as $node): ?>
			<?= $HTML->navigationLink($node); ?>
<?			endforeach; ?>
<?		endif; ?>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<?= $HTML->navigationLink(["link" => "/terms", "name" => "Terms", "classname" => "terms", "target" => false, "fallback" => false]); ?>
		</ul>

		<p>think.dk – <a href="mailto:start@think.dk">start@think.dk</a></p>
	</div>

</div>

</body>
</html>