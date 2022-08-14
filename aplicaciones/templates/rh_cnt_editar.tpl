<!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
	<head>
		<title>CONTRATOS</title>
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
		<legend>DETALLE DE CONTRATO</legend>
			<form class="form-horizontal" method="POST" action="rh_cnt_guardar.php" id="formulario" name="formulario">  
				<input type="hidden" name="CONTRATO_ID" value="{$ANALISIS[0].CONTRATO_ID}">
				<input type="hidden" name="FUNCIONARIO_ID" value="{$ANALISIS[0].FUNCIONARIO_ID}">
			
				<div class="control-group">
					<label class="control-label" for="CONTRATO_CODIGO_FUNCIONARIO">Codigo de funcionario</label>
					<div class="controls">
						<input id="CONTRATO_CODIGO_FUNCIONARIO" class="form-control" type="text" name="CONTRATO_CODIGO_FUNCIONARIO" value="{$ANALISIS[0].CONTRATO_CODIGO_FUNCIONARIO}">
					</div>
				</div>
					
				<div class="control-group">
					<label class="control-label" for="CONTRATO_CODIGO_CONTRATO">Codigo de Contrato</label>
					<div class="controls">
						<input id="CONTRATO_CODIGO_CONTRATO" class="form-control" type="text" name="CONTRATO_CODIGO_CONTRATO" value="{$ANALISIS[0].CONTRATO_CODIGO_CONTRATO}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_ITEM">Numero de Item</label>
					<div class="controls">
						<input id="CONTRATO_ITEM" class="form-control" type="text" name="CONTRATO_ITEM" value="{$ANALISIS[0].CONTRATO_ITEM}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_FECHA_INICIO">Fecha de Inicio</label>
					<div class="controls">
						<input id="CONTRATO_FECHA_INICIO" class="form-control" type="date" name="CONTRATO_FECHA_INICIO" value="{$ANALISIS[0].CONTRATO_FECHA_INICIO}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_FECHA_CONCLUSION">Fecha de Conclusion</label>
					<div class="controls">
						<input id="CONTRATO_FECHA_CONCLUSION" class="form-control" type="date" name="CONTRATO_FECHA_CONCLUSION" value="{$ANALISIS[0].CONTRATO_FECHA_CONCLUSION}">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_OBSERVACIONES">Observaciones</label>
					<div class="controls">
						<input id="CONTRATO_OBSERVACIONES" class="form-control" type="text" name="CONTRATO_OBSERVACIONES" value="{$ANALISIS[0].CONTRATO_OBSERVACIONES}">
					</div>
				</div>

				<div class="control-group">
					<div class="col-xs-offset-2 controls">
						<button 
							class="btn btn-default" 
							onclick="this.form.action='rh_ver.php';this.form.submit();" 
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