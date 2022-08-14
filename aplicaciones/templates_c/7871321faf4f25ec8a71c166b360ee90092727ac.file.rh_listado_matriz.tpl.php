<?php /* Smarty version Smarty-3.1.16, created on 2014-05-02 12:10:53
         compiled from ".\templates\rh_listado_matriz.tpl" */ ?>
<?php /*%%SmartyHeaderCode:125795363c38dc0a366-29615698%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7871321faf4f25ec8a71c166b360ee90092727ac' => 
    array (
      0 => '.\\templates\\rh_listado_matriz.tpl',
      1 => 1398882672,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '125795363c38dc0a366-29615698',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'PERSONAL' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_5363c38dce3c43_52548816',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5363c38dce3c43_52548816')) {function content_5363c38dce3c43_52548816($_smarty_tpl) {?><!DOCTYPE html>
<html>
	<head>
		<title>PERSONAL</title>
		<!-- <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"> -->
		
		<link rel="stylesheet" type="text/css" href="../lib/bootstrap3/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="../lib/datatables/dataTables.bootstrap.css">
		
		<script type="text/javascript" language="javascript" src="../lib/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" language="javascript" src="../lib/datatables/jquery.dataTables.min.js"></script>
		<script type="text/javascript" language="javascript" src="../lib/datatables/dataTables.bootstrap.js"></script>
		
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function() {
				$('#mytable').dataTable();
			} );
		</script>
	</head>
	<body>
		<form method="POST" action="" id="formulario" name="formulario">  
			<legend>REGISTROS DEL PERSONAL</legend>
			<div class="container">
				<table id="mytable" class="table table-striped table-bordered table-hover" cellpadding="0" cellspacing="0" border="0">
					<thead>
						<tr>
							<th>C.I.</th>
							<th>NOMBRES</th>
							<th>APELLIDO PATERNO</th>
							<th>APELLIDO PATERNO</th>
							<th>CARGO</th>
							<th>SELECCIONAR</th>
						</tr>
					</thead>
					<tbody>
					<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['PERSONAL']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
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
						<tr class="odd gradeX">
							<td><?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['FUNCIONARIO_CI'];?>
</td>
							<td><?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['FUNCIONARIO_NOMBRES'];?>
</td>
							<td><?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['FUNCIONARIO_PATERNO'];?>
</td>
							<td><?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['FUNCIONARIO_MATERNO'];?>
</td>
							<td><?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_FUNCIONARIO_DESCRIPCION'];?>
</td>
							<td>
								<button class="btn btn-primary" onclick="this.form.action='rh_ver_matriz.php';this.form.submit();" name="PRS_ID" id="PRS_ID" value="<?php echo $_smarty_tpl->tpl_vars['PERSONAL']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['FUNCIONARIO_ID'];?>
">EVALUACIONES</button>
							</td>
						</tr>
					<?php endfor; endif; ?>
					</tbody>
				</table>
			</table>
		</form>  
	</body>
</html>
<?php }} ?>
