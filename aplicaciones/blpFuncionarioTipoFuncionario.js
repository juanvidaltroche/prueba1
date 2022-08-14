Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = "..:: FUNCIONARIO ::..";
var LABEL_TITLE_PANEL_2 = "..:: TIPO FUNCIONARIO ::..";
var LABEL_TITLE_FORM_1 = "..:: FUNCIONARIO ::..";
var LABEL_TITLE_FORM_2 = "..:: FUNCIONARIO ::..";

var global = "0"; //variable global 
var swP = "0"; //switch padre
var swH = "0"; //switch hijo

acl.application = {
    init: function () {
        //-------------
        storePadre = function (n, r, i) {
            var myMaskPadre = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMaskPadre.show();
            Ext.Ajax.request({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST",
                params: {
                    "option": "LST_FUNCIONARIO",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },
                success: function (result, request) {
                    storeFuncionarios.loadData(Ext.util.JSON.decode(result.responseText));
                    myMaskPadre.hide();
                },
                failure: function (result, request) {
                    myMaskPadre.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
        };

        onMnuContext = function (grid, rowIndex, e) {
            e.stopEvent();
            var coords = e.getXY();
            mnuContext.showAt([coords[0], coords[1]]);
        };
        var pageSizePadre = parseInt(50);
        var messagePadre = "por implementar ...";

        //store expedido
        var storeExpedido = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "EXPEDIDO_ID",
                    allowBlank: false
                }, {
                    name: "EXPEDIDO_DESCRIPCION",
                    allowBlank: false
                }]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_EXPEDIDO",
                        "pageSize": pageSizePadre
                    };
                }
            }
        });

        //store estados civiles
        var storeEstCivil = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "ESTADO_CIVIL_ID",
                    allowBlank: false
                }, {
                    name: "ESTADO_CIVIL_DESCRIPCION",
                    allowBlank: false
                }]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_CIVILES",
                        "pageSize": pageSizePadre
                    };
                }
            }
        });

        //store funcionarios
        var storeFuncionarios = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
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
                }, {
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
                    name: "FUNCIONARIO",
                    allowBlank: false
                }]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_FUNCIONARIO",
                        "pageSize": pageSizePadre
                    };
                }
            }
        });

        var storePageSizePadre = new Ext.data.SimpleStore({
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

        storeExpedido.load();
        storeEstCivil.load();
        //-----------------------------------------------------------------------
        //-------------------	FIN STORES	-------------------------------------
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        //------------------	FORMULARIO	-------------------------------------
        //-----------------------------------------------------------------------

        newFormPadre = new Ext.FormPanel({
            width: 500,
            autoHeight: false,
            height: 350,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 200,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'menuseparator',
                width: '100%',
            }, {
                xtype: 'label',
                text: ".:: FUNCIONARIO ::.",
                name: 'lblLastLogin',
                labelStyle: 'font-weight:bold;align:center;',
                anchor: '93%'
            }, {
                xtype: 'menuseparator',
                width: '100%',
            }, {
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
            },{
                fieldLabel: 'CORREO',
                id: 'LABEL_CORREO',
                name: 'LABEL_CORREO',
                allowBlank: false
            }, {
                xtype: 'menuseparator',
                width: '100%',
            }, {
                xtype: 'label',
                text: ".:: USUARIO ::.",
                name: 'lblLastLogin',
                labelStyle: 'font-weight:bold;align:center;',
                anchor: '93%'
            }, {
                xtype: 'menuseparator',
                width: '100%',
            }, {
                fieldLabel: 'CODIGO',
                id: 'LABEL_CODIGO',
                name: 'LABEL_CODIGO',
                allowBlank: false
            }, {
                fieldLabel: 'PASSWORD',
                id: 'LABEL_PASSWORD',
                name: 'LABEL_PASSWORD',
                allowBlank: false
            }],
            buttons: [{
                id: 'BtnPadre',
                name: 'BtnPadre',
                iconCls: 'icon-save',
                handler: function () {
                    if (newFormPadre.getForm().isValid()) {
                        //--------------ADICIONAR-----------------------
                        if (swP == "0") {
                            newFormPadre.getForm().submit({
                                url: '../servicios/blpFuncionariosTipoFuncionarioAjax.php?option=NEW',
                                waitMsg: 'Guardando registro...',
                                success: function (form, action) {
                                    storeFuncionarios.reload();
                                    alert('Se registro con exito');
                                },
                                failure: function (form, action) {
                                    alert('Falla al guardar registro');
                                }
                            });
                        } else {
                            //---------------MODIFICAR----------------------							
                            var rec = grdPadre.getSelectionModel().getSelected();
                            if (!rec) {
                                return false;
                            }
                            var value = rec.get('PERFIL_ID');
                            newFormPadre.getForm().submit({
                                url: '../servicios/blpFuncionariosTipoFuncionarioAjax.php',
                                method: "POST",
                                params: {
                                    "option": "UPD",
                                    "i": value
                                },
                                waitMsg: 'Registro Modificado ...',
                                success: function (form, action) {
                                    storeFuncionarios.reload();
                                    alert('Registro Modificado ...');
                                },
                                failure: function (form, action) {
                                    alert('Registro no modificado');
                                }
                            });
                        }
                        winFormPadre.hide();
                    }
                }
            }, {
                text: 'CANCELAR',
                iconCls: 'icon-cancel',
                handler: function () {
                    winFormPadre.hide();
                }
            }]
        })

        winFormPadre = new Ext.Window({
            layout: 'fit',
            id: 'winFormPadre',
            name: 'winFormPadre',
            closeAction: 'hide',
            plain: true,
            modal: true,
            title: LABEL_TITLE_FORM_1,
            items: newFormPadre
        });

        //-----------------------------------------------------------------------
        //------------------	FIN FORMULARIO	---------------------------------
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        //------------------	BOTONES	-----------------------------------------
        //-----------------------------------------------------------------------


        var btnNewPadre = new Ext.Action({
            id: "btnNewPadre",
            text: "ADICIONAR",
            iconCls: 'icon-add',
            handler: function () {
                doLimpiarFormulario();
            }
        });

        function doLimpiarFormulario() {

            Ext.getCmp('LABEL_CI').reset();
            Ext.getCmp('LABEL_NOMBRE').reset();
            Ext.getCmp('LABEL_PATERNO').reset();
            Ext.getCmp('LABEL_MATERNO').reset();
            Ext.getCmp('LABEL_EXPEDIDO').reset();
            Ext.getCmp('LABEL_ESTCIVIL').reset();
            Ext.getCmp('LABEL_CORREO').reset();
            Ext.getCmp('LABEL_CODIGO').reset();
            Ext.getCmp('LABEL_PASSWORD').reset();

            Ext.getCmp('BtnPadre').setText('GUARDAR');
            Ext.getCmp('winFormPadre').setTitle('NUEVO');
            Ext.getCmp('BtnPadre').setIconClass('icon-save');
            swP = 0;
            winFormPadre.show(this);
        }

        var btnUpdPadre = new Ext.Action({
            id: "btnUpdPadre",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdPadre.getSelectionModel().getSelected();
                if (!rec) {
                    alert('Seleccione un registro');
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');

                Ext.getCmp('BtnPadre').setText('MODIFICAR');
            Ext.getCmp('winFormPadre').setTitle('MODIFICAR');
            Ext.getCmp('BtnPadre').setIconClass('icon-save');
                doCargaFormulario(rec);
            }
        });

        function doCargaFormulario(record) {

            Ext.getCmp('LABEL_CI').setValue(record.get('FUNCIONARIO_CI'));
            Ext.getCmp('LABEL_NOMBRE').setValue(record.get('FUNCIONARIO_NOMBRES'));
            Ext.getCmp('LABEL_PATERNO').setValue(record.get('FUNCIONARIO_PATERNO'));
            Ext.getCmp('LABEL_MATERNO').setValue(record.get('FUNCIONARIO_MATERNO'));
            Ext.getCmp('LABEL_EXPEDIDO').setValue(record.get('FUNCIONARIO_EXPEDIDO_ID'));
            Ext.getCmp('LABEL_ESTCIVIL').setValue(record.get('FUNCIONARIO_ESTADO_CIVIL_ID'));
            Ext.getCmp('LABEL_CODIGO').setValue(record.get('USUARIO_CODIGO'));
            Ext.getCmp('LABEL_PASSWORD').setValue(record.get('USUARIO_CLAVE'));

            Ext.getCmp('BtnPadre').setText('Modificar');
            swP = 1;
            winFormPadre.show(this);
        }

        var btnDelPadre = new Ext.Action({
            id: "btnDelPadre",
            text: "DAR BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdPadre.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');
                Ext.Ajax.request({
                    url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL",
                        "i": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Eliminado");
                        storeFuncionario.reload();
                    },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Error");
                    }
                });
            }

        });

        //-----------------------------------------------------------------------
        //------------------	FIN BOTONES	-----------------------------------------
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        //------------------	GRILLA		-------------------------------------
        //-----------------------------------------------------------------------

        var cboPageSizePadre = new Ext.form.ComboBox({
            id: "cboPageSize",
            mode: "local",
            triggerAction: "all",
            store: storePageSizePadre,
            valueField: "size",
            displayField: "size",
            width: 50,
            editable: false,
            listeners: {
                select: function (combo, record, index) {
                    pageSizePadre = parseInt(record.data["size"]);
                    pagingUserpadre.pageSize = pageSizePadre;
                    pagingUserpadre.moveFirst();
                }
            }
        });

        var pagingUserPadre = new Ext.PagingToolbar({
            id: "pagingUserPadre",
            pageSize: pageSizePadre,
            store: storeFuncionarios,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSizePadre]
        });

        var cmodelPadre = new Ext.grid.ColumnModel({
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
                },

                {
                    header: "FUNCIONARIO ",
                    dataIndex: "FUNCIONARIO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_NOMBRES ",
                    dataIndex: "FUNCIONARIO_NOMBRES",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_PATERNO ",
                    dataIndex: "FUNCIONARIO_PATERNO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_MATERNO ",
                    dataIndex: "FUNCIONARIO_MATERNO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_EXPEDIDO_ID",
                    dataIndex: "FUNCIONARIO_EXPEDIDO_ID",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_ESTADO_CIVIL_ID",
                    dataIndex: "FUNCIONARIO_ESTADO_CIVIL_ID",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_CI ",
                    dataIndex: "FUNCIONARIO_CI",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_REGISTRO ",
                    dataIndex: "FUNCIONARIO_REGISTRO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_MODIFICACION ",
                    dataIndex: "FUNCIONARIO_MODIFICACION",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_USUARIO ",
                    dataIndex: "FUNCIONARIO_USUARIO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_ID ",
                    dataIndex: "USUARIO_ID",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_FUNCIONARIO_ID ",
                    dataIndex: "USUARIO_FUNCIONARIO_ID",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_CODIGO ",
                    dataIndex: "USUARIO_CODIGO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_CLAVE ",
                    dataIndex: "USUARIO_CLAVE",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_CONTROLAR_IP ",
                    dataIndex: "USUARIO_CONTROLAR_IP",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_REGISTRADO ",
                    dataIndex: "USUARIO_REGISTRADO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_MODIFICADO ",
                    dataIndex: "USUARIO_MODIFICADO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_USUARIO ",
                    dataIndex: "USUARIO_USUARIO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_ESTADO ",
                    dataIndex: "USUARIO_ESTADO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_CORREO ",
                    dataIndex: "USUARIO_CORREO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_TIPO_USUARIO ",
                    dataIndex: "USUARIO_TIPO_USUARIO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "USUARIO_DOMINIO ",
                    dataIndex: "USUARIO_DOMINIO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "FUNCIONARIO_ESTADO ",
                    dataIndex: "FUNCIONARIO_ESTADO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({}),
                    renderer: function (v, params, data) {
                        return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                    }
                }
            ]
        });

        var smodelPadre = new Ext.grid.RowSelectionModel({
            singleSelect: true,
            listeners: {
                rowselect: function (sm) {
                    var rec = grdPadre.getSelectionModel().getSelected();
                    if (!rec) {
                        return false;
                    }
                    var idPadre = rec.get('FUNCIONARIO_ID');
                    global = idPadre;
                    //alert('idPadre: '+global);
                    storeHijo(pageSizePadre, pageSizePadre, 0, idPadre);
                },
                rowdeselect: function (sm) {}
            }
        });


        var grdPadre = new Ext.grid.GridPanel({
            id: "grdpnlProveedor",
            store: storeFuncionarios,
            colModel: cmodelPadre,
            selModel: smodelPadre,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true,
            tbar: [btnNewPadre, btnUpdPadre, btnDelPadre],
            bbar: pagingUserPadre,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            listeners: {}
        });

        //-----------------------------------------------------------------------
        //------------------	FIN GRILLA	-------------------------------------
        //-----------------------------------------------------------------------

        //Initialize events  grdpnlUserPadre
        storePadre(pageSizePadre, pageSizePadre, 0);
        cboPageSizePadre.setValue(pageSizePadre);


        //************************************************************************************************
        //********************************************* HIJO *********************************************
        //************************************************************************************************

        storeHijo = function (n, r, i, sIdPadre) {
            var myMaskHijo = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMaskHijo.show();

            Ext.Ajax.request({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST",
                params: {
                    "option": "LST_TIPO_FUNCIONARIO",
                    "pageSize": n,
                    "limit": r,
                    "start": i,
                    "idPadre": sIdPadre
                },

                success: function (result, request) {
                    storeTiposFuncionario.loadData(Ext.util.JSON.decode(result.responseText));
                    myMaskHijo.hide();
                },
                failure: function (result, request) {
                    myMaskHijo.hide();
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
        var pageSizeHijo = parseInt(20 /*CONFIG.pageSize*/ );
        var message = "por implementar ..."; // CONFIG.message;

        //store TiposFuncionario
        var storeTiposFuncionario = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST"
            }),          

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "TIPO_FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_DESCRIPCION",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_REGISTRO",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_MODIFICACION",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_USUARIO",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_ESTADO",
                    allowBlank: false
                }]
            }),

            //autoLoad: true, //First call

            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_TIPO_FUNCIONARIO",
                        "pageSize": pageSizeHijo
                    };
                }
            }
        });
		
		var storeTiposFuncionarioS= new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                method: "POST"
            }),          

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                    name: "TIPO_FUNCIONARIO_ID",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_DESCRIPCION",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_REGISTRO",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_MODIFICACION",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_USUARIO",
                    allowBlank: false
                }, {
                    name: "TIPO_FUNCIONARIO_ESTADO",
                    allowBlank: false
                }]
            }),

            //autoLoad: true, //First call

            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST_TIPO_FUNCIONARIOS",
                        "pageSize": pageSizeHijo
                    };
                }
            }
        });
		storeTiposFuncionarioS.load();

        var storePageSizeHijo = new Ext.data.SimpleStore({
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
        newFormHijo = new Ext.FormPanel({
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
            items: [ {
                fieldLabel: 'TIPO FUNCIONARIO',
                id: 'TIPOFUNCIONARIO',
                name: 'TIPOFUNCIONARIO',
                allowBlank: false,
                xtype: 'combo',
                mode: 'local',
                value: 'ACTIVO',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                emptyText: 'Seleccione ...',
                typeAhead: true,
				hiddenName:'H_TIPO_FUNCIONARIO_ID',
                displayField: 'TIPO_FUNCIONARIO_DESCRIPCION',
                valueField: 'TIPO_FUNCIONARIO_ID',
                store: storeTiposFuncionarioS
            }],
            buttons: [{
                id: 'BtnHijo',
                name: 'BtnHijo',
                iconCls: 'icon-save',
                handler: function () {
                    if (newFormHijo.getForm().isValid()) {
                         if (swP == "0") {
                        newFormHijo.getForm().submit({
                            url: '../servicios/blpFuncionariosTipoFuncionarioAjax.php?option=NEW_TIPO_FUNCIONARIO&FUNCIONARIO_ID='+global,
                            waitMsg: 'Guardando ...',
                            success: function (form, action) {
                               storeHijo(pageSizePadre, pageSizePadre, 0, global);
                                alert('Correcto');
                            },
                            failure: function (form, action) {
                                alert('Registro no adicionado');
                            }
                        });
						}else{
							//---------------MODIFICAR----------------------							
                            var rec = grdHijo.getSelectionModel().getSelected();                          
                           
							var valueId = rec.get('TIPO_FUNCIONARIO_ID');
							
                            newFormHijo.getForm().submit({
                                url: '../servicios/blpFuncionariosTipoFuncionarioAjax.php',
                                method: "POST",
                                params: {
                                    "option": "UPD_TIPO_FUNCIONARIO",
                                    "i": valueId
                                },
                                waitMsg: 'Registro Modificado ...',
                                success: function (form, action) {
                                    storeHijo(pageSizePadre, pageSizePadre, 0, global);
                                    alert('Registro Modificado ...');
                                },
                                failure: function (form, action) {
                                    alert('Registro no modificado');
                                }
                            });
						}						
                        winFormHijo.hide();
                    }
                }
            }, {
                text: 'CANCELAR',
                iconCls: 'icon-cancel',
                handler: function () {
                    winFormHijo.hide();
                }
            }]
        })

        winFormHijo = new Ext.Window({
		id: 'winFormHijo',
            name: 'winFormHijo',
            layout: 'fit',
            width: 500,
            height: 150,
            closeAction: 'hide',
            plain: true,
            items: newFormHijo
        });

        var btnNewHijo = new Ext.Action({
            id: "btnNewPadre",
            text: "ADICIONAR",
            iconCls: 'icon-add'	,		
            handler: function () {
			swH = 0;
                Ext.getCmp('TIPOFUNCIONARIO').reset();
                
				
				Ext.getCmp('BtnHijo').setText('GUARDAR');
                Ext.getCmp('winFormHijo').setTitle('NUEVO');
                Ext.getCmp('BtnHijo').setIconClass('icon-save');
                winFormHijo.show(this);
            }
        });
        ////bart
        var btnUpdHijo = new Ext.Action({
            id: "btnUpdHijo",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
				swH = 1;
                var rec = grdHijo.getSelectionModel().getSelected();
                if (!rec) {
					alert('seleccione un registro');
                    return false;
                }
                var valueId = rec.get('TIPO_FUNCIONARIO_ID');
                var valueFun = rec.get('TIPO_FUNCIONARIO_DESCRIPCION');
                var valueEst = rec.get('TIPO_FUNCIONARIO_ESTADO');

                Ext.getCmp('UPDIDTIPOFUNCIONARIO').setValue(valueId);
                Ext.getCmp('UPDTIPOFUNCIONARIO').setValue(valueFun);
                Ext.getCmp('UPDCATEGORIAESTADO').setValue(valueEst);
				
				Ext.getCmp('BtnHijo').setText('MODIFICAR');
                Ext.getCmp('winFormHijo').setTitle('MODIFICAR');
                Ext.getCmp('BtnHijo').setIconClass('icon-save');
                winFormHijo.show(this);
            }
        });

        var btnDelHijo = new Ext.Action({
            id: "btnDelHijo",
            text: "DAR BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdHijo.getSelectionModel().getSelected();
                if (!rec) {
				    alert('seleccione un registro');
                    return false;
                }
                var value = rec.get('TIPO_FUNCIONARIO_ID');
                Ext.Ajax.request({
                    url: "../servicios/blpFuncionariosTipoFuncionarioAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL_TIPO_FUNCIONARIO",
                        "i": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("", "DATO ELIMINADO");
                        storeTiposFuncionario.reload();
                    },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("", "Error");
                    }
                });
            }
        });

        var cboPageSizeHijo = new Ext.form.ComboBox({
            id: "cboPageSizeHijo",

            mode: "local",
            triggerAction: "all",
            store: storePageSizeHijo,
            valueField: "size",
            displayField: "size",
            width: 50,
            editable: false,

            listeners: {
                select: function (combo, record, index) {
                    pageSizeHijo = parseInt(record.data["size"]);
                    pagingUserHijo.pageSize = pageSizeHijo;
                    pagingUserHijo.moveFirst();
                }
            }
        });

        var pagingUserHijo = new Ext.PagingToolbar({
            id: "pagingUserHijo",

            pageSize: pageSizeHijo,
            store: storeTiposFuncionario,
            displayInfo: true,
            displayMsg: "Datos " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "Sin datos para mostrar",
            items: ["-", "Page size:", cboPageSizeHijo]
        });

        var cmodelHijo = new Ext.grid.ColumnModel({
            defaults: {
                //width:30,
                sortable: true
            },

            columns: [{
                id: "ID",
                header: "ID",
                dataIndex: "TIPO_FUNCIONARIO_ID",
                hidden: false,
                hideable: true,
                width: 50
            }, {
                header: "TIPO FUNCIONARIO",
                dataIndex: "TIPO_FUNCIONARIO_DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "REGISTRO",
                dataIndex: "TIPO_FUNCIONARIO_REGISTRO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "MODIFICACION",
                dataIndex: "TIPO_FUNCIONARIO_MODIFICACION",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "USUARIO",
                dataIndex: "TIPO_FUNCIONARIO_USUARIO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "ESTADO",
                dataIndex: "TIPO_FUNCIONARIO_ESTADO",
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({}),
                renderer: function (v, params, data) {
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                }
            }]

        });

        var smodelHijo = new Ext.grid.RowSelectionModel({
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


        var grdHijo = new Ext.grid.GridPanel({

            id: "grdHijo",
            store: storeTiposFuncionario,
            colModel: cmodelHijo,
            selModel: smodelHijo,

            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true,
            tbar: [btnNewHijo, btnUpdHijo, btnDelHijo, "->"],
            bbar: pagingUserHijo,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            listeners: {}
        });

        //Initialize events
        storeHijo(pageSizeHijo, pageSizeHijo, 0, 0);
        cboPageSizeHijo.setValue(pageSizeHijo);


        var viewport = new Ext.Viewport({
            id: 'simplevp',
            layout: 'border',
            border: false,
            items: [{
                region: 'north',
                height: 400,
                border: false,
                title: LABEL_TITLE_PANEL_1,
                collapsible: true,
                layout: 'fit',
                items: grdPadre
            }, {
                region: 'center',
                html: 'Center',
                height: 400,
                border: false,
                title: LABEL_TITLE_PANEL_2,
                collapsible: true,
                layout: 'fit',
                items: grdHijo
            }],
            renderTo: Ext.getBody()
        });
    }
}

Ext.onReady(acl.application.init, acl.application);