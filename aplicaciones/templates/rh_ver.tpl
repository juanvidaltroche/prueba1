<!DOCTYPE html>
<html lang="es">
	<head>
		<title>PERSONAL</title>
		<link href="../lib/bootstrap2/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
        <script src="../lib/jquery-1.9.1.min.js"></script>
		<script src="../lib/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap-datepicker.js"></script>
		<script src="../lib/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript">
            // When the document is ready
            $(document).ready(function () {
				$("input[type='date']").datepicker({
                    format: "yyyy/mm/dd" 
                });  
            });
        </script>
	
		<style type="text/css">
			.bs-example{
				margin: 50px;
			}
		</style>
	</head>
	<body>
		<form class="form-horizontal" method="POST" action="" id="formulario" name="formulario">  
			<legend>DETALLE DE PERSONAL</legend>
			<div>
				<table class="table table-striped table-bordered table-hover">
					<tr>
						<td width="20%"><b>CARGO</b></td> 
						<td>{$ANALISIS[0].TIPO_FUNCIONARIO_DESCRIPCION}</td>
					</tr>
					<tr>
						<td width="20%"><b>NOMBRE DE USUARIO</b></td> 
						<td><b>{$ANALISIS[0].USUARIO_CODIGO}</b></td>
					</tr>
					<tr>
						<td width="20%"><b>CEDULA DE IDENTIDAD</b></td> 
						<td>{$ANALISIS[0].FUNCIONARIO_CI}</td>
					</tr>
					<tr>
						<td width="20%"><b>APELLIDO PATERNO</b></td> 
						<td>{$ANALISIS[0].FUNCIONARIO_PATERNO}</td>
					</tr>
					<tr>
						<td width="20%"><b>APELLIDO MATERNO</b></td> 
						<td>{$ANALISIS[0].FUNCIONARIO_MATERNO}</td>
					</tr>
					<tr>
						<td width="20%"><b>NOMBRES</b></td> 
						<td>{$ANALISIS[0].FUNCIONARIO_NOMBRES}</td>
					</tr>
					<tr>
						<td width="20%"><b>FECHA DE NACIMIENTO</b></td> 
						<td>{$ANALISIS[0].DATOS_FECHA_NAC}</td>
					</tr>
					<tr>
						<td width="20%"><b>DIRECCION</b></td> 
						<td>{$ANALISIS[0].DATOS_DIRECCION}</td>
					</tr>
					<tr>
						<td width="20%"><b>TELEFONO</b></td> 
						<td>{$ANALISIS[0].DATOS_TELEFONO}</td>
					</tr>
					<tr>
						<td width="20%"><b>CELULAR</b></td> 
						<td>{$ANALISIS[0].DATOS_MOVIL}</td>
					</tr>
					<tr>
						<td width="20%"><b>CORREO ELECTRONICO</b></td> 
						<td>{$ANALISIS[0].DATOS_EMAIL}</td>
					</tr>
					
				</table>

				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>DETALLES DE CONTRATO</th>
							<button 
								class="btn btn-default" 
								onclick="this.form.action='rh_listado.php';this.form.submit();" 
								name="TIPO_FUNCIONARIO_ID" 
								id="TIPO_FUNCIONARIO_ID" 
								value="{$ANALISIS[0].TIPO_FUNCIONARIO_ID}">VOLVER
							</button>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='rh_cnt_nuevo.php';this.form.submit();" 
								name="FUNCIONARIO_ID" 
								id="FUNCIONARIO_ID" 
								value="{$ANALISIS[0].FUNCIONARIO_ID}">NUEVO
							</button>
						</tr>
					</thead>
					<tr>
						<td><b>CODIGO</b></td>
						<td><b>ITEM</b></td>
						<td><b>FECHA INICIO</b></td>
						<td><b>FECHA FINAL</b></td>
						<td><b>OBSERVACIONES</b></td>
						<td><b>SELECCIONAR</b></td>
					</tr>
					{section name=i loop=$CARGO}
					<tr>
						<td>{$CARGO[i].CONTRATO_CODIGO_FUNCIONARIO}</td>
						<td>{$CARGO[i].CONTRATO_ITEM}</td>
						<td>{$CARGO[i].CONTRATO_FECHA_INICIO}</td>
						<td>{$CARGO[i].CONTRATO_FECHA_CONCLUSION}</td>
						<td width="40%">{$CARGO[i].CONTRATO_OBSERVACIONES}</td>
						<td>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='rh_cnt_editar.php';this.form.submit();" 
								name="CONTRATO_ID" 
								id="CONTRATO_ID" 
								value="{$CARGO[i].CONTRATO_ID}">EDITAR
							</button>
						</td>
					</tr>
					{/section}
				</table>
			</div>
		</form> 
	</body> 
</html>

