Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "REPORTE DE RECAUDACION DE CAJEROS";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
var sTotalGrilla=0;
//var vIdAnfitrion =''; 

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioCajerosAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},
        success:function (result, request) {
                  storeRecaudacionPeriodica.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
       Ext.Ajax.request({
        url: "../servicios/blpReporteDiarioCajerosAjax.php",
        method: "POST",
        params: {"option": "LST_MONTO", "pageSize": n, "limit": r, "start": i},
        success:function (result, request) {
                  storeGridTotal.loadData(Ext.util.JSON.decode(result.responseText));
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
		

    var storeAnfitrion = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteDiarioCajerosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
        fields: [{name: "IDANFITRION"},
                     {name: "NOMBRES"}
                    ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST44", "pageSize": pageSize};
            }
        }
    });
  // STORE MONTOS
  var storeGridTotal = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteDiarioCajerosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                     {name: "MONTO"},
                     {name: "SOBRANTE_FALTANTE"},
                     {name: "MONTO_COBRADO"}
                    ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_MONTO", "pageSize": 1000};
            }
        }
    });

	//store recaudaciones
    var storeRecaudacionPeriodica = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporteDiarioCajerosAjax.php",
            method: "POST"
        }),		
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                     {name: "LQD_ID", allowBlank: false},
                     {name: "CAJERO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "ANFITRION_NOMBRE_COMPLETO", allowBlank: false},					 
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "PASAJES", allowBlank: false},
                     {name: "MONTO", allowBlank: false,  type: "float"},
                     {name: "FECHA", allowBlank: false}, //, type: "date"
                     {name: "SOBRANTE_FALTANTE", allowBlank: false,  type: "float"},
                     {name: "MONTO_COBRADO", allowBlank: false,  type: "float"}
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

  var cboAnfitrion = new Ext.form.ComboBox({
        id: 'sIdAnfitrion',
        name: 'sIdAnfitrion',
        allowBlank:true,
        xtype:          'combo',
        triggerAction:  'all',
        forceSelection: true,
        editable:       false,
        emptyText: 'Seleccione cajero ...',
        typeAhead: true,
        hiddenName:     'H_IDANFITRION',
        displayField:   'NOMBRES',
        valueField:     'IDANFITRION',
        store: storeAnfitrion,
    listeners:{
      select: function (combo, record, index) {
        vIdAnfitrion = parseInt(record.data["IDANFITRION"]);
      }
    }
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
        var sTitulos= "REPORTE DE RECAUDACION POR CAJERO |" + "DE: "+fechaIni+ "|"+" HASTA: " + fechaFin + "| MONTO RECAUDADO: | Bs. " + storeGridTotal.data.items[0].data['MONTO'] + "| SOBRANTE/FALTANTE : | Bs." + storeGridTotal.data.items[0].data['SOBRANTE_FALTANTE'] + " | MONTO COBRADO:   | Bs. "+ storeGridTotal.data.items[0].data['MONTO_COBRADO'];
    		Ext.ux.GridPrinter.print(grdRecaudacion,url,sTitulos);
      }
    });
	
	var btnBuscarFecha = new Ext.Action({
      id: "btnBuscarFecha",
      text: "BUSCAR",
      iconCls: 'icon-add',
      handler: function() {			  
		var sFechaInicio = Ext.getCmp('sFechaInicio').getValue();
		var sFechaFinal = Ext.getCmp('sFechaFinal').getValue();	
    var sIdAnfitrionI = Ext.getCmp('sIdAnfitrion').getValue();
    //alert (sIdAnfitrionI);

		storeRecaudacionPeriodica.reload({ params: {option: "LIST_2", pageSize: pageSize, fechaInicio: sFechaInicio,fechaFinal: sFechaFinal,anfitrion: sIdAnfitrionI}}); 
    storeGridTotal.reload({ params: {"option": "LST_MONTO2", "pageSize": 1000, fechaInicio: sFechaInicio,fechaFinal: sFechaFinal,anfitrion: sIdAnfitrionI}});
                  
		//LEER EL MONTO TOTAL
		//storeRecaudacionPeriodica
		//var sTotal = storeRecaudacionPeriodica.find('MONTO_TOTAL','*');
		//.get('name')
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
      columns:[
         {header: "ID", dataIndex: "LQD_ID", align: "left", hidden: false, hideable: false},        
         {header: "CAJERO", dataIndex: "CAJERO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false},        
         {header: "ANFITRION", dataIndex: "ANFITRION_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false},        
         {header: "FECHA", dataIndex: "FECHA", align: "left", hidden: false, hideable: false}, // , renderer: Ext.util.Format.dateRenderer('d-m-Y')
         {header: "BUS", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false},
			   {header: "PASAJES", dataIndex: "PASAJES", align: "right", hidden: false, hideable: false},
			   {header: "MONTO", dataIndex: "MONTO", summaryType: 'sum', align: "right", hidden: false, hideable: false, 
                 renderer: function(v, params, data){				 					
                    return ('<font color="green">Bs.' + parseFloat(v).toFixed(2)+ '</font>')
                 }
			   },
         {header: "SOBRANTE <br> FALTANTE", dataIndex: "SOBRANTE_FALTANTE", summaryType: 'sum', align: "right", hidden: false, hideable: false, 
                 renderer: function(v, params, data){                 
                    if (v<0)
                      res = '<font color="red">Bs.' + parseFloat(v).toFixed(2) + '</font>'
                    else
                      res = '<font color="green">Bs.' + parseFloat(v).toFixed(2) + '</font>'
                    return (res)
                 }
         },
         {header: "MONTO <br> COBRADO", dataIndex: "MONTO_COBRADO", summaryType: 'sum', align: "right", hidden: false, hideable: false, 
                 renderer: function(v, params, data){                 
                     if (v<0)
                      res = '<font color="red">Bs.' + parseFloat(v).toFixed(2) + '</font>'
                    else
                      res = '<font color="green">Bs.' + parseFloat(v).toFixed(2) + '</font>'
                    return (res)
                 }
         }
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
		tbar: [' FECHA INICIO: ',sFechaInicio, 'FECHA FINAL: ',sFechaFinal, 'INGRESAR NOMBRE: ',cboAnfitrion, btnBuscarFecha, ' ' , btnPrm],
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
