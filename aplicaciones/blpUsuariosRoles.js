Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "USUARIO ROLES";
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
        url: "../servicios/blpUsuariosRolesAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUsuariosRoles.loadData(Ext.util.JSON.decode(result.responseText));
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
    var storeUsuariosRoles = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpUsuariosRolesAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
			  
            totalProperty: "resultTotal",
            fields: [{name: "UTF_ID", allowBlank: false},
                     {name: "UTF_USUARIO_ID", allowBlank: false},
					 {name: "USUARIO_CODIGO", allowBlank: false},
					 {name: "UTF_TIPO_FUNCIONARIO_ID", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_DESCRIPCION", allowBlank: false},					 
                     {name: "UTF_REGISTRADO", allowBlank: false},
					 {name: "UTF_MODIFICADO", allowBlank: false},
                     {name: "UTF_USUARIO", allowBlank: false},                     
					 {name: "UTF_ESTADO", allowBlank: false}                     
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	
	//ROLES
	var storeRoles = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpUsuariosRolesAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "TIPO_FUNCIONARIO_ID", allowBlank: false},
                     {name: "TIPO_FUNCIONARIO_DESCRIPCION", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_REGISTRO", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_MODIFICACION", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_USUARIO", allowBlank: false},
					 {name: "TIPO_FUNCIONARIO_ESTADO", allowBlank: false}                    
                    ]
        }),
		

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST_TIPOS_FUNCIONARIO", "pageSize": 100000};
            }
        }
    });	 	
	storeRoles.load();
	
	//usuario
	var storeUsuarios = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpUsuariosAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "USUARIO_ID", allowBlank: false},
                     {name: "USUARIO_PERSONA_ID", allowBlank: false},
					 {name: "USUARIO_CODIGO", allowBlank: false},
					 {name: "USUARIO_CLAVE", allowBlank: false},
					 {name: "USUARIO_CONTROLAR_IP", allowBlank: false},
					 {name: "USUARIO_REGISTRADO", allowBlank: false},
					 {name: "USUARIO_MODIFICADO", allowBlank: false},
                     {name: "USUARIO_USUARIO", allowBlank: false},
					 {name: "USUARIO_ESTADO", allowBlank: false},
                     {name: "USUARIO_CORREO", allowBlank: false},                     
					 {name: "USUARIO_TIPO_USUARIO", allowBlank: false},
                     {name: "USUARIO_DOMINIO", allowBlank: false},
					 {name: "PERSONA_NOMBRE_COMPLETO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": 100000};
            }
        }
    });		
	
	storeUsuarios.load();

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
                items: [{
                        xtype:'hidden',
                        id: 'oculto_id_usuario',
                        name: 'oculto_id_usuario',
						allowBlank: false                       
                    },{
                        xtype:'hidden',
                        id: 'oculto_usuario',
                        name: 'oculto_usuario',
						allowBlank: false                         
                    },{
                        fieldLabel: 'USUARIO',
                        id: 'USUARIO_ID',
                        name: 'USUARIO_ID',
                        allowBlank: true,
            						xtype:          'combo',
            						triggerAction:  'all',
            						forceSelection: true,
            						mode:'local',
            						emptyText: 'Seleccione ...',
            						typeAhead: true,
            						hiddenName:     'H_USUARIO_ID',
            						displayField:   'USUARIO_CODIGO',
            						valueField:     'USUARIO_ID',
            						store: storeUsuarios,
						listeners: {
							select: function (combo, record, index) {
								var a = record.data.USUARIO_ID;
								var b = record.data.USUARIO_CODIGO;
								Ext.getCmp('oculto_id_usuario').setValue(a);  
								Ext.getCmp('oculto_usuario').setValue(b); 
							}
						}	
                    },{
                        xtype:'hidden',
                        id: 'oculto_id_tipo_funcionario',
                        name: 'oculto_id_tipo_funcionario',
						allowBlank: false                       
                    },{
                        xtype:'hidden',
                        id: 'oculto_funcionario',
                        name: 'oculto_funcionario',
						allowBlank: false                         
                    },
					{
                        fieldLabel: 'TIPO FUNCIONARIO',
                        id: 'ROL_ID',
                        name: 'ROL_ID',
                        allowBlank: true,
            						xtype:          'combo',
            						triggerAction:  'all',
            						forceSelection: true,
            						mode:'local',
            						emptyText: 'Seleccione...',
            						typeAhead: true,
            						hiddenName:     'H_TIPO_FUNCIONARIO_ID',
            						displayField:   'TIPO_FUNCIONARIO_DESCRIPCION',
            						valueField:     'TIPO_FUNCIONARIO_ID',
            						store: storeRoles,
						listeners: {
							select: function (combo, record, index) {
								var a = record.data.TIPO_FUNCIONARIO_ID;
								var b = record.data.TIPO_FUNCIONARIO_DESCRIPCION;
								Ext.getCmp('oculto_id_tipo_funcionario').setValue(a);  
								Ext.getCmp('oculto_funcionario').setValue(b); 
							}
						}	
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
								
                                url: '../servicios/blpUsuariosRolesAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function(form, action){
                                    storeUsuariosRoles.reload();									
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
								var value = rec.get('UTF_ID');
								//-------------------------------
								newForm.getForm().submit({
                                url: '../servicios/blpUsuariosRolesAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storeUsuariosRoles.reload();									
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
        Ext.getCmp('USUARIO_ID').reset();   
		Ext.getCmp('ROL_ID').reset();
		
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
		Ext.getCmp('USUARIO_ID').setValue(rec.get('USUARIO_CODIGO'));  
		Ext.getCmp('ROL_ID').setValue(rec.get('TIPO_FUNCIONARIO_DESCRIPCION'));
		
		Ext.getCmp('oculto_id_usuario').setValue(rec.get('UTF_USUARIO_ID'));
		Ext.getCmp('oculto_usuario').setValue(rec.get('USUARIO_CODIGO'));
		Ext.getCmp('oculto_id_tipo_funcionario').setValue(rec.get('UTF_TIPO_FUNCIONARIO_ID'));
		Ext.getCmp('oculto_funcionario').setValue(rec.get('TIPO_FUNCIONARIO_DESCRIPCION'));

		
		
		var value = rec.get('UTF_ID');
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
        var value = rec.get('UTF_ID');
        Ext.Ajax.request({
            url: "../servicios/blpUsuariosRolesAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Succesfully");
                  storeUsuariosRoles.reload();
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
      store: storeUsuariosRoles,
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
			   {id:"ID",header: "ID", dataIndex: "UTF_ID",hidden: true, hideable: true, width: 50},
               {header: "USUARIO_ID",dataIndex: "UTF_USUARIO_ID", align: "left", hidden: true, hideable: true, editor: new Ext.form.TextField({})},
               {header: "USUARIO",dataIndex: "USUARIO_CODIGO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "ROLES_ID",dataIndex: "UTF_TIPO_FUNCIONARIO_ID", align: "left", hidden: true, hideable: true, editor: new Ext.form.TextField({})},			   
			   {header: "TIPO FUNCIONARIO",dataIndex: "TIPO_FUNCIONARIO_DESCRIPCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},			   
			   {header: "REGISTRADO", dataIndex: "UTF_REGISTRADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "MODIFICADO", dataIndex: "UTF_MODIFICADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "USUARIO", dataIndex: "UTF_USUARIO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},			   			     
			   {header: "ESTADO",dataIndex: "UTF_ESTADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({}),			   
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
      store: storeUsuariosRoles,
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
