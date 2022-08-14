<?php /* Smarty version Smarty-3.1.16, created on 2014-07-24 14:59:03
         compiled from ".\templates\index4.tpl" */ ?>
<?php /*%%SmartyHeaderCode:5005535ba95ee6da95-65404506%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2334002bc538f0ef74e487f11e16a1a7248b5c1b' => 
    array (
      0 => '.\\templates\\index4.tpl',
      1 => 1406228339,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '5005535ba95ee6da95-65404506',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_535ba95eedeca6_27209742',
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_535ba95eedeca6_27209742')) {function content_535ba95eedeca6_27209742($_smarty_tpl) {?><!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>SISTEMA DE MONITOREO</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link href="../lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-custom.min.css" rel="stylesheet">
		<link href="../lib/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
		<script src="../lib/bootstrap/js/jquery-1.7.2.min.js"></script>
		<script src="../lib/bootstrap/js/bootstrap-custom.min.js"></script>
		
		<style type="text/css">
			.bs-example{
				margin: 50px;
			}
		</style>
		<script language="javascript" type="text/javascript">
		    window.onresize = function() {
				var oFrame = document.getElementById("FrameID");				
				if(oFrame){
					oFrame.width = window.innerWidth - 65;
					oFrame.height = window.innerHeight - 80;
				}else{
					alert("El campo no existe!!");
				}
			};
			function maximizarFrame(){
				var oFrame = document.getElementById("FrameID");				
				if(oFrame){
					oFrame.width = window.innerWidth - 65;
					oFrame.height = window.innerHeight - 80;
				}else{
					alert("El campo no existe!!");
				}
			}
		</script>
		
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
						<li>
							<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'mantenimiento.php';">Mantenimiento de Buses</a>
						</li>
						<li>
							<div class="nav-collapse">
								<ul class="nav">
									<li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">Monitoreo de Buses <b class="caret"></b></a>
										<ul class="dropdown-menu">
											<li>
												<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'monitoreo.php';">Por Bus y Linea.</a>
											</li>
											<li>
												<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'monitoreoGlobal.php';">Por Linea</a>
											</li>
											<li>
												<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'seguimiento_buses.php';">Georeferenciado</a>
											</li>
											<li>
												<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'mantenimiento_seguimiento_geo_mapa.php';">GeoServer</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<a href="#" onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'ping.php';">Netbooks</a>
						</li>
					</ul>
				</div><!--/.nav-collapse -->
			</div>
		</div>
    </div>
	<div class="bs-example">
		<!-- <iframe class="iframe" src="/" seamless="" id="FrameID" height="100%" width="735" frameborder="0" allowfullscreen></iframe> -->
		<iframe width="600" height="800" onload="maximizarFrame();" src="" id="FrameID" frameborder="0">
	</iframe>
	</div>

	
	</body>
</html><?php }} ?>
