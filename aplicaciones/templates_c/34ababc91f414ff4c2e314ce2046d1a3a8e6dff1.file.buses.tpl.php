<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 08:41:09
         compiled from ".\templates\buses.tpl" */ ?>
<?php /*%%SmartyHeaderCode:31042535ba96570a835-18630534%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '34ababc91f414ff4c2e314ce2046d1a3a8e6dff1' => 
    array (
      0 => '.\\templates\\buses.tpl',
      1 => 1397008898,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '31042535ba96570a835-18630534',
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
  'unifunc' => 'content_535ba965867594_27160964',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535ba965867594_27160964')) {function content_535ba965867594_27160964($_smarty_tpl) {?><?php if (!is_callable('smarty_function_counter')) include 'C:\\xampp\\htdocs\\blpServidor\\lib\\smarty\\plugins\\function.counter.php';
?><!DOCTYPE html>
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
		if (nm >= <?php echo $_smarty_tpl->tpl_vars['NMAX']->value-1;?>
) { nm = 0; }
		nm = nm + 1;
	}
	</script>
	
			<legend>BUSES</legend>
			<div>
				<table>
					<td>
						<form action="monitoreo.php" method="POST">
					     <select name="LINEA">
					      <option value="-1">-- seleccione --</option>
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
							<td width="5%"><?php echo smarty_function_counter(array(),$_smarty_tpl);?>
</td>
							<td width="5%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_CODIGO'];?>
	</td>
							<td width="5%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['RUTA_DESCRIPCION'];?>
	</td>
							<td width="5%"> <?php if ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']!="ACTIVO") {?> <font color="#ff0000"> <?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>
 </font> <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>
 <?php }?>	</td>
							<td width="70%">
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
