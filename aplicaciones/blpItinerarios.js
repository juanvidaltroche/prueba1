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
var globalHoraSalida = "";
var globalHoraPuc = "";
var globalHoraPuc2 = "";
var globalHorallegada = "";
var GlobalPROGRAMACION_IT_ID = "";
var GlobalITINERARIOS_ID= "";
var globalFecha_ID = "";
var globalFecha_Encontrada = "";

//============================= variables globales fin===================

 /*********** Funcion Horas *************/
  Date.patterns={
         SortableDateTime:"Y/m/d"
  }
  var now = new Date();
  var Fechasistema = now.format(Date.patterns.SortableDateTime);
 // alert(Fechasistema);
 /**************************************/


acl.application = {
    init: function () {
    
        //========================================================================
        // ############ STORE CONSULTORIOS (SECUNDARIO) ############
    
    var storeRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "PROGRAMACION_IT_RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false}      
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_TURNOS"};
            }
        }
    });
    var storeBuses = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "PROGRAMACION_IT_TIPO_HERRAMIENTA_ID", allowBlank: false},
                {name: "TIPO_HERRAMIENTA_CODIGO", allowBlank: false}      
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_BUSES"};
            }
        }
    });
    storeBuses.load();
        var storeFechas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpItinerariosAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "PROGRAMACION_IT_ID", allowBlank: false},
                {name: "FECHA", allowBlank: false}      
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_FECHAS"};
            }
        }
    });
    storeFechas.load();
    
//========================================================================

        
        //========================================================================
        var jsCampoLabel = new Ext.form.Label({
            text: "SELECCIONE UNA FECHA: ",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
        });   

        store = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            Ext.Ajax.request({
                url: "../servicios/blpItinerariosAjax.php",
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
                url: "../servicios/blpItinerariosAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{name: "PROGRAMACION_IT_ID",allowBlank: false},
                        {name: "PROGRAMACION_IT_REGISTRADO",allowBlank: false},
                        /**************/
                        {name: "RUTA_DESCRIPCION",allowBlank: false},
                        {name: "TIPO_HERRAMIENTA_CODIGO",allowBlank: false},
                        {name: "ITINERARIOS_HR_SALIDA",allowBlank: false},
                        {name: "ITINERARIOS_HR_PUC",allowBlank: false},
                        {name: "ITINERARIOS_HR_LLEGADA",allowBlank: false},
                        {name: "ITINERARIOS_ID",allowBlank: false},
                        {name: "DESCRIPCION",allowBlank: false},
                        {name: "ITINERARIOS_HR_PUC2",allowBlank: false},
                        
                        /**************/
                        { name: "RUTAS_BUSES_RUTA_ID",allowBlank: false},
                        {name: "TIPO_HERRAMIENTA_ID",allowBlank: false},
                        {name: "TIPO_HERRAMIENTA_CODIGO",allowBlank: false},
                 	    {name: "PROGRAMACION_IT_TIPO_HERRAMIENTA_ID",allowBlank: false}, 
                        {name: "TPTRN_ID",allowBlank: false}, 
	                   {name: "TPTRN_DESCRIPCION",allowBlank: false},
	                   {name: "PROGRAMACION_IT_LUNES",allowBlank: false},
	                   {name: "PROGRAMACION_IT_MARTES",allowBlank: false}, 
	                   {name: "PROGRAMACION_IT_MIERCOLES",allowBlank: false},
	                   {name: "PROGRAMACION_IT_JUEVES",allowBlank: false}, 
	                   {name: "PROGRAMACION_IT_VIERNES",allowBlank: false}, 
	                   {name: "PROGRAMACION_IT_SABADO",allowBlank: false}, 
	                   {name: "PROGRAMACION_IT_DOMINGO",allowBlank: false}, 
	                   {name: "LUNES",allowBlank: false},
                       { name: "MARTES",allowBlank: false},
                       { name: "MIERCOLES",allowBlank: false}, 
                       { name: "JUEVES", allowBlank: false}, 
                       { name: "VIERNES",allowBlank: false},
                       {name: "SABADO",allowBlank: false},
                       {name: "DOMINGO",allowBlank: false}, 
                       {name: "PROGRAMACION_IT_ESTADO",allowBlank: false}]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "Fechasistema": Fechasistema,
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
               new Ext.grid.RowNumberer(),
            
                 {
                header: "ITINERARIOS_ID",
                dataIndex: "ITINERARIOS_ID",
                align: "left",
                width: 20,
                hidden: false,
                hideable: true,
            },
            {
                header: "RUTA",
                dataIndex: "RUTA_DESCRIPCION",
                align: "left",
                width: 80,
                hidden: false,
                hideable: true,
            },
            {
                header: "BUSES",
                dataIndex: "TIPO_HERRAMIENTA_CODIGO",
                align: "left",
                width: 60,
                hidden: false,
                hideable: true,
            },
            {
                header: "HORA SALIDA",
                dataIndex: "ITINERARIOS_HR_SALIDA",
                align: "left",
                width: 100,
                hidden: false,
                hideable: true,
            },

            {
                header: "HORA PUC_1",
                dataIndex: "ITINERARIOS_HR_PUC",
                align: "left",
                width: 100,
                hidden: false,
                hideable: true,
            },
            {
                header: "HORA PUC_2",
                dataIndex: "ITINERARIOS_HR_PUC2",
                align: "left",
                width: 100,
                hidden: false,
                hideable: true,
            },
            {
                header: "HORA LLEGADA",
                dataIndex: "ITINERARIOS_HR_LLEGADA",
                align: "left",
                width: 100,
                hidden: false,
                hideable: true,
            },
            {
                header: "DESCRIPCION",
                dataIndex: "DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: true,
            },
            /*{
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
            },*/
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

    });
    var jsBtnBuscarFechas = new Ext.Button(
    {
            text: 'BUSCAR POR FECHA',
            iconCls: 'icon-search',
            handler: function(){
                var fechaFin = Ext.getCmp('fechaFinal').getRawValue();
                storeCalendario.reload(                                       
                        { params: 
                            {
                               option: "BUSCARPORFECHA", "vFechaFinal": fechaFin
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
            }
        }
    );

    var btnNew = new Ext.Action({
        id: "btnNew",
        text: "ADICIONAR",
        iconCls: 'icon-add',
        handler: function () { 
            
           
       /* var rec =  gridCalendarioPlanificacion.getSelectionModel().getSelected();
        if(!rec){
          Ext.MessageBox.alert(" MENSAJE ", "Debe Seleccionar un Registro");  
            return false;
        }*/

                try
                  {
                      if(jsGlobalContenidoDiaSemana != null)
                      {
                        winForm.show(this);
                        Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue(rec.get(''));
                        Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue(rec.get(''));
                      }
                     
                      
                  }
                catch(err)
                  {
                  } 
                  //var value = rec.get('ITINERARIOS_ID');
                  //alert(value); 
                 // sw="1";
                  Ext.getCmp('Btn').setText('GUARDAR');
                  Ext.getCmp('FormItinerarios').setTitle('NUEVA PARADA');
                  Ext.getCmp('Btn').setIconClass('icon-save');                                 
                          //winForm.show(this);
          
        }
    });
    
    var btnUpd = new Ext.Action({
      id: "btnUpd",
      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler: function onUpdate() {
           var rec = gridCalendarioPlanificacion.store.getAt(jsGlobalGrillaCalendarioFila); 
           if (!rec) {
           Ext.MessageBox.alert("..::: MENSAJE :::..", "Debe Seleccionar un Registro");  
            return false;
           }
            winFormModificar.show(this);
            var value1 = globalHoraSalida;
            var jsVectorContenidoTotal = value1.split(':');
            var HoraSalidaModificar= jsVectorContenidoTotal[0];
            var MinutoSalidaModificar = jsVectorContenidoTotal[1];
            var value2 = globalHoraPuc;
            var jsVectorContenidoTotal2 = value2.split(':');
            var HoraPucModificar= jsVectorContenidoTotal2[0];
            var MinutoPucModificar = jsVectorContenidoTotal2[1];
            var value4 = globalHoraPuc2;
            var jsVectorContenidoTotal4 = value4.split(':');
            var HoraPuc2Modificar= jsVectorContenidoTotal4[0];
            var MinutoPuc2Modificar = jsVectorContenidoTotal4[1];
            var value3 = globalHorallegada;
            var jsVectorContenidoTotal3 = value3.split(':');
            var HoraLlegadaModificar= jsVectorContenidoTotal3[0];
            var MinutoLlegadaModificar = jsVectorContenidoTotal3[1];
            Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue(HoraSalidaModificar);
            Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue(MinutoSalidaModificar);
            Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue(HoraPucModificar);
            Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue(MinutoPucModificar);
            Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue(HoraPuc2Modificar);
            Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue(MinutoPuc2Modificar);
            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue(HoraLlegadaModificar);
            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue(MinutoLlegadaModificar);
            sw="0";
            Ext.getCmp('Btn').setText('GUARDAR');
            Ext.getCmp('FormItinerariosModificar').setTitle('MODIFICAR HORA DE ITINERARIO ');
            Ext.getCmp('Btn').setIconClass('icon-save');
      }
    });
    //BOTON BAJA
    var btnDel = new Ext.Action({
        id: "btnDel",
        text: "ELIMINAR",
        iconCls: 'icon-del',
        handler: function onDelete() {
            var rec = gridCalendarioPlanificacion.store.getAt(jsGlobalGrillaCalendarioFila);   
                // );
            Ext.Msg.confirm('ELIMINAR CELDA', 'Esta seguro de ELIMINAR la celda?', function(btn, text){
                              if (btn == 'yes'){
                                Ext.Ajax.request({
                                                url: "../servicios/blpItinerariosAjax.php",
                                                method: "POST",
                                                params: {   option: "DELETE", 
                                                            GlobalITINERARIOS_ID:GlobalITINERARIOS_ID
                                                           
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
                cellclick: function (grid, rowIndex, colIndex, cellIndex) {
                            // 0108
                            jsGlobalGrillaCalendarioColumna = colIndex;
                           // alert(jsGlobalGrillaCalendarioColumna);
                            jsGlobalGrillaCalendarioFila = rowIndex;
                          //  alert(jsGlobalGrillaCalendarioFila);

                            if(jsGlobalGrillaCalendarioColumna != -1 && jsGlobalGrillaCalendarioFila != -1
                                && jsGlobalGrillaCalendarioColumna != 0)
                        
                            {
                           
                                jsGlobal_TF_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                jsGlobal_TF_TPTRN_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                globalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                             
                                switch(jsGlobalGrillaCalendarioColumna)
                                {
                                    case 7://LUNES
                                        jsGlobalDiaSemana = "LUNES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["LUNES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        globalHoraSalida = grid.store.getAt(rowIndex).data["ITINERARIOS_HR_SALIDA"];
                                        globalHoraPuc = grid.store.getAt(rowIndex).data["ITINERARIOS_HR_PUC"];
                                        globalHorallegada = grid.store.getAt(rowIndex).data["ITINERARIOS_HR_LLEGADA"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        //alert(GlobalPROGRAMACION_IT_ID);
                                        //alert(jsGlobalContenidoDiaSemana);
                                        //alert(jsGlobalContenidoDiaSemana);
                                    
                                        
                                        break;
                                    case 8://MARTES
                                        jsGlobalDiaSemana = "MARTES";
                                     //   alert(jsGlobalDiaSemana);
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["MARTES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        break;
                                    case 9://MIERCOLES
                                        jsGlobalDiaSemana = "MIERCOLES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["MIERCOLES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        break;
                                    case 10://JUEVES
                                        jsGlobalDiaSemana = "JUEVES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["JUEVES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        //alert(jsGlobalContenidoDiaSemana);
                                        break;
                                    case 11://VIERNES
                                        jsGlobalDiaSemana = "VIERNES";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["VIERNES"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        break;
                                    case 12://SABADO
                                        jsGlobalDiaSemana = "SABADO";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["SABADO"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        //alert(jsGlobalContenidoDiaSemana);

                                        break;
                                    case 13://DOMINGO
                                        jsGlobalDiaSemana = "DOMINGO";
                                        jsGlobalContenidoDiaSemana = grid.store.getAt(rowIndex).data["DOMINGO"];
                                        GlobalTIPO_HERRAMIENTA_ID = grid.store.getAt(rowIndex).data["TIPO_HERRAMIENTA_ID"];
                                        GlobalRUTAS_BUSES_RUTA_ID = grid.store.getAt(rowIndex).data["RUTAS_BUSES_RUTA_ID"];
                                        GlobalPROGRAMACION_IT_ID = grid.store.getAt(rowIndex).data["PROGRAMACION_IT_ID"];
                                        GlobalITINERARIOS_ID = grid.store.getAt(rowIndex).data["ITINERARIOS_ID"];
                                        //alert(jsGlobalContenidoDiaSemana);

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
             tbar: [jsCampoLabel,fechaFinal,jsBtnBuscarFechas,btnNew,btnUpd, btnDel],
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
            url:    "../servicios/blpItinerariosAjax.php",
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
            url:    "../servicios/blpItinerariosAjax.php",
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
            url:    "../servicios/blpItinerariosAjax.php",
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
    
    //================================= medicos fin ================================
    // ############ FORMULARIO PRINCIPAL ############
    var newFormPrincipal = new Ext.FormPanel({
        width: 500,
        autoHeight: false,
        height: 250,
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
                    xtype: 'combo',
                    fieldLabel:     'Rutas',
                    id:             'RUTA_ID',
                    name:           'RUTA_ID',
                    allowBlank:     true,
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    emptyText:      'Seleccione una ruta',
                    typeAhead:      true,
                    displayField:   'RUTA_DESCRIPCION',
                    valueField:     'PROGRAMACION_IT_RUTA_ID',
                    store:          storeRutas,
                    listeners: {
                                select: function (combo, record, index) {
                                globalRUTA_ID = record.data.PROGRAMACION_IT_RUTA_ID;
                                console.log(globalRUTA_ID);
                                 Ext.Ajax.request(
                                             {
                                                url: "../servicios/blpItinerariosAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_BUSES","i":globalRUTA_ID},
                                                success:function (result, request)
                                                {
                                                 storeBuses.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                  //alert (result.responseText);
                                                },
                                                failure:function (result, request) 
                                                {
                                                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                }); 

                                
                                }
                            }
                         },
                         {  xtype: 'combo',
                            fieldLabel:     'Buses',
                            id:             'BUS_ID',
                            name:           'BUS_ID',
                            allowBlank:     true,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText:      'Seleccione una ruta',
                            typeAhead:      true,
                           // hiddenName:     'RUTA_ID',
                            displayField:   'TIPO_HERRAMIENTA_CODIGO',
                            valueField:     'PROGRAMACION_IT_TIPO_HERRAMIENTA_ID',
                            store:          storeBuses,
                            listeners: {
                                        select: function (combo, record, index) {
                                        globalFecha_ID = record.data.PROGRAMACION_IT_TIPO_HERRAMIENTA_ID;
                                        alert(globalFecha_ID);
                                        //globalRUTA_DESCRIPCION = record.data.RUTA_DESCRIPCION;

                                                Ext.Ajax.request({
                                                url: "../servicios/blpItinerariosAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_FECHAS","globalFecha_ID":globalFecha_ID,
                                                         "globalRUTA_ID":globalRUTA_ID},
                                                success:function (result, request)
                                                {
                                                 storeFechas.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                  //alert (result.responseText);
                                                },
                                                failure:function (result, request) 
                                                {
                                                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                        }); 
                                                              
                                        }
                                    }
                         },
                         {  xtype: 'combo',
                            fieldLabel:     'Fecha',
                            id:             'FECHAS_ID',
                            name:           'FECHAS_ID',
                            allowBlank:     true,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText:      'Seleccione una ruta',
                            typeAhead:      true,
                           // hiddenName:     'RUTA_ID',
                            displayField:   'FECHA',
                            valueField:     'PROGRAMACION_IT_ID',
                            store:          storeFechas,
                            listeners: {
                                        select: function (combo, record, index) {
                                        globalFecha_Encontrada = record.data.FECHA;
                                        alert(globalFecha_Encontrada);
                                        GlobalPROGRAMACION_IT_ID = record.data.PROGRAMACION_IT_ID;
                                       // alert(GlobalPROGRAMACION_IT_ID);                         
                                        }
                                    }
                         },
                     {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Salida',
                        combineErrors: false,
                        bodyStyle: 'padding: 10px 10px 10px 10px;',
                        items: [
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_SALIDA_HORAS',
                               id: 'ITINERARIOS_HR_SALIDA_HORAS',
                               width: 48,
                               allowBlank: false
                           },

                           {
                               xtype: 'displayfield',
                                bodyStyle: 'padding: 10px 10px 10px 10px;',
                               value: 'Horas'
                           },
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_SALIDA_MINUTOS',
                               id : 'ITINERARIOS_HR_SALIDA_MINUTOS',
                               length:2,
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                                 
                        ]
                    },
                     {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Puc_1',
                        combineErrors: false,
                        items: [
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_PUC_HORAS',
                               id: 'ITINERARIOS_HR_PUC_HORAS',
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                           	   name : 'ITINERARIOS_HR_PUC_MINUTOS',
                               id: 'ITINERARIOS_HR_PUC_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Puc_2',
                        combineErrors: false,
                        items: [
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_PUC2_HORAS',
                               id: 'ITINERARIOS_HR_PUC2_HORAS',
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                               name : 'ITINERARIOS_HR_PUC2_MINUTOS',
                               id: 'ITINERARIOS_HR_PUC2_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora llegada',
                        combineErrors: false,
                        items: [
                           {  
                               name : 'ITINERARIOS_HR_LLEGADAS_HORAS',
                        	   id: 'ITINERARIOS_HR_LLEGADAS_HORAS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                               name : 'ITINERARIOS_HR_LLEGADAS_MINUTOS',
                        	   id: 'ITINERARIOS_HR_LLEGADAS_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    }

        ],
        buttons: [{
            text:  'GUARDAR',
            id: 'Btn',
            name: 'Btn',
            iconCls: 'icon-save',
             handler: function() { 
                                   var shorasalida = Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').getValue();
                                   var sminutossalida = Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').getValue();
                                   globalHoraSalida = shorasalida + ':' + sminutossalida+':00';                                
                                   var shorapuc = Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').getValue();
                                   var sminutopuc = Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').getValue();
                                   globalHoraPuc = shorapuc + ':' + sminutopuc+':00';
                                   var shorapuc2 = Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').getValue();
                                   var sminutopuc2 = Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').getValue();
                                   globalHoraPuc2 = shorapuc2 + ':' + sminutopuc2+':00';
                                   var shorasllegada = Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').getValue();
                                   var sminutosllegada = Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').getValue(); 
                                   globalHorallegada = shorasllegada + ':' + sminutosllegada + ':00';
						           Ext.Ajax.request({
						                url: "../servicios/blpItinerariosAjax.php",
						                method: "POST",
						                params: {"option": "NEW_ITINERARIO_HORAS",
						                		 globalHoraSalida: globalHoraSalida,
						                		 globalHoraPuc: globalHoraPuc,
                                                 globalHoraPuc2: globalHoraPuc2,
						                		 globalHorallegada:globalHorallegada,
                                                 GlobalPROGRAMACION_IT_ID:GlobalPROGRAMACION_IT_ID,
                                                 globalFecha_Encontrada :globalFecha_Encontrada
						                },
						                success:function (result, request) {
						                  Ext.MessageBox.alert("MENSAJE", "SE REGISTRO CON EXITO");
						                  storeCalendario.reload();
                                          Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue("");
                                            winForm.hide();
						                },
						                failure:function (result, request) {
						                  Ext.MessageBox.alert("MENSAJE", "FALLA AL GUARDAR REGISTRO");
						                }
						            });                                                             
                              }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){    
                Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue("");
                Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue("");
                winForm.hide();
            }
        }

        ]
    });
    var newFormPrincipalModificar = new Ext.FormPanel({
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
                    xtype: 'combo',
                    fieldLabel:     'Rutas',
                    id:             'RUTA_ID',
                    name:           'RUTA_ID',
                    allowBlank:     true,
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    emptyText:      'Seleccione una ruta',
                    typeAhead:      true,
                    displayField:   'RUTA_DESCRIPCION',
                    valueField:     'PROGRAMACION_IT_RUTA_ID',
                    store:          storeRutas,
                    listeners: {
                                select: function (combo, record, index) {
                                globalRUTA_ID = record.data.PROGRAMACION_IT_RUTA_ID;
                                console.log(globalRUTA_ID);
                                 Ext.Ajax.request(
                                             {
                                                url: "../servicios/blpItinerariosAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_BUSES","i":globalRUTA_ID},
                                                success:function (result, request)
                                                {
                                                 storeBuses.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                  //alert (result.responseText);
                                                },
                                                failure:function (result, request) 
                                                {
                                                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                }); 

                                
                                }
                            }
                         },
                         {  xtype: 'combo',
                            fieldLabel:     'Buses',
                            id:             'BUS_ID',
                            name:           'BUS_ID',
                            allowBlank:     true,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText:      'Seleccione una ruta',
                            typeAhead:      true,
                           // hiddenName:     'RUTA_ID',
                            displayField:   'TIPO_HERRAMIENTA_CODIGO',
                            valueField:     'PROGRAMACION_IT_TIPO_HERRAMIENTA_ID',
                            store:          storeBuses,
                            listeners: {
                                        select: function (combo, record, index) {
                                        globalFecha_ID = record.data.PROGRAMACION_IT_TIPO_HERRAMIENTA_ID;

                                        //globalRUTA_DESCRIPCION = record.data.RUTA_DESCRIPCION;

                                                Ext.Ajax.request({
                                                url: "../servicios/blpItinerariosAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_FECHAS","globalFecha_ID":globalFecha_ID,
                                                         "globalRUTA_ID":globalRUTA_ID},
                                                success:function (result, request)
                                                {
                                                 storeFechas.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                  //alert (result.responseText);
                                                },
                                                failure:function (result, request) 
                                                {
                                                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                        }); 
                                                              
                                        }
                                    }
                         },
                         {  xtype: 'combo',
                            fieldLabel:     'Fecha',
                            id:             'FECHAS_ID',
                            name:           'FECHAS_ID',
                            allowBlank:     true,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            emptyText:      'Seleccione una ruta',
                            typeAhead:      true,
                           // hiddenName:     'RUTA_ID',
                            displayField:   'FECHA',
                            valueField:     'PROGRAMACION_IT_ID',
                            store:          storeFechas,
                            listeners: {
                                        select: function (combo, record, index) {
                                        var val1 = record.data.FECHA;
                                        GlobalPROGRAMACION_IT_ID = record.data.PROGRAMACION_IT_ID;
                                        alert(GlobalPROGRAMACION_IT_ID);                         
                                        }
                                    }
                         },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Salida',
                        combineErrors: false,
                        bodyStyle: 'padding: 10px 10px 10px 10px;',
                        items: [
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_SALIDA_HORAS',
                               id: 'ITINERARIOS_HR_SALIDA_HORAS',
                               value:'',
                               width: 48,
                               allowBlank: false,
                               handler: function() { 
                                   var shorasalida = Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').getValue();
                                  // alert(shorasalida);                                                           
                              }

                           },

                           {
                               xtype: 'displayfield',
                                bodyStyle: 'padding: 10px 10px 10px 10px;',
                               value: 'Horas'
                           },
                           {
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_SALIDA_MINUTOS',
                               id : 'ITINERARIOS_HR_SALIDA_MINUTOS',

                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                                 
                        ]
                    },
                     {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Puc',
                        combineErrors: false,
                        items: [
                           {
                               name : 'hours',
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_PUC_HORAS',
                               id: 'ITINERARIOS_HR_PUC_HORAS',
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                               name : 'ITINERARIOS_HR_PUC_MINUTOS',
                               id: 'ITINERARIOS_HR_PUC_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Puc2',
                        combineErrors: false,
                        items: [
                           {
                               name : 'hours',
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_PUC2_HORAS',
                               id: 'ITINERARIOS_HR_PUC2_HORAS',
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                               name : 'ITINERARIOS_HR_PUC2_MINUTOS',
                               id: 'ITINERARIOS_HR_PUC2_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    },
                     {
                        xtype: 'compositefield',
                        fieldLabel: 'Hora Llegadas',
                        combineErrors: false,
                        items: [
                           {
                               name : 'hours',
                               xtype: 'numberfield',
                               name : 'ITINERARIOS_HR_LLEGADAS_HORAS',
                               id: 'ITINERARIOS_HR_LLEGADAS_HORAS',
                               width: 48,
                               labelWidth: 20,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Horas'
                           },
                           {
                               name : 'ITINERARIOS_HR_LLEGADAS_MINUTOS',
                               id: 'ITINERARIOS_HR_LLEGADAS_MINUTOS',
                               xtype: 'numberfield',
                               width: 48,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Minutos'
                           }
                        ]
                    }
                   
        ],
        buttons: [{
            text:  'GUARDAR',
            id: 'Btn1',
            name: 'Btn1',
            iconCls: 'icon-save',
             handler: function() { 
                                   var shorasalida = Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').getValue();
                                   var sminutossalida = Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').getValue();
                                   globalHoraSalida = shorasalida + ':' + sminutossalida+':00';                                
                                   var shorapuc = Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').getValue();
                                   var sminutopuc = Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').getValue();
                                   globalHoraPuc = shorapuc + ':' + sminutopuc+':00';
                                   var shorapuc2 = Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').getValue();
                                   var sminutopuc2 = Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').getValue();
                                   globalHoraPuc2 = shorapuc2 + ':' + sminutopuc2+':00';
                                   var shorasllegada = Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').getValue();
                                   var sminutosllegada = Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').getValue(); 
                                   globalHorallegada = shorasllegada + ':' + sminutosllegada + ':00';
                                   Ext.Ajax.request({
                                        url: "../servicios/blpItinerariosAjax.php",
                                        method: "POST",
                                        params: {"option": "UPD_ITINERARIO_HORAS",
                                                 globalHoraSalida: globalHoraSalida,
                                                 globalHoraPuc: globalHoraPuc,
                                                 globalHoraPuc2 : globalHoraPuc2,
                                                 globalHorallegada:globalHorallegada,
                                                 GlobalITINERARIOS_ID:GlobalITINERARIOS_ID,
                                        },
                                        success:function (result, request) {
                                          Ext.MessageBox.alert("MENSAJE", "REGISTRO MODIFICADO");
                                          storeCalendario.reload();
                                            Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue("");
                                            Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue("");
                                             winFormModificar.hide();

                                        },
                                        failure:function (result, request) {
                                          Ext.MessageBox.alert("MENSAJE", "FALLA AL MODIFICAR REGISTRO");
                                        }

                                    });                                                             
                              }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
                winFormModificar.hide();
                 Ext.getCmp('ITINERARIOS_HR_SALIDA_HORAS').setValue('');   
                 Ext.getCmp('ITINERARIOS_HR_SALIDA_MINUTOS').setValue(''); 
                 Ext.getCmp('ITINERARIOS_HR_PUC_HORAS').setValue('');    
                 Ext.getCmp('ITINERARIOS_HR_PUC_MINUTOS').setValue('');
                 Ext.getCmp('ITINERARIOS_HR_PUC2_HORAS').setValue('');    
                 Ext.getCmp('ITINERARIOS_HR_PUC2_MINUTOS').setValue('');  
                 Ext.getCmp('ITINERARIOS_HR_LLEGADAS_HORAS').setValue('');    
                 Ext.getCmp('ITINERARIOS_HR_LLEGADAS_MINUTOS').setValue(''); 

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
                displayField:   'PROGRAMACION_IT_RUTA_ID',
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
                displayField:   'PROGRAMACION_IT_RUTA_ID',
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
                    url: "../servicios/blpItinerariosAjax.php",
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
        id: 'FormItinerarios',
        name: 'FormItinerarios',
        closeAction: 'hide',
        plain: true,
        title: 'ADICIONAR ITINERARIOS HORAS',
        items: newFormPrincipal
    });
    var winFormModificar = new Ext.Window({
        layout: 'fit',      
        id: 'FormItinerariosModificar',
        name: 'FormItinerariosModificar',
        closeAction: 'hide',
        plain: true,
        title: 'MODIFICAR ITINERARIOS HORAS',
        items: newFormPrincipalModificar
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