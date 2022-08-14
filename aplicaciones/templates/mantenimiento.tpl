<!DOCTYPE html>
<html lang="es">
	<head>
		<title>.:: HERRAMIENTAS POR PATIO ::.</title>
		<link href="../lib/bootstrap2/css/bootstrap.css" rel="stylesheet">
		<script src="jquery-1.11.0.js" type="text/javascript"></script>	
	</head>
	<body>
		<legend>BUSES POR PATIO</legend>
		<div>
			<form action="mantenimiento.php" method="POST">
			<table>
				<tr valign="top">
				<td>
					<select name="LINEA" id="LINEA" onchange="this.form.action='mantenimiento.php'; this.form.submit();">
						<option value="-1">-- Seleccione Línea --</option>
						{section name=i loop=$LINEAS}
							{if $LINEA eq $LINEAS[i].RUTA_ID} 
								{assign var=seleccionado value=" SELECTED "}
							{else}
								{assign var=seleccionado value="  "}
							{/if}
						<option value="{$LINEAS[i].RUTA_ID}" {$seleccionado}>{$LINEAS[i].RUTA_DESCRIPCION}</option>
						{/section}
					</select>
				</td>
				</tr>
			</table>
			</form>
		</div>
		<div>
			<form id="diario" name="diario" action="" method="POST">
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>BUS</th>
						<th>ESTADO</th>	
						<th>ACCIONES</th>	
					</tr>
				</thead>
				<div>{assign var=n value=0}
				{section name=i loop=$HERRAMIENTAS}	
					{if $HERRAMIENTAS[i].NA_ESTADO eq "MC"}
						{assign var="fila" value="error"}
					{elseif $HERRAMIENTAS[i].NA_ESTADO eq "MP"}
						{assign var="fila" value="warning"}
					{elseif $HERRAMIENTAS[i].NA_ESTADO eq "TANQUEO"}
						{assign var="fila" value="info"}
					{else}
						{assign var="fila" value="default"}
					{/if}
					<tr class="{$fila}">
						<td width="10%">{counter}</td>
						<td width="20%">{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_CODIGO}</td>
						
						{if $HERRAMIENTAS[i].NA_ESTADO eq "ACTIVO"}
							<td width="20%">{$HERRAMIENTAS[i].NA_ESTADO}</td>
						{else}
							<td width="20%"><font color="red">{$HERRAMIENTAS[i].NA_ESTADO}</font></td>
						{/if}
						
						<td width="20%">
							<input type="hidden" name="NA_ID" value="{$HERRAMIENTAS[i].NA_ID}"/>
							{if $HERRAMIENTAS[i].NA_ESTADO neq "ACTIVO"}
								<button id="btnFalla" width="20%" class="btn btn-default" name="BUS_ID" value="{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_ID}" onclick="this.form.action='mantenimiento_rep_fallas.php'; this.form.submit();">Reporte de Fallas</th>
								<button id="btnActivar" class="btn btn-success" name="BUS_ID" value="{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_ID}" onclick="this.form.action='mantenimiento_activar.php'; this.form.submit();">Activar</th>
							{else}
								<button id="btnDiario" class="btn btn-primary" name="BUS_ID" value="{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_ID}" onclick="this.form.action='mantenimiento_rep_diario.php'; this.form.submit();">Reporte Diario</th>
								<button id="btnProgramar" class="btn btn-info" name="BUS_ID" value="{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_ID}" onclick="this.form.action='mantenimiento_programar.php'; this.form.submit();">Programar Baja</th>
							{/if}
						</td>
					</tr>
				</div>
				<div>
				</div>					
				{/section}
			</table>
		</form>	
		</div>
	</body>
</html>