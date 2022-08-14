Ext.namespace("acl");
var jsAccion="NEW";
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "REPORTE DIARIO DE RECAUDO POR VENTANILLA DE RECAUDO";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
//VARIABLE PARA OBTENER TOTALES
var summary = new Ext.ux.grid.GroupSummary();    
Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
	 return v+(record.data.SUBTOTAL)
}; 

//VARIABLE TEXTO PARA VISUALIZAR LA SUMA TOTAL 
txtTotal = new Ext.form.TextField({
					allowBlank: false, 
					allowNegative: false,
					fieldLabel: 'TOTAL',
					id: 'SUMA_TOTAL',
					name: 'SUMA_TOTAL',
					allowBlank:false,
					disabled: true,
					});
					
		txtFecha = new Ext.form.DateField({
					allowBlank: false, 
					allowNegative: false,
					emptyText:'Inserte la fecha..',
					fieldLabel: 'Fecha',
					format:'Y-m-d',
					id: 'sFechaInicio',
					name: 'sFechaInicio',
					width: 150,
					disabled: false,
					value:new Date()
					});	
					
					
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

    
	  //Ajax grilla total
	  Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioRecaudadoAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeTransacciones.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
	  
	  
	  
	  Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioRecaudado2Ajax.php",
        method: "POST",
		params: {"option": "LST33", "sUsaurio": vIdAnfitrion,"vFechaInicio":vFFechaInicio ,"pageSize": pageSize, "limit": pageSize, "start": 0},
		success:function (result, request) {
		var x = Ext.util.JSON.decode(result.responseText);
		Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].TOTAL);  
		//console.log(Ext.util.JSON.decode(result.responseText));
		//console.log(x.resultRoot[0].TOTAL);
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
		
      });
	  
	  
    };

    onMnuContext = function(grid, rowIndex,e) {
      e.stopEvent();
      var coords = e.getXY();
      mnuContext.showAt([coords[0], coords[1]]);
    };

    //Variables declared in html file
    var pageSize = parseInt(20/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;
	var vIdAnfitrion = "";
	var vFFechaInicio = "";
	
	
	//store totales
    var storeTransacciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            //url:    "../servicios/blpReporte1Ajax.php",
			 url:    "../servicios/blpReporteDiarioRecaudadoAjax.php",
            method: "POST"
        }),
		reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [  
					{name: "LQD_PRG_ID", allowBlank: false},
					{name: "DESC_PROGRAMACION", allowBlank: false},
					{name: "DESC_GIRO", allowBlank: false},
					{name: "GIRO", allowBlank: false},
                    {name: "FECHA", allowBlank: false},
					{name: "FECHA_COBRO1", allowBlank: false},
					{name: "DESCRIP_HERRAMIENTA", allowBlank: false},
					{name: "USUARIO", allowBlank: false},
                    {name: "SUBTOTAL", allowBlank: false, type:'float'}
                    ]
        }),
        groupField:'USUARIO',
		sortInfo:{field: "USUARIO"},
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
	//fin store

    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });

    var txtSearch = new Ext.form.TextField({
      id: "txtSearch",
	  iconCls: 'icon-search',
      emptyText: LABEL_MSG_SEARCH,
      width: 150,
      allowBlank: true,

      listeners:{
        specialkey: function (f, e) {
          if (e.getKey() == e.ENTER) {
            Ext.MessageBox.alert("Alert", message);
          }
        }
      }
    });

    var btnTextClear = new Ext.Action({
      id: "btnTextClear",

      text: "X",
      ctCls: "pm_search_x_button",
      handler: function() {
        txtSearch.reset();
      }
    });

    var btnSearch = new Ext.Action({
      id: "btnSearch",
      text: LABEL_BTN_SEARCH,
      handler: function() {
        Ext.MessageBox.alert("Alert", message);
      }
    });

    var cboPageSize = new Ext.form.ComboBox({
      id: "cboPageSize",
      mode: "local",
      triggerAction: "all",
      store: storePageSize,
      valueField: "size",
      displayField: "size",
      width: 50,
      editable: false,
      listeners:{
        select: function (combo, record, index) {
          pageSize = parseInt(record.data["size"]);
          pagingUser.pageSize = pageSize;
          pagingUser.moveFirst();
        }
      }
    });
	
    var pagingUser = new Ext.PagingToolbar({
      id: "pagingUser",
      pageSize: pageSize,
      store: storeTransacciones,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSize]
    });


   var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
	  columns:[//{id: "GIRO1", header: "GIRO", dataIndex: "GIRO", hidden: false, hideable: true, width: 50},
			   {header: "FECHA DE COBRO", dataIndex: "FECHA_COBRO1",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "FECHA SINCRONIZACION", dataIndex: "FECHA",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "BUS", dataIndex: "DESCRIP_HERRAMIENTA",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "CAJERO", dataIndex: "USUARIO",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},			 
			   {header: "PROGRAMACION", dataIndex: "DESC_PROGRAMACION",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},			 
			   {header: "GIRO", dataIndex: "DESC_GIRO",  width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
	            {header: "MONTO", dataIndex: "SUBTOTAL",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
             	summaryType : "totalCost",  
				summaryRenderer: Ext.util.Format.usMoney  
			   }
               
              ]

    });


    var smodel = new Ext.grid.RowSelectionModel({
      singleSelect: true,
      listeners: {
        rowselect: function (sm) {
        },
        rowdeselect: function (sm) {
        }
      }
    });
	
	var btnTotal = new Ext.Action({
      id: "btnTotal",
      text: '<font size="2"><b>TOTAL</b></font>',
	  disabled: false
      
    });

	var btnFecha = new Ext.Action({
      id: "btnFecha",
      text: '<font size="2"><b>INGRESAR FECHA</b></font>',
	  disabled: true
      
    });
	var btnUsuario = new Ext.Action({
      id: "btnUsuario",
      text: '<font size="2"><b>INGRESAR NOMBRE ANFITRION</b></font>',
	  disabled: true
      
    });
	
	
function doGrabarTransacciones()
{
        vFFechaInicio = Ext.getCmp('sFechaInicio').getValue();
		Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioRecaudadoAjax.php",
        method: "POST",
		params: {"option": "LST33", "sUsaurio": vIdAnfitrion,"vFechaInicio":vFFechaInicio ,"pageSize": pageSize, "limit": pageSize, "start": 0},

        success:function (result, request) {
                  storeTransacciones.loadData(Ext.util.JSON.decode(result.responseText));
                },
        failure:function (result, request) {
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
	  //---------------------------------------------------------------------
	  Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioRecaudado2Ajax.php",
        method: "POST",
		params: {"option": "LST33", "sUsaurio": vIdAnfitrion,"vFechaInicio":vFFechaInicio ,"pageSize": pageSize, "limit": pageSize, "start": 0},
		success:function (result, request) {
		var x = Ext.util.JSON.decode(result.responseText);
		Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].TOTAL);  
		//console.log(Ext.util.JSON.decode(result.responseText));
		console.log(x.resultRoot[0].TOTAL);
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
		
      });
	  
	 
}

 //---------------------------------------------------------
	 var storeCajero = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteDiarioRecaudadoAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
			fields: [{name: "IDANFITRION"},
                     {name: "NOMBRES"}
                    ]
        }),
        //autoLoad: true, //First call
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST44", "pageSize": pageSize};
            }
        }
    });
	
	var cboCajero = new Ext.form.ComboBox({
       id: 'TARIFA_TIPO_PASAJE_ID',
        name: 'TARIFA_TIPO_PASAJE_ID',
        allowBlank:true,
        xtype:          'combo',
        triggerAction:  'all',
        forceSelection: true,
		editable:       false,
        emptyText: 'Seleccione cajero',
        typeAhead: true,
        hiddenName:     'H_IDANFITRION',
        displayField:   'NOMBRES',
        valueField:     'IDANFITRION',
        store: storeCajero,
		listeners:{
			select: function (combo, record, index) {
			  vIdAnfitrion = parseInt(record.data["IDANFITRION"]);
			}
		}
    });
	
	
	var btnListarGrilla = new Ext.Action({
      id: "btnListarGrilla",
      text: "BUSCAR",
	  iconCls: 'icon-search',
	  handler: function() {	
				  doGrabarTransacciones();	
				}
	});

	var btnImprimir = new Ext.Action({
		id: "btnImprimir",
		text: 'IMPRIMIR',
		iconCls: 'icon-viewer',
		handler: function() {
							var total = Ext.getCmp('SUMA_TOTAL').getValue();
							//alert(total);
							Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
							var url = '../ext/fondo_blanco_1.jpg';
							var sTitulos= "<font size='2' align='right'color='green'><b>REPORTE DIARIO DE RECAUDO POR VENTANILLA DE RECAUDO</b></font>|||<b>TOTAL RECAUDADO</b>|<b>Bs."+total+"</b>";
							Ext.ux.GridPrinter.print(grdpnlUser,url,sTitulos);
      }
    });
		
    var grdpnlUser = new Ext.grid.GridPanel({
      id: "grdpnlUser",
      store: storeTransacciones,
      colModel: cmodel,
      selModel: smodel,
	  plugins: summary,
      emptyText: 'No existen registros',
      columnLines: true,
      viewConfig: {forceFit: true},
      view : new Ext.grid.GroupingView({  
        forceFit            : true,  
        ShowGroupName       : true,  
        enableNoGroup       : false,  
        enableGropingMenu   : false,
        emptyText: 'No existen registros',  
        hideGroupedColumn   : true  
      }),  
      view : new Ext.grid.GroupingView({  
                    forceFit            : true,  
                    ShowGroupName       : true,  
                    enableNoGroup       : false,  
                    enableGropingMenu   : false, 
                    startCollapsed      : true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})', 
                    emptyText: 'No existen registros',
                    hideGroupedColumn   : true  
                }), 
        features: [{
            ftype: 'totalCost'
        }],  
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
      tbar: ['<font size="2"><b>INGRESAR FECHA DE COBRO:</b></font>',txtFecha,'<font size="2"><b>INGRESAR NOMBRE :</b></font>',cboCajero, btnListarGrilla,btnImprimir],
	  bbar: ['<font size="2"><b>TOTAL</b></font>',txtTotal],
      style: "margin: 0 auto 0 auto;",
      width: '100%',
      height: '450',
      title: LABEL_TITLE_PANEL_1,
      renderTo: "divMain",
      listeners:{
      }
    });
    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
    var viewport = new Ext.Viewport({
          layout : 'fit',
          items : [ grdpnlUser ]
    });
  }
}

Ext.onReady(acl.application.init, acl.application);
