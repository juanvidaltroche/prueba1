<!DOCTYPE html>
<html>
	<head>
		<title>PERSONAL</title>
		<!-- <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"> -->
		
		<link rel="stylesheet" type="text/css" href="../lib/bootstrap3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="../lib/datatables/dataTables.bootstrap.css">
		
		<script type="text/javascript" language="javascript" src="../lib/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" language="javascript" src="../lib/datatables/jquery.dataTables.min.js"></script>
		<script type="text/javascript" language="javascript" src="../lib/datatables/dataTables.bootstrap.js"></script>
		
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function() {
				$('#mytable').dataTable();
			} );
		</script>
	</head>
	<body>
		<form method="POST" action="" id="formulario" name="formulario">  
			<legend>REGISTROS DEL PERSONAL</legend>
			<div class="container">
				<table id="mytable" class="table table-striped table-bordered table-hover" cellpadding="0" cellspacing="0" border="0">
					<thead>
						<tr>
							<th>C.I.</th>
							<th>NOMBRES</th>
							<th>APELLIDO PATERNO</th>
							<th>APELLIDO PATERNO</th>
							<th>CARGO</th>
							<th>SELECCIONAR</th>
						</tr>
					</thead>
					<tbody>
					{section name=i loop=$PERSONAL}
						<tr class="odd gradeX">
							<td>{$PERSONAL[i].FUNCIONARIO_CI}</td>
							<td>{$PERSONAL[i].FUNCIONARIO_NOMBRES}</td>
							<td>{$PERSONAL[i].FUNCIONARIO_PATERNO}</td>
							<td>{$PERSONAL[i].FUNCIONARIO_MATERNO}</td>
							<td>{$PERSONAL[i].TIPO_FUNCIONARIO_DESCRIPCION}</td>
							<td>
								<button class="btn btn-primary" onclick="this.form.action='rh_ver.php';this.form.submit();" name="PRS_ID" id="PRS_ID" value="{$PERSONAL[i].FUNCIONARIO_ID}">VER</button>
								<button class="btn btn-info" onclick="this.form.action='rh_editar.php';this.form.submit();" name="PRS_ID" id="PRS_ID1" value="{$PERSONAL[i].FUNCIONARIO_ID}">EDITAR</button>
								<button class="btn btn-info" onclick="this.form.action='rh_ver_matriz.php';this.form.submit();" name="PRS_ID" id="PRS_ID2" value="{$PERSONAL[i].FUNCIONARIO_ID}">EVALUACIONES</button>
							</td>
						</tr>
					{/section}
					</tbody>
				</table>
			</table>
		</form>  
	</body>
</html>
