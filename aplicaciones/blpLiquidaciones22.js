Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros ...";
var LABEL_FAILURE_LOAD = "Falla al cargar datos";

var LABEL_TITLE_PANEL_1 = "MOVIMIENTOS POR COBRAR";
var LABEL_TITLE_PANEL_2 = "MOVIMIENTOS COBRADOS";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "Buscando ...";

var summary = new Ext.ux.grid.GroupSummary();
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
        url: "../servicios/blpLiquidacionesAjax2.php",
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
        url: "../servicios/blpLiquidacionesAjax2.php",
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
        url: "../servicios/blpLiquidacionesAjax2.php",
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
        url: "../servicios/blpLiquidacionesGirosAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": pageSize,"anfitrion":""},
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
        url: "../servicios/blpLiquidacionesAjax2.php",
        method: "POST",
        params: {"option": "LSTTOTAL", "pageSize": n, "limit": r, "start": i},
        success:function (result, request) {
          var x = Ext.util.JSON.decode(result.responseText);
          var sTotal = Ext.util.Format.usMoney(x.resultRoot[0].TOTAL);
          var sTotalFinal = sTotal.substring(61, sTotal.length - 5);
          Ext.getCmp('txtTotal').setValue(sTotalFinal);
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
            url:    "../servicios/blpLiquidacionesAjax2.php",
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
            url:    "../servicios/blpLiquidacionesGirosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "GIRO_ID", allowBlank: false},
                     {name: "CANTIDAD", allowBlank: false},
                     {name: "TOTAL", allowBlank: false},
                     {name: "NOMBRE_COMPLETO", allowBlank: false},
                     {name: "FUNCIONARIO_ID", allowBlank: false}
                     ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
  });
  var storeLiquidaciones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpLiquidacionesAjax2.php",
            method: "POST"
        }),
     	  reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "LQD_ID", allowBlank: false}, 
                     {name: "LQD_ANFITRION", allowBlank: false},
                     {name: "FUNCIONARIO_NOMBRE_COMPLETO", allowBlank: false},
                     {name: "HRR_DESCRIPCION", allowBlank: false},
                     {name: "LQD_HRR_ID", allowBlank: false},
                     {name: "LQD_PRG_ID", allowBlank: false},
                     {name: "LQD_GIRO_ID", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false, type: "float"},
                     {name: "LQD_CONFIRMADO", allowBlank: false},
                     {name: "LQD_FLUJO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MODIFICACION", allowBlank: false},
                     {name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_ESTADO", allowBlank: false}
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
            url:    "../servicios/blpLiquidacionesAjax2.php",
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
                     {name: "LQD_GIRO_ID", allowBlank: false},
                     {name: "LQD_PRG_ID", allowBlank: false},
                     {name: "LQD_MONTO", allowBlank: false, type: "float"},
                     {name: "LQD_CONFIRMADO", allowBlank: false},
                     {name: "LQD_FLUJO", allowBlank: false},
                     {name: "LQD_REGISTRO", allowBlank: false},
                     {name: "LQD_MODIFICACION", allowBlank: false},
                     {name: "LQD_USUARIO", allowBlank: false},
                     {name: "LQD_ESTADO", allowBlank: false}
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
	
  var btnCobrar = new Ext.Action({
    id: "btnCobrar",
    text: "Cobrar",
    iconCls: 'icon-add',
    handler:     function onCobrar() {
      var rec = grdliquidacion.getSelectionModel().getSelected();
      var anfitrion = grdliquidacionAnfitrion.getSelectionModel().getSelected();
      if (!rec) {
          return false;
      }
      var value = rec.get('LQD_ID');
      var total = rec.get('LQD_MONTO');
      var vAnfition = "";
      try
        {
        var vAnfition = anfitrion.get('LQD_ANFITRION');
        }
      catch(err)
        {
        
        }
      
      Ext.Msg.confirm('Cobrando giro : ' + value ,'Usted cobrara '+ total +'  esta seguro de querer hacer esto?',function(btn){  
          if(btn === 'yes'){  
              Ext.Ajax.request({
                url: "../servicios/blpLiquidacionesAjax2.php",
                method: "POST",
                params: {"option": "CONF", "idLiquidacion": value},
                success:function (result, request) {
                      Ext.MessageBox.alert("Alert", "El registro fue cobrado");
                      storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:vAnfition}});
                      storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:vAnfition}});
                    },
                failure:function (result, request) {
                      Ext.MessageBox.alert("Alert", "Falla al guardar el registro");
                    }
              });
          }     
      });  
    }
  });

  var btnImprimir = new Ext.Action({
    id: "btnImprimir",
    text: "Imprimir",
    iconCls: 'icon-add',
    handler:     function onCobrar() {
      var rec = grdliquidacionSI.getSelectionModel().getSelected();
      if (!rec) {
          return false;
      }
      var vIdLiq = rec.get('LQD_ID');
      var vFecha = rec.get('LQD_REGISTRO');
      var vNombre = rec.get('FUNCIONARIO_NOMBRE_COMPLETO');
      var vGiro =  rec.get('LQD_GIRO_ID');
      var vHRR = rec.get('HRR_DESCRIPCION');
      var vMonto = rec.get('LQD_MONTO');
      var vFlujo = rec.get('LQD_FLUJO');
      var vConfirmado = rec.get('LQD_CONFIRMADO');
      var vCajero = rec.get('CAJERO_NOMBRE_COMPLETO');
      Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
      var url = '../ext/fondo_blanco_1.jpg';
      var sTitulos= vNombre + "|" + vGiro + "|" + vHRR + "|" + vMonto + "|" + vFlujo + "|" + vConfirmado + "|" + vCajero + "|" + vIdLiq;
      Ext.ux.GridPrinter.print(grdliquidacion,vFecha,url,sTitulos);

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

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        sortable:true
      },
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, width: 50},
               {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "HERRAMIENTA", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "PRG ID", dataIndex: "LQD_PRG_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "GIRO ID", dataIndex: "LQD_GIRO_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "MONTO", dataIndex: "LQD_MONTO", align: "right", hidden: false, hideable: false, summaryType: 'sum',
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "CONFIRMADO", dataIndex: "LQD_CONFIRMADO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ('<font color="red">NO</font>')
               }},
               {header: "FLUJO", dataIndex: "LQD_FLUJO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "FECHA", dataIndex: "LQD_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "LQD_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
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


    var grdliquidacion = new Ext.grid.GridPanel({
      id: "grdliquidacion",
      title: LABEL_TITLE_PANEL_1,
      store: storeLiquidaciones,
      plugins: summary,
      emptyText: 'No existen registros',
      colModel: cmodel,
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
                    //startCollapsed      : true,
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
      columns:[{id: "ID", header: "ID", dataIndex: "LQD_ID", hidden: false, hideable: true, width: 50},
               {header: "ANFITRION", dataIndex: "FUNCIONARIO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "HERRAMIENTA", dataIndex: "HRR_DESCRIPCION", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "PRG ID", dataIndex: "LQD_PRG_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "GIRO ID", dataIndex: "LQD_GIRO_ID", align: "left", hidden: false, hideable: false, width: 50, editor: new Ext.form.TextField({})},
               {header: "MONTO", dataIndex: "LQD_MONTO", align: "right", hidden: false, hideable: false, width: 100, summaryType: 'sum',
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "CONFIRMADO", dataIndex: "LQD_CONFIRMADO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ('<font color="green">SI</font>')
               }},
               {header: "FLUJO", dataIndex: "LQD_FLUJO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "FECHA", dataIndex: "LQD_REGISTRO", align: "left", hidden: false, hideable: false, width: 60, editor: new Ext.form.TextField({})},
               {header: "CAJERO", dataIndex: "CAJERO_NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, width: 150, editor: new Ext.form.TextField({})},
               {header: "ESTADO", dataIndex: "LQD_ESTADO", align: "left", hidden:false, hideable: false, width: 60, editor: new Ext.form.TextField({}),
                          renderer: function(v, params, data){
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                 }
               }              
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


    var grdliquidacionSI = new Ext.grid.GridPanel({
      id: "grdliquidacionSI",
      title: LABEL_TITLE_PANEL_2,
      tbar: [btnImprimir],
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
        storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:""}});
        storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:""}});
        storeGiros.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:""}});
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
            var vAnfition = grid.store.getAt(rowIndex).data["LQD_ANFITRION"];
            storeLiquidaciones.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:vAnfition}});
            storeLiquidacionesSI.reload({ params: {option: "LSTSI", pageSize: pageSize, anfitrion:vAnfition}});
            storeGiros.reload({ params: {option: "LST", pageSize: pageSize, anfitrion:vAnfition}});
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
      columns:[{id: "ID", header: "ID", dataIndex: "GIRO_ID", hidden: false, hideable: true, width: 50},
               {header: "CANTIDAD", dataIndex: "CANTIDAD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "TOTAL", dataIndex: "TOTAL", align: "right", hidden: false, hideable: false,
                          renderer : function(v){ 
                    return Ext.util.Format.usMoney(v); }, editor: new Ext.form.TextField({})
               },
               {header: "NOMBRE FUNCIONARIO", dataIndex: "NOMBRE_COMPLETO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ID FUNCIONARIO", dataIndex: "FUNCIONARIO_ID", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})}
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
      title: "HISTORIAL DE COBROS",
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
            width: '55%',
            margins:'3 3 3 0', 
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdliquidacion,grdliquidacionSI]
        });
    var tabGiros = new Ext.Panel({
            region: 'east',
            width: '30%',
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdliquidacionGiro]
        });
    var tabAnfitriones = new Ext.Panel({
            title: 'ANFITRION',
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
          items : [ tabAnfitriones, tabsLiquidaciones]
    });
  }
}
Ext.onReady(acl.application.init, acl.application);