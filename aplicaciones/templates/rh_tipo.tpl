<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>TIPOS DE FUNCIONARIO</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-custom.min.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
		<script src="../lib/bootstrap/js/jquery-1.7.2.min.js"></script>
		<script src="../lib/bootstrap/js/bootstrap-custom.min.js"></script>
	</head>
	<body>
		<legend>TIPOS DE FUNCIONARIO</legend>	
		<form method="POST" action="" id="formulario1" name="formulario1">  
			<table class="table table-striped table-bordered table-hover"> <!-- class="table table-striped table-bordered table-hover" -->
				{section name=i loop=$TIPO}
					<tr>
						<td>
							<button width="25%" class="btn btn-primary" onclick="this.form.action='rh_listado.php';this.form.submit();" name="TIPO_FUNCIONARIO_ID" id="TIPO_FUNCIONARIO_ID" value="{$TIPO[i].TIPO_FUNCIONARIO_ID}">{$TIPO[i].TIPO_FUNCIONARIO_DESCRIPCION}</button>
						</td>
					</tr>
				{/section}
			</table>
		</form>
	</body>
</html>