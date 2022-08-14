<?php
require("../servicios/dbVersion02.php");
session_start();

$username = chop(trim($_POST['username']));
$password = chop(trim($_POST['password']));

LocalInstanciarConexion();	

$consulta = "SELECT USUARIO_TIPO_USUARIO,
					USUARIO_ID,
					TIPO_FUNCIONARIO_DESCRIPCION					
			FROM sa_usuarios 
			INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID= USUARIO_ID
			INNER JOIN mb_tipos_funcionario ON 	TIPO_FUNCIONARIO_ID = UTF_TIPO_FUNCIONARIO_ID	
			WHERE USUARIO_CODIGO='$username' and USUARIO_CLAVE='$password'";
			
$respuesta = LocalExecuteQuery($consulta);

if($respuesta) {   
	//--------------------------- SESIONES ----------------------//	
    $_SESSION["tipo"] =  $respuesta[0]['USUARIO_TIPO_USUARIO'];
    $_SESSION["idUsuario"] = $respuesta[0]['USUARIO_ID'];	
	$_SESSION["usr_session"] = $username;
	$_SESSION["tipo_funcionario_session"] = $respuesta[0]['TIPO_FUNCIONARIO_DESCRIPCION'];
	//--------------------------- SESIONES ----------------------//	
	
	header("Location: ../index.php");
	
} else {
?>
	<SCRIPT LANGUAGE="JavaScript">
		alert('Su usuario no existe comuniquese con el administrador.');
		location.href = '../';
	</SCRIPT>
<?php
}
LocalCerrarConexion();
?>

