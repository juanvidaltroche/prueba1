<?php /* Smarty version Smarty-3.1.16, created on 2014-05-02 17:19:32
         compiled from ".\templates\rh_matriz_nuevo.tpl" */ ?>
<?php /*%%SmartyHeaderCode:108345363c21b1d6bc4-85753088%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5d0db56e5ce7137d1dd87136150310b8840c7ba7' => 
    array (
      0 => '.\\templates\\rh_matriz_nuevo.tpl',
      1 => 1399065504,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '108345363c21b1d6bc4-85753088',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_5363c21b26bac0_36780024',
  'variables' => 
  array (
    'ANALISIS' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5363c21b26bac0_36780024')) {function content_5363c21b26bac0_36780024($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
<meta charset="utf-8"> 
	<head>
		<title>MATRIZ DE EVALUACIONES</title>
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
		<legend>DETALLE DE EVALUACION</legend>
		<form role="form" class="form-horizontal" method="POST" action="" id="formulario" name="formulario">  

			<div class="control-group">
				<label class="control-label" for="MATRIZ_FECHA">Fecha</label>
				<div class="controls">
					<input id="MATRIZ_FECHA" class="form-control" type="date" name="MATRIZ_FECHA">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_CORRESPONDE">Corresponde</label>
				<div class="controls">
					<input id="MATRIZ_CORRESPONDE" class="form-control" type="text" name="MATRIZ_CORRESPONDE">
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_RESUMEN">Resumen</label>
				<div class="controls">
					<textarea id="MATRIZ_RESUMEN" class="form-control" type="textarea" name="MATRIZ_RESUMEN"></textarea>
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_RESULTADOS">Resultados</label>
				<div class="controls">
					<select id="MATRIZ_RESULTADOS" name="MATRIZ_RESULTADOS">
						<option value="-1">--Sin evaluacion--</option>
						<option value="BUENO">BUENO</option>
						<option value="REGULAR">REGULAR</option>
						<option value="A MEJORAR">A MEJORAR</option>
					</select>
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="MATRIZ_OBSERVACIONES">Observaciones</label>
				<div class="controls">
					<textarea id="MATRIZ_OBSERVACIONES" class="form-control" type="textarea" name="MATRIZ_OBSERVACIONES"></textarea>
				</div>
			</div>
			
			<div class="control-group">
				<div class="col-xs-offset-2 controls">
					<button 
						class="btn btn-default" 
						onclick="this.form.action='rh_ver_matriz.php';this.form.submit();" 
						name="PRS_ID" 
						id="PRS_ID" 
						value="<?php echo $_smarty_tpl->tpl_vars['ANALISIS']->value[0]['FUNCIONARIO_ID'];?>
">CANCELAR
					</button>
					<button 	
						class="btn btn-primary" 
						onclick="this.form.action='rh_matriz_guardar.php';this.form.submit();" 
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
