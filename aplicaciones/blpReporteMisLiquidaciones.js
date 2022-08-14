Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "REPORTE DE RECAUDACION DE CAJEROS";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
var sTotalGrilla=0;

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpReporteMisLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LSTSI", "pageSize": n, "limit": r, "start": i},
        success:function (result, request) {
                  storeRecaudacionPeriodica.loadData(Ext.util.JSON.decode(result.responseText));
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
		

    var storeRecaudacionPeriodica = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteMisLiquidacionesAjax.php",
            method: "POST"
        }),		
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "LQD_ID", allowBlank: false}, 
                     {name: "LQD_ANFITRION", allowBlank: false},
                     {name: "CAJERO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_HERRAMIENTA_ID", allowBlank: false},
                     {name: "LQD_GIRO_ID", allowBlank: false},
                     {name: "LQD_PRG_ID", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false, type: "float"},
                     {name: "LQD_CONFIRMADO", allowBlank: false},
                     {name: "LQD_FLUJO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MODIFICACION", allowBlank: false},
                     {name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_ESTADO", allowBlank: false},
                     {name: "LQD_TIPO", allowBlank: false},
                     {name: "LQD_MONTOSF", allowBlank: false, type: "float"},
                     {name: "MONTO_COBRADO", allowBlank: false, type: "float"}

                    ]
        }),
		groupField: 'CAJERO_NOMBRE_COMPLETO',
		sortInfo: {field:"CAJERO_NOMBRE_COMPLETO", direction:"ASC"},  
        //autoLoad: true, //First call
        listeners:{
            beforeload:function (store) {				
                this.baseParams = {"option": "LST", "pageSize": pageSize};					
            }
        }
    });

	
	var summary = new Ext.ux.grid.GroupSummary();
	
    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });  

  var sFechaInicio = new Ext.form.DateField({  
  fieldLabel: 'INICIO',  
  id:'sFechaInicio',
  emptyText:'Inserte fecha ...',
  format:'Y-m-d',  
  value: new Date(),  
  width: 150  
  }); 
  
  var sFechaFinal = new Ext.form.DateField({  
  fieldLabel: 'FINAL',  
  id:'sFechaFinal',
  emptyText:'Inserte fecha ...',
  format:'Y-m-d',  
  value: new Date(),
  width: 150  
  }); 


    var btnPrm = new Ext.Action({
      id: "btnImprimir",
      text: "IMPRIMIR",
      iconCls: 'icon-viewer',
      handler: function() {
    		Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
    		var url = '../ext/fondo_blanco_1.jpg';        
    		var vFecha = '';
    		var fechaIni = Ext.getCmp('sFechaInicio').getRawValue();
    		var fechaFin = Ext.getCmp('sFechaFinal').getRawValue();		
    		//var sTitulos= "REPORTE DE CAJEROS IMPORTES RECAUDADOS DE TARIFA |" + "DE: "+fechaIni+ "|"+" HASTA: " + fechaFin + "| SUMA TOTAL|"+ sTotalGrilla;	  		
        console.log (storeGridTotal);
        var sTitulos= "REPORTE DE RECAUDACION DIARIA POR ANFITRION DIFERENCIADO POR TIPO DE TARIFA |" + "DE: "+fechaIni+ "|"+" HASTA: " + fechaFin + "| MONTO RECAUDADO " + storeGridTotal.data.items[0].data['MONTO'] + "  SOBRANTE/FALTANTE " + storeGridTotal.data.items[0].data['SOBRANTE_FALTANTE'] + " | SUMA TOTAL   Bs. "+ storeGridTotal.data.items[0].data['MONTO_COBRADO'];
    		Ext.ux.GridPrinter.print(grdRecaudacion,url,sTitulos);
      }
    });
	
	var btnBuscarFecha = new Ext.Action({
      id: "btnBuscarFecha",
      text: "BUSCAR",
      iconCls: 'icon-add',
      handler: function() {			  
		var sFechaInicio = Ext.getCmp('sFechaInicio').getValue();
		storeRecaudacionPeriodica.reload({ params: {"option": "LSTSI", "pageSize": pageSize, fechaBuscar: sFechaInicio}}); 
      }
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
      store: storeRecaudacionPeriodica,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSize, '   ']
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, width: 40},
               {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "BUS", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               //{header: "PRG ID", dataIndex: "LQD_PRG_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               //{header: "GIRO ID", dataIndex: "LQD_GIRO_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               
               {header: "CONFIRMADO", dataIndex: "LQD_CONFIRMADO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ('<font color="green">SI</font>')
               }},
               {header: "FLUJO", dataIndex: "LQD_FLUJO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "FECHA DE COBRO", dataIndex: "LQD_MODIFICACION", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "CAJERO", dataIndex: "CAJERO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, width: 150, editor: new Ext.form.TextField({})},
               /*{header: "ESTADO", dataIndex: "LQD_ESTADO", align: "left", hidden:false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                 }
               } */
               {header: "MONTO", dataIndex: "LQD_MONTO", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },     
               {header: "SOBRANTE O <BR> FALTANTE", dataIndex: "LQD_MONTOSF", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "MONTO COBRADO", dataIndex: "MONTO_COBRADO", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "TIPO", dataIndex: "LQD_TIPO", align: "left", hidden: false, hideable: false, width: 100}
         ]

    });

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

    var grdRecaudacion = new Ext.grid.GridPanel({
		id: "grdRecaudacion",
		store: storeRecaudacionPeriodica,
		colModel: cmodel,
		selModel: smodel,
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
		viewConfig: {forceFit: true},
		enableColumnResize: true,
		enableHdMenu: true, //Menu of the column
		plugins: summary,
		tbar: [' FECHA INICIO: ',sFechaInicio, btnBuscarFecha, ' ' , btnPrm],
		bbar: pagingUser,
		style: "margin: 0 auto 0 auto;",
		width: '100%',
		height: '450',
    title: '<img src="../ext/images/default/dd/application_form_edit.png  "><font size="2"><b>' + LABEL_TITLE_PANEL_1 + '</b></font>',
		renderTo: "divMain",
		listeners:{
			
		}
    });
	
	//, "->", txtSearch, btnTextClear, btnSearch
    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
    var viewport = new Ext.Viewport({
          layout : 'fit',
          items : [ grdRecaudacion ]
    });
  }
}

Ext.onReady(acl.application.init, acl.application);
