<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:32:57
         compiled from ".\templates\buses_global.tpl" */ ?>
<?php /*%%SmartyHeaderCode:26403535bdfb9e17281-92877520%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a74b33e1a1c43145f4989f3d1fa3bf5f05f45621' => 
    array (
      0 => '.\\templates\\buses_global.tpl',
      1 => 1397073137,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '26403535bdfb9e17281-92877520',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'BUSES' => 0,
    'NMAX' => 0,
    'LINEAS' => 0,
    'LINEA' => 0,
    'seleccionado' => 0,
    'HERRAMIENTAS' => 0,
    'n' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdfba00c8d0_64636296',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdfba00c8d0_64636296')) {function content_535bdfba00c8d0_64636296($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
	<head>
		<title>BUSES</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<script src="jquery-1.11.0.js" type="text/javascript"></script>	
	</head>
	<body onload="setInterval('graficarParadas()', 5000);">
	
	<script type="text/javascript">
	nm = 0;
	var aHrr=new Array(<?php echo $_smarty_tpl->tpl_vars['BUSES']->value;?>
);
	
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
		if (nm >= <?php echo $_smarty_tpl->tpl_vars['NMAX']->value;?>
) { nm = 0; }
		
	}
	</script>
	
			<legend>MONITOREO GLOBAL DE BUSES</legend>
			<div>
				<table>
					<td>
						<!--form action="monitoreo.php" method="POST">
						<select name="LINEA">
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
									<option value="<?php echo $_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_ID'];?>
"><?php echo $_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
</option>
							<?php endfor; endif; ?>
						</select>
						<button class="btn btn-primary" type="submit">BUSCAR</button>
						</form>

						<form action="monitoreoGlobal.php" method="POST">
						<select name="LINEA">
						<option value="-1">Seleccione Linea</option>
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
" <?php echo $_smarty_tpl->tpl_vars['seleccionado']->value;?>
 ><?php echo $_smarty_tpl->tpl_vars['LINEAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
</option>
							<?php endfor; endif; ?>
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
							<td width="5%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
	</td>
							<td width="90%">
								<div id="imagen_<?php echo $_smarty_tpl->tpl_vars['n']->value;?>
">
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
