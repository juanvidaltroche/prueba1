<?php
require '../lib/smarty/Smarty.class.php';

try {
	$smarty = new Smarty;
	$smarty->display('index4.tpl');
} catch (Exception $e) {
    echo null;
}

