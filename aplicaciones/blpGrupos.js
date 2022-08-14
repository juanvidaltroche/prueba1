Ext.namespace("acl");

var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "GRUPOS";

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
        url: "../servicios/blpGruposAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeGrupos.loadData(Ext.util.JSON.decode(result.responseText));
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
	
	//usuario
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
                        fieldLabel: 'descripcion',
                        id: 'GRUPO_DESCRIPCION_LABEL',
                        name: 'GRUPO_DESCRIPCION_LABEL',
                        allowBlank:false
                    },
					{
                        fieldLabel: 'GRUPO_IMAGEN',
                        id: 'GRUPO_IMAGEN_LABEL',
                        name: 'GRUPO_IMAGEN_LABEL',
                        allowBlank:false
                    },				
					{
                        fieldLabel: 'ESTADO',
                        id: 'GRUPO_ESTADO_COMBO',
                        name: 'GRUPO_ESTADO_COMBO',
                        allowBlank: false,
						xtype:          'combo',
						mode:           'local',
						value:          'ACTIVO',
						triggerAction:  'all',
						forceSelection: true,
						editable:       false,
						emptyText: 'Seleccione estado ...',
						typeAhead: true,
						//hiddenName:     'H_USUARIO_CIVIL_USUARIO_COMBO',
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
								
                                url: '../servicios/blpGruposAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function(form, action){
                                    storeGrupos.reload();									
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
								var value = rec.get('GRUPO_ID');
								//-------------------------------
								newForm.getForm().submit({
                                url: '../servicios/blpGruposAjax.php',																
								method: "POST",
								params: {"option": "UPD", "i": value},
                                waitMsg: 'Registro Modificado ...',
                                success: function(form, action){
                                    storeGrupos.reload();									
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
                title: 'NUEVO USUARIO',
                items: newForm
    });

    var btnNew = new Ext.Action({
      id: "btnNew",
      text: "Nuevo",
	  iconCls: 'icon-add',
      handler: function() {
        Ext.getCmp('GRUPO_DESCRIPCION_LABEL').reset();   
		Ext.getCmp('GRUPO_IMAGEN_LABEL').reset();
		Ext.getCmp('GRUPO_ESTADO_COMBO').reset();			
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
		Ext.getCmp('GRUPO_DESCRIPCION_LABEL').setValue(rec.get('GRUPO_DESCRIPCION'));  
		Ext.getCmp('GRUPO_IMAGEN_LABEL').setValue(rec.get('GRUPO_IMAGEN'));		
		Ext.getCmp('GRUPO_ESTADO_COMBO').setValue(rec.get('GRUPO_ESTADO'));
		
		var value = rec.get('GRUPO_ID');
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
        var value = rec.get('GRUPO_ID');
        Ext.Ajax.request({
            url: "../servicios/blpGruposAjax.php",
            method: "POST",
            params: {"option": "DEL", "i": value},
            success:function (result, request) {
                  Ext.MessageBox.alert("Alert", "Succesfully");
                  storeGrupos.reload();
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
      store: storeGrupos,
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
			   {id:"ID",header: "ID", dataIndex: "GRUPO_ID",hidden: false, hideable: true, width: 50},
               {header: "DESCRIPCION",dataIndex: "GRUPO_DESCRIPCION", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "IMAGEN",dataIndex: "GRUPO_IMAGEN", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "REGISTRADO", dataIndex: "GRUPO_REGISTRADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "MODIFICADO",dataIndex: "GRUPO_MODIFICADO", align: "left", hidden: true, hideable: true, editor: new Ext.form.TextField({})},
			   {header: "USUARIO",dataIndex: "GRUPO_USUARIO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({})},			   
			   {header: "ESTADO",dataIndex: "GRUPO_ESTADO", align: "left", hidden: false, hideable: true, editor: new Ext.form.TextField({}),			   
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
      store: storeGrupos,
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
