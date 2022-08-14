Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "REPORTE PERIODICO DE RECAUDACION";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
var sTotalGrilla=0;
var montoTotal=0;
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpReportesPeriodicosAjax.php?option=OTRO",
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
    };
    onMnuContext = function(grid, rowIndex,e) {
      e.stopEvent();
      var coords = e.getXY();
      mnuContext.showAt([coords[0], coords[1]]);
    };
    //Variables declared in html file
    var pageSize = parseInt(1000/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;	
	//store Tipos Pasaje
	var storeTiposPasaje = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTransaccionesAjax.php?option=OTRO",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TIPO_PASAJE_ID"},
                     {name: "TIPO_PASAJE_CODIGO"}
                    ]
        }),
        //autoLoad: true, //First call
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
  var storeRecaudador = new Ext.data.GroupingStore({
    //sortInfo:{field: 'id_persona_form_dinamico', direction: "DESC"},
    //groupField:'id_persona_form_dinamico',
    id: 'recaudadorData',
    proxy: new Ext.data.HttpProxy({
              url: "../servicios/blpReportesPeriodicosAjax.php",
              method: "POST"
    }),
    reader:new Ext.data.JsonReader({
              root: "resultRoot",
              totalProperty: "resultTotal",
              fields: [{name: "FUNCIONARIO_ID"},
                       {name: "FUNCIONARIO_NOMBRES"}]
    })
    //baseParams:{task: "LISTING"}
  });
  storeRecaudador.load({ params: {"option": "LST_R", "pageSize": pageSize} });
	//store recaudaciones
    var storeRecaudacionPeriodica = new Ext.data.GroupingStore({ 
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReportesPeriodicosAjax.php",
            method: "POST"
        }),		
        //groupField: 'GIRO',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "LQD_ID", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRES", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},                     
                     //{name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false,  type: "float"},
                     {name: "LQD_ESTADO", allowBlank: false},					 
					           {name: "MONTO_TOTAL", allowBlank: false},	
                    ]
        }),
		groupField: 'LQD_REGISTRO',
		sortInfo: {field:"LQD_REGISTRO"},  
        //autoLoad: true, //First call
        listeners:{
            beforeload:function (store) {				
                this.baseParams = {"option": "LST", "pageSize": pageSize};					
            },
			load : function() {
				var sRegistro = this.getAt(0);
				if(sRegistro!= null)
				{
					var sTotal = sRegistro.get('MONTO_TOTAL');		
					sTotalGrilla = parseFloat((eval(montoTotal)/2)).toFixed(2);					
					Ext.getCmp('SUMA_TOTAL').setValue(parseFloat((eval(montoTotal)/2)).toFixed(2));
				}else
				{
					sTotalGrilla = 0;
					Ext.getCmp('SUMA_TOTAL').setValue('');
				}
			}
        }
    });	
	
	var summary = new Ext.ux.grid.GroupSummary();
	
    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
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
    		var sTitulos= "REPORTE PERIODICO DE RECAUDACION |" + "DE: "+fechaIni+ "|"+" HASTA: " + fechaFin + "| SUMA TOTAL|"+ sTotalGrilla;				
    		Ext.ux.GridPrinter.print(grdRecaudacion,url,sTitulos);
    		//var url = '../ext/fondo_blanco_1.jpg';
    		//var sTitulos= '';
    		//Ext.ux.GridPrinter.print(grdRecaudacion,vFecha,url,sTitulos);
      }
    });
	
    //combo recaudaciones por recaudador
    var cboRecaudador = new Ext.form.ComboBox({
      id: "cboRecaudador",
      mode: "local",
      triggerAction: "all",
      store: storeRecaudador,
      valueField: "size",
      displayField: "size",
      width: 150,
      emptyText: 'Seleccione recaudador',
      displayField: 'FUNCIONARIO_NOMBRES',
      valueField: 'FUNCIONARIO_ID',      
      editable: false,
      listeners:{		
        select: function (combo, record, index) {
		montoTotal=0;
          var sIdRecaudador = parseInt(record.data["FUNCIONARIO_ID"]);
          storeRecaudacionPeriodica.reload({ params: {option: "LST_R_1", pageSize: pageSize, sIdRecaudador: sIdRecaudador }}); 
          //pageSize = parseInt(record.data["size"]);
          //pagingUser.pageSize = pageSize;
          //pagingUser.moveFirst();
          //alert(record.data["FUNCIONARIO_ID"]);
        }
      }
    });
    

	var btnBuscarFecha = new Ext.Action({
      id: "btnBuscarFecha",
      text: "BUSCAR",
      iconCls: 'icon-add',
      handler: function() {
		montoTotal = 0;
		  var sFechaInicio = Ext.getCmp('sFechaInicio').getValue();
		  var sFechaFinal = Ext.getCmp('sFechaFinal').getValue();
		  storeRecaudacionPeriodica.reload({ params: {option: "LIST_POR_FECHA", pageSize: pageSize, fechaInicio: sFechaInicio,fechaFinal: sFechaFinal}});
		  //LEER EL MONTO TOTAL
		  //storeRecaudacionPeriodica
		  //var sTotal = storeRecaudacionPeriodica.find('MONTO_TOTAL','*');
		  //.get('name')
      }
    });	
	
	var sFechaInicio = new Ext.form.DateField({  
	fieldLabel: 'INICIO',  
	id:'sFechaInicio',
	emptyText:'Insert a date...',  
	//format:'d-m-y',
	format:'Y-m-d',  
	value: new Date(),	
	width: 150  
	}); 
	
	var sFechaFinal = new Ext.form.DateField({  
	fieldLabel: 'FINAL',  
	id:'sFechaFinal',
	emptyText:'Insert a date...',  
	//format:'d-m-y',  
	format:'Y-m-d',  
	value: new Date(),
	width: 150  
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
	
	var txtTotal = new Ext.form.TextField({
					allowBlank: false, 
					allowNegative: false,
					fieldLabel: 'TOTAL',
					id: 'SUMA_TOTAL',
					name: 'SUMA_TOTAL',
					allowBlank:false,
					disabled: true,
					});	
	
	var btnTotal = new Ext.Action({
      id: "btnTotal",
      text: '<font size="2"><b>TOTAL (Bs.) </b></font>',
	  disabled: false
      
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
      items: ["-", "Page size:", cboPageSize, '   ', btnTotal,txtTotal ]
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, width: 50},
              {header: "<font><b>REGISTRO</b></font>", dataIndex: "LQD_REGISTRO", width: 30,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               //{header: "REGISTRO", dataIndex: "LQD_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			         {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRES", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},			   
			         {header: "BUS", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			         {header: "MONTO", dataIndex: "LQD_MONTO", summaryType: 'sum', align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({}),				
						renderer: function(v, params, data){						
						montoTotal = (eval(montoTotal + v));
						return ('<font color="green">Bs.'+ parseFloat(v).toFixed(2) +'</font>');
					}
			   }
			   /*,
			   {header: "ESTADO", dataIndex: "LQD_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
                 renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                 }
               }*/
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
		tbar: [' FECHA INICIO: ',sFechaInicio, 'FECHA FINAL:',sFechaFinal, btnBuscarFecha, ' ' , btnPrm, '|', ' ANFITRION(A): ', cboRecaudador],
		bbar: pagingUser,
		style: "margin: 0 auto 0 auto;",
		width: '100%',
		height: '450',
		title: LABEL_TITLE_PANEL_1,
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
