<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 10:09:58
         compiled from ".\templates\mantenimiento.tpl" */ ?>
<?php /*%%SmartyHeaderCode:27987535bbe36346810-88621252%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5f0cd1b0fbd4f819089ae30b1d96e57125dc9103' => 
    array (
      0 => '.\\templates\\mantenimiento.tpl',
      1 => 1398436839,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '27987535bbe36346810-88621252',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'LINEAS' => 0,
    'LINEA' => 0,
    'seleccionado' => 0,
    'HERRAMIENTAS' => 0,
    'fila' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bbe364f0966_64005715',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bbe364f0966_64005715')) {function content_535bbe364f0966_64005715($_smarty_tpl) {?><?php if (!is_callable('smarty_function_counter')) include 'C:\\xampp\\htdocs\\blpServidor\\lib\\smarty\\plugins\\function.counter.php';
?><!DOCTYPE html>
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
				<div><?php $_smarty_tpl->tpl_vars['n'] = new Smarty_variable(0, null, 0);?>
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
					<?php if ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']=="MC") {?>
						<?php $_smarty_tpl->tpl_vars["fila"] = new Smarty_variable("error", null, 0);?>
					<?php } elseif ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']=="MP") {?>
						<?php $_smarty_tpl->tpl_vars["fila"] = new Smarty_variable("warning", null, 0);?>
					<?php } elseif ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']=="TANQUEO") {?>
						<?php $_smarty_tpl->tpl_vars["fila"] = new Smarty_variable("info", null, 0);?>
					<?php } else { ?>
						<?php $_smarty_tpl->tpl_vars["fila"] = new Smarty_variable("default", null, 0);?>
					<?php }?>
					<tr class="<?php echo $_smarty_tpl->tpl_vars['fila']->value;?>
">
						<td width="10%"><?php echo smarty_function_counter(array(),$_smarty_tpl);?>
</td>
						<td width="20%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_CODIGO'];?>
</td>
						
						<?php if ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']=="ACTIVO") {?>
							<td width="20%"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>
</td>
						<?php } else { ?>
							<td width="20%"><font color="red"><?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO'];?>
</font></td>
						<?php }?>
						
						<td width="20%">
							<input type="hidden" name="NA_ID" value="<?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ID'];?>
"/>
							<?php if ($_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['NA_ESTADO']!="ACTIVO") {?>
								<button id="btnFalla" width="20%" class="btn btn-default" name="BUS_ID" value="<?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_ID'];?>
" onclick="this.form.action='mantenimiento_rep_fallas.php'; this.form.submit();">Reporte de Fallas</th>
								<button id="btnActivar" class="btn btn-success" name="BUS_ID" value="<?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_ID'];?>
" onclick="this.form.action='mantenimiento_activar.php'; this.form.submit();">Activar</th>
							<?php } else { ?>
								<button id="btnDiario" class="btn btn-primary" name="BUS_ID" value="<?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_ID'];?>
" onclick="this.form.action='mantenimiento_rep_diario.php'; this.form.submit();">Reporte Diario</th>
								<button id="btnProgramar" class="btn btn-info" name="BUS_ID" value="<?php echo $_smarty_tpl->tpl_vars['HERRAMIENTAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_HERRAMIENTA_ID'];?>
" onclick="this.form.action='mantenimiento_programar.php'; this.form.submit();">Programar Baja</th>
							<?php }?>
						</td>
					</tr>
				</div>
				<div>
				</div>					
				<?php endfor; endif; ?>
			</table>
		</form>	
		</div>
	</body>
</html><?php }} ?>
