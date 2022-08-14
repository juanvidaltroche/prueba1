<?php
session_start(); 
include "../constantes.php";

if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>
<html>
<head>
	 
</head>
<body>
<form name="form1" method="post" action="">
  <div align="center">
    <table border="1" cellspacing="0" cellpadding="0">
      <tr>
        <th colspan="2" scope="col">REPORTE DIARIO DE RECAUDO POR CAJERO</th>
      </tr>
      <tr>
        <td>Cajero</td>
        <td><select name="select" id="select">
          <option value="1">German</option>
          <option value="2">Tanya</option>
        </select></td>
      </tr>
      <tr>
        <td colspan="2"><label>
          <input type="submit" name="button" id="button" value="Enviar">
        </label></td>
      </tr>
    </table>
  </div>
</form>
</body>
</html>