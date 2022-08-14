Ext.namespace("acl");

var LABEL_LOADING = "CARGANDO REGISTROS ...";
var LABEL_FAILURE_LOAD = "Falla al cargar registros";
var LABEL_TITLE_PANEL_1 = "ADMINISTRACION DE RUTAS";
var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "buscar ...";
var sw="0";
var jsNombreBoton = "GUARDAR";
var sRuta="";
var globalRUTA_ID = "";
var globalRUTA_ID_CLONACION = "";
var globalRUTA_ID_CLONADA = "";
var globalRuta_Principal = "";
var globalRuta_Alterna = "";
var globalNRO_PARADAS = "";
var globalRUTA_IDPrincipal = "";
var globalRUTA_IDAlterno = "";
var RUTA_ID_CLON = "";
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();
      Ext.Ajax.request({
        url: "../servicios/blpRutasAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUser.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
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
	
    var pageSize = parseInt(20);
    var message = "por implementar ..."; // CONFIG.message;

    //store Categories
    var storeRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
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
    var storePrincipal = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ID_CLON", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false},
                {name: "PARADAS", allowBlank: false},        
                {name: "BUSES", allowBlank: false},
                {name: "RUTA_TIPO_ESTADO", allowBlank: false}
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_PRINCIPAL"};
            }
        }
    });
    var storePrincipalM = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ID_CLON", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false},
                {name: "PARADAS", allowBlank: false},        
                {name: "BUSES", allowBlank: false},
                {name: "RUTA_TIPO_ESTADO", allowBlank: false}
            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_PRINCIPALM"};
            }
        }
    });
    storePrincipalM.load();
    var storeAlterna = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false},
                {name: "PARADAS", allowBlank: false},

            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_ALTERNA"};
            }
        }
    });
    storeAlterna.reload(); 
    var storeAlternaM = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false},
                {name: "PARADAS", allowBlank: false},

            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_ALTERNAM"};
            }
        }
    });
    storeAlternaM.reload();  
    var storeParadasRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [
                {name: "RUTA_ID", allowBlank: false},
                {name: "RUTA_DESCRIPCION", allowBlank: false},
                {name: "RUTA_DETALLE", allowBlank: false},
                {name: "RUTA_ESTADO", allowBlank: false},
                {name: "BUSES2", allowBlank: false},
                {name: "PARADAS2", allowBlank: false} 

            ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST_LISTAR_INFORMACION"};
            }
        }
    });
    var storeUser = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "RUTA_ID", allowBlank: false},
                     {name: "RUTA_DESCRIPCION", allowBlank: false},
                     {name: "RUTA_DETALLE", allowBlank: false},
                     {name: "RUTA_REGISTRO", allowBlank: false},
                     {name: "RUTA_MODIFICACION", allowBlank: false},
                     {name: "RUTA_USUARIO", allowBlank: false},
                     {name: "RUTA_ESTADO", allowBlank: false},
                     {name: "RUTA_TIPO_ESTADO", allowBlank: false},
                     {name: "TOTAL", allowBlank: false}
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
    
Ext.apply(Ext.form.VTypes, {
        uppercase: function (val, field) {
                      var texto = val;
                      texto = Ext.util.Format.uppercase(texto);
                      field.setRawValue(texto);
                      return true;
                   }
    }); // funcion para volver mayusculas
  //**************************************
    // panel
    newFormRuta = new Ext.FormPanel({
                width: 500,
                autoHeight: true,
                height: 350,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 120,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: 'RUTA',
                        id: 'RUTA_DESCRIPCION_LABEL',
                        name: 'RUTA_DESCRIPCION_LABEL',
                        vtype: 'uppercase',
                        allowBlank:false
                    },
                    {   xtype: 'htmleditor',
                        fieldLabel: 'DESCRIPCION',
                        id: 'RUTA_DETALLE_LABEL',
                        name: 'RUTA_DETALLE_LABEL',
                        vtype: 'uppercase',
                        width: 30,
                        editable: true,
                        height: 100,
                        width: 300,
                        allowBlank:false
                    }/*,{
                        fieldLabel: 'TIPO DE RUTA',
                        id: 'RUTA_ESTADO_COMBO',
                        name: 'RUTA_ESTADO_COMBO',
                        allowBlank: false,
						xtype:          'combo',
						mode:           'local',
						//value:          'ACTIVO',
						triggerAction:  'all',
						forceSelection: true,
						editable:       false,
						emptyText: 'Seleccione Estado ...',
						typeAhead: true,
						displayField:   'nombre',
						valueField:     'valor',
						store: new Ext.data.JsonStore({
							fields : ['nombre', 'valor'],
							data   : [
								{nombre : 'PRINCIPAL',   valor: 'PRINCIPAL'},
								{nombre : 'ALTERNA', valor: 'ALTERNA'}
							]
						})
                    }*/
                ],
                buttons: [{
                    text: 'GUARDAR',
					iconCls: 'icon-save',	
                    handler: function() {
                        if(newFormRuta.getForm().isValid()){
                            form_action = 1;
                            newFormRuta.getForm().submit({
                                url: '../servicios/blpRutasAjax.php?option=NEW',
                                waitMsg: 'Guardando registro...',
                                success: function(form, action){
                                    storeUser.reload();
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO GUARDADO");
                                },
                                failure: function(form, action){
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO NO GUARDADO");
                                }
                            });
                            winFormRuta.hide();
                        }
                    }
                    }, {
                        text: 'CANCELAR',
						iconCls: 'icon-cancel',
                        handler: function(){
                            winFormRuta.hide();
                    }
                }]
    })
	winFormRuta = new Ext.Window({
		layout: 'fit',
		width: 500,
		height: 230,
		closeAction: 'hide',
		plain: true,
		title: 'NUEVA RUTA',
		items: newFormRuta
    });
	var btnNewRuta = new Ext.Action({
		id: "btnNewRuta",
		text: "NUEVO",
		iconCls: 'icon-add',
		handler: function() {
			Ext.getCmp('RUTA_DESCRIPCION_LABEL').reset();   
			Ext.getCmp('RUTA_DETALLE_LABEL').reset(); 
			Ext.getCmp('RUTA_DETALLE_LABEL').reset();
			winFormRuta.show(this);
		}
    });
	var btnUpdRuta = new Ext.Action({
	
      id: "btnUpdRuta",
      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler:     function onUpdate() {
	    
        var rec = grdpnlUser.getSelectionModel().getSelected();		
        if (!rec) {
			   Ext.MessageBox.alert("MENSAJE", "DEBE SELE4CCIONAR UN  REGISTRO");
            return false;
        }
		Ext.getCmp('RUTA_DESCRIPCION_LABEL1').setValue(rec.get('RUTA_DESCRIPCION'));
		Ext.getCmp('RUTA_DETALLE_LABEL1').setValue(rec.get('RUTA_DETALLE'));
		//Ext.getCmp('RUTA_ESTADO_COMBO1').setValue(rec.get('RUTA_TIPO_ESTADO'));
        var value = rec.get('RUTA_ID');
        winFormRuta.hide();		
		winFormUpdRuta.show(this);
      }
    });
	
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
                            storeUser.reload({params:{
                                            option                      :'LST_RUTAS',
                                            globalRUTA_ID               :globalRUTA_ID,
  
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
  var jsCampoLabelEspacio = new Ext.form.Label({
            text: "",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
  });
  var jsLabelClonarPrincipalAlterna = new Ext.form.Label({
            text: "USTED ADICIONARA LAS PARADAS Y BUSES DE LA RUTA PRINCIPAL A LA RUTA ALTERNA",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
  });
  var jsLabelClonarPrincipalAlternaM = new Ext.form.Label({
            text: "USTED ADICIONARA LAS PARADAS Y BUSES DE LA RUTA PRINCIPAL A LA RUTA ALTERNA",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
  });
  var jsBtnClonacion = new Ext.Button(
    {
            text: 'CLONAR RUTAS',
            iconCls: 'icon-edit',
            handler: function(){
                        winFormClonar.show();
                
            }
        }
  );
var jsBtnModificarAsignar = new Ext.Button(
    {
            text: 'MODIFICAR ASIGNACION DE RUTA',
            iconCls: 'icon-edit',
            handler: function(){
                Ext.getCmp("TRN_RUTAS_PRINCIPAL").reset();
                Ext.getCmp("TRN_RUTAS_ALTERNAS").reset();
                Ext.getCmp("INFORMACION_RUTA").reset();
                Ext.getCmp("INFORMACION_BUS").reset();
                winFormModificarRuta.show();
                
            }
        }
  );
  



  var jsBtnAsignaRuta = new Ext.Button(
    {
            text: 'ASIGNAR RUTA CLONADA',
            iconCls: 'icon-add',
            handler: function(){
                Ext.getCmp("TRN_RUTAS_PRINCIPAL").reset();
                Ext.getCmp("TRN_RUTAS_ALTERNAS").reset();
                Ext.getCmp("INFORMACION_RUTA").reset();
                Ext.getCmp("INFORMACION_BUS").reset();
                winFormAsignarRuta.show();
                
            }
        }
  );
  
  var newFormClonacion = new Ext.FormPanel({
        width: 550,
        autoHeight: false,
        height: 300,
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
                xtype: 'textfield',
                fieldLabel:     'RUTA',
                id:             'TRN_CLONAR_DESCRIPCION',
                name:           'TRN_CLONAR_DESCRIPCION',
                vtype: 'uppercase',

          },
            {
                xtype: 'htmleditor',
                fieldLabel:     'DESCRIPCION',
                id:             'TRN_CLONAR_DETALLE',
                editable: false,
                height: 100,
                width: 300,
                name:           'TRN_CLONAR_DETALLE',
                 vtype: 'uppercase',
          },

           {
                xtype: 'combo',
                fieldLabel:     'SELECCIONE LA RUTA DE DONDE SE CLONARA LAS PARADAS',
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
                var TRN_CLONAR_DESCRIPCION = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                var TRN_CLONAR_DETALLE = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                Ext.Ajax.request({
                    url: "../servicios/blpRutasAjax.php",
                    method: "POST",
                    params: {   option: "CLONAR_PARADASRUTAS", 
                                globalRUTA_ID_CLONACION: globalRUTA_ID_CLONACION,
                                TRN_CLONAR_DESCRIPCION:TRN_CLONAR_DESCRIPCION,
                                TRN_CLONAR_DETALLE:TRN_CLONAR_DETALLE,
                                },

                    success:function (result, request)
                    {
                        //CERRAR VENTANA MODIFICACION 0109-AAAAA
                        Ext.MessageBox.alert("MENSAJE","Clonacion Exitosa");
                        winFormClonar.hide();
                        storeUser.reload();
                    },
                                
                    failure:function (result, request) 
                    {
                         alert('Falla al guardar registro');
                        storeUser.reload();
                    }
                });
                        /*Ext.getCmp("TRN_CLONAR_DESCRIPCION").reset();
                        Ext.getCmp("TRN_CLONAR_DETALLE").reset();
                        Ext.getCmp("TRN_RUTAS").reset();*/
            }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
                winFormClonar.hide();
                Ext.getCmp("TRN_RUTAS").reset();
                Ext.getCmp("TRN_CLONAR_DESCRIPCION").reset();
                Ext.getCmp("TRN_CLONAR_DETALLE").reset();
            }
        }

        ]
    });
var FormAsignarRuta = new Ext.FormPanel({
        width: 600,
        autoHeight: false,
        height: 500,
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
            xtype:'fieldset',
            title: 'RUTA PRINCIPAL',
            //collapsible: true,
            //autoHeight:true,
            defaults: 
            {width:200},
           // defaultType: 'textfield',
            items :[
                {
                xtype: 'combo',
                fieldLabel:     'RUTA PRINCIPAL',
                id:             'TRN_RUTAS_PRINCIPAL',
                name:           'TRN_RUTAS_PRINCIPAL',
                allowBlank:     true,
                triggerAction:  'all',
                forceSelection: true,
                editable:       true,
                emptyText:      'Seleccione una ruta',
                typeAhead:      true,
                displayField:   'RUTA_DESCRIPCION',
                valueField:     'RUTA_ID',
                store:          storePrincipal,
                listeners: {
                            select: function (combo, record, index) {
                           // globalRuta_Principal = combo.getValue();
                           // alert(globalRuta_Principal);
                            globalRUTA_IDPrincipal = record.data.RUTA_ID_CLON;
                            alert(globalRUTA_IDPrincipal);
                            var PARADASnro = record.data.PARADAS;
                            var RUTA_DETALLE = record.data.RUTA_DETALLE;
                            RUTA_ID_CLON = record.data.RUTA_ID_CLON;
                            alert(RUTA_ID_CLON);
                            var BUSESnro = record.data.BUSES;
                            var RUTA_TIPO_ESTADO = record.data.RUTA_TIPO_ESTADO;
                           // alert(RUTA_TIPO_ESTADO);
                            var campos = Ext.getCmp("INFORMACION_RUTA").setValue(PARADASnro);
                            var buses = Ext.getCmp("INFORMACION_BUS").setValue(BUSESnro);
                            var RUTA_DETALLE = Ext.getCmp("DESCRIPCION_RUTA").setValue(RUTA_DETALLE);
                            RUTA_DETALLE
                            globalNRO_PARADAS = campos + 'Paradas';
                            Ext.Ajax.request({
                                                url: "../servicios/blpRutasAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_ALTERNA",
                                                globalRUTA_IDPrincipal:globalRUTA_IDPrincipal,//PANCHITO
                                                RUTA_TIPO_ESTADO:RUTA_TIPO_ESTADO},
                                                success:function (result, request)
                                                {
                                                storeAlterna.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                },
                                                failure:function (result, request) 
                                                {
                                                Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                });


                            }
                        }
                },
                    {   xtype: 'htmleditor',
                        fieldLabel: 'DESCRIPCION',
                        id: 'DESCRIPCION_RUTA',
                        name: 'DESCRIPCION_RUTA',
                        readOnly: true,
                        width: 30,
                        editable: false,
                        height: 100,
                        width: 300,
                        allowBlank:false                           
                    },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'ESTA RUTA TIENE',
                        id: 'INFORMACION_RUTA',
                        name: 'INFORMACION_RUTA',
                        msgTarget: 'under',
                        items: [
                            {   xtype: 'textfield',
                                fieldLabel: 'PARADAS',
                                id: 'INFORMACION_RUTA',
                                name: 'INFORMACION_RUTA',
                                readOnly: true,
                                editable: 'false',
                                width: 30                          
                            },
                            {  xtype: 'displayfield', 
                               value: 'PARADAS'},
                        ]
                    },
            ]
        },
        {
            xtype:'fieldset',
            title: 'RUTA ALTERNA',
            collapsible: true,
            autoHeight:true,
            defaults: {width: 210},
           // defaultType: 'textfield',
        items :[
          
          {
                xtype: 'combo',
                fieldLabel:     'RUTA ALTERNAS',
                id:             'TRN_RUTAS_ALTERNAS',
                name:           'TRN_RUTAS_ALTERNAS',
                allowBlank:     true,
                triggerAction:  'all',
                forceSelection: true,
                editable:       true,
                emptyText:      'Seleccione una ruta',
                typeAhead:      true,
                displayField:   'RUTA_DESCRIPCION',
                valueField:     'RUTA_ID',
                store:          storeAlterna,
                 listeners: {
                            select: function (combo, record, index) {
                            globalRuta_Alterna = combo.getValue();
                            globalRUTA_IDAlterno = record.data.RUTA_ID;
                            console.log(globalRUTA_IDAlterno);
                            var NroParadas = record.data.PARADAS;
                            var Detalle = record.data.RUTA_DETALLE;
                            var campos = Ext.getCmp("INFORMACION_RUTA_ALTERNA").setValue(NroParadas);
                            var RUTA_DETALLE = Ext.getCmp("DESCRIPCION_RUTA_ALTERNA").setValue(Detalle);
                           
                           // alert(globalRUTA_IDAlterno);

                            }
                        }
              },
                {       xtype: 'htmleditor',
                        fieldLabel: 'DESCRIPCION',
                        id: 'DESCRIPCION_RUTA_ALTERNA',
                        name: 'DESCRIPCION_RUTA_ALTERNA',
                        width: 30,
                       
                        readOnly: true,
                        height: 100,
                        width: 300,
                        allowBlank:false                           
                    },
                    {
                        xtype: 'compositefield',
                        fieldLabel: 'ESTA RUTA TIENE',
                        id: 'INFORMACION_RUTA_ALTERNA',
                        name: 'INFORMACION_RUTA_ALTERNA',
                        msgTarget: 'under',
                        items: [
                            {   xtype: 'textfield',
                                fieldLabel: 'PARADAS',
                                id: 'INFORMACION_RUTA_ALTERNA',
                                name: 'INFORMACION_RUTA_ALTERNA',
                                readOnly: true,
                                editable: 'false',
                                width: 30                          
                            },
                            {  xtype: 'displayfield', 
                               value: 'PARADAS'},
                        ]
                    },
           ]
        },
          //jsCampoLabelEspacio,
          jsLabelClonarPrincipalAlterna,
         // jsCampoLabelEspacio,

           
           {    xtype: 'textfield',
                fieldLabel: 'BUSES.',
                id: 'INFORMACION_BUS',
                name: 'INFORMACION_BUS',
                width: 30,
                                            
           }
        ],
        buttons: [{
            text:  'ASIGNAR',
            id: 'Btn2',
            name: 'Btn2',
            iconCls: 'icon-save',
            handler: function(record, index,btn, ev)  {
                var TRN_CLONAR_DESCRIPCION = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                var TRN_CLONAR_DETALLE = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                Ext.Ajax.request({
                    url: "../servicios/blpRutasAjax.php",
                    method: "POST",
                    params: {   option: "ASIGNAR_PRINCIPAL_ALTERNA", 
                                globalRuta_Principal: globalRuta_Principal,
                                globalRUTA_IDPrincipal: globalRUTA_IDPrincipal,   //asignar_idprincipal
                                globalRuta_Alterna:globalRuta_Alterna,
                                globalRUTA_IDAlterno:globalRUTA_IDAlterno,
                                RUTA_ID_CLON:RUTA_ID_CLON,
                                //globalRUTA_IDAlterno
                                },
                    success:function (result, request)
                    {
                        //CERRAR VENTANA MODIFICACION 0109-AAAAA
                        Ext.MessageBox.alert("MENSAJE","DATOS ASIGNADOS A LA RUTA ALTERNA");
                        winFormAsignarRuta.hide();
                        storeUser.reload();
                    },
                                
                    failure:function (result, request) 
                    {
                         alert('Falla al guardar registro');
                        storeUser.reload();
                    }
                });
                        /*Ext.getCmp("TRN_CLONAR_DESCRIPCION").reset();
                        Ext.getCmp("TRN_CLONAR_DETALLE").reset();
                        Ext.getCmp("TRN_RUTAS").reset();*/
           }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
              winFormAsignarRuta.hide();
              Ext.getCmp("TRN_RUTAS_PRINCIPAL").reset();
              Ext.getCmp("TRN_RUTAS_ALTERNAS").reset();
              Ext.getCmp("INFORMACION_RUTA").reset();
              Ext.getCmp("INFORMACION_BUS").reset();
            }
        },

        ]
    });
var FormModificarAsignarRuta = new Ext.FormPanel({
        width: 500,
        autoHeight: false,
        height: 100,
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
                fieldLabel:     'RUTA ALTERNA',
                id:             'TRN_RUTAS_PRINCIPALM',
                name:           'TRN_RUTAS_PRINCIPALM',
                allowBlank:     true,
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione una ruta',
                typeAhead:      true,
                displayField:   'RUTA_DESCRIPCION',
                valueField:     'RUTA_ID',
                store:          storePrincipalM,
                listeners: {
                            select: function (combo, record, index) {
                           // globalRuta_Principal = combo.getValue();
                           // alert(globalRuta_Principal);
                            globalRUTA_IDPrincipal = record.data.RUTA_ID;
                           //alert(globalRUTA_IDPrincipal);
                            var PARADASnro = record.data.PARADAS;
                            var BUSESnro = record.data.BUSES;
                            var campos = Ext.getCmp("INFORMACION_RUTA").setValue(PARADASnro);
                            var buses = Ext.getCmp("INFORMACION_BUS").setValue(BUSESnro);
                            globalNRO_PARADAS = campos + 'Paradas';
                            Ext.Ajax.request({
                                                url: "../servicios/blpRutasAjax.php",
                                                method: "POST",////recupera
                                                params: {"option": "LST_ALTERNAM",
                                                globalRUTA_IDPrincipal:globalRUTA_IDPrincipal},
                                                success:function (result, request)
                                                {
                                                storeAlternaM.loadData(Ext.util.JSON.decode(result.responseText)); 
                                                
                                                },
                                                failure:function (result, request) 
                                                {
                                                Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                                                }
                                });


                            }
                        }
          },
          
          {
                xtype: 'combo',
                fieldLabel:     'RUTA PRINCIPAL',
                id:             'TRN_RUTAS_ALTERNASM',
                name:           'TRN_RUTAS_ALTERNASM',
                allowBlank:     true,
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione una ruta',
                typeAhead:      true,
                displayField:   'RUTA_DESCRIPCION',
                valueField:     'RUTA_ID',
                store:          storeAlternaM,
                 listeners: {
                            select: function (combo, record, index) {
                            globalRuta_Alterna = combo.getValue();
                            globalRUTA_IDAlterno = record.data.RUTA_ID;

                            }
                        }
          }
         //jsCampoLabelEspacio,
         // jsLabelClonarPrincipalAlternaM,
          //jsCampoLabelEspacio,
        /*   {    xtype: 'textfield',
                fieldLabel: 'PARADAS',
                id: 'INFORMACION_RUTAM',
                name: 'INFORMACION_RUTAM',
                width: 30,
                                            
            },
           {    xtype: 'textfield',
                fieldLabel: 'BUSES.',
                id: 'INFORMACION_BUSM',
                name: 'INFORMACION_BUSM',
                width: 30,
                                            
           }*/
        ],
        buttons: [{
            text:  'ASIGNAR',
            id: 'Btn1',
            name: 'Btn1',
            iconCls: 'icon-save',
            handler: function(record, index,btn, ev)  {
                var TRN_CLONAR_DESCRIPCION = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                var TRN_CLONAR_DETALLE = Ext.getCmp('TRN_CLONAR_DESCRIPCION').getValue();
                Ext.Ajax.request({
                    url: "../servicios/blpRutasAjax.php",
                    method: "POST",
                    params: {   option: "ASIGNAR_PRINCIPAL_ALTERNA_MODIFICAR", 
                                globalRuta_Principal: globalRuta_Principal,
                                globalRUTA_IDPrincipal: globalRUTA_IDPrincipal, //principal
                                globalRuta_Alterna:globalRuta_Alterna,
                                globalRUTA_IDAlterno:globalRUTA_IDAlterno,
                                RUTA_ID_CLON:RUTA_ID_CLON, //principal
                                },
                    success:function (result, request)
                    {
                        //CERRAR VENTANA MODIFICACION 0109-AAAAA
                        Ext.MessageBox.alert("MENSAJE","DATOS ASIGNADOS A LA RUTA ALTERNA");
                        winFormModificarRuta.hide();
                        storeUser.reload();
                    },
                                
                    failure:function (result, request) 
                    {
                         alert('Falla al guardar registro');
                        storeUser.reload();
                    }
                });
                        /*Ext.getCmp("TRN_CLONAR_DESCRIPCION").reset();
                        Ext.getCmp("TRN_CLONAR_DETALLE").reset();
                        Ext.getCmp("TRN_RUTAS").reset();*/
           }
        },{
            text: 'CANCELAR',
            iconCls: 'icon-cancel',
            handler: function(){
              winFormModificarRuta.hide();
              Ext.getCmp("TRN_RUTAS_PRINCIPALM").reset();
              Ext.getCmp("TRN_RUTAS_ALTERNASM").reset();
            }
        },

        ]
    });
    var winFormClonar = new Ext.Window({
        layout: 'fit',      
        id: 'FormClonacion',
        name: 'FormClonacion',
        closeAction: 'hide',
        plain: true,
        title: 'CLONACION RUTAS Y PARADAS',
        items: newFormClonacion
    });
    var winFormAsignarRuta = new Ext.Window({
        layout: 'fit',      
        id: 'Form',
        name: 'Form',
        closeAction: 'hide',
        plain: true,
        title: 'ASIGNAR RUTAS',
        items: FormAsignarRuta
    });
    var winFormModificarRuta = new Ext.Window({
        layout: 'fit',      
        id: 'FormMo',
        name: 'FormMo',
        closeAction: 'hide',
        plain: true,
        title: 'MODIFICAR ASIGNAR RUTA',
        items: FormModificarAsignarRuta
    });

 
	newFormUpdRuta = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                autoHeight: true,
                height: 350,
                bodyStyle: 'padding: 10px 10px 10px 10px;',
                labelWidth: 120,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                defaultType: 'textfield',
                items: [{
                        fieldLabel: 'RUTA',
                        id: 'RUTA_DESCRIPCION_LABEL1',
                        name: 'RUTA_DESCRIPCION_LABEL1',
                        vtype: 'uppercase',
                        allowBlank:false
                    },{
                        xtype:'htmleditor',
                        fieldLabel: 'DESCRIPCION',
                        id: 'RUTA_DETALLE_LABEL1',
                        vtype: 'uppercase',
                        name: 'RUTA_DETALLE_LABEL1',
                        allowBlank:false,
                        width: 30,
                        editable: false,
                        height: 100,
                        width: 300
                    }/*,{
                        fieldLabel: 'ESTADO',
                        id: 'RUTA_ESTADO_COMBO1',
                        name: 'RUTA_ESTADO_COMBO1',
                        allowBlank: false,
            						xtype:          'combo',
            						mode:           'local',
            						//value:          'ACTIVO',
            						triggerAction:  'all',
            						forceSelection: true,
            						editable:       false,
            						emptyText: 'Seleccione Estado ...',
            						typeAhead: true,
            						displayField:   'nombre',
            						valueField:     'valor',
            						store: new Ext.data.JsonStore({
            							fields : ['nombre', 'valor'],
            							data   : [
            								{nombre : 'PRINCIPAL',   valor: 'PRINCIPAL'},
            								{nombre : 'ALTERNA', valor: 'ALTERNA'}
            							]
            						})
                    }*/
                ],
                buttons: [{
                    text: 'MODIFICAR',
					           iconCls: 'icon-save',	
                    handler: function() {
        					    var rec = grdpnlUser.getSelectionModel().getSelected();
        						if (!rec) {
        							return false;
        						}
						            var value = rec.get('RUTA_ID');
                        if(newFormUpdRuta.getForm().isValid()){
                            form_action = 1;
                            newFormUpdRuta.getForm().submit({
                                url: '../servicios/blpRutasAjax.php',																
                  					method: "POST",
                  					params: {"option": "UPD", "i": value},
                                    waitMsg: 'Registro Modificado ...',
                                    success: function(form, action){
                                    storeUser.reload();
                                      //alert('Registro Modificado ...');
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO MODIFICADO");
                                    },
                                    failure: function(form, action){
                                      //alert('Registro no modificado');
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO NO MODIFICADO");
                                            }
                            });
                            winFormUpdRuta.hide();
                        }
                    }
                    }, {
                        text: 'CANCELAR',
						iconCls: 'icon-cancel',
                        handler: function(){
                        winFormUpdRuta.hide();
                    }
                }]
    })

    winFormUpdRuta = new Ext.Window({
		layout: 'fit',
		width: 500,
		height: 240,
		closeAction: 'hide',
		plain: true,
		title: 'MODIFICA RUTA',
		items: newFormUpdRuta
    });
    
	var btnDelRuta = new Ext.Action({
      id: "btnDelRuta",
      text: "DAR BAJA",
	  iconCls: 'icon-del',
      handler:     function onDelete() {
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
          Ext.MessageBox.alert("MENSAJE", "DEBE SELECCIONAR UN REGISTRO");
            return false;
        }
        var value = rec.get('RUTA_ID');
        var tot = rec.get('TOTAL');
        if(tot==0)
        {
            Ext.MessageBox.confirm("ELIMINAR", "REALÑMENTE DESEA ELIMINAR", function (id, value2){                              
            if (id === 'yes') { 
                Ext.Ajax.request({
		            url: "../servicios/blpRutasAjax.php",
                    method: "POST",
                    params: {"option": "DEL", "i": value},
                    success:function (result, request) {
                          Ext.MessageBox.alert("MENSAJE", "DATO ELIMINADO");
                          storeUser.reload();
                        },
                    failure:function (result, request) {
                          Ext.MessageBox.alert("MENSAJE", "Fallo");
                        }
                });
              }
            });
        }
        else{
          Ext.MessageBox.alert("MENSAJE", "La Ruta seleccionada tiene paradas asignadas, No puede dar de baja");
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
		store: storeUser,
		displayInfo: true,
		displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
		emptyMsg: "No roles to display",
		items: ["-", "Tamanio de pagina:", cboPageSize]
    });

    var cmodelRuta = new Ext.grid.ColumnModel({
		defaults: {
        sortable:true
    },
		columns:[
    new Ext.grid.RowNumberer(),
		//	{id: "ID", header: "ID", dataIndex: "RUTA_ID", hidden: false, hideable: true, width: 50},
			{header: "RUTA", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "DESCRIPCION", dataIndex: "RUTA_DETALLE", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "NRO PARADAS ASIGNADAS", dataIndex: "TOTAL", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
            {header: "TIPO DE RUTA", dataIndex: "RUTA_TIPO_ESTADO", align: "left", hidden:false, hideable: false, editor: new Ext.form.TextField({}),
                renderer: function(v, params, data){
                    return ((v === 'PRINCIPAL') ? '<font color="green">PRINCIPAL</font>' : '<font color="red">ALTERNA</font>')
                }
            },
            {header: "REGISTRO", dataIndex: "RUTA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "MODIFICACION", dataIndex: "RUTA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			{header: "USUARIO", dataIndex: "RUTA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			
		]
	});

    var smodel = new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
        rowselect: function (sm) {
			var rec = grdpnlUser.getSelectionModel().getSelected();
			if (!rec) {
				return false;
			}
			var value = rec.get('RUTA_ID');
			//storeUserProcessParada(pageSizeParada, pageSizeParada, 0,value);//dav01 core x01		
        },
        rowdeselect: function (sm) {
        }
      }
    });
	

    var grdpnlUser = new Ext.grid.GridPanel({
		id: "grdpnlUser",
		store: storeUser,
		colModel: cmodelRuta,
		selModel: smodel,
		columnLines: true,
		viewConfig: {forceFit: true},
		enableColumnResize: true,
		enableHdMenu: true, 
		tbar: [btnNewRuta,btnUpdRuta, btnDelRuta,jsCampoLabel,TRN_CNSL_ID,jsBtnAsignaRuta,jsBtnModificarAsignar,'->',jsBtnClonacion],
		bbar: pagingUser,
		style: "margin: 0 auto 0 auto;",
		width: '100%',
		height: '450',
		title: 'ADMINISTRACION DE RUTAS',
		renderTo: "divMain",
		listeners:{
			 
		},
        view : new Ext.grid.GroupingView({  
              forceFit:true,
              startCollapsed: true,
              groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Registros" : "Registro"]})'

        })
    });
	
    //Initialize events  grdpnlUser
    storeUserProcess(pageSize, pageSize, 0);
    cboPageSize.setValue(pageSize);
	


    var viewport = new Ext.Viewport({
		layout : 'fit',
		items : [grdpnlUser]
    });

	
  }
  
}

Ext.onReady(acl.application.init, acl.application);

