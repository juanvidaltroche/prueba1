<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:13:19
         compiled from ".\templates\rh_ver.tpl" */ ?>
<?php /*%%SmartyHeaderCode:25821535bdb1fbf1fb3-54316967%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '552d1a4ecdbf4eb013fc41cce8023a40ca1c0741' => 
    array (
      0 => '.\\templates\\rh_ver.tpl',
      1 => 1397082026,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '25821535bdb1fbf1fb3-54316967',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'ANALISIS' => 0,
    'CARGO' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdb1fd4cab8_03562749',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdb1fd4cab8_03562749')) {function content_535bdb1fd4cab8_03562749($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
	<head>
		<title>PERSONAL</title>
		<link href="../lib/bootstrap2/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
        <script src="../lib/jquery-1.9.1.min.js"></script>
		<script src="../lib/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap-datepicker.js"></script>
		<script src="../lib/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript">
            // When the document is ready
            $(document).ready(function () {
				$("input[type='date']").datepicker({
                    format: "yyyy/mm/dd" 
                });  
            });
        </script>
	
		<style type="text/css">
			.bs-example{
				margin: 50px;
			}
		</style>
	</head>
	<body>
		<form class="form-horizontal" method="POST" action="" id="formulario" name="formulario">  
			<legend>DETALLE DE PERSONAL</legend>
			<div>
				<table class="table table-striped table-bordered table-hover">
					<tr>
						<td width="20%"><b>CARGO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['TIPO_FUNCIONARIO_DESCRIPCION'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>NOMBRE DE USUARIO</b></td> 
						<td><b><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['USUARIO_CODIGO'];?>
</b></td>
					</tr>
					<tr>
						<td width="20%"><b>CEDULA DE IDENTIDAD</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_CI'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>APELLIDO PATERNO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_PATERNO'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>APELLIDO MATERNO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_MATERNO'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>NOMBRES</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_NOMBRES'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>FECHA DE NACIMIENTO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_FECHA_NAC'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>DIRECCION</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_DIRECCION'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>TELEFONO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_TELEFONO'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>CELULAR</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_MOVIL'];?>
</td>
					</tr>
					<tr>
						<td width="20%"><b>CORREO ELECTRONICO</b></td> 
						<td><?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_EMAIL'];?>
</td>
					</tr>
					
				</table>

				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>DETALLES DE CONTRATO</th>
							<button 
								class="btn btn-default" 
								onclick="this.form.action='rh_listado.php';this.form.submit();" 
								name="TIPO_FUNCIONARIO_ID" 
								id="TIPO_FUNCIONARIO_ID" 
								value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['TIPO_FUNCIONARIO_ID'];?>
">VOLVER
							</button>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='rh_cnt_nuevo.php';this.form.submit();" 
								name="FUNCIONARIO_ID" 
								id="FUNCIONARIO_ID" 
								value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">NUEVO
							</button>
						</tr>
					</thead>
					<tr>
						<td><b>CODIGO</b></td>
						<td><b>ITEM</b></td>
						<td><b>FECHA INICIO</b></td>
						<td><b>FECHA FINAL</b></td>
						<td><b>OBSERVACIONES</b></td>
						<td><b>SELECCIONAR</b></td>
					</tr>
					<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['CARGO']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
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
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_CODIGO_FUNCIONARIO'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_ITEM'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_FECHA_INICIO'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_FECHA_CONCLUSION'];?>
</td>
						<td width="40%"><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_OBSERVACIONES'];?>
</td>
						<td>
							<button 
								class="btn btn-primary" 
								onclick="this.form.action='rh_cnt_editar.php';this.form.submit();" 
								name="CONTRATO_ID" 
								id="CONTRATO_ID" 
								value="<?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['CONTRATO_ID'];?>
">EDITAR
							</button>
						</td>
					</tr>
					<?php endfor; endif; ?>
				</table>
			</div>
		</form> 
	</body> 
</html>

<?php }} ?>
