<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
LocalInstanciarConexion();

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

try {
	$sBusId = isset($_REQUEST["BUS_ID"]) ? $_REQUEST["BUS_ID"] : "";
	$smarty = new Smarty;	
	$sqlProgramacion ="SELECT DISTINCT MT_PRG_ID, MT_PRG_HRR_ID,MT_PRG_TIPO_MANTENIMIENTO,
  										MT_PRG_OBSERVACION, MT_PRG_REGISTRO
						FROM mb_mt_programacion
						WHERE MT_PRG_ESTADO = 'ACTIVO' AND MT_PRG_HRR_ID = '$sBusId' ORDER BY MT_PRG_REGISTRO DESC 
						LIMIT 10 ";
	
	$programacionRespuesta = LocalExecuteQuery($sqlProgramacion);

	//CONSULTA CON LINEA
	$sqlInformacionBus ="SELECT 	TIPO_HERRAMIENTA_ID, 
									TIPO_HERRAMIENTA_CODIGO,
									NA_LINEA,
									TIPO_HERRAMIENTA_DESCRIPCION, 
									TIPO_HERRAMIENTA_ASIENTOS, 
									TIPO_HERRAMIENTA_ESTADO 
									FROM mb_tipos_herramienta
							INNER JOIN mb_netbooks_activas ON NA_BUS=TIPO_HERRAMIENTA_ID
							WHERE TIPO_HERRAMIENTA_ID = '$sBusId'";
							
	$rpsBus = LocalExecuteQuery($sqlInformacionBus);
	$smarty->assign("PROG_MANTENIMIENTO", $programacionRespuesta);
	$smarty->assign("INFO_BUS", $rpsBus);
	$smarty->assign("ID_BUS", $sBusId);
	$smarty->display('mantenimiento_programar.tpl');	
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();	
