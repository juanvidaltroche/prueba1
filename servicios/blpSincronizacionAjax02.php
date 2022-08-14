<?php
//require('db.php');//solo para las variables de session al parecer 
session_start();
require('dbVersion02.php');
require('../config.php');//german

$LqdActivos = "(";
$result=true;

function doGenerarConsultaSql($arrayValores,$sSQL) {
		
		$jsRowsInsertar = "";
		foreach ($arrayValores as $v1) {
			$registro= "(";
			foreach ($v1 as $v2) {
				$registro = $registro."'".$v2."', ";
				//echo "</br>cadena base datos local : ".$registro."</br>";
			}
			$registro = substr($registro, 0, strlen ( $registro)-2);
			$jsRowsInsertar =$jsRowsInsertar.$registro."),";
			//echo $registro."\n";
		}
		$jsRowsInsertar = substr($jsRowsInsertar, 0, strlen ( $jsRowsInsertar)-1);
		//echo $jsRowsInsertar;
		$sSQL = $sSQL.$jsRowsInsertar.";";
		return ($sSQL);
}//fin funcion rosInsert




function RetornaInsertArmadoParaEjecutar($sSQL01,$sSQL)
{
	$aResult = LocalExecuteQuery($sSQL01);//davvv
    $sCadenaSqlGiro = doGenerarConsultaSql($aResult,$sSQL);
	return ($sCadenaSqlGiro);
}


function doLlenarLiquidacionTmp() {
	$anfitrion= $_SESSION["idUsuario"];
	$queryGrupo="SELECT DISTINCT TRX_GIRO_ID
				FROM MB_TRXS_TMP WHERE TRX_ESTADO = 'ACTIVO' AND TRX_USUARIO = '".$_SESSION["usr_session"]."'";
  
	$rGrupos = LocalExecuteQuery($queryGrupo);
	
	//while ($rowG = mysqli_fetch_assoc($rGrupos)) {
	foreach ($rGrupos as $rowG ){
		$idGiro=$rowG["TRX_GIRO_ID"];
		echo "</br><font color='green'>".$idGiro."</font></br>";
		
		
		
		
		
		echo "<font color='red'>'$anfitrion'</font>";
		//$idHerramienta= $_SESSION["usr_session"];
		$idHerramienta= trim( obtenerHRR("../config.json"));//warming
		$usuario= $_SESSION["usr_session"];
		
		//77777777777777
		$dFecha = date("Y-m-d");
		//77777777777777
		
		$queryInsertLiquidacionTmp = "INSERT INTO MB_LIQUIDACIONES_TMP (LQD_PRG_ID, LQD_ANFITRION, LQD_HRR_ID, LQD_GIRO_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_REGISTRO, LQD_USUARIO) 
							VALUES (
							(SELECT PRG_ID
							FROM MB_PROGRAMACIONES 
							WHERE PRG_ESTADO = 'ACTIVO' AND PRG_REGISTRO = '".$dFecha."'
							ORDER BY PRG_REGISTRO DESC, PRG_MODIFICACION DESC
							LIMIT 1 ),
							'".$anfitrion."','".$idHerramienta."','".$idGiro."',(SELECT SUM( TARIFA_MONTO ) AS TOTAL
							FROM MB_TRXS_TMP
							INNER JOIN MB_TARIFAS ON TARIFA_TIPO_PASAJE_ID = TRX_TIPO_PASAJE_ID
							WHERE TRX_ESTADO = 'ACTIVO' AND TRX_USUARIO = '".$_SESSION["usr_session"]."'
							 AND TRX_PRG_ID = (
							SELECT PRG_ID
							FROM MB_PROGRAMACIONES
							WHERE PRG_ESTADO = 'ACTIVO'
							AND PRG_REGISTRO = '".$dFecha."'
							ORDER BY PRG_REGISTRO DESC , PRG_MODIFICACION DESC
							LIMIT 1 )
							AND TRX_GIRO_ID =".$idGiro."),'NO','INGRESO','".$dFecha."','".$usuario."')";
			
			
		//executeInsert($queryInsertLiquidacionTmp,NOMBRE_BASE_DATOS_LOCAL);
		$idGenerado = LocalSqlInsertRetornaIdGenerado($queryInsertLiquidacionTmp,"MB_LIQUIDACIONES_TMP");
		global $LqdActivos;
		$LqdActivos = $LqdActivos.$idGenerado.",";
		
		echo "  ultimo id : ".$idGenerado."</br>";	
  
	}
	global $LqdActivos;
	$LqdActivos = substr($LqdActivos, 0, strlen ( $LqdActivos)-1);
	$LqdActivos = $LqdActivos.")";
	echo "ids_liquidacion: ".$LqdActivos;
		
}//fin doLlenarLiquidacionTmp


	
	LocalInstanciarConexion();
	$ConjuntoConsultasSqlDeLaTransaccion = array();
	
	//n************************************* giros

	$sSQL01 = "SELECT  GIRO_ID , GIRO_PRG_ID ,  GIRO_CONDUCTOR_ID ,  GIRO_RECAUDADOR_ID ,  GIRO_SALE ,  GIRO_LLEGA ,  GIRO_REGISTRO ,  GIRO_MODIFICACION ,  GIRO_USUARIO ,  GIRO_ESTADO 
			FROM  mb_giros_tmp 
			WHERE  GIRO_ESTADO  = 'ACTIVO' ";
			
	$sSQL = "INSERT INTO mb_giros ( GIRO_ID, GIRO_PRG_ID ,  GIRO_CONDUCTOR_ID ,  GIRO_RECAUDADOR_ID ,  GIRO_SALE ,  GIRO_LLEGA ,  GIRO_REGISTRO ,  GIRO_MODIFICACION ,  GIRO_USUARIO ,  GIRO_ESTADO ) 
							VALUES ";
							
    $respuestaGiro = RetornaInsertArmadoParaEjecutar($sSQL01,$sSQL);
	$ConjuntoConsultasSqlDeLaTransaccion[] =$respuestaGiro;
	//************************************** transacciones
	$sSQL01 = "SELECT  TRX_GIRO_ID , TRX_PRG_ID ,  TRX_TIPO_PASAJE_ID ,  TRX_NRO_TARJETA ,  TRX_NRO_FACTURA ,  TRX_PARADA_ID ,  TRX_REGISTRO ,  TRX_MODIFICACION ,  TRX_USUARIO ,  TRX_ESTADO 
				FROM  mb_trxs_tmp 
				WHERE  TRX_ESTADO  = 'ACTIVO' ";
			
	$sSQL = "INSERT INTO mb_trxs (  TRX_GIRO_ID , TRX_PRG_ID ,  TRX_TIPO_PASAJE_ID ,  TRX_NRO_TARJETA ,  TRX_NRO_FACTURA ,  TRX_PARADA_ID ,  TRX_REGISTRO ,  TRX_MODIFICACION ,  TRX_USUARIO ,  TRX_ESTADO ) VALUES ";
							
    $respuestaTrxs = RetornaInsertArmadoParaEjecutar($sSQL01,$sSQL);
	$ConjuntoConsultasSqlDeLaTransaccion[] =$respuestaTrxs;
	//n************************************* liquidaciones
	doLlenarLiquidacionTmp();
	$sSQL01 = "SELECT  LQD_ANFITRION ,  LQD_PRG_ID , LQD_HRR_ID ,  LQD_GIRO_ID ,  LQD_MONTO ,  LQD_CONFIRMADO ,  LQD_FLUJO ,  LQD_REGISTRO ,  LQD_MODIFICACION ,  LQD_USUARIO ,  LQD_ESTADO  
				FROM  mb_liquidaciones_tmp  
				WHERE  LQD_ESTADO  = 'ACTIVO' ";
			
	$sSQL = "INSERT INTO  mb_liquidaciones  (  LQD_ANFITRION , LQD_PRG_ID , LQD_HRR_ID ,  LQD_GIRO_ID ,  LQD_MONTO ,  LQD_CONFIRMADO ,  LQD_FLUJO ,  LQD_REGISTRO ,  LQD_MODIFICACION ,  LQD_USUARIO ,  LQD_ESTADO ) VALUES ";
							
    $respuestaLqd = RetornaInsertArmadoParaEjecutar($sSQL01,$sSQL);
	$ConjuntoConsultasSqlDeLaTransaccion[] = $respuestaLqd;
	
	//n************************************* TRUNCATE TABLE
	
	
	$respuestaTransaccion = RemotoTransactionSql($ConjuntoConsultasSqlDeLaTransaccion);
		
	if($respuestaTransaccion)
	{	
		$sSQL01 = "UPDATE mb_giros_tmp SET GIRO_ESTADO  = 'INACTIVO'";
		LocalExecuteQuery($sSQL01);
		$sSQL01 = "UPDATE mb_trxs_tmp SET TRX_ESTADO  = 'INACTIVO' ";
		LocalExecuteQuery($sSQL01);
		$sSQL01 = "UPDATE mb_liquidaciones_tmp SET LQD_ESTADO  = 'INACTIVO' WHERE LQD_ID IN".$LqdActivos;
		LocalExecuteQuery($sSQL01);
	
	}else
	{
		$sSQL01 = "UPDATE mb_liquidaciones_tmp SET LQD_ESTADO  = 'SINCRO FALLIDA' WHERE LQD_ID IN ".$LqdActivos;
		
		echo "</br>dddddd: ".$sSQL01."</br>";
		LocalExecuteQuery($sSQL01);
	}
	
	
LocalCerrarConexion();

if($respuestaTransaccion) {
?>
	<SCRIPT LANGUAGE="JavaScript">
		alert('Sincronizacion Exitosa.');
		
	</SCRIPT>
<?php
}
else {
?>
	<SCRIPT LANGUAGE="JavaScript">
		alert('Sincronizacion Fallida.');
		
	</SCRIPT>
<?php
}
?>
	