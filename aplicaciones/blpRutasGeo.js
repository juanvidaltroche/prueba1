Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";

var LABEL_TITLE_PANEL_1 = "RUTAS";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "buscar ...";

var sw="0";
var jsNombreBoton = "Guardar";
var globalrutaid="0";
var globalrutadescripcion="";
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpRutasAjax.php",
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
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "RUTA_ID", allowBlank: false},
                     {name: "RUTA_DESCRIPCION", allowBlank: false},
                     {name: "RUTA_DETALLE", allowBlank: false},
                     {name: "RUTA_REGISTRO", allowBlank: false},
                     {name: "RUTA_MODIFICACION", allowBlank: false},
                     {name: "RUTA_USUARIO", allowBlank: false},
                     {name: "RUTA_ESTADO", allowBlank: false}
                    ]
        }),
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

    var cmodelRuta = new Ext.grid.ColumnModel({
		defaults: {
        sortable:true
    },
		columns:[
			{id: "ID", header: "ID", dataIndex: "RUTA_ID", hidden: false, hideable: true, width: 50},
			{header: "DESCRIPCION", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "DETALLE", dataIndex: "RUTA_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			//{header: "REGISTRO", dataIndex: "RUTA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			//{header: "MODIFICACION", dataIndex: "RUTA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			//{header: "USUARIO", dataIndex: "RUTA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "ESTADO", dataIndex: "RUTA_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
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
			var rec = grdpnlUser.getSelectionModel().getSelected();
			if (!rec) {
				return false;
			}
			var value = rec.get('RUTA_ID');
			//davvvvv x01
			window.frames['iframe025'].window.GenerandoPuntos(value);//dav
			storeUserProcessParada(pageSizeParada, pageSizeParada, 0,value);//dav01 core x01
			
			//alert(value);
        },
        rowdeselect: function (sm) {
        }
      }
    });
	

    var grdpnlUser = new Ext.grid.GridPanel({
		id: "grdpnlUser",
		store: storeUser,
		colModel: cmodelRuta,
		selModel: smodel,
		columnLines: true,
		viewConfig: {forceFit: true},
		enableColumnResize: true,
		enableHdMenu: true, //Menu of the column
		//tbar: [btnNew, btnDel, btnUpd,"->", txtSearch, btnTextClear, btnSearch],//dav01 dav x01
		bbar: pagingUser,
		style: "margin: 0 auto 0 auto;",
		width: '100%',
		height: '450',
		title: 'RUTAS',
		renderTo: "divMain",
		listeners:{
			
		}
    });
	//hijo paradas****************************************************************************************
	
	
	
	storeUserProcessParada = function (n, r, i,jsIdRuta) {
		var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
		myMask.show();
		Ext.Ajax.request({
			url: "../servicios/blpParadasDeLaRutaAjax.php",//dav core x01
			method: "POST",
			params: {"option": "LST", "pageSize": n, "limit": r, "start": i,idRuta:jsIdRuta},
			success:function (result, request) {
				    storeParada.loadData(Ext.util.JSON.decode(result.responseText));
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
    var pageSizeParada = parseInt(20/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;

    //store Categories
    var storeParada = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpParadasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "PARADA_ID", allowBlank: false},
                     {name: "PARADA_DESCRIPCION", allowBlank: false},
					 {name: "PARADA_DETALLE", allowBlank: false},
					 
					 {name: "PARADA_LONGITUD", allowBlank: false},
					 {name: "PARADA_LATITUD", allowBlank: false},
					 {name: "PARADA_ORDEN", allowBlank: false},
					 
                     {name: "PARADA_REGISTRO", allowBlank: false},
                     {name: "PARADA_MODIFICACION", allowBlank: false},
                     {name: "PARADA_USUARIO", allowBlank: false},
                     {name: "PARADA_ESTADO", allowBlank: false}
                    ]
        }),

        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSizeParada};
            }
        }
    });
	var storePageSizeParada = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });
	 // panel



	newFormUpdParada = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                autoHeight: true,
                height: 200,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 120,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [{
                        fieldLabel: 'Parada Descripcion',
                        id: 'UPDPARADADESCRIPCION',
                        name: 'UPDPARADADESCRIPCION',
                        allowBlank:false
                    },{
                        fieldLabel: 'Parada Detalle',
                        id: 'UPDPARADADETALLE',
                        name: 'UPDPARADADETALLE',
                        allowBlank:false
                    },{
                        fieldLabel: 'Parada Estado',
                        id: 'UPDPARADAESTADO',
                        name: 'UPDPARADAESTADO',
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
                    text: 'Modificar',
					iconCls: 'icon-save',	
                    handler: function() {
					    var rec = grdpnlParada.getSelectionModel().getSelected();
						if (!rec) {
							return false;
						}
						var value = rec.get('PARADA_ID');
                        if(newFormUpdParada.getForm().isValid()){
                            form_action = 1;
                            newFormUpdParada.getForm().submit({
                                url: '../servicios/blpParadasAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storeParada.reload();
                                    alert('Successfully');
                                },
                                failure: function(form, action){
                                    alert('Registro no modificado');
                                }
                            });
                            winFormUpdParada.hide();
                        }
                    }
                    }, {
                        text: 'Cancelar',
						iconCls: 'icon-cancel',
                        handler: function(){
                        winFormUpdParada.hide();
                    }
                }]
    })

    winFormUpdParada = new Ext.Window({
		layout: 'fit',
		width: 500,
		height: 170,
		closeAction: 'hide',
		plain: true,
		title: 'Adicionar Nueva Parada',
		items: newFormUpdParada
    });

	var cboPageSizeParada = new Ext.form.ComboBox({
		id: "cboPageSizeParada",
		mode: "local",
		triggerAction: "all",
		store: storePageSizeParada,
		valueField: "size",
		displayField: "size",
		width: 50,
		editable: false,
		listeners:{
		select: function (combo, record, index) {
				pageSizeParada = parseInt(record.data["size"]);
				pagingParada.pageSizeParada = pageSizeParada;
				pagingParada.moveFirst();
			}
		}
    });
	var pagingParada = new Ext.PagingToolbar({
		id: "pagingParada",
		pageSize: pageSizeParada,
		store: storeParada,
		displayInfo: true,
		displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
		emptyMsg: "No roles to display",
		items: ["-", "Page size:", cboPageSizeParada]
    });
	var cmodelParada = new Ext.grid.ColumnModel({
		defaults: {
        sortable:true
    },
	columns:[
	//{id: "ID", header: "ID", dataIndex: "PARADA_ID", hidden: false, hideable: true, width: 50},
		//{header: "DESCRIPCION", dataIndex: "PARADA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "DETALLE", dataIndex: "PARADA_DETALLE", align: "left", hidden: false, hideable: false},
		{header: "LONGITUD", dataIndex: "PARADA_LONGITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "LATITUD", dataIndex: "PARADA_LATITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "ORDEN", dataIndex: "PARADA_ORDEN", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "ESTADO", dataIndex: "PARADA_ESTADO", align: "left", hidden:true, hideable: false, editor: new Ext.form.TextField({}),
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
        },
			rowdeselect: function (sm) {
        }
      }
    });
	var grdpnlParada = new Ext.grid.GridPanel({
		id: "grdpnlParada",
		store: storeParada,
		colModel: cmodelParada,
		selModel: smodel,
		//height:100,
		columnLines: true,
		viewConfig: {forceFit: true},
		enableColumnResize: true,
		//enableHdMenu: true, //Menu of the column
		//tbar: [btnNewParada, btnUpdParada, btnDelParada//, "->", txtSearch, btnTextClear, btnSearch
		//],
			bbar: pagingParada,
			style: "margin: 0 auto 0 auto;",
			width: '100%',
			height: '450',
			title: 'PARADAS',
			renderTo: "divMain",
			listeners:{
		}
	});


	//fin hijo paradas****************************************************************************************storeParada
    
    //Initialize events  grdpnlUser
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
	
	storeUserProcessParada(pageSizeParada, pageSizeParada, 0,0);//dav core x01
	cboPageSizeParada.setValue(pageSizeParada);
	
	//inicio 01 x01
	var panelGrillas = new Ext.Panel({
            title: 'Navigation',
            region: 'east',
            split: true,
            width: 400,
            collapsible: true,
            margins:'3 0 3 3',
            cmargins:'3 3 3 3',
			items:[grdpnlUser,grdpnlParada]
        });
	
	var panelIframe = new Ext.Panel( {
               // title: 'Center',
                region: 'center',
                xtype: 'tabpanel',
                split: true,
                collapsible: true,
                collapsed: false,
                activeTab: 0,
                items: [{
                    //html: 'Asignaciones',
                    title: 'GEOREFERENCIACION',
                    width: '99%',
                    frame: true,
                    html: '<iframe id="iframe025" src="../aplicaciones/blpParadasGeoreferenciacion.php "  scrolling="no" frameborder="0" width=100% height=100% name="iframe025"></iframe>'
                }]

            });
	
	//fin 01

    var viewport = new Ext.Viewport({
		layout : 'border',
		items : 
		[panelGrillas,panelIframe]
    });

	
  }
  
}

Ext.onReady(acl.application.init, acl.application);
