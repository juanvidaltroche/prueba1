<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:21:52
         compiled from ".\templates\mantenimiento_rep_fallas_.tpl" */ ?>
<?php /*%%SmartyHeaderCode:10002535bdd20e50126-82945385%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2cd4a9f8fdf67e9d4ad37e4ee9d4ccd8781b78c1' => 
    array (
      0 => '.\\templates\\mantenimiento_rep_fallas_.tpl',
      1 => 1398476518,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10002535bdd20e50126-82945385',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'INFO_BUS' => 0,
    'ID_BUS' => 0,
    'PROG_FALLAS' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdd2102fd16_77861541',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdd2102fd16_77861541')) {function content_535bdd2102fd16_77861541($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_date_format')) include 'C:\\xampp\\htdocs\\blpServidor\\lib\\smarty\\plugins\\modifier.date_format.php';
?><!DOCTYPE html>
<html lang="es">
	<head>
		<title>REPORTE DE FALLAS</title>
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<!--<link href="../lib/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">-->
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
        <script src="../lib/jquery-1.9.1.min.js"></script>
		<script src="../lib/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.js"></script>
		<script src="../lib/bootstrap/js/bootstrap-datepicker.js"></script>
        <script type="text/javascript">
            // When the document is ready
            $(document).ready(function () {
				$("input[type='date']").datepicker({
                    format: "yyyy/mm/dd" 
                });  
            });
        </script>	
	</head>
	<body>
			<legend>REPORTE DE FALLAS</legend>
			<div>			
				<table>
					<tr valign="top">
					<td><LABEL><b>HERRAMIENTA:</b><?php echo $_smarty_tpl->tpl_vars['INFO_BUS']->value[0]['TIPO_HERRAMIENTA_CODIGO'];?>
</LABEL></td>
					<td><LABEL><b>DESCRIPCION:</b><?php echo $_smarty_tpl->tpl_vars['INFO_BUS']->value[0]['TIPO_HERRAMIENTA_DESCRIPCION'];?>
</LABEL></td>
					<td><LABEL><b>NRO. ASIENTOS:</b><?php echo $_smarty_tpl->tpl_vars['INFO_BUS']->value[0]['TIPO_HERRAMIENTA_ASIENTOS'];?>
</LABEL></td>
					<td><LABEL><b>ESTADO:</b><?php echo $_smarty_tpl->tpl_vars['INFO_BUS']->value[0]['TIPO_HERRAMIENTA_ESTADO'];?>
</LABEL></td>
					</tr>
				</table>
			</div>
			<br />
			<form action="" name="formulario" id="formulario" method="POST">				
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
						   	<th>DATOS</th>
						   	<th>INFORME</th>	
						</tr>
					</thead>
					<tbody>
						<tr valign="top">
							<td>Fecha</td>
							<td>
								<input id="FECHA_FALLA" class="form-control" type="date" name="FECHA_FALLA">
							</td>
						</tr>
						<tr valign="top">
							<td>Tipo de Falla</td>
							<td>							
								<select name="TIPO_FALLA" id="TIPO_FALLA">
									<option value="">--seleccione--</option>
									<option value="MECANICO">MECANICO</option>
									<option value="HIDRAULICO">HIDRAULICO</option>
									<option value="ELECTRONICO">ELECTRONICO</option>
								</select>
							</td>
							<!--<input type="text" name="">Preventivo|Correctivo</td>-->
						</tr>
						<tr valign="top">
							<td>Detalle</td>
							<td><textarea name="OBS_FALLA" id="OBS_FALLA" rows="3" cols="70"></textarea></td>
						</tr>						
					</tbody>					
				</table>
				<table>
					<tr valign="top">							
						<td>
							<input type="hidden" name="ID_BUS" value="<?php echo $_smarty_tpl->tpl_vars['ID_BUS']->value;?>
">
							<input type="hidden" name="LINEA" value="<?php echo $_smarty_tpl->tpl_vars['INFO_BUS']->value[0]['NA_LINEA'];?>
">
						</td>
						<td>
							<button 
								class="btn btn-default" 
								onclick="this.form.action='mantenimiento.php';this.form.submit();">Volver
							</button>
						</td>
						<td>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='fallasAjax.php';this.form.submit();">Guardar
							</button>
						</td>
					</tr>
				</table>
			</div>
			<br />
			<div>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
						   	<th>FECHA</th>
						   	<th>TIPO</th>
						   	<th>DETALLE</th>
							<!-- <th>ACCION</th> -->
						</tr>
					</thead>
					<tbody>
						<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['PROG_FALLAS']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
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
							<td width="20%"><?php echo $_smarty_tpl->tpl_vars['PROG_FALLAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MT_FALLA_FECHA_ID'];?>
</td>
							<td width="20%"><?php echo $_smarty_tpl->tpl_vars['PROG_FALLAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MT_FALLA_TIPO_FALLA'];?>
</td>
							<td width="20%"><?php echo $_smarty_tpl->tpl_vars['PROG_FALLAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MT_FALLA_DESCRIPCION'];?>
</td>
							<!--
							<?php if ($_smarty_tpl->tpl_vars['PROG_FALLAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MT_FALLA_FECHA_ID']==smarty_modifier_date_format(time(),"%Y-%m-%d")) {?> 
							<td>
								<button width="25%" class="btn btn-danger" 
										onclick="this.form.action='mantenimiento_estado.php';this.form.submit();" 
										name="MT_PRG_TIPO_ID" id="MT_PRG_TIPO_ID" 
										value="<?php echo $_smarty_tpl->tpl_vars['PROG_FALLAS']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MT_PRG_TIPO_FALLA'];?>
">ACTIVAR BAJA
								</button>
							</td>
							<?php } else { ?>
							<td></td>
							<?php }?>
							-->
						</tr>
						<?php endfor; endif; ?>
					</tbody>
				</table>
			</div>
			</form>
	</body>
</html>
<?php }} ?>
