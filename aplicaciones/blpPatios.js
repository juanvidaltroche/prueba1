Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";

var LABEL_TITLE_PANEL_1 = "PATIOS";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "buscar ...";

var sw="0"; //variable para utilizarlo en las modificaciones

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpPatiosAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUser.loadData(Ext.util.JSON.decode(result.responseText));
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
    var storeUser = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpPatiosAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "PATIO_ID", allowBlank: false},
                     {name: "PATIO_DESCRIPCION", allowBlank: false},
                     {name: "PATIO_DETALLE", allowBlank: false},
                     {name: "PATIO_REGISTRO", allowBlank: false},
                     {name: "PATIO_MODIFICACION", allowBlank: false},
                     {name: "PATIO_USUARIO", allowBlank: false},
                     {name: "PATIO_ESTADO", allowBlank: false}
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
                        fieldLabel: 'Patio Descripcion',
                        id: 'PATIO_DESCRIPCION_LABEL',
                        name: 'PATIO_DESCRIPCION_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'Patio Detalle',
                        id: 'PATIO_DETALLE_LABEL',
                        name: 'PATIO_DETALLE_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'Estado',
                        id: 'PATIO_ESTADO_COMBO',
                        name: 'PATIO_ESTADO_COMBO',
                        allowBlank: false,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'ACTIVO',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                emptyText: 'Seleccione el estado ...',
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
                    text: 'Guardar',
					id: 'GuardarPatio',
                    name: 'GuardarPatio',
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
							//--------------ADICIONAR-----------------------
							if(sw =="0")
							{
								newForm.getForm().submit({
									url: '../servicios/blpPatiosAjax.php?option=NEW',
									waitMsg: 'Guardando registro ...',
									success: function(form, action){
										storeUser.reload();
										alert('Se registro con exito');
									},
									failure: function(form, action){
										alert('Falla al guardar registro');
									}
								});
							}
							else //---------------MODIFCAR----------------------
							{
								var rec = grdpnlUser.getSelectionModel().getSelected();
								if (!rec) {
									return false;
								}
								var value = rec.get('PATIO_ID');
								//-------------------------------
								newForm.getForm().submit({
									url: '../servicios/blpPatiosAjax.php',																
									method: "POST",
									params: {"option": "UPD", "i": value},
									waitMsg: 'Registro Modificado ...',
									success: function(form, action){
										storeUser.reload();
										alert('Se modifico con exito');
									},
									failure: function(form, action){
										alert('Registro no modificado');
									}
								});
							
							}
							//-------------------------------------
							winForm.hide();
                        }
                    }
                    }, {
                        text: 'Cancelar',
                        handler: function(){
                            winForm.hide();
                    }
                }]
    })

    winForm = new Ext.Window({
                layout: 'fit',
				id: 'FormPatioAdiModi',
                name: 'FormPatioAdiModi',
                width: 500,
                height: 170,
                closeAction: 'hide',
                plain: true,
                title: 'Adicion Nuevo Patio',
                items: newForm
    });



    var btnNew = new Ext.Action({
      id: "btnNew",
      text: "Nuevo",
	  iconCls: 'icon-add',
      handler: function() {
        Ext.getCmp('PATIO_DESCRIPCION_LABEL').reset();   
		Ext.getCmp('PATIO_DETALLE_LABEL').reset(); 
        Ext.getCmp('PATIO_ESTADO_COMBO').reset();
		sw="0"; 
		Ext.getCmp('GuardarPatio').setText('GUARDAR');
		Ext.getCmp('FormPatioAdiModi').setTitle('Adicion Nuevo Patio');
        winForm.show(this);
      }
    });
	
	var btnUpd = new Ext.Action({
      id: "btnUpd",
      text: "Modificar",
      iconCls: 'icon-edit',
      handler:     function onUpdate() {
	    var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
            return false;
        }
		Ext.getCmp('PATIO_DESCRIPCION_LABEL').setValue(rec.get('PATIO_DESCRIPCION'));
		Ext.getCmp('PATIO_DETALLE_LABEL').setValue(rec.get('PATIO_DETALLE'));
		Ext.getCmp('PATIO_ESTADO_COMBO').setValue(rec.get('PATIO_ESTADO'));
		//Ext.getCmp('RUTA_ID_LABEL').setValue(rec.get('RUTA_ID'));
		var value = rec.get('PATIO_ID');
		winForm.show(this);
		Ext.getCmp('GuardarPatio').setText('MODIFICAR');
		Ext.getCmp('FormPatioAdiModi').setTitle('Modificar Patio');
       	sw="1";
		
      }

    });

    var btnDel = new Ext.Action({
      id: "btnDel",

      text: "Dar Baja",
	  iconCls: 'icon-del',
      handler:     function onDelete() {
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
            return false;
        }
        var value = rec.get('PATIO_ID');
        Ext.Ajax.request({
		    url: "../servicios/blpPatiosAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("", "Dato eliminado");
                  storeUser.reload();
                },
            failure:function (result, request) {
                  Ext.MessageBox.alert("", "Fallo");
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
      store: storeUser,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Tamanio de pagina:", cboPageSize]
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },

      columns:[{id: "ID", header: "ID", dataIndex: "PATIO_ID", hidden: false, hideable: true, width: 50},
               {header: "DESCRIPCION", dataIndex: "PATIO_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "DETALLE", dataIndex: "PATIO_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "REGISTRO", dataIndex: "PATIO_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "PATIO_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "PATIO_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "PATIO_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
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
      store: storeUser,
      colModel: cmodel,
      selModel: smodel,

      columnLines: true,
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column

      tbar: [btnNew, btnDel,btnUpd, "->", txtSearch, btnTextClear, btnSearch],
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
