<?php
include "constantes.php";
include "servicios/dbVersion02.php";

if (!isset($_SESSION['usr_session']))
    header("location:index.php");	
?>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		<link rel="stylesheet" type="text/css" href="css/styleMenu.css" />
	</head>
<body>


<?php
$sIdUsuario = $_SESSION["idUsuario"];
LocalInstanciarConexion();	
$queryGrupo = "SELECT DISTINCT (GRUPO_ID),GRUPO_DESCRIPCION
               FROM sa_accesos   
               INNER JOIN sa_opciones  ON ACCESO_OPCION_ID =OPCION_ID
               INNER JOIN sa_grupos ON  OPCION_GRUPO_ID = GRUPO_ID
               WHERE ACCESO_TIPO_FUNCIONARIO_ID=(SELECT UTF_TIPO_FUNCIONARIO_ID 
			                        FROM sa_usuario_tipos_funcionario 
									WHERE UTF_USUARIO_ID =".$sIdUsuario.") and ACCESO_ESTADO ='A'";

$queryOpciones = "SELECT GRUPO_ID,GRUPO_DESCRIPCION, OPCION_ID, OPCION_DESCRIPCION, OPCION_CONTENIDO,OPCION_IMAGEN 
				  FROM sa_accesos 
                  INNER JOIN sa_opciones  ON ACCESO_OPCION_ID = OPCION_ID
                  INNER JOIN sa_grupos ON OPCION_GRUPO_ID = GRUPO_ID
                  WHERE ACCESO_TIPO_FUNCIONARIO_ID = (SELECT UTF_TIPO_FUNCIONARIO_ID 
				                         FROM sa_usuario_tipos_funcionario 
										 WHERE UTF_USUARIO_ID =".$sIdUsuario.") AND ACCESO_ESTADO = 'A'";

 $sGrupos = LocalExecuteQuery($queryGrupo);
 $sOpciones = LocalExecuteQuery($queryOpciones);
  ?>
 <div id="menu12">
	<ul>   
 <?php 
 foreach ($sGrupos as $rowG) {
	$idGrupo = $rowG["GRUPO_ID"];
	echo " <li><div class='bt1'><span class='ht11'></span>	";
    echo "<span class='hw12'>".$rowG["GRUPO_DESCRIPCION"]."</span></div></li>";	 
		foreach ($sOpciones as $rowO){
			if($idGrupo == $rowO["GRUPO_ID"]){				
				echo "<li><a href='aplicaciones/".$rowO["OPCION_CONTENIDO"]."' size='20'  target='cuerpo'>".$rowO["OPCION_DESCRIPCION"]."</a></li>";
		    }			
		}
 }
 LocalCerrarConexion();
  ?>	
	</ul>
</div>
</body>
</html>
