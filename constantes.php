<?php
$aVars = explode('/', $_SERVER["REQUEST_URI"]);
define("RAIZ", "/" . $aVars[1] . "/");
?>
