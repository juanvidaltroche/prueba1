Ext.namespace("acl");
var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Fallo en cargar los registros ...";
var LABEL_TITLE_PANEL_1 = "BUSES";
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
                url: "../servicios/blpItinerarioReporteAjax.php",
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
                url: "../servicios/blpItinerarioReporteAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{ name: "PROGRAMACION_IT_ID",allowBlank: false
                }, {name: "RUTA_DESCRIPCION",allowBlank: false
                }, {name: "TIPO_HERRAMIENTA_CODIGO",allowBlank: false
                }, {name: "PROGRAMACION_IT_FECHA_LUNES",allowBlank: false
                }, {name: "PROGRAMACION_IT_LUNES",allowBlank: false
                
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

                // ############ STORE RUTAS ############
    
    var storeRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpItinerarioReporteAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false}       
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_TURNOS"};
            }
        }
    });
    storeRutas.load();

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

        var btnImprimir = new Ext.Action({
                xtype: 'tbbutton',
                cls: 'xbtntextcon',                                       
                text: '<B>IMPRIMIR</B>',
                iconCls: 'icon-viewer',
                handler:     function onImprimir() {
                       var ruta = Ext.getCmp('cboRutas').getRawValue();
                        var fechaIni = Ext.getCmp('sFechaInicio').getRawValue();
                        var fechaFin = Ext.getCmp('sFechaFinal').getRawValue();
                        
                        Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                        var url = '../ext/fondo_blanco_1.jpg';
                        var sTitulos = ruta + "|" + fechaIni + "|" + fechaFin;
                        Ext.ux.GridPrinter.print(grdpnlUser,url,sTitulos);
                }
        }); 

        var btnBuscar = new Ext.Button({
            id: "btnBuscar",
            text: "Buscar",
            iconCls: 'icon-search',
            handler: function () {
                var ruta = Ext.getCmp('cboRutas').getValue();
                var fechaIni = Ext.getCmp('sFechaInicio').getRawValue();
                var fechaFin = Ext.getCmp('sFechaFinal').getRawValue();
               //alert(ruta);
               if(fechaIni!="" && fechaFin !="")
               {
                    storeUsuarios.reload(                                       
                        { params: 
                            {
                               option: "BUSQUEDA","vFecha": fechaIni, "vFechaF": fechaFin, "vRuta": ruta
                            }
                        }
                    );
                }
                else
                {
                    Ext.MessageBox.alert("MENSAJE","Debe llenar ambos campos de fecha");
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

            columns: [{
                header: "RUTA",
                dataIndex: "RUTA_DESCRIPCION",
                hidden: false,
                hideable: true,
                width: 50
            },{
                header: "CODIGO BUS",
                dataIndex: "TIPO_HERRAMIENTA_CODIGO",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "CONDUCTOR",
                dataIndex: "PROGRAMACION_IT_LUNES",
                align: "left",
                hidden: false,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "ANFITRION",
                dataIndex: "ANFITRION_NOMBRE",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "TURNO",
                dataIndex: "TURNO_HORA",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }, {
                header: "DIA",
                dataIndex: "DIA_FECHA",
                align: "left",
                hidden: true,
                hideable: true,
                editor: new Ext.form.TextField({})
            }]
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
            store: storeUsuarios,
            colModel: cmodel,
            selModel: smodel,

            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column

            tbar: [btnImprimir, "->",
                {   fieldLabel: 'RUTAS',
                    id:             'cboRutas',
                    name:           'cboRutas',
                    allowBlank:     true,
                    xtype: 'combo',
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    emptyText:      'Seleccione una ruta',
                    typeAhead:      true,
                    // hiddenName:     'RUTA_ID',
                    displayField:   'RUTA_DESCRIPCION',
                    valueField:     'RUTA_ID',
                    store:          storeRutas,
                    listeners: {
                            select: function (combo, record, index) {
                            globalRUTA_ID = record.data.RUTA_ID;
                            globalRUTA_DESCRIPCION = record.data.RUTA_DESCRIPCION;
                            console.log(globalRUTA_ID);
                            storeUsuarios.reload({params:{
                                            option:'LST_RUTA',
                                            'vRuta':globalRUTA_ID   
                            }});
                            }
                        }
                },
                {   text: "------- FECHA DE REPORTE: ",
                    //name: 'jsCampoLabelFechaClonacion',
                    style: 'font-weight:bold;',
                    anchor:'93%'
                },{
                    fieldLabel: 'DESDE',
                    id: 'sFechaInicio',
                    name: 'sFechaInicio',
                    allowBlank: true,
                    xtype: 'datefield',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,                                            
                    //emptyText: 'Desde',
                    typeAhead: true,
                    mode: 'local',
                    width: 100,                                          
                    format: 'Y/m/d'

                },{ text: "------- HASTA: ",
                    //name: 'jsCampoLabelFechaClonacion',
                    style: 'font-weight:bold;',
                    anchor:'93%'
                },{
                    fieldLabel: 'HASTA',
                    id: 'sFechaFinal',
                    name: 'sFechaFinal',
                    allowBlank: true,
                    xtype: 'datefield',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,
                    //emptyText: 'Hasta',
                    typeAhead: true,
                    mode: 'local',
                    width: 100,        
                    format: 'Y/m/d'
                },btnBuscar],
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