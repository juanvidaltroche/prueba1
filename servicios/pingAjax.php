<?php
require('dbVersion02.php');
//LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "PING_NB": 
			$hrr = $_REQUEST["HRR"];
			$nm = $_REQUEST["nm"];
			$timeout = 2;
			$habilitado = "";
			$detalle = "";
			$fp = @fsockopen ($hrr, 81, $errno, $errstr, $timeout);			
			$registro = "";	
			$desde = "";
			LocalInstanciarConexion();
			if ($fp) {
				$sResp = "TRUE";
				$mol =  array();
				$molinete = file_get_contents('http://' . $hrr . ':81/blpcliente/servicios/molineteAjax.php');
				if ($molinete != '') {
					$arr0=(array) json_decode($molinete ,true); 
					$bus = $arr0['LOG_MOLINETE']['0']['LOG_BUS'];					
					$sSQL = "UPDATE mb_netbooks_activas SET NA_BUS = (SELECT TIPO_HERRAMIENTA_ID FROM mb_tipos_herramienta
							WHERE TIPO_HERRAMIENTA_CODIGO = '$bus'), NA_DESDE=NOW(),NA_DETALLE='$molinete' WHERE NA_NOMBRE = '$hrr'";
				}
				else{
					$sSQL = "UPDATE mb_netbooks_activas SET NA_BUS = (SELECT TIPO_HERRAMIENTA_ID FROM mb_tipos_herramienta
							WHERE TIPO_HERRAMIENTA_CODIGO = '$bus'), NA_DESDE=NOW() WHERE NA_NOMBRE = '$hrr'";
				}
				$aRespuestas = LocalExecuteQuery($sSQL);
				$desde = "HOY - ";
			}else{
				$sResp = "FALSE";
			}
			$sSQL = "SELECT * , IF( DATE( NA_DESDE ) = DATE( NOW( ) ) , 'HOY-', '' ) AS DESDE FROM mb_netbooks_activas WHERE NA_NOMBRE = '$hrr'";
			$aRespuestas = LocalExecuteQuery($sSQL);
			LocalCerrarConexion();
			//print_r($aRespuestas);
			foreach ($aRespuestas as $aRow) {
				$arr = (array) json_decode($aRow["NA_DETALLE"] ,true);
				$desdeHoy = $aRow["DESDE"];
				$desde = $desdeHoy . $aRow["NA_DESDE"]; 
			}	

			$habilitado = $arr['LOG_MOLINETE']['0']['LOG_MOLINETE'];
			$registro = $arr['LOG_MOLINETE']['0']['LOG_REGISTRO'];			
			$detalle = "VERSION : " .  $arr['LOG_MOLINETE']['0']['LOG_VERSION'] . " | JSON :" . $arr['LOG_MOLINETE']['0']['LOG_JSON'];
			$dt = date("Y-m-d H:i");

			echo json_encode(array("success" => true, "resultado" => $sResp, "nm" => $nm, "equipo" => $hrr, "hora" => $dt, "molinete" => $habilitado, "registro" => $registro, "detalle" => $detalle,"desde" => $desde,"desdeHoy" => $desdeHoy));
			break;
			
        case "LST": 
			$sLinea = isset($_REQUEST["LINEA"]) ? $_REQUEST["LINEA"] : '' ;
			$sWhere = "";
			if (isset($sLinea) ){
				$sWhere = " WHERE NA_LINEA = '$sLinea' ";
			}
			LocalInstanciarConexion();
			$sSQL = "SELECT RUTA_ID, RUTA_DESCRIPCION
					FROM mb_rutas WHERE RUTA_ID <> 0";
			$aLineas = LocalExecuteQuery($sSQL);

			$sSQL = "SELECT NA_NOMBRE, NA_LINEA, RUTA_DESCRIPCION, TIPO_HERRAMIENTA_CODIGO, 
					CASE NA_DESDE WHEN '0000-00-00 00:00:00' THEN '' ELSE NA_DESDE END AS NA_DESDE
					FROM mb_rutas
					INNER JOIN mb_netbooks_activas ON RUTA_ID = NA_LINEA
					INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = NA_BUS
					$sWhere
					ORDER BY NA_BUS";
			$aRespuestas = LocalExecuteQuery($sSQL);
			LocalCerrarConexion();	
			$sNetbooks = "";
			
			foreach ($aRespuestas as $aRow) {
				$sNetbooks = $sNetbooks . '"' . $aRow["NA_NOMBRE"] . '", ';
			}
			$sNetbooks = substr($sNetbooks,0,strlen($sNetbooks)-2);
			$nMax = sizeof($aRespuestas);
			
			$smarty = new Smarty;
			$smarty->assign("LINEAS", $aLineas); 
			$smarty->assign('HERRAMIENTAS', $aRespuestas);
			$smarty->assign('NETBOOKS', $sNetbooks);
			$smarty->assign('NMAX', $nMax);
			$smarty->display('herramientas.tpl');
			break;
					
			case "pingHora": 
				LocalInstanciarConexion();
				$sSQL = "SELECT now() as hora";
				$aRespuestas = LocalExecuteQuery($sSQL);
				LocalCerrarConexion($aRespuestas);	
				foreach ($aRespuestas as $aRow) {
					$sFechaHora = $aRow["hora"];
			}	
			break;
    }
} catch (Exception $e) {
    echo null;
}
try {
	
} catch (Exception $e) {
    echo null;
}

