<!DOCTYPE html>
<html lang="es">
	<head>
		<title>PROGRAMACIONES</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<!--<link href="../lib/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">-->
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
        <script src="../lib/jquery-1.9.1.min.js"></script>
		<script src="../lib/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.js"></script>
		<script src="../lib/bootstrap/js/bootstrap-datepicker.js"></script>
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
			<legend>PROGRAMAR MANTENIMIENTO</legend>
			<div>			
				<table>
					<tr valign="top">
					<td><LABEL> <b> HERRAMIENTA: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_CODIGO} </LABEL></td>
					<td><LABEL> <b> DESCRIPCION: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_DESCRIPCION} </LABEL></td>
					<td><LABEL> <b> NRO. ASIENTOS: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_ASIENTOS} </LABEL></td>
					<td><LABEL> <b> ESTADO: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_ESTADO} </LABEL></td>
					</tr>
				</table>
			</div>
			<br />
			<form action="" name="formulario" id="formulario" method="POST">				
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
						   	<th>DATOS</th>
						   	<th>INFORME</th>	
						</tr>
					</thead>
					<tbody>
						<tr valign="top">
							<td>Fecha</td>
							<td>
								<input id="FECHA_PROGRAMACION" class="form-control" type="date" name="FECHA_PROGRAMACION">
							</td>
						</tr>
						<tr valign="top">
							<td>Tipo de Mantenimiento</td>
							<td>							
								<select name="TIPO_MANTENIMIENTO" id="TIPO_MANTENIMIENTO">
									<option value="">--seleccione--</option>
									<option value="PREVENTIVO">PREVENTIVO</option>
									<option value="CORRECTIVO">CORRECTIVO</option>
									<option value="TANQUEO">TANQUEO</option>
								</select>
							</td>
							<!--<input type="text" name="">Preventivo|Correctivo</td>-->
						</tr>
						<tr valign="top">
							<td>Detalle</td>
							<td><textarea name="OBS_MANTENIMIENTO" id="OBS_MANTENIMIENTO" rows="3" cols="70"></textarea></td>
						</tr>						
					</tbody>					
				</table>
				<table>
					<tr valign="top">							
						<td>
							<input type="hidden" name="ID_BUS" value="{$ID_BUS}">
							<input type="hidden" name="LINEA" value="{$INFO_BUS[0].NA_LINEA}">
						</td>
						<td>
							<button 
								class="btn btn-default" 
								onclick="this.form.action='mantenimiento.php';this.form.submit();">Volver
							</button>
						</td>
						<td>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='programacionAjax.php';this.form.submit();">Guardar
							</button>
						</td>
					</tr>
				</table>
			</div>
			<br />
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
						   	<th>FECHA</th>
						   	<th>TIPO</th>
						   	<th>DETALLE</th>
							<th>ACCION</th>
						</tr>
					</thead>
					<tbody>
						{section name=i loop=$PROG_MANTENIMIENTO}
						<tr>
							<td width="20%">{$PROG_MANTENIMIENTO[i].MT_PRG_REGISTRO}</td>
							<td width="20%">{$PROG_MANTENIMIENTO[i].MT_PRG_TIPO_MANTENIMIENTO}</td>
							<td width="20%">{$PROG_MANTENIMIENTO[i].MT_PRG_OBSERVACION}</td>
							{if $PROG_MANTENIMIENTO[i].MT_PRG_REGISTRO eq $smarty.now|date_format:"%Y-%m-%d"} 
							<td>
								<button width="25%" class="btn btn-danger" 
										onclick="this.form.action='mantenimiento_estado.php';this.form.submit();" 
										name="MT_PRG_TIPO_ID" id="MT_PRG_TIPO_ID" 
										value="{$PROG_MANTENIMIENTO[i].MT_PRG_TIPO_MANTENIMIENTO}">ACTIVAR BAJA
								</button>
							</td>
							{else}
							<td></td>
							{/if}
							
						</tr>
						{/section}
					</tbody>
				</table>
			</div>
			</form>
	</body>
</html>
