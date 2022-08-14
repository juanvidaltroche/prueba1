<html>
<head>
<LINK href="../css/styleusb.css" type=text/css rel=stylesheet>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<script src="../ext/ext-base.js" type="text/javascript"></script><script src="../ext/ext-all.js" type="text/javascript"></script>
<meta charset="ISO-8859-1">

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
	background-color: #4765F7;
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

#login fieldset input[type="button"] {
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
	<script type="text/javascript">
	 function validateForm() {
     var form = document.getElementById("formLogin");
     var jsUsuario = document.getElementById("username").value;
     var jsPassword = document.getElementById("password").value;
     var jsPassword2 = document.getElementById("password2").value;
     var dimU = jsUsuario.length;
     var dimP = jsPassword.length;

     if (jsPassword == jsPassword2) {
     	if (dimP > 4) {
	         if ((jsUsuario != "PrimerNombe.ApellidoPaterno" && jsPassword != "password") || (jsUsuario == 'setram')) {
	             form.submit();
	         } else {
	             alert("DATOS INCOMPLETOS!!!");
	         }
	     } else {
	         alert("Debe tener mas de 4 caracteres!!!");
	     }
     } else {
     	alert("NO COINCIDEN LAS CLAVES!!!");
     }

     
 }

 function doCargaUsuarios() {
     Ext.Ajax.request({
         url: "usb_ajax.php",
         method: "POST",
         params: {
             opcion: "LST_USUARIO"
         },
         success: function (result, request) {
             var objJson = Ext.util.JSON.decode(result.responseText);

             var jsNumeroRegistros = objJson.resultRoot.length;

             var miCombo = document.getElementById("comboUsuario");
             var idx = 0;
             miCombo.length = jsNumeroRegistros + 1;
             miCombo.options[0].text = '-- SELECCIONE USUARIO --';
             miCombo.options[0].value = '';
             idx = idx + 1;
             for (var i = 0; i < jsNumeroRegistros; i++) {
                 var jsDescripcion = objJson.resultRoot[i].USUARIO;
                 var jsId = objJson.resultRoot[i].USUARIO_ID;
                 miCombo.options[idx].text = jsDescripcion;
                 miCombo.options[idx].value = jsId;
                 idx = idx + 1;
             }
         },
         failure: function (result, request) {}
     });
 }

 function Seleccionar(combo) {
     var indice = combo.value; 
     Ext.Ajax.request({
         url: "usb_ajax.php",
         method: "POST",
         params: {
             opcion: "USUARIO",
			 id : indice
         },
         success: function (result, request) {
			var objJson = Ext.util.JSON.decode(result.responseText);
			var jsUsuarioId = objJson.resultRoot[0].USUARIO_ID; 
			var jsUsuarioCodigo = objJson.resultRoot[0].USUARIO_CODIGO; 
			var jsUsuarioTipoUsuario = objJson.resultRoot[0].USUARIO_TIPO_USUARIO; 	
			var jsTipoFuncionarioDescripcion = objJson.resultRoot[0].TIPO_FUNCIONARIO_DESCRIPCION;            
            
			var mitexto = document.getElementById("username");						
            var mih1 = document.getElementById("HjsUsuarioId");
            var mih2 = document.getElementById("HjsUsuarioTipoUsuario");
            var mih3 = document.getElementById("HjsTipoFuncionarioDescripcion");			
            mitexto.value = jsUsuarioCodigo;    
            mih1.value = jsUsuarioId;    
            mih2.value = jsUsuarioTipoUsuario;    
            mih3.value = jsTipoFuncionarioDescripcion;		
         },
         failure: function (result, request) {}
     });
 }
	</script>
</head>
<body onload="doCargaUsuarios();" background="#EF88FF">

<br/><br/><br/><br/><br/>
	<div id="login">

		<h2><span class="fontawesome-lock"></span>INICIALIZAR USB</h2>
		
		<form action="usb_validar.php" id="formLogin"  method=post>
			<fieldset>
				<p><label >ANFITRION</label></p>
				<p>
					<select  onChange="Seleccionar(this);" id="comboUsuario" width="200" name = "comboUsuario" width='100' size="1" maxlength="4000" >
						<option></option>
					</select> 
				</p>			
				<p><label for="email">USUARIO</label></p>
				<p><input type="text" width="1000" id="username" name="username" value="PrimerNombe.ApellidoPaterno" onBlur="if(this.value=='')this.value='PrimerNombe.ApellidoPaterno'" onFocus="if(this.value=='PrimerNombe.ApellidoPaterno')this.value=''"></p> <!-- JS because of IE support; better: placeholder="mail@address.com" -->

				<p><label for="password">PASSWORD</label></p>
				<p><input type="text" id="password" name = "password" value="password" onBlur="if(this.value=='')this.value='password'" onFocus="if(this.value=='password')this.value=''"></p> <!-- JS because of IE support; better: placeholder="password" -->
				
				<p><label for="password">CONFIRMACION</label></p>
				<p><input type="text" id="password2" name = "password2" value="password" onBlur="if(this.value=='')this.value='password'" onFocus="if(this.value=='password')this.value=''"></p> <!-- JS because of IE support; better: placeholder="password" -->

				<input type="hidden" id="HjsUsuarioId" name="HjsUsuarioId">
				<input type="hidden" id="HjsUsuarioTipoUsuario" name="HjsUsuarioTipoUsuario">
				<input type="hidden" id="HjsTipoFuncionarioDescripcion" name="HjsTipoFuncionarioDescripcion">

				<p><input type="button" id="submit01" value="GENERAR LLAVE" onclick="validateForm();"></p>
			</fieldset>
		</form>	
	</div> <!-- end login -->
	
</body>
</html>