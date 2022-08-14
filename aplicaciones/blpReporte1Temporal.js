Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "REPORTE";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";
var textField = new Ext.form.TextField({allowBlank: false,}),

numField = new Ext.form.NumberField({allowBlank: false, allowNegative: false});
	
	var summary = new Ext.ux.grid.GroupSummary();    
	Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
		 return v+(record.data.CANTIDAD*record.data.TARIFA_UNITARIA)
	}; 
		
	//return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpReporte1TemporalAjax.php",
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
        url: "../servicios/blpReporte11TemporalAjax.php",
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
    var pageSize = parseInt(10/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;
	
	//store grilla
    var storeTransacciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporte1TemporalAjax.php",
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
		sortInfo:{field: 'GIRO'},
                groupField:['GIRO'],
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
	
	//store panel
    var storeTotal = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpReporte11TemporalAjax.php",  
            method: "POST"
        }),
		reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",	
            fields: [{name: "TOTAL", allowBlank: false}]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
	storeTotal.load();


    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });
	
       var  newForm = new Ext.FormPanel({
				layout: 'form',
				region: 'center',
				//width: "100%",
                autoHeight: true,
                height: 200,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 120,
                defaults: {
                    //anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [
						
						{
                        fieldLabel: 'TOTAL',
                        id: 'SUMA_TOTAL',
                        name: 'SUMA_TOTAL',
                        allowBlank:false,
						disabled: true,
						
						}
				]
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
               {header: "TIPO PASAJE", dataIndex: "TIPO_PASAJE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "CANTIDAD", dataIndex: "CANTIDAD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "TARIFA UNITARIA", dataIndex: "TARIFA_UNITARIA", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {id: "TOTAL",header: "TOTAL", align: "left", sortable: false, groupable: false, 
			   renderer: function (value, style, record, row, col, store, grid) {
			   return (record.get('CANTIDAD') * record.get('TARIFA_UNITARIA'));
				}, 
				summaryType : "totalCost",  
				summaryRenderer: Ext.util.Format.usMoney  
				} 
				
            ]

    });	

	
	
   

  
    var grdpnlUser = new Ext.grid.GridPanel({

      id: "grdpnlUser",
      store: storeTransacciones,
	  plugins    : summary,  //step 3  
	  region: 'north',
      colModel: cmodel,
      //selModel: smodel,
      columnLines: true,
      viewConfig: {forceFit: true, stripeRows: false},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
	   view : new Ext.grid.GroupingView({  
                    forceFit            : true,  
                    ShowGroupName       : true,  
                    enableNoGroup       : false,  
                    enableGropingMenu   : false, 
                    //groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})', 
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registro"]})', 
					hideGroupedColumn   : true  
                }),	
	  features: [{
            ftype: 'summary'
        }],
		
		
		
		//tbar: [btnSearch,numField],
      //tbar: [btnNew, btnDel, "->", txtSearch, btnTextClear, btnSearch],
      bbar: pagingUser,

      style: "margin: 0 auto 0 auto;",
      width: '100%',
      height: '550',
      title: LABEL_TITLE_PANEL_1,

     // renderTo: "divMain",

      listeners:{
      }
    });

    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);

    cboPageSize.setValue(pageSize);

    var viewport = new Ext.Viewport({
          layout : 'border',
          items : [ grdpnlUser,newForm]
    });


	
  }
}



Ext.onReady(acl.application.init, acl.application);
