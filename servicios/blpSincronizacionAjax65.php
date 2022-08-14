<?php
require('dbVersion01.php');
function doTransactionSqlRemota($arrayConsultasSql)
{
	$respuestaMySqlGlobal = 1;//operacion exitosa en MySql
	instanciarConexionRemota();
	doExecuteQueryRemota("SET AUTOCOMMIT=0");
	doExecuteQueryRemota("START TRANSACTION" );
	

	foreach ($arrayConsultasSql as $elemento) {
		echo "<font color=red>".$elemento."</font>";
		$respuestaMySqlIndividual = doExecuteQueryRemota($elemento);
		if($respuestaMySqlIndividual == 0)
		{
			$respuestaMySqlGlobal = 0;
		}
	}

	if($respuestaMySqlGlobal == 1)
	{
		doExecuteQueryRemota("COMMIT" );
	}
	else
	{
		doExecuteQueryRemota("ROLLBACK");
	}
	doCerrarConexionRemota();
}

//============================================================================================================ ejecucion de codigo y funciones

$arrayConsultas = array();

$query = "INSERT INTO `sa_grupos`( `GRUPO_DESCRIPCION`) VALUES ('jjjjjj');";
$arrayConsultas[] = $query;

$query = "INSERT INTO `sa_grupos`( `GRUPO_DESCRIPCION`) VALUES ('jjjjjj');";
$arrayConsultas[] = $query;
$query = "INSERT INTO `sa_grupos`( `GRUPO_DESCRIPCION`) VALUES ('jjjjjj');";
$arrayConsultas[] = $query;


$query = "SELECT * FROM `sa_grupos`";
$arrayConsultas[] = $query;
doTransactionSqlRemota($arrayConsultas);
//echo $arrayConsultas[1]
?>
