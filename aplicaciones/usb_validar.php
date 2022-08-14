<?php
//header("Content-type: application/x-file");
//header("Content-Disposition: attachment; filename=dongle.usb");
//readfile("dongle.usb");
$username   = chop(trim($_POST['username']));
$password   = chop(trim($_POST['password']));

$UsuarioId = chop(trim($_POST['HjsUsuarioId']));

$UsuarioTipoUsuario = chop(trim($_POST['HjsUsuarioTipoUsuario']));
$TipoFuncionarioDescripcion = chop(trim($_POST['HjsTipoFuncionarioDescripcion']));
$pass = md5($password);

$j = json_encode(Array("usr" => $username, "dgl" => $pass,"tipo" => $UsuarioTipoUsuario,"idusuario" => $UsuarioId,"tipo_funcionario_session" => $TipoFuncionarioDescripcion));



try{
	$a = fopen("dongle.usb", "w+");
	if($a){
		fwrite($a, $j);
		fclose($a);
	}else{
		echo 'No tiene conectado la unidad usb!!!';
	}
	//echo '<a href="dongle.usb" >descargar</a>';
	$a = 'SaveAs';
	$b = 'true';
	$c = 'dongle.usb';
	
	header("location:usb_guardaDongle.html");

}catch (Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}

?>