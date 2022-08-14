Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = "RUTAS";

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

    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);

    cboPageSize.setValue(pageSize);

    var viewport = new Ext.Viewport({
		layout : 'fit',
		items : [ grdpnlUser]
    });


  }
}

Ext.onReady(acl.application.init, acl.application);
