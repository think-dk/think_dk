<?php
/**
* This file contains definitions
*
* @package Config
*/
header("Content-type: text/html; charset=UTF-8");
error_reporting(E_ALL);

define("VERSION", "0.7.9.2");
define("UI_BUILD", "20231124-150203");

define("SITE_UID", "TNK");
define("SITE_NAME", "think.dk");
define("SITE_URL", (isset($_SERVER["HTTPS"]) ? "https" : "http")."://".$_SERVER["SERVER_NAME"]);
define("SITE_EMAIL", "start@think.dk");

define("DEFAULT_PAGE_DESCRIPTION", "Energize change");
define("DEFAULT_PAGE_IMAGE", "/img/logo-large.png");

define("DEFAULT_LANGUAGE_ISO", "EN");
define("DEFAULT_COUNTRY_ISO", "DK");
define("DEFAULT_CURRENCY_ISO", "DKK");

define("SITE_LOGIN_URL", "/login");

define("SITE_SIGNUP", "1");
define("SITE_SIGNUP_URL", "/signup");

define("SITE_ITEMS", true);

define("SITE_SHOP", true);
define("SHOP_ORDER_NOTIFIES", "martin@think.dk");

define("SITE_SUBSCRIPTIONS", true);

define("SITE_MEMBERS", true);

define("SITE_COLLECT_NOTIFICATIONS", 50);

define("SITE_PAYMENT_REGISTER_INTENT", SITE_URL."/shop/payment-gateway/{GATEWAY}/register-intent");
define("SITE_PAYMENT_REGISTER_PAID_INTENT", SITE_URL."/shop/payment-gateway/{GATEWAY}/register-paid-intent");

