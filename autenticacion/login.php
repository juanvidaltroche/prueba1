<?php
session_start();
include "../constantes.php";

if (isset($_SESSION['usr_session']))
    header("location: " . RAIZ . "index.php");

?>
<html>
<head>
<LINK href="<?php echo RAIZ ?>css/style.css" type=text/css rel=stylesheet>
<style type="text/css">
@charset "utf-8";

label {
	border: none;
	font-family: inherit;
	font-size: 15px;
	font-weight: inherit;
	line-height: inherit;
	-webkit-appearance: none;
	width:300px
}

input {
	border: none;
	font-family: inherit;
	font-size: 15px;
	font-weight: inherit;
	line-height: inherit;
	-webkit-appearance: none;
	width:300px
}

select {
	border: none;
	background-color: #eee;
	font-family: inherit;
	font-size: 15px;
	font-weight: inherit;
	line-height: inherit;
	-webkit-appearance: none;
	width:300px
}
option {
	border: none;
	font-family: inherit;
	font-size: 15px;
	font-weight: inherit;
	line-height: inherit;
	-webkit-appearance: none;
	width:300px
}

/* ---------- LOGIN ---------- */

#login {
	margin: 50px auto;
	width: 400px;
}

#login h2 {
	background-color: #f95252;
	-webkit-border-radius: 20px 20px 0 0;
	-moz-border-radius: 20px 20px 0 0;
	border-radius: 20px 20px 0 0;
	color: #fff;
	font-size: 28px;
	padding: 20px 26px;
}

#login h2 span[class*="fontawesome-"] {
	margin-right: 14px;
}

#login fieldset {
	background-color: #fff;
	-webkit-border-radius: 0 0 20px 20px;
	-moz-border-radius: 0 0 20px 20px;
	border-radius: 0 0 20px 20px;
	padding: 20px 26px;
}

#login fieldset p {
	color: #777;
	margin-bottom: 14px;
}

#login fieldset p:last-child {
	margin-bottom: 0;
}

#login fieldset input {
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}

#login fieldset input[type="email"], #login fieldset input[type="password"],#login fieldset input[type="text"] {
	background-color: #eee;
	color: #777;
	padding: 4px 10px;
	width: 328px;
}

#login fieldset input[type="submit"] {
	background-color: #33cc77;
	color: #fff;
	display: block;
	margin: 0 auto;
	padding: 4px 0;
	width: 200px;
}

#login fieldset input[type="submit"]:hover {
	background-color: #28ad63;
}
</style>
</head>

<body>

<br/><br/><br/><br/><br/><br/><br/><br/>
	<div id="login">

		<h2><span class="fontawesome-lock"></span>AUTENTIFICACION</h2>
		
		<form action="validar.php" id="formLogin"  method=post>

			<fieldset>

				
				<p><label for="email">USUARIO</label></p>
				<p><input type="text" width="1000" id="username" name="username" value="PrimerNombe.ApellidoPaterno" onBlur="if(this.value=='')this.value='PrimerNombe.ApellidoPaterno'" onFocus="if(this.value=='PrimerNombe.ApellidoPaterno')this.value=''"></p> <!-- JS because of IE support; better: placeholder="mail@address.com" -->

				<p><label for="password">PASSWORD</label></p>
				<p><input type="password" id="password" name = "password" value="password" onBlur="if(this.value=='')this.value='password'" onFocus="if(this.value=='password')this.value=''"></p> <!-- JS because of IE support; better: placeholder="password" -->
				

				<p><input type=submit value="AUTENTIFICARSE"></p>

			</fieldset>

		</form>
							

	</div> <!-- end login -->



</body>
</html>