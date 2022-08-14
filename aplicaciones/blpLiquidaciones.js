Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar datos";

var LABEL_TITLE_PANEL_1 = "..:: MOVIMIENTOS POR COBRAR ::..";
var LABEL_TITLE_PANEL_2 = "..:: MOVIMIENTOS COBRADOS ::..";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "Buscando ...";

var summary = new Ext.ux.grid.GroupSummary();
var vAnfitrion = "";
var vTotalSI = "Bs. 0.00";
var sMontoGlobal = 0;
var sDescuento = 0;
var vTotalCobrar = 0;
//var vTotalNO = "Bs. 0.00";
Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
     return v+(record.data.LQD_MONTO*record.data.LQD_MONTO)
  }; 
var summary1 = new Ext.ux.grid.GroupSummary();
Ext.ux.grid.GroupSummary.Calculations["totalCost1"] =function(v, record, field){  
     return v+(record.data.LQD_MONTO*record.data.LQD_MONTO)
  }; 
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LSTANF", "pageSize": pageSize},
        success:function (result, request) {
                  storeAnfitrion.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
      Ext.Ajax.request({
        url: "../servicios/blpLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i, "anfitrion":""},
        success:function (result, request) {
                  storeLiquidaciones.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
      Ext.Ajax.request({
        url: "../servicios/blpLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LSTSI", "pageSize": n, "limit": r, "start": i, "anfitrion":""},
        success:function (result, request) {
                  storeLiquidacionesSI.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
      Ext.Ajax.request({
        url: "../servicios/blpLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LSTHST", "pageSize": pageSize,"anfitrion":""},
        success:function (result, request) {
                  storeGiros.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
      
      Ext.Ajax.request({
        url: "../servicios/blpLiquidacionesAjax.php",
        method: "POST",
        params: {"option": "LSTTOTAL", "pageSize": n, "limit": r, "start": i},
        success:function (result, request) {
          var x = Ext.util.JSON.decode(result.responseText);
          var sTotal = Ext.util.Format.usMoney(x.resultRoot[0].TOTAL);
          //vTotalNO = sTotal.substring(61, sTotal.length - 5);
          //sTotal = Ext.util.Format.usMoney(x.resultRoot[1].TOTAL);
          vTotalSI = sTotal.substring(61, sTotal.length - 5);
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
	
  var storeAnfitrion = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpLiquidacionesAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "LQD_ANFITRION", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false}
                     ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LSTANF", "pageSize": pageSize};
            }
        }
  });
  var storeGiros = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpLiquidacionesAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                     {name: "PASAJES", allowBlank: false},
                     {name: "MONTO", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "FUNCIONARIO_ID", allowBlank: false}
                     ]
        }),
        groupField: 'FUNCIONARIO_NOMBRE_COMPLETO',
        sortInfo: {field:"FUNCIONARIO_NOMBRE_COMPLETO", direction:"ASC"},
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LSTHST", "pageSize": pageSize};
            }
        }
  });
  var storeLiquidaciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpLiquidacionesAjax.php",
            method: "POST"
        }),
     	  reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                    // {name: "LQD_ID", allowBlank: false}, 
                     {name: "LQD_ANFITRION", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_HERRAMIENTA_ID", allowBlank: false},//TRX_HERRAMIENTA_ID
                     {name: "TRX_HERRAMIENTA_ID", allowBlank: false},
                     {name: "TRX_PRG_ID", allowBlank: false},
                     //{name: "LQD_GIRO_ID", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false, type: "float"},
                     {name: "PASAJES", allowBlank: false, type: "float"},
                     {name: "LQD_CONFIRMADO", allowBlank: false},
                     {name: "LQD_FLUJO", allowBlank: false},
                     {name: "FECHA", allowBlank: false},
                     {name: "TRX_USUARIO", allowBlank: false}
                    ]
        }),
        groupField: 'HRR_DESCRIPCION',
        sortInfo: {field:"HRR_DESCRIPCION", direction:"ASC"},  
        //baseParams: {"option": "LST", "pageSize": pageSize},
		    listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
  });
  var storeLiquidacionesSI = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpLiquidacionesAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "LQD_ID", allowBlank: false}, 
                     {name: "LQD_ANFITRION", allowBlank: false},
                     {name: "CAJERO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "TIPO_HERRAMIENTA_ID", allowBlank: false},
                     {name: "LQD_GIRO_ID", allowBlank: false},
                     {name: "LQD_PRG_ID", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false, type: "float"},
                     {name: "LQD_CONFIRMADO", allowBlank: false},
                     {name: "LQD_FLUJO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MODIFICACION", allowBlank: false},
                     {name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_ESTADO", allowBlank: false},
                     {name: "LQD_TIPO", allowBlank: false},
                     {name: "LQD_MONTOSF", allowBlank: false, type: "float"},
                     {name: "MONTO_COBRADO", allowBlank: false, type: "float"}
                    ]
        }),
        groupField: 'HRR_DESCRIPCION',
        sortInfo: {field:"HRR_DESCRIPCION", direction:"ASC"},  
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LSTSI", "pageSize": pageSize};
            }
        }
  });

  var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
  });
  var storePageSizeM = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
  });
  var storePageSizeG = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
  });
  
  var txtTotal = new Ext.form.TextField({
    id: "txtTotal",
    name: "txtTotal",
    iconCls: 'icon-search',
    emptyText: 'Sin Valor',
    width: 150,
    allowBlank: true,
    disabled: true,
    align: "right"
  });
	
/////////////////VENTANA PARA SALDOS Y FALTANTES
  formLiquidacion = new Ext.FormPanel({
                width: 800,
                autoHeight: true,
                height: 500,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 150,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [{
                        fieldLabel: '<font size=3>ANFITRION</font>',
                        id: 'extAnfitrion',
                        name: 'extAnfitrion',
                        height: '35',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        disabled: true,
                        allowBlank:false
                    },{
                        fieldLabel: '<font size=3>FECHA</font>',
                        id: 'extFecha',
                        name: 'extFecha',
                        height: '35',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        disabled: true,
                        allowBlank:false
                    },{
                        fieldLabel: '<font size=3>PASAJES</font>',
                        id: 'extPasajes',
                        name: 'extPasajes',
                        height: '35',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        disabled: true,
                        allowBlank:false
                    },{
                        fieldLabel: '<font size=3>MONTO</font>',
                        id: 'extCobrar',
                        name: 'extCobrar',
                        height: '35',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        disabled: true,
                        allowBlank:false
                    },{
                        fieldLabel: '<font size=3>TIPO</font>',
                        id: 'extTipo',
                        name: 'extTipo',
                        allowBlank: false,
                        height: '50',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        xtype: 'combo',
                        mode: 'local',
                        value: 'NINGUNO',
                        triggerAction:  'all',
                        forceSelection: true,
                        editable: false,
                        typeAhead: true,
                        displayField:   'nombre',
                        valueField:     'valor',
                        store: new Ext.data.JsonStore({
                        fields : ['nombre', 'valor'],
                        data   : [
                            {nombre : 'NINGUNO',   valor: 'NINGUNO'},
                            {nombre : 'SOBRANTE',   valor: 'SOBRANTE'},
                            {nombre : 'FALTANTE', valor: 'FALTANTE'}
                        ]
                        })
                      },{
                        xtype: 'numberfield',
                        fieldLabel: '<font size=3>MONTO</font>',
                        id: 'extMontoP',
                        name: 'extMontoP',
                        height: '35',
                        style: {
                            font: 'bold 20px arial black',
                            color: '#000000'
                        },
                        allowBlank:true
                    }
                ],
                buttons: [{
                    text: 'GUARDAR',
                    iconCls: 'icon-save', 
                    handler: function() {
                        if(formLiquidacion.getForm().isValid()){
                            var rec = grdliquidacion.getSelectionModel().getSelected();
                            var value = rec.get('PASAJES');
                            var vFecha = rec.get('FECHA');
                            var vUsuario = rec.get('TRX_USUARIO');
                            var vHrr = rec.get('TIPO_HERRAMIENTA_ID');
                            //TIPO_HERRAMIENTA_ID
                            var vHrrTRXS = rec.get('TRX_HERRAMIENTA_ID');
                            alert(vFecha);
                            //alert("2-"+vHrrTRXS);

                            var vPrg = rec.get('TRX_PRG_ID');
                            var vTotal = rec.get('LQD_MONTO');
                            var vAnfitrion = rec.get('LQD_ANFITRION');
                            var vNombre = rec.get('FUNCIONARIO_NOMBRE_COMPLETO');
                            var vTipo = Ext.getCmp('extTipo').getValue();
                            var vMonto = Ext.getCmp('extMontoP').getValue();
                            if (vTipo == 'FALTANTE')
                              if (vMonto > 0)
                                vMonto = vMonto *(-1);
                            var sMontoGlobal = vTotal + vMonto;
                            Ext.Msg.confirm('Cobrando: ' + value + ' Pasajes', 'Usted cobrara: <br> LIQUIDACION: '+ vTotal +'  <br> ' + vTipo + ': ' + vMonto + ' <br> TOTAL: ' + sMontoGlobal + '<br> Esta seguro de querer hacer esto?',function(btn){  
                              if(btn === 'yes'){  
                                  sMontoGlobal = 0;
                                  sDescuento = 0;
                                  winLiquidacion.hide();
                                  Ext.getCmp('extAnfitrion').reset();
                                  Ext.getCmp('extFecha').reset();
                                  Ext.getCmp('extPasajes').reset();
                                  Ext.getCmp('extCobrar').reset();
                                  Ext.getCmp('extTipo').reset();
                                  Ext.getCmp('extMontoP').reset();
                                  Ext.Ajax.request({
                                    url: "../servicios/blpLiquidacionesAjax.php",
                                    method: "POST",
                                    params: { "option": "CONF", 
                                              "fecha": vFecha,
                                              "usuario": vUsuario,
                                              "hrr": vHrr,
                                              "hrrTRXS": vHrrTRXS,
                                              "prg": vPrg,
                                              "total": vTotal,
                                              "anfitrion": vAnfitrion,
                                              "tipo": vTipo,
                                              "monto": vMonto                                              
                                            },
                                    success:function (result, request) {
                                          Ext.MessageBox.alert("Alert", "El registro fue cobrado");
                                          sMontoGlobal = 0;
                                          sDescuento = 0;
                                          storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize}});
                                          storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize}});
                                          
                                          Ext.Ajax.request({
                                            //url: "http://gmlpsr0082:9090/blpInventario/servicios/ctb_PerfilesContablesAjax.php?option=NEW&idPerfil=7&Monto=100&Glosa=POR CONCEPTO DE 50 PASAJES EN FECHA 2014/02/2014",
                                            url: url + "/servicios/ctb_PerfilesContablesAjax.php",
                                            method: "POST",
                                            params: { "option": "NEW",
                                                      "idPerfil": "7", 
                                                      "Monto": vTotal,
                                                      "Glosa": "POR CONCEPTO DE " + value + " PASAJES  EN FECHA " + vFecha
                                                    },
                                            success:function (result, request) {
                                                  Ext.MessageBox.alert("Alert", "Se creo el Asiento Contable");
                                                },
                                            failure:function (result, request) {
                                                  Ext.MessageBox.alert("Alert", "Falla al guardar el registro");
                                                }
                                          });
                                        },
                                    failure:function (result, request) {
                                          Ext.MessageBox.alert("Alert", "Falla al guardar el registro");
                                        }
                                  });
                              }     
                          });
                        }
                    }
                    }, {
                        text: 'CANCELAR',
                        iconCls: 'icon-cancel',
                        handler: function(){
                            winLiquidacion.hide();
                            Ext.getCmp('extAnfitrion').reset();
                            Ext.getCmp('extFecha').reset();
                            Ext.getCmp('extPasajes').reset();
                            Ext.getCmp('extCobrar').reset();
                            Ext.getCmp('extTipo').reset();
                            Ext.getCmp('extMontoP').reset();
                    }
                }]
    });
  winLiquidacion = new Ext.Window({
    layout: 'fit',
    width: 570,
    height: 370,
    closeAction: 'hide',
    plain: true,
    title: '..:: LIQUIDACION ::..',
    items: formLiquidacion
    });


///////////////// FIN VENTANA PARA SALDOS Y FALTANTES
  var btnCobrar = new Ext.Action({
    id: "btnCobrar",
    text: "Cobrar",
    iconCls: 'icon-add',
    handler:  function() {
      var rec = grdliquidacion.getSelectionModel().getSelected();
      if (!rec) {
          Ext.MessageBox.alert("Advertencia", "Seleccione un registro");
      }
      else{
          winLiquidacion.show(this);
          var value = rec.get('PASAJES');
          var vFecha = rec.get('FECHA');
          var vUsuario = rec.get('TRX_USUARIO');
          var vHrr = rec.get('TIPO_HERRAMIENTA_ID');
          var vPrg = rec.get('TRX_PRG_ID');
          var vTotal = rec.get('LQD_MONTO');
          var vAnfitrion = rec.get('LQD_ANFITRION');
          var vNombre = rec.get('FUNCIONARIO_NOMBRE_COMPLETO');
          Ext.getCmp('extAnfitrion').setValue(vNombre);
          Ext.getCmp('extFecha').setValue(vFecha);
          Ext.getCmp('extPasajes').setValue(value);
          Ext.getCmp('extCobrar').setValue(vTotal);

      }
    }
  });

  var btnImprimir = new Ext.Action({
    id: "btnImprimir",
    text: "Imprimir Recibo",
    iconCls: 'icon-viewer',
    handler:     function onImprimir() {
      var rec = grdliquidacionSI.getSelectionModel().getSelected();
      if (!rec) {
          return false;
      }
      var vIdLiq = rec.get('LQD_ID');
      var vFecha = rec.get('LQD_MODIFICACION');
      var vNombre = rec.get('FUNCIONARIO_NOMBRE_COMPLETO');
      //var vGiro =  rec.get('LQD_GIRO_ID');
      var vTipo =  rec.get('LQD_TIPO');
      var vSaldos =  rec.get('LQD_MONTOSF');
      var vHRR = rec.get('HRR_DESCRIPCION');
      var vMonto = rec.get('LQD_MONTO');
      var vFlujo = rec.get('LQD_FLUJO');
      var vConfirmado = rec.get('LQD_CONFIRMADO');
      var vCajero = rec.get('CAJERO_NOMBRE_COMPLETO');
      vTotalCobrar = rec.get('MONTO_COBRADO');
      
      Ext.ux.ReciboPrinter.stylesheetPath = "../ext/print.css";
      
      //vTotalCobrar = parseFloat(vMonto).toFixed(2)  + parseFloat(vSaldos).toFixed(2) ;
      var url = '../ext/fondo_blanco_1.jpg';
      var sTitulos= vNombre + "|" + vSaldos + "|" + vHRR + "|" + vMonto + "|" + vFlujo + "|" + vConfirmado + "|" + vCajero + "|" + vIdLiq+ "|" + vTipo+ "|" + parseFloat(vTotalCobrar).toFixed(2);
      Ext.ux.ReciboPrinter.print(grdliquidacion,vFecha,url,sTitulos);
    }
  });
 var btnImprimirMasivo = new Ext.Action({
    id: "btnImprimirMasivo",
    text: "Imprimir Todos",
    iconCls: 'icon-viewer',
    handler: function onImprimirMasivo() {
                //alert (sMontoGlobal/2);
                //alert (sDescuento/2);
                sMontoGlobal = sMontoGlobal/2 + sDescuento/2;
                
                var flotante = parseFloat(sMontoGlobal);
                var resultado = Math.round(flotante*Math.pow(10,2))/Math.pow(10,2)

                Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                var url = '../ext/fondo_blanco_1.jpg';
                var sTitulos= "REPORTE MASIVO DE RECAUDO EN SISTEMA| CONFIRMADO | SI CANCELADOS | MONTO RECAUDADO | BS.- " + resultado;
                Ext.ux.GridPrinter.print(grdliquidacionSI,url,sTitulos);
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
      store: storeLiquidaciones,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSize]
    });

    var cmodel1 = new Ext.grid.ColumnModel({
      defaults: {
        sortable:true
      },
       
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ANFITRION", hidden: true, hideable: true, width: 40},
               {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, width: 150},
               {header: "BUS", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, width: 50},
               //TIPO_HERRAMIENTA_ID
               {header: "TPHRRIDS", dataIndex: "TIPO_HERRAMIENTA_ID", align: "left", hidden: true, hideable: true, width: 100 },
//TRX_HERRAMIENTA_ID
               {header: "TPHRRIDS", dataIndex: "TRX_HERRAMIENTA_ID", align: "left", hidden: false, hideable: false, width: 100 },
               {header: "PROGRAMACION", dataIndex: "TRX_PRG_ID", align: "left", hidden: true, hideable: true, width: 100 },
               {header: "CONFIRMADO", dataIndex: "LQD_CONFIRMADO", align: "left", hidden: false, hideable: false, width: 100,
                          renderer: function(v, params, data){
                    return ('<font color="red">NO</font>')
               }},
               {header: "FLUJO", dataIndex: "LQD_FLUJO", align: "left", hidden: false, hideable: false, width: 100},
               {header: "FECHA DE <BR> SINCRONIZACION", dataIndex: "FECHA", align: "left", hidden: false, hideable: false, width: 150},
               {header: "PASAJES", dataIndex: "PASAJES", align: "left", hidden: false, hideable: false, width: 100},
               {header: "MONTO", dataIndex: "LQD_MONTO", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
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


    var grdliquidacion = new Ext.grid.GridPanel({
      id: "grdliquidacion",
      title: LABEL_TITLE_PANEL_1,
      store: storeLiquidaciones,
      plugins: summary,
      emptyText: 'No existen registros',
      colModel: cmodel1,
      selModel: smodel,
      columnLines: true,
      viewConfig: {forceFit: true, emptyText: 'No existen registros'},
      view : new Ext.grid.GroupingView({  
        forceFit            : true,  
        ShowGroupName       : true,  
        enableNoGroup       : false,  
        enableGropingMenu   : false,
        emptyText: 'No existen registros',  
        hideGroupedColumn   : true  
      }),  
      view : new Ext.grid.GroupingView({  
                    forceFit            : true,  
                    ShowGroupName       : true,  
                    enableNoGroup       : false,  
                    enableGropingMenu   : false, 
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})', 
                    emptyText: 'No existen registros',
                    hideGroupedColumn   : true  
                }), 
        features: [{
            ftype: 'totalCost'
        }],
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
      //tbar: [btnNew, btnDel,btnUpdate,"    Monto total pendiente    ", txtTotal/*, "->", cboSearch, btnSearch*/],
      tbar: [btnCobrar],
      bbar: pagingUser,
      style: "margin: 0 auto 0 auto;",
      width: '99%',
      height: '450',
      //title: LABEL_TITLE_PANEL_1,
      //renderTo: "divMain",
      items: [{
              fieldLabel: 'TOTAL',
              id: 'SUMA_TOTAL',
              name: 'SUMA_TOTAL',
              allowBlank:false,
              disabled: true,
              }]
    });
  //PARA EL CASO DE CONFIRMADOS SI
  var cboPageSizeM = new Ext.form.ComboBox({
      id: "cboPageSizeM",
      mode: "local",
      triggerAction: "all",
      store: storePageSizeM,
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
    var pagingUserSI = new Ext.PagingToolbar({
      id: "pagingUserSI",
      pageSize: pageSize,
      store: storeLiquidacionesSI,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSizeM]
    });

    var cmodelSI = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, width: 40},
               {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "BUS", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               //{header: "PRG ID", dataIndex: "LQD_PRG_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               //{header: "GIRO ID", dataIndex: "LQD_GIRO_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               
               {header: "CONFIRMADO", dataIndex: "LQD_CONFIRMADO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ('<font color="green">SI</font>')
               }},
               {header: "FLUJO", dataIndex: "LQD_FLUJO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "FECHA DE COBRO", dataIndex: "LQD_MODIFICACION", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "CAJERO", dataIndex: "CAJERO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, width: 150, editor: new Ext.form.TextField({})},
               /*{header: "ESTADO", dataIndex: "LQD_ESTADO", align: "left", hidden:false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                 }
               } */
               {header: "MONTO", dataIndex: "LQD_MONTO", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){
                          sMontoGlobal = sMontoGlobal + v;
                          //alert (v);
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },     
               {header: "TIPO", dataIndex: "LQD_TIPO", align: "left", hidden: false, hideable: false, width: 100},
               {header: "SOBRANTE O <BR> FALTANTE", dataIndex: "LQD_MONTOSF", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){ 
                          sDescuento = sDescuento + v; 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "MONTO_COBRADO", dataIndex: "MONTO_COBRADO", align: "left", hidden: true, hideable: true, width: 100}
              ]

    });
    var smodelSI = new Ext.grid.RowSelectionModel({
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

    var sFechaInicio = new Ext.form.DateField({  
    fieldLabel: 'INICIO',  
    id:'sFechaInicio',
    emptyText:'Insert a date...',  
    format:'Y-m-d',  
    value: new Date(),
    width: 150  
    });
    var btnBuscarFecha = new Ext.Action({
      id: "btnBuscarFecha",
      text: "BUSCAR",
      iconCls: 'icon-add',
      handler: function() {       
      var sFechaInicio = Ext.getCmp('sFechaInicio').getValue();
      storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:vAnfitrion, fechaBuscar: sFechaInicio}});

    }
    }); 


    var grdliquidacionSI = new Ext.grid.GridPanel({
      id: "grdliquidacionSI",
      title: LABEL_TITLE_PANEL_2,
      tbar: [' FECHA A BUSCAR: ',sFechaInicio, btnBuscarFecha, btnImprimir],// btnImprimirMasivo],
      store: storeLiquidacionesSI,
      plugins: summary1,
      emptyText: 'No existen registros',
      colModel: cmodelSI,
      selModel: smodelSI,
      columnLines: true,
      viewConfig: {forceFit: true, emptyText: 'No existen registros'},
      view : new Ext.grid.GroupingView({  
        forceFit            : true,  
        ShowGroupName       : true,  
        enableNoGroup       : false,  
        enableGropingMenu   : false,  
        emptyText: 'No existen registros',
        hideGroupedColumn   : true  
      }),  
      view : new Ext.grid.GroupingView({  
                    forceFit            : true,  
                    ShowGroupName       : true,  
                    enableNoGroup       : false,  
                    enableGropingMenu   : false, 
                    //startCollapsed      : true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registros"]})', 
                    emptyText: 'No existen registros',
                    hideGroupedColumn   : true  
                }), 
        features: [{
            ftype: 'totalCost1'
        }],
      enableColumnResize: true,
      enableHdMenu: true, 
      bbar: pagingUserSI,
      style: "margin: 0 auto 0 auto;",
      width: '100%',
      height: '450'
    });
  //grilla de anfitriones
  var cmodelAnfitrion = new Ext.grid.ColumnModel({
      defaults: {
        //width:30,
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ANFITRION", hidden: false, hideable: true, width: 20},
               {id: "NOMBRE", header: "NOMBRE", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", hidden: false, hideable: true, width: 150}
      ]

  });

  var smodelAnfitrion = new Ext.grid.RowSelectionModel({
      singleSelect: true,
      listeners: {
        rowselect: function (sm,record) {
          //btnEditContext.enable();
          //btnDelete.enable();
        },
        rowdeselect: function (sm) {
          //btnEditContext.disable();
          //btnDelete.disable();
        }
      }
  });
  var btnSearch = new Ext.Action({
      id: "btnSearch",
      text: 'Ver todos',
      handler: function() {
        vAnfitrion="";
        sMontoGlobal = 0;
        sDescuento = 0;
        storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:""}});
        //storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:""}});
        storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:"", fechaBuscar: sFechaInicio}});
        storeGiros.reload({ params: {option: "LSTHST", pageSize: pageSize, anfitrion:""}});
      }
  });

    var grdliquidacionAnfitrion = new Ext.grid.GridPanel({
      id: "grdliquidacionAnfitrion",
      store: storeAnfitrion,
      colModel: cmodelAnfitrion,
      selModel: smodelAnfitrion,
      tbar: [btnSearch],
      columnLines: true,
      enableColumnResize: true,
      enableHdMenu: true,
      style: "margin: 0 auto 0 auto;",
      width: '99%',
      autoScroll:true,
      height: 450,
      listeners:{
        cellclick: function (grid, rowIndex, colIndex, index) {
            sMontoGlobal = 0;
            sDescuento = 0;
            vAnfitrion= grid.store.getAt(rowIndex).data["LQD_ANFITRION"];
            storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:vAnfitrion}});
            //storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:vAnfitrion}});
            storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:vAnfitrion, fechaBuscar: sFechaInicio}});
            storeGiros.reload({ params: {option: "LSTHST", pageSize: pageSize, anfitrion:vAnfitrion}});

            Ext.Ajax.request({
              url: "../servicios/blpLiquidacionesAjax.php",
              method: "POST",
              params: {"option": "LSTTOTAL", "pageSize": pageSize, "limit": pageSize, "start": 0, anfitrion:vAnfitrion },
              success:function (result, request) {
                var x = Ext.util.JSON.decode(result.responseText);
                var sTotal = Ext.util.Format.usMoney(x.resultRoot[0].TOTAL);
                //vTotalNO = sTotal.substring(61, sTotal.length - 5);
                //var sTotal = Ext.util.Format.usMoney(x.resultRoot[1].TOTAL);
                vTotalSI = sTotal.substring(61, sTotal.length - 5);

                      },
              failure:function (result, request) {
                        myMask.hide();
                        Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                      }
            });  
        }
      }
    });
    //giros
     
    var cboPageSizeG = new Ext.form.ComboBox({
      id: "cboPageSizeG",
      mode: "local",
      triggerAction: "all",
      store: storePageSizeG,
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

    var pagingUserG = new Ext.PagingToolbar({
      id: "pagingUserg",
      pageSize: pageSize,
      store: storeGiros,
      displayInfo: true,
      displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
      emptyMsg: "No roles to display",
      items: ["-", "Page size:", cboPageSizeG]
    });

    var cmodelG = new Ext.grid.ColumnModel({
      defaults: {
        sortable:true
      },

      columns:[//{id: "ID", header: "FECHA", dataIndex: "FECHA", hidden: false, hideable: false, width: 50},
               {header: "PASAJES", dataIndex: "PASAJES", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "TOTAL", dataIndex: "MONTO", align: "right", hidden: false, hideable: false,
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "NOMBRE FUNCIONARIO", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ID FUNCIONARIO", dataIndex: "FUNCIONARIO_ID", align: "left", hidden: true, hideable: false, editor: new Ext.form.TextField({})}
              ]
    });

    var smodelG = new Ext.grid.RowSelectionModel({
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

    
    var grdliquidacionGiro = new Ext.grid.GridPanel({
      id: "grdliquidacionGiro",
      title: "..:: HISTORIAL DE COBROS ::..",
      store: storeGiros,
      emptyText: 'No existen registros',
      colModel: cmodelG,
      selModel: smodelG,
      columnLines: true,
      viewConfig: {forceFit: true, emptyText: 'No existen registros'},
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
      //tbar: [btnImprimir],
      bbar: pagingUserG,
      style: "margin: 0 auto 0 auto;",
      width: '99%',
      height: 800
    });
    
    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
    cboPageSizeM.setValue(pageSize);
    cboPageSizeG.setValue(pageSize);
    var tabsLiquidaciones = new Ext.Panel({
            region: 'center',
            width: '60%',
            margins:'3 3 3 0', 
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdliquidacion,grdliquidacionSI]
        });
    var tabGiros = new Ext.Panel({
            region: 'east',
            width: '25%',
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdliquidacionGiro]
        });
    var tabAnfitriones = new Ext.Panel({
            title: '..:: LISTA DE ANFITRIONES ::..',
            region: 'west',
            split: true,
            width: '15%',
            height: 450,
            collapsible: true,
            items: [grdliquidacionAnfitrion],
            margins:'3 0 3 3',
            cmargins:'3 3 3 3'
        });
    var viewport = new Ext.Viewport({
          layout : 'border',
          renderTo: "divMain",
          items : [ tabAnfitriones, tabsLiquidaciones, tabGiros]
    });
  }
}
Ext.onReady(acl.application.init, acl.application);