Ext.namespace("acl");
var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Fallo en cargar los registros ...";
var LABEL_TITLE_PANEL_1 = "USUARIOS";
var LABEL_BTN_SEARCH = "BUSCAR",
    LABEL_MSG_SEARCH = "buscar usuario ...";
var sw = 0;
var jsNombreBoton = "Nuevo";

acl.application = {
    init: function () {
        storeProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            //AJAX USUARIOS
            Ext.Ajax.request({
                url: "../servicios/usrUsuariosAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeUsuarios.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });

        };

        onMnuContext = function (grid, rowIndex, e) {
            e.stopEvent();
            var coords = e.getXY();
            mnuContext.showAt([coords[0], coords[1]]);
        };

        //Variables declared in html file
        var pageSize = parseInt(20 /*CONFIG.pageSize*/ );
        var message = "por implementar ..."; // CONFIG.message;

        //usuario
        var storeUsuarios = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/usrUsuariosAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "USUARIO_ID",
                    allowBlank: false
                }, {
                    name: "USUARIO_FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "USUARIO_CODIGO",
                    allowBlank: false
                }, {
                    name: "USUARIO_CLAVE",
                    allowBlank: false
                }, {
                    name: "USUARIO_CONTROLAR_IP",
                    allowBlank: false
                }, {
                    name: "USUARIO_REGISTRADO",
                    allowBlank: false
                }, {
                    name: "USUARIO_MODIFICADO",
                    allowBlank: false
                }, {
                    name: "USUARIO_USUARIO",
                    allowBlank: false
                }, {
                    name: "USUARIO_ESTADO",
                    allowBlank: false
                }, {
                    name: "USUARIO_CORREO",
                    allowBlank: false
                }, {
                    name: "USUARIO_TIPO_USUARIO",
                    allowBlank: false
                }, {
                    name: "USUARIO_DOMINIO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_NOMBRE_COMPLETO",
                    allowBlank: false
                }, {
                    name: "UTF_TIPO_FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_DESCRIPCION",
                    allowBlank: false
                }]
            }),

            //autoLoad: true, //First call

            listeners: {
                beforeload: function (store) {

                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize
                    };
                }
            }
        });

        //store personas
        var storePersonas = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/usrUsuariosAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO",
                    allowBlank: false
                }, ]
            }),

            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_FUNCIONARIO",
                        "pageSize": 100000
                    };
                }
            }
        });

        storePersonas.load();
		
			//ROLES
	var storeRoles = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/usrUsuariosRolesAjax.php",
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

        var storePageSize = new Ext.data.SimpleStore({
            fields: ["size"],
            data: [
                ["15"],
                ["25"],
                ["35"],
                ["50"],
                ["100"]
            ],
            autoLoad: true
        });

        // panel
        newForm = new Ext.FormPanel({
            //fileUpload: true,
            autoscroll: true,
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
                xtype: 'hidden',
                id: 'oculto_id_funcionario',
                name: 'oculto_id_funcionario',
                allowBlank: false
            },{
                xtype: 'hidden',
                id: 'oculto_id_usuario',
                name: 'oculto_id_usuario',
                allowBlank: false
            }, {
                xtype: 'hidden',
                id: 'oculto_funcionario',
                name: 'oculto_funcionario',
                allowBlank: false
            }, {
                fieldLabel: 'FUNCIONARIO',
                id: 'FUNCIONARIO_ID',
                name: 'FUNCIONARIO_ID',
                allowBlank: true,
                xtype: 'combo',
                triggerAction: 'all',
                forceSelection: true,
                emptyText: 'Seleccione ...',
                typeAhead: true,
                hiddenName: 'H_FUNCIONARIO_ID',
                displayField: 'FUNCIONARIO',
                valueField: 'FUNCIONARIO_ID',
                store: storePersonas,
                mode: 'local',
                listeners: {
                    select: function (combo, record, index) {
                        var idfuncionario = record.data.FUNCIONARIO_ID;
                        var detfuncionario = record.data.FUNCIONARIO_ID;
                        Ext.getCmp('oculto_id_funcionario').setValue(idfuncionario);
                        Ext.getCmp('oculto_funcionario').setValue(detfuncionario);
                    }
                }
            }, {
                fieldLabel: 'CODIGO',
                id: 'USUARIO_CODIGO_LABEL',
                name: 'USUARIO_CODIGO_LABEL',
                allowBlank: false
            }, {
                fieldLabel: 'CLAVE',
                id: 'USUARIO_CLAVE_LABEL',
                name: 'USUARIO_CLAVE_LABEL',
                allowBlank: false
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
                    }],
            buttons: [{
                text: jsNombreBoton,
                id: 'Guardar',
                name: 'Guardar',
                handler: function () {
                    if (newForm.getForm().isValid()) {
                        form_action = 1;
                        //--------------ADICIONAR-----------------------
                        if (sw == "0") {
                            newForm.getForm().submit({

                                url: '../servicios/usrUsuariosAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function (form, action) {
                                    storeUsuarios.reload();
									storePersonas.reload();
                                    alert('Se registro con exito');
                                },
                                failure: function (form, action) {
                                    alert('Falla al guardar registro');
                                }
                            });
                        } else //---------------MODIFCAR----------------------
                        {
                            var rec = grdpnlUser.getSelectionModel().getSelected();
                            if (!rec) {
                                return false;
                            }
                            var value = rec.get('USUARIO_ID');
                            //-------------------------------
                            newForm.getForm().submit({
                                url: '../servicios/usrUsuariosAjax.php',
                                method: "POST",
                                params: {
                                    "option": "UPD",
                                    "i": value
                                },
                                waitMsg: 'Registro Modificado ...',
                                success: function (form, action) {
								    storePersonas.load();
                                    storeUsuarios.reload();
                                    alert('Se modifico con exito');
                                },
                                failure: function (form, action) {
                                    alert('Registro no modificado');
                                }
                            });

                        }
                        winForm.hide();
                    }
                }
            }, {

                text: 'Cancelar',
                handler: function () {
                    winForm.hide();
                }
            }]
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
            handler: function () {
                Ext.getCmp('FUNCIONARIO_ID').reset();
                Ext.getCmp('USUARIO_CODIGO_LABEL').reset();
                Ext.getCmp('USUARIO_CLAVE_LABEL').reset();
                sw = 0;
                Ext.getCmp('Guardar').setText('GUARDAR');
                Ext.getCmp('FormAdiModi').setTitle('Adicion');
                winForm.show(this);
            }
        });

        function doCargaFuncionarios(id) {
            Ext.Ajax.request({
                url: "../servicios/usrFuncionariosAjax.php",
                method: "POST",
                //params: {"option": "LST_ID", "id":id, "pageSize": 100, "limit": 100, "start": 0},
                params: {
                    "option": "LST",
                    "pageSize": 10000,
                    "limit": 10000,
                    "start": 0
                },

                success: function (result, request) {
                    storePersonas.loadData(Ext.util.JSON.decode(result.responseText));
                },
                failure: function (result, request) {
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
        }

        var btnUpd = new Ext.Action({
            id: "btnUpd",
            text: "Modificar",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }

                Ext.getCmp('oculto_id_funcionario').setValue(rec.get('USUARIO_FUNCIONARIO_ID'));
                Ext.getCmp('oculto_funcionario').setValue(rec.get('FUNCIONARIO_NOMBRE_COMPLETO'));
                Ext.getCmp('FUNCIONARIO_ID').setValue(rec.get('FUNCIONARIO_NOMBRE_COMPLETO'));
                Ext.getCmp('USUARIO_CODIGO_LABEL').setValue(rec.get('USUARIO_CODIGO'));
                Ext.getCmp('USUARIO_CLAVE_LABEL').setValue(rec.get('USUARIO_CLAVE'));
				
				
				Ext.getCmp('oculto_id_usuario').setValue(rec.get('USUARIO_ID'));
				
				Ext.getCmp('oculto_id_tipo_funcionario').setValue(rec.get('UTF_TIPO_FUNCIONARIO_ID'));
				Ext.getCmp('ROL_ID').setValue(rec.get('UTF_TIPO_FUNCIONARIO_ID'));
				


                var value = rec.get('USUARIO_ID');
                winForm.show(this);
                Ext.getCmp('Guardar').setText('MODIFICAR');
                Ext.getCmp('FormAdiModi').setTitle('Modifcacion ');
                sw = "1";

            }

        });

        var btnDel = new Ext.Action({
            id: "btnDel",
            text: "Dar Baja",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('USUARIO_ID');
                Ext.Ajax.request({
                    url: "../servicios/usrUsuariosAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL",
                        "i": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Succesfully");
                        storeUsuarios.reload();
                    },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Fail saving record");
                    }
                });
            }

        });

        var txtSearch = new Ext.form.TextField({
            id: "txtSearch",
            iconCls: 'icon-search',
            emptyText: LABEL_MSG_SEARCH,
            width: 300,
            allowBlank: true,

            listeners: {
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER) {
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: LABEL_LOADING
                        });
                        myMask.show();
                        var cadena = Ext.getCmp('txtSearch').getValue();
                        Ext.Ajax.request({
                            url: "../servicios/usrUsuariosAjax.php",
                            method: "POST",
                            params: {
                                "option": "BSQ",
                                "valor": cadena
                            },
                            success: function (result, request) {                                
                                myMask.hide();
								storeUsuarios.loadData(Ext.util.JSON.decode(result.responseText));
                            },
                            failure: function (result, request) {
                                myMask.hide();
                                Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                            }
                        });
                    }
                }
            }
        });

        var btnTextClear = new Ext.Action({
            id: "btnTextClear",

            text: "X",
            ctCls: "pm_search_x_button",
            handler: function () {
                txtSearch.reset();
            }
        });

        var btnSearch = new Ext.Action({
            id: "btnSearch",
            text: LABEL_BTN_SEARCH,
            handler: function () {
                var myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: LABEL_LOADING
                });
                myMask.show();
                var cadena = Ext.getCmp('txtSearch').getValue();
                Ext.Ajax.request({
                    url: "../servicios/usrUsuariosAjax.php",
                    method: "POST",
                    params: {
                        "option": "BSQ",
                        "valor": cadena
                    },
                    success: function (result, request) {
                        myMask.hide();
                        storeUsuarios.loadData(Ext.util.JSON.decode(result.responseText));
                        myMask.hide();
                    },
                    failure: function (result, request) {
                        myMask.hide();
                        Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
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

            listeners: {
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
            store: storeUsuarios,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSize]
        });

        var cmodel = new Ext.grid.ColumnModel({
            defaults: {
                //width:30,
                sortable: true
            },

            columns: [{
                id: "ID",
                header: "ID",
                dataIndex: "USUARIO_ID",
                hidden: true,
                hideable: true,
                width: 50
            },{
                id: "UTF_TIPO_FUNCIONARIO_ID",
                header: "TIPO_FUNCIONARIO",
                dataIndex: "UTF_TIPO_FUNCIONARIO_ID",
                hidden: true,
                hideable: true,
                width: 50
            },{
                id: "TIPO_FUNCIONARIO_DESCRIPCION",
                header: "TIPO_FUNCIONARIO",
                dataIndex: "TIPO_FUNCIONARIO_DESCRIPCION",
                hidden: true,
                hideable: true,
                width: 50
            }, {
                header: "USUARIO_FUNCIONARIO_ID",
                dataIndex: "USUARIO_FUNCIONARIO_ID",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "FUNCIONARIO",
                dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "CODIGO",
                dataIndex: "USUARIO_CODIGO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "CLAVE",
                dataIndex: "USUARIO_CLAVE",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({}),
            }, {
                header: "REGISTRADO",
                dataIndex: "USUARIO_REGISTRADO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "MODIFICADO",
                dataIndex: "USUARIO_MODIFICADO",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "USUARIO",
                dataIndex: "USUARIO_USUARIO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "ESTADO",
                dataIndex: "USUARIO_ESTADO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({}),
                renderer: function (v, params, data) {
                    return ((v === 'A') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                }
            }]
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
            store: storeUsuarios,
            colModel: cmodel,
            selModel: smodel,

            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column

            tbar: [btnNew, btnUpd, btnDel, "->", txtSearch, btnTextClear, btnSearch],
            bbar: pagingUser,

            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,

            renderTo: "divMain",

            listeners: {}
        });

        //Initialize events
        storeProcess(pageSize, pageSize, 0);

        cboPageSize.setValue(pageSize);

        var viewport = new Ext.Viewport({
            layout: 'fit',
            items: [grdpnlUser]
        });


    }
}

Ext.onReady(acl.application.init, acl.application);