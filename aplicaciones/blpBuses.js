Ext.namespace("acl");
var LABEL_LOADING = "CARGANDO REGISTROS ...";
var LABEL_FAILURE_LOAD = "FALLO EN CARGAR REGISTROS ...";
var LABEL_TITLE_PANEL_1 = "ADMINISTRACION DE BUSES";
var sw = 0;
var jsNombreBoton = "NUEVO";

acl.application = {
    init: function () {
        storeProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING,
				title:'servira???????',
            });
            myMask.show();
            //AJAX USUARIOS
            Ext.Ajax.request({
                url: "../servicios/blpBusesAjax.php",
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
                    Ext.MessageBox.alert("MENSAJE", LABEL_FAILURE_LOAD);
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
                url: "../servicios/blpBusesAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{ name: "TIPO_HERRAMIENTA_ID",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_CODIGO",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_DESCRIPCION",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_ASIENTOS",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_ESTADO_A",allowBlank: false
                }, {name: "TIPO_BUSES_ID",allowBlank: false
                }, {name: "TIPO_BUSES_DESCRIPCION",allowBlank: false
                }, {name: "TIPO_BUSES_ICONO",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_PLACA",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_CHASIS",allowBlank: false
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
                url: "../servicios/blpBusesAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{name: "FUNCIONARIO_ID", allowBlank: false
                }, {name: "FUNCIONARIO",allowBlank: false
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

        //STORE TIPOS BUSES
         var storeTipo = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpBusesAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{name: "TIPO_BUSES_ID", allowBlank: false
                }, {name: "TIPO_BUSES_DESCRIPCION",allowBlank: false
                }, ]
            }),

            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "CBOTIPO",
                        "pageSize": 100000
                    };
                }
            }
        });

        storeTipo.load();


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


        //***********************
        Ext.apply(Ext.form.VTypes, {
        uppercase: function (val, field) {
                      var texto = val;
                      texto = Ext.util.Format.uppercase(texto);
                      field.setRawValue(texto);
                      return true;
                   }
        }); // funcion para volver mayusculas

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
                fieldLabel: 'NRO',
                id: 'TIPO_HERRAMIENTA_ID',
                name: 'TIPO_HERRAMIENTA_ID',
                allowBlank: false,
              
            },{
                fieldLabel: 'CODIGO',
                id: 'TIPO_HERRAMIENTA_CODIGO',
                name: 'TIPO_HERRAMIENTA_CODIGO',
                vtype: 'uppercase',
                value: "BA-",
                allowBlank: true
               
            }, {
                xtype: 'hidden',
                id: 'TIPO_HERRAMIENTA_DESCRIPCION',
                name: 'TIPO_HERRAMIENTA_DESCRIPCION',
                allowBlank: false
            }, {
                fieldLabel: 'TIPO DE BUS',
                id: 'TIPO_BUSES_DESCRIPCION',
                name: 'TIPO_BUSES_DESCRIPCION',
               allowBlank: true,
                xtype: 'combo',
                triggerAction: 'all',
                forceSelection: true,
                emptyText: 'Seleccione ...',
                typeAhead: true,
                hiddenName: 'TIPO_BUSES_ID',
                displayField: 'TIPO_BUSES_DESCRIPCION',
                valueField: 'TIPO_BUSES_ID',
                store: storeTipo,
                mode: 'local',
                listeners: {
                    select: function (combo, record, index) {
                        var idfuncionario = combo.getValue(); 
                        Ext.getCmp('TIPO_HERRAMIENTA_DESCRIPCION').setValue(idfuncionario);
                    }
                }
            }, {
                xtype: 'numberfield',
                fieldLabel: 'CANTIDAD DE ASIENTOS',
                id: 'TIPO_HERRAMIENTA_ASIENTOS',
                vtype: 'uppercase',
                name: 'TIPO_HERRAMIENTA_ASIENTOS',
                allowBlank: false
            }, {
                fieldLabel: 'NRO DE PLACA',
                id: 'TIPO_HERRAMIENTA_PLACA',
                vtype: 'uppercase',
                name: 'TIPO_HERRAMIENTA_PLACA',
                allowBlank: false
            }, {
                fieldLabel: 'CHASIS',
                id: 'TIPO_HERRAMIENTA_CHASIS',
                vtype: 'uppercase',
                name: 'TIPO_HERRAMIENTA_CHASIS',
                allowBlank: false
            }],
            buttons: [{
                text: jsNombreBoton,
                iconCls: 'icon-save',   
                id: 'Guardar',
                name: 'Guardar',
                handler: function () {
                    if (newForm.getForm().isValid()) {
                        form_action = 1;
                        //--------------ADICIONAR-----------------------
                        if (sw == "0") {
                            newForm.getForm().submit({

                                url: '../servicios/blpBusesAjax.php?option=NEW',
                                waitMsg: 'Guardando registro ...',
                                success: function (form, action) {
                                    var jsRespuesta = action.response.responseText;
                                    if(jsRespuesta=='{"success":true,"resultTotal":1,"resultRoot":[{"REGEXISTE":"EXISTE"}]}')
                                    {
                                        Ext.MessageBox.alert("MENSAJE","EL CODIGO ASIGNADO YA EXISTE");
                                    }
                                    else
                                    {           
                                        Ext.MessageBox.alert("MENSAJE","SE REGISTRO CON EXITO");
                                        storeUsuarios.reload();
                                        winForm.hide();
                                    }
                                },
                                failure: function (form, action) {
                                    Ext.MessageBox.alert("MENSAJE","ERROR!");
                                }
                            });
                        } else //---------------MODIFCAR----------------------
                        {
                            var rec = grdpnlUser.getSelectionModel().getSelected();
                            if (!rec) {
                                return false;
                            }
                            var value = rec.get('TIPO_HERRAMIENTA_ID');
                            //-------------------------------
                            newForm.getForm().submit({
                                url: '../servicios/blpBusesAjax.php',
                                method: "POST",
                                params: {
                                    "option": "UPD",
                                    "i": value
                                },
                                waitMsg: 'Registro Modificado ...',
                                success: function (form, action) {
                                    storeUsuarios.reload();
                                     Ext.MessageBox.alert("MENSAJE","SE MODIFICO CON EXITO");
                                     winForm.hide();
                                },
                                failure: function (form, action) {
                                    Ext.MessageBox.alert("MENSAJE","REGISTRO NO MODIFICADO");

                                }
                            });

                        }
                        
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
            text: "NUEVO",
            iconCls: 'icon-add',
            handler: function () {
                Ext.getCmp('TIPO_HERRAMIENTA_ID').reset();
                Ext.getCmp('TIPO_HERRAMIENTA_CODIGO').setValue("BA-");
                Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                Ext.getCmp('TIPO_HERRAMIENTA_DESCRIPCION').reset();
                Ext.getCmp('TIPO_HERRAMIENTA_ASIENTOS').reset();
                Ext.getCmp('TIPO_HERRAMIENTA_PLACA').reset();
                Ext.getCmp('TIPO_HERRAMIENTA_CHASIS').reset();
                sw = 0;
                Ext.getCmp('Guardar').setText('GUARDAR');
                Ext.getCmp('FormAdiModi').setTitle('ADICION');
                winForm.show(this);
            }
        });

        function doCargaFuncionarios(id) {
            Ext.Ajax.request({
                url: "../servicios/blpFuncionariosAjax.php",
                method: "POST",
                //params: {"option": "LST_ID", "id":id, "pageSize": 100, "limit": 100, "start": 0},
                params: {
                    "option": "LST",
                    "pageSize": 10000,
                    "limit": 10000,
                    "start": 0
                }
            });
        }

        var btnUpd = new Ext.Action({
            id: "btnUpd",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    Ext.MessageBox.alert("MENSAJE","SELECCIONE UN REGISTRO");
                    return false;
                }

                Ext.getCmp('TIPO_HERRAMIENTA_ID').setValue(rec.get('TIPO_HERRAMIENTA_ID'));
                Ext.getCmp('TIPO_HERRAMIENTA_CODIGO').setValue(rec.get('TIPO_HERRAMIENTA_CODIGO'));
                Ext.getCmp('TIPO_HERRAMIENTA_DESCRIPCION').setValue(rec.get('TIPO_HERRAMIENTA_DESCRIPCION'));
                Ext.getCmp('TIPO_BUSES_DESCRIPCION').setValue(rec.get('TIPO_BUSES_DESCRIPCION'));
                Ext.getCmp('TIPO_HERRAMIENTA_ASIENTOS').setValue(rec.get('TIPO_HERRAMIENTA_ASIENTOS'));
                Ext.getCmp('TIPO_HERRAMIENTA_PLACA').setValue(rec.get('TIPO_HERRAMIENTA_PLACA'));
                Ext.getCmp('TIPO_HERRAMIENTA_CHASIS').setValue(rec.get('TIPO_HERRAMIENTA_CHASIS'));


                var value = rec.get('TIPO_HERRAMIENTA_ID');
                winForm.show(this);
                Ext.getCmp('Guardar').setText('MODIFICAR');
                Ext.getCmp('FormAdiModi').setTitle('MODIFICACION ');
                sw = "1";

            }

        });

        var btnDel = new Ext.Action({
            id: "btnDel",
            text: "DAR DE BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    Ext.MessageBox.alert("MENSAJE","SELECCIONE UN REGISTRO");
                    return false;
                }
                var value = rec.get('TIPO_HERRAMIENTA_ID');
                var estado=rec.get('TIPO_HERRAMIENTA_ESTADO_A');
                if(estado=="LIBRE")
                {
                    Ext.MessageBox.confirm('MENSAJE', 'REALMENTE DESEA ELIMINAR EL BUS?', function (id, value2){                              
                    if (id === 'yes') { 
                        Ext.Ajax.request({
                            url: "../servicios/blpBusesAjax.php",
                            method: "POST",
                            params: {
                                "option": "DEL",
                                "i": value
                            },
                            success: function (result, request) {
                                Ext.MessageBox.alert("MENSAJE", "REGISTRO ELIMINADO");
                                storeUsuarios.reload();
                            },
                            failure: function (result, request) {
                                Ext.MessageBox.alert("MENSAJE", "ERROR!");
                            }
                        });
                      }
                    });
                }
                else{
                    Ext.MessageBox.alert("MENSAJE", "NO PUEDE ELIMINAR EL REGISTRO, YA QUE EL BUS PERTENECE A UNA RUTA");
                }
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
        var number=new Ext.grid.RowNumberer();
        var cmodel = new Ext.grid.ColumnModel({
            defaults: {
                //width:30,
                sortable: true
            },

            columns: [number,{
                id: "ID",
                header: "ID",
                dataIndex: "TIPO_HERRAMIENTA_ID",
                hidden: true,
                hideable: true,
                width: 50
            }, {
                header: "ID_TIPO",
                dataIndex: "TIPO_BUSES_ID",
                hidden: true,
                hideable: true,
                width: 50
            }, {
                header: "CODIGO",
                dataIndex: "TIPO_HERRAMIENTA_CODIGO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "TIPO DE BUS",
                dataIndex: "TIPO_BUSES_DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "CAPACIDAD",
                dataIndex: "TIPO_HERRAMIENTA_ASIENTOS",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            },{
                header: "ESTADO",
                dataIndex: "TIPO_HERRAMIENTA_ESTADO_A",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            },{
                header: "PLACA",
                dataIndex: "TIPO_HERRAMIENTA_PLACA",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            },{
                header: "CHASIS",
                dataIndex: "TIPO_HERRAMIENTA_CHASIS",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            },{header: "", dataIndex: 'TIPO_BUSES_ICONO', sortable: true, align: 'center', flex: 1, width:20, renderer: renderAcciones}  ]
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
         function renderAcciones(value, p, record) {
      //console.log(value);
      var vPant = record.data.TIPO_BUSES_ICONO;

            str = "<img src="+vPant+" title='' width='25' height='25'>"
    
            return str;
        }
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

            tbar: [btnNew, btnUpd, btnDel, "-",{
                xtype: 'label',
                text: "BUSQUEDA POR TIPO DE BUS:  ",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
          },"-",
                {   fieldLabel: 'TIPO DE BUSES',
                    id:             'cboBuses',
                    name:           'cboBuses',
                    allowBlank:     true,
                    xtype: 'combo',
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    emptyText:      'Seleccione tipo de bus',
                    typeAhead:      true,
                    hiddenName: 'TIPO_BUSES_ID',
                    displayField: 'TIPO_BUSES_DESCRIPCION',
                    valueField: 'TIPO_BUSES_ID',
                    store: storeTipo,
                    listeners: {
                            select: function (combo, record, index) {
                            globalTIPO = record.data.TIPO_BUSES_ID;
                            storeUsuarios.reload({params:{
                                            option:'LST_TIPO',
                                            'vTipo':globalTIPO   
                            }});
                            }
                        }
                },"-",{
                    id: "btnSearch",
                    text: "LIMPIAR",
                    handler: function() {
                       storeUsuarios.reload({params:{
                                            option:'LST'  
                            }});
                       Ext.getCmp('cboBuses').reset();
                    }
                }],
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