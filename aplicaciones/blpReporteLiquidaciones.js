Ext.namespace("acl");
var jsAccion = "NEW";
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "REPORTE CONSOLIDADO TOTAL DIARIO";

var LABEL_BTN_SEARCH = "Search",
    LABEL_MSG_SEARCH = "search ...";
	
var vFechaInicio='';
var vFechaFinal='';
var usuario='';
var vFechaInicio='';
var vFechaFinal='';
var usuario='';	
var atencion='';
var ciudadano=''; 	
	
//VARIABLE PARA OBTENER TOTALES
var summary = new Ext.ux.grid.GroupSummary();
Ext.ux.grid.GroupSummary.Calculations["totalCost"] = function (v, record, field) {
    return v + (record.data.MONTO)
};

//VARIABLE TEXTO PARA VISUALIZAR LA SUMA TOTAL 
txtTotal = new Ext.form.NumberField({
    allowBlank: false,
    allowNegative: false,
    fieldLabel: 'TOTAL',
    id: 'SUMA_TOTAL',
    name: 'SUMA_TOTAL',
    allowBlank: false,
    disabled: true,
});

acl.application = {
    init: function () {
        storeUserProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            //myMask.show();
            //Ajax grilla 
            Ext.Ajax.request({
                url: "../servicios/blpReporteLiquidacionesAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    var x = Ext.util.JSON.decode(result.responseText);
                    if (x.resultTotal == 0) {
                        Ext.getCmp('SUMA_TOTAL').setValue('0.00');
                    } else {
                        Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].TOTAL);
                    }

                    //console.log(Ext.util.JSON.decode(result.responseText));
                    console.log(x.resultTotal);
                    storeLiquidaciones.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
        }
        onMnuContext = function (grid, rowIndex, e) {
            e.stopEvent();
            var coords = e.getXY();
            mnuContext.showAt([coords[0], coords[1]]);
        };

        //Variables declared in html file
        var pageSize = parseInt(1050 /*CONFIG.pageSize*/ );
        var message = "por implementar ..."; // CONFIG.message;
        //store grilla
        var storeLiquidaciones = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpReporteLiquidacionesAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [ {
                    name: "FECHA_REGISTRO",
                    allowBlank: false
                }, {
                    name: "CAJERO",
                    allowBlank: false
                }, {
                    name: "USUARIO",
                    allowBlank: false
                }, {
                    name: "HERRAMIENTA",
                    allowBlank: false
                }, {
                    name: "NORMAL",
                    allowBlank: false
                }, {
                    name: "NOCTURNO",
                    allowBlank: false
                }, {
                    name: "PREFERENTE",
                    allowBlank: false
                }, {
                    name: "MONTO",
                    allowBlank: false,
                    type: 'float'
                }, {
                    name: "TOTAL",
                    allowBlank: false,
                    type: 'float'
                }]
            }),			
            groupField: 'FECHA_REGISTRO',
            sortInfo: {
                field: "FECHA_REGISTRO"
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

        //fin store

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

        var btnImprimir = new Ext.Action({
            id: "btnImprimir",
            text: '<b>Imprimir</b>',
            iconCls: 'icon-viewer',
            handler: function () {
                var total = Ext.getCmp('SUMA_TOTAL').getValue();
                //alert(total);
                Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                var url = '../ext/fondo_blanco_1.jpg';
                var sTitulos = "<font size='2' align='right'color='green'><b>REPORTE CONSOLIDADO TOTAL DIARIO</b></font>|||<b>TOTAL RECAUDADO</b>|<b>Bs." + total + "</b>";
                Ext.ux.GridPrinter.print(grdpnlUser, url, sTitulos);
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
            store: storeLiquidaciones,
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
                header: "<font><b>FECHA DE REGISTRO</b></font>",
                dataIndex: "FECHA_REGISTRO",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "<font color='black'><b>CAJERO</b></font>",
                dataIndex: "CAJERO",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "<font color='black'><b>DESCRIPCION HERRAMIENTA</b></font>",
                dataIndex: "HERRAMIENTA",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({}),
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '<font color="green"><b> SUB TOTAL</b></font>' : '<font color="green"><b>SUB TOTAL</b></font>');
                }
            },{
                header: "<font><b>NORMAL</b></font>",
                dataIndex: "NORMAL",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            },{
                header: "<font><b>NOCTURNO</b></font>",
                dataIndex: "NOCTURNO",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            },{
                header: "<font><b>PREFERENTE</b></font>",
                dataIndex: "PREFERENTE",
                width: 30,
                align: "left",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({})
            }, {
                header: "<font color='black'><b>MONTO</b></font>",
                dataIndex: "MONTO",
                width: 15,
                align: "right",
                hidden: false,
                hideable: false,
                editor: new Ext.form.TextField({}),
                renderer: function (value, style, record, row, col, store, grid) {
                    return ((value === 0 || value > 1) ? '<font color="blue">Bs. ' + parseFloat(value).toFixed(2) + '</font>' : '<font color="blue">Bs. ' + parseFloat(value).toFixed(2) + '</font>');
                },
                summaryType: "totalCost",
                summaryRenderer: Ext.util.Format.usMoney
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

        var btnTotal = new Ext.Action({
            id: "btnTotal",
            text: '<font size="2"><b>TOTAL</b></font>',
            disabled: false

        });		
		
		var btnExport = new Ext.Action({
			id: "btnExport",
			text: "EXPORTAR",
			iconCls: 'icon-add',
			closable: false,
			plain: true,
			handler: function() {
				winExport.show(this);
				storeLiquidaciones.load({
					params: {
						option: "LST", "pageSize": 10000, "limit": 10000, "start": 0
					}
				});
			}
		});		

        var grdpnlUser = new Ext.grid.GridPanel({
            id: "grdpnlUser",
            store: storeLiquidaciones,
            colModel: cmodel,
            selModel: smodel,
            plugins: summary,
            emptyText: 'No existen registros',
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            view: new Ext.grid.GroupingView({
                forceFit: true,
                ShowGroupName: true,
                enableNoGroup: false,
                enableGropingMenu: false,
                emptyText: 'No existen registros',
                hideGroupedColumn: true
            }),
            view: new Ext.grid.GroupingView({
                forceFit: true,
                ShowGroupName: true,
                enableNoGroup: false,
                enableGropingMenu: false,
                startCollapsed: true,
                //groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})', 
                emptyText: 'No existen registros',
                hideGroupedColumn: true
            }),
            features: [{
                ftype: 'totalCost'
            }],
            enableColumnResize: true,
            enableHdMenu: true,
            tbar: [btnImprimir,btnExport],
            bbar: [btnTotal, txtTotal],
            border: false,
            stripeRows: true,
            loadMask: true,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: '<img src="../ext/images/default/dd/application_form_edit.png  "><font size="2"><b>REPORTE CONSOLIDADO TOTAL DIARIO</b></font>',
            renderTo: "divMain",
            listeners: {}
        }); 		
		
		var grdpnlUser1 = new Ext.grid.GridPanel({
            id: "grdpnlUser1",
            store: storeLiquidaciones,
            colModel: cmodel,
            selModel: smodel,          
            emptyText: 'No existen registros',          
            viewConfig: {
                forceFit: true
            },           
            features: [{
                ftype: 'totalCost'
            }],            
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: '<img src="../ext/images/default/dd/application_form_edit.png  "><font size="2"><b>REPORTE CONSOLIDADO TOTAL DIARIO</b></font>',
            
        });
		//juan
		
		winExport = new Ext.Window({
			layout: 'fit',
			width: '80%',
			height: '600',		
			id: 'FormProveedores',
			name: 'FormProveedores',
			closable: false,
			plain: true,
			modal: true,
			title: 'RESULTADO DE BUSQUEDA',
			items: [grdpnlUser1],
			buttons: [
				{
					xtype: 'exportbutton',
					text: 'EXPORTAR A EXCEL',
					store: storeLiquidaciones
				},btnImprimir,{
					text: 'CERRAR',
					id: 'BtnCerrar',
					name: 'BtnCerrar',
					handler: function() {
						winExport.hide();
						storeLiquidaciones.load({
							params: {
								option: "LST" 
							}
						}); 
						
					}
				}
			]
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