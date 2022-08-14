<!DOCTYPE html>
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
							{section name=i loop=$TIPO}
								<li>
									<a 	href="#" 
										onclick="var iframe = document.getElementById('FrameID'); iframe.src = 'rh_listado.php?id={$TIPO[i].TIPO_FUNCIONARIO_ID}';">{$TIPO[i].TIPO_FUNCIONARIO_DESCRIPCION}
									</a>
								</li>
							{/section}
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
</html>