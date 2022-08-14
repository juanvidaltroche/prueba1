<!DOCTYPE html>
<html lang="es">
	<head>
		<title>HERRAMIENTAS</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">						
		<script src="jquery-1.11.0.js" type="text/javascript"></script>	
	</head>
	<body onload="setInterval('pingAjax()', 5000);">
	{literal}
	<script type="text/javascript">
	nm = 0;
	var aHrr=new Array({/literal}{$NETBOOKS}{literal});
	
	function pingAjax() {
	    $("#actual").html("<table border=1><tr><td>"+nm+"</td><td>"+aHrr[nm]+"</td></table>");
		$.ajax({
            type: "POST",
            url: "../servicios/pingAjax.php?option=PING_NB&HRR=" + aHrr[nm] + "&nm=" + nm,
            success: function (dataCheck) {
				var a = JSON.parse("[" + dataCheck + "]");
				var resResp = a[0].resultado;
				var nmResp = a[0].nm;
				var equipoResp = a[0].equipo;
				var horaResp = a[0].hora;			
				var molineteRegistroResp = a[0].registro;
				var molineteHabilitadoResp = a[0].molinete;
				var detalleResp = a[0].detalle;
				var desdeResp = a[0].desde;
				var desdeHoyResp = a[0].desdeHoy;

				if(resResp == "TRUE"){
					$("#imagen_" + nmResp).html('<img src="icon_ball_green.png">');
					$("#ultimo_" + nmResp).html(horaResp);
					$("#ultimo_" + nmResp).html('<font color="#006400">'+desdeResp+'</font>');
					
					if(molineteHabilitadoResp == "TRUE"){
						$("#molinete_" + nmResp).html('<font color="#006400">'+molineteRegistroResp+'</font>');
					}
					else{									
						$("#molinete_" + nmResp).html('<font color="#ff0000">'+molineteRegistroResp+'</font>');
					}
					$("#detalle_" + nmResp).html(detalleResp);
				} else {			
						if(desdeHoyResp == "HOY-"){
							$("#ultimo_" + nmResp).html('<font color="#006400">'+desdeResp+'</font>');
						}
						else{
							$("#ultimo_" + nmResp).html('<font color="#ff0000">'+desdeResp+'</font>');
						}	
					//$("#ultimo_" + nmResp).html(desdeResp);
					$("#imagen_" + nmResp).html('<img src="icon_ball_red.png">');
					$("#molinete_" + nmResp).html(molineteRegistroResp);
				}
				console.log(nmResp + ' ' + resResp + ' ' + equipoResp);
            }
        });
		nm = nm + 1;
		if (nm >= {/literal}{$NMAX}{literal}) { nm = 0; }
		
	}

	</script>
	{/literal}
			<legend>HERRAMIENTAS</legend>
			<div>
				<table>
					<tr valign="top">
					<td  colspan="2">
						<form action="ping.php" method="POST">
						<select name="LINEA" id="LINEA" onchange="this.form.action='ping.php'; this.form.submit();" >
							<option value="-1">-- Seleccione Linea--</option>
							{section name=i loop=$LINEAS}
								{if $LINEA eq $LINEAS[i].RUTA_ID} 
									{assign var=seleccionado value=" SELECTED "}
								{else}
									{assign var=seleccionado value="  "}
								{/if}
									<option value="{$LINEAS[i].RUTA_ID}" 
								{$seleccionado}>{$LINEAS[i].RUTA_DESCRIPCION}</option>
							{/section}
						</select>
						
						</form>
					</td>
					<td valign="top" align="rigth"><td>Encuestando: </td><td><div id="actual"></div></td>
					</td>
					</tr>
				</table>
			</div>
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>BUS</th>							
							<th>HERRAMIENTA</th>
						    <th>PING</th>
							<th>ULTIMA CONEXION</th>
							<th>ESTADO</th>	
							<th>LINEA</th>	
							<th>MOLINETE</th>	
							<th>DETALLE EQUIPO</th>	
						</tr>
					</thead>
					{assign var=n value=0}
					{section name=i loop=$HERRAMIENTAS}						
						<tr>
							<td width="3%">{counter}</td>
							<td width="7%">{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_CODIGO}			
							</td>							
							<td width="10%">{$HERRAMIENTAS[i].NA_NOMBRE}</td>
							<td width="3%">
								<div id="imagen_{$n}">
								</div>
							</td>
							<td width="15%">
								<div id="ultimo_{$n}">{$HERRAMIENTAS[i].NA_DESDE}
								</div>
							</td>
							{if $HERRAMIENTAS[i].NA_ESTADO != 'ACTIVO'}
								<td width="10%"><font color="#ff0000">{$HERRAMIENTAS[i].NA_ESTADO}</font>
								</td>
							{Else}
								<td width="10%">{$HERRAMIENTAS[i].NA_ESTADO}
								</td>
							{/if}

							<td width="15%">{$HERRAMIENTAS[i].RUTA_DESCRIPCION}			
							</td>
							<td width="15%">	
								<div id="molinete_{$n}">{$REGISTRO[i]}
								</div>							
							</td>
							<td width="20%">	
								<div id="detalle_{$n}">{$DETALLE[i]}
								</div>							
							</td>
						</tr>
						{assign var=n value=$n+1}					
					{/section}
				</table>
			</div>
	</body>
</html>
