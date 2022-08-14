Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "PERSONA";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";

var sw=0;

var jsNombreBoton="Nuevo";

acl.application = {
  init:function(){
    storeProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
	  //AJAX USUARIOS
      Ext.Ajax.request({
        url: "../servicios/blpPersonasAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storePersonas.loadData(Ext.util.JSON.decode(result.responseText));
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
	
    //store TiposFuncionario
    var storePersonas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpPersonasAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "PERSONA_ID", allowBlank: false},
                     {name: "PERSONA_ESTADO_CIVIL_ID", allowBlank: false},
					 {name: "ESTADO_CIVIL_DESCRIPCION", allowBlank: false},
					 {name: "PERSONA_CI", allowBlank: false},
					 {name: "PERSONA_NOMBRES", allowBlank: false},
					 {name: "PERSONA_PATERNO", allowBlank: false},
					 {name: "PERSONA_MATERNO", allowBlank: false},
					 {name: "PERSONA_DIRECCION", allowBlank: false},
					 {name: "PERSONA_TELEFONO", allowBlank: false},
					 {name: "PERSONA_CELULAR", allowBlank: false},
					 {name: "PERSONA_CORREO", allowBlank: false},
					 {name: "PERSONA_SEXO", allowBlank: false},
					 {name: "PERSONA_FEC_NACIMIENTO", allowBlank: false},
					 {name: "PERSONA_FEC_INGRESO", allowBlank: false},
                     {name: "PERSONA_REGISTRADO", allowBlank: false},
					 {name: "PERSONA_MODIFICADO", allowBlank: false},
                     {name: "PERSONA_USUARIO", allowBlank: false},                     
					 {name: "PERSONA_ESTADO", allowBlank: false},
                     {name: "PERSONA_EXPEDIDO_ID", allowBlank: false},
					 {name: "EXPEDIDO_CODIGO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	
	//expedido
	var storeExpedidos = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpExpedidosAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "EXPEDIDO_ID", allowBlank: false},
                     {name: "EXPEDIDO_CODIGO", allowBlank: false},
                     {name: "EXPEDIDO_DESCRIPCION", allowBlank: false},
					 {name: "EXPEDIDO_REGISTRADO", allowBlank: false},
                     {name: "EXPEDIDO_MODIFICADO", allowBlank: false},                     
					 {name: "EXPEDIDO_USUARIO", allowBlank: false},
                     {name: "EXPEDIDO_ESTADO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	
	storeExpedidos.load();
	//estado civil
	var storeEstadosCiviles = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpEstadosCivilesAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "ESTADO_CIVIL_ID", allowBlank: false},
                     {name: "ESTADO_CIVIL_DESCRIPCION", allowBlank: false},
                     {name: "ESTADO_CIVIL_REGISTRADO", allowBlank: false},
                     {name: "ESTADO_CIVIL_MODIFICADO", allowBlank: false},                     
					 {name: "ESTADO_CIVIL_USUARIO", allowBlank: false},
                     {name: "ESTADO_CIVIL_ESTADO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	
	storeEstadosCiviles.load();
	
	

    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });


    // panel
    newForm = new Ext.FormPanel({
                //fileUpload: true,
				autoscroll:true,
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
                        fieldLabel: 'ESTADO CIVIL',
                        id: 'ESTADO_CIVIL_ID',
                        name: 'ESTADO_CIVIL_ID',
                        allowBlank: true,
            						xtype:          'combo',
            						triggerAction:  'all',
            						forceSelection: true,
            						editable:       false,
            						emptyText: 'Seleccione ...',
            						typeAhead: true,
            						hiddenName:     'H_ESTADO_CIVIL_ID',
            						displayField:   'ESTADO_CIVIL_DESCRIPCION',
            						valueField:     'ESTADO_CIVIL_ID',
            						store: storeEstadosCiviles
                    },
					{
                        fieldLabel: 'CI',
                        id: 'PERSONA_CI_LABEL',
                        name: 'PERSONA_CI_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'NOMBRES',
                        id: 'PERSONA_NOMBRES_LABEL',
                        name: 'PERSONA_NOMBRES_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'AP. PATERNO',
                        id: 'PERSONA_PATERNO_LABEL',
                        name: 'PERSONA_PATERNO_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'AP. MATERNO',
                        id: 'PERSONA_MATERNO_LABEL',
                        name: 'PERSONA_MATERNO_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'DIRECCION',
                        id: 'PERSONA_DIRECCION_LABEL',
                        name: 'PERSONA_DIRECCION_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'TELEFONO',
                        id: 'PERSONA_TELEFONO_LABEL',
                        name: 'PERSONA_TELEFONO_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'CELULAR',
                        id: 'PERSONA_CELULAR_LABEL',
                        name: 'PERSONA_CELULAR_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'CORREO',
                        id: 'PERSONA_CORREO_LABEL',
                        name: 'PERSONA_CORREO_LABEL',
                        allowBlank:false
                    },					
					{
                        fieldLabel: 'SEXO',
                        id: 'PERSONA_SEXO_LABEL',
                        name: 'PERSONA_SEXO_LABEL',
                        allowBlank: false,
						xtype:          'combo',
						mode:           'local',
						value:          'ACTIVO',
						triggerAction:  'all',
						forceSelection: true,
						editable:       false,
						emptyText: 'Seleccione sexo ...',
						typeAhead: true,
						//hiddenName:     'H_PERSONA_CIVIL_PERSONA_COMBO',
						displayField:   'name',
						valueField:     'value',
						store:          new Ext.data.JsonStore({
							fields : ['name', 'value'],
							data   : [
								{name : 'HOMBRE',   value: 'M'},
								{name : 'MUJER', value: 'F'}
							]
						})
                    },
					{
                        fieldLabel: 'FEC. NACIMIENTO',
						xtype:'datefield',
                        id: 'PERSONA_FEC_NACIMIENTO_LABEL',
                        name: 'PERSONA_FEC_NACIMIENTO_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'FEC. INGRESO',
						xtype:'datefield',
                        id: 'PERSONA_FEC_INGRESO_LABEL',
                        name: 'PERSONA_FEC_INGRESO_LABEL',
                        allowBlank:false
                    },{
                        fieldLabel: 'EXPEDIDO',
                        id: 'EXPEDIDO_ID',
                        name: 'EXPEDIDO_ID',
                        allowBlank: true,
            						xtype:          'combo',
            						triggerAction:  'all',
            						forceSelection: true,
            						editable:       false,
            						emptyText: 'Seleccione...',
            						typeAhead: true,
            						hiddenName:     'H_EXPEDIDO_ID',
            						displayField:   'EXPEDIDO_DESCRIPCION',
            						valueField:     'EXPEDIDO_ID',
            						store: storeExpedidos
                    },					
					{
                        fieldLabel: 'ESTADO',
                        id: 'PERSONA_ESTADO_COMBO',
                        name: 'PERSONA_ESTADO_COMBO',
                        allowBlank: false,
						xtype:          'combo',
						mode:           'local',
						value:          'ACTIVO',
						triggerAction:  'all',
						forceSelection: true,
						editable:       false,
						emptyText: 'Seleccione estado ...',
						typeAhead: true,
						//hiddenName:     'H_PERSONA_CIVIL_PERSONA_COMBO',
						displayField:   'name',
						valueField:     'value',
						store:          new Ext.data.JsonStore({
							fields : ['name', 'value'],
							data   : [
								{name : 'ACTIVO',   value: 'A'},
								{name : 'INACTIVO', value: 'I'}
							]
						})
                    }
					
					//-------
                ],
                buttons: [{
				    text: jsNombreBoton,
					id: 'Guardar',
                    name: 'Guardar',                    
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
							//--------------ADICIONAR-----------------------
							if(sw =="0")
							{
								newForm.getForm().submit({
								
                                url: '../servicios/blpPersonasAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function(form, action){
                                    storePersonas.reload();									
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
								var value = rec.get('PERSONA_ID');
								//-------------------------------
								newForm.getForm().submit({
                                url: '../servicios/blpPersonasAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storePersonas.reload();									
                                    alert('Se modifico con exito');
                                },
                                failure: function(form, action){
                                    alert('Registro no modificado');
                                }
                            });
							
							}
							 winForm.hide();
                      }
                    }
					}
					,
					{
				
				 text: 'Cancelar',
                        handler: function(){
                            winForm.hide();
                    }
				}
				]
    });

    winForm = new Ext.Window({
	            id: 'FormAdiModi',
                name: 'FormAdiModi',
                layout: 'fit',                
                closeAction: 'hide',
                plain: true,
                title: 'NUEVA PERSONA',
                items: newForm
    });

    var btnNew = new Ext.Action({
      id: "btnNew",
      text: "Nuevo",
	  iconCls: 'icon-add',
      handler: function() {
        Ext.getCmp('ESTADO_CIVIL_ID').reset();   
		Ext.getCmp('PERSONA_CI_LABEL').reset();
		Ext.getCmp('PERSONA_NOMBRES_LABEL').reset();
		Ext.getCmp('PERSONA_PATERNO_LABEL').reset();
		Ext.getCmp('PERSONA_MATERNO_LABEL').reset();
		Ext.getCmp('PERSONA_DIRECCION_LABEL').reset();
		Ext.getCmp('PERSONA_TELEFONO_LABEL').reset();
		Ext.getCmp('PERSONA_CELULAR_LABEL').reset();
		Ext.getCmp('PERSONA_CORREO_LABEL').reset();
		Ext.getCmp('PERSONA_SEXO_LABEL').reset();
		Ext.getCmp('PERSONA_FEC_NACIMIENTO_LABEL').reset();
		Ext.getCmp('PERSONA_FEC_INGRESO_LABEL').reset();
		Ext.getCmp('PERSONA_ESTADO_COMBO').reset();
		Ext.getCmp('EXPEDIDO_ID').reset();
		sw=0;		
		Ext.getCmp('Guardar').setText('GUARDAR');		
		Ext.getCmp('FormAdiModi').setTitle('Adicion');
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
		Ext.getCmp('ESTADO_CIVIL_ID').setValue(rec.get('PERSONA_ESTADO_CIVIL_ID'));  
		Ext.getCmp('PERSONA_CI_LABEL').setValue(rec.get('PERSONA_CI'));
		Ext.getCmp('PERSONA_NOMBRES_LABEL').setValue(rec.get('PERSONA_NOMBRES'));
		Ext.getCmp('PERSONA_PATERNO_LABEL').setValue(rec.get('PERSONA_PATERNO'));
		Ext.getCmp('PERSONA_MATERNO_LABEL').setValue(rec.get('PERSONA_MATERNO'));
		Ext.getCmp('PERSONA_DIRECCION_LABEL').setValue(rec.get('PERSONA_DIRECCION'));
		Ext.getCmp('PERSONA_TELEFONO_LABEL').setValue(rec.get('PERSONA_TELEFONO'));
		Ext.getCmp('PERSONA_CELULAR_LABEL').setValue(rec.get('PERSONA_CELULAR'));
		Ext.getCmp('PERSONA_CORREO_LABEL').setValue(rec.get('PERSONA_CORREO'));
		Ext.getCmp('PERSONA_SEXO_LABEL').setValue(rec.get('PERSONA_SEXO'));
		Ext.getCmp('PERSONA_FEC_NACIMIENTO_LABEL').setValue(rec.get('PERSONA_FEC_NACIMIENTO'));
		Ext.getCmp('PERSONA_FEC_INGRESO_LABEL').setValue(rec.get('PERSONA_FEC_INGRESO'));
		Ext.getCmp('PERSONA_ESTADO_COMBO').setValue(rec.get('PERSONA_ESTADO'));
		Ext.getCmp('EXPEDIDO_ID').setValue(rec.get('PERSONA_EXPEDIDO_ID'));
		var value = rec.get('PERSONA_ID');
		winForm.show(this);
		Ext.getCmp('Guardar').setText('MODIFICAR');
		Ext.getCmp('FormAdiModi').setTitle('Modifcacion ');
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
        var value = rec.get('PERSONA_ID');
        Ext.Ajax.request({
            url: "../servicios/blpPersonasAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Succesfully");
                  storePersonas.reload();
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
      store: storePersonas,
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

      columns:[
			   {id:"ID",header: "ID", dataIndex: "PERSONA_ID",hidden: false, hideable: true, width: 50},
               {header: "ID CIVIL",dataIndex: "PERSONA_ESTADO_CIVIL_ID", align: "left", hidden: true, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "EST.CIVIL",dataIndex: "ESTADO_CIVIL_DESCRIPCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "CI", dataIndex: "PERSONA_CI", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "NOMBRES", dataIndex: "PERSONA_NOMBRES", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "AP. PATERNO", dataIndex: "PERSONA_PATERNO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "AP. MATERNO", dataIndex: "PERSONA_MATERNO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "DIRECCION", dataIndex: "PERSONA_DIRECCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "TELEFONO", dataIndex: "PERSONA_TELEFONO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "CELULAR", dataIndex: "PERSONA_CELULAR", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "CORREO", dataIndex: "PERSONA_CORREO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "SEXO", dataIndex: "PERSONA_SEXO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({}),},
			   {header: "FEC. NACIMIENTO", dataIndex: "PERSONA_FEC_NACIMIENTO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "FEC. INGRESO", dataIndex: "PERSONA_FEC_INGRESO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "REGISTRADO", dataIndex: "PERSONA_REGISTRADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "MODIFICADO", dataIndex: "PERSONA_MODIFICADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "USUARIO", dataIndex: "PERSONA_USUARIO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "ID EXPEDIDO",dataIndex: "PERSONA_EXPEDIDO_ID", align: "left", hidden: true, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "EXPEDIDO",dataIndex: "EXPEDIDO_CODIGO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},			   
			   {header: "ESTADO",dataIndex: "PERSONA_ESTADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({}),			   
                 renderer: function(v, params, data){
                    return ((v === 'A') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
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
      store: storePersonas,
      colModel: cmodel,
      selModel: smodel,

      columnLines: true,
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column

      tbar: [btnNew,btnDel,btnUpd, "->", txtSearch, btnTextClear, btnSearch],
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
    storeProcess(pageSize, pageSize, 0);

    cboPageSize.setValue(pageSize);

    var viewport = new Ext.Viewport({
          layout : 'fit',
          items : [ grdpnlUser ]
    });


  }
}

Ext.onReady(acl.application.init, acl.application);
