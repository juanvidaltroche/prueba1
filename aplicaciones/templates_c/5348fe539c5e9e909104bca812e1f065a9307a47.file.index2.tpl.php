<?php /* Smarty version Smarty-3.1.16, created on 2014-04-26 12:12:37
         compiled from ".\templates\index2.tpl" */ ?>
<?php /*%%SmartyHeaderCode:20660535bdaf5a06381-78789056%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5348fe539c5e9e909104bca812e1f065a9307a47' => 
    array (
      0 => '.\\templates\\index2.tpl',
      1 => 1397081083,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '20660535bdaf5a06381-78789056',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'TIPO' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535bdaf5ab3a33_20679056',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535bdaf5ab3a33_20679056')) {function content_535bdaf5ab3a33_20679056($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>SISTEMA DE MONITOREO</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-custom.min.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
		
		<script src="../lib/bootstrap/js/jquery-1.7.2.min.js"></script>
		<script src="../lib/bootstrap/js/bootstrap-custom.min.js"></script>
		
		 <script type="text/javascript">
			function cargaIFrame(menu, opcion) {
				if (menu === 1) {
					window.frames.principal.location.href = "html/zonaPublica/"+opcion+".html";
				} else if (menu === 2) {
					window.frames.principal.location.href = "html/hazteSocio/"+opcion+".html";
				}else if (menu === 3) {
					window.frames.principal.location.href = "html/hazLogin.html";
				}
			}
		</script>
		
		<style type="text/css">
			.bs-example{
				margin: 50px;
			}
		</style>
	</head>
	<body>
	
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</a>
				<div class="nav-collapse">
					<ul class="nav">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Recursos Humanos <b class="caret"></b></a>
							<ul class="dropdown-menu">
							<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['TIPO']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
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
								<li>
									<a 	href="#" 
										onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'rh_listado.php?id=<?php echo $_smarty_tpl->tpl_vars['TIPO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_FUNCIONARIO_ID'];?>
';"><?php echo $_smarty_tpl->tpl_vars['TIPO']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TIPO_FUNCIONARIO_DESCRIPCION'];?>

									</a>
								</li>
							<?php endfor; endif; ?>
							</ul>
						</li>
					</ul>
				</div><!--/.nav-collapse -->
			</div>
		</div>
    </div>
	<div class="bs-example">
		<iframe src="" id="FrameID" width="99%" height="635"  frameborder="0">
		</iframe> 
	</div>
	
	</body>
</html><?php }} ?>
