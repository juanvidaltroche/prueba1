<?php
session_start();
define('SW_TIPO_CONEXION', 'SQL_SERVER');
//================================================================== constantes
define('BLPINVENTARIO','http://gmlpsr0082:9090/blpInventario');
// define('REMOTO_IP_SERVIDOR','192.168.27.37');
define('REMOTO_IP_SERVIDOR','gmlppc50007');
define('REMOTO_USUARIO','root');
define('REMOTO_PASSWORD','');
define('REMOTO_NOMBRE_BASE_DATOS', 'gps_externo');

define('LOCAL_IP_SERVIDOR','localhost');
define('LOCAL_USUARIO','root');
define('LOCAL_PASSWORD','SRVpksimgepuads');
define('LOCAL_NOMBRE_BASE_DATOS', 'cobro_buses_origen');

//-SQL SERVER --

define('DB_SERVER2', 'astra'); //Server
define('DB_BASE2', 'gps_replica'); //Base de datos
define('DB_USR2', 'gps_replica'); //Usuario de la base de datos
define('DB_PASS2', 'gps_replica123'); //Password del usuario de la base de datos

//======================================================================================== variables globales
$connRemota = "";
$connLocal = "";
$connSqlServer = "";

//========================================================================================= funciones
function conectarsebda()
{
    //connection to the database
    global $connSqlServer;
    $connectionoptions = array(
        "Database" => DB_BASE2,
        "UID" => DB_USR2,
        "PWD" => DB_PASS2,
		"CharacterSet" => "UTF-8",		
        "MultipleActiveResultSets" => '0'
    );
    if (!($connSqlServer = sqlsrv_connect(DB_SERVER2, $connectionoptions))) {
        echo "Error conectando a la base de datos.";
        exit();
    }
    //return $conn;  
}
function Apostrofe($campo){
	$sCampo = mysqli_real_escape_string($connLocal, $campo);
	return $sCampo;
}

function desconectarsea()
{
    global $connSqlServer;
    sqlsrv_close($connSqlServer);
}

function ejecutarConsultaa($sql) //RETORNA Falso CUANDO CUANDO NO SE EJECUTA LA CONSULTA
{
    global $connSqlServer;
    $result = sqlsrv_query($connSqlServer, $sql);
    if (!$result)
        return false;
    else
        return $result;
}

function consulta_en_arraya($sql)
{
    global $connSqlServer;
    $cont         = 0;
    $result_array = array();    
    $result = sqlsrv_query($connSqlServer, $sql);	
    if ($result === false) {
        echo "<font color='red'>ERROR : " . $sql . "</font>";
        die();        
    } else {
        while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
            $result_array[$cont] = $row;
            $cont++;
        }
        return $result_array;
    }    
}

function modificaCampos($sql)
{  	
    global $connSqlServer;
    $cont         = 0;
    $result_array = array();    
    $result = sqlsrv_query($connSqlServer, $sql);
	$result = sqlsrv_query($connSqlServer, $sql);	
    if ($result === false) {
        echo "<font color='red'>ERROR : " . $sql . "</font>";
        die();        
    } else {
        while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
            $result_array[$cont] = $row;
            $cont++;
        }
        return $result_array;
    }    
}

function EjecutarQuerySqlServerMySql($consultaSql)
{
    $result_array = array();
    switch (SW_TIPO_CONEXION) {
        case "MYSQL":            
            $result_array = LocalExecuteQuery($consultaSql);            
            break;
        case "SQL_SERVER":           
            $query30      = $consultaSql;
            $result_array = consulta_en_arraya($query30);           
            break;
    }
    return $result_array;
}
function EjecutarQuerySqlServer($consultaSql)
{
    $result_array = array();           
            $query30      = $consultaSql;
            $result_array = consulta_en_arraya($query30);           
         
    return $result_array;
}

//--------------------------------
function RemotoInstanciarConexion()
{
	global $connRemota;
	$connRemota = mysqli_connect(REMOTO_IP_SERVIDOR, REMOTO_USUARIO, REMOTO_PASSWORD, REMOTO_NOMBRE_BASE_DATOS);
	/* check connection */
	if (mysqli_connect_errno()) {
		printf("Conexion Fallida: %s\n", mysqli_connect_error());
		exit();
	}
}

function RemotoInstanciarConexionRetornaRespuesta()
{
	global $connRemota;
	$connRemota = mysqli_connect(REMOTO_IP_SERVIDOR, REMOTO_USUARIO, REMOTO_PASSWORD, REMOTO_NOMBRE_BASE_DATOS);
	/* check connection */
	if (mysqli_connect_errno()) {
		printf("Conexion Fallida: %s\n", mysqli_connect_error());
		//exit();
		return(0);
	}
	return (1);
}
function LocalInstanciarConexionSQLSERVER()
{
    //2013-11-14
    switch (SW_TIPO_CONEXION) {
        case "MYSQL":
            LocalInstanciarConexionMysql();
            break;
        case "SQL_SERVER":
            conectarsebda();
            break;
    }
}


function LocalInstanciarConexion()
{
	global $connLocal;
	$connLocal = mysqli_connect(LOCAL_IP_SERVIDOR, LOCAL_USUARIO, LOCAL_PASSWORD, LOCAL_NOMBRE_BASE_DATOS);
	/* check connection */
	if (mysqli_connect_errno()) {
		printf("Conexion Fallida: %s\n", mysqli_connect_error());
		exit();
	}
}

function LocalExecuteQuery($consultaSql)
{	
	global $connLocal;
	//echo "LOCAL-Ejecutar --> ".$consultaSql."</br>";
	$r = array();
	if ($result = mysqli_query($connLocal, $consultaSql)) {
		switch ($result)
		{
			case '1':
				//insert,update, ....
				return ($result);
				break;
			default;
				// select.
				/* fetch associative array */
				while ($row = mysqli_fetch_assoc($result)) {
					$r[] = $row; 
				}
				/* free result set */
				mysqli_free_result($result);
				return ($r);
				break;
		}
	}
	else
	{
	  return (0);
	}	
}

function LocalExecuteQueryRecuperaID($consultaSql)
{	
	global $connLocal;	
	$r = array();
	if ($result = mysqli_query($connLocal, $consultaSql)) {
	 $sUltimoId = mysqli_insert_id($connLocal);				
				return ($sUltimoId);	
	}
	else
	{
	  return (0);
	}	
}

function RemotoExecuteQuery($consultaSql)
{	
	global $connRemota;
	//echo "REMOTO-Ejecutar --> ".$consultaSql."</br>";
	$r = array();
	if ($result = mysqli_query($connRemota, $consultaSql)) {
		switch ($result)
		{
			case '1':
				//insert,update, ....
				return ($result);
				break;
			default;
				// select.
				/* fetch associative array */
				while ($row = mysqli_fetch_assoc($result)) {
					$r[] = $row; 
				}
				/* free result set */
				mysqli_free_result($result);
				return ($r);
				break;
		}
	}
	else
	{
	  return (0);
	}	
}

function doGenerarJsonRespuesta($arrayRespuesta, $IndiceInicio, $CantidadRegistros)
{
	switch($arrayRespuesta)
	{
		case 0:
			echo json_encode(array("success" => false));
		break;
		case 1:
			echo json_encode(array("success" => true));
		break;
		default:
			list($nLen, $aData) = array(sizeof($arrayRespuesta), array_slice($arrayRespuesta, $IndiceInicio, $CantidadRegistros));
			echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
		break;
	}
}

function LocalCerrarConexion()
{
	global $connLocal; 
	mysqli_close($connLocal);
}


function RemotoCerrarConexion()
{
	global $connRemota;
	mysqli_close($connRemota);
}

function RemotoTransactionSql($arrayConsultasSql)
{
	$respuestaMySqlGlobal = 1;//operacion exitosa en MySql
	$existeConexionRemota = RemotoInstanciarConexionRetornaRespuesta();
	if(!$existeConexionRemota)
	{
		return 0;
	}
	RemotoExecuteQuery("SET AUTOCOMMIT=0");
	RemotoExecuteQuery("START TRANSACTION" );
	

	foreach ($arrayConsultasSql as $elemento) {
		echo "<font color=red>".$elemento."</font>";
		$respuestaMySqlIndividual = RemotoExecuteQuery($elemento);
		if($respuestaMySqlIndividual == 0)
		{
			$respuestaMySqlGlobal = 0;
		}
	}

	if($respuestaMySqlGlobal == 1)
	{
		RemotoExecuteQuery("COMMIT" );
	}
	else
	{
		RemotoExecuteQuery("ROLLBACK");
	}
	RemotoCerrarConexion();
	return($respuestaMySqlGlobal);
}

function RemotoSqlInsertRetornaIdGenerado($consultaSqlInsert, $NombreTabla)
{	
	global $connRemota;
	$IdGenerado = -1;
	if ($result = mysqli_query($connRemota, $consultaSqlInsert)) {
		
		$queryGrupo="SELECT LAST_INSERT_ID() as ULTIMO_ID_INGRESADO_CONEXION_ACTUAL
					FROM ".$NombreTabla."  
					LIMIT 1";
		
		if ($result = mysqli_query($connRemota, $queryGrupo)) {

			/* fetch associative array */
			while ($row = mysqli_fetch_assoc($result)) {
				$IdGenerado = $row["ULTIMO_ID_INGRESADO_CONEXION_ACTUAL"];
			}
			/* free result set */
			mysqli_free_result($result);
			return ($IdGenerado);
		}
		else
		{
			return (-1);
		}		
	}
	else
	{
	  return (-2);
	}
	
}

function LocalSqlInsertRetornaIdGenerado($consultaSqlInsert, $NombreTabla)
{	
	global $connLocal;
	$IdGenerado = -1;
	echo "</br><font color='brown'>".$consultaSqlInsert."</font></br>";
	if ($result = mysqli_query($connLocal, $consultaSqlInsert)) {
		
		$queryGrupo="SELECT LAST_INSERT_ID() as ULTIMO_ID_INGRESADO_CONEXION_ACTUAL
					FROM ".$NombreTabla."  
					LIMIT 1";
		
		if ($result = mysqli_query($connLocal, $queryGrupo)) {

			/* fetch associative array */
			while ($row = mysqli_fetch_assoc($result)) {
				$IdGenerado = $row["ULTIMO_ID_INGRESADO_CONEXION_ACTUAL"];
			}
			/* free result set */
			mysqli_free_result($result);
			return ($IdGenerado);
		}
		else
		{
			return (-1);
		}		
	}
	else
	{
	  return (-2);
	}	
}
?>
