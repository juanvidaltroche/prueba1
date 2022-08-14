<!DOCTYPE html>
<html lang="es">
	<head>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		<link href="../lib/bootstrap3/css/bootstrap-switch.css" rel="stylesheet">
		<link href="../lib/bootstrap2/css/bootstrap-tabs.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
		<script src="../lib/jquery-1.9.1.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap-datepicker.js"></script>
		<script src="../lib/bootstrap2/js/bootstrap-switch.js"></script>
		
        <script type="text/javascript">
            // When the document is ready
            $(document).ready(function () {
                $('#fecha').datepicker({
                    format: "dd/mm/yyyy"
                });  
				$("input[type='checkbox']").bootstrapSwitch('state', true, true);
				
				$('#myTab a').click(function (e) {
					 e.preventDefault();
					 $(this).tab('show');
				});

				$(function () {
					$('#myTab a:last').tab('show');
				})
			});
        </script>
	
	</head>
	<body>
	
	<!--
	<div class="container">
		<ul class="nav nav-tabs" id="myTab">
			<li class="active"><a href="#home">Home</a></li>
			<li><a href="#profile">Profile</a></li>
			<li><a href="#messages">Messages</a></li>
			<li><a href="#settings">Settings</a></li>
		</ul>
		 
		<div class="tab-content">
			<div class="tab-pane active" id="home">Home content...</div>
			<div class="tab-pane" id="profile">Content here...</div>
			<div class="tab-pane" id="messages">Messages...</div>
			<div class="tab-pane" id="settings">Settings...</div>
		</div>
	</div>
	-->

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
		<form action="" method="POST">
			<input type="hidden" name="RD_BUS_ID" value="">
			<legend>MANTENIMIENTO DIARIO</legend>
				<table class="container">
					<tr valign="top">
					<td>
				<table>
					<tr valign="top">
					<td><LABEL> <b> HERRAMIENTA: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_CODIGO} </LABEL></td>
					<td><LABEL> <b> DESCRIPCION: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_DESCRIPCION} </LABEL></td>
					<td><LABEL> <b> NRO. ASIENTOS: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_ASIENTOS} </LABEL></td>
					<td><LABEL> <b> ESTADO: </b>{$INFO_BUS[0].TIPO_HERRAMIENTA_ESTADO} </LABEL></td>
					</tr>
				</table>
				<table>
					<tr valign="top">
						<td align="right">Turno:</td>	
						<td><select id="myList" onchange="favBrowser()">
							  <option value="-1">--seleccione--</option>
							  <option value="0">1er Turno</option>
							  <option value="1">2do Turno</option>  
							  <option value="2">3er Turno</option>
							</select>
						</td>	
						<td align="right">Fecha</td>
						<td><input type="date" name="RD_FECHA" id="fecha"></td>
					</tr>
					<tr valign="top">
						<td align="right">Nombre Conductor</td>
						<td><input type="text" name="RD_NOMBRE_CONDUCTOR" id="text"   ></td>
						<td align="right">kilometraje</td>
						<td><input type="text" name="RD_KILOMETRAJE" id="text"   ></td>
					</tr>
				</table>

			<table class="container">
					<td>
						<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>DOCUMENTACION</th>
								</tr>
							</thead>
							<tbody>
								
								<tr valign="top">
									<td>Licencia de conducir</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_1" value="Existe" class="required" id="memberYes"  /><label for="memberYes">Existe</label></td> 
											<td><input type="radio" name="member_1" value="No Existe" id="memberNo"  /><label for="memberdNo">No Existe</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>SOAT</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_2" value="Existe" class="required" id="memberYes"  /><label for="memberYes">Existe</label></td> 
											<td><input type="radio" name="member_2" value="No Existe" id="memberNo"  /><label for="memberdNo">No Existe</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Botiquin de primeros auxilios</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_3" value="Existe" class="required" id="memberYes"  /><label for="memberYes">Existe</label></td> 
											<td><input type="radio" name="member_3" value="No Existe" id="memberNo" /><label for="memberdNo">No Existe</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Poliza de  seguro del vehiculo asignado</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_4" value="Existe" class="required" id="memberYes"  /><label for="memberYes">Existe</label></td> 
											<td><input type="radio" name="member_4" value="No Existe" id="memberNo" /><label for="memberdNo">No Existe</label></td>
										</tr></table>
									</td>
								</tr>
							<table table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>BUS {$NA_ID} INSPECCION VISUAL</th>
								</tr>
							</thead>
							<tbody>
							
							
								<tr valign="top">
									<td>Nivel de Aceite del motor</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_1_1" value="Bueno" class="required" id="memberYes"  /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_1_1" value="Malo" id="memberNo"  /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Nivel de agua del radiador</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_2_1" value="Bueno" class="required" id="memberYes"  /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_2_1" value="Malo" id="memberNo"  /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Nivel del liquido de parabrisas</td>
									<td>
										<table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_3_1" value="Bueno" class="required" id="memberYes"  /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_3_1" value="Malo" id="memberNo"  /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Nivel liquido de embrague</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_4_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_4_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Nivel aceite sistema hidraulico</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_5_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_5_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Purgadon del filtro de Aire</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_6_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_6_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Estado de las Correas</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_7_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_7_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table></td>
								</tr>
								<tr valign="top">
									<td>Precion de aire de los neumaticos </td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_8_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_8_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table></td>
								</tr>
							</tbody>
					
						</table>
						<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>BUS {$NA_ID} INSPECION OPERACIONAL</th>
									
									
								</tr>
							</thead>
							<tbody>
								<tr valign="top">
									<td>Freno de estacionamiento</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_9_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_9_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Freno de servicio</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_10_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_10_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Direccion</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_11_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_11_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Elevador hidraulico</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_12_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_12_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Caja de cambios</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_13_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_13_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Chicharra de retroceso</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_14_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_14_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Espejo retrovisor</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_15_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_15_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Activacion del freno de motor</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_16_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_16_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Sistema de iluminacion "Interna y Externa"</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_17_1" value="Bueno" class="required" id="memberYes"  /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_17_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Pantallas</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_18_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_18_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Limpia parabrisas</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_19_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_19_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Bocina electrica</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_20_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_20_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								
								</tr>
								<tr valign="top">
									<td>Bocina neumatica</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_21_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_21_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
								</tr>
								<tr valign="top">
									<td>Cinturon de seguridad</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_22_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_22_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
								<tr valign="top">
									<td>Extintores</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_23_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_23_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
									
								</tr>
							</tbody>
						</table>
						<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>BUS {$NA_ID} REPORTE DE FUGAS</th>
								</tr>
									<td><textarea name="RD_BUS_FUGAS" id="BUS_FUGAS" rows="3" cols="140"></textarea></td
							</thead>	
						</table>
						<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>BUS {$NA_ID} ESTADO FISICO DE LLANTAS</th>
								</tr>
									<td>Llanta 1</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_24_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_24_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
							</thead>
							<thead>
									<td>Llanta 2</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_25_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_25_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
							</thead>
							<thead>
									<td>Llanta 3</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_26_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_26_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
							</thead>
							<thead>
									<td>Llanta 4</td>
									<td><table class="table table-striped table-bordered table-hover"><tr>
											<td><input type="radio" name="member_27_1" value="Bueno" class="required" id="memberYes" /><label for="memberYes">Bueno</label></td> 
											<td><input type="radio" name="member_27_1" value="Malo" id="memberNo" /><label for="memberdNo">Malo</label></td>
										</tr></table>
									</td>
							</thead>
							<table class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>BUS {$NA_ID} OBSERVACIONES </th>
								</tr>
									<td><textarea name="RD_OBS" id="RD_OBS"  rows="2" cols="100%"></textarea></td
							</thead>
							</table>
							<button class="btn btn-primary" value="Reporte Fallas" onclick="this.form.action='mantenimiento_rep_diario2.php'; this.form.submit();">.::GRABAR EL REPORTE DIARIO::.</th></div>	
			</table>
			
		</form>
	
	</body>
</html>
