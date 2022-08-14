Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Fallo en cargar los registros ...";
var LABEL_TITLE_PANEL_1 = "FUNCIONARIOS";
var LABEL_BTN_SEARCH = "BUSCAR",
    LABEL_MSG_SEARCH = "buscar funcionario ...";

var sw = 0;

acl.application = {
    init: function () {
        storeFuncionarioProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            //AJAX FUNCIONARIOS
            Ext.Ajax.request({
                url: "../servicios/blpFuncionariosAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeFuncionario.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });

            //AJAX EXPEDIDO
            Ext.Ajax.request({
                url: "../servicios/blpExpedidosAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeExpedido.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });

            //AJAX estado civil
            Ext.Ajax.request({
                url: "../servicios/blpEstadosCivilesAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeEstCivil.loadData(Ext.util.JSON.decode(result.responseText));
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



        //store funcionario
        var storeFuncionario = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_EXPEDIDO_ID",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_ESTADO_CIVIL_ID",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_CI",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_NOMBRES",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_PATERNO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_MATERNO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_REGISTRO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_MODIFICACION",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_USUARIO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_ESTADO",
                    allowBlank: false
                }]
            }),

            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize
                    };
                }
            }
        });
        //expedido
        //store funcionario
        var storeExpedido = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpExpedidosAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "EXPEDIDO_ID",
                        allowBlank: false
                    },

                    {
                        name: "EXPEDIDO_DESCRIPCION",
                        allowBlank: false
                    },

                ]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize
                    };
                }
            }
        });
        //

        //store estados civiles
        var storeEstCivil = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpEstadosCivilesAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "ESTADO_CIVIL_ID",
                        allowBlank: false
                    },

                    {
                        name: "ESTADO_CIVIL_DESCRIPCION",
                        allowBlank: false
                    },

                ]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize
                    };
                }
            }
        });

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
                fieldLabel: 'NOMBRE',
                id: 'LABEL_NOMBRE',
                name: 'LABEL_NOMBRE',
                allowBlank: false
            }, {
                fieldLabel: 'PATERNO',
                id: 'LABEL_PATERNO',
                name: 'LABEL_PATERNO',
                allowBlank: false
            }, {
                fieldLabel: 'MATERNO',
                id: 'LABEL_MATERNO',
                name: 'LABEL_MATERNO',
                allowBlank: false
            }, {
                fieldLabel: 'CARNET',
                id: 'LABEL_CI',
                name: 'LABEL_CI',
                allowBlank: false
            }, {
                fieldLabel: 'EXPEDIDO',
                id: 'LABEL_EXPEDIDO',
                name: 'LABEL_EXPEDIDO',
                allowBlank: false,
                xtype: 'combo',
                mode: 'local',               
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione estado ...',
                typeAhead: true,
                hiddenName: 'H_EXPEDIDO_ID',
                displayField: 'EXPEDIDO_DESCRIPCION',
                valueField: 'EXPEDIDO_ID',
                store: storeExpedido
            }, {
                fieldLabel: 'ESTADO CIVIL',
                id: 'LABEL_ESTCIVIL',
                name: 'LABEL_ESTCIVIL',
                allowBlank: false,
                xtype: 'combo',
                mode: 'local',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione estado ...',
                typeAhead: true,
                hiddenName: 'H_ESTADO_CIVIL_ID',
                displayField: 'ESTADO_CIVIL_DESCRIPCION',
                valueField: 'ESTADO_CIVIL_ID',
                store: storeEstCivil
            }],
            buttons: [{
                id: 'btnSave',
                name: 'btnSave',
                text: 'NUEVO',
                handler: function () {
                    if (newForm.getForm().isValid()) {
                        form_action = 1; //switch
                        //
                        if (sw == 0) {                            
                            newForm.getForm().submit({
                                url: '../servicios/blpFuncionariosAjax.php?option=NEW',
                                waitMsg: 'Saving record ...',
                                success: function (form, action) {
                                    storeFuncionario.reload();                                    
                                },
                                failure: function (form, action) {
                                    alert('Fail saving record');
                                }
                            });
                            winForm.hide();
                        } else {
                            form_action = 1;

                            var rec = grdpnlUser.getSelectionModel().getSelected();
                            if (!rec) {
                                return false;
                            }
                            var value = rec.get('FUNCIONARIO_ID');


                            newForm.getForm().submit({
                                url: '../servicios/blpFuncionariosAjax.php?option=UPD',
                                method: "POST",
                                params: {
                                    "option": "UPD",
                                    "i": value
                                },
                                waitMsg: 'Registro Modificado ...',
                                success: function (form, action) {
                                    storeFuncionario.reload();
                                    alert('Registro Modificado ...');
                                },
                                failure: function (form, action) {
                                    alert('Registro no modificado');
                                }
                            });
                            winForm.hide();
                        }
                    } //if
                    else {
                        alert('falso');
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
            layout: 'fit',
            closeAction: 'hide',
            plain: true,
            title: 'NUEVO FUNCIONARIO',
            items: newForm
        });

        var btnNew = new Ext.Action({
            id: "btnNew",
            text: "ADICIONAR",
            iconCls: 'icon-add',
            handler: function () {

                sw = 0;
               
                Ext.getCmp('LABEL_CI').reset();
                Ext.getCmp('LABEL_NOMBRE').reset();
                Ext.getCmp('LABEL_PATERNO').reset();
                Ext.getCmp('LABEL_MATERNO').reset();
                winForm.show(this);
            }
        });

        var btnUpt = new Ext.Action({
            id: "btnUpt",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');
                winForm.title = 'Modificar';
                doCargaFormulario(rec);
            }
        });

        function doCargaFormulario(record) {
            
            Ext.getCmp('LABEL_CI').setValue(record.get('FUNCIONARIO_CI'));
            Ext.getCmp('LABEL_NOMBRE').setValue(record.get('FUNCIONARIO_NOMBRES'));
            Ext.getCmp('LABEL_PATERNO').setValue(record.get('FUNCIONARIO_PATERNO'));
            Ext.getCmp('LABEL_MATERNO').setValue(record.get('FUNCIONARIO_MATERNO'));
            Ext.getCmp('btnSave').setText('Modificar');
            sw = 1;
            winForm.show(this);
        }

        var btnDel = new Ext.Action({
            id: "btnDel",
            text: "DAR BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');
                Ext.Ajax.request({
                    url: "../servicios/blpFuncionariosAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL",
                        "i": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Succesfully");
                        storeFuncionario.reload();
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
                            url: "../servicios/blpFuncionariosAjax.php",
                            method: "POST",
                            params: {
                                "option": "BSQ",
                                "valor": cadena
                            },
                            success: function (result, request) {
                                storeFuncionario.loadData(Ext.util.JSON.decode(result.responseText));
                                myMask.hide();
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
                    url: "../servicios/blpFuncionariosAjax.php",
                    method: "POST",
                    params: {
                        "option": "BSQ",
                        "valor": cadena
                    },
                    success: function (result, request) {
						myMask.hide();
                        storeFuncionario.loadData(Ext.util.JSON.decode(result.responseText));
                        
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
            store: storeFuncionario,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSize]
        });

        var cmodel = new Ext.grid.ColumnModel({
            defaults: {              
                sortable: true
            },

            columns: [{
                id: "ID",
                header: "ID",
                dataIndex: "FUNCIONARIO_ID",
                hidden: true,
                hideable: true,
                width: 50
            }, {
                header: "CI ",
                dataIndex: "FUNCIONARIO_CI",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "NOMBRES",
                dataIndex: "FUNCIONARIO_NOMBRES",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "AP. PATERNO",
                dataIndex: "FUNCIONARIO_PATERNO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "AP. MATERNO",
                dataIndex: "FUNCIONARIO_MATERNO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "REGISTRO",
                dataIndex: "FUNCIONARIO_REGISTRO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "MODIFICACION",
                dataIndex: "FUNCIONARIO_MODIFICACION",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "USUARIO",
                dataIndex: "FUNCIONARIO_USUARIO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "ESTADO",
                dataIndex: "FUNCIONARIO_ESTADO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({}),

                renderer: function (v, params, data) {
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
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
            store: storeFuncionario,
            colModel: cmodel,
            selModel: smodel,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column
            tbar: [btnNew, btnUpt, btnDel, "->", txtSearch, btnTextClear, btnSearch],
            bbar: pagingUser,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,
            renderTo: "divMain",
            listeners: {}
        });

        //Initialize events
        storeFuncionarioProcess(pageSize, pageSize, 0);
        cboPageSize.setValue(pageSize);

        var viewport = new Ext.Viewport({
            layout: 'fit',
            items: [grdpnlUser]
        });
    }
}

Ext.onReady(acl.application.init, acl.application);