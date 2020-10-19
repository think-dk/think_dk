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
			<li class="terms"><a href="/terms">Terms</a></li>
		</ul>

		<p>think.dk – Charlotte Ammundsens Plads 3, 1359 København K – <a href="mailto:start@think.dk">start@think.dk</a></p>
	</div>

</div>

</body>
</html>