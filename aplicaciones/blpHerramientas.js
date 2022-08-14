Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "HERRAMIENTAS";
var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";

var OPERACION = '';

acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpHerramientasAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUser.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
				  //alert("mensaje");
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

	//store tipos Herramientas
    var storeTipoHerramientas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTiposHerramientaAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TIPO_HERRAMIENTA_ID"},
                     {name: "TIPO_HERRAMIENTA_CODIGO"}
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
    var storeUser = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpHerramientasAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
		//TIPO_HERRAMIENTA_CODIGO
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "HRR_ID", allowBlank: false},
                     {name: "HRR_TIPO_HERRAMIENTA_ID", allowBlank: false},
					 {name: "TIPO_HERRAMIENTA_CODIGO", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "HRR_DETALLE", allowBlank: false},
                     {name: "HRR_REGISTRO", allowBlank: false},
					 {name: "HRR_MODIFICACION", allowBlank: false},
                     {name: "HRR_USUARIO", allowBlank: false},
					 {name: "HRR_ESTADO", allowBlank: false}
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
                            fieldLabel: 'Tipo Herramienta',
                            id: 'HRR_TIPO_HERRAMIENTA_ID',
                            name: 'HRR_TIPO_HERRAMIENTA_ID',
                            allowBlank:true,
                            xtype:          'combo',
                            //mode:           'local',
                            //value:          '1',
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText: '',
                            typeAhead: true,
                            hiddenName:     'H_HERRAMIENTA_ID',
                            displayField:   'TIPO_HERRAMIENTA_CODIGO',
                            valueField:     'TIPO_HERRAMIENTA_ID',
                            store: storeTipoHerramientas
						},{						
							fieldLabel: 'DESCRIPCION',
							id: 'HRR_DESCRIPCION',
							name: 'HRR_DESCRIPCION',
							allowBlank:false
						},{
							fieldLabel: 'DETALLE',
							id: 'HRR_DETALLE',
							name: 'HRR_DETALLE',
							allowBlank:false
						},{	xtype: 'hidden',
							id: 'HRR_HERRAMIENTA_ID',
							name: 'HRR_HERRAMIENTA_ID'
						}
                ],
                buttons: [{
                    text: 'GUARDAR',
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
                            newForm.getForm().submit({
                                url: '../servicios/blpHerramientasAjax.php?option=' + OPERACION,
                                waitMsg: 'Saving record ...',
                                success: function(form, action){
                                    storeUser.reload();
                                    alert('Se registro con exito');
                                },
                                failure: function(form, action){
                                    //alert(action + 'Fail saving record');
									storeUser.reload();
                                    alert('Se registro con exito');
                                }
                            });
                            winForm.hide();
                        }
                    }
                    }, {
                        text: 'CANCELAR',
                        handler: function(){
                            winForm.hide();
                    }
                }]
    })
	
    // panel
	function cambiaOperacion(op)
	{
		OPERACION = op;
	}
    winForm = new Ext.Window({
                layout: 'fit',
                width: 500,
                height: 200,
                closeAction: 'hide',
                plain: true,
                title: 'HERRAMIENTA',
                items: newForm
    });
    var btnNew = new Ext.Action({
      id: "btnNew",

      text: "ADICIONAR",
      iconCls: 'icon-add',
      handler: function() {
		cambiaOperacion('NEW');
		//alert(OPERACION);
        Ext.getCmp('HRR_DESCRIPCION').reset();
        Ext.getCmp('HRR_DETALLE').reset();
        winForm.show(this);
      }
    });
	
	var btnUpdate = new Ext.Action({
      id: "btnUpdate",
      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler: function() {
		cambiaOperacion('UPD');
		var rec = grdpnlUser.getSelectionModel().getSelected();
		if (!rec) {			
            return false;
        }
		//alert(OPERACION);
        var value = rec.get('HRR_ID');				
		
		Ext.getCmp('HRR_TIPO_HERRAMIENTA_ID').setValue(rec.get('HRR_TIPO_HERRAMIENTA_ID'));
		
		Ext.getCmp('HRR_HERRAMIENTA_ID').setValue(value);
        Ext.getCmp('HRR_DESCRIPCION').setValue(rec.get('HRR_DESCRIPCION'));
        Ext.getCmp('HRR_DETALLE').setValue(rec.get('HRR_DETALLE'));		
        winForm.show(this);
      }
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
        var value = rec.get('HRR_ID');		
        Ext.Ajax.request({
            url: "../servicios/blpHerramientasAjax.php?option=DEL",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Dato eliminado");
                  storeUser.reload();
                },
            failure:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Fallo");
                }
        });
      }

    });

    var txtSearch = new Ext.form.TextField({
      id: "txtSearch",

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
      items: ["-", "Page size:", cboPageSize]
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "HRR_ID", hidden: false, hideable: true, width: 50},
               {header: "TIPO HERRAMIENTA", dataIndex: "TIPO_HERRAMIENTA_CODIGO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "DESCRIPCION", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "DETALLE", dataIndex: "HRR_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "REGISTRO", dataIndex: "HRR_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},			   
			   {header: "MODIFICACION", dataIndex: "HRR_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},			   
			   //{header: "Usuario", dataIndex: "HRR_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "HRR_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
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

      //tbar: [btnNew, btnUpdate, btnDel, "->", txtSearch, btnTextClear, btnSearch],
	  tbar: [btnNew, btnUpdate, btnDel],
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
