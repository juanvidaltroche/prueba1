<!DOCTYPE html>
<html lang="es">
	<head>
		<title>BUSES</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<script src="jquery-1.11.0.js" type="text/javascript"></script>	
	</head>
	<body onload="setInterval('graficarParadas()', 5000);">
	{literal}
	<script type="text/javascript">
	nm = 0;
	var aHrr=new Array({/literal}{$BUSES}{literal});
	
	function graficarParadas() {
	    $("#actual").html("<table border=1><tr><td>"+nm+"</td><td>"+aHrr[nm]+"</td></table>");
		$.ajax({
            type: "POST",
            url: "../servicios/monitoreoGlobalAjax.php?RUTA=" + aHrr[nm] + "&nm=" + nm,
            success: function (dataCheck) {
				var a = JSON.parse(dataCheck);
				var resResp = a[0].bus;
				var nmResp = a[0].nm;
				var equipoResp = a[0].equipo;
				var paradas = a[0].paradas;
				var transito = a[0].transito;
				var lugar = a[0].lugar;

				res = "";
				res = res +'<img src="img/global/lineamediai.png">';
				for (index = 0; index < paradas-1; ++index) {
					cont = 0;
					for (indice = 0; indice < a.length; ++indice) {
						resResp = a[indice].bus;
						nmResp = a[indice].nm;
						equipoResp = a[indice].equipo;
						parada = a[indice].parada;
						transito = a[indice].transito;
						lugar = a[indice].lugar;
						if (transito=="IDA" && parada == index + 1)
							{
								res = res +'<img src="img/global/bus_ida.png" alt="' + (index+1) + '">';
								cont = cont + 1
							}
						//{"success":true,"bus":"5","nm":"1","ruta":"1","parada":"1","transito":"IDA","lugar":"PARADA","paradas":15,"latitud":-16.52855,"longitud":-68.142933},
					}
					for (i = cont; i <= 4; ++i) {
						res = res +'<img src="img/global/lineamedia.png">';
					}
					res = res +'<img src="img/global/lineamediai.png">';
				}				
				res = res +'<br>';

				res = res +'<img src="img/global/1g.png">';
				for (index = 1; index < paradas-1; ++index) {
					res = res +'<img src="img/global/lineamedia.png">';
					res = res +'<img src="img/global/lineamedia.png">';
					res = res +'<img src="img/global/lineamedia.png">';
					res = res +'<img src="img/global/lineamedia.png">';
					res = res +'<img src="img/global/lineamedia.png">';
					res = res +'<img src="img/global/' + (index+1) + 'g.png">';
				}
				res = res +'<img src="img/global/lineamedia.png">';
				res = res +'<img src="img/global/lineamedia.png">';
				res = res +'<img src="img/global/lineamedia.png">';
				res = res +'<img src="img/global/lineamedia.png">';
				res = res +'<img src="img/global/lineamedia.png">';
				res = res +'<img src="img/global/' + paradas + 'g.png"><br>';	

				res = res +'<img src="img/global/lineamediav.png">';
				for (index = 0; index < paradas-1; ++index) {
					cont = 0;
					for (indice = 0; indice < a.length; ++indice) {
						resResp = a[indice].bus;
						nmResp = a[indice].nm;
						equipoResp = a[indice].equipo;
						parada = a[indice].parada;
						transito = a[indice].transito;
						lugar = a[indice].lugar;
						if (transito=="VUELTA" && parada == index + 1)
							{
								res = res +'<img src="img/global/bus_vuelta.png" alt="' + (index+1) + '">';
								cont = cont + 1
							}
					}
					for (i = cont; i <= 4; ++i) {
						res = res +'<img src="img/global/lineamedia2.png">';
					}
					res = res +'<img src="img/global/lineamediav.png">';
				}
				$("#imagen_" + nmResp).html(res);
            }
        });
		nm = nm + 1;
		if (nm >= {/literal}{$NMAX}{literal}) { nm = 0; }
		
	}
	</script>
	{/literal}
			<legend>MONITOREO GLOBAL DE BUSES</legend>
			<div>
				<table>
					<td>
						<!--form action="monitoreo.php" method="POST">
						<select name="LINEA">
							{section name=i loop=$LINEAS}
									<option value="{$LINEAS[i].RUTA_ID}">{$LINEAS[i].RUTA_DESCRIPCION}</option>
							{/section}
						</select>
						<button class="btn btn-primary" type="submit">BUSCAR</button>
						</form>

						<form action="monitoreoGlobal.php" method="POST">
						<select name="LINEA">
						<option value="-1">Seleccione Linea</option>
							{section name=i loop=$LINEAS}
								{if $LINEA eq $LINEAS[i].RUTA_ID} 
									{assign var=seleccionado value=" SELECTED "}
								{else}
									{assign var=seleccionado value="  "}
								{/if}
								<option value="{$LINEAS[i].RUTA_ID}" {$seleccionado} >{$LINEAS[i].RUTA_DESCRIPCION}</option>
							{/section}
						</select>
						<th colspan="2"><button class="btn btn-primary" type="submit">BUSCAR</th>
						</form-->
					</td>
					<td valign="top" align="rigth"><td>Encuestando: </td><td><div id="actual"></div></td>
					</td>
				</table>
			</div>
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>LINEA</th>
							<th>UBICACION</th>
						</tr>
					</thead>
					{assign var=n value=0}
					{section name=i loop=$HERRAMIENTAS}						
						<tr>
							<td width="5%">{$HERRAMIENTAS[i].RUTA_DESCRIPCION}	</td>
							<td width="90%">
								<div id="imagen_{$n}">
								</div>
							</td>
						</tr>
						{assign var=n value=$n+1}					
					{/section}
				</table>
			</div>
	</body>
</html>
