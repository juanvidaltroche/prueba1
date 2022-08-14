<?php
include "../servicios/db.php";
/*session_start(); 
include "../constantes.php";

if (!isset($_SESSION['usr_session']))
    header("location:index.php");
*/
    $sSQL = " SELECT * 
              FROM MB_LIQUIDACIONES L
			  ORDER BY 1";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
	list($nLen, $aData) = array(sizeof($aResult), array_slice($aResult, 1, 500));
    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
?>
<html>
<head>
	 
</head>
<body>

</body>
</html>