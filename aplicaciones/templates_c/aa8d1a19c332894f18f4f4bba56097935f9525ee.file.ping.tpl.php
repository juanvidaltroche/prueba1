<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 11:10:45
         compiled from ".\templates\ping.tpl" */ ?>
<?php /*%%SmartyHeaderCode:25965535bcc752e0749-35955076%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'aa8d1a19c332894f18f4f4bba56097935f9525ee' => 
    array (
      0 => '.\\templates\\ping.tpl',
      1 => 1397489402,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '25965535bcc752e0749-35955076',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'NETBOOKS' => 0,
    'NMAX' => 0,
    'LINEAS' => 0,
    'LINEA' => 0,
    'seleccionado' => 0,
    'HERRAMIENTAS' => 0,
    'n' => 0,
    'REGISTRO' => 0,
    'DETALLE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bcc7544fc79_49786808',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bcc7544fc79_49786808')) {function content_535bcc7544fc79_49786808($_smarty_tpl) {?><?php if (!is_callable('smarty_function_counter')) include 'C:\\xampp\\htdocs\\blpServidor\\lib\\smarty\\plugins\\function.counter.php';
?><!DOCTYPE html>
<html lang="es">
	<head>
		<title>HERRAMIENTAS</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">						
		<script src="jquery-1.11.0.js" type="text/javascript"></script>	
	</head>
	<body onload="setInterval('pingAjax()', 5000);">
	
	<script type="text/javascript">
	nm = 0;
	var aHrr=new Array(<?php echo $_smarty_tpl->tpl_vars['NETBOOKS']->value;?>
);
	
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
		if (nm >= <?php echo $_smarty_tpl->tpl_vars['NMAX']->value;?>
) { nm = 0; }
		
	}

	</script>
	
			<legend>HERRAMIENTAS</legend>
			<div>
				<table>
					<tr valign="top">
					<td  colspan="2">
						<form action="ping.php" method="POST">
						<select name="LINEA" id="LINEA" onchange="this.form.action='ping.php'; this.form.submit();" >
							<option value="-1">-- Seleccione Linea--</option>
							<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['LINEAS']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = true;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['max'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] = 1;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] > 0 ? 0 : $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop']-1;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']) {
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
    if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] == 0)
        $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = false;
} else
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = 0;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']):

            for ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] = 1;
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] <= $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'];
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] += $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration']++):
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['rownum'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_prev'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] - $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_next'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] + $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['first']      = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == 1);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['last']       = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total']);
?>
								<?php if ($_smarty_tpl->tpl_vars['LINEA']->value==$_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_ID']) {?> 
									<?php $_smarty_tpl->tpl_vars['seleccionado'] = new Smarty_variable(" SELECTED ", null, 0);?>
								<?php } else { ?>
									<?php $_smarty_tpl->tpl_vars['seleccionado'] = new Smarty_variable("  ", null, 0);?>
								<?php }?>
									<option value="<?php echo $_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_ID'];?>
" 
								<?php echo $_smarty_tpl->tpl_vars['seleccionado']->value;?>
><?php echo $_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
</option>
							<?php endfor; endif; ?>
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
					<?php $_smarty_tpl->tpl_vars['n'] = new Smarty_variable(0, null, 0);?>
					<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['HERRAMIENTAS']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = true;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['max'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] = 1;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] > 0 ? 0 : $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop']-1;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']) {
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
    if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] == 0)
        $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = false;
} else
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = 0;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']):

            for ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] = 1;
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] <= $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'];
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] += $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration']++):
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['rownum'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_prev'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] - $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_next'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] + $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['first']      = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == 1);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['last']       = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total']);
?>						
						<tr>
							<td width="3%"><?php echo smarty_function_counter(array(),$_smarty_tpl);?>
</td>
							<td width="7%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_CODIGO'];?>
			
							</td>							
							<td width="10%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_NOMBRE'];?>
</td>
							<td width="3%">
								<div id="imagen_<?php echo $_smarty_tpl->tpl_vars['n']->value;?>
">
								</div>
							</td>
							<td width="15%">
								<div id="ultimo_<?php echo $_smarty_tpl->tpl_vars['n']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_DESDE'];?>

								</div>
							</td>
							<?php if ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']!='ACTIVO') {?>
								<td width="10%"><font color="#ff0000"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>
</font>
								</td>
							<?php } else { ?>
								<td width="10%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>

								</td>
							<?php }?>

							<td width="15%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
			
							</td>
							<td width="15%">	
								<div id="molinete_<?php echo $_smarty_tpl->tpl_vars['n']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['REGISTRO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']];?>

								</div>							
							</td>
							<td width="20%">	
								<div id="detalle_<?php echo $_smarty_tpl->tpl_vars['n']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['DETALLE']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']];?>

								</div>							
							</td>
						</tr>
						<?php $_smarty_tpl->tpl_vars['n'] = new Smarty_variable($_smarty_tpl->tpl_vars['n']->value+1, null, 0);?>					
					<?php endfor; endif; ?>
				</table>
			</div>
	</body>
</html>
<?php }} ?>
