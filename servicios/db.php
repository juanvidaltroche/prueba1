<?php
session_start();

$_SESSION["server"] = "localhost";
$_SESSION["usr"] = "root";
$_SESSION["pwd"] = "SRVpksimgepuads";

//$_SESSION["usr_session"] = "admin";

//$dbname = "cobro_buses_origen";

$conexion = mysql_connect($_SESSION["server"], $_SESSION["usr"], $_SESSION["pwd"]);
if  (!$conexion) {
    die('No pudo conectarse: ' . mysql_error());
}

$_SESSION["conn"] = $conexion;

function executeQuery($query, $dbname){
  $server = $_SESSION["server"];
  $usr = $_SESSION["usr"];
  $pwd = $_SESSION["pwd"];
  $conn = $_SESSION["conn"];
  mysql_select_db($dbname);
  $result = mysql_query ($query, $conn);
  $r = array();
  while ($row = mysql_fetch_array ($result, MYSQL_ASSOC)) {
      $r[] = $row;
  }
  return $r;
}
function executeInsert($query, $dbname){
  $server = $_SESSION["server"];
  $usr = $_SESSION["usr"];
  $pwd = $_SESSION["pwd"];
  $conn = $_SESSION["conn"];
  mysql_select_db($dbname);
  $result = mysql_query ($query, $conn);
  return 1;
}
function executeDelete($query, $dbname){
  $server = $_SESSION["server"];
  $usr = $_SESSION["usr"];
  $pwd = $_SESSION["pwd"];
  $conn = $_SESSION["conn"];
  mysql_select_db($dbname);
  $result = mysql_query ($query, $conn);
  return 1;
}
function executeCommit( $dbname,$query02,$query03)
{
	$server = "localhost";
	$usr = "root";
	$pwd = "";
	//$conn = $_SESSION["conn"];
	$conn = mysql_connect($server, $usr, $pwd);
		if  (!$conn) {
			die('No pudo conectarse: ' . mysql_error());
		}
	
	mysql_select_db($dbname);
	
	mysql_query("SET AUTOCOMMIT=0",$conn);
	mysql_query("START TRANSACTION",$conn);

	$a1 = mysql_query($query02,$conn);
	$a2 = mysql_query($query03,$conn);
	
	if ($a1 and $a2) {
		mysql_query("COMMIT",$conn);
		echo json_encode(array("success" => true));
	} else {        
		mysql_query("ROLLBACK",$conn);
		echo json_encode(array("success" => false));
	}
	
}//fin funcion commit01

function executeCommit01( $dbname,$query02,$query03,$query04)
{
	$server = "localhost";
	$usr = "root";
	$pwd = "";
	$conn = mysql_connect($server, $usr, $pwd);
	if  (!$conn) {
		die('No pudo conectarse: ' . mysql_error());
	}
	mysql_select_db($dbname);
	
	mysql_query("SET AUTOCOMMIT=0",$conn);
	mysql_query("START TRANSACTION",$conn);

	$a1 = mysql_query($query02,$conn);
	$a2 = mysql_query($query03,$conn);
	$a3 = mysql_query($query04,$conn);
	
	if ($a1 and $a2 and $a3) {
		mysql_query("COMMIT",$conn);
		echo json_encode(array("success" => true));
	} else {        
		mysql_query("ROLLBACK",$conn);
		echo json_encode(array("success" => false));
	}
	
}//fin funcion commit01


function executeInsert01($query, $dbname){
  $server = $_SESSION["server"];
  $usr = $_SESSION["usr"];
  $pwd = $_SESSION["pwd"];
  $conn = $_SESSION["conn"];
  /*
  echo $query;
 echo"\n\n";
  echo $dbname."\n";
  echo $conn;
  */
  mysql_select_db($dbname);
  $result = mysqli_query ($query, $conn);
  return $result;
}

?>