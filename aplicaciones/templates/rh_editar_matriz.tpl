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
		<form class="form-horizontal" method="POST" action="rh_guardar_matriz.php" id="formulario" name="formulario">  
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
				<label class="control-label" for="MATRIZ_FECHA">Fecha</label>
				<div class="controls">
					<input id="MATRIZ_FECHA" class="form-control" placeholder="Fecha" type="date" name="MATRIZ_FECHA" value="{$ANALISIS[0].MATRIZ_FECHA}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_CORRESPONDE">Corresponde</label>
				<div class="controls">
					<input id="MATRIZ_CORRESPONDE" class="form-control" placeholder="Corresponde" type="text" name="MATRIZ_CORRESPONDE" value="{$ANALISIS[0].MATRIZ_CORRESPONDE}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_RESUMEN">Resumen</label>
				<div class="controls">
					<input id="MATRIZ_RESUMEN" class="form-control" placeholder="Resumen" type="text" name="MATRIZ_RESUMEN" value="{$ANALISIS[0].MATRIZ_RESUMEN}">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_RESULTADOS">Resultados</label>
				<div class="controls">
					<select id="MATRIZ_RESULTADOS" name="MATRIZ_RESULTADOS">
						<option value="-1">--Sin evaluacion--</option>
						<option value="BUENO">BUENO</option>
						<option value="REGULAR">REGULAR</option>
						<option value="A MEJORAR">A MEJORAR</option>
					</select>
					<!-- <input id="MATRIZ_RESULTADOS" class="form-control" placeholder="Resultados" type="text" name="MATRIZ_RESULTADOS" value="{$ANALISIS[0].MATRIZ_RESULTADOS}">-->
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_OBSERVACIONES">Observaciones</label>
				<div class="controls">
					<input id="MATRIZ_OBSERVACIONES" class="form-control" placeholder="Observaciones" type="text" name="MATRIZ_OBSERVACIONES" value="{$ANALISIS[0].MATRIZ_OBSERVACIONES}">
				</div>
			</div>
			
			<div class="control-group">
				<div class="col-xs-offset-2 controls">
					<button 
						class="btn btn-default" 
						onclick="this.form.action='rh_listado_matriz.php';this.form.submit();" 
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
			
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>DETALLES DE EVALUACION</th>
					</tr>
				</thead>
				<tr>
					<td><b>FECHA</b></td>
					<td><b>CORRESPONDE</b></td>
					<td><b>RESUMEN INICIO</b></td>
					<td><b>RESULTADOS FINAL</b></td>
					<td><b>OBSERVACIONES</b></td>
					<td><b>SELECCIONAR</b></td>
				</tr>
				{section name=i loop=$ANALISIS}
				<tr>
					<td>{$ANALISIS[i].MATRIZ_FECHA}</td>
					<td>{$ANALISIS[i].MATRIZ_CORRESPONDE}</td>
					<td>{$ANALISIS[i].MATRIZ_RESUMEN}</td>
					<td>{$ANALISIS[i].MATRIZ_RESULTADOS}</td>
					<td width="40%">{$ANALISIS[i].MATRIZ_OBSERVACIONES}</td>
					<td>
						<!--<button 
							class="btn btn-primary" 
							onclick="this.form.action='rh_editar_matriz.php';this.form.submit();" 
							name="MATRIZ_ID" 
							id="MATRIZ_ID" 
							value="{$ANALISIS[i].MATRIZ_ID}">EDITAR
						</button>-->
					</td>
				</tr>
				{/section}
			</table>
			
			
			
			
			
			
		</form> 
	</body> 
</html>