<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
LocalInstanciarConexion();
print_r($_POST); die;

if (isset($_POST)) {
	$fecRegistro = $_POST["RD_FECHA"];
	$busId = $_POST["RD_BUS_ID"];
	$dataRegistro = serialize($_POST);

	$sSQL ="INSERT INTO mb_rep_diario (DIA_TIPO_HERRAMIENTA_ID, DIA_DATA, DIA_REGISTRO)
						 VALUE ('$busId', '$dataRegistro','$fecRegistro')";
	$sRes = LocalExecuteQuery($sSQL);
	//print_r($sSQL);
	header("Location: mantenimiento.php");
}

LocalCerrarConexion();
