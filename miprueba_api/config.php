<?php

date_default_timezone_set('America/Guatemala');

define('HOME_URL',  'https://purple-valley.com/miprueba_api/');
define('HOME_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/miprueba_api/');

require_once(HOME_ROOT . 'includes/db.php');

$db = new db('localhost','miprueba_db','jc.05,er','miprueba_db');

require_once('includes/functions.php');

?>