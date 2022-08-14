<style>
div {
	background-color:#f2f2f2;
	font-family:Lucida Console;
	font-size:x-small;
}
.campo_etiqueta {
	background-color:#d9f5e0;
	font-family:Lucida Console;
	font-size:small;
}
.campo_valor {
	background-color:#f2f2f2;
	font-family:Lucida Console;
	font-size:x-small;
}
</style>
<form method="POST" action="hola2.php" id="formulario" name="formulario">  

<div>
<table border="0" width="100%">
	<tr>
		<td align="center" bgcolor="beige"><h3>{$CAMPOS[0].ACT_NOMBRE}</h3></td>
	</tr>
</table>

{assign var=f value=0}
{assign var=sw value=0}
<table border="0"  width="100%" cellpadding="0" cellspacing="0">
{section name=outer loop=$CAMPOS}
	<!-- HTML precargado -->
 	{if $f neq $CAMPOS[outer].FC_EJEY}
		<!--tr></tr-->
		</tr><tr>

		{assign var=f value=$CAMPOS[outer].FC_EJEY}
	{/if}
	
	{if $CAMPOS[outer].TC_CODIGO eq 'ttl' }
		<tr><td bgcolor="pink" width="100%" colspan="10"><strong>{$CAMPOS[outer].CMP_ETIQUETA}</strong></td></tr>
	{elseif $CAMPOS[outer].TC_CODIGO eq 'stt' }
		{if sw eq 0}
			<table width="100%" id="subformulario_{$CAMPOS[outer].CMP_NOMBRE}" name="subformulario_{$CAMPOS[outer].CMP_NOMBRE}"><tr><td bgcolor="pink" width="100%" colspan="10">{$CAMPOS[outer].HTML}</tr></td>
			{assign var=sw value=1}
		{else}
			</table><table width="100%" id="subformulario_{$CAMPOS[outer].CMP_NOMBRE}" name="subformulario_{$CAMPOS[outer].CMP_NOMBRE}"><tr><td bgcolor="pink" width="100%" colspan="10">{$CAMPOS[outer].HTML}</tr></td></table>
		{/if}
	{elseif $CAMPOS[outer].TC_CODIGO eq 'spa' }
		<tr><td bgcolor="pink" width="100%" colspan="10">{$CAMPOS[outer].HTML}</td></tr>
	{else}
		{if $CAMPOS[outer].TC_CODIGO eq 'edt' or $CAMPOS[outer].TC_CODIGO eq 'chkm' or $CAMPOS[outer].TC_CODIGO eq 'spa'}
		<td colspan=10>
			<table border="0" width="100%" cellpadding="0" cellspacing="0">
				<tr><td class="campo_etiqueta">{$CAMPOS[outer].CMP_ETIQUETA}</td></tr>
				<tr><td class="campo_valor">
					{$CAMPOS[outer].HTML}
				</td></tr>
			</table>				     
		</td>
		{else}
		<td>
			<table border="0" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td class="campo_etiqueta">
						{if $CAMPOS[outer].TRP_CODIGO <> 'O' } 
						{$CAMPOS[outer].CMP_ETIQUETA}
						{/if}
					</td>
				</tr>				
				<tr><td class="campo_valor">
					{$CAMPOS[outer].HTML}
				</td></tr>
			</table>				     
		</td>
		{/if}
	{/if}
{/section}
</table>
<input type="hidden" name="ID_ACTIVIDAD" value="{$IDACTIVIDAD}" >
<input type="hidden" name="ID_CASO" value="{$IDCASO}" >
<!--input type="hidden" name="__CAMPOS__" value="{$CAMPOS}" -->
<table>
	<tr><td><input type="submit" name="button" id="button" value="Grabar Formulario"/></td></tr>
</table>
</div>
</form>  
