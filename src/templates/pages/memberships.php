<?php
global $action;
global $model;

$IC = new Items();
$page_item = $IC->getItem(array("tags" => "page:memberships", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$email = $model->getProperty("email", "value");

$subscriptions = $IC->getItems(array("itemtype" => "subscription", "order" => "position ASC", "status" => 1, "extend" => array("price" => true)));
?>
<div class="scene signup i:memberships">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($page_item["tags"]):
			$editing_tag = arrayKeyValue($page_item["tags"], "context", "editing");
			if($editing_tag !== false): ?>
		<ul class="tags">
			<li class="editing" title="This page is work in progress"><?= $page_item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $page_item["tags"][$editing_tag]["value"] ?></li>
		</ul>
			<? endif; ?>
		<? endif; ?>

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page_item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page_item["modified_at"])) ?>"></li>
			<li class="author" itemprop="author"><?= $page_item["user_nickname"] ?></li>
			<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/memberships" ?>"></li>
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
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page_item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Sign up</h1>
<? endif; ?>


<? if($subscriptions): ?>
	<div class="subscriptions">
		<ul class="subscriptions">
	<? foreach($subscriptions as $subscription): ?>
			<li class="subscription<?= $subscription["classname"] ? " ".$subscription["classname"] : "" ?>" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
				<h3 itemprop="name"><?= $subscription["name"] ?></h3>
				<dl class="offer">
					<dt class="currency">Currency</dt>
					<dd class="currency" itemprop="priceCurrency"><?= $subscription["price"]["currency"] ?></dd>
					<dt class="price">Price</dt>
					<dd class="price" itemprop="price" content="<?= $subscription["price"]["price"] ?>"><?= $subscription["price"]["formatted_price"] ?><?= $subscription["price"]["price"] ? " / Month" : "" ?></dd>
					<dt class="url">More info</dt>
					<dd class="url" itemprop="url"><?= SITE_URL."/memberships" ?></dd>
				</dl>
				<div class="articlebody" itemprop="description">
					<?= $subscription["html"] ?>
				</div>
			</li>
	<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>



	<?= $model->formStart("save", array("class" => "signup labelstyle:inject")) ?>

<?	if(message()->hasMessages(array("type" => "error"))): ?>
		<p class="errormessage">
<?		$messages = message()->getMessages(array("type" => "error"));
		message()->resetMessages();
		foreach($messages as $message): ?>
			<?= $message ?><br>
<?		endforeach;?>
		</p>
<?	endif; ?>

<?	if($subscriptions): ?>
		<fieldset class="subscriptions i:subscriptions">
			<div class="field radiobuttons required">
				<? foreach($subscriptions as $option): ?>
				<div class="item<?= $option["classname"] ? " ".$option["classname"] : "" ?>" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
					<input type="radio" name="subscription" id="input_subscription_<?= $option["item_id"] ?>" value="<?= $option["item_id"] ?>" />
					<label itemprop="name" for="input_subscription_<?= $option["item_id"] ?>"><?= $option["name"] ?></label>
					<dl class="offer">
						<dt class="currency">Currency</dt>
						<dd class="currency" itemprop="priceCurrency"><?= $option["price"]["currency"] ?></dd>
						<dt class="price">Price</dt>
						<dd class="price" itemprop="price" content="<?= $option["price"]["price"] ?>"><?= $option["price"]["formatted_price"] ?><?= $option["price"]["price"] ? " / Month" : "" ?></dd>
						<dt class="url">More info</dt>
						<dd class="url" itemprop="url"><?= SITE_URL."/memberships" ?></dd>
					</dl>
				</div>
				<? endforeach; ?>
				<div class="help">
					<div class="error">Please select a membership</div>
				</div>
			</div>
		</fieldset>
<?	endif; ?>

		<fieldset>
			<?= $model->input("newsletter", array("type" => "hidden", "value" => "curious")); ?>
			<?= $model->input("email", array("label" => "Your email", "required" => true, "value" => $email, "hint_message" => "Type your email.", "error_message" => "You entered an invalid email.")); ?>
			<?= $model->input("password", array("hint_message" => "Type your new password - or leave it blank and we'll generate one for you.", "error_message" => "Your password must be between 8 and 20 characters.")); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Join", array("class" => "primary", "wrapper" => "li.signup")) ?>
		</ul>
	<?= $model->formEnd() ?>

</div>
