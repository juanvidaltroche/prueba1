/**
 * @class GetIt.GridPrinter
 * @author Ed Spencer (edward@domine.co.uk)
 * Helper class to easily print the contents of a grid. Will open a new window with a table where the first row
 * contains the headings from your column model, and with a row for each item in your grid's store. When formatted
 * with appropriate CSS it should look very similar to a default grid. If renderers are specified in your column
 * model, they will be used in creating the table. Override headerTpl and bodyTpl to change how the markup is generated
 * 
 * Usage:
 * 
 * var grid = new Ext.grid.GridPanel({
 *   colModel: //some column model,
 *   store   : //some store
 * });
 * 
 * Ext.ux.GridPrinter.print(grid);
 * 
 */

Ext.ux.GridPrinter = {
    /**
    * Prints the passed grid. Reflects on the grid's column model to build a table, and fills it using the store
    * @param {Ext.grid.GridPanel} grid The grid to print
    */
    print: function (grid, curl, sTitulos) {
        //We generate an XTemplate here by using 2 intermediary XTemplates - one to create the header,
        //the other to create the body (see the escaped {} below)
        var columns = grid.getColumnModel().config;
        //build a useable array of store data for the XTemplate
        var data = [];
		//alert(fechaPrint);
        grid.store.data.each(function (item) {
            var convertedData = [];
			var conductor;
			var anfitrion;
			var turno;
			var dia;
			var itDia;
            //apply renderers from column model
			var i=0;
            for (var key in item.data) {
			//alert(item);
			if(key == 'TIPO_HERRAMIENTA_CODIGO' || key == 'RUTA_DESCRIPCION'){
				var value = item.data[key];
				Ext.each(columns, function (column){
						//if(column.dataIndex == 'PROGRAMACION_IT_LUNES'){
					if (column.dataIndex == key) {
					//alert(key);
						convertedData[key] = column.renderer ? column.renderer(value) : value;	
					}//
				}, this);
			}
			//**********LUNES
			if(key=='PROGRAMACION_IT_LUNES')
			{
				var val = item.data[key];
				if(val != "")
				{
					var val1=val.toString();
					var val2=val1.split('<br>');
					conductor=val2[0];
					anfitrion=val2[1];
					turno=val2[2];
					//alert(val2[3]);
					var val22=val2[3].split('<h3><p><b>Fecha: ');
					var dia1=val22[1];
					var dia2=dia1.split('</b></p></h3>');
				    dia=dia2[0];
						Ext.each(columns, function (column){
							convertedData['PROGRAMACION_IT_LUNES'] = column.renderer ? column.renderer(conductor) : conductor;
							convertedData['ANFITRION_NOMBRE'] = column.renderer ? column.renderer(anfitrion) : anfitrion;
							convertedData['TURNO_HORA'] = column.renderer ? column.renderer(turno) : turno;
							convertedData['DIA_FECHA'] = column.renderer ? column.renderer(dia) : dia;
						}, this);
						//key="";
					
				}
			}
			
			}
            data.push(convertedData);
        });

        //use the headerTpl and bodyTpl XTemplates to create the main XTemplate below
        var headings = Ext.ux.GridPrinter.headerTpl.apply(columns);
        var body = Ext.ux.GridPrinter.bodyTpl.apply(columns);

        var vUrl = curl;
        var vTitulo = sTitulos.toString();
        var vTitulos = vTitulo.split('|');
		
        var html = new Ext.XTemplate( 
	  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
			'<html xmlns="http://www.w3.org/1999/xhtml">',
			'<head>',
			'<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />',
			'<style type="text/css">',
			'<!--',
			'.Estilo2 {',
				'font-style: italic;',
				'color: #000000;',
			'}',
			'.Estilo3 {color: #006699}',
			'-->',
			'</style>',
			'<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
				'<link href="' + Ext.ux.GridPrinter.stylesheetPath + '" rel="stylesheet" type="text/css" media="screen,print" />',
				'<title>PROGRAMACION BUSES</title>',
			'</head>',
			'<body>',
			'<table width="500" border="2" bordercolor="#4691D5" bgcolor="#FFFFFF">',
			   '<tr>',
				'<td height="25" colspan="6" class="Estilo2"><H3 align="center" class="Estilo3">GOBIERNO AUTONOMO MUNICIPAL DE LA PAZ</H3></td>',
			  '</tr>',
			   '<tr>',
				'<td height="25" colspan="6"><H5 align="center" class="Estilo3">PROGRAMACION BUSES DE ' + vTitulos[1] + ' A '+ vTitulos[2] +'</H5></td>',
			  '</tr>',
			  '<tr>',
				'<td height="25" colspan="6"><H5 align="center" class="Estilo3">RUTA ' + vTitulos[0] + '</H5></td>',
			  '</tr>',	
			   '<tr>',
			   '<td width="80" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">RUTA&nbsp;&nbsp;</span></td>',
				'<td width="40" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">BUS&nbsp;&nbsp;</span></td>',
				'<td width="100" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">CONDUCTOR&nbsp;&nbsp;</span></td>',
				'<td width="100" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">ANFITRION&nbsp;&nbsp;</span></td>',
				'<td width="100" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">TURNO&nbsp;&nbsp;</span></td>',
				'<td width="80" height="37" valign="middle" style="border-color:#666666; border-width:2px;"><span class="Estilo3">DIA&nbsp;&nbsp;</span></td>',
			  '</tr>',
			  '<tr>',
			  '<tpl for="." valign="middle"><span class="Estilo3">',			  
              body,
            '</span></tpl>',
			  '</tr>',
			  
			'</table>',
			
			
			/*
			 '<table width="100%" border="1" cellspacing="0" cellpadding="0" class="pagedTable">',
          headings,
            '<tpl for=".">',
              body,
            '</tpl>',
        '</table>',
		
		*/
			'</body>',
			'</html>'
    ).apply(data);

        //open up a new printing window, write to it, print it and close
        //alert('Usted imprimir\xe1 el documento ...');
        var win = window.open('', 'printgrid');
        win.document.write(html);
        //alert(html);
        win.print(html);

        //win.document.close();
        //win.close();
    },

    /**
    * @property stylesheetPath
    * @type String
    * The path at which the print stylesheet can be found (defaults to '/stylesheets/print.css')
    */
    //stylesheetPath: '/stylesheets/print.css',
    //stylesheetPath: '../Content/css/print.css',
    stylesheetPath: 'print.css',

    /**
    * @property headerTpl
    * @type Ext.XTemplate
    * The XTemplate used to create the headings row. By default this just uses <th> elements, override to provide your own
    */
    headerTpl: new Ext.XTemplate(
    '<tr>',
      '<tpl for=".">',
        '<th><font face="Arial, Helvetica, sans-serif" size="1px">  {header}</font> </th>',
      '</tpl>',
    '</tr>'
  ),

    /**
    * @property bodyTpl
    * @type Ext.XTemplate
    * The XTemplate used to create each row. This is used inside the 'print' function to build another XTemplate, to which the data
    * are then applied (see the escaped dataIndex attribute here - this ends up as "{dataIndex}")
    */
    bodyTpl: new Ext.XTemplate(
    '<tr>',
      '<tpl for=".">',
        '<td><font face="Arial, Helvetica, sans-serif" size="2px">  \{{dataIndex}\}</font> </td>',
      '</tpl>',
    '</tr>'
  )
};