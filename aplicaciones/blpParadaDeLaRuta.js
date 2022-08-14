Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = "RUTAS";
var k="0";

acl.application = {
	init:function(){
    storeUserProcess = function (n, r, i) {
		var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
		myMask.show();
		Ext.Ajax.request({
			url: "../servicios/blpRutaAlternaAjax.php",
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

    var pageSize = parseInt(20);
    var message = "por implementar ...";

    var storeUser = new Ext.data.GroupingStore({
		proxy:new Ext.data.HttpProxy({
			url:    "../servicios/blpRutaAlternaAjax.php",
			method: "POST"
		}),
		reader:new Ext.data.JsonReader({
			root: "resultRoot",
			totalProperty: "resultTotal",
			fields: [
				{name: "RUTA_ID", allowBlank: false},
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

    newForm = new Ext.FormPanel({
		width: 500,
		autoHeight: false,
		height: 300,
		bodyStyle: 'padding: 10px 10px 10px 10px;',
		labelWidth: 100,
		defaults: {
			anchor: '95%',
			allowBlank: false,
			msgTarget: 'side'
        },
		defaultType: 'textfield',
		items: [{
				fieldLabel: 'DESCRIPCION',
				id: 'RUTA_DESCRIPCION',
				name: 'RUTA_DESCRIPCION',
				allowBlank:false
			},{
				xtype:'textarea',
				fieldLabel: 'DETALLE',
				id: 'RUTA_DETALLE',
				name: 'RUTA_DETALLE',
				allowBlank:false
			},{
				fieldLabel: 'ESTADO',
				id: 'RUTA_ESTADO',
				name: 'RUTA_ESTADO',
				allowBlank: false,
				xtype:          'combo',
				mode:           'local',
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText: 'Seleccione Estado...',
				typeAhead: true,
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
						url: '../servicios/blpRutaAlternaAjax.php?option=NEW',
						waitMsg: 'Guardando...',
						success: function(form, action){
							storeUser.reload();
							alert('Se registro con exito');
						},
						failure: function(form, action){
							alert('Registro no guardado');
						}
					});
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
		width: 500,
		height: 230,
		closeAction: 'hide',
		plain: true,
		title: 'RUTA',
		items: newForm
    });

    var btnNew = new Ext.Action({
		id: "btnNew",
		text: "ADICIONAR",
		iconCls: 'icon-add',
		handler: function() {
			Ext.getCmp('RUTA_DESCRIPCION').reset();	
			Ext.getCmp('RUTA_DETALLE').reset();	
			Ext.getCmp('RUTA_ESTADO').reset();	
			winForm.show(this);
		}
    });
	
	var btnUpd = new Ext.Action({
		id: "btnUpd",
		text: "MODIFICAR",
		iconCls: 'icon-edit',
		handler: function onUpdate() {	
		var rec = grdpnlUser.getSelectionModel().getSelected();
		if (!rec) {
			alert('Selecione Registro');
			return false;
		}
			var valueId = rec.get('RUTA_ID');
			var valueDes = rec.get('RUTA_DESCRIPCION');
			var valueDet = rec.get('RUTA_DETALLE');
			var valueEst = rec.get('RUTA_ESTADO');
			Ext.getCmp('UPD_RUTA_ID').setValue(valueId);
			Ext.getCmp('UPD_RUTA_DESCRIPCION').setValue(valueDes);	
			Ext.getCmp('UPD_RUTA_DETALLE').setValue(valueDet);
			Ext.getCmp('UPD_RUTA_ESTADO').setValue(valueEst);				
			winFormUpd.show(this);
		}
    });
	
	newFormUpd = new Ext.FormPanel({
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
				fieldLabel: 'Id RUTA',
				id: 'UPD_RUTA_ID',
				name: 'UPD_RUTA_ID',
				hidden: true
			},{
				xtype:'textarea',
				fieldLabel: 'DESCRIPCION',
				id: 'UPD_RUTA_DESCRIPCION',
				name: 'UPD_RUTA_DESCRIPCION',
				allowBlank:false
			},{
				fieldLabel: 'DETALLE',
				id: 'UPD_RUTA_DETALLE',
				name: 'UPD_RUTA_DETALLE',
				allowBlank:false
			},{
				fieldLabel: 'ESTADO',
				id: 'UPD_RUTA_ESTADO',
				name: 'UPD_RUTA_ESTADO',
				allowBlank: true,
				xtype:          'combo',
				mode:           'local',
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText: 'Seleccione Estado...',
				typeAhead: true,
				displayField:   'nombre',
				valueField:     'valor',
				store: new Ext.data.JsonStore({
					fields : ['nombre', 'valor'],
					data   : [
						{nombre : 'ACTIVO',   valor: 'ACTIVO'},
						{nombre : 'INACTIVO', valor: 'INACTIVO'}
					]
				})
			}
		],
		buttons: [{
			text: 'MODIFICAR',
			iconCls: 'icon-save',
			handler: function() {
				if(newFormUpd.getForm().isValid()){
					form_action = 1;
					newFormUpd.getForm().submit({
						url: '../servicios/blpRutaAlternaAjax.php?option=UPD',
						waitMsg: 'Guardando ...',
						success: function(form, action){
							storeUser.reload();
							alert('Se registro con exito');
						},
						failure: function(form, action){
							alert('Registro no modificado');
						}
					});
					winFormUpd.hide();
				}
			}
		},{
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
		height: 230,
		closeAction: 'hide',
		plain: true,
		title: 'MODIFICAR TIPO DE HERRAMIENTA',
		items: newFormUpd
    });

    var btnDel = new Ext.Action({
		id: "btnDel",
		text: "DAR BAJA",
		iconCls: 'icon-del',
		handler: function onDelete() {
			var rec = grdpnlUser.getSelectionModel().getSelected();
			if (!rec) {
				alert('Selecione Registro');
				return false;
			}
			var value = rec.get('RUTA_ID');
			Ext.Ajax.request({
				url: "../servicios/blpRutaAlternaAjax.php",
				method: "POST",
				params: {"option": "DEL", "i": value},
				success:function (result, request) {
					  Ext.MessageBox.alert("Alert", "Dato Eliminado");
					  storeUser.reload();
				},
				failure:function (result, request) {
					  Ext.MessageBox.alert("Alert", "Fallo");
				}
			});
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
			sortable:true
    },

	columns:[
		{id: "ID", header: "ID", dataIndex: "RUTA_ID", hidden: false, hideable: true, width: 50},
		{header: "DESCRIPCION", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "DETALLE", dataIndex: "RUTA_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "REGISTRO", dataIndex: "RUTA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "MODIFICACION", dataIndex: "RUTA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "USUARIO", dataIndex: "RUTA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
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
				storeUserProcessParada(pageSizeParada, pageSizeParada, 0,value);
        },
        rowdeselect: function (sm) {
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
		enableHdMenu: true, 
		tbar: [btnNew, btnUpd, btnDel],
		bbar: pagingUser,
		style: "margin: 0 auto 0 auto;",
		width: '100%',
		height: '450',
		title: LABEL_TITLE_PANEL_1,
		renderTo: "divMain",
		listeners:{
		}
    });
	
	//*********************************************hijo*****************************************************************
	storeUserProcessParada = function (n, r, i,hijoIdRuta) {
		var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
		myMask.show();
		Ext.Ajax.request({
			url: "../servicios/blpParadasDeLaRutaAjax.php",
			method: "POST",
			params: {"option": "LST", "pageSize": n, "limit": r, "start": i, "idRuta":hijoIdRuta},
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
    var pageSizeParada = parseInt(20);
    var message = "por implementar ...";
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
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });

    var storePageSizeParada = new Ext.data.SimpleStore({
		fields: ["size"],
		data: [["15"], ["25"], ["35"], ["50"], ["100"]],
		autoLoad: true
    });
	// panel
    newFormParada = new Ext.FormPanel({
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
				fieldLabel: 'DESCRIPCION',
				id: 'PARADA_DESCRIPCION',
				name: 'PARADA_DESCRIPCION',
				allowBlank:false
			},{
				fieldLabel: 'DETALLE',
				id: 'PARADA_DETALLE',
				name: 'PARADA_DETALLE',
				allowBlank:false
			},{
				fieldLabel: 'LONGUITUD',
				id: 'PARADA_LONGITUD',
				name: 'PARADA_LONGITUD',
				allowBlank:false
			},{
				fieldLabel: 'LATITUD',
				id: 'PARADA_LATITUD',
				name: 'PARADA_LATITUD',
				allowBlank:false
			},{
				fieldLabel: 'ORDEN',
				id: 'PARADA_ORDEN',
				name: 'PARADA_ORDEN',
				allowBlank:false
			},{
				fieldLabel: 'ESTADO',
				id: 'PARADA_ESTADO',
				name: 'PARADA_ESTADO',
				allowBlank: false,
				xtype:          'combo',
				mode:           'local',
				value:          'ACTIVO',
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText: 'Select a status ...',
				typeAhead: true,
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
			text: 'GUARDAR',
			iconCls: 'icon-save',	
			handler: function() {
				if(newFormParada.getForm().isValid()){
					form_action = 1;
					newFormParada.getForm().submit({
						url: '../servicios/blpParadasAjax.php?option=NEW',
						waitMsg: 'REGISTRO GUARDADO ...',
						success: function(form, action){
							storeParada.reload();
							alert('REGISTRO GUARDADO');
						},
						failure: function(form, action){
							alert('REGISTRO NO GUARDADO');
						}
					});
					winFormParada.hide();
				}
			}
		},{
			text: 'CANCELAR',
			iconCls: 'icon-cancel',
			handler: function(){
			winFormParada.hide();
		}
}]
})

    winFormParada = new Ext.Window({
		layout: 'fit',
		width: 550,
		height: 250,
		closeAction: 'hide',
		plain: true,
		title: 'ADICIONAR NUEVA PARADA',
		items: newFormParada
    });
	
	var btnNewParada = new Ext.Action({
		id: "btnNewParada",
		text: "ADICIONAR",
		iconCls: 'icon-add',
		handler: function() {
			Ext.getCmp('PARADA_DESCRIPCION').reset();
			Ext.getCmp('PARADA_DETALLE').reset();
			Ext.getCmp('PARADA_LONGITUD').reset();
			Ext.getCmp('PARADA_LATITUD').reset();
			Ext.getCmp('PARADA_ORDEN').reset();
			winFormParada.show(this);
		}
    });
	var btnUpdParada = new Ext.Action({
		id: "btnUpdParada",
		text: "MODIFICAR",
		iconCls: 'icon-edit',
		handler: function onUpdate() {
	   
        var rec = grdpnlParada.getSelectionModel().getSelected();
        if (!rec) {
			alert("Seleccione Registro");
            return false;
        }
		Ext.getCmp('UPDPARADADESCRIPCION').setValue(rec.get('PARADA_DESCRIPCION'));
		Ext.getCmp('UPDPARADADETALLE').setValue(rec.get('PARADA_DETALLE'));
		Ext.getCmp('UPDPARADALONGITUD').setValue(rec.get('PARADA_LONGITUD'));
		Ext.getCmp('UPDPARADALATITUD').setValue(rec.get('PARADA_LATITUD'));
		Ext.getCmp('UPDPARADAORDEN').setValue(rec.get('PARADA_ORDEN'));
		Ext.getCmp('UPDPARADAESTADO').setValue(rec.get('PARADA_ESTADO'));
        var value = rec.get('PARADA_ID');	
		winFormUpdParada.show(this);		
      }
    });
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
				fieldLabel: 'DESCRIPCION',
				id: 'UPDPARADADESCRIPCION',
				name: 'UPDPARADADESCRIPCION',
				allowBlank:false
			},{
				fieldLabel: 'DETALLE',
				id: 'UPDPARADADETALLE',
				name: 'UPDPARADADETALLE',
				allowBlank:false
			},{
				fieldLabel: 'LONGUITUD',
				id: 'UPDPARADALONGITUD',
				name: 'UPDPARADALONGITUD',
				allowBlank:false
			},{
				fieldLabel: 'LATITUD',
				id: 'UPDPARADALATITUD',
				name: 'UPDPARADALATITUD',
				allowBlank:false
			},{
				fieldLabel: 'ORDEN',
				id: 'UPDPARADAORDEN',
				name: 'UPDPARADAORDEN',
				allowBlank:false
			},{
				fieldLabel: 'ESTADO',
				id: 'UPDPARADAESTADO',
				name: 'UPDPARADAESTADO',
				allowBlank: false,
				xtype:          'combo',
				mode:           'local',
				value:          'ACTIVO',
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText: 'Seleccione Estado ...',
				typeAhead: true,
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
			text: 'MODIFICAR',
			iconCls: 'icon-save',	
			handler: function() {
				var rec = grdpnlParada.getSelectionModel().getSelected();
				if (!rec) {
					return false;
				}
				var value = rec.get('PARADA_ID');
				var value2 = rec.get('RUTA_ID');
				if(newFormUpdParada.getForm().isValid()){
					form_action = 1;
					newFormUpdParada.getForm().submit({
						url: '../servicios/blpParadasAjax.php',																
						method: "POST",
						params: {"option": "UPD", "i": value},
						waitMsg: 'REGISTRO MODIFICANDO ...',
						success: function(form, action){
							//storeParada.reload();
							alert(value2);
							storeUserProcessParada(pageSizeParada, pageSizeParada, 0,value2);
							alert('REGISTRO MODIFICADO');
						},
						failure: function(form, action){
							alert('REGISTRO NO MODIFICADO');
						}
					});
					winFormUpdParada.hide();
				}
			}
			}, {
				text: 'CANCELAR',
				iconCls: 'icon-cancel',
				handler: function(){
				winFormUpdParada.hide();
			}
		}]
    })
	winFormUpdParada = new Ext.Window({
		layout: 'fit',
		width: 550,
		height: 250,
		closeAction: 'hide',
		plain: true,
		title: 'MODIFICAR PARADA',
		items: newFormUpdParada
    });

    var btnDelParada = new Ext.Action({
		id: "btnDelParada",
		text: "DAR BAJA",
		iconCls: 'icon-del',
		handler:     function onDelete() {
        var rec = grdpnlParada.getSelectionModel().getSelected();
        if (!rec) {
			alert("Seleccione Registro");
            return false;
        }
        var value = rec.get('PARADA_ID');
        Ext.Ajax.request({
            url: "../servicios/blpParadasAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("", "REGISTRO ELIMINADO");
                  storeParada.reload();
                },
            failure:function (result, request) {
                  Ext.MessageBox.alert("", "REGISTRO NO ELIMINADO");
                }
        });
      }
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
		{id: "ID", header: "ID", dataIndex: "PARADA_ID", hidden: false, hideable: true, width: 50},
		{header: "DETALLE", dataIndex: "PARADA_DETALLE", align: "left", hidden: false, hideable: false},
		{header: "LONGITUD", dataIndex: "PARADA_LONGITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "LATITUD", dataIndex: "PARADA_LATITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "ORDEN", dataIndex: "PARADA_ORDEN", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
		{header: "ESTADO", dataIndex: "PARADA_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
		renderer: function(v, params, data){
			return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
			}
		}
	]
    });
	 var smodelParada = new Ext.grid.RowSelectionModel({
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
		selModel: smodelParada,
		height:100,
		columnLines: true,
		viewConfig: {forceFit: true},
		enableColumnResize: true,
		enableHdMenu: true,
		tbar: [btnNewParada, btnUpdParada, btnDelParada],
			bbar: pagingParada,
			style: "margin: 0 auto 0 auto;",
			width: '100%',
			height: '450',
			title: 'PARADAS',
			renderTo: "divMain",
			listeners:{
		}
	});
	//fin hijo paradas****************************************************************************************
    
    //Initialize events  grdpnlUser
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
	
	storeUserProcessParada(pageSizeParada, pageSizeParada, 0);
	cboPageSizeParada.setValue(pageSizeParada);

    var viewport = new Ext.Viewport({
		layout : 'border',
		items : 
		[{
			title:'RUTAS',
			items:[grdpnlUser,grdpnlParada]
		}]
    });

	
  }
  
}

Ext.onReady(acl.application.init, acl.application);
