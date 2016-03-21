<?php
global $action;
global $model;

$IC = new Items();
$page = $IC->getItem(array("tags" => "page:signup", "extend" => array("user" => true, "mediae" => true)));


$this->sharingMetaData($page);


// in case of signup failure, empty password field
$model->setProperty("password", "value", "");

?>
<div class="scene signup i:signup">

<? if($page && $page["status"]): 
	$media = $IC->sliceMedia($page); ?>
	<div class="article i:article id:<?= $page["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
			<p>Image: <a href="/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/500x.<?= $media["format"] ?>"><?= $media["name"] ?></a></p>
		</div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page["name"] ?></h1>

		<? if($page["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page["user_nickname"] ?></li>
			<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/curious" ?></li>
			<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
				<ul class="publisher_info">
					<li class="name" itemprop="name">think.dk</li>
					<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					</li>
				</ul>
			</li>
			<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
			<? if($media): ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Sign up</h1>
	<h2>Become a member of think.dk</h2>
<? endif; ?>

	<p>Add information about membership types</p>

	<?= $model->formStart("save", array("class" => "labelstyle:inject")) ?>
		<p>
			Type you name, email and password below.
		</p>

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
			<?= $model->input("nickname", array("label" => "Dit navn", "required" => true, "hint_message" => "Indtast dit navn.", "error_message" => "Det indtastede er ikke en gyldigt.")); ?>
			<?= $model->input("email", array("label" => "Din email", "required" => true, "hint_message" => "Indtast din email-adresse.", "error_message" => "Det indtastede er ikke en gyldig email-adresse.")); ?>
			<?= $model->input("password", array("required" => true, "hint_message" => "Indtast dit nye password.", "error_message" => "Dit password skal være mellem 8 og 20 tegn.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Sign up", array("class" => "primary", "wrapper" => "li.signup")) ?>
		</ul>
	<?= $model->formEnd() ?>

	<p>
		When you sign up for think.dk, you'll receive a activation email with a confimation link. 
		The sign up is only completed after you have clicked the link and activated your account.
	</p>
	<p class="note">
		If you don't receive the activation email, please check your spam folder, before contacting us.
	</p>

</div>
