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
            url: "../servicios/monitoreoAjax.php?HRR=" + aHrr[nm] + "&nm=" + nm,
           // url: "paradas.php?HRR=" + aHrr[nm] + "&nm=" + nm,
            success: function (dataCheck) {
				var a = JSON.parse("[" + dataCheck + "]");
				var resResp = a[0].resultado;
				var nmResp = a[0].nm;
				var equipoResp = a[0].equipo;
				var paradas = a[0].paradas;
				var transito = a[0].transito;
				var lugar = a[0].lugar;
				res = "";
				if (resResp=="MANTENIMIENTO"){
					/*res = res +'<img src="img/ida.png">';
					res = res +'<img src="img/inicio.png">';
					for (index = 1; index < paradas-1; ++index) {
						res = res +'<img src="img/medioman.png">';
						res = res +'<img src="img/parada.png">';
					}
					res = res +'<img src="img/medioman.png">';
					res = res +'<img src="img/fin.png">';*/
					$("#imagen_" + nmResp).html(res);
				} else {
					if (resResp=="0") {
						res = res +'<img src="img/nose.png">';
						res = res +'<img src="img/1.png">';
						for (index = 1; index < paradas-1; ++index) {
							res = res +'<img src="img/lineamedia.png">';
							res = res +'<img src="img/' + (index+1) + '.png">';
						}
						res = res +'<img src="img/lineamedia.png">';
						res = res +'<img src="img/' + paradas + '.png">';
						$("#imagen_" + nmResp).html(res);

					} else {
						//graficando mediante ida - vuelta
						if (transito=="IDA"){
							if(lugar=="PARADA") {
								if (resResp==1){
									res = res +'<img src="img/p1.png">';
								} else {
									res = res +'<img src="img/1.png">';
								}
								for (index = 1; index < paradas-1; ++index) {
									if (index == resResp-1) {
										//res = res +'<img src="img/ida.png">';
										res = res +'<img src="img/lineamediaida.png">';
										res = res +'<img src="img/p' + (index+1) + '.png">';
									} else {
										res = res +'<img src="img/lineamediaida.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									}
								}
								res = res +'<img src="img/lineamediaida.png">';
								if (resResp==paradas){
									res = res +'<img src="img/p' + paradas + '.png">';	
								} else {
									res = res +'<img src="img/' + paradas + '.png">';	
								}
							} else {
								if (resResp==1){
									res = res +'<img src="img/1.png">';
									//res = res +'<img src="img/ida.png">';

								} else {
									res = res +'<img src="img/1.png">';
								}
								for (index = 1; index < paradas-1; ++index) {
									if (index == resResp-1) {
										res = res +'<img src="img/ida.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									} else {
										res = res +'<img src="img/lineamediaida.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									}
								}
								res = res +'<img src="img/lineamediaida.png">';
								if (resResp==paradas){
									res = res +'<img src="img/ida.png">';
									res = res +'<img src="img/' + paradas + '.png">';	
								} else {
									res = res +'<img src="img/' + paradas + '.png">';	
								}
							}
							$("#imagen_" + nmResp).html(res);
						} else {
							if (lugar=="PARADA"){
								if (resResp==1){
									res = res +'<img src="img/p1V.png">';
								} else {
									res = res +'<img src="img/1.png">';
								}
								for (index = 1; index < paradas-1; ++index) {
									if (index == resResp-1) {
										res = res +'<img src="img/lineamediavuelta.png">';
										res = res +'<img src="img/p' + (index+1) + 'V.png">';
									} else {
										res = res +'<img src="img/lineamediavuelta.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									}
								}
								res = res +'<img src="img/lineamediavuelta.png">';
								if (resResp==paradas){
									res = res +'<img src="img/p' + paradas + 'V.png">';	
								} else {
									res = res +'<img src="img/' + paradas + '.png">';	
								}
							} else {
								if (resResp==1){
									res = res +'<img src="img/1.png">';
								} else {
									res = res +'<img src="img/1.png">';
								}
								for (index = 1; index < paradas-1; ++index) {
									if (index == resResp-1) {
										res = res +'<img src="img/vuelta.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									} else {
										res = res +'<img src="img/lineamediavuelta.png">';
										res = res +'<img src="img/' + (index+1) + '.png">';
									}
								}
								res = res +'<img src="img/lineamediavuelta.png">';
								if (resResp==paradas){
									res = res +'<img src="img/vuelta.png">';
									res = res +'<img src="img/' + paradas + '.png">';	
								} else {
									res = res +'<img src="img/' + paradas + '.png">';	
								}
							}						
							$("#imagen_" + nmResp).html(res);
						}
					}
				}
				//console.log(nmResp + ' ' + resResp + ' ' + equipoResp);
            }
        });
		if (nm >= {/literal}{$NMAX-1}{literal}) { nm = 0; }
		nm = nm + 1;
	}
	</script>
	{/literal}
			<legend>BUSES</legend>
			<div>
				<table>
					<td>
						<form action="monitoreo.php" method="POST">
					     <select name="LINEA">
					      <option value="-1">-- seleccione --</option>
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
					     </form>
					</td>
					<td valign="top" align="rigth"><td>Encuestando: </td><td><div id="actual"></div></td>
					</td>
				</table>
			</div>
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>BUS</th>
							<th>LINEA</th>
							<th>ESTADO</th>
							<th>UBICACION</th>
						</tr>
					</thead>
					{assign var=n value=0}
					{section name=i loop=$HERRAMIENTAS}						
						<tr>
							<td width="5%">{counter}</td>
							<td width="5%">{$HERRAMIENTAS[i].TIPO_HERRAMIENTA_CODIGO}	</td>
							<td width="5%">{$HERRAMIENTAS[i].RUTA_DESCRIPCION}	</td>
							<td width="5%"> {if $HERRAMIENTAS[i].NA_ESTADO != "ACTIVO"} <font color="#ff0000"> {$HERRAMIENTAS[i].NA_ESTADO} </font> {else} {$HERRAMIENTAS[i].NA_ESTADO} {/if}	</td>
							<td width="70%">
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
