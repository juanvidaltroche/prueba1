Ext.namespace("acl");
var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = ".....:: REPORTE - BUSQUEDA ::..";

var rutaid    =0;
var usuarioid =0;
var sturno = 0;
var jsfecha1  = new Date().format('Y-m-d').toString();

var fechas = new Date().format('Y-m-d').toString();


acl.application = {
    init: function () {		
	    Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
	       	return v +  parseFloat(record.data.lqd_monto) ;
	    };
		 Ext.ux.grid.GroupSummary.Calculations['normal'] = function(v, record, field){
	        return v +  parseFloat(record.data.impNormal) ;
	    };
		Ext.ux.grid.GroupSummary.Calculations['preferencial'] = function(v, record, field){
	        return v +  parseFloat(record.data.impPreferencial) ;
	    };
		Ext.ux.grid.GroupSummary.Calculations['nocturno'] = function(v, record, field){
	        return v +  parseFloat(record.data.impNocturno) ;
	    };
		Ext.ux.grid.GroupSummary.Calculations['sobrante'] = function(v, record, field){	       
	        return v +  parseFloat(record.data.lqd_montosf) ;
	    };
		Ext.ux.grid.GroupSummary.Calculations['totalRecaudado'] = function(v, record, field){	       
	        return v +  parseFloat(record.data.totalRecaudado) ;
	    };
	
	        // utilize custom extension for Group Summary
	    var summary = new Ext.ux.grid.GroupSummary();
	
        storeUserProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            Ext.Ajax.request({
                url: "../servicios/blpReporteAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                    
                },
                success: function (result, request) {
                    storeUser.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
            
        };

        var pageSize = parseInt(200 /*CONFIG.pageSize*/ );

        var storeUser = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpReporteAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "lqd_ruta_id",
                        allowBlank: false
                    },{
                        name: "ruta",
                        allowBlank: false
                    },{
                        name: "lqd_id",
                        allowBlank: false
                    }, {
                        name: "LQD_CAJERO",
                        allowBlank: false
                    }, {
                        name: "cajero",
                        allowBlank: false
                    }, {
                        name: "lqd_anfitrion",
                        allowBlank: false
                    }, {
                        name: "anfitrion",
                        allowBlank: false
                    }, {
                        name: "bus",
                        allowBlank: false
                    }, {
                        name: "lqd_nd",
                        allowBlank: false
                    }, {
                        name: "impNormal",
                        allowBlank: false
                    }, {
                        name: "lqd_pd",
                        allowBlank: false
                    }, {
                        name: "impPreferencial",
                        allowBlank: false
                    }, {
                        name: "lqd_nn",
                        allowBlank: false
                    }, {
                        name: "impNocturno",
                        allowBlank: false
                    }, {
                        name: "cantTotal",
                        allowBlank: false
                    }, {
                        name: "lqd_monto",
                        allowBlank: false
                    }, {
                        name: "lqd_registro",
                        allowBlank: false
                    }, {
                        name: "lqd_montosf",
                        allowBlank: false
                    }, {
                        name: "totalRecaudado",
                        allowBlank: false
                    }, {
                        name: "lqd_nro_magico",
                        allowBlank: false
                    }

                ]
            }),
			groupField: 'cajero',
			sortInfo: {
				field:"cajero", 
				direction:"ASC"
				}, 
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "pageSize": pageSize                        
                    };
                }
            }
        });       

        //**************************************STORES TIPOS ATENCION************************
       

        /***************************************************PIE DE PAGINA*********************************/

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

        //*********************************************botones************************************************/

        newForm = new Ext.FormPanel({
            width: 600,
            autoHeight: true,
            height: 200,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 150,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'TELEFONO',
                id: 'SAC_TELEFONO',
                readOnly: true,
                name: 'SAC_TELEFONO',
                allowBlank: true
            }, {
                fieldLabel: 'DESCRIPCION',
                id: 'TIPO_DESCRIPCION',
                readOnly: true,
                name: 'TIPO_DESCRIPCION',
                allowBlank: true
            }, {
                fieldLabel: 'NOMBRE COMPLETO',
                id: 'SAC_NOMBRE_COMPLETO',
                name: 'SAC_NOMBRE_COMPLETO',
                readOnly: true
            }, {
                fieldLabel: 'CEDULA DE IDENTIDAD',
                id: 'SAC_CI',
                name: 'SAC_CI',
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'EXPEDIDO',
                id: 'SAC_EXPEDIDO',
                name: 'SAC_EXPEDIDO',
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'DIRECCION',
                id: 'SAC_DIRECCION',
                name: 'SAC_DIRECCION',
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'INFORMACION',
                id: 'SAC_INFORMACION',
                name: 'SAC_INFORMACION',
                xtype: 'htmleditor',
                height: 80,
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'ACLARACIONES',
                id: 'SAC_ACLARACIONES',
                name: 'SAC_ACLARACIONES',
                xtype: 'htmleditor',
                height: 80,
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'ACCIONES INICIALES',
                id: 'SAC_INF_INICIAL',
                name: 'SAC_INF_INICIAL',
                xtype: 'htmleditor',
                height: 80,
                readOnly: true,
                allowBlank: true
            }, {
                fieldLabel: 'ACCIONES DE CONCLUSION',
                id: 'SAC_INF_CONCLUIDO',
                name: 'SAC_INF_CONCLUIDO',
                xtype: 'htmleditor',
                height: 90,
                allowBlank: false
            }, {
                fieldLabel: 'ESTADO TICKET',
                id: 'SAC_ESTADO_TICKET',
                name: 'SAC_ESTADO_TICKET',
                allowBlank: true,
                xtype: 'combo',
                mode: 'local',
                //value:          'Expedido en',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                typeAhead: true,
                displayField: 'name',
                valueField: 'value',
                store: new Ext.data.JsonStore({
                    fields: ['name', 'value'],
                    data: [{
                        name: 'POR ATENDER',
                        value: 'POR ATENDER'
                    }, {
                        name: 'EN PROCESO',
                        value: 'EN PROCESO'
                    }, {
                        name: 'PROCESADO',
                        value: 'PROCESADO'
                    }, {
                        name: 'CONCLUIDO',
                        value: 'CONCLUIDO'
                    }]
                })
            }]
        });

        //*********************Ventana de la adicion sus dimensiones*******************//
        winForm = new Ext.Window({
            layout: 'fit',
            id: 'FormMayoristaAdiModi',
            name: 'FormMayoristaAdiModi',
            width: 650,
            height: 220,
            closeAction: 'hide',
            plain: true,
            title: 'CASOS',
            modal: true,
            items: newForm
        });

        //BOTON FINALIZADOS
        var btnFinalizadas = new Ext.Action({
            id: "btnFinalizadas",
            text: "FINALIZADOS",
            iconCls: 'icon-repositorio1',
            handler: function () {
                var vEstadoAtencion = 'TERMINADO';
                storeUser.reload({
                    params: {
                        option: "BUSQUEDAPOROPCIONES",
                        "ESTADO": vEstadoAtencion
                    }
                })
            }
        });

        //BOTON ADICION
        var btnNew = new Ext.Action({
            id: "btnAdicionar",
            text: "ADICIONAR",
            //iconCls: 'icon-add',
            cls: 'xbtntextcon',
            icon: '../imagenes/adicionar.gif',
            handler: function () {
                Ext.getCmp('nombre').reset();
                Ext.getCmp('edad').reset();
                Ext.getCmp('ci').reset();
                winForm.show(this);
                sw = "0";
                Ext.getCmp('btnGuardar').setText('GUARDAR');
                Ext.getCmp('FormMayoristaAdiModi').setTitle('NUEVO CASO');
                Ext.getCmp('btnGuardar').setIconClass('icon-save')
            }
        });

        //--------------------------------------------------------------------------------------------//

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
                    pagingUser.moveFirst()
                }
            }
        });

        // nuevo irmita 25022014
        var btnImprimir = new Ext.Action({
            id: "btnImprimir",
            text: 'IMPRIMIR',
            iconCls: 'icon-viewer',
            handler: function () {
                var total = ''; // Ext.getCmp('SUMA_TOTAL').getValue();
                //alert(total);
                Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                var url = '../ext/fondo_blanco_1.jpg';
                var sTitulos = "<font size='2' align='right'color='green'><b>REPORTE DIARIO DE RECAUDO POR VENTANILLA DE RECAUDO</b></font>|||<b>TOTAL RECAUDADO</b>|<b>Bs." + total + "</b>";
                Ext.ux.GridPrinter.print(grdpnlUser, url, sTitulos);
            }
        });

        //****************************************PAGINADO******************************************************//

        var pagingUser = new Ext.PagingToolbar({
            id: "pagingUser",
            pageSize: pageSize,
            store: storeUser,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSize]
        });

        //***************************************GRILLA**************************************************************//

        function renderModificar(val, p, record) {
            var idTramite = record.data.id_tramite;
            str = '';
            str = "<img src='../../extJs/images/modificar.gif', alt='**Editar**' title='Editar'></a>";
            return str
        }

        var cmodel = new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [{
                    header: 'lqd_ruta_id',                  
                    id: 'lqd_ruta_id',
                    name: 'lqd_ruta_id',
                    dataIndex: "lqd_ruta_id",
					hideable:true,
					hidden:true
                },{
                    header: 'Ruta',                  
                    id: 'ruta',
                    name: 'ruta',
                    dataIndex: "ruta",
					hideable:true,
					hidden:false
                },{
                    header: 'lqd_id',                  
                    id: 'lqd_id',
                    name: 'lqd_id',
                    dataIndex: "lqd_id",
					hideable:true,
					hidden:true
                },{
                    header: 'LQD_CAJERO',                   
                    id: 'LQD_CAJERO',
                    name: 'LQD_CAJERO',
                    dataIndex: "LQD_CAJERO",
					hideable:true,
					hidden:true                   
                },{
                    header: 'cajero',                   
                    id: 'cajero',
                    name: 'cajero',
                    dataIndex: "cajero",
					hideable:true,
					hidden:true                   
                },{
                    header: 'lqd_anfitrion',                   
                    id: 'lqd_anfitrion',
                    name: 'lqd_anfitrion',
                    dataIndex: "lqd_anfitrion",
					hideable:true,
					hidden:true                   
                },{
                    header: 'Anfitrion',                   
                    id: 'anfitrion',
                    name: 'anfitrion',
                    dataIndex: "anfitrion",
					hideable:true,
					hidden:false                   
                },{
                    header: 'Bus',                   
                    id: 'bus',
                    name: 'bus',
                    dataIndex: "bus",
					hideable:true,
					hidden:false                   
                },{
                    header: 'Normales',                   
                    id: 'lqd_nd',
                    name: 'lqd_nd',
                    dataIndex: "lqd_nd",
					hideable:true,
					hidden:false, 
					renderer: function (value, meta) {
						meta.css = 'rojo';
						return value;
					}                   
                },{
                    header: 'Normal(Bs.)',                   
                    id: 'impNormal',
                    name: 'impNormal',
                    dataIndex: "impNormal",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'normal',
					renderer: function (value, meta) {
						meta.css = 'rojo';
						return Ext.util.Format.usMoney(value);
					}                         
                },{
                    header: 'Preferenciales',                   
                    id: 'lqd_pd',
                    name: 'lqd_pd',
                    dataIndex: "lqd_pd",
					hideable:true,
					hidden:false, 
					renderer: function (value, meta) {
						meta.css = 'azul';
						return value;
					}                         
                },{
                    header: 'Preferencial(Bs.)',                   
                    id: 'impPreferencial',
                    name: 'impPreferencial',
                    dataIndex: "impPreferencial",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'preferencial',
					renderer: function (value, meta) {
						meta.css = 'azul';
						return Ext.util.Format.usMoney(value);
					}      
                },{
                    header: 'Nocturnos',                   
                    id: 'lqd_nn',
                    name: 'lqd_nn',
                    dataIndex: "lqd_nn",
					hideable:true,
					hidden:false, 
					renderer: function (value, meta) {
						meta.css = 'verde';
						return value;
					}                         
                },{
                    header: 'Nocturno(Bs.)',                   
                    id: 'impNocturno',
                    name: 'impNocturno',
                    dataIndex: "impNocturno",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'nocturno',
					renderer: function (value, meta) {
						meta.css = 'verde';
						return Ext.util.Format.usMoney(value);
					}                         
                },{
                    header: 'Total',                   
                    id: 'cantTotal',
                    name: 'cantTotal',
                    dataIndex: "cantTotal",
					hideable:true,
					hidden:false, 
					renderer: function (value, meta) {
						meta.css = 'amarillo';
						return value;
					}                   
                },{
                    header: 'Monto(Bs.)',                   
                    id: 'lqd_monto',
                    name: 'lqd_monto',
                    dataIndex: "lqd_monto",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'totalCost',
					renderer: function (value, meta) {
						meta.css = 'amarillo';
						return Ext.util.Format.usMoney(value);
					}										
                },{
                    header: 'Sobrante(Bs.)',                   
                    id: 'lqd_montosf',
                    name: 'lqd_montosf',
                    dataIndex: "lqd_montosf",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'sobrante',
					renderer: function (value, meta) {
						meta.css = 'morado';
						return Ext.util.Format.usMoney(value);
					}                  
                },{
                    header: 'Total Recaudado(Bs.)',                   
                    id: 'totalRecaudado',
                    name: 'totalRecaudado',
                    dataIndex: "totalRecaudado",
					hideable:true,
					hidden:false,
					align:'right', 
					summaryType: 'totalRecaudado',
					renderer: function (value, meta) {
						meta.css = 'amarillo';
						return Ext.util.Format.usMoney(value);
					}                  
                },{
                    header: 'Registrado',                   
                    id: 'lqd_registro',
                    name: 'lqd_registro',
                    dataIndex: "lqd_registro",
					hideable:true,
					hidden:false                   
                },{
                    header: 'Nro. Magico',                   
                    id: 'lqd_nro_magico',
                    name: 'lqd_nro_magico',
                    dataIndex: "lqd_nro_magico",
					hideable:true,
					hidden:true                   
                }
            ]
        });
        var smodel = new Ext.grid.RowSelectionModel({
            listeners: {
                rowselect: function (sm) {},
                rowdeselect: function (sm) {}
            }
        });

        //------------------------------------------------nombre de la grilla--------------------------///

        winExport = new Ext.Window({
            layout: 'fit',
            width: '700',
            height: '480',
            id: 'FormProveedores',
            name: 'FormProveedores',
            closeAction: 'hide',
            plain: true,
            modal: true,
            title: 'NUEVO REGISTRO',
            items: [{
                text: 'xx Exportar a XLS xx',
                xtype: 'tbbutton',
                id: "xxx",
                iconCls: 'icon-zoom',
                defaultType: 'splitbutton',
                handler: function () {
                    storeUser.reload({
                        params: {
                            option: "BUSQUEDAGENERAL",
                            "vFechaInicio": vFechaInicio,
                            "vFechaFinal": vFechaFinal,
                            "USUARIO": usuario,
                            "ATENCION": atencion,
                            "CIUDADANO": ciudadano,
                            "pageSize": 10000,
                            "limit": 10000,
                            "start": 0
                        }
                    });
                }
            }]
        });   

		 //--- combos dependientes

        var btnNewBuscar = new Ext.Action({
            id: 'btnCadenaBuscar',
            xtype: 'button',
            cls: 'x-btn-text-icon',
            icon: '../../extJs/images/zoom.ico',
            handler: function () {
                storeSon.reload({
                    params: {
                        P: jsGlobalPRC_ID,
                        C: jsGlobalCTRL_ID,
                        D: jsGlobalDMN_ID,
                        T: Ext.get('txtCadenaBuscar').getValue(),
                        option: 'LST_BSQ'
                    }
                });
            }.createDelegate(this)
        });

        var storeCbxRuta = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpReporteAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [
				{name: "RUTA_ID",allowBlank: false}, 
				{name: "RUTA_DESCRIPCION",allowBlank: false}, 
				{name: "RUTA_DETALLE",allowBlank: false}, 
				{name: "RUTA_REGISTRO",allowBlank: false}, 
				{name: "RUTA_MODIFICACION",allowBlank: false}, 
				{name: "RUTA_USUARIO",allowBlank: false}, 
				{name: "RUTA_ESTADO",allowBlank: false}]
            })
        });
		storeCbxRuta.on('load', function(){
				storeCbxRuta.add(new storeCbxRuta.recordType({
					RUTA_ID: 0,
					RUTA_DESCRIPCION: '-- TODOS --'
				}, 0));
				});
        storeCbxRuta.load({
            params: {
                option: 'LST_RUTA',
				pageSize:10000,
				limit:10000,
				start:0
            }
        });

        var storeCbxCajero = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpReporteAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [
				{name: "UTF_ID",allowBlank: false}, 
				{name: "UTF_USUARIO_ID",allowBlank: false}, 
				{name: "UTF_TIPO_FUNCIONARIO_ID",allowBlank: false}, 
				{name: "UTF_REGISTRADO",allowBlank: false}, 
				{name: "UTF_MODIFICADO",allowBlank: false}, 
				{name: "UTF_USUARIO",allowBlank: false}, 
				{name: "UTF_ESTADO",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_ID",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_DESCRIPCION",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_REGISTRO",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_MODIFICACION",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_USUARIO",allowBlank: false}, 
				{name: "TIPO_FUNCIONARIO_ESTADO",allowBlank: false}, 
				{name: "USUARIO_ID",allowBlank: false}, 
				{name: "USUARIO_FUNCIONARIO_ID",allowBlank: false}, 
				{name: "USUARIO_CODIGO",allowBlank: false}, 
				{name: "USUARIO_CLAVE",allowBlank: false}, 
				{name: "USUARIO_CONTROLAR_IP",allowBlank: false}, 
				{name: "USUARIO_REGISTRADO",allowBlank: false}, 
				{name: "USUARIO_MODIFICADO",allowBlank: false}, 
				{name: "USUARIO_USUARIO",allowBlank: false}, 
				{name: "USUARIO_ESTADO",allowBlank: false}, 
				{name: "USUARIO_CORREO",allowBlank: false}, 
				{name: "USUARIO_TIPO_USUARIO",allowBlank: false}, 
				{name: "USUARIO_DOMINIO",allowBlank: false}
				]
            })
        });
		storeCbxCajero.on('load', function(){
				storeCbxCajero.add(new storeCbxCajero.recordType({
					USUARIO_FUNCIONARIO_ID: 0,
					USUARIO_CODIGO: '-- TODOS --'
				}, 0));
				});
		
        storeCbxCajero.load({
            params: {
                option: 'LST_CAJERO',
				pageSize:10000,
				limit:10000,
				start:0
            }
        });        
        //--
        var cbxRuta = new Ext.form.ComboBox({
			fieldLabel: 'RUTA',
            id: 'cbxRuta',
            mode: 'local',
            triggerAction: 'all',
            store: storeCbxRuta,
            value: 'Seleccione la Ruta',
            valueField: 'RUTA_ID',
            displayField: 'RUTA_DESCRIPCION',
            width: 235,
            editable: false,
            listeners: {
                select: function (combo, record, index) {
                    rutaid = record.data.RUTA_ID;					
                    storeUser.load({
                        params: {
                            idRuta: rutaid,
                            idCajero: usuarioid,
                            fecha1: jsfecha1,
							turno:	sturno,
                            option: 'BUSQUEDA',
							pageSize:25,
							limit:1000000,
							start:0
                        }
                    });
                }
            }
        });
        var cmbCajero = new Ext.form.ComboBox({
			fieldLabel: 'CAJERO',
            id: 'cmbCajero',
            mode: 'local',
            triggerAction: 'all',
            store: storeCbxCajero,
            value: 'Seleccione un Cajero',
            valueField: 'USUARIO_FUNCIONARIO_ID',
            displayField: 'USUARIO_CODIGO',
            width: 235,
            editable: false,
            listeners: {
                select: function (combo, record, index) {
				
				
                
                    usuarioid = record.data.USUARIO_FUNCIONARIO_ID;                    
					storeUser.load({
                        params: {
                            idRuta: rutaid,
                            idCajero: usuarioid,
                            fecha1: jsfecha1, 
							turno:	sturno,							
                            option: 'BUSQUEDA',
							pageSize:25,
							limit:1000000,
							start:0
                        }
                    });
                }
            }
        });

		var cmbTurno = new Ext.form.ComboBox({
			fieldLabel: 'TURNO',
            id: 'cmbTurno',
            mode: 'local',
            triggerAction: 'all',
            store:  new Ext.data.JsonStore({
                    fields: ['turno', 'value'],
                    data: [
					{
                        turno: '-- TODO EL DIA--',
                        value: '0'
                    },
					{
                        turno: 'DIURNO',
                        value: '1'
                    }, {
                        turno: 'TARDE',
                        value: '2'
                    }, {
                        turno: 'NOCHE',
                        value: '3'
                    }]
                }),
            value: 'Seleccione un turno',
            valueField: 'value',
            displayField: 'turno',
            width: 235,
            editable: false,
            listeners: {
                select: function (combo, record, index) {
                    sturno = record.data.value;					
					
					storeUser.load({
                        params: {
                            idRuta: rutaid,
                            idCajero: usuarioid,
                            fecha1: jsfecha1,
							turno:	sturno,						
                            option: 'BUSQUEDA',
							pageSize:25,
							limit:1000000,
							start:0
                        }
                    });
                }
            }
        });

        var btnTextClear = new Ext.Action({
            id: 'btnTextClear',
            xtype: 'button',
            text: "LIMPIAR",

            handler: function () {
                rutaid    = 0;
				usuarioid = 0;
				jsfecha1  = fechas;				

                Ext.getCmp('cbxRuta').reset();
                Ext.getCmp('cmbCajero').reset();               

            }.createDelegate(this)
        });
		
		var fecha = new Ext.form.DateField({
		fieldLabel: "FECHA",
    	format: 'Y-m-d', 
		maxValue: new Date(), 
		minValue:'2014-02-28', 
    	value: new Date(),
		listeners:
		{
			select:function(A,B)
			{				
				fecha=B.format('Y-m-d').toString();   
				jsfecha1= fecha;				
				storeUser.load({
                        params: {
                            idRuta: rutaid,
                            idCajero: usuarioid,
                            fecha1: fecha, 
							turno:	sturno,							
                            option: 'BUSQUEDA',
							pageSize:25,
							limit:1000000,
							start:0
                        }
                    });                                
			}			
		}
    	
		});
		//---
		//----
		//--
		var formxx = new Ext.form.FormPanel({
            title: 'FORMULARIO - CAMPOS',
            autoHeight: true,
            collapsible: true,
            bodyStyle: 'padding: 5px',
            defaults: {
                anchor: '0'
            },
            viewConfig: {
                forceFit: true
            },
            items: [{
                xtype: 'fieldset',
                layout: 'column',
                width: '95%',
                title: 'DETALLE',
                height: '100%',
                collapsible: true,

                items: [{
                    layout: 'form',
                    labelWidth: 90,
                    border: false,
                    bodyStyle: 'padding:0px 0px 0px 10px',
                    items: [cbxRuta]
                }, {
                    layout: 'form',
                    labelWidth: 90,
                    border: false,
                    bodyStyle: 'padding:0px 0px 0px 10px',
                    items: [cmbCajero]
                }, {
                    layout: 'form',
                    labelWidth: 90,
                    border: false,
                    bodyStyle: 'padding:0px 0px 0px 10px',
                    items: [cmbTurno]
                },{
                    layout: 'form',
                    labelWidth: 90,
                    border: false,
                    bodyStyle: 'padding:0px 0px 0px 10px',
                    items: [fecha]
                },new Ext.Button({
                        text: 'Limpiar',                      
                        width: 50,
                        handler: function () {
							rutaid    = 0;
							usuarioid = 0;
							sturno = 0;
							jsfecha1  = fechas;
							jsfecha2  = fechas;			
							Ext.getCmp('cbxRuta').reset();
							Ext.getCmp('cmbCajero').reset();
							Ext.getCmp('cmbTurno').reset();
							storeUser.load({
                        params: {
                            idRuta: rutaid,
                            idCajero: usuarioid,
                            fecha1: fecha,                          
                            option: 'BUSQUEDA',
							pageSize:25,
							limit:1000000,
							start:0
                        }
                    });  						
						}.createDelegate(this)
                    })]
            }]          
        });	
		
        //---

        var grdpnlUser = new Ext.grid.GridPanel({
            id: "grdpnlUser",
            store: storeUser,
            colModel: cmodel,
            selModel: smodel,
			plugins: summary,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
			view : new Ext.grid.GroupingView({  
				forceFit            : true,  
				ShowGroupName       : true,  
				enableNoGroup       : false,  
				enableGropingMenu   : false,  
				emptyText: 'No existen registros',
				hideGroupedColumn   : true  
			}),
            enableColumnResize: true,
            enableHdMenu: true, 
			style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '700',
            title: LABEL_TITLE_PANEL_1,            
            tbar: new Ext.Toolbar({
                    buttons: [{
                        id: 'grid-excel-button',
                        text: 'Excel...',
                       handler: function(){
						  document.location="reporteexcel.php?idRuta="+rutaid+"&idCajero="+usuarioid+"&fecha1="+jsfecha1+"&sturno="+sturno+"";						   
                       }				 
                    }]
                }),
            bbar: pagingUser,            
            listeners: {}
        });

        //Initialize events
        storeUserProcess(pageSize, pageSize, 0);
        cboPageSize.setValue(pageSize);

        var grdpnlUser2 = new Ext.grid.GridPanel({
            id: "grdpnlUser2",
            store: storeUser,
            colModel: cmodel,
            selModel: smodel,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
			view : new Ext.grid.GroupingView({  
				forceFit            : true,  
				ShowGroupName       : true,  
				enableNoGroup       : false,  
				enableGropingMenu   : false,  
				emptyText: 'No existen registros',
				hideGroupedColumn   : true  
			}), 
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column
            //tbar: [	],
            //bbar: pagingUser,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '800',
            //title: LABEL_TITLE_PANEL_1
        });        
		
		 var formdd = new Ext.form.FormPanel({
            layout: 'fit',
            preventHeader: false,
            header: false,
            collapsible: true,
            bodyStyle: 'padding: 5px',
            defaults: {
                anchor: '1000'
            },
            items: [grdpnlUser]
        });

         var viewport = new Ext.Viewport({
            layout: 'fit',
            renderTo: document.body,
            items: [formxx, formdd]
        });
    }
}

Ext.onReady(acl.application.init, acl.application);