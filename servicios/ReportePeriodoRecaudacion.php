<?php
require('db.php');

function rowsGet() {
    $sUsuario = $_SESSION["usr_session"];
    $sSQL = "SELECT * FROM mb_liquidaciones";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    //return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
	return $aResult
}


?>