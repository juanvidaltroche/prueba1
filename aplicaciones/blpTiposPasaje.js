Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "TIPOS PASAJE";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpTiposPasajeAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeTiposPasaje.loadData(Ext.util.JSON.decode(result.responseText));
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

    //store Categories
    var storeTiposPasaje = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTiposPasajeAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TIPO_PASAJE_ID", allowBlank: false},
                     {name: "TIPO_PASAJE_CODIGO", allowBlank: false},
                     {name: "TIPO_PASAJE_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_PASAJE_REGISTRO", allowBlank: false},
                     {name: "TIPO_PASAJE_MODIFICACION", allowBlank: false},
                     {name: "TIPO_PASAJE_USUARIO", allowBlank: false},
                     {name: "TIPO_PASAJE_ESTADO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });

    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });






    // panel
    newForm = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                autoHeight: true,
                height: 100,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 100,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [{
                        fieldLabel: 'CODIGO',
                        id: 'TIPO_PASAJE_CODIGO',
                        name: 'TIPO_PASAJE_CODIGO',
                        allowBlank:false
                    },
					{ 
                        fieldLabel: 'DESCRIPCION',
                        id: 'TIPO_PASAJE_DESCRIPCION',
                        name: 'TIPO_PASAJE_DESCRIPCION',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'ESTADO',
                        id: 'categoria_estado',
                        name: 'categoria_estado',
                        allowBlank: false,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'ACTIVO',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                emptyText: 'Select a status ...',
                                typeAhead: true,
                                //hiddenName:     'CATEGORY_STATUS',
                                displayField:   'nombre',
                                valueField:     'valor',
                                store:          new Ext.data.JsonStore({
                                    fields : ['nombre', 'valor'],
                                    data   : [
                                        {nombre : 'ACTIVO',   valor: 'ACTIVO'},
                                        {nombre : 'INACTIVO', valor: 'INACTIVO'}
                                    ]
                                })
                    }
					
					
                ],
                buttons: [{
                    text: 'GUARDAR',
					iconCls: 'icon-save',
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
                            newForm.getForm().submit({
                                url: '../servicios/blpTiposPasajeAjax.php?option=NEW', 
                                waitMsg: 'Guardando ...',
                                success: function(form, action){
								Ext.MessageBox.alert("Exito!!!", "Datos adicionados");
                                    storeTiposPasaje.reload();
                                },
                                failure: function(form, action){
								Ext.MessageBox.alert("Fallo", "Datos no guardados");
                                }
                            });
                            winForm.hide();
                        }
                    }
                    }, {
                        text: 'CANCELAR',
						iconCls: 'icon-cancel',
                        handler: function(){
                            winForm.hide();
                    }
                }]
    })

    winForm = new Ext.Window({
                layout: 'fit',
                width: 500,
                height: 170,
                closeAction: 'hide',
                plain: true,
                title: 'ADICIONAR TIPO PASAJE',

                items: newForm
    });



    var btnNew = new Ext.Action({
      id: "btnNew",

      text: "ADICIONAR",
      iconCls: 'icon-add',
      handler: function() { 
        Ext.getCmp('TIPO_PASAJE_CODIGO').reset();
        Ext.getCmp('TIPO_PASAJE_DESCRIPCION').reset();
		
        winForm.show(this);
      }
    });

	//modificar
	

	var btnUpd = new Ext.Action({
      id: "btnUpd",
      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler: function onUpdate() {
	  
		
		var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
            return false;
        }
        var valueId = rec.get('TIPO_PASAJE_ID');
		var valueCodigo = rec.get('TIPO_PASAJE_CODIGO');
		var valueDescripcion = rec.get('TIPO_PASAJE_DESCRIPCION');
		//var valueEstado = rec.get('TIPO_PASAJE_ESTADO');
	
	    Ext.getCmp('UPDTIDTIPOPASAJE').setValue(valueId);
		Ext.getCmp('UPDCODIGO').setValue(valueCodigo);
        Ext.getCmp('UPDTDESCRIPCION').setValue(valueDescripcion);
		//Ext.getCmp('UPDTESTADO').setValue(valueEstado);
        winFormUpd.show(this);
      }
    });
	
	
	newFormUpd = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                autoHeight: true,
                height: 100,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 100,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [
				    {
                        fieldLabel: 'ID TIPO PASAJE',
                        id: 'UPDTIDTIPOPASAJE',
                        name: 'UPDTIDTIPOPASAJE',
                        hidden: true,
						allowBlank:false
                    },{
                        fieldLabel: 'CODIGO',
                        id: 'UPDCODIGO',
                        name: 'UPDCODIGO',
                        allowBlank:false
                    },{
                        fieldLabel: 'DESCRIPCION',
                        id: 'UPDTDESCRIPCION',
                        name: 'UPDTDESCRIPCION',
                        allowBlank:false
                    },
					/**
					{
                        fieldLabel: 'ESTADO',
                        id: 'UPDTESTADO',
                        name: 'UPDTESTADO',
                        allowBlank: false,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'ACTIVO',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                emptyText: 'Seleccione ...',
                                typeAhead: true,
                                //hiddenName:     'CATEGORY_STATUS',
                                displayField:   'nombre',
                                valueField:     'valor',
                                store:          new Ext.data.JsonStore({
                                    fields : ['nombre', 'valor'],
                                    data   : [
                                        {nombre : 'ACTIVO',   valor: 'ACTIVO'},
                                        {nombre : 'INACTIVO', valor: 'INACTIVO'}
                                    ]
                                })
                    }*/
                ],
                buttons: [{
                    text: 'MODIFICAR',
					iconCls: 'icon-save',
                    handler: function() {
                        if(newFormUpd.getForm().isValid()){
                            form_action = 1;
                            newFormUpd.getForm().submit({
                                url: '../servicios/blpTiposPasajeAjax.php?option=UPD',
								waitMsg: 'Guardando ...',
                                success: function(form, action){
                                    storeTiposPasaje.reload();
                                    alert('Correcto');
                                },
                                failure: function(form, action){
                                    alert('REGISTRO NO ADICIONADO');
                                }
                            });
                            winFormUpd.hide();
                        }
                    }
                    }, {
                        text: 'CANCELAR',
						iconCls: 'icon-cancel',
                        handler: function(){
                            winFormUpd.hide();
                    }
                }]
    })
	
	  winFormUpd = new Ext.Window({
                layout: 'fit',
                width: 500,
                height: 200,
                closeAction: 'hide',
                plain: true,
                title: 'MODIFICAR TIPO PASAJE',
                items: newFormUpd
    });
    var btnDel = new Ext.Action({
      id: "btnDel",

      text: "DAR DE BAJA",
      iconCls: 'icon-del',
      handler:     function onDelete() {
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
            return false;
        }
        var value = rec.get('TIPO_PASAJE_ID');
        Ext.Ajax.request({
			url: "../servicios/blpTiposPasajeAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
			
                  Ext.MessageBox.alert("Exito!!!", "Registro eliminado");
                  storeTiposPasaje.reload();
                },
            failure:function (result, request) {
                  Ext.MessageBox.alert("Fallo", "Registro no eliminado");
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
      store: storeTiposPasaje,
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

      columns:[{id: "ID", header: "ID", dataIndex: "TIPO_PASAJE_ID", hidden: false, hideable: true, width: 50},
			   {header: "CODIGO", dataIndex: "TIPO_PASAJE_CODIGO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "TIPO PASAJE", dataIndex: "TIPO_PASAJE_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "REGISTRO", dataIndex: "TIPO_PASAJE_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "TIPO_PASAJE_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "TIPO_PASAJE_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "TIPO_PASAJE_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
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
      store: storeTiposPasaje,
      colModel: cmodel,
      selModel: smodel,

      columnLines: true,
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column

      tbar: [btnNew,btnUpd,btnDel, "->", txtSearch, btnTextClear, btnSearch],
      bbar: pagingUser,

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
