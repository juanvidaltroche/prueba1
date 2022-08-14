Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "TRANSACCIONES";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";

var NUMERO_GIROS = '';

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpTransaccionesAjax.php",
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
    };
    onMnuContext = function(grid, rowIndex,e) {
      e.stopEvent();
      var coords = e.getXY();
      mnuContext.showAt([coords[0], coords[1]]);
    };
    //Variables declared in html file
    var pageSize = parseInt(20/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;	
	//store Tipos Pasaje
	
	var storeTiposPasaje = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTiposPasajeAjax.php",
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
	
	//store Categories
    var storeTransacciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTransaccionesAjax.php",
            method: "POST"
        }),

        //groupField: 'GIRO',
        //baseParams: {"option": "LST", "pageSize": pageSize},
		groupField: 'TRX_GIRO_ID',
		sortInfo: {field:"TRX_GIRO_ID", direction:"ASC"},
		
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
					 {name: "TRX_ID", allowBlank: false},
                     {name: "TRX_GIRO_ID", allowBlank: false},
                     {name: "TRX_TIPO_PASAJE_ID", allowBlank: false},
                     {name: "TRX_NRO_TARJETA", allowBlank: false},
                     {name: "TRX_NRO_FACTURA", allowBlank: false},
                     {name: "TRX_PARADA_ID", allowBlank: false},
					 {name: "TRX_REGISTRO", allowBlank: false},
                     {name: "TRX_MODIFICACION", allowBlank: false},
					 {name: "TRX_USUARIO", allowBlank: false},
					 {name: "HRR_DETALLE", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_DESCRIPCION", allowBlank: false},
                     {name: "TRX_ESTADO", allowBlank: false},					 					 
                     {name: "PARADA_DESCRIPCION", allowBlank: false},//PARADA_DETALLE
					 {name: "PARADA_DETALLE", allowBlank: false},//
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_HERRAMIENTA_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_FUNCIONARIO_DESCRIPCION", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},//888888888888
					 
					 
                     {name: "TIPO_PASAJE_DESCRIPCION", allowBlank: false},
					 {name: "TARIFA_MONTO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
	// utilize custom extension for Group Summary
    var summary = new Ext.ux.grid.GroupSummary();	
    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });
    // panel
    newForm = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                //autoHeight: true,
                height:400,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 100,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [{
                        fieldLabel: 'Giros',
                        id: 'TRX_GIRO_ID',
                        name: 'TRX_GIRO_ID',
                        allowBlank:false
					},
					{
                        fieldLabel: 'Nro Tarjeta',
                        id: 'TRX_NRO_TARJETA',
                        name: 'TRX_NRO_TARJETA',
                        allowBlank:false
					},
					{
                        fieldLabel: 'Nro Factura',
                        id: 'TRX_NRO_FACTURA',
                        name: 'TRX_NRO_FACTURA',
                        allowBlank:false
					},
					{
                        fieldLabel: 'Parada',
                        id: 'PARADA_DESCRIPCION',
                        name: 'PARADA_DESCRIPCION',
                        allowBlank:false
					},
					{
                        fieldLabel: 'Herramienta',
                        id: 'HRR_DETALLE',
                        name: 'HRR_DETALLE',
                        allowBlank:false
					},
					{
                        fieldLabel: 'Funcionario',
                        id: 'TIPO_FUNCIONARIO_DESCRIPCION',
                        name: 'TIPO_FUNCIONARIO_DESCRIPCION',
                        allowBlank:false
					}
					
                ],
                buttons: [{
                        text: 'Cerrar',
                        handler: function(){
                            winForm.hide();
                    }
                }]
    })

    winForm = new Ext.Window({
                layout: 'fit',
                width: 500,
                height: 250,
                closeAction: 'hide',
                plain: true,
                title: 'VER TRANSACCION',

                items: newForm
    });
	
    

    var btnDel = new Ext.Action({
      id: "btnDel",

      text: "DAR BAJA",
      iconCls: 'icon-del',
      handler:     function onDelete() {
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
            return false;
        }
        var value = rec.get('TRX_ID');		
		console.log(value);
        Ext.Ajax.request({
            url: "../servicios/blpTransaccionesAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Succesfully");				  
                  storeTransacciones.reload();
                },
            failure:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Fail saving record");
                }
        });
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
      store: storeTransacciones,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSize]
    });
	
	var pagingUser2 = new Ext.PagingToolbar({
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
      },//8888888888888
      columns:[
	  
			   {id: "TRX_ID", header: "ID", dataIndex: "TRX_ID", hidden: false, hideable: true, width: 50},               
			   {id: "ID", header: "ID GIRO", dataIndex: "TRX_GIRO_ID", hidden: false, hideable: true, width: 50},   
			   {header: "HERRAMIENTA </br> DESCRIPCION", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},					   
			   {header: "HERRAMIENTA </br>DETALLE", dataIndex: "HRR_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "TIPO HERRAMIENTA </br>DESCRIPCION", dataIndex: "TIPO_HERRAMIENTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({}), width: 150},
			   
               {header: "TIPO FUNCIONARIO </br> DESCRIPCION", dataIndex: "TIPO_FUNCIONARIO_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "NOMBRE FUNCIONARIO", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   //{header: "RUTA DESCRIPCION", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "PARADA </br> DETALLE", dataIndex: "PARADA_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "TIPO PASAJE </br> DESCRIPCION", dataIndex: "TIPO_PASAJE_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "TARIFA </br>MONTO", dataIndex: "TARIFA_MONTO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   			   
               {header: "REGISTRO", dataIndex: "TRX_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "TRX_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "TRX_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   //summaryType: 'count',
			   //summaryType: 'sum', renderer : function(v){ return Ext.util.Format.usMoney( v ); }, editor: new Ext.form.TextField({})},
			   
			   //{header: "FUNCIONARIO", dataIndex: "TIPO_FUNCIONARIO_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "TRX_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
                 renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
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
    var grdpnlUser = new Ext.grid.GridPanel({
      id: "grdpnlUser",
      store: storeTransacciones,
      colModel: cmodel,
      selModel: smodel,
	  plugins: summary,
      columnLines: true,
	  
	  view : new Ext.grid.GroupingView({  
        forceFit            : true,  
        ShowGroupName       : true, 		
        enableNoGroup       : false,  
        enableGropingMenu   : false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})',
        hideGroupedColumn   : true		
      }),		
	  features: [{
		ftype: 'summary'
	  }],
		
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
      tbar: [btnDel/*, "->", txtSearch, btnTextClear, btnSearch*/],
      bbar: [pagingUser],	  
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
