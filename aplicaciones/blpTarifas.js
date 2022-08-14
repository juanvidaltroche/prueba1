Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";

var LABEL_TITLE_PANEL_1 = "TARIFAS";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "Buscar ...";
var sw="0";
var jsNombreBoton = "GUARDAR";
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpTarifasAjax.php",
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

		//store tipos Herramientas
    var storeTiposPasaje = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpTiposPasajeAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TIPO_PASAJE_ID"},
                     {name: "TIPO_PASAJE_DESCRIPCION"}
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
            url:    "../servicios/blpTarifasAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TARIFA_ID", allowBlank: false},
                     {name: "TARIFA_TIPO_PASAJE_ID", allowBlank: false},
					 {name: "TIPO_PASAJE_DESCRIPCION", allowBlank: false},
                     {name: "TARIFA_DESCRIPCION", allowBlank: false},
					 {name: "TARIFA_NRO_RESOLUCION", allowBlank: false},
                     {name: "TARIFA_MONTO", allowBlank: false},
                     {name: "TARIFA_REGISTRO", allowBlank: false},
                     {name: "TARIFA_MODIFICACION", allowBlank: false},
                     {name: "TARIFA_USUARIO", allowBlank: false},
                     {name: "TARIFA_ESTADO", allowBlank: false}
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
                items: [
				   {
                            fieldLabel: 'TIPO PASAJE',
                            id: 'TARIFA_TIPO_PASAJE_ID',
                            name: 'TARIFA_TIPO_PASAJE_ID',
                            allowBlank:true,
                            xtype:          'combo',
                            //mode:           'local',
                            //value:          '1',
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText: 'Seleccione Tipo de Pasaje',
                            typeAhead: true,
                            hiddenName:     'H_TIPO_PASAJE_ID',
                            displayField:   'TIPO_PASAJE_DESCRIPCION',
                            valueField:     'TIPO_PASAJE_ID',
                            store: storeTiposPasaje
					},{
                        fieldLabel: 'TARIFA DESCRIPCION',
                        id: 'TARIFA_DESCRIPCION',
                        name: 'TARIFA_DESCRIPCION',
                        allowBlank:false
                    },{
                        fieldLabel: 'TARIFA NRO RESOLUCION',
                        id: 'TARIFA_NRO_RESOLUCION',
                        name: 'TARIFA_NRO_RESOLUCION',
                        allowBlank:false
                    },{
                        fieldLabel: 'MONTO',
                        id: 'TARIFA_MONTO',
                        name: 'TARIFA_MONTO',
                        allowBlank:false
                    },{
                        fieldLabel: 'TARIFA ESTADO',
                        id: 'TARIFA_ESTADO',
                        name: 'TARIFA_ESTADO',
                        allowBlank: false,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'Selecione el Estado',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                emptyText: 'Select a status ...',
                                typeAhead: true,
                                //hiddenName:     'CATEGORY_STATUS',
                                displayField:   'name',
                                valueField:     'value',
                                store:          new Ext.data.JsonStore({
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'ACTIVO',   value: 'ACTIVO'},
                                        {name : 'INACTIVO', value: 'INACTIVO'}
                                    ]
                                })
                    }
                ],
                buttons: [{
                    text:  jsNombreBoton,
					id: 'Btn',
                    name: 'Btn',
					iconCls: 'icon-save',
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
			        //--------------ADICIONAR-----------------------
					        if(sw =="0")
							{
                            newForm.getForm().submit({
                                url: '../servicios/blpTarifasAjax.php?option=NEW',
                                waitMsg: 'Guardando registro...',
                                success: function(form, action){
                                    storeUser.reload();
                                    alert('Se registro con exito');
                                },
                                failure: function(form, action){
                                    alert('Falla al guardar registro');
                                }
                            });
							}else //---------------MODIFCAR----------------------
							{
							var rec = grdpnlUser.getSelectionModel().getSelected();
						     if (!rec) {
							  return false;
						      }
						        var value = rec.get('TARIFA_ID');
								//alert(value);
								//----------------------------
							    newForm.getForm().submit({
                                url: '../servicios/blpTarifasAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storeUser.reload();
                                    alert('Registro Modificado ...');
                                },
                                failure: function(form, action){
                                    alert('Registro no modificado');
                                }
                            });
							}
                            winForm.hide();
                        }
                    }
                    },{
                        text: 'CANCELAR',
						iconCls: 'icon-cancel',
                        handler: function(){
                            winForm.hide();
                    }
                }]
    })

    winForm = new Ext.Window({
                layout: 'fit',
				id: 'FormTarifaAdiModi',
                name: 'FormTarifaAdiModi',
                width: 500,
                height: 250,
                closeAction: 'hide',
                plain: true,
                title: 'NUEVA TARIFA',

                items: newForm
    });



    var btnNew = new Ext.Action({
      id: "btnNew",

      text: "ADICIONAR",
      iconCls: 'icon-add',
      handler: function() {
	    //Ext.getCmp('ModificaTarifa').hide(true);
		
        Ext.getCmp('TARIFA_TIPO_PASAJE_ID').reset();
        Ext.getCmp('TARIFA_DESCRIPCION').reset();
		Ext.getCmp('TARIFA_NRO_RESOLUCION').reset();
		Ext.getCmp('TARIFA_MONTO').reset();
		winForm.show(this);
		sw="0";
		Ext.getCmp('Btn').setText('GUARDAR');
		Ext.getCmp('FormTarifaAdiModi').setTitle('NUEVA TARIFA');
		Ext.getCmp('Btn').setIconClass('icon-save');
      }
    });
	 var btnUpd = new Ext.Action({
      id: "btnUpd",

      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler:     function onUpdate() {
	   
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
          alert('Selecione Registro');
            return false;
        }
        winForm.show(this);
		Ext.getCmp('TARIFA_TIPO_PASAJE_ID').setValue(rec.get('TIPO_PASAJE_DESCRIPCION'));
		
		Ext.getCmp('TARIFA_DESCRIPCION').setValue(rec.get('TARIFA_DESCRIPCION'));
		Ext.getCmp('TARIFA_NRO_RESOLUCION').setValue(rec.get('TARIFA_NRO_RESOLUCION'));
		Ext.getCmp('TARIFA_MONTO').setValue(rec.get('TARIFA_MONTO'));
		Ext.getCmp('TARIFA_ESTADO').hide(true);
		//Ext.getCmp('TARIFA_ESTADO').setValue(rec.get('TARIFA_ESTADO'));
        var value = rec.get('TARIFA_ID');
		sw="1";
	    Ext.getCmp('Btn').setText('GUARDAR');
        Ext.getCmp('FormTarifaAdiModi').setTitle('MODIFICAR TARIFA');
		//Ext.getCmp('Btn').setIconClass('icon-edit');
    Ext.getCmp('Btn').setIconClass('icon-save');
		
       
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
        var value = rec.get('TARIFA_ID');
        Ext.Ajax.request({
            url: "../servicios/blpTarifasAjax.php",
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
      items: ["-", "Page size:", cboPageSize]
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },

      columns:[{id: "ID", header: "ID", dataIndex: "TARIFA_ID", hidden: false, hideable: true, width: 50},
               {header: "TIPO PASAJE ID", dataIndex: "TARIFA_TIPO_PASAJE_ID", align: "left",  hidden: true, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "TIPO PASAJE", dataIndex: "TIPO_PASAJE_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "TARIFA DESCRIPCION", dataIndex: "TARIFA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "NRO. RESOLUCION", dataIndex: "TARIFA_NRO_RESOLUCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MONTO", dataIndex: "TARIFA_MONTO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			   {header: "REGISTRO", dataIndex: "TARIFA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "TARIFA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "TARIFA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "TARIFA_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
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

      tbar: [btnNew, btnUpd,btnDel/*, "->", txtSearch, btnTextClear, btnSearch*/],
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
