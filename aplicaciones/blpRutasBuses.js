
Ext.namespace("acl");
var LABEL_LOADING = "CARGANDO REGISTROS ...";
var LABEL_FAILURE_LOAD = "FALLA AL CARGAR REGISTROS";
var LABEL_TITLE_PANEL_1 = "RUTAS";
var globalTipoHerramientaId = "";
var globalDescripcion = "";
var sRuta="";
var globalBusesRuta_Id = "";
var globalRUTAS_BUSES_TIPO_HERRAMIENTA_ID ="";
var sEstado="";
var nomRuta="";
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
     myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpRutasBusesAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUser.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("ALERT", LABEL_FAILURE_LOAD);
                }
      });
    };

    onMnuContext = function(grid, rowIndex,e) {
      e.stopEvent();
      var coords = e.getXY();
      mnuContext.showAt([coords[0], coords[1]]);
    };

    //Variables mayoristas
    var pageSize = parseInt(20/*CONFIG.pageSize*/);
    var pageSizebus = parseInt(20/*CONFIG.pageSize*/);
    var pageSizerutabus = parseInt(20/*CONFIG.pageSize*/);
    //store mayoristas
    var storeUser = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasBusesAjax.php",
            method: "POST"
        }),

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "RUTA_ID", allowBlank: false},
                      {name: "RUTA_DESCRIPCION", allowBlank: false},
                      {name: "RUTA_DETALLE", allowBlank: false},
                      {name: "TOT_PARADA", allowBlank: false},
                      {name: "TOT_BUSES", allowBlank: false},
                      {name: "RUTA_TIPO_ESTADO", allowBlank: false},
                    ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        },
        sortInfo:{field: 'RUTA_TIPO_ESTADO', direction: "DESC"},
         groupField:'RUTA_TIPO_ESTADO'
    });
 
    var storePageSize = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });

    var storePageSizeBus = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });

     var storePageSizeRutaBus = new Ext.data.SimpleStore({
      fields: ["size"],
      data: [["15"], ["25"], ["35"], ["50"], ["100"]],
      autoLoad: true
    });
 //***********store de BUSES
 var storeBuses = new Ext.data.GroupingStore({
          proxy:new Ext.data.HttpProxy({
              url:    "../servicios/blpRutasBusesAjax.php",
              method: "POST"
          }),
          reader:new Ext.data.JsonReader({
              root: "resultRoot",
              totalProperty: "resultTotal",
              fields: [   {name: "TIPO_HERRAMIENTA_ID", allowBlank: false},
                          {name: "TIPO_HERRAMIENTA_CODIGO", allowBlank: false},
                          {name: "TIPO_HERRAMIENTA_DESCRIPCION", allowBlank: false},
                          {name: "TIPO_HERRAMIENTA_ASIENTOS", allowBlank: false},
                          {name: "TIPO_BUSES_ICONO", allowBlank: false}
                      ]
          }),
          listeners:{
              beforeload:function (store) {
                  this.baseParams = {"option": "BUSES","pageSize": pageSizebus};
              }
          }
      });   
      storeBuses.load();
      //mb_rutas_buses
      //********STORE DATOS PACIENTE ALTA
      var storeRutaBus = new Ext.data.GroupingStore({
          proxy:new Ext.data.HttpProxy({
              url:    "../servicios/blpRutasBusesAjax.php",
              method: "POST"
          }),
          reader:new Ext.data.JsonReader({
              root: "resultRoot",
              totalProperty: "resultTotal",
              fields: [  {name: "RUTAS_BUSES_ID", allowBlank: false},
                         {name: "RUTAS_BUSES_RUTA_ID", allowBlank: false},
                         {name: "RUTAS_BUSES_TIPO_HERRAMIENTA_ID", allowBlank: false},
                         {name: "TIPO_HERRAMIENTA_ID", allowBlank: false},
                         {name: "TIPO_HERRAMIENTA_CODIGO", allowBlank: false},
                         {name: "TIPO_HERRAMIENTA_ASIENTOS", allowBlank: false},
                         {name: "TIPO_HERRAMIENTA_DESCRIPCION", allowBlank: false},
                         {name: "TIPO_BUSES_ICONO", allowBlank: false}
                      ]
          }),
          listeners:{
              beforeload:function (store) {
                  this.baseParams = 
                  {"option": "RUTABUS", 
                  "vI":sRuta,
                  "pageSize": pageSizerutabus};
              }
          }
      }); 
       storeRutaBus.load();

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
  //************************funnciones
  function renderAccionesficha(value, p, record) {
            str = '';
            str = "<center><img src='../../imagenes/folder_go.png' title='Asignacion Ficha' width='25' height='20'></center></a>";
            
           return str;
    }

  //**************************************
  //-------------------------------------------------------------
     var btnNew = new Ext.Action({
      id: "btnNew",

      text: "<font-weight:bold;font-size: 10px;color:#F30><B><H2> ASIGNAR BUSES A RUTA </H2></B></font-weight>",
    // style: 'font-weight:bold;font-size: 10px;color:#F30',
       //style: 'color:#0B3378', 
      iconCls: 'icon-add',
      handler: function() {
        Ext.Ajax.request({ 
            url: "../servicios/blpRutasBusesAjax.php",
                                            method: "POST",
                                            params:  {option: "NEWBUSESPARADAS", 
                                            "sTIPO_HERRAMIENTA_ID": globalTipoHerramientaId,
                                            "sIdRuta": sRuta
                                            //"sTIPO_HERRAMIENTA_CODIGO": globalDescripcion
                                             },
                                             success:function (result, request)
                                                {
                                                  storeBuses.reload();
                                                  storeRutaBus.reload();
                                                 storeBuses.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                },
                                                failure:function (result, request) 
                                                {
                                                  Ext.MessageBox.alert("ALERT", LABEL_FAILURE_LOAD);
                                                  storeBuses.reload();
                                                  storeRutaBus.reload();
                                                 }
                                              });                                    
       
      }
    });
 /**********CANCELAR  ASIGNACION DE BUSES**************/
  var btnCancelar = new Ext.Action({
      id: "btnNew",

      text: "<B>CANCELAR ASIGNACION</B>",
      iconCls: 'icon-cancel',
      handler: function() {
        Ext.Ajax.request({ 
            url: "../servicios/blpRutasBusesAjax.php",
            method: "POST",
            params:  {option: "CANCELAR_ASIGNACIONPARADAS", 
              "sRUTAS_BUSES_ID": globalBusesRuta_Id,
              "sRUTAS_BUSES_TIPO_HERRAMIENTA_ID": globalRUTAS_BUSES_TIPO_HERRAMIENTA_ID
            },
            success:function (result, request)
            {  
              storeBuses.reload();
              storeRutaBus.reload();
              storeBuses.loadData(Ext.util.JSON.decode(result.responseText)); 
            },
            failure:function (result, request) 
            {
              Ext.MessageBox.alert("ALERT", LABEL_FAILURE_LOAD);
              storeBuses.reload();
              storeRutaBus.reload();
            }
         });
      }
    });
 /********************/
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
     //-------------------------------------------------------------
  
    var cboPageSizeBuses = new Ext.form.ComboBox({
    id: "cboPageSizeBuses",
    mode: "local",
    triggerAction: "all",
    store: storePageSizeBus,
    valueField: "size",
    displayField: "size",
    width: 50,
    editable: false,
    listeners:{
      select: function (combo, record, index) {
        pageSizebus = parseInt(record.data["size"]);
        pagingUserBus.pageSize = pageSizebus;
        pagingUserBus.moveFirst();
      }
    }
    });
    //-------------------------------------------------------------
  
    var cboPageSizeRutaBus = new Ext.form.ComboBox({
    id: "cboPageSizeRutaBus",
    mode: "local",
    triggerAction: "all",
    store: storePageSizeRutaBus,
    valueField: "size",
    displayField: "size",
    width: 50,
    editable: false,
    listeners:{
      select: function (combo, record, index) {
        pageSizerutabus = parseInt(record.data["size"]);
        pagingUserRutaBus.pageSize = pageSizerutabus;
        pagingUserRutaBus.moveFirst();
      }
    }
    });

  //PAGINADO
    var pagingUser = new Ext.PagingToolbar({
    id: "pagingUser",
    pageSize: pageSize,
    store: storeUser,
    displayInfo: true,
    displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
    emptyMsg: "No roles to display",
    items: ["-", "Page size:", cboPageSize]
    });
    //PAGINADO
    var pagingUserBus = new Ext.PagingToolbar({
    id: "pagingUserBus",
    pageSize: pageSizebus,
    store: storeBuses,
    displayInfo: true,
    displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
    emptyMsg: "No roles to display",
    items: ["-", "Page size:", cboPageSizeBuses]
    });
    //PAGINADO
    var pagingUserRutaBus = new Ext.PagingToolbar({
    id: "pagingUserRutaBus",
    pageSize: pageSizerutabus,
    store: storeRutaBus,
    displayInfo: true,
    displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
    emptyMsg: "No roles to display",
    items: ["-", "Page size:", cboPageSizeRutaBus]
    });
  //GRILLA
  var number=new Ext.grid.RowNumberer();
    var cmodel = new Ext.grid.ColumnModel({
    defaults: {
    sortable:true
    },
    columns:[number,
        {id: "ID", header: "ID", dataIndex: "RUTA_ID", hidden: true, hideable: true},
        {header: "<B>NOMBRE<B>", dataIndex: "RUTA_DESCRIPCION", align: "left",hidden: false,hideable: true},
        {header: "<B>DESCRIPCION</B>", dataIndex: "RUTA_DETALLE", align: "left",hidden: false,hideable: true},
        {header: "TIPO DE RUTA", dataIndex: "RUTA_TIPO_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
                renderer: function(v, params, data){
                    return ((v === 'PRINCIPAL') ? '<font color="green">PRINCIPAL</font>' : '<font color="red">ALTERNA</font>')
                }
            },
        {header: "<B>NRO PARADAS</B>", dataIndex: "TOT_PARADA", align: "left",hidden: false,hideable: true},
        {header: "<B>NRO BUSES</B>", dataIndex: "TOT_BUSES", align: "left",hidden: false,hideable: true, tdCls: 'x-change-cell' },
        
      ]
    });

//FECHA ING, DIAGNOST

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
        store: storeUser,
        colModel: cmodel,
        selModel: smodel,
        columnLines: true,
        emptyText: 'No existen registros',
        viewConfig: {forceFit: true, emptyText: 'No existen registros'},
        enableColumnResize: true,
        enableHdMenu: true,
        bbar: pagingUser,
        style: "margin: 0 auto 0 auto;",
        width: '99%',
        height: '380',
        title: LABEL_TITLE_PANEL_1,
        listeners:{
          'cellclick': function (grdPanel, rowIndex, cellIndex, e, colIndex) {
                
                        sRuta = grdPanel.store.getAt(rowIndex).data["RUTA_ID"];
                        sEstado = grdPanel.store.getAt(rowIndex).data["RUTA_TIPO_ESTADO"];
                        nomRuta= grdPanel.store.getAt(rowIndex).data["RUTA_DESCRIPCION"];
                        Ext.getCmp('grdRutaBus').setTitle('BUSES DE LA RUTA - '+nomRuta);
                        storeRutaBus.reload();
            }
        },
        view : new Ext.grid.GroupingView({  
              forceFit:true,
              startCollapsed: true,
              groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registro"]})'

        })
    });
      
  //*******************grilla Buses
  function renderAcciones(value, p, record) {
      //console.log(value);
      var vPant = record.data.TIPO_BUSES_ICONO;

            str = "<img src="+vPant+" title='' width='25' height='25'>"
    
            return str;
        }
      var number2=new Ext.grid.RowNumberer();
      var cmodelBuses  = new Ext.grid.ColumnModel({
          defaults: {
                sortable:true
                },
                columns:[
                number2,
                {header: "<B>NRO</B>", dataIndex: "TIPO_HERRAMIENTA_ID",align: "left",width: "", sortable: true, groupable: false, hidden:true },
                {header: "<B>CODIGO</B>", dataIndex: "TIPO_HERRAMIENTA_CODIGO",align: "left",  sortable: true, width:"20%"},
                {header: "<B>DESCRIPCION</B>", dataIndex: "TIPO_HERRAMIENTA_DESCRIPCION",align: "left",  sortable: true,width:"50%"},
                {header: "<B>NRO DE ASIENTOS</B>", dataIndex: "TIPO_HERRAMIENTA_ASIENTOS",align: "left",  sortable: true,width:"15%"},
                {header: "", dataIndex: 'TIPO_BUSES_ICONO', sortable: true, align: 'center', flex: 1, width:"15%", renderer: renderAcciones}  
                ]
            });
               
    
                var smodelBuses = new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                  rowselect: function (sm) {

                    },
                  rowdeselect: function (sm) {
                    }
                  }
                });
      
      
      var grdBuses= new Ext.grid.GridPanel({
        
            //*****
            id: "grdBuses",
            store: storeBuses,
            colModel: cmodelBuses,
            selModel: smodelBuses,
            stripeRows: true,
            multiSelect: true,
            ddGroup: 'grdRutaBusDDGroup',
            title: "REPOSITORIO DE BUSES",
            emptyText: 'No existen registros',
            enableDragDrop   : true,
            stripeRows       : true,
            loadMask: true,
            
            columnLines: true,
            enableColumnResize: true,
            enableHdMenu: true,
            bbar: pagingUserBus,
            viewConfig: {scrollOffset: 0,emptyText: 'No existen registros'},
            style: "margin: 0 auto 0 auto;",
            width: '99%',
            height: '380',
             listeners: {
                    cellclick: function (grid, rowIndex, colIndex, index) {
                        globalTipoHerramientaId  = storeBuses.getAt(rowIndex).get('TIPO_HERRAMIENTA_ID');
                        //alert(globalTipoHerramientaId);
                        globalDescripcion = storeBuses.getAt(rowIndex).get('TIPO_HERRAMIENTA_CODIGO');
                        globalEstado = storeBuses.getAt(rowIndex).get('TIPO_HERRAMIENTA_CODIGO');
                        //alert(globalDescripcion);                       
                    }

                },
            tbar:["-",{
                    xtype: 'label',
                    text: "BUSQUEDA POR TIPO DE BUS:  ",
                    name: 'lblLastLogin',
                    style: 'font-weight:bold;',
                    anchor:'93%',

                },"-",
                {   fieldLabel: 'TIPO DE BUSES',
                    id:             'cboBuses',
                    name:           'cboBuses',
                    allowBlank:     true,
                    xtype: 'combo',
                     width: '300',
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       true,
                    emptyText:      'Seleccione tipo de bus',
                    typeAhead:      true,
                    hiddenName: 'TIPO_BUSES_ID',
                    displayField: 'TIPO_BUSES_DESCRIPCION',
                    valueField: 'TIPO_BUSES_ID',
                    store: storeTipo,
                    listeners: {
                            select: function (combo, record, index) {
                            globalTIPO = record.data.TIPO_BUSES_ID;
                            storeBuses.reload({params:{
                                            option:'LST_TIPO',
                                            'vTipo':globalTIPO   
                            }});
                            }
                        }
                },"-",{
                    id: "btnSearch",
                    text: "LIMPIAR",
                    handler: function() {
                       storeBuses.reload({params:{
                                            option:'BUSES'  
                            }});
                       Ext.getCmp('cboBuses').reset();
                    }
                }]
        });
    var btnImprimir = new Ext.Action({
                xtype: 'tbbutton',
                cls: 'xbtntextcon',                                       
                text: '<B>IMPRIMIR</B>',
                iconCls: 'icon-viewer',
                handler:     function onImprimir() {
                  Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                  var url = '../ext/fondo_blanco_1.jpg';
                  Ext.ux.GridPrinter.print(grdRutaBus2,url,nomRuta);
                }
        });
  
    function renderAccionesRuta(value, p, record) {
      //console.log(value);
      var vPan = record.data.TIPO_BUSES_ICONO;

            str = "<img src="+vPan+" title='' width='25' height='25'>"
    
            return str;
        }
//////////////////////////////////////////////////////////////////////
      ///***************GRILLA PACIENTE DADOS DE ALTA
      var cmodelRutaBus  = new Ext.grid.ColumnModel({
                 defaults: {
                sortable:true
                },
                columns:[
                number2,
                {id: "ID", header: "ID", dataIndex: "RUTAS_BUSES_ID", hidden: true, hideable: true, width:30},
                {header: "ID_RUTA", dataIndex: "RUTAS_BUSES_RUTA_ID", hidden: true, hideable: true},
                {header: "ID_BUS", dataIndex: "RUTAS_BUSES_TIPO_HERRAMIENTA_ID", hidden: true, hideable: true},
                {header: "ID", dataIndex: "TIPO_HERRAMIENTA_ID", hidden: true, hideable: true},
                {header: "<B>CODIGO</B>", dataIndex: "TIPO_HERRAMIENTA_CODIGO", hidden: false, hideable: true,width:50},
                {header: "<B>DESCRIPCION</B>", dataIndex: "TIPO_HERRAMIENTA_DESCRIPCION",align: "left",  sortable: true,width:100},
                {header: "<B>NRO ASIENTOS</B>", dataIndex: "TIPO_HERRAMIENTA_ASIENTOS",align: "left",  sortable: true,width:50},
                {header: "", dataIndex: 'TIPO_BUSES_ICONO', sortable: true, align: 'center', flex: 1, width:20, renderer: renderAccionesRuta}  
                ]
            });
      var cmodelRutaBus2  = new Ext.grid.ColumnModel({
                 defaults: {
                sortable:true
                },
                columns:[
                number2,
                {header: "<B>CODIGO</B>", dataIndex: "TIPO_HERRAMIENTA_CODIGO", hidden: false, hideable: true,width:50},
                {header: "<B>DESCRIPCION</B>", dataIndex: "TIPO_HERRAMIENTA_DESCRIPCION",align: "left",  sortable: true,width:100},
                {header: "<B>NRO ASIENTOS</B>", dataIndex: "TIPO_HERRAMIENTA_ASIENTOS",align: "left",  sortable: true,width:50} 
                ]
            });          
      var smodelRutaBus = new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                  rowselect: function (sm) {

                    },
                  rowdeselect: function (sm) {
                    }
                  }
                });

       var smodelRutaBus2 = new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                  rowselect: function (sm) {

                    },
                  rowdeselect: function (sm) {
                    }
                  }
                });

      var grdRutaBus= new Ext.grid.GridPanel({
            id: "grdRutaBus",
            store: storeRutaBus,
            colModel: cmodelRutaBus,
            selModel: smodelRutaBus,
            //*****
            enableColumnResize: true,
            enableHdMenu: true,
       
        //**********
            columnLines: true,
            viewConfig: {forceFit: true, emptyText: 'No existen registros'},
            stripeRows: true,
            border: true,
            loadMask: true,
            width: '99%',
            height: '450',
            //multiSelect: true,
            /******** drag and drup********/
            enableDragDrop: true,
            ddGroup: 'grdBusDDGroup',
            /****************/
            bbar: pagingUserRutaBus,
            style: "margin: 0 auto 0 auto;",
            title: "BUSES DE LA RUTA",
            listeners: {
                    cellclick: function (grid, rowIndex, colIndex, index) {
                        globalBusesRuta_Id  = storeRutaBus.getAt(rowIndex).get('RUTAS_BUSES_ID');   
                        globalRUTAS_BUSES_TIPO_HERRAMIENTA_ID  = storeRutaBus.getAt(rowIndex).get('RUTAS_BUSES_TIPO_HERRAMIENTA_ID');                  
                    }

                },
            tbar: ["-",btnImprimir
             //renderTo: "d2",
            ]
        });
        
      var grdRutaBus2 = new Ext.grid.GridPanel({
            id: "grdRutaBus2",
            store: storeRutaBus,
            colModel: cmodelRutaBus2,
            selModel: smodelRutaBus2,
            renderTo: document.body,
            hidden: true,
            columnLines: true,
            viewConfig: {scrollOffset: 0,
               emptyText: 'No existen registros'},
            stripeRows: true,
            border: true,
            loadMask: true,
            view : new Ext.grid.GroupingView({  
              forceFit            : true,  
              ShowGroupName       : true,  
              enableNoGroup       : false,  
              enableGropingMenu   : false,  
              emptyText: 'No existen registros',
              hideGroupedColumn   : true  
            }),
            bbar: pagingUserRutaBus,
            style: "margin: 0 auto 0 auto;",
            //width: '100%',
            //height: '800'
        });
       var tabsRutas = new Ext.Panel({
           region: 'center',
            width: '50%',
            margins:'3 3 3 0', 
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdpnlUser,grdBuses]
        });
    var tabRutasBuses = new Ext.Panel({
            region: 'east',
            width: '50%',
            activeTab: 0,
            defaults:{autoScroll:true},
            items: [grdRutaBus]
        });
    //////////////////////////FIN STORE LLAMADA FICHA///////////////////////////////////// 
    
  //********************
  /*newForm = new Ext.FormPanel({
    width        : '900',
    height       : '100%',
    layout       : 'hbox',
    renderTo     : 'panel',
    defaults     : { flex : 1 }, //auto stretch
    layoutConfig : { align : 'stretch' },
    items        : [
      grdpnlUser,
      grdBuses,
      grdRutaBus
    ]
  });*/
   //===================
    //FORMULARIO DE MAYORISTAS
    /*
    newForm = new Ext.FormPanel({
    //fileUpload: true,
    width: '95%',
    //height: '100%',
    autoHeight: true,
    bodyStyle: 'padding: 10px 10px 10px 10px;',
    labelWidth: 100,
    defaults: {
      anchor: '100%',
      allowBlank: false,
      msgTarget: 'side'
    },
    autoScroll: true,
    defaultType: 'textfield',
    items: [
        {
        xtype: 'fieldset',
        id: 'flstPrinci',
        name: 'flstPrinci',
        layout: 'column',
        width: '50%',
        height: '100%',
        title:"",
        collapsible: false,     
        border: false,          
        items:[{
            xtype: 'panel',
            id: 'panelPrincipal',
            name: 'panelPrincipal',
            layout: 'column',
            collapsible: false,
            title:"",    
            border: true, 
            width:'100%',
            height: '100%',       
            items: [{
                    xtype: 'fieldset',
                    id: 'flstListas',
                    name: 'flstListas',
                    layout: 'column',
                    width: '50%',
                    height: '100%',
                    title:"",
                    collapsible: false,     
                    border: false,          
                    items:[{ 
                                  xtype: 'panel',
                                  id: 'panelRutas',
                                  name: 'panelRutas',
                                  labelWidth: 60,
                                  layout: 'fit',       
                                  split: true,                           
                                  border: true,
                                  height:'50%', 
                                  width: '98%',  
                                  flex:50,                                                             
                                  items: [grdpnlUser]

                              },
                              {
                                  xtype: 'panel',
                                  id: 'panelBuses',
                                  name: 'panelBuses',
                                  labelWidth: 30,
                                  layout: 'fit',       
                                  split: true,   
                                  title:"REPOSITORIO DE BUSES",                        
                                  border: true,
                                  width: '98%',
                                  height: '50%', 
                                  flex:50,                                                              
                                  items: [
                                  grdBuses
                                  ],
                                   //tbar: [ btnNew ] 
                                  
                            }]
                        },{
                            xtype: 'panel',
                            id: 'panelRutasBuses',
                            name: 'panelRutasBuses',
                            //bodyStyle: 'padding: 0px 10px 0px 10px;',
                            labelWidth: 60,
                            layout: 'fit',       
                            split: true,    
                            title:"BUSES DE LA RUTA",                       
                            border: true,
                            autoHeight: true,
                            width: '49%', 
                            height: '100%',                                                                 
                            items: [
                                      grdRutaBus
                            ],
                            //tbar: [btnCancelar ] 
                        }]
              }]
        }]

    });
*/
  storeUser.on('load', function (s, r, p) {
    // Recupera cada fila
    storeUser.each(function (a, i) {
       if (a.get('TOT_BUSES') == 0) {
         Ext.fly(grdpnlUser.getView().getRow(i)).addClass('green');
      }
    })
  }, this);
    
  //**************************
    /*var main = new Ext.Panel({
        title: '',
        width: '95%',
         autoScroll: true,
        frame: true,
            activeTab: 0,
        height: '95%',
        layout: 'fit',
        items: [newForm]
    });*/

   storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
    cboPageSizeBuses.setValue(pageSizebus);
    cboPageSizeRutaBus.setValue(pageSizerutabus);

var viewport = new Ext.Viewport({
  layout : 'border',
  renderTo: "divMain",
  items : [ tabsRutas, tabRutasBuses]
});
/***** DRAG AND DRUP********/


        // This will make sure we only drop to the view container
        var grdBusDropTargetEl = grdRutaBus.getView().el.dom.childNodes[0].childNodes[1];
        var grdBusGridDropTarget = new Ext.dd.DropTarget(grdBusDropTargetEl, {
            ddGroup: 'grdRutaBusDDGroup',
            copy: true,
            notifyDrop: function (ddSource2, e, data) {
                // Generic function to add records.
                 
              function addRow(record, index, allItems) {
                    
              var foundItem = storeRutaBus.findExact('TIPO_HERRAMIENTA_ID', record.data.name);
                
                if(sRuta!='')
                {
                  if(sEstado=="PRINCIPAL")
                  {
                      if (foundItem == -1) {
                        storeRutaBus.add(record);
                        storeRutaBus.sort('RUTAS_BUSES_ID', 'ASC'); 
                        grdRutaBus.stopEditing();
                        Ext.Ajax.request({
                              ////////////////////
                              url: '../servicios/blpRutasBusesAjax.php',                               
                            method: "POST",
                            params: {"option": "IDA1",
                                      "sRUTAS_BUSES_ID": sRuta,
                                      "sTIPO_HERRAMIENTA_ID": record.data.TIPO_HERRAMIENTA_ID 
                                    },
                                //////////////////                        
                            scope: this,
                            success: function (result, request) {
                                
                                Ext.Ajax.request({
                                  url: '../servicios/blpRutasBusesAjax.php',      
                                  method: "POST",
                                  params: { "option": "IDA2", "sTIPO_HERRAMIENTA_ID":record.data.TIPO_HERRAMIENTA_ID },
                                    success: function (result, request) {
                                      storeRutaBus.reload();
                                    },
                                    failure: function (result, request) {
                                      Ext.MessageBox.alert("Alert", "ERROR DE CONEXIÓN");
                                    },
                                });
                                grdRutaBus.el.unmask();
                                grdRutaBus.getStore().commitChanges();
                                storeBuses.reload();
                                storeUser.reload();
                            }
                        });
                      }
                    }
                    else{
                      Ext.MessageBox.alert("MENSAJE","NO PUEDE ASIGNAR BUSES A UNA RUTA 'ALTERNA'");
                    }
                  }
                  else
                  {
                     Ext.MessageBox.alert("MENSAJE","DEBE SELECCIONAR UNA RUTA");
                  }      
                }
                // Loop through the selections
                Ext.each(ddSource2.dragData.selections, addRow);
                return (true);
            }
        });


/******************************/
        var RutaBusGridDropTargetEl = grdBuses.getView().el.dom.childNodes[0].childNodes[1];
        var RutaBusGridDropTarget = new Ext.dd.DropTarget(RutaBusGridDropTargetEl, {
            ddGroup: 'grdBusDDGroup',
            copy: true,
            notifyDrop: function (ddSource3, e, data) {
              
                function addRow(record, index, allItems) {
                 
                   var foundItem = storeRutaBus.findExact('TIPO_HERRAMIENTA_ID', record.data.name);
                  
               
                   if (foundItem == -1) {
                        storeBuses.add(record);
                        // Call a sort dynamically
                        storeBuses.sort('TIPO_HERRAMIENTA_ID', 'ASC');
                        
                        Ext.Ajax.request({
                              /////////////
                               url: '../servicios/blpRutasBusesAjax.php',                               
                            method: "POST",
                            params: { "option": "VUELTA1",
                                      "sTIPO_HERRAMIENTA_ID": record.data.RUTAS_BUSES_TIPO_HERRAMIENTA_ID 
                                    },
                                ////////////////////////                         
                            scope: this,
                            success: function (result, request) {
                               
                                Ext.Ajax.request({
                                  url: '../servicios/blpRutasBusesAjax.php',      
                                  method: "POST",
                                  params: { "option": "VUELTA2", "sTIPO_RUTABUS_ID":record.data.RUTAS_BUSES_ID },
                              
                                    success: function (result, request) {
                                      storeBuses.reload();
                                      grdBuses.el.unmask();
                                      grdBuses.getStore().commitChanges();
                                      storeRutaBus.reload();
                                      storeUser.reload();
                                    },
                                    failure: function (result, request) {
                                      Ext.MessageBox.alert("ALERT", "ERROR DE CONEXIÓN");
                                    },
                                });
                                
                            },
                            failure:function (result, request) {
                              Ext.MessageBox.alert("Alert", "ERROR DE CONEXIÓN");
                            }
                        });
                        ////  
                        //Remove Record from the source
                        ddSource3.grid.store.remove(record);
                        //storeBuses.reload();
                    }
                  
              
                }

                // Loop through the selections
                Ext.each(ddSource3.dragData.selections, addRow);
                return (true);
            }
        });


  }
}

Ext.onReady(acl.application.init, acl.application);