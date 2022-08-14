<!DOCTYPE html>
<html lang="es">
	<head>
		<title>PROGRAMACION BUSES</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<script src="jquery-1.11.0.js" type="text/javascript"></script>
		<script type="text/javascript"></script>
	
	    <script src="../lib/jq/fecha/jquery-latest.js" type="text/javascript"></script>    
	    <script src="../lib/jq/fecha/jquery-ui.min.js" type="text/javascript"></script>
		<!--<script src="../lib/jq/fecha/ui.datepicker-es.js" type="text/javascript"></script>-->
	    <link rel="stylesheet" type="text/css" href="../lib/jq/fecha/jquery-ui.css" />

		<script type='text/javascript'>
	     $(document).ready(function () {
	         $('#datepicker').datepicker({
	             clickInput: true,
	             changeMonth: true,
	             changeYear: true,
	             showOn: 'button',
	             buttonImageOnly: true,
	             buttonImage: '../lib/jq/fecha/images/calendario.png',
	             //minDate: new Date(1900, 1 - 1, 1),
	             format: 'YY-mm-dd'
	         });
	     });      
        </script>
		
	</head>
	<body>
			<legend>PRGRAMACION BUSES</legend>
			<legend>Mantenimiento</legend>
			<div>
				<form action="programacion_grabar.php" method="POST">
				<table>
					<tr valign="top">
						<td>
							<legend>TIPO MANTENIMIENTO </legend>			
						</td>
						<td>
							
							<select name="MANTENIMIENTO">
								<option value="-1">-- seleccione --</option>
								<option value="0">PREVENTIVO</option>
								<option value="1">CORRECTIVO</option>
								<!--
								{section name=i loop=$LINEAS}
										<option value="{$LINEAS[i].RUTA_ID}">{$LINEAS[i].RUTA_DESCRIPCION}</option>
								{/section}
								-->
							</select>						
						</td>
					</tr>
					<tr valign="top">
						<td>
							<legend>FECHA MANTENIMIENTO  </legend>			
						</td>
						<td>					
							<INPUT TYPE="text" NAME="FECHA_MANTENIMIENTO" ID = "FECHA_MANTENIMIENTO"/>
							<!--<input type="DATE" name="cumpleanios" step="1" min="2013-01-01" max="2013-12-31" value="2014-03-26">-->
							<p>Date: <input type="text" id="datepicker"></p>
						</td>
					</tr>			
					<tr>
						<td><input type="submit" value="Gravar"></td>
					</tr>
				</table>
				</form>
			</div>			
			
	</body>
</html>
