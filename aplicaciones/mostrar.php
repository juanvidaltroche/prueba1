<table border="2" cellspacing=3 cellpadding=1 style="font-size:8pt"><tr bgcolor="#999999">
<td><b>GIRO</b></td>
<td><b>FECHA REGISTRO</b></td>
<td><b>HERRAMIENTA</b></td>
<td><b>ANFITRION</b></td>
<td><b>MONTO</b></td>
</tr>

<?php  
  $link = @mysql_connect("localhost", "root","")
      or die ("Error al conectar a la base de datos.");
  @mysql_select_db("cobro_buses_origen", $link)
      or die ("Error al conectar a la base de datos.");

  $query = "SELECT LQD_GIRO_ID AS ID_GIRO,LQD_REGISTRO,H.HRR_DESCRIPCION AS HERRAMIENTA,LQD_ANFITRION AS USUARIO,LQD_MONTO AS MONTO FROM mb_liquidaciones AS LQ
             inner join mb_giros G ON G.GIRO_ID=LQ.LQD_GIRO_ID 
             INNER JOIN mb_herramientas AS H ON H.HRR_ID=LQ.LQD_HRR_ID
             ORDER BY 2";
  $result = mysql_query($query);
  $num = 0;
  while($row = mysql_fetch_array($result))
  {
    echo "<tr width=\"1%\"><td width=\"1%\" bgcolor=\"#C0Cbbb\"><font face=\"verdana\">" . 
	    $row["ID_GIRO"] . "</font></td>";
	echo "<td width=\"1%\" bgcolor=\"#C0Cbbb\"><font face=\"verdana\">" . 
	    $row["LQD_REGISTRO"]. "</font></td>"; 
    echo "<td width=\"2%\" bgcolor=\"#C0Cbbb\"><font face=\"verdana\">" . 
	    $row["HERRAMIENTA"] . "</font></td>";
    echo "<td width=\"2%\" bgcolor=\"#C0Cbbb\"><font face=\"verdana\">" . 
	    $row["USUARIO"] . "</font></td>";
	echo "<td width=\"2%\" bgcolor=\"#C0Cbbb\"><font face=\"verdana\">" . 
	    $row["MONTO"]. "</font></td></tr>"; 		
    $num++;
  }
  mysql_free_result($result);
  mysql_close($link);
?>
</table>
