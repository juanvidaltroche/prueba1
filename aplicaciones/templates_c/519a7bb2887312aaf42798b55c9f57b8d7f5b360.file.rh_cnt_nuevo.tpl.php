<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:13:35
         compiled from ".\templates\rh_cnt_nuevo.tpl" */ ?>
<?php /*%%SmartyHeaderCode:30802535bdb2f8db680-02342567%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '519a7bb2887312aaf42798b55c9f57b8d7f5b360' => 
    array (
      0 => '.\\templates\\rh_cnt_nuevo.tpl',
      1 => 1397138880,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '30802535bdb2f8db680-02342567',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'ANALISIS' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdb2f975559_04481801',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdb2f975559_04481801')) {function content_535bdb2f975559_04481801($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
	<head>
		<title>CONTRATOS</title>
		<link href="../lib/bootstrap2/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/datepicker.css" rel="stylesheet">
		
		<!-- Load jQuery and bootstrap datepicker scripts -->
        <script src="../lib/jquery-1.9.1.min.js"></script>
		<script src="../lib/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js"></script>
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
		<legend>DETALLE DE CONTRATO</legend>
		<form role="form" class="form-horizontal" method="POST" action="" id="formulario" name="formulario">  

			<div class="control-group">
				<label class="control-label" for="CONTRATO_CODIGO_FUNCIONARIO">Codigo de funcionario</label>
				<div class="controls">
					<input id="CONTRATO_CODIGO_FUNCIONARIO" class="form-control" type="text" name="CONTRATO_CODIGO_FUNCIONARIO" value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['CONTRATO_CODIGO_FUNCIONARIO'];?>
">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="CONTRATO_CODIGO_CONTRATO">Codigo de contrato</label>
				<div class="controls">
					<input id="CONTRATO_CODIGO_CONTRATO" class="form-control" type="text" name="CONTRATO_CODIGO_CONTRATO">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="CONTRATO_ITEM">Numero de Item</label>
				<div class="controls">
					<input id="CONTRATO_ITEM" class="form-control" type="text" name="CONTRATO_ITEM">
				</div>
			</div>
				
			<div class="control-group">
				<label class="control-label" for="CONTRATO_FECHA_INICIO">Fecha de Inicio</label>
				<div class="controls">
					<input id="CONTRATO_FECHA_INICIO" class="form-control" type="date" name="CONTRATO_FECHA_INICIO">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="CONTRATO_FECHA_CONCLUSION">Fecha de Conclusion</label>
				<div class="controls">
					<input id="CONTRATO_FECHA_CONCLUSION" class="form-control" type="date" name="CONTRATO_FECHA_CONCLUSION">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="CONTRATO_OBSERVACIONES">Observaciones</label>
				<div class="controls">
					<textarea id="CONTRATO_OBSERVACIONES" class="form-control" type="textarea" name="CONTRATO_OBSERVACIONES"></textarea>
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
						onclick="this.form.action='rh_cnt_guardar.php';this.form.submit();" 
						name="FUNCIONARIO_ID" 
						id="FUNCIONARIO_ID" 
						value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">GUARDAR
					</button>
				</div>
			</div>
		
		</form> 
	</body> 
</html>

<?php }} ?>
