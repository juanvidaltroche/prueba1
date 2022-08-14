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
 * Ext.ux.ReciboPrinter.print(grid);
 * 
 */

Ext.ux.ReciboPrinter = {
    /**
    * Prints the passed grid. Reflects on the grid's column model to build a table, and fills it using the store
    * @param {Ext.grid.GridPanel} grid The grid to print
    */
    print: function (grid, cfecha, curl, stitulo) {
        //alert(cfecha);
        //We generate an XTemplate here by using 2 intermediary XTemplates - one to create the header,
        //the other to create the body (see the escaped {} below)
        var columns = grid.getColumnModel().config;
      


        //build a useable array of store data for the XTemplate
        var data = [];
        grid.store.data.each(function (item) {
            var convertedData = [];

            //apply renderers from column model
            for (var key in item.data) {
                var value = item.data[key];

                Ext.each(columns, function (column) {
                    if (column.dataIndex == key) {
                        convertedData[key] = column.renderer ? column.renderer(value) : value;
                    }
                }, this);
            }

            data.push(convertedData);
        });

        //use the headerTpl and bodyTpl XTemplates to create the main XTemplate below
        var headings = Ext.ux.ReciboPrinter.headerTpl.apply(columns);
        var body = Ext.ux.ReciboPrinter.bodyTpl.apply(columns);
       //alert(cfecha);
        var sfecha = cfecha.toString();
        var vUrl = curl;
        var vTitulo = stitulo.toString();
        var vTitulos = vTitulo.split('|');
        fecha_global = sfecha.split(' ');
        if (fecha_global[1])
            var sfecha1 = fecha_global[2] + "/" + fecha_global[1] + "/" + fecha_global[3];
        else
            var sfecha1 = cfecha.toString();

        // declaracion de var fecha actual

        var fsist = new Date();
        var diames = fsist.getDate();
        var mes=fsist.getMonth() +1 ;
        var anio = fsist.getFullYear();
        
        if (diames < 10)
            diames = "0" + diames;

        if (mes < 10)
            mes="0"+mes;
             

        ///


        var html = new Ext.XTemplate(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
      '<html>',
        '<head>',
          '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
          '<link href="' + Ext.ux.ReciboPrinter.stylesheetPath + '" rel="stylesheet" type="text/css" media="screen,print" />',
        //'<link href="print.css" rel="stylesheet" type="text/css" media="screen,print" />',
                '<title>SERVICIO DE TRANSPORTE MUNICIPAL</title>',
        '</head>',
        '<body>',

        '<table width="100%" border="0" cellpadding="0" cellspacing="0">',
          '<tr>',
            '<th scope="col"><center><img src="' + vUrl + '" alt="" width="85" height="85" /></th></center>',
            '<th scope="col"><center>',
            '</center>',
              '<center>',
                '<p>Gobierno Autónomo Municipal de La Paz </p>',
                '<p>Bus La Paz </p>',
                '<p>&nbsp;</p>',
              '</center></th>',
          '</tr>',
        '</table>',

        '<table width="100%" border="1" cellspacing="0" cellpadding="0">',
          '<tr>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">FECHA DE PROGRAMACION:</font></strong></th>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">' + sfecha1 + ' </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">CAJERO:</font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">'+ vTitulos[6] + ' </font></strong></th>',
          '</tr>',
          '<tr>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">FECHA IMPRESION: </font></strong></th>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px"> ' + anio + '-' + mes+ '-' + diames + ' </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">RECAUDADOR: </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[0] + '</font></strong></th>',
          '</tr>',
          '<tr>',
            '<th scope="row" colspan="4"><center>',
              '<strong><font size="1px" face="Arial, Helvetica, sans-serif">FORMULARIO: RECIBO DE INGRESO (ORIGINAL)   Nro. '+ vTitulos[7] + ' </font></strong>',
            '</center></th>',
          '</tr>',
        '</table>',
        '<br />',

        '<table border="1" cellspacing="0" class="pagedTable" cellpading="0" width="100%">',
            '<tr>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> HERRAMIENTA</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> CONFIRMADO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> FLUJO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> MONTO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[8] + '</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> TOTAL A COBRAR </font></th>',
          '</tr>',
          '<tr>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[2] + ' </font></th>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[5] + ' </font></th>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[4] + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[3]).toFixed(2) + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[1]).toFixed(2) + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[9]).toFixed(2) + ' </font></th>',

          '</tr>',
            
        '</table>',

        '<table width="100%" border="0" cellpadding="0" cellspacing="0">',
          '<tr>',
            '<td>',
            '<p>&nbsp;</p>',
            '<p>&nbsp;</p>',
            '<p>...............................................................</p>',
            '</td>',
            '<td>',
            '<p>&nbsp;</p>',
            '<p>&nbsp;</p>',
            '<p>...............................................................</p>',
          '</td>',
          '<tr>',
            '<td><font size="1px" face="Arial, Helvetica, sans-serif">Recaudador: '+ vTitulos[0] + '</font></td>',
            '<td><font size="1px" face="Arial, Helvetica, sans-serif">Cajero: '+ vTitulos[6] + '</td>',
          '</tr>',
        '</table>',
        '<br>',
        '<br>',
        '<br>',
        '<br>',
        '<hr>',
        '<br>',
        '<br>',
        '<br>',
        '<br>',
        

        '<table width="100%" border="0" cellpadding="0" cellspacing="0">',
          '<tr>',
            '<th scope="col"><center><img src="' + vUrl + '" alt="" width="85" height="85" /></th></center>',
            '<th scope="col"><center>',
            '</center>',
              '<center>',
                '<p>Gobierno Autónomo Municipal de La Paz </p>',
                '<p>Bus La Paz </p>',
                '<p>&nbsp;</p>',
              '</center></th>',
          '</tr>',
        '</table>',

        '<table width="100%" border="1" cellspacing="0" cellpadding="0">',
          '<tr>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">FECHA DE PROGRAMACION:</font></strong></th>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">' + sfecha1 + ' </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">CAJERO:</font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">'+ vTitulos[6] + ' </font></strong></th>',
          '</tr>',
          '<tr>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px">FECHA IMPRESION: </font></strong></th>',
            '<th scope="row"><strong><font face="Arial, Helvetica, sans-serif" size="1px"> ' + anio + '-' + mes+ '-' + diames + ' </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif">RECAUDADOR: </font></strong></th>',
            '<th scope="row"><strong><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[0] + '</font></strong></th>',
          '</tr>',
          '<tr>',
            '<th scope="row" colspan="4"><center>',
              '<strong><font size="1px" face="Arial, Helvetica, sans-serif">FORMULARIO: RECIBO DE INGRESO (COPIA)   Nro. '+ vTitulos[7] + ' </font></strong>',
            '</center></th>',
          '</tr>',
        '</table>',
        '<br />',

        '<table border="1" cellspacing="0" class="pagedTable" cellpading="0" width="100%">',
            '<tr>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> HERRAMIENTA</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> CONFIRMADO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> FLUJO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> MONTO</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[8] + '</font></th>',
            '<th width="15%"><font size="1px" face="Arial, Helvetica, sans-serif"> TOTAL A COBRAR </font></th>',
          '</tr>',
          '<tr>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[2] + ' </font></th>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[5] + ' </font></th>',
            '<th scope="row"><font size="1px" face="Arial, Helvetica, sans-serif"> '+ vTitulos[4] + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[3]).toFixed(2) + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[1]).toFixed(2) + ' </font></th>',
            '<th scope="row" align="right"><font size="1px" face="Arial, Helvetica, sans-serif"> Bs. '+ parseFloat(vTitulos[9]).toFixed(2) + ' </font></th>',

          '</tr>',
            
        '</table>',

        '<table width="100%" border="0" cellpadding="0" cellspacing="0">',
          '<tr>',
            '<td>',
            '<p>&nbsp;</p>',
            '<p>&nbsp;</p>',
            '<p>...............................................................</p>',
            '</td>',
            '<td>',
            '<p>&nbsp;</p>',
            '<p>&nbsp;</p>',
            '<p>...............................................................</p>',
          '</td>',
          '<tr>',
            '<td><font size="1px" face="Arial, Helvetica, sans-serif">Recaudador: '+ vTitulos[0] + '</font></td>',
            '<td><font size="1px" face="Arial, Helvetica, sans-serif">Cajero: '+ vTitulos[6] + '</td>',
          '</tr>',
        '</table>',

        '</body>',
      '</html>'
    ).apply(data);

        //open up a new printing window, write to it, print it and close
        //alert('Usted imprimir\xe1 el documento ...');
        var win = window.open('', 'printgrid');
        win.document.write(html);
        //alert(html);
        win.print(html);

        win.document.close();
        win.close();
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
    //'<td><font face="Arial, Helvetica, sans-serif" size="2px">  \{{dataIndex}\}</font> </td>',
        '<td><font face="Arial, Helvetica, sans-serif" size="0px">  \{{dataIndex}\}</font> </td>',
      '</tpl>',
    '</tr>'
  )
};