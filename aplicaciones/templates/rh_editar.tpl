<!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
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
	</head>
	<body>
		<legend>DATOS PERSONALES</legend>
		<form class="form-horizontal" method="POST" action="rh_guardar.php" id="formulario" name="formulario">  
			<input type="hidden" name="FUNCIONARIO_ID" value="{$ANALISIS[0].FUNCIONARIO_ID}">
			<input type="hidden" name="TIPO_FUNCIONARIO_ID" value="{$ANALISIS[0].TIPO_FUNCIONARIO_ID}">
			
			<div class="control-group">
				<label class="control-label" for="USUARIO_CODIGO">Nombre de Usuario</label>
				<div class="controls">
					<input id="USUARIO_CODIGO" class="form-control" type="text" name="USUARIO_CODIGO" value="{$ANALISIS[0].USUARIO_CODIGO}" readOnly="true">
				</div>
			</div>
		
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_CI">Cedula de Identidad</label>
				<div class="controls">
					<input id="FUNCIONARIO_CI" class="form-control" type="text" name="FUNCIONARIO_CI" value="{$ANALISIS[0].FUNCIONARIO_CI}" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_PATERNO">Apellido Paterno</label>
				<div class="controls">
					<input id="FUNCIONARIO_PATERNO" class="form-control" type="text" name="FUNCIONARIO_PATERNO" value="{$ANALISIS[0].FUNCIONARIO_PATERNO}" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_MATERNO">Apellido Materno</label>
				<div class="controls">
					<input id="FUNCIONARIO_MATERNO" class="form-control" type="text" name="FUNCIONARIO_MATERNO" value="{$ANALISIS[0].FUNCIONARIO_MATERNO}" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_NOMBRES">Nombres</label>
				<div class="controls">
					<input id="FUNCIONARIO_NOMBRES" class="form-control" type="text" name="FUNCIONARIO_NOMBRES" value="{$ANALISIS[0].FUNCIONARIO_NOMBRES}" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_FECHA_NAC">Fecha de Nacimiento</label>
				<div class="controls">
					<input id="DATOS_FECHA_NAC" class="form-control" placeholder="Fecha de Nacimiento" type="date" name="DATOS_FECHA_NAC" value="{$ANALISIS[0].DATOS_FECHA_NAC}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_DIRECCION">Direcci??n</label>
				<div class="controls">
					<input id="DATOS_DIRECCION" class="form-control" placeholder="Direcci??n" type="text" name="DATOS_DIRECCION" value="{$ANALISIS[0].DATOS_DIRECCION}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_TELEFONO">Tel??fono</label>
				<div class="controls">
					<input id="DATOS_TELEFONO" class="form-control" placeholder="Tel??fono" type="text" name="DATOS_TELEFONO" value="{$ANALISIS[0].DATOS_TELEFONO}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_MOVIL">Telefono m??vil</label>
				<div class="controls">
					<input id="DATOS_EMAIL" class="form-control" placeholder="Telefono m??vil" type="text" name="DATOS_MOVIL" value="{$ANALISIS[0].DATOS_MOVIL}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_EMAIL">Correo electr??nico</label>
				<div class="controls">
					<input id="DATOS_EMAIL" class="form-control" placeholder="Correo electr??nico" type="email" name="DATOS_EMAIL" value="{$ANALISIS[0].DATOS_EMAIL}">
				</div>
			</div>
			
			<div class="control-group">
				<div class="col-xs-offset-2 controls">
					<button 
						class="btn btn-default" 
						onclick="this.form.action='rh_listado.php';this.form.submit();" 
						name="PRS_ID" 
						id="PRS_ID"
						value="{$ANALISIS[0].FUNCIONARIO_ID}">CANCELAR
					</button>
					<button 
						class="btn btn-primary" 
						type="submit">GUARDAR
					</button>
				</div>
			</div>
		</form> 
	</body> 
</html>