Ext.namespace("acl");

var LABEL_LOADING = "Cargando registros...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = "CALENDARIO - PLANIFICACION";
var k = "0";
var global = "0";
//============================= variables globales inicio===================
var jsGlobalGrillaCalendarioColumna = -1;
var jsGlobalGrillaCalendarioFila = -1;

var jsGlobalDiaSemana           = "NINGUNO";
var jsGlobal_TF_ID              = -1;
//var jsGlobal_TF_HSP_ID          = jsGlobalSession_TF_HSP_ID;
var jsGlobal_TF_CNSL_ID         = -1;
var jsGlobal_TF_TPTRN_ID        = -1;
//var GlobalTIPO_HERRAMIENTA_ID        = -1;
var jsGlobalContenidoDiaSemana  = "NINGUNO";
var jsGlobalNumeroDiaYearFechaInicio = -1;
var jsGlobalMedico  = "NINGUNO";
var globalRUTA_ID = 1;
var globalRUTA_DESCRIPCION = "";
var globalNombre = "";
var globalC_DESCRIPCION = "";
var GlobalNombreAnfitrion = "";
var GlobalTIPO_HERRAMIENTA_ID = -1;
var GlobalRUTAS_BUSES_RUTA_ID = "";
var GlobalPROGRAMACION_IT_REGISTRADO = "";
var globalRUTA_ID_CLONACION = "";
var global11 = "";
var globalRUTA_ID_CLONADA = "";

//============================= variables globales fin===================

acl.application = {
    init: function () {
    
        //========================================================================
        // ############ STORE CONSULTORIOS (SECUNDARIO) ############
    
    var storeRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpProgramacionItinerariosAjax.php",
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
    
//========================================================================

var TRN_CNSL_ID = new Ext.form.ComboBox({
                fieldLabel:     'RUTAS',
                id:             'TRN_CNSL_ID',
                name:           'TRN_CNSL_ID',
                allowBlank:     true,
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
                            storeCalendario.reload({params:{
                                            option                      :'LST_CALENDARIO_COMBO_CONSULTORIO',
                                            globalRUTA_ID               :globalRUTA_ID        ,
  
                            }});
                            
                           
                            }
                        }
            });

        //========================================================================
        var jsCampoLabel = new Ext.form.Label({
            text: "SELECCIONE LA RUTA: ",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
        });
        //var a = jsGlobalDiaSemana
        //alert(2222);
        //alert(a);
        //========================================================================
    

        store = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            Ext.Ajax.request({
                url: "../servicios/blpProgramacionItinerariosAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },
                success: function (result, request) {
                    storeCalendario.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
        };

    
        var pageSize = parseInt(250);
        var message = "por implementar ...";

        var storeCalendario = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpProgramacionItinerariosAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{name: "PROGRAMACION_IT_ID",allowBlank: false},
                        {name: "PROGRAMACION_IT_REGISTRADO",allowBlank: false},
                        { name: "RUTAS_BUSES_RUTA_ID",allowBlank: false},
                        {name: "TIPO_HERRAMIENTA_ID",allowBlank: false},
                        {name: "TIPO_HERRAMIENTA_CODIGO",allowBlank: false},
                 {
                    name: "PROGRAMACION_IT_TIPO_HERRAMIENTA_ID",
                    allowBlank: false
                }, {
                    name: "TPTRN_ID",
                    allowBlank: false
                }, {
                    name: "TPTRN_DESCRIPCION",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_LUNES",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_MARTES",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_MIERCOLES",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_JUEVES",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_VIERNES",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_SABADO",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_DOMINGO",
                    allowBlank: false
                }, {
                    name: "LUNES",
                    allowBlank: false
                }, {
                    name: "MARTES",
                    allowBlank: false
                }, {
                    name: "MIERCOLES",
                    allowBlank: false
                }, {
                    name: "JUEVES",
                    allowBlank: false
                }, {
                    name: "VIERNES",
                    allowBlank: false
                }, {
                    name: "SABADO",
                    allowBlank: false
                }, {
                    name: "DOMINGO",
                    allowBlank: false
                }, {
                    name: "PROGRAMACION_IT_ESTADO",
                    allowBlank: false
                }]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        // "RUTA": globalRUTA_ID,
                        "pageSize": pageSize
                       // "ruta": globalRUTA_ID
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
                ["45"],
                ["55"]
            ],
            autoLoad: true
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
            store: storeCalendario,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSize]
        });

       /* function renderFormato(value, metaData, record, rowIndex, colIndex, store) {
            console.log(value);
            var temporal = value.split('|');
            var respuesta = value;
            if(temporal.length > 1)
            {
                respuesta = temporal[0] + "</br>" + temporal[1];
            }
            return respuesta;
        }*/
        
        function doPintar(value, metaData, record, rowIndex, colIndex, store) {
            var respuesta = "<font color = 'BLACK' SIZE = '2'>" + value + "</font>";
            return respuesta;
        }
        
        var cmodel = new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [
            
            /* {
                header: "BUSES_RUTAS",
                dataIndex: "RUTAS_BUSES_RUTA_ID",
                align: "center",
                hidden: false,
                hideable: true,
                renderer:doPintar
                //editor: new Ext.form.TextArea({})
            },  
            {
                header: "BUSES",
                dataIndex: "TIPO_HERRAMIENTA_ID",
                align: "center",
                hidden: false,
                hideable: true,
                renderer:doPintar
                //editor: new Ext.form.TextArea({})
            },*/
            {
                header: "BUSES",
                dataIndex: "TIPO_HERRAMIENTA_CODIGO",
                align: "center",
                hidden: false,
                hideable: true,
                renderer:doPintar
                //editor: new Ext.form.TextArea({})
            },
            /*{
                
                header: "FECHA",
                dataIndex: "PROGRAMACION_IT_REGISTRADO",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            },*/
            {
                header: "LUNES",
                dataIndex: "LUNES",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            },
            {
                header: "MARTES",
                dataIndex: "MARTES",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            }, {
                header: "MIERCOLES",
                dataIndex: "MIERCOLES",
                align: "left",
                hidden: false,
                hideable: true,
               //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            }, {
                header: "JUEVES",
                dataIndex: "JUEVES",
                align: "left",
                hidden: false,
                hideable: true,
               // renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            }, {
                header: "VIERNES",
                dataIndex: "VIERNES",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            },
            {
                header: "SABADO",
                dataIndex: "SABADO",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            },
            {
                header: "DOMINGO",
                dataIndex: "DOMINGO",
                align: "left",
                hidden: false,
                hideable: true,
                //renderer: renderFormato
                //editor: new Ext.form.TextArea({})
            },
            {
                id: "TF_ID",
                header: "TF_ID",
                dataIndex: "TF_ID",
                hidden: true,
                hideable: true,
                width: 50
            },
            {
                header: "ACCESO_ESTADO",
                dataIndex: "ACCESO_ESTADO",
                align: "left",
                hidden: true,
                hideable: true,
                //editor: new Ext.form.TextArea({}),
                renderer: function (v, params, data) {
                    console.log(v);
                    //alert(v);
                    return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                }
            }],
            defaults: {
                flex: 1
            }
        });

        var smodel = new Ext.grid.CellSelectionModel({
           singleSelect: true/*,
           
                cell: function (grid, rowIndex, colIndex) {
                    alert("rowIndexxxxxx:" + rowIndex + "\n columna: " + colIndex);
                
                         }*/
           
        });
//============================================== tbar inicio =========================================
    var jsCampoLabelFechaClonacion = new Ext.form.Label({
            text: "------- FECHA INICIO: ",
            name: 'jsCampoLabelFechaClonacion',
            style: 'font-weight:bold;',
            anchor:'93%'
        
        });
   var fechaInicio =  new Ext.form.DateField({
        xtype : 'datefield',
        fieldLabel : 'nada',
        format:'Y/m/d',//no modificar
        name : 'fechaInicio',
        id : 'fechaInicio',
        value:"",
        anchor : '80%',
        //maxValue : new Date(),
       /* listeners : {
            'select' : function(field, newValue, oldValue) {
                // alert('newValue');
                console.log(newValue);
                jsGlobalNumeroDiaYearFechaInicio = newValue.getDayOfYear();
                var jsNumeroDiaSemana = newValue.getDay();
                console.log(jsNumeroDiaSemana );
                if(jsNumeroDiaSemana != 1)
                {
                    Ext.MessageBox.alert("Alert", "Elija un dia LUNES.");
                    // return false;
                    Ext.getCmp('jsCampoFechaClonacion').reset();
                }
                
            }
        }*/
    });
    
    var jsCampoLabelFechaClonacionFinal = new Ext.form.Label({
            text: "FECHA FIN: ",
            name: 'jsCampoLabelFechaClonacion',
            style: 'font-weight:bold;',
            anchor:'93%'
        
        });
    var fechaFinal =  new Ext.form.DateField({
        xtype : 'datefield',
        fieldLabel : 'nada',
        format:'Y/m/d',//no modificar
        name : 'fechaFinal',
        id : 'fechaFinal',
        anchor : '80%',
        value:'',
        //maxValue : new Date(),
       /*listeners : {//funciona bien pero los objetos son dificiles de leer :(
            'select' : function(field, newValue, oldValue) {
                var jsNumeroDiaSemana = newValue.getDay();
                var jsGlobalNumeroDiaYearFechaFin = newValue.getDayOfYear();
                
                if(jsNumeroDiaSemana != 0 || jsGlobalNumeroDiaYearFechaInicio > jsGlobalNumeroDiaYearFechaFin)
                {
                    Ext.MessageBox.alert("Alert", "Elija un dia DOMINGO.");
                    Ext.getCmp('fechaFinal').reset();
                }
                
            }
        }*/
    });
    var jsEspacio = new Ext.form.Label({
            text: "-------",
            id: 'jsEspacio',
            name: 'jsEspacio',
            style: 'font-weight:bold;'
        });
    var jsBtnBuscarFechas = new Ext.Button(
    {
            text: 'BUSCAR POR FECHA',
            iconCls: 'icon-search',
            handler: function(){
              
                var fechaIni = Ext.getCmp('fechaInicio').getRawValue();
                var fechaFin = Ext.getCmp('fechaFinal').getRawValue();

                storeCalendario.reload(                                       
                        { params: 
                            {
                               option: "BUSQUEDAFECHA","vFechaInicio": fechaIni, "vFechaFinal": fechaFin, "globalRUTA_ID":globalRUTA_ID 
                            }
                        }
                    ); 
            }
        }
    );
    
    var jsBtnClonacion = new Ext.Button(
    {
            text: 'CLONAR PLANIFICACION',
            iconCls: 'icon-add',
            handler: function(){
                winFormClonar.show();
                /*var jsFechaFinClonacion = Ext.getCmp('jsCampoFechaClonacionFinal').getRawValue();
                console.log(jsFechaFinClonacion);
                Ext.Ajax.request({
                    url: "../servicios/blpProgramacionItinerariosAjax.php",
                    method: "POST",
                    params: {   option: "CLONAR_PLANIFICACION",
                                /*jsGlobal_TF_HSP_ID:jsGlobal_TF_HSP_ID, jsGlobal_TF_CNSL_ID:jsGlobal_TF_CNSL_ID,
                                jsGlobal_TF_TPTRN_ID:jsGlobal_TF_TPTRN_ID, jsGlobalDiaSemana:jsGlobalDiaSemana,
                                jsGlobalContenidoDiaSemana:jsGlobalContenidoDiaSemana,
                               // jsFechaInicioClonacion:jsFechaInicioClonacion,
                                jsFechaFinClonacion:jsFechaFinClonacion*/
                              //  },
                /*    success:function (result, request)
                    {
                        //CERRAR VENTANA MODIFICACION 0109-AAAAA
                         Ext.MessageBox.alert("Alert", "CLONACION EXITOSA.");
                         winForm.hide();
                    },
                    failure:function (result, request) 
                    {
                        Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                    }
                });*/
                
            }
        }
    );
    
    
    
        //BOTON ADICION
    //BOTON MODIFICAR//0103
    var btnUpd = new Ext.Action({
        id: "btnUpd",
        text: "MODIFICAR",
        iconCls: 'icon-edit',
        handler: function onUpdate() {   
            //0108-b
            //a) hacemos q se seleccione el elemento apropiado en el combo
                try
                  {
                    //alert(jsGlobalContenidoDiaSemana);
                      if(jsGlobalContenidoDiaSemana != null)
                      {
                        var jsVectorContenidoTotal = jsGlobalContenidoDiaSemana.split('<br>');
                        var puesto = jsVectorContenidoTotal[0];
                        var nombre = jsVectorContenidoTotal[1];
                        var turno = jsVectorContenidoTotal[2];
                        var fecha = jsVectorContenidoTotal[3].split('<h3><p><b>Fecha: ');
                        var fech1 = fecha[1].split('</b></p></h3>');
                        var fech = fech1[0];
                        //alert(fech);
                        Ext.getCmp("TRN_HSPUSR_MEDICO_ID").setValue(puesto);
                        Ext.getCmp("TRN_ANFITRION").setValue(nombre);
                        Ext.getCmp("TRN_TURNO_ID").setValue(turno);
                        Ext.getCmp("PROGRAMACION_IT_REGISTRADO").setValue(fech);
                        
                      }
                     
                       else{
                        if(jsGlobalContenidoDiaSemana == null)
                        Ext.getCmp("TRN_ANFITRION").setValue("");
                        Ext.getCmp("TRN_HSPUSR_MEDICO_ID").setValue("");
                        Ext.getCmp("TRN_TURNO_ID").setValue("");
                        Ext.getCmp("PROGRAMACION_IT_REGISTRADO").setValue("");
                        }
                  }
                catch(err)
                  {
                  }
                
                
                          winForm.show(this);
          
        }
    });
    //BOTON BAJA
    var btnDel = new Ext.Action({
        id: "btnDel",
        text: "ELIMINAR",
        iconCls: 'icon-del',
        handler: function onDelete() {
            //capturamos el record seleccionado 0110-a
            /*if(jsGlobal_TF_HSP_ID == -1 || jsGlobal_TF_CNSL_ID == -1 || jsGlobalGrillaCalendarioColumna == -1)
            {
                Ext.MessageBox.alert("Alert", "Seleccione un Consultorio y una Casilla.");
                 return false;
            }*/
            var rec = gridCalendarioPlanificacion.store.getAt(jsGlobalGrillaCalendarioFila);   
                // );
            Ext.Msg.confirm('ELIMINAR CELDA', 'Esta seguro de ELIMINAR la celda?', function(btn, text){
                              if (btn == 'yes'){
                                Ext.Ajax.request({
                                                url: "../servicios/blpProgramacionItinerariosAjax.php",
                                                method: "POST",
                                                params: {   option: "DELETE",
                                                            GlobalRUTAS_BUSES_RUTA_ID:GlobalRUTAS_BUSES_RUTA_ID,
                                                            GlobalTIPO_HERRAMIENTA_ID:GlobalTIPO_HERRAMIENTA_ID,
                                                            jsGlobal_TF_TPTRN_ID:jsGlobal_TF_TPTRN_ID, 
                                                            jsGlobalDiaSemana:jsGlobalDiaSemana
                                                           
                                                            },
                                                success:function (result, request)
                                                {
                                                     Ext.MessageBox.alert("MENSAJE", "Programacion de Itinerario Eliminado");
                                                    storeCalendario.reload();
                                                     //rec.set(jsGlobalDiaSemana, 'VACIO');
                                                },
                                                failure:function (result, request) 
                                                {
                                                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                            });
                              
                              } else {
                                return false;
                              }
                            });
            
        }
    }); 
    //============================================== tbar fin =========================================
    
    

        var gridCalendarioPlanificacion = new Ext.grid.EditorGridPanel({
            id: "gridCalendarioPlanificacion",
            name: "gridCalendarioPlanificacion",
            store: storeCalendario,
            colModel: cmodel,
            selModel: smodel,
            listeners: {
                cellclick: function (grid, rowIndex, colIndex) {
                            // 0108
                            jsGlobalGrillaCalendarioColumna = colIndex;
                            jsGlobalGrillaCalendarioFila = rowIndex;
                            if(jsGlobalGrillaCalendarioColumna != -1 && jsGlobalGrillaCalendarioFila != -1
                                && jsGlobalGrillaCalendarioColumna != 0)
                            {
                                jsGlobal_TF_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                jsGlobal_TF_TPTRN_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];

                                switch(jsGlobalGrillaCalendarioColumna)
                                {
                                    case 1://LUNES
                                        jsGlobalDiaSemana = "LUNES";
                                        //alert(jsGlobalDiaSemana);
                                       // jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["LUNES"];
                                         jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["LUNES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        break;
                                    case 2://MARTES
                                        jsGlobalDiaSemana = "MARTES";
                                     //   alert(jsGlobalDiaSemana);
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["MARTES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                             
                                        break;
                                    case 3://MIERCOLES
                                        jsGlobalDiaSemana = "MIERCOLES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["MIERCOLES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        break;
                                    case 4://JUEVES
                                        jsGlobalDiaSemana = "JUEVES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["JUEVES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];

                                        break;
                                    case 5://VIERNES
                                        jsGlobalDiaSemana = "VIERNES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["VIERNES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];

                                        break;
                                    case 6://SABADO
                                        jsGlobalDiaSemana = "SABADO";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["SABADO"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        break;
                                    case 7://DOMINGO
                                        jsGlobalDiaSemana = "DOMINGO";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["DOMINGO"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];

                                        break;
                                    default:
                                        jsGlobalDiaSemana = "NINGUNO";
                                        jsGlobalContenidoDiaSemana = "NINGUNO";
                                        break;
                                }
                            }
                            else
                            {
                                jsGlobalGrillaCalendarioColumna = -1;
                                jsGlobalGrillaCalendarioFila = -1;
                                jsGlobalDiaSemana = "NINGUNO";
                                jsGlobalContenidoDiaSemana = "NINGUNO";
                            }      
                               
                         }
            },
            //sm: new Ext.grid.CellSelectionModel(),//0102
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true,
            //tbar: [jsCampoLabel,TRN_CNSL_ID,btnUpd, btnDel, jsEspacio,jsBtnClonacion],
             tbar: [jsCampoLabel,TRN_CNSL_ID,btnUpd, btnDel, jsCampoLabelFechaClonacion,fechaInicio, jsCampoLabelFechaClonacionFinal,fechaFinal, jsBtnBuscarFechas,'->',jsEspacio,jsBtnClonacion],
            bbar: pagingUser,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,
            
            //listeners: {},
            viewConfig: {
                scrollOffset: 0,
                forceFit: true,
                getRowClass: function (record, rowIndex, rp, store) {
                    rp.tstyle += 'height: 100px;';
                },
            }
        });
        //Initialize events  grdpnlUser
        store(pageSize, pageSize, 0);
        cboPageSize.setValue(pageSize);
        
        //========================================================================= ventana-formulario-inicio===========================
        
    // ############ STORE PRESTACIONES (SECUNDARIO) ############
    //C:\xampp\htdocs\salud1226A\salud\servicios\SldPerfilesPrestacionesAjax.php
    var storeAnfitriones = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpProgramacionItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            //baseParams: {cmd:'catalogo'},
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "USUARIO_ID", allowBlank: false},
                {name: "USUARIO_CODIGO", allowBlank: false},
                {name: "NOMBRE", allowBlank: false},
            ]
        })
    }); 
    
    storeAnfitriones.load({params:{"option": "LST_ANFITRIONES"}});
    
    //========================================== medicos inicio ==============================================
    var storeConductores = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpProgramacionItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "USUARIO_ID", allowBlank: false},
                {name: "USUARIO_CODIGO", allowBlank: false},
                {name: "NOMBRE", allowBlank: false},
                
                
            ]
        }),
        listeners:{
              beforeload:function (store) {
                  this.baseParams = {"option": "LST_CONDUCTORES"};
              }
          }
    });
    storeConductores.load();

    
    //========================================== medicos inicio ==============================================
        var storeTurnos = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpProgramacionItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "C_ID", allowBlank: false},
                {name: "C_DESCRIPCION", allowBlank: false},
                {name: "C_CLASIFICADOR", allowBlank: false},
                
                
            ]
        }),
        listeners:{
              beforeload:function (store) {
                  this.baseParams = {"option": "LST_TURNOS_CATALOGOS"};
              }
          }
    });
    storeTurnos.load();
    
    var TRN_HSPUSR_MEDICO_ID = new  Ext.form.ComboBox({
                fieldLabel:     'SELECCIONE CONDUCTOR',
                id:             'TRN_HSPUSR_MEDICO_ID',
                name:           'TRN_HSPUSR_MEDICO_ID',
                allowBlank:     true,
                xtype:          'combo',
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione un Conductor',
                //typeAhead:        true,
                hiddenName:     'H_USUARIO_ID',
                displayField:   'NOMBRE',
                valueField:     'USUARIO_ID',
                store:          storeConductores,

                listeners: {
                            select: function (combo, record, index) {
                              globalNombre = record.data.NOMBRE;
                                                 
                            }
                        }
            });
        var TRN_TURNO_ID = new  Ext.form.ComboBox({
                fieldLabel:     'SELECCIONE TURNO',
                id:             'TRN_TURNO_ID',
                name:           'TRN_TURNO_ID',
                allowBlank:     true,
                xtype:          'combo',
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione un Turno',
                //typeAhead:        true,
                hiddenName:     'H_C_ID',
                displayField:   'C_DESCRIPCION',
                valueField:     'C_ID',
                store:     storeTurnos, 

                listeners: {
                            select: function (combo, record, index) {
                             globalC_DESCRIPCION = record.data.C_DESCRIPCION;
                             
                            }
                        }   
            });
        var TRN_ANFITRION = new  Ext.form.ComboBox({
                fieldLabel:     'SELECCIONE ANFITRION',
                id:             'TRN_ANFITRION',
                name:           'TRN_ANFITRION',
                allowBlank:     true,
                xtype:          'combo',
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione un anfitrion',
                typeAhead:      true,
                hiddenName:     'H_USUARIO_ID',
                displayField:   'NOMBRE',
                valueField:     'USUARIO_ID',
                store:          storeAnfitriones,
                //mode:         'remote',//0108-a
                mode:           'local',
                listeners: {
                            select: function (combo, record, index) {
                             GlobalNombreAnfitrion = record.data.NOMBRE;
                            
                            }
                        }   
            });
    //================================= medicos fin ================================
    // ############ FORMULARIO PRINCIPAL ############
    var newFormPrincipal = new Ext.FormPanel({
        width: 500,
        autoHeight: false,
        height: 200,
        bodyStyle: 'padding: 10px 10px 10px 10px;',
        labelWidth: 200,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        defaultType: 'textfield',
        items: [
            {
                id: 'OCULTO_TRN_HSPCAT_ID',
                name: 'OCULTO_TRN_HSPCAT_ID',
                fieldLabel: 'OCULTO_TRN_HSPCAT_ID',
                xtype: 'hidden'
            },
            TRN_HSPUSR_MEDICO_ID,
            TRN_ANFITRION,
            TRN_TURNO_ID,
            {
             xtype: 'datefield',
                fieldLabel:     'SELECCIONE FECHA',
                id:             'PROGRAMACION_IT_REGISTRADO',
                name:           'PROGRAMACION_IT_REGISTRADO',
                allowBlank: false,
                format:'Y/m/d',
                editable:false,
                mode:  'local',
                displayField:  'PROGRAMACION_IT_REGISTRADO',
                valueField:'PROGRAMACION_IT_REGISTRADO',
                listeners: {
                            select: function (combo,record, index) {     
                             //vConcatFechaN = combo.getValue();
                              // console.log(GlobalPROGRAMACION_IT_REGISTRADO);                   
                             //var  vConcatFechaN  = combo.getValue();
                             GlobalPROGRAMACION_IT_REGISTRADO=combo.value;
                             //alert(GlobalPROGRAMACION_IT_REGISTRADO);
                             //var ivAnioNac=vConcatFechaN.getFullYear();
                             //var ivMes=vConcatFechaN.getMonth();
                             //var ivDia=vConcatFechaN.getDate();
                            //GlobalPROGRAMACION_IT_REGISTRADO=ivDia+'/'+ivMes+'/'+ivAnioNac;
                            //console.log(GlobalPROGRAMACION_IT_REGISTRADO);
                            }
                        } 
            }     
        ],
        buttons: [{
            text:  'GUARDAR',
            id: 'Btn',
            name: 'Btn',
            iconCls: 'icon-save',
            handler: function(record, index,btn, ev)  {
               var rec = gridCalendarioPlanificacion.store.getAt(jsGlobalGrillaCalendarioFila);          
                //var temporal = GlobalNombreAnfitrion+ " </br> " + globalNombre + " </br> " + globalC_DESCRIPCION ;
                //alert(temporal);
                //rec.set(jsGlobalDiaSemana, temporal);
                //a) generamos el ajax asociado para realizar un insert o in update del turno-perfil +-
                
                if(GlobalNombreAnfitrion!="" && globalNombre!="" && globalC_DESCRIPCION!="" && GlobalPROGRAMACION_IT_REGISTRADO!="")
                {
                        Ext.Ajax.request({
                            url: "../servicios/blpProgramacionItinerariosAjax.php",
                            method: "POST",
                            params: {   option: "NEW_ITINERARIO",
                                GlobalNombreAnfitrion:GlobalNombreAnfitrion,
                                globalNombre:globalNombre,
                                globalC_DESCRIPCION:globalC_DESCRIPCION,
                                jsGlobalDiaSemana:jsGlobalDiaSemana,
                                GlobalTIPO_HERRAMIENTA_ID:GlobalTIPO_HERRAMIENTA_ID,
                                GlobalRUTAS_BUSES_RUTA_ID:GlobalRUTAS_BUSES_RUTA_ID,
                                GlobalPROGRAMACION_IT_REGISTRADO:GlobalPROGRAMACION_IT_REGISTRADO,
                                //jsGlobalContenidoDiaSemana:"2dfg",
                                jsGlobalContenidoDiaSemana:jsGlobalContenidoDiaSemana,
                                //jsGlobalMedico:jsGlobalMedico
                                },
                            success:function (result, request)
                            {
                                //CERRAR VENTANA MODIFICACION 0109-AAAAA
                                Ext.MessageBox.alert("MENSAJE","Itinerario registrado con exito");
                                winForm.hide();
                                storeCalendario.reload();
                                GlobalNombreAnfitrion="";
                                globalNombre="";
                                globalC_DESCRIPCION="";
                                jsGlobalDiaSemana="";
                                GlobalTIPO_HERRAMIENTA_ID="";
                                GlobalRUTAS_BUSES_RUTA_ID="";
                                GlobalPROGRAMACION_IT_REGISTRADO="";
                                jsGlobalContenidoDiaSemana="";
                            },
                            failure:function (result, request) 
                            {
                                Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                storeCalendario.reload();
                            }
                        });

                        Ext.getCmp("TRN_HSPUSR_MEDICO_ID").reset();
                        Ext.getCmp("TRN_ANFITRION").reset();
                        Ext.getCmp("TRN_TURNO_ID").reset();
                        Ext.getCmp("PROGRAMACION_IT_REGISTRADO").reset();
               }
            else{ Ext.MessageBox.alert("MENSAJE","Debe llenar todos los datos del formulario");
                }
                //fin
            }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
                winForm.hide();
            }
        }

        ]
    });


    
var newFormClonacion = new Ext.FormPanel({
        width: 500,
        autoHeight: false,
        height: 150,
        bodyStyle: 'padding: 10px 10px 10px 10px;',
        labelWidth: 200,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        defaultType: 'textfield',
        items: [
             /*{
                xtype: 'Label',
                Label: 'SELECCIONE LA RUTA DE DESDE DONDE SE DESEE CLONAR LA INFORMACION <BR>A LA RUTA DONDE SE DESEE CLONAR LA INFORMACION'
           
             },*/

        {
                xtype: 'combo',
                fieldLabel:     'CLONAR DE LA RUTA',
                id:             'TRN_RUTAS',
                name:           'TRN_RUTAS',
                allowBlank:     true,
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
                            globalRUTA_ID_CLONACION = combo.getValue();
                           // alert(globalRUTA_ID_CLONACION);                        
                            }
                        }
          },
          {
                xtype: 'combo',
                fieldLabel:     'A LA RUTA:',
                id:             'TRN_RUTAS_ID_CLONADA',
                name:           'TRN_RUTAS_ID_CLONADA',
                allowBlank:     true,
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
                            globalRUTA_ID_CLONADA = combo.getValue();
                           // alert(globalRUTA_ID_CLONADA);                        
                            }
                        }
          },
                 {
                    xtype : 'datefield',
                    fieldLabel : 'DE LA FECHA',
                    format:'Y/m/d',//no modificar
                    name : 'fechaIni',
                    id : 'fechaIni',
                    value:"",
                    anchor : '80%',
                     listeners: {
                            select: function (combo, record, index) {
                           // GlobalFechaIni = combo.getValue();
                            GlobalFechaIni=combo.value;
                           // alert(GlobalFechaIni);                        
                            }
                        }
               
                  },
                   {
                    xtype : 'datefield',
                    fieldLabel : 'A LA FECHA',
                    format:'Y/m/d',//no modificar
                    name : 'fechaFi',
                    id : 'fechaFi',
                    value:"",
                    anchor : '80%',
                      listeners: {
                            select: function (combo, record, index) {
                            GlobalFechaFin = combo.value;
                           // alert(GlobalFechaFin);                        
                            }
                        }
                  },
        ],
        buttons: [{
            text:  'CLONAR',
            id: 'Btn',
            name: 'Btn',
            iconCls: 'icon-save',
            handler: function(record, index,btn, ev)  {
               var rec = gridCalendarioPlanificacion.store.getAt(jsGlobalGrillaCalendarioFila); 
                Ext.Ajax.request({
                    url: "../servicios/blpProgramacionItinerariosAjax.php",
                    method: "POST",
                    params: {   option: "CLONAR_PLANIFICACION",
                                GlobalFechaIni:GlobalFechaIni,
                                GlobalFechaFin:GlobalFechaFin,
                                globalRUTA_ID_CLONACION: globalRUTA_ID_CLONACION,
                                jsGlobalDiaSemana:jsGlobalDiaSemana,
                                globalRUTA_ID_CLONADA: globalRUTA_ID_CLONADA,
                                GlobalTIPO_HERRAMIENTA_ID:GlobalTIPO_HERRAMIENTA_ID,
                              //  GlobalRUTAS_BUSES_RUTA_ID:GlobalRUTAS_BUSES_RUTA_ID,
                                jsGlobalContenidoDiaSemana:jsGlobalContenidoDiaSemana,
                                },
                    success:function (result, request)
                    {
                        //CERRAR VENTANA MODIFICACION 0109-AAAAA
                        Ext.MessageBox.alert("MENSAJE","Clonacion Exitosa");
                        winFormClonar.hide();
                        storeCalendario.reload();
                    },
                                
                    failure:function (result, request) 
                    {
                         alert('Falla al guardar registro');
                        storeCalendario.reload();
                    }
                });
                        Ext.getCmp("TRN_RUTAS").reset();
                        Ext.getCmp("TRN_RUTAS_ID_CLONADA").reset();
                        Ext.getCmp("fechaIni").reset();
                        Ext.getCmp("fechaFi").reset();
            }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
                winFormClonar.hide();
                Ext.getCmp("TRN_RUTAS").reset();
                Ext.getCmp("TRN_RUTAS_ID_CLONADA").reset();
                Ext.getCmp("fechaIni").reset();
                Ext.getCmp("fechaFi").reset();
            }
        }

        ]
    });
    
    var winForm = new Ext.Window({
        layout: 'fit',      
        id: 'FormProveedores',
        name: 'FormProveedores',
        closeAction: 'hide',
        plain: true,
        title: 'ADICIONAR PROGRAMACION ITINERARIOS',
        items: newFormPrincipal
    });
    var winFormClonar = new Ext.Window({
        layout: 'fit',      
        id: 'FormClonacion',
        name: 'FormClonacion',
        closeAction: 'hide',
        plain: true,
        title: 'SELECCIONE LA RUTA A LA QUE SE DESEE CLONAR ESTE ITINERARIO',
        items: newFormClonacion
    });

        
        //========================================================================= ventana-formulario-fin ===========================

        var viewport = new Ext.Viewport({
            layout: 'fit',
            renderTo: "divMain",
            items: [gridCalendarioPlanificacion]

        });
    }
}

Ext.onReady(acl.application.init, acl.application);