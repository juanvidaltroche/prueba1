<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:14:48
         compiled from ".\templates\rh_cnt_editar.tpl" */ ?>
<?php /*%%SmartyHeaderCode:15688535bdb780efcb0-63097518%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1b0686b9ebd78aad5af88928ff73a46015e0c7bb' => 
    array (
      0 => '.\\templates\\rh_cnt_editar.tpl',
      1 => 1397138881,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '15688535bdb780efcb0-63097518',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'ANALISIS' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdb781c3d02_32826614',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdb781c3d02_32826614')) {function content_535bdb781c3d02_32826614($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
	<head>
		<title>CONTRATOS</title>
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
		<legend>DETALLE DE CONTRATO</legend>
			<form class="form-horizontal" method="POST" action="rh_cnt_guardar.php" id="formulario" name="formulario">  
				<input type="hidden" name="CONTRATO_ID" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_ID'];?>
">
				<input type="hidden" name="FUNCIONARIO_ID" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">
			
				<div class="control-group">
					<label class="control-label" for="CONTRATO_CODIGO_FUNCIONARIO">Codigo de funcionario</label>
					<div class="controls">
						<input id="CONTRATO_CODIGO_FUNCIONARIO" class="form-control" type="text" name="CONTRATO_CODIGO_FUNCIONARIO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_CODIGO_FUNCIONARIO'];?>
">
					</div>
				</div>
					
				<div class="control-group">
					<label class="control-label" for="CONTRATO_CODIGO_CONTRATO">Codigo de Contrato</label>
					<div class="controls">
						<input id="CONTRATO_CODIGO_CONTRATO" class="form-control" type="text" name="CONTRATO_CODIGO_CONTRATO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_CODIGO_CONTRATO'];?>
">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_ITEM">Numero de Item</label>
					<div class="controls">
						<input id="CONTRATO_ITEM" class="form-control" type="text" name="CONTRATO_ITEM" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_ITEM'];?>
">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_FECHA_INICIO">Fecha de Inicio</label>
					<div class="controls">
						<input id="CONTRATO_FECHA_INICIO" class="form-control" type="date" name="CONTRATO_FECHA_INICIO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_FECHA_INICIO'];?>
">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_FECHA_CONCLUSION">Fecha de Conclusion</label>
					<div class="controls">
						<input id="CONTRATO_FECHA_CONCLUSION" class="form-control" type="date" name="CONTRATO_FECHA_CONCLUSION" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_FECHA_CONCLUSION'];?>
">
					</div>
				</div>
				
				<div class="control-group">
					<label class="control-label" for="CONTRATO_OBSERVACIONES">Observaciones</label>
					<div class="controls">
						<input id="CONTRATO_OBSERVACIONES" class="form-control" type="text" name="CONTRATO_OBSERVACIONES" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_OBSERVACIONES'];?>
">
					</div>
				</div>

				<div class="control-group">
					<div class="col-xs-offset-2 controls">
						<button 
							class="btn btn-default" 
							onclick="this.form.action='rh_ver.php';this.form.submit();" 
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
