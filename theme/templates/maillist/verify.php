<?php
global $action;
// global $model;

$UC = new User();
$username = session()->value("signup_email");

$IC = new Items();
$page_item = $IC->getItem(array("tags" => "page:verify", "extend" => array("user" => true, "tags" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

?>
<div class="scene verify i:verify_maillist">

<? if($username): ?>

	<? if($page_item && $page_item["status"]): 
		$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/maillist/verify", [
			"media" => $media, 
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

	<? else:?>

	<h1>Almost there ...</h1>
	<h2>We have sent you a verification email</h2>
	<p>The email contains a verification code which you need to type in the input field below. If you don't see our mail in your inbox, maybe try to look in your spam folder.</p>
	<h3>Please enter the verification code:</h3>
	<? endif ?>

	<?= $UC->formStart("/maillist/confirm", ["class" => "verify_code labelstyle:inject"]) ?>

<?	if(message()->hasMessages(array("type" => "error"))): ?>
		<p class="errormessage">
<?		$messages = message()->getMessages(array("type" => "error"));
		message()->resetMessages();
		foreach($messages as $message): ?>
			<?= $message ?><br>
<?		endforeach;?>
		</p>
<?	endif; ?>

		<fieldset>
			<?= $UC->input("verification_code"); ?>
		</fieldset>

		<ul class="actions">
			<?= $UC->submit("Verify email", array("class" => "primary", "wrapper" => "li.verify")) ?>
		</ul>
	<?= $UC->formEnd() ?>

	<p class="note">This step is required to receive our newsletter.</p>

<? else: ?>

	<h1>Apologies</h1>
	<h2>It took too long</h2>
	<p>We lost track of your credentials. Please validate your emailadress by using the link in the verification email we sent.</p>

<? endif; ?>
</div>
