Ext.namespace("acl");

var LABEL_LOADING = "CARGANDO REGISTROS ...";
var LABEL_FAILURE_LOAD = "FALLA AL CARGAR REGISTROS";

var LABEL_TITLE_PANEL_1 = "ADMINISTRACION DE PARADAS";

var LABEL_BTN_SEARCH = "BUSCAR", LABEL_MSG_SEARCH = "BUSCAR ...";
var global1 = "";
var globalRUTA_ID = "";
var globalDetalle = "";
var globalRUTA_DESCRIPCION="";
acl.application = {
  init:function(){
    storeUserProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();

      Ext.Ajax.request({
        url: "../servicios/blpParadasAjax.php",
        method: "POST",
        params: {"option": "LST", "pageSize": n, "limit": r, "start": i},

        success:function (result, request) {
                  storeUser.loadData(Ext.util.JSON.decode(result.responseText));
                  myMask.hide();
                },
        failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("MENSAJE", LABEL_FAILURE_LOAD);
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
    var message = "POR IMPLEMENTAR ..."; // CONFIG.message;
    var storeRutas = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpParadasAjax.php",
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
    function renderImagenTipoAccion(value, p, record) {
                var tipoAccion = record.data.PARADA_DETALLE;
                var str = '';
                if (tipoAccion == 'IDA') {
                    str = "<img src=../extJs/images/Entrada.png" + ' ' +  '    '+ ' ' + "'>" + ' '   + record.data.PARADA_DETALLE;    // Asigna imagen en código html a una variable  
                    return str;
                }
                 if (tipoAccion == 'VUELTA') {
                    str = "<img src=../extJs/images/Salida.png" + ' ' + '      ' + ' ' + "'>" + ' '   + record.data.PARADA_DETALLE;    // Asigna imagen en código html a una variable  
                    return str;
                }
      }
      var TRN_CNSL_ID = new Ext.form.ComboBox({
                fieldLabel:     'RUTAS',
                id:             'TRN_CNSL_ID',
                name:           'TRN_CNSL_ID',
                allowBlank:     true,
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                emptyText:      'Seleccione Ruta',
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
                                option:'LST_RUTAS',
                                globalRUTA_ID: globalRUTA_ID,
  
                            }});
                            
                           
                            }
                        }
            });

        //========================================================================
  var jsCampoLabel = new Ext.form.Label({
            text: "SELECCIONE RUTA: ",
            name: 'lblLastLogin',
            style: 'font-weight:bold;',
            anchor:'93%'
        
  });
    
    //store Categories
    var storeUser = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpParadasAjax.php",
            method: "POST"
        }),

        //groupField: 'CATEGORY_LABEL',
        //baseParams: {"option": "LST", "pageSize": pageSize},

        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "PARADA_ID", allowBlank: false},
                     {name: "PARADA_DESCRIPCION", allowBlank: false},
                     {name: "RUTA_DESCRIPCION", allowBlank: false},
          					 {name: "PARADA_DETALLE", allowBlank: false},
            					{name: "PARADA_LONGITUD", allowBlank: false},
            					{name: "PARADA_LATITUD", allowBlank: false},
            					{name: "PARADA_ORDEN", allowBlank: false},
                      {name: "PARADA_RUTA_ID", allowBlank: false},
                     {name: "PARADA_REGISTRO", allowBlank: false},
                     {name: "PARADA_MODIFICACION", allowBlank: false},
                     {name: "PARADA_USUARIO", allowBlank: false},
                     {name: "PARADA_ESTADO", allowBlank: false}
                    ]
        }),

        //autoLoad: true, //First call

        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};
            }
        }
    });
    var storeOrden = new Ext.data.GroupingStore({
        proxy:new Ext.data.HttpProxy({
            url:    "../servicios/blpRutasAjax.php",
            method: "POST"
        }),
        reader:new Ext.data.JsonReader({
            root: "resultRoot",
            totalProperty: "resultTotal",
            fields: [{name: "PARADA_ORDEN", allowBlank: false}
                    ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "CUENTA_ORDEN"};        
            }
        }
    });
  storeOrden.load();
    /*var storeRutas = new Ext.data.GroupingStore({
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
                     {name: "RUTA_ESTADO", allowBlank: false}
                    ]
        }),
        listeners:{
            beforeload:function (store) {
                this.baseParams = {"option": "LST", "pageSize": pageSize};        
            }
        }
    });
  storeRutas.load();*/

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
     var winLocalizacionParadas = new Ext.Window({
            title: 'SELECCIONE LOCALIZACION',
            id: 'GEOLOCA',
            html: '<div id=\"geo\"></div><br><div style=\"width:580px;height:580px;\" id=\"map\">CARGANDO ......    </div> <script type=\"text/javascript\"> var sIdGeo = document.getElementById(\"geo\"); if(sIdGeo){iniciarAplicacion();} else {alert(\"Error al inciar\");}',
            width: 540,
            height: 550,
            //closable: true,
            //closeAction: 'hide',
            minWidth: 100,
            minHeight: 100,
            maximized: false,
            constrain: true,
            modal: true,
            items: [],
            buttons: [{
                  xtype: 'tbbutton',
                  cls: 'xbtntextcon',                                       
                  text: 'CERRAR',
                  iconCls: 'icon-cancel',
                  defaultType: 'splitbutton',
                  handler: function () {
                      winLocalizacionParadas.hide ();
                  }
            }]
   });

 var winLocalizacionParadas = new Ext.Window({
            title: 'SELECCIONE LOCALIZACION',
            id: 'GEOLOCA',
            html: '<div id=\"geo\"></div><br><div style=\"width:580px;height:580px;\" id=\"map\">CARGANDO ......    </div> <script type=\"text/javascript\"> var sIdGeo = document.getElementById(\"geo\"); if(sIdGeo){recargarMapa();} else {alert(\"Error al inciar\");}',
            width: 540,
            height: 550,
            //closable: true,
            closeAction: 'hide',
            minWidth: 100,
            minHeight: 100,
            maximized: false,
            constrain: true,
            modal: true,
            items: [],
            buttons: [{
                  xtype: 'tbbutton',
                  cls: 'xbtntextcon',                                       
                  text: 'CERRAR',
                  iconCls: 'icon-cancel',
                  defaultType: 'splitbutton',
                  handler: function () {
                      winLocalizacionParadas.hide ();
                  }
            }]
   });



    // panel
    newForm = new Ext.FormPanel({
                //fileUpload: true,
                width: 500,
                //autoHeight: true,
                height: 490,
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
                    id:   'PARADA_RUTA_ID',
                    name: 'PARADA_RUTA_ID',
                    allowBlank:true,
                    xtype:          'combo',        
                    triggerAction:  'all',
                    forceSelection: true,
                    //editable:       false,
                    allowBlank:false,
                    emptyText:      'Seleccione Ruta',
                    typeAhead: true,
                    hiddenName:     'RUTA_ID',
                    displayField:   'RUTA_DESCRIPCION',
                    valueField:     'RUTA_ID',
                    store: storeRutas,
                    //mode: 'local',
                    listeners:{
                      select: function (combo, record, index) {
                        global1 = combo.getValue();
                      }
                    }
                  },
                  {     xtype: 'htmleditor',
                        fieldLabel: 'DESCRIPCION',
                        id: 'PARADA_DESCRIPCION',
                        name: 'PARADA_DESCRIPCION',
                        vtype: 'uppercase',
                        height: 100,
                        width: '100%',
                        allowBlank:false
                    },
                    {
                        fieldLabel: 'DETALLE',
                        id: 'PARADA_DETALLE',
                        name: 'PARADA_DETALLE',
                        allowBlank: false,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'IDA',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                emptyText: 'Seleccione Detalle',
                                typeAhead: true,
                                //hiddenName:     'CATEGORY_STATUS',
                                displayField:   'name',
                                valueField:     'value',
                                store:          new Ext.data.JsonStore({
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'IDA',   value: 'IDA'},
                                        {name : 'VUELTA', value: 'VUELTA'}
                                    ]
                                }),
                          listeners:{
                          select: function (combo, record, index) {
                          globalDetalle = combo.getValue();
                          //alert(globalDetalle);
                      }
                    }
                    },
                    {
                        fieldLabel: 'LATITUD',
                        id: 'PARADA_LATITUD',
                        name: 'PARADA_LATITUD',
                        labelStyle: 'font-weight:bold;',
                        //readOnly: true,
                        allowBlank:false
                    },
					           {
                        fieldLabel: 'LONGITUD',
                        id: 'PARADA_LONGITUD',
                        name: 'PARADA_LONGITUD',
                        labelStyle: 'font-weight:bold;',
                       // readOnly: true,
                        allowBlank:false
                    },
                    {
                      xtype: 'tbbutton',
                      iconCls: 'icon-search',
                      id: 'btnMapa',
                      name: 'btnMapa',
                      width:'80%',
                      defaultType: 'splitbutton',
                      handler: function () {
                      winLocalizacionParadas.show();
                      iniciarAplicacion();
                      }
                    }
                ],
                buttons: [{

                    id: 'Btn',
                     name: 'Btn',
                     iconCls: 'icon-save',
                    //text: 'GUARDAR',
					          iconCls: 'icon-save',	
                    handler: function() {
                        if(newForm.getForm().isValid()){
                            form_action = 1;
                            if(sw =="0"){
                            newForm.getForm().submit({
                                url: '../servicios/blpParadasAjax.php',
                                method: "POST",
                                params: {"option": "NEW",
                                 globalDetalle:globalDetalle,
                                 "sRUTA_ID":global1},
                                waitMsg: 'REGISTRO GUARDADO ...',
                                success: function(form, action){
                                    storeUser.reload();
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO GUARDADO");
                                },
                                failure: function(form, action){
                                    Ext.MessageBox.alert("MENSAJE", "REGISTRO NO GUARDADO");
                                }
                            });
                           // winForm.hide();
                        }else{
                          var rec = grdpnlUser.getSelectionModel().getSelected();
                          if (!rec) {grdpnlUser
                          return false;
                          }
                        var value = rec.get('PARADA_ID');
                        newForm.getForm().submit({
                        url: '../servicios/blpParadasAjax.php',                               
                        method: "POST",
                        params: {"option": "UPD", "i": value, "RUTA_ID":global1},
                        waitMsg: 'REGISTRO MODIFICADO ...',
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
                        }
                          winForm.hide();
                        }
                      }
                    
                    }, {
                        text: 'CANCELAR',
						            iconCls: 'icon-cancel',
                        handler: function(){
                            winForm.hide();

                    }
                }]
    })

    winForm = new Ext.Window({
                layout: 'fit',
                id: 'FormCamaras',
                name: 'FormCamaras',
                width: 550,
                height: 330,
                closeAction: 'hide',
                plain: true,
                title: 'ADICIONAR NUEVA PARADA',
                items: newForm
    });

    var btnActualizar = new Ext.Action({
      text: "LIMPIAR",
     // iconCls: 'icon-ok',
      handler: function() {
        globalRUTA_DESCRIPCION="";
        storeUser.reload({params:{
                                            option:'LST'  
                            }});
                       Ext.getCmp('TRN_CNSL_ID').reset();
      }
    });

    var btnImprimir = new Ext.Action({
                xtype: 'tbbutton',
                cls: 'xbtntextcon',                                       
                text: '<B>IMPRIMIR</B>',
                iconCls: 'icon-viewer',
                handler:     function onImprimir() {
                  Ext.ux.GridPrinter.stylesheetPath = "../ext/print.css";
                  var url = '../ext/fondo_blanco_1.jpg';
                  if(globalRUTA_DESCRIPCION!= "")
                  {
                  var uuu = "PARADA DE LA RUTA - "+ globalRUTA_DESCRIPCION;
                  }
                  else{
                    var uuu="";
                  }
                  Ext.ux.GridPrinter.print(grdpnlUser2,url,uuu);
                  uuu="";
                }
        });

    var btnNew = new Ext.Action({
      id: "btnNew",

      text: "ADICIONAR",
      iconCls: 'icon-add',
      handler: function() {
        Ext.getCmp('PARADA_DESCRIPCION').reset();
        Ext.getCmp('PARADA_RUTA_ID').reset();
        Ext.getCmp('PARADA_DETALLE').reset();
	   	  Ext.getCmp('PARADA_LONGITUD').reset();
	     	Ext.getCmp('PARADA_LATITUD').reset();
		   // Ext.getCmp('PARADA_ORDEN').reset();
        // Ext.getCmp('PARADA_ESTADO').reset();
        winForm.show(this);
        sw="0";
      Ext.getCmp('Btn').setText('GUARDAR');
      Ext.getCmp('btnMapa').setText('ADICIONAR PUNTO');
      Ext.getCmp('FormCamaras').setTitle('NUEVA PARADA');
      Ext.getCmp('Btn').setIconClass('icon-save');
      }
    });
	 var btnUpd = new Ext.Action({
      id: "btnUpd",
      text: "ACTUALIZAR",
      iconCls: 'icon-volver',
      handler:     function onUpdate() {
     // winForm.show(this);
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
          Ext.MessageBox.alert("MENSAJE", "SELECCIONE UN REGISTRO");  
            return false;
        }

              
              Ext.getCmp('PARADA_DESCRIPCION').setValue(rec.get('PARADA_DESCRIPCION'));
              Ext.getCmp('PARADA_RUTA_ID').setValue(rec.get('PARADA_RUTA_ID'));
              Ext.getCmp('PARADA_DETALLE').setValue(rec.get('PARADA_DETALLE'));
              Ext.getCmp('PARADA_LONGITUD').setValue(rec.get('PARADA_LONGITUD'));
              Ext.getCmp('PARADA_LATITUD').setValue(rec.get('PARADA_LATITUD'));
              //Ext.getCmp('PARADA_ORDEN').setValue(rec.get('PARADA_ORDEN'));
              //Ext.getCmp('PARADA_ESTADO').setValue(rec.get('PARADA_ESTADO'));
              var value = rec.get('PARADA_ID'); 
              winForm.show(this);
                sw="1";
                Ext.getCmp('Btn').setText('GUARDAR');
                Ext.getCmp('btnMapa').setText('MODIFICAR PUNTO');
                Ext.getCmp('FormCamaras').setTitle('MODIFICAR PARADA');
                Ext.getCmp('Btn').setIconClass('icon-save');  

      }

    });
  
	
	
	var btnUpd = new Ext.Action({
      id: "btnUpd",
      text: "MODIFICAR",
      iconCls: 'icon-edit',
      handler:     function onUpdate() {
	   // winForm.show(this);
          var rec = grdpnlUser.getSelectionModel().getSelected();
          if (!rec) {
            Ext.MessageBox.alert("MENSAJE", "SELECCIONE UN REGISTRO");  
              return false;
            }
		          
            Ext.getCmp('PARADA_DESCRIPCION').setValue(rec.get('PARADA_DESCRIPCION'));
            Ext.getCmp('PARADA_RUTA_ID').setValue(rec.get('PARADA_RUTA_ID'));
	          Ext.getCmp('PARADA_DETALLE').setValue(rec.get('PARADA_DETALLE'));
	          Ext.getCmp('PARADA_LONGITUD').setValue(rec.get('PARADA_LONGITUD'));
	          Ext.getCmp('PARADA_LATITUD').setValue(rec.get('PARADA_LATITUD'));
            var value = rec.get('PARADA_ID');	
            winForm.show(this);
            sw="1";
            Ext.getCmp('Btn').setText('GUARDAR');
            Ext.getCmp('btnMapa').setText('MODIFICAR PUNTO');
            Ext.getCmp('FormCamaras').setTitle('MODIFICAR PARADA');
            Ext.getCmp('Btn').setIconClass('icon-save');	
        } 

    });
	
	

    var btnDel = new Ext.Action({
      id: "btnDel",

      text: "DAR DE BAJA",
      iconCls: 'icon-del',
      handler:     function onDelete() {
        var rec = grdpnlUser.getSelectionModel().getSelected();
        if (!rec) {
          Ext.MessageBox.alert("MENSAJE", "SELECCIONE UN REGISTRO");  
            return false;
        }
        var value = rec.get('PARADA_ID');
        var value2 = rec.get('PARADA_DESCRIPCION');
        var value3 = rec.get('PARADA_DETALLE');
        Ext.MessageBox.confirm('ELIMINAR PARADA', 'REALMENTE DESEA ELIMINAR LA '+value2+' DE '+value3+'?', function (id, value2){                              
          if (id === 'yes') { 
              
              Ext.Ajax.request({
                  url: "../servicios/blpParadasAjax.php",
                  method: "POST",
                  params: {"option": "DEL", "i": value},
                  success:function (result, request) {
                        Ext.MessageBox.alert("MENSAJE", "REGISTRO ELIMINADO");
                        storeUser.reload();
                      },
                  failure:function (result, request) {
                        Ext.MessageBox.alert("MENSAJE", "REGISTRO NO ELIMINADO");
                      }
              });
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

      listeners:{
        specialkey: function (f, e) {
          if (e.getKey() == e.ENTER) {
            Ext.MessageBox.alert("MENSAJE", message);
          }
        }
      }
    });

    var btnTextClear = new Ext.Action({
      id: "btnTextClear",

      text: "X",
      ctCls: "pm_search_x_button",
      handler: function() {
        txtSearch.reset();
      }
    });

    var btnSearch = new Ext.Action({
      id: "btnSearch",
      text: LABEL_BTN_SEARCH,
      handler: function() {
        Ext.MessageBox.alert("MENSAJE", message);
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
      items: ["-", "Page size:", cboPageSize]
    });

    var cmodel = new Ext.grid.ColumnModel({
      defaults: {
        sortable:true
      },
      columns:[
               new Ext.grid.RowNumberer(),
               {id: "ID", header: "ID", dataIndex: "PARADA_ID", hidden: false, hideable: false, width: 50},
               {header: "RUTA", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "PARADA", dataIndex: "PARADA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			         {header: 'DETALLE', dataIndex: 'PARADA_DETALLE', sortable: true,align: 'left', flex: 1, renderer:renderImagenTipoAccion},          
			         {header: "LONGITUD", dataIndex: "PARADA_LONGITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			         {header: "LATITUD", dataIndex: "PARADA_LATITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
			         {header: "ORDEN", dataIndex: "PARADA_ORDEN", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "REGISTRO", dataIndex: "PARADA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "PARADA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "PARADA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})}
              ]

    });
	 
   var cmodel2 = new Ext.grid.ColumnModel({
      defaults: {
        sortable:true
      },
      columns:[
               {header: "RUTA", dataIndex: "RUTA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "PARADA", dataIndex: "PARADA_DESCRIPCION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: 'DETALLE', dataIndex: 'PARADA_DETALLE', sortable: true,align: 'left', flex: 1, editor: new Ext.form.TextField({})},
               {header: "LONGITUD", dataIndex: "PARADA_LONGITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "LATITUD", dataIndex: "PARADA_LATITUD", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "ORDEN", dataIndex: "PARADA_ORDEN", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "REGISTRO", dataIndex: "PARADA_REGISTRO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "MODIFICACION", dataIndex: "PARADA_MODIFICACION", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})},
               {header: "USUARIO", dataIndex: "PARADA_USUARIO", align: "left", hidden: false, hideable: false, editor: new Ext.form.TextField({})}
              ]

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

     var smodel2 = new Ext.grid.RowSelectionModel({
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
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column

      tbar: [btnNew, btnUpd, btnDel,"-",jsCampoLabel,"-",TRN_CNSL_ID,btnActualizar,"-",btnImprimir],
      bbar: pagingUser,

      style: "margin: 0 auto 0 auto;",
      width: '100%',
      height: '450',
      title: LABEL_TITLE_PANEL_1,

      renderTo: "divMain",

      listeners:{
      }
    });

      var grdpnlUser2 = new Ext.grid.GridPanel({

      id: "grdpnlUser2",
      store: storeUser,
      colModel: cmodel2,
      selModel: smodel2,

      columnLines: true,
      viewConfig: {forceFit: true},
      enableColumnResize: true,
      enableHdMenu: true, //Menu of the column
      style: "margin: 0 auto 0 auto;",
      width: '100%',
      height: '450',
      title: LABEL_TITLE_PANEL_1,

      renderTo: "divMain",

      listeners:{
      }
    });
    //Initialize events
    storeUserProcess(pageSize, pageSize, 0);

    cboPageSize.setValue(pageSize);

    var viewport = new Ext.Viewport({
          layout : 'fit',
          items : [ grdpnlUser ]
    });
  }
}

Ext.onReady(acl.application.init, acl.application);
