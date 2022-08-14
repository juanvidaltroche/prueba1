Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "OPCIONES";

var LABEL_BTN_SEARCH = "Search", LABEL_MSG_SEARCH = "search ...";

var sw=0;

var jsNombreBoton="Nuevo";

acl.application = {
  init:function(){
    storeProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
	  //AJAX OPCIONES
      Ext.Ajax.request({
        url: "../servicios/blpOpcionesAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeOpciones.loadData(Ext.util.JSON.decode(result.responseText));
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
    var storeOpciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpOpcionesAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "OPCION_ID", allowBlank: false},
                     {name: "OPCION_GRUPO_ID", allowBlank: false},
					 {name: "GRUPO_DESCRIPCION", allowBlank: false},
					 {name: "OPCION_DESCRIPCION", allowBlank: false},
					 {name: "OPCION_CONTENIDO", allowBlank: false},
					 {name: "OPCION_ADICIONAL", allowBlank: false},
					 {name: "OPCION_ORDEN", allowBlank: false},
					 {name: "OPCION_IMAGEN", allowBlank: false},
					 {name: "OPCION_REGISTRADO", allowBlank: false},
					 {name: "OPCION_MODIFICADO", allowBlank: false},
					 {name: "OPCION_USUARIO", allowBlank: false},
					 {name: "OPCION_ESTADO", allowBlank: false}					 
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	
	//GRUPOS
	var storeGrupos = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpGruposAjax.php",
            method: "POST"
        }),
        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "GRUPO_ID", allowBlank: false},
                     {name: "GRUPO_DESCRIPCION", allowBlank: false},
					 {name: "GRUPO_IMAGEN", allowBlank: false},
					 {name: "GRUPO_REGISTRADO", allowBlank: false},
					 {name: "GRUPO_MODIFICADO", allowBlank: false},
					 {name: "GRUPO_USUARIO", allowBlank: false},
					 {name: "GRUPO_ESTADO", allowBlank: false}
                     
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
			
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });	  
	storeGrupos.load();
	
	

    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["150"], ["25"], ["35"], ["50"], ["100"]],
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
                        fieldLabel: 'GRUPO',
                        id: 'GRUPO_ID',
                        name: 'GRUPO_ID',
                        allowBlank: true,
            						xtype:          'combo',
            						triggerAction:  'all',
            						forceSelection: true,
            						editable:       false,
            						emptyText: 'Seleccione ...',
            						typeAhead: true,
            						hiddenName:     'H_GRUPO_ID',
            						displayField:   'GRUPO_DESCRIPCION',
            						valueField:     'GRUPO_ID',
            						store: storeGrupos
                    },
					{
                        fieldLabel: 'CONTENIDO',
                        id: 'OPCION_DESCRIPCION_LABEL',
                        name: 'OPCION_DESCRIPCION_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'DESCRIPCION',
                        id: 'OPCION_CONTENIDO_LABEL',
                        name: 'OPCION_CONTENIDO_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'ADICIONAL',
                        id: 'OPCION_ADICIONAL_LABEL',
                        name: 'OPCION_ADICIONAL_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'ORDEN',
                        id: 'OPCION_ORDEN_LABEL',
                        name: 'OPCION_ORDEN_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'IMAGEN',
                        id: 'OPCION_IMAGEN_LABEL',
                        name: 'OPCION_IMAGEN_LABEL',
                        allowBlank:false
                    },					
					{
                        fieldLabel: 'ESTADO',
                        id: 'OPCION_ESTADO_COMBO',
                        name: 'OPCION_ESTADO_COMBO',
                        allowBlank: false,
						xtype:          'combo',
						mode:           'local',
						value:          'ACTIVO',
						triggerAction:  'all',
						forceSelection: true,
						editable:       false,
						emptyText: 'Seleccione estado ...',
						typeAhead: true,
						//hiddenName:     'H_OPCION_CIVIL_OPCION_COMBO',
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
								
                                url: '../servicios/blpOpcionesAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function(form, action){
                                    storeOpciones.reload();									
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
								var value = rec.get('OPCION_ID');
								//-------------------------------
								newForm.getForm().submit({
                                url: '../servicios/blpOpcionesAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storeOpciones.reload();									
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
        Ext.getCmp('GRUPO_ID').reset();   
		Ext.getCmp('OPCION_DESCRIPCION_LABEL').reset();
		Ext.getCmp('OPCION_CONTENIDO_LABEL').reset();
		Ext.getCmp('OPCION_ADICIONAL_LABEL').reset();
		Ext.getCmp('OPCION_ORDEN_LABEL').reset();
		Ext.getCmp('OPCION_IMAGEN_LABEL').reset();		
		Ext.getCmp('OPCION_ESTADO_COMBO').reset();		
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
		Ext.getCmp('GRUPO_ID').setValue(rec.get('OPCION_GRUPO_ID'));  
		Ext.getCmp('OPCION_DESCRIPCION_LABEL').setValue(rec.get('OPCION_DESCRIPCION'));
		Ext.getCmp('OPCION_CONTENIDO_LABEL').setValue(rec.get('OPCION_CONTENIDO'));
		Ext.getCmp('OPCION_ADICIONAL_LABEL').setValue(rec.get('OPCION_ADICIONAL'));
		Ext.getCmp('OPCION_ORDEN_LABEL').setValue(rec.get('OPCION_ORDEN'));
		Ext.getCmp('OPCION_IMAGEN_LABEL').setValue(rec.get('OPCION_IMAGEN'));
		Ext.getCmp('OPCION_ESTADO_COMBO').setValue(rec.get('OPCION_ESTADO'));
		
		var value = rec.get('OPCION_ID');
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
        var value = rec.get('OPCION_ID');
        Ext.Ajax.request({
            url: "../servicios/blpOpcionesAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Succesfully");
                  storeOpciones.reload();
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
      store: storeOpciones,
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
			   {id:"ID",header: "ID", dataIndex: "OPCION_ID",hidden: false, hideable: true, width: 50},
               {header: "GRUPO",dataIndex: "GRUPO_DESCRIPCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "CONTENIDO",dataIndex: "OPCION_DESCRIPCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "DESCRIPCION", dataIndex: "OPCION_CONTENIDO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "ADICIONAL", dataIndex: "OPCION_ADICIONAL", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "ORDEN", dataIndex: "OPCION_ORDEN", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "IMAGEN", dataIndex: "OPCION_IMAGEN", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "REGISTRADO", dataIndex: "OPCION_REGISTRADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "MODIFICADO", dataIndex: "OPCION_MODIFICADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "USUARIO", dataIndex: "OPCION_USUARIO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "ESTADO",dataIndex: "OPCION_ESTADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({}),			   
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
      store: storeOpciones,
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
