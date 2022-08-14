<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:13:03
         compiled from ".\templates\rh_editar.tpl" */ ?>
<?php /*%%SmartyHeaderCode:27627535bdb0f14fb81-57982358%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5a34b40afcfb1502744f574d65fe2c628778cbe5' => 
    array (
      0 => '.\\templates\\rh_editar.tpl',
      1 => 1397134385,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '27627535bdb0f14fb81-57982358',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'ANALISIS' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdb0f2676e5_81867843',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdb0f2676e5_81867843')) {function content_535bdb0f2676e5_81867843($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
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
	</head>
	<body>
		<legend>DATOS PERSONALES</legend>
		<form class="form-horizontal" method="POST" action="rh_guardar.php" id="formulario" name="formulario">  
			<input type="hidden" name="FUNCIONARIO_ID" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">
			<input type="hidden" name="TIPO_FUNCIONARIO_ID" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['TIPO_FUNCIONARIO_ID'];?>
">
			
			<div class="control-group">
				<label class="control-label" for="USUARIO_CODIGO">Nombre de Usuario</label>
				<div class="controls">
					<input id="USUARIO_CODIGO" class="form-control" type="text" name="USUARIO_CODIGO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['USUARIO_CODIGO'];?>
" readOnly="true">
				</div>
			</div>
		
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_CI">Cedula de Identidad</label>
				<div class="controls">
					<input id="FUNCIONARIO_CI" class="form-control" type="text" name="FUNCIONARIO_CI" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_CI'];?>
" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_PATERNO">Apellido Paterno</label>
				<div class="controls">
					<input id="FUNCIONARIO_PATERNO" class="form-control" type="text" name="FUNCIONARIO_PATERNO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_PATERNO'];?>
" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_MATERNO">Apellido Materno</label>
				<div class="controls">
					<input id="FUNCIONARIO_MATERNO" class="form-control" type="text" name="FUNCIONARIO_MATERNO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_MATERNO'];?>
" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="FUNCIONARIO_NOMBRES">Nombres</label>
				<div class="controls">
					<input id="FUNCIONARIO_NOMBRES" class="form-control" type="text" name="FUNCIONARIO_NOMBRES" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_NOMBRES'];?>
" readOnly="true">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_FECHA_NAC">Fecha de Nacimiento</label>
				<div class="controls">
					<input id="DATOS_FECHA_NAC" class="form-control" placeholder="Fecha de Nacimiento" type="date" name="DATOS_FECHA_NAC" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_FECHA_NAC'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_DIRECCION">Dirección</label>
				<div class="controls">
					<input id="DATOS_DIRECCION" class="form-control" placeholder="Dirección" type="text" name="DATOS_DIRECCION" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_DIRECCION'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_TELEFONO">Teléfono</label>
				<div class="controls">
					<input id="DATOS_TELEFONO" class="form-control" placeholder="Teléfono" type="text" name="DATOS_TELEFONO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_TELEFONO'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_MOVIL">Telefono móvil</label>
				<div class="controls">
					<input id="DATOS_EMAIL" class="form-control" placeholder="Telefono móvil" type="text" name="DATOS_MOVIL" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_MOVIL'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="DATOS_EMAIL">Correo electrónico</label>
				<div class="controls">
					<input id="DATOS_EMAIL" class="form-control" placeholder="Correo electrónico" type="email" name="DATOS_EMAIL" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['DATOS_EMAIL'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<div class="col-xs-offset-2 controls">
					<button 
						class="btn btn-default" 
						onclick="this.form.action='rh_listado.php';this.form.submit();" 
						name="PRS_ID" 
						id="PRS_ID"
						value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">CANCELAR
					</button>
					<button 
						class="btn btn-primary" 
						type="submit">GUARDAR
					</button>
				</div>
			</div>
		</form> 
	</body> 
</html><?php }} ?>
