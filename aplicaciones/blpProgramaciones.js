Ext.namespace("acl");
var jsAccion = "NEW";
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "PROGRAMACIONES";

var LABEL_BTN_SEARCH = "Search",
    LABEL_MSG_SEARCH = "search ...";

acl.application = {
    init: function () {
        storeUserProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();

            Ext.Ajax.request({
                url: "../servicios/blpProgramacionesAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },
                success: function (result, request) {
                    storeProgramaciones.loadData(Ext.util.JSON.decode(result.responseText));
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

        var storeHerramientas = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpHerramientasAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "HRR_ID"
                }, {
                    name: "HRR_DESCRIPCION"
                }]
            }),
            autoLoad: true, //First call//dav
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize
                    };
                }
            }
        });
        storeHerramientas.load(); //dav
        var storeRutas = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpRutasAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "RUTA_ID",
                    allowBlank: false
                }, {
                    name: "RUTA_DESCRIPCION",
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
        storeRutas.load();

        //inicio
        var storeFuncionarios = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosAjax.php",
                method: "POST"
            }),

            //groupField: 'CATEGORY_LABEL',
            //baseParams: {"option": "LST", "pageSize": pageSize},

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_TIPO_FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_DESCRIPCION",
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
                    name: "TIPO_FUNCIONARIO_USUARIO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO_ESTADO",
                    allowBlank: false
                }, {
                    name: "FUNCIONARIO",
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
		
		storeFuncionarios.load();
        //fin


        var storeProgramaciones = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpProgramacionesAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "PRG_ID",
                        allowBlank: false
                    }, {
                        name: "RUTA_DESCRIPCION",
                        allowBlank: false
                    }, {
                        name: "FUNCIONARIO",
                        allowBlank: false
                    }, {
                        name: "PRG_ESTADO",
                        allowBlank: false
                    }, {
                        name: "HRR_ID",
                        allowBlank: false
                    }, {
                        name: "PRG_HRR_ID",
                        allowBlank: false
                    }, {
                        name: "HRR_DESCRIPCION",
                        allowBlank: false
                    }, {
                        name: "PRG_CONDUCTOR_ID",
                        allowBlank: false
                    }, {
                        name: "PRG_RUTA_ID",
                        allowBlank: false
                    }, {
                        name: "PRG_REGISTRO",
                        allowBlank: false
                    }, {
                        name: "PRG_MODIFICACION",
                        allowBlank: false
                    }, {
                        name: "PRG_USUARIO",
                        allowBlank: false
                    }, {
                        name: "programacion",
                        allowBlank: false
                    }

                ]
            }),
            groupField: 'PRG_REGISTRO',
            sortInfo: {
                field: "PRG_REGISTRO",
                direction: "ASC"
            },
            //baseParams: {"option": "LST", "pageSize": pageSize},
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
                id: 'PRG_ID',
                name: 'PRG_ID',
                hidden: 'true',
                value: 'vacio'
            }, {
                fieldLabel: 'HERRAMIENTA',
                id: 'HRR_ID01',
                name: 'HRR_ID01',
                allowBlank: false,
                xtype: 'combo',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione herramienta ...',
                typeAhead: true,
                hiddenName: 'H_HRR_ID',
                displayField: 'HRR_DESCRIPCION',
                valueField: 'HRR_ID',
                store: storeHerramientas
            }, {
                fieldLabel: 'RUTA',
                id: 'RUTA_ID',
                name: 'RUTA_ID',
                allowBlank: false,
                xtype: 'combo',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione Ruta ...',
                typeAhead: true,
                hiddenName: 'H_RUTA_ID',
                displayField: 'RUTA_DESCRIPCION',
                valueField: 'RUTA_ID',
                store: storeRutas
            }, {
                fieldLabel: 'FUNCIONARIO',
                id: 'FUNCIONARIO_ID',
                name: 'FUNCIONARIO_ID',
                allowBlank: false,
                xtype: 'combo',
                triggerAction: 'all',

                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione funcionario ...',
                typeAhead: true,
                hiddenName: 'H_FUNCIONARIO_ID',
                displayField: 'FUNCIONARIO',
                valueField: 'FUNCIONARIO_ID',
                store: storeFuncionarios
            }, {
                fieldLabel: 'FECHA',
                id: 'DATE_ID',
                name: 'DATE_ID',
                allowBlank: false,
                xtype: 'datefield',
                format: 'Y/m/d'
            } ],
            buttons: [{
                text: 'GUARDAR',
                id: 'btnGuardar',
                iconCls: 'icon-save',
                handler: function () {
                    var jsUrl = '../servicios/blpProgramacionesAjax.php?option=' + jsAccion;                   

                    if (newForm.getForm().isValid()) {
                        form_action = 1;
                        newForm.getForm().submit({
                            url: jsUrl,
                            waitMsg: 'Saving record ...',
                            success: function (form, action) {
                                storeProgramaciones.reload();
                                alert('Registro Guardado.');
                            },
                            failure: function (form, action) {
                                storeProgramaciones.reload();
                                alert('Error al Guardar el Registro.');
                            }
                        });
                        winForm.hide();
                    }
                }
            }, {
                text: 'CANCELAR',
                iconCls: 'icon-cancel',
                handler: function () {
                    winForm.hide();
                }
            }]
        });

        winForm = new Ext.Window({
            layout: 'fit',
            width: 500,
            height: 250,
            closeAction: 'hide',
            plain: true,
            title: 'ADICIONAR PROGRAMACION',
            items: newForm
        });

        var btnNew = new Ext.Action({
            id: "btnNew",
            text: "ADICIONAR",
            iconCls: 'icon-add',
            handler: function () {
                jsAccion = "NEW"; //2013-6-12
                Ext.getCmp('HRR_ID01').setValue('');
                Ext.getCmp('RUTA_ID').setValue('');
                Ext.getCmp('FUNCIONARIO_ID').setValue('');
                Ext.getCmp('DATE_ID').setValue('');
                winForm.show(this);
            }
        });

        var btnDel = new Ext.Action({
            id: "btnDel",
            text: "DAR BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('PRG_ID');
                Ext.Ajax.request({
                    url: "../servicios/blpProgramacionesAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL",
                        "idProgramacion": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Succesfully");
                        storeProgramaciones.reload();
                    },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Fail saving record");
                    }
                });
            }
        });

        //2013-6-11 inicio
        var btnUpdate = new Ext.Action({
            id: "btnUpdate",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function () {
                jsAccion = "UPDATE"; //2013-6-12
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                doCargar(rec);
            }
        });

        function doCargar(rec) {
            console.log(rec);
            winForm.title = 'ACTUALIZAR';
            Ext.getCmp('btnGuardar').setText('GUARDAR');
            //alert("id programa prg_id: "+rec.get('PRG_ID'));
            Ext.getCmp('PRG_ID').setValue(rec.get('PRG_ID'));
            Ext.getCmp('HRR_ID01').setValue(rec.get('PRG_HRR_ID'));
            Ext.getCmp('RUTA_ID').setValue(rec.get('PRG_RUTA_ID'));
            Ext.getCmp('FUNCIONARIO_ID').setValue(rec.get('PRG_CONDUCTOR_ID'));    
            Ext.getCmp('DATE_ID').setValue(rec.get('PRG_REGISTRO'));

            winForm.show(this);
        }
        //2013-6-11-fin

        var txtSearch = new Ext.form.TextField({
            id: "txtSearch",
            iconCls: 'icon-search',
            emptyText: LABEL_MSG_SEARCH,
            width: 150,
            allowBlank: true,

            listeners: {
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
            handler: function () {
                txtSearch.reset();
            }
        });

        var btnSearch = new Ext.Action({
            id: "btnSearch",
            text: LABEL_BTN_SEARCH,
            handler: function () {
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
            store: storeProgramaciones,
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
                dataIndex: "PRG_ID",
                hidden: true,
                hideable: true,
                width: 50
            }, {
                header: "PRG_ID",
                dataIndex: "PRG_ID",
                align: "left",
                hidden: true,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "FECHA DE PROGRAMACION",
                dataIndex: "PRG_REGISTRO",
                align: "left",
                hidden:false,
                hideable: true
               
            },{
                header: "DESCRIPCION HERRAMIENTA",
                dataIndex: "HRR_DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "DESCRIPCION RUTA",
                dataIndex: "RUTA_DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "NOMBRES",
                dataIndex: "FUNCIONARIO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "MODIFICACION",
                dataIndex: "PRG_MODIFICACION",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "USUARIO",
                dataIndex: "PRG_USUARIO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "ESTADO",
                dataIndex: "PRG_ESTADO",
                align: "left",
                hidden: false,
                hideable: false,
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
            store: storeProgramaciones,
            colModel: cmodel,
            selModel: smodel,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            view: new Ext.grid.GroupingView({
                forceFit: true,
                ShowGroupName: true,
                enableNoGroup: false,
                enableGropingMenu: false,
                hideGroupedColumn: true
            }),
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column
            tbar: [btnNew, btnUpdate, btnDel /*, "->", txtSearch, btnTextClear, btnSearch*/ ],
            bbar: pagingUser,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,
            renderTo: "divMain",
            listeners: {}
        });
        //Initialize events
        storeUserProcess(pageSize, pageSize, 0);
        cboPageSize.setValue(pageSize);
        var viewport = new Ext.Viewport({
            layout: 'fit',
            items: [grdpnlUser]
        });
    }
}

Ext.onReady(acl.application.init, acl.application);