Ext.namespace("acl");
var jsAccion="NEW";
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "REPORTE";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
//VARIABLE PARA OBTENER TOTALES
var summary = new Ext.ux.grid.GroupSummary();    
Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
	 return v+(record.data.CANTIDAD*record.data.TARIFA_UNITARIA)
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

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

     
	  //Ajax grilla total
	  Ext.Ajax.request({
        url: "../servicios/blpReporte1Ajax.php",
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
	  
	  //ajax que devuelve el total 
      Ext.Ajax.request({
        url: "../servicios/blpReporte11Ajax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

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
	
	
	
	//store totales

	//store grilla
    var storeTransacciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporte1Ajax.php",
            method: "POST"
        }),
		reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "GIRO", allowBlank: false},
                     {name: "TIPO_PASAJE", allowBlank: false},
                     {name: "CANTIDAD", allowBlank: false},
					 {name: "TARIFA_UNITARIA", allowBlank: false},
                     {name: "TOTAL", allowBlank: false}
                    ]
        }),
        groupField:'GIRO',
		sortInfo:{field: "GIRO"},
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
      columns:[{id: "GIRO", header: "GIRO", dataIndex: "GIRO", hidden: false, hideable: true, width: 50},
			    {header: "TIPO PASAJE", dataIndex: "TIPO_PASAJE", width: 70,align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
					summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' TOTAL)' : '<font color="green"><b>TOTAL</b></font>');}
				},
               {header: "CANTIDAD", dataIndex: "CANTIDAD",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
				summaryType: 'count',
				renderer: function (value, style, record, row, col, store, grid) {
			   return ((value === 0 || value > 1) ? '<font color="green">' + value + ' Tickets</font>' : '<font color="green">1 Ticket</font>');},
				summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '<font color="green"><b>' + value + ' Tickets</b></font>' : '<font color="green"><b>1 Ticket</b></font>');
				}
			   },
               {header: "TARIFA UNITARIA", dataIndex: "TARIFA_UNITARIA",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "TOTAL", dataIndex: "TOTAL",  width: 20,align: "right", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
				 renderer: function (value, style, record, row, col, store, grid) {
			   return Ext.util.Format.usMoney (record.get('CANTIDAD') * record.get('TARIFA_UNITARIA'));
				}, 
				summaryType : "totalCost",  
				summaryRenderer: Ext.util.Format.usMoney  
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
	
	var btnTotal = new Ext.Action({
      id: "btnTotal",
      text: '<font size="2"><b>TOTAL</b></font>',
	  disabled: false
      
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
      //tbar: [btnNew, btnDel,btnUpdate, "->", txtSearch, btnTextClear, btnSearch],
      bbar: [btnTotal,txtTotal],
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
