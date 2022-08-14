Ext.namespace("acl");
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";
var LABEL_TITLE_PANEL_1 = "..:: LIQUIDACIONES MANUALES ::..";
var LABEL_BTN_SEARCH = "Search",
    LABEL_MSG_SEARCH = "search ...";
var sw = 0;
var montoBs = 0;
var DESDE = "Desde";
//montoPasaje
var montoPasaje = 0;
acl.application = {
    init: function () {
        function calcularTarifas(){
            var mDiurno = Ext.getCmp('LABEL_NORMALDIURNO').getValue();//NORMAL
            var mNormalNocturno = Ext.getCmp('LABEL_NORMALNOCTURNO').getValue();
            var mPreferencialDiurno =  Ext.getCmp('LABEL_PREFERENCIALDIURNO').getValue();//PREFERENCIAL
            var mPreferencialNocturno = Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').getValue();//NOCTURNO
            if(montoPasaje==0){                
                Ext.MessageBox.alert("Alert", "Seleccione Ruta Porfavor ...");
                Ext.getCmp('LABEL_NORMALDIURNO').setValue('');//NORMAL
                Ext.getCmp('LABEL_NORMALNOCTURNO').setValue('');
                Ext.getCmp('LABEL_PREFERENCIALDIURNO').setValue('');//PREFERENCIAL
                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').setValue('');//NOCTURNO
                Ext.getCmp('LABEL_NOMBRE').setValue('');//NOCTURNO
            }
            if(mDiurno!=''){
                mDiurno = (parseFloat(mDiurno)) * montoPasaje;
            }else{
                mDiurno = parseFloat(0);
            }
            if(mPreferencialDiurno!=''){
                mPreferencialDiurno = parseFloat(mPreferencialDiurno);
            }else{
                mPreferencialDiurno = parseFloat(0);
            }
            if(mPreferencialNocturno!=''){
                mPreferencialNocturno = parseFloat(mPreferencialNocturno);
            }else{
                mPreferencialNocturno = parseFloat(0);
            }
            if(mNormalNocturno!=''){
                mNormalNocturno = parseFloat(mNormalNocturno) * 3;
            }else{
                mNormalNocturno = parseFloat(0);
            }
            var mMonto = mDiurno + mPreferencialDiurno + mNormalNocturno + mPreferencialNocturno;
            mMonto =  parseFloat(mMonto).toFixed(2);
            Ext.getCmp('LABEL_NOMBRE').setValue(mMonto);            
        }        

        storeFuncionarioProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            //AJAX FUNCIONARIOS
            Ext.Ajax.request({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "vFechaInicio": DESDE,
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },
                success: function (result, request) {
                    storeFuncionario.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);                    
                }
            });
            //AJAX EXPEDIDO 
            Ext.Ajax.request({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST",
                params: {
                    "option": "LSTRUTA",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeRuta.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
            //AJAX EXPEDIDO
            Ext.Ajax.request({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST",
                params: {
                    "option": "LSTANF",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },
                success: function (result, request) {
                    storeExpedido.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
            });
            //AJAX estado civil
            Ext.Ajax.request({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST",
                params: {
                    "option": "LSTHRR",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeEstCivil.loadData(Ext.util.JSON.decode(result.responseText));
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
        var pageSize = parseInt(20 /*CONFIG.pageSize*/ );
        var message = "por implementar ..."; // CONFIG.message;
        var storeFuncionario = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST"
            }),         

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [
                { name: "LDQ_ID",
                    allowBlank: false
                }, {
                    name: "LQD_ANFITRION",
                    allowBlank: false
                }, {
                    name: "LQD_CAJERO",
                    allowBlank: false
                }, {
                    name: "LQD_HRR_ID",
                    allowBlank: false
                }, {
                    name: "TIPO_HERRAMIENTA_CODIGO",
                    allowBlank: false
                }, {
                    name: "LQD_PRG_ID",
                    allowBlank: false
                }, {
                    name: "LQD_GIRO_ID",
                    allowBlank: false
                }, {
                    name: "LQD_MONTO",
                    allowBlank: false
                }, {
                    name: "LQD_CONFIRMADO",
                    allowBlank: false
                }, {
                    name: "LQD_FLUJO",
                    allowBlank: false
                }, {
                    name: "LQD_TIPO",
                    allowBlank: false
                }, {
                    name: "LQD_MONTOSF",
                    allowBlank: false
                }, {
                    name: "LQD_ESTADO",
                    allowBlank: false
                }, {
                    name: "ANFITRION_NOMBRES",
                    allowBlank: false
                }, {
                    name: "CAJERO_NOMBRES",
                    allowBlank: false
                }, {
                    name: "LQD_MONTOSF",
                    allowBlank: false
                }, {
                    name: "RESULTADO",
                    allowBlank: false
                },{
                    name: "RUTA_DESC_GRILLA",
                    allowBlank: false
                },{
                    name: "LQD_REGISTRO2",
                    allowBlank: false
                },
                {
                    name: "LQD_NRO_MAGICO",
                    allowBlank: false
                },
                {
                    name: "LQD_ND",
                    allowBlank: false
                },
                {
                    name: "LQD_NN",
                    allowBlank: false
                },
                {
                    name: "LQD_PD",
                    allowBlank: false
                },
                {
                    name: "LQD_PN",
                    allowBlank: false
                },
                {
                    name: "iddd",
                    allowBlank: false
                },
                {
                    name: "LQD_TIPO_HERRAMIENTA_ID",
                    allowBlank: false
                },
                {
                    name: "LQD_TURNO",
                    allowBlank: false
                }
                ]
            }),            
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LST",
                        "vFechaInicio": DESDE,
                        "pageSize": pageSize
                    };
                }
            }
        });
        
        var storeExpedido = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "FUNCIONARIO_ID",
                        allowBlank: false
                    },

                    {
                        name: "FUNCIONARIO_NOMBRES",
                        allowBlank: false
                    },
                ]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LSTANF",
                        "pageSize": pageSize
                    };
                }
            }
        });
        var storeRuta = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "RUTA_ID",
                        allowBlank: false
                    },
                    {
                        name: "RUTA_DESCRIPCION",
                        allowBlank: false
                    }
                ]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LSTRUTA",
                        "pageSize": pageSize
                    };
                }
            }
        });
        //store estados civiles
        var storeEstCivil = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpAperturasAjax.php",
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{
                        name: "TIPO_HERRAMIENTA_ID",
                        allowBlank: false
                    },

                    {
                        name: "TIPO_HERRAMIENTA_CODIGO",
                        allowBlank: false
                    },

                ]
            }),
            listeners: {
                beforeload: function (store) {
                    this.baseParams = {
                        "option": "LSTHRR",
                        "pageSize": pageSize
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
                ["50"],
                ["100"]
            ],
            autoLoad: true
        });
        var storeTurnos = new Ext.data.SimpleStore({
            fields: ["turno"],
            data: [
                ["TURNO DIURNO (5:30-13:30)"],
                ["TURNO TARDE (13:30-21:30)"],
                ["TURNO TRASNOCHE (21:30-5:30)"]
            ],
            autoLoad: true
        });
        newForm = new Ext.FormPanel({
            autoscroll: true,
            width: 500,
            autoHeight: true,
            height: 100,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 180,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            items: [{
                    fieldLabel: 'TURNO',
                    id: 'LABEL_TURNO',
                    name: 'LABEL_TURNO',
                    allowBlank: false,
                    xtype: 'combo',
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    emptyText: 'Seleccione Turno ...',
                    typeAhead: true,
                    hiddenName: 'turno',
                    displayField: 'turno',
                    valueField: 'turno',
                    selectOnFocus: true,  
                    store: storeTurnos
                },{
                    fieldLabel: 'ANFITRION',
                    id: 'LABEL_EXPEDIDO',
                    name: 'LABEL_EXPEDIDO',
                    allowBlank: false,
                    xtype: 'combo',
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    emptyText: 'Seleccione Anfitrion ...',
                    typeAhead: true,
                    hiddenName: 'H_FUNCIONARIO_ID',
                    displayField: 'FUNCIONARIO_NOMBRES',
                    valueField: 'FUNCIONARIO_ID',
                    selectOnFocus: true,  
                    store: storeExpedido,
                    listeners: {
                        select: function(combo, record, index) {
                          Ext.getCmp('LABEL_MAGICO').setValue('');
                          nro1 = Ext.getCmp('LABEL_EXPEDIDO').getValue();
                          nro2 = Ext.getCmp('LABEL_ESTCIVIL').getValue();
                          nroFinal = nro1 + "-" + nro2 + "-" ;
                          Ext.getCmp('LABEL_MAGICO').setValue(nroFinal);
                        }
                    }
                }, {
                    fieldLabel: 'BUS',
                    id: 'LABEL_ESTCIVIL',
                    name: 'LABEL_ESTCIVIL',
                    allowBlank: false,
                    xtype: 'combo',
                    mode: 'local',                   
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    emptyText: 'Seleccione Bus ...',
                    typeAhead: true,
                    hiddenName: 'TIPO_HERRAMIENTA_ID',
                    displayField: 'TIPO_HERRAMIENTA_CODIGO',
                    valueField: 'TIPO_HERRAMIENTA_ID',
                    selectOnFocus: true,  
                    store: storeEstCivil,
                    listeners: {
                        select: function(combo, record, index) {
                          Ext.getCmp('LABEL_MAGICO').setValue('');
                          nro1 = Ext.getCmp('LABEL_EXPEDIDO').getValue();
                          nro2 = Ext.getCmp('LABEL_ESTCIVIL').getValue();
                          nroFinal = nro1 + "-" + nro2 + "-" ;
                          Ext.getCmp('LABEL_MAGICO').setValue(nroFinal);
                        }
                    }
                },
                //nuevo
                {
                    fieldLabel: 'LINEA',
                    id: 'LABEL_RUTA',
                    name: 'LABEL_RUTA',
                    allowBlank: false,
                    xtype: 'combo',
                    mode: 'local',                   
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    emptyText: 'Seleccione Ruta...',
                    typeAhead: true,
                    hiddenName: 'H_RUTA_ID',
                    displayField: 'RUTA_DESCRIPCION',
                    valueField: 'RUTA_ID',
                    selectOnFocus: true,  
                    store: storeRuta,
                    listeners: {
                        select: function(combo, record, index) {
                          if(index == 0){
                            montoPasaje = 1.80;
                          }
                          if(index == 1){
                            montoPasaje = 1.80;
                          }
                          if(index == 2){
                            montoPasaje = 2;
                          }
                        }
                    }
                },{
                        xtype: 'checkbox',
                        id: 'CHK_PROBLEMA',
                        name: 'CHK_PROBLEMA',
                        fieldLabel: 'REGISTRO CON PROBLEMAS',
                        listeners: {check: function(){
                            var cb1 = Ext.getCmp('CHK_PROBLEMA').getValue();
                            if (cb1 == true) {
                                //Ext.getCmp('LABEL_MAGICO').setDisabled(true);
                                //Ext.getCmp('LABEL_MAGICO').readOnly=true;
                                Ext.getCmp('LABEL_MAGICO').getEl().dom.setAttribute('readOnly', true);


                                Ext.getCmp('LABEL_NORMALDIURNO').getEl().dom.setAttribute('readOnly', true);
                                Ext.getCmp('LABEL_NORMALNOCTURNO').getEl().dom.setAttribute('readOnly', true);
                                Ext.getCmp('LABEL_PREFERENCIALDIURNO').getEl().dom.setAttribute('readOnly', true);
                                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').getEl().dom.setAttribute('readOnly', true);
                                Ext.getCmp('LABEL_MATERNO').getEl().dom.setAttribute('readOnly', true);

                                nro1 = Ext.getCmp('LABEL_EXPEDIDO').getValue();
                                nro2 = Ext.getCmp('LABEL_ESTCIVIL').getValue();

                                nroFinal = nro1 + '-' + nro2 + "-00-00";
                                Ext.getCmp('LABEL_MAGICO').setValue(nroFinal);
                                Ext.getCmp('LABEL_NORMALDIURNO').setValue(0);
                                Ext.getCmp('LABEL_NORMALNOCTURNO').setValue(0);
                                Ext.getCmp('LABEL_PREFERENCIALDIURNO').setValue(0);
                                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').setValue(0);
                                Ext.getCmp('LABEL_MATERNO').setValue(0);

                                Ext.getCmp('LABEL_NOMBRE').focus(false, 200);
                                Ext.getCmp('LABEL_NOMBRE').getEl().dom.removeAttribute('readOnly');
                            } else {
                                Ext.getCmp('LABEL_NOMBRE').getEl().dom.setAttribute('readOnly', true);
                                Ext.getCmp('LABEL_MAGICO').getEl().dom.removeAttribute('readOnly');
                                Ext.getCmp('LABEL_NORMALDIURNO').getEl().dom.removeAttribute('readOnly');
                                Ext.getCmp('LABEL_NORMALNOCTURNO').getEl().dom.removeAttribute('readOnly');
                                Ext.getCmp('LABEL_PREFERENCIALDIURNO').getEl().dom.removeAttribute('readOnly');
                                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').getEl().dom.removeAttribute('readOnly');
                                Ext.getCmp('LABEL_MATERNO').getEl().dom.removeAttribute('readOnly');

                                nro1 = Ext.getCmp('LABEL_EXPEDIDO').getValue();
                                nro2 = Ext.getCmp('LABEL_ESTCIVIL').getValue();
                                nroFinal = nro1 + '-' + nro2 + "-";
                                Ext.getCmp('LABEL_MAGICO').setValue(nroFinal);

                                Ext.getCmp('LABEL_NORMALDIURNO').reset();
                                Ext.getCmp('LABEL_NORMALNOCTURNO').reset();
                                Ext.getCmp('LABEL_PREFERENCIALDIURNO').reset();
                                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').reset();
                                //Ext.getCmp('LABEL_TURNO').reset();
                                Ext.getCmp('LABEL_MATERNO').reset();
                                Ext.getCmp('LABEL_NOMBRE').reset();
                                Ext.getCmp('LABEL_MAGICO').focus(false, 200);
                            }
                                
                        }}
                    }
                ,{
                    xtype: 'textfield',
                    fieldLabel: 'NRO. SEGURIDAD',
                    id: 'LABEL_MAGICO',
                    name: 'LABEL_MAGICO',
                    allowBlank: false,
                },
                 {
                    xtype: 'numberfield',
                    fieldLabel: 'PREFERENCIAL ',
                    id: 'LABEL_PREFERENCIALDIURNO',
                    name: 'LABEL_PREFERENCIALDIURNO',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners:{
                        'keyup': {                                
                            fn: function(obj) {
                                calcularTarifas();
                            }
                        }
                    }
                }
                , {
                    xtype: 'numberfield',
                    fieldLabel: 'NORMAL ',
                    id: 'LABEL_NORMALDIURNO',
                    name: 'LABEL_NORMALDIURNO',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners:{
                        'keyup': {                                
                            fn: function(obj) {
                                calcularTarifas();
                            }
                        }
                    }
                },
                 {
                    xtype: 'numberfield',
                    fieldLabel: ' NOCTURNO',
                    id: 'LABEL_NORMALNOCTURNO',
                    name: 'LABEL_NORMALNOCTURNO',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners:{
                        'keyup': {                                
                            fn: function(obj) {
                                calcularTarifas();
                            }
                        }
                    }
                },
                {
                    xtype: 'hidden',
                    fieldLabel: 'PREFERENCIAL NOCTURNO',
                    id: 'LABEL_PREFERENCIALNOCTURNO',
                    name: 'LABEL_PREFERENCIALNOCTURNO',
                    allowBlank: false,
                    value: '0',
                    listeners:{
                        change: function(field, newValue, oldValue){
                            calcularTarifas();
                        }
                    }
                },
                 {
                    xtype: 'numberfield',
                    fieldLabel: 'MONTO RECAUDADO',
                    id: 'LABEL_NOMBRE',
                    name: 'LABEL_NOMBRE',
                    allowBlank: false,
                    readOnly: true,
                    listeners:{
                        change: function(field, newValue, oldValue){
                            var cb1 = Ext.getCmp('CHK_PROBLEMA').getValue();
                            if (cb1 == false) {
                                calcularTarifas();
                            }
                        }
                    }
                }
                , {
                    xtype: 'numberfield',
                    fieldLabel: 'SOBRANTE',
                    id: 'LABEL_PATERNO',
                    name: 'LABEL_PATERNO',
                    allowBlank: true, 
                    allowNegative: false, 
                    //blankText: "This field is required",
                    enableKeyEvents: true,
                    listeners: {
                        'keyup': {
                            fn: function (campo, obj) {
                                var valorInicial = campo.getValue();
                                var cantidad = Ext.getCmp('LABEL_NOMBRE').getValue();
                                if(valorInicial!=0){
                                var respuesta = cantidad + valorInicial;
                                var valorDecimal = respuesta.toFixed(parseInt(2));
                                Ext.getCmp('LABEL_CI').setValue(valorDecimal);
                                Ext.getCmp('LABEL_MATERNO').setValue();
                                }else{
                                    var tt = Ext.getCmp('LABEL_MATERNO').getValue();
                                     if(valorInicial==0 && valorInicial==0){
                                         Ext.getCmp('LABEL_CI').setValue(cantidad);
                                     }
                                     else
                                     {
                                     Ext.getCmp('LABEL_CI').setValue();  }
                                }

                            } 
                        }
                    } 
                }, {
                    xtype: 'hidden',
                    fieldLabel: 'FALTANTES',
                    id: 'LABEL_MATERNO',
                    name: 'LABEL_MATERNO',
                    allowBlank: true, 
                    value: '0',
                    enableKeyEvents: true,
                    listeners: {
                        'keyup': {
                            fn: function (campo, obj) {
                                var valorInicial = campo.getValue();
                                var cantidad = Ext.getCmp('LABEL_NOMBRE').getValue();
                                if(valorInicial!=0){
                                var respuesta = cantidad -valorInicial;
                                var valorDecimal = respuesta.toFixed(parseInt(2));
                                Ext.getCmp('LABEL_CI').setValue(valorDecimal);
                                Ext.getCmp('LABEL_PATERNO').setValue();
                                }else{
                                    var tt = Ext.getCmp('LABEL_MATERNO').getValue();
                                     if(valorInicial==0 && valorInicial==0){
                                         Ext.getCmp('LABEL_CI').setValue(cantidad);
                                     }
                                     else
                                     {
                                     Ext.getCmp('LABEL_CI').setValue();  }
                                }

                            } 
                        }
                    } 
                },{
                    xtype: 'numberfield',
                    fieldLabel: '<b>TOTAL POR RECIBIR</b>',
                    id: 'LABEL_CI',
                    name: 'LABEL_CI',
                    allowBlank: false,
                    //disabled: true,
                    readOnly: true,
                    height: 50,
                    style: 'font: bold 30px arial black; color:#FF0000;',
                }         
            ],
            buttons: [{
                id: 'btnSave',
                name: 'btnSave',
                text: 'GRABAR',
                handler: function () {
                    Ext.Msg.confirm('Cobrando Pasajes', 'Usted cobrara: ' +  Ext.getCmp('LABEL_CI').getValue() + '<br> Esta seguro de querer hacer esto?',function(btn){  
                              if(btn === 'yes'){  
                                  if (newForm.getForm().isValid()) {
                                    form_action = 1; 
                                    
                                    if (sw == 0) {
                                        newForm.getForm().submit({
                                            url: '../servicios/blpAperturasAjax.php?option=NEW',
                                            waitMsg: 'Saving record ...',
                                            success: function (form, action) {
                                                storeFuncionario.reload();
                                            },
                                            failure: function (form, action) {
                                                alert('Fail saving record');
                                            }
                                        });
                                        winForm.hide();
                                    } else {
                                        form_action = 1;
                                        var rec = grdpnlUser.getSelectionModel().getSelected();
                                        if (!rec) {
                                            return false;
                                        }
                                        var value = rec.get('FUNCIONARIO_ID');
                                        newForm.getForm().submit({
                                            url: '../servicios/blpAperturasAjax.php?option=UPD',
                                            method: "POST",
                                            params: {
                                                "option": "UPD",
                                                "i": value
                                            },
                                            waitMsg: 'Registro Modificado ...',
                                            success: function (form, action) {
                                                storeFuncionario.reload();
                                                alert('Registro Modificado ...');
                                            },
                                            failure: function (form, action) {
                                                alert('Registro no modificado');
                                            }
                                        });
                                        winForm.hide();
                                        value = Ext.getCmp('cboEstado').getValue();
                                        storeFuncionario.filter("RUTA_DESC_GRILLA",value);
                                    }
                                } 
                                else {
                                    Ext.MessageBox.alert("Advertencia", "Debe tener los datos llenos");
                                }
                              }     
                          });
                }
            }, {
                text: 'CANCELAR',
                handler: function () {
                    Ext.getCmp('LABEL_EXPEDIDO').reset();
                    Ext.getCmp('LABEL_ESTCIVIL').reset();
                    Ext.getCmp('LABEL_RUTA').reset();
                    Ext.getCmp('LABEL_CI').reset();
                    Ext.getCmp('LABEL_NOMBRE').reset();
                    Ext.getCmp('LABEL_PATERNO').reset();
                    Ext.getCmp('LABEL_MATERNO').reset();
                    Ext.getCmp('LABEL_MAGICO').reset();
                    Ext.getCmp('LABEL_NORMALDIURNO').reset();
                    Ext.getCmp('LABEL_NORMALNOCTURNO').reset();
                    Ext.getCmp('LABEL_PREFERENCIALDIURNO').reset();
                    Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').reset();
                    Ext.getCmp('LABEL_TURNO').reset();
                    Ext.getCmp('CHK_PROBLEMA').reset();
                    winForm.hide();
                }
            }]
        });
        winForm = new Ext.Window({
            layout: 'fit',
            closeAction: 'hide',
            plain: true,
            title: 'LIQUIDACION MANUAL',
            items: newForm
        });
        var btnNew = new Ext.Action({
            id: "btnNew",
            text: "ADICIONAR",
            iconCls: 'icon-add',
            handler: function () {
                sw = 0;
                Ext.getCmp('LABEL_EXPEDIDO').reset();
                Ext.getCmp('LABEL_ESTCIVIL').reset();
                Ext.getCmp('LABEL_RUTA').reset();
                Ext.getCmp('LABEL_CI').reset();
                Ext.getCmp('LABEL_NOMBRE').reset();
                Ext.getCmp('LABEL_PATERNO').reset();
                Ext.getCmp('LABEL_MATERNO').reset();
                Ext.getCmp('LABEL_MAGICO').reset();
                Ext.getCmp('LABEL_NORMALDIURNO').reset();
                Ext.getCmp('LABEL_NORMALNOCTURNO').reset();
                Ext.getCmp('LABEL_PREFERENCIALDIURNO').reset();
                Ext.getCmp('LABEL_PREFERENCIALNOCTURNO').reset();
                Ext.getCmp('LABEL_TURNO').reset();
                Ext.getCmp('CHK_PROBLEMA').reset();
                winForm.show(this);
            }
        });
        var btnUpt = new Ext.Action({
            id: "btnUpt",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');
                winForm.title = 'Modificar';
                doCargaFormulario(rec);
            }
        });
        function doCargaFormulario(record) {
            Ext.getCmp('LABEL_CI').setValue(record.get('FUNCIONARIO_CI'));
            Ext.getCmp('LABEL_NOMBRE').setValue(record.get('FUNCIONARIO_NOMBRES'));
            Ext.getCmp('LABEL_PATERNO').setValue(record.get('FUNCIONARIO_PATERNO'));
            Ext.getCmp('LABEL_MATERNO').setValue(record.get('FUNCIONARIO_MATERNO'));
            Ext.getCmp('btnSave').setText('Modificar');
            sw = 1;
            winForm.show(this);
        }
    var btnImprimir = new Ext.Action({
                id: "btnImprimir",
                text: "Imprimir Recibo",
                iconCls: 'icon-viewer',
                handler:     function onImprimir() {
                  var rec = grdpnlUser.getSelectionModel().getSelected();
                  if (!rec) {
                      return false;
                  }
                  var vRuta =  rec.get('RUTA_DESC_GRILLA');
                  var vHRR = rec.get('TIPO_HERRAMIENTA_CODIGO');
                  var vND = rec.get('LQD_ND');
                  var vNN = rec.get('LQD_NN');
                  var vPD = rec.get('LQD_PD');
                  var vPN = rec.get('LQD_PN');
                  var vPasajes = 0;
                  vPasajesNocturnos = parseInt(vNN) + parseInt(vPN);
                  vPasajes = parseInt(vND) + parseInt(vNN) + parseInt(vPD) + parseInt(vPN);
                  var vMontoRecaudo = rec.get('LQD_MONTO');
                  var vMontoSF = rec.get('LQD_MONTOSF');
                  var vMontoCobrar = rec.get('RESULTADO');
                  //vMontoCobrar =  parseFloat(eval(vMontoRecaudo +  vMontoSF));
                  var vCajero = rec.get('CAJERO_NOMBRES');
                  var vNombre = rec.get('ANFITRION_NOMBRES');
                  var vIdLiq = rec.get('iddd');
                  var vIdMagico = rec.get('LQD_NRO_MAGICO');
                  var vFecha = rec.get('LQD_REGISTRO2');
                  Ext.ux.ReciboPrinter.stylesheetPath = "../ext/print.css";
                  var url = '../ext/fondo_blanco_1.jpg';
                  var sTitulos = vRuta + "|" + vHRR + "|" + vND + "|" + vPD + "|" + vPasajesNocturnos + "|" + vPasajes + "|" + vMontoRecaudo + "|" + vMontoSF + "|" + vMontoCobrar + "|" + vCajero + "|" + vNombre + "|" + vIdLiq + "|" + vIdMagico ;
                  Ext.ux.ReciboPrinter.print(grdpnlUser,vFecha,url,sTitulos);
                }
            });
    var btnDel = new Ext.Action({
            id: "btnDel",

            text: "DAR BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    return false;
                }
                var value = rec.get('FUNCIONARIO_ID');
                Ext.Ajax.request({
                    url: "../servicios/blpAperturasAjax.php",
                    method: "POST",
                    params: {
                        "option": "DEL",
                        "i": value
                    },
                    success: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Succesfully");
                        storeFuncionario.reload();
                    },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Fail saving record");
                    }
                });
            }
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
            store: storeFuncionario,
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
            columns: [
                {
                    id: "ID",
                    header: "ID",
                    dataIndex: "LDQ_ID",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({}),
                    width: 40
                },
                {
                    header: "iddd ",
                    dataIndex: "iddd",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }
                /*,{
                    header: "LQD_ANFITRION ",
                    dataIndex: "LQD_ANFITRION",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }*/,{
                    header: "NOMBRE ANFITRION ",
                    dataIndex: "ANFITRION_NOMBRES",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }/*, {
                    header: "LQD_CAJERO",
                    dataIndex: "LQD_CAJERO",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }*/, {
                    header: "NOMBRE CAJERO",
                    dataIndex: "CAJERO_NOMBRES",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }
                , {
                    header: "LQD_HRR_ID",
                    dataIndex: "LQD_HRR_ID",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                {
                    header: "BUS",
                    dataIndex: "TIPO_HERRAMIENTA_CODIGO",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                {
                    header: "LINEA",
                    dataIndex: "RUTA_DESC_GRILLA",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                 {
                    header: "NUMERO DE SEGURIDAD",
                    dataIndex: "LQD_NRO_MAGICO",
                    align: "left",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                 {
                    header: "LQD_ND",
                    dataIndex: "LQD_ND",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                 {
                    header: "LQD_NN",
                    dataIndex: "LQD_NN",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                 {
                    header: "LQD_PD",
                    dataIndex: "LQD_PD",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                {
                    header: "LQD_PN",
                    dataIndex: "LQD_PN",
                    align: "left",
                    hidden: true,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                },
                 {
                    header: "MONTO SUBTOTAL",
                    dataIndex: "LQD_MONTO",
                    align: "right",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "MONTO SOBRANTE",
                    dataIndex: "LQD_MONTOSF",
                    align: "right",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({})
                }, {
                    header: "TOTAL ENTREGADO",
                    dataIndex: "RESULTADO",
                    align: "right",
                    hidden: false,
                    hideable: false,
                    editor: new Ext.form.TextField({}) 
                    //renderer:renderEntregado
                }, {
                    header: "TIPO",
                    dataIndex: "LQD_TIPO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                },{
                    header: "FECHA REGISTRO",
                    dataIndex: "LQD_REGISTRO2",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, // //LQD_TIPO_HERRAMIENTA_ID  
                {
                    header: "LQD_TIPO_HERRAMIENTA_ID",
                    dataIndex: "LQD_TIPO_HERRAMIENTA_ID",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }, // //turno  
                {
                    header: "TURNO",
                    dataIndex: "LQD_TURNO",
                    align: "left",
                    hidden: false,
                    hideable: true,
                    editor: new Ext.form.TextField({})
                }
                /*, {
                    header: "ESTADO",
                    dataIndex: "LQD_ESTADO",
                    align: "left",
                    hidden: true,
                    hideable: true,
                    editor: new Ext.form.TextField({}),

                    renderer: function (v, params, data) {
                        return ((v === 'ACTIVO') ? '<font color="green">ACTIVO</font>' : '<font color="red">INACTIVO</font>')
                    }
                }*/
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
        var grdpnlUser = new Ext.grid.GridPanel({
            id: "grdpnlUser",
            store: storeFuncionario,
            colModel: cmodel,
            selModel: smodel,
            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column
            tbar: [btnNew,btnImprimir,"->", {
                                                text: 'ESTADO',                  
                                                xtype: 'combo',
                                                id: "cboEstado",
                                                name: "cboEstado",
                                                mode: 'local',
                                                triggerAction: 'all',
                                                forceSelection: true,
                                                editable: false,
                                                emptyText: 'Filtrar x Linea',
                                                typeAhead: true,
                                                hiddenName: 'RUTA_DESCRIPCION',
                                                displayField: 'RUTA_DESCRIPCION',
                                                valueField: 'RUTA_DESCRIPCION',
                                                store: storeRuta,                                              
                                                listeners: {
                                                   select: function (combo, record, index) {
                                                   var value = combo.getValue();         
                                                   storeFuncionario.filter("RUTA_DESC_GRILLA",value);
                                                   /*storeUser.load(                                       
                                                        { params: 
                                                            {
                                                               option: "LSTESTADOS2","ESTADO": value
                                                         }});                                   */
                                                    }
                                                }                                       
                                            },
                                            {   fieldLabel: 'DESDE',
                                                id: 'sFechaInicio',
                                                name: 'sFechaInicio',
                                                allowBlank: true,
                                                xtype: 'datefield',
                                                triggerAction: 'all',
                                                forceSelection: true,
                                                editable: false,                                            
                                                emptyText: 'FECHA DE BUSQUEDA',
                                                typeAhead: true,
                                                mode: 'local',
                                                width:100,                                            
                                                format: 'Y-m-d'
                                            },
                                            {   text: 'LIMPIAR',        
                                                xtype: 'tbbutton',
                                                id: "limpiar",                                         
                                                 iconCls: 'icon-zoom',
                                                defaultType: 'splitbutton',
                                                handler: function () {
                                                Ext.getCmp('sFechaInicio').setValue('');
                                                Ext.getCmp('cboEstado').setValue('');
                                                storeFuncionario.reload(                                       
                                                        {   params: 
                                                            {
                                                                option: "LST","vFechaInicio": DESDE
                                                            }
                                                        });                      
                                                }                               
                                            },
                                            {
                                                text: 'BUSCAR',         
                                                xtype: 'tbbutton',
                                                cls: 'xbtntextcon',
                                                iconCls: 'icon-search',
                                                id: "btnSearch223",                                         
                                                defaultType: 'splitbutton',
                                                handler: function () {
                                                    vFechaInicio = Ext.get('sFechaInicio').getValue();
                                                    if(vFechaInicio != 'Desde'){
                                                        storeFuncionario.load(                                       
                                                            {   params: 
                                                                {
                                                                    option: "LST","vFechaInicio": vFechaInicio
                                                                }
                                                            });       
                                                    } else {
                                                        alert("Tiene que ingresar la fecha");
                                                    }
                                                                        
                                                }
                                            }
                                            ],
            bbar: pagingUser,
            style: "margin: 0 auto 0 auto;",
            width: '100%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,
            renderTo: "divMain",
            listeners: {}
        });
        //Initialize events
        storeFuncionarioProcess(pageSize, pageSize, 0);
        cboPageSize.setValue(pageSize);
        var viewport = new Ext.Viewport({
            layout: 'fit',
            items: [grdpnlUser]
        });
    }
}
Ext.onReady(acl.application.init, acl.application);