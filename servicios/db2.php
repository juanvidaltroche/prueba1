<?php
$_SESSION["server"] = "localhost";
$_SESSION["usr"] = "root";
$_SESSION["pwd"] = "SRVpksimgepuads";

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
?>