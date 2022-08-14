Ext.namespace("acl");
var jsAccion="NEW";
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "REPORTE DIARIO DE RECAUDO POR ANFITRION";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
//VARIABLE PARA OBTENER TOTALES
var summary = new Ext.ux.grid.GroupSummary();    
Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
	 return v+(record.data.LQD_MONTO)
}; 

//***********************VARIABLE TEXTO PARA VISUALIZAR LA SUMA TOTAL 
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
txtAnfitrion = new Ext.form.TextField({
					allowBlank: false, 
					allowNegative: false,
					fieldLabel: 'Anfitrion',
					emptyText:'Inserte el nombre del recaudador ...',
					id: 'ANFITRION',
					name: 'ANFITRION',
					width: 150,
					disabled:  false,
					});
					

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();     
	  //Ajax grilla total
	  Ext.Ajax.request({
        url: "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeLiquidaciones.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
	  //************suma total con otra opcion
	  /*Ext.Ajax.request({
        url: "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
        method: "POST",
        params: {"option": "LIST_3", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  var x = Ext.util.JSON.decode(result.responseText);
				 Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].MONTO);  
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });*/
	  Ext.Ajax.request({
        url: "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
				  var x = Ext.util.JSON.decode(result.responseText);
				  Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].MONTO_TOTAL);
				  //console.log(Ext.util.JSON.decode(result.responseText));
				  //console.log(x.resultRoot[0].TOTAL);				  
                  storeLiquidaciones.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
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
	
	
	
	//store totales

	//store grilla
    var storeLiquidaciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
            method: "POST"
        }),
		reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
					//{name: "CAMPO", allowBlank: false},
					 {name: "ID_GIRO", allowBlank: false},
                     {name: "FECHA_REGISTRO", allowBlank: false},
                     {name: "USUARIO", allowBlank: false},
					 {name: "LQMONTO", allowBlank: false, type:'float'},
                     {name: "HERRAMIENTA", allowBlank: false},
					 
					 {name: "LQD_ID", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRES", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},                     
                     //{name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false,  type: "float"},
                     {name: "LQD_ESTADO", allowBlank: false},					 
					 {name: "MONTO_TOTAL", allowBlank: false},
					 //2014-03-10
					 {name: "LQD_RUTA_ID", allowBlank: false},
					 {name: "RUTA_DESCRIPCION", allowBlank: false}
                    ]
        }),
       // groupField:'HERRAMIENTA',
		//sortInfo:{field: "HERRAMIENTA"},
  groupField:'FUNCIONARIO_NOMBRES',
   sortInfo:{field: "FUNCIONARIO_NOMBRES"},
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
      store: storeLiquidaciones,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSize]
    });
	//******************bbusqueda
	var btnBuscarFecha = new Ext.Action({
      id: "btnNew",
      text: "BUSCAR",
      iconCls: 'icon-search',
      handler: function() {			  
		var sFechaInicio = Ext.getCmp('sFechaInicio').getValue();
		var sIdAnfitrion = Ext.getCmp('sIdAnfitrion').getValue();					
		storeLiquidaciones.reload({ params: {option: "LIST_2", fechaInicio: sFechaInicio,IdAnfitrion: sIdAnfitrion}});
		//*********************
		Ext.Ajax.request({
        url: "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
        method: "POST",
		params: {option: "LIST_22", fechaInicio: sFechaInicio,IdAnfitrion: sIdAnfitrion},
		success:function (result, request) {
		var x = Ext.util.JSON.decode(result.responseText);
		Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].MONTO_TOTAL);  
		//console.log(Ext.util.JSON.decode(result.responseText));
		console.log(x.resultRoot[0].TOTAL);
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
		
      });
		
        
      }
    });	
	
	//******************
	

   var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[
		{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, align: "left", width: 20},		
		{header: "RUTA", dataIndex: "RUTA_DESCRIPCION", hidden: false, hideable: true, align: "left", width: 20},		
		{header: "FECHA DE REGISTRO", dataIndex: "LQD_REGISTRO", width: 20,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "HERRAMIENTA", dataIndex: "HRR_DESCRIPCION",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
        {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRES",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
        {header: "MONTO", dataIndex: "LQD_MONTO",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
				summaryType : "totalCost",    
				summaryRenderer: Ext.util.Format.usMoney  
		}
        ]
    });

						 /*{name: "LQD_ID", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRES", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},                     
                     //{name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false,  type: "float"},
                     {name: "LQD_ESTADO", allowBlank: false},					 
					 {name: "MONTO_TOTAL", allowBlank: false}*/

    var smodel = new Ext.grid.RowSelectionModel({
      singleSelect: true,
      listeners: {
        rowselect: function (sm) {
          //btnEditContext.enable();
          //btnDelete.enable();
        },
        rowdeselect: function (sm) {
          //btnEditContext.disable();
          //btnDelete.disable();
        }
      }
    });
	
	
//---------------------------------


 //---------------------------------------------------------
	 var storeAnfitrion = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
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
	
	/* var storeSumaTotal = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteLiquidacionesAnfitrionAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
			fields: [
                     {name: "MONTO"}
                    ]
        }),
        //autoLoad: true, //First call
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LIST_3", "pageSize": pageSize};
            }
        }
    });*/
	
	var cboAnfitrion = new Ext.form.ComboBox({
       id: 'sIdAnfitrion',
        name: 'sIdAnfitrion',
        allowBlank:true,
        xtype:          'combo',
        triggerAction:  'all',
        forceSelection: true,
		editable:       false,
        emptyText: 'Seleccione al Anfitrion',
        typeAhead: true,
        hiddenName:     'H_IDANFITRION',
        displayField:   'NOMBRES',
        valueField:     'IDANFITRION',
        store: storeAnfitrion,
		listeners:{
			select: function (combo, record, index) {
			  vIdAnfitrion = parseInt(record.data["IDANFITRION"]);
			  //alert(vIdAnfitrion);
			}
		}
    });
	
	
	
	var btnListarGrilla = new Ext.Action({
      id: "btnListarGrilla",
      text: "LISTAR GRILLA",
	  iconCls: 'icon-edit',
	  
	 
	
  
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
      var sTitulos= "<font size='2' align='right'color='green'><b>REPORTE DIARIO DE RECAUDO POR ANFITRION</b></font>|||<b>TOTAL RECAUDADO</b>|<b>Bs."+total+"</b>";
      Ext.ux.GridPrinter.print(grdpnlUser,url,sTitulos);
      }
    });


    var grdpnlUser = new Ext.grid.GridPanel({
      id: "grdpnlUser",
      store: storeLiquidaciones,
      colModel: cmodel,
      selModel: smodel,
	  plugins: summary,
      emptyText: 'No existen registros',
      columnLines: true,
      viewConfig: {forceFit: true},
	  iconCls: 'users',
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
                    startCollapsed      : false,
                    //groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "GIROS" : "GIROS"]})', 
                    emptyText: 'No existen registros',
                    hideGroupedColumn   : true  
                }), 
        features: [{
            ftype: 'totalCost'
        }],  
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
      //tbar: [btnNew, btnDel,btnUpdate, "->", txtSearch, btnTextClear, btnSearch],
	  tbar: ['<font size="2"><b>INGRESAR FECHA:</b></font>',txtFecha,'<font size="2"><b>INGRESAR NOMBRE :</b></font>',cboAnfitrion, btnBuscarFecha,btnImprimir],
      bbar: ['<font size="2"><b>TOTAL</b></font>',txtTotal],
      style: "margin: 0 auto 0 auto;",
      width: 50,
      height: 50,
      title: LABEL_TITLE_PANEL_1,
      renderTo: "divMain",
      listeners:{
      }
    });
	
	//*************panel de anfitrion x
	
    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
    var viewport = new Ext.Viewport({
          layout : 'fit',
          //items : [  grdpnlUser ]
		  items : [  grdpnlUser]
    });
  }
}

Ext.onReady(acl.application.init, acl.application);
