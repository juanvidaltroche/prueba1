<?php /* Smarty version Smarty-3.1.16, created on 2014-05-02 15:32:35
         compiled from ".\templates\rh_ver_matriz.tpl" */ ?>
<?php /*%%SmartyHeaderCode:79015363c216e0ca25-03604874%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6e1733923299ce14f4ee8150ef3c58ff1c9d5293' => 
    array (
      0 => '.\\templates\\rh_ver_matriz.tpl',
      1 => 1399059141,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '79015363c216e0ca25-03604874',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_5363c216f27502_79354549',
  'variables' => 
  array (
    'ANALISIS' => 0,
    'CARGO' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5363c216f27502_79354549')) {function content_5363c216f27502_79354549($_smarty_tpl) {?><!DOCTYPE html>
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
					
				</table>

				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>DETALLES DE EVALUACIONES</th>
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
								onclick="this.form.action='rh_matriz_nuevo.php';this.form.submit();" 
								name="FUNCIONARIO_ID" 
								id="FUNCIONARIO_ID" 
								value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">NUEVO
							</button>
						</tr>
					</thead>
					<tr>
						<td><b>FECHA</b></td>
						<td><b>CORRESPONDE</b></td>
						<td><b>RESUMEN</b></td>
						<td><b>RESULTADOS</b></td>
						<td><b>OBSERVACIONES</b></td>
						<td><b>ACCIONES</b></td>
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
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_FECHA'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_CORRESPONDE'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_RESUMEN'];?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_RESULTADOS'];?>
</td>
						<td width="40%"><?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_OBSERVACIONES'];?>
</td>
						<td>
							<button 
								class="btn btn-info" 
								onclick="this.form.action='rh_matriz_editar.php';this.form.submit();" 
								name="MATRIZ_ID" 
								id="MATRIZ_ID" 
								value="<?php echo $_smarty_tpl->tpl_vars['CARGO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['MATRIZ_ID'];?>
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
