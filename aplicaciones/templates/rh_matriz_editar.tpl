<!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
	<head>
		<title>MATRIZ DE EVALUACIONES</title>
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
		<legend>NUEVA EVALUACION</legend>
			<form class="form-horizontal" method="POST" action="rh_matriz_guardar.php" id="formulario" name="formulario">  
				<input type="hidden" name="MATRIZ_ID" value="{$ANALISIS[0].MATRIZ_ID}">
				<input type="hidden" name="FUNCIONARIO_ID" value="{$ANALISIS[0].FUNCIONARIO_ID}">
			
				<div class="control-group">
					<label class="control-label" for="MATRIZ_FECHA">Fecha</label>
					<div class="controls">
						<input id="MATRIZ_FECHA" class="form-control" type="date" name="MATRIZ_FECHA" value="{$ANALISIS[0].MATRIZ_FECHA}">
					</div>
				</div>
					
				<div class="control-group">
					<label class="control-label" for="MATRIZ_CORRESPONDE">Corresponde</label>
					<div class="controls">
						<input id="MATRIZ_CORRESPONDE" class="form-control" type="text" name="MATRIZ_CORRESPONDE" value="{$ANALISIS[0].MATRIZ_CORRESPONDE}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="MATRIZ_RESUMEN">Resumen</label>
					<div class="controls">
						<input id="MATRIZ_RESUMEN" class="form-control" type="text" name="MATRIZ_RESUMEN" value="{$ANALISIS[0].MATRIZ_RESUMEN}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="MATRIZ_RESULTADOS">Resultados</label>
					<div class="controls">
						<select id="MATRIZ_RESULTADOS" name="MATRIZ_RESULTADOS" value="{$ANALISIS[0].MATRIZ_RESULTADOS}">
						<option value="-1">--Sin evaluacion--</option>
						<option value="BUENO">BUENO</option>
						<option value="REGULAR">REGULAR</option>
						<option value="A MEJORAR">A MEJORAR</option>
					</select>
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="MATRIZ_OBSERVACIONES">Observaciones</label>
					<div class="controls">
						<input id="MATRIZ_OBSERVACIONES" class="form-control" type="text" name="MATRIZ_OBSERVACIONES" value="{$ANALISIS[0].MATRIZ_OBSERVACIONES}">
					</div>
				</div>

				<div class="control-group">
					<div class="col-xs-offset-2 controls">
						<button 
							class="btn btn-default" 
							onclick="this.form.action='rh_ver_matriz.php';this.form.submit();" 
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