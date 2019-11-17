<?php
global $action;
global $model;

$IC = new Items();
$page_item = $IC->getItem(array("tags" => "page:verify", "status" => 1, "extend" => array("user" => true, "tags" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

?>
<div class="scene verify i:verify_shop">

<? if($page_item): 
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


		<?= $HTML->articleInfo($page_item, "/verify/confirm/receipt", [
			"media" => $media, 
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

<? else:?>

	<h1>Please verify your email address ...</h1>
	<h2>We have sent you a verification email</h2>
	<p>The email contains a verification code which you need to type in the input field below. If you don't see our email in your inbox, maybe try to look in your spam folder.</p>

	<h3>Please enter the verification code:</h3>

<? endif ?>

	<?= $model->formStart("/shop/verify/confirm", ["class" => "verify_code labelstyle:inject"]) ?>

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
			<?= $model->input("verification_code"); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Verify email", array("class" => "primary", "wrapper" => "li.verify")) ?>
			<li class="skip"><a href="/shop/verify/skip" class="button">Skip</a></li>
		</ul>
	<?= $model->formEnd() ?>

	<p class="note">You can also skip verification for now and go straight to checkout – but you need to verify your account to receive any news from us or log in to your account.</p>

	<h3>Why do I need to verify my email?</h3>
	<p>
		We want to be sure we have the right email address in order for us to send order confirmation emails and receipts 
		to you.
	</p>
	<p>
		If you sign up for a membership we will send you a welcome mail with more information about your
		membership. If you have purchased tickets, we will also send the tickets in an email.
	</p>

</div>
