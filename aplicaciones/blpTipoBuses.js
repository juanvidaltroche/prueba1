Ext.namespace("acl");
var LABEL_LOADING = "CARGANDO REGISTROS ...";
var LABEL_FAILURE_LOAD = "FALLO EN CARGAR LOS REGISTROS ...";
var LABEL_TITLE_PANEL_1 = "TIPOS DE BUSES";
var sw = 0;
var jsNombreBoton = "NUEVO";
var sIcono="";
acl.application = {
    init: function () {
        storeProcess = function (n, r, i) {
            var myMask = new Ext.LoadMask(Ext.getBody(), {
                msg: LABEL_LOADING
            });
            myMask.show();
            //AJAX USUARIOS
            Ext.Ajax.request({
                url: "../servicios/blpTipoBusesAjax.php",
                method: "POST",
                params: {
                    "option": "LST",
                    "pageSize": n,
                    "limit": r,
                    "start": i
                },

                success: function (result, request) {
                    storeUsuarios.loadData(Ext.util.JSON.decode(result.responseText));
                    myMask.hide();
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert("MENSAJE", LABEL_FAILURE_LOAD);
                }
            });

        };

        onMnuContext = function (grid, rowIndex, e) {
            e.stopEvent();
            var coords = e.getXY();
            mnuContext.showAt([coords[0], coords[1]]);
        };

        //Variables declared in html file
        var pageSize = parseInt(20 /*CONFIG.pageSize*/ );
        var message = "por implementar ..."; // CONFIG.message;

        //usuario
        var storeUsuarios = new Ext.data.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: "../servicios/blpTipoBusesAjax.php",
                method: "POST"
            }),

            reader: new Ext.data.JsonReader({
                root: "resultRoot",
                totalProperty: "resultTotal",
                fields: [{ name: "TIPO_BUSES_ID",allowBlank: false
                }, {name: "TIPO_BUSES_DESCRIPCION",allowBlank: false
                }, {name: "TIPO_BUSES_ICONO",allowBlank: false
                }, {name: "TIPO_BUSES_DESCRIPCION_TEXT",allowBlank: false
                }, {name: "TIPO_BUSES_CAPACIDAD",allowBlank: false
                }, {name: "TOTAL",allowBlank: false
                }]
            }),

            listeners: {
                beforeload: function (store) {

                    this.baseParams = {
                        "option": "LST",
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
        newForm = new Ext.FormPanel({
            fileUpload: true,
            autoscroll: true,
            width: 680,
            height: 288,
            //autoHeight: true,
            //height: 100,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 100,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side',
                width:150  
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'hidden',
                fieldLabel: 'NRO',
                id: 'TIPO_BUSES_ID',
                name: 'TIPO_BUSES_ID',
                allowBlank: false,
                disabled: true
            },{
                fieldLabel: 'NOMBRE',
                id: 'TIPO_BUSES_DESCRIPCION',
                name: 'TIPO_BUSES_DESCRIPCION',
                value: "",
                vtype: 'uppercase',
                readOnly: false,
                allowBlank: true
         
            }, {
                xtype:'htmleditor',
                fieldLabel: 'DESCRIPCION',
                id: 'TIPO_BUSES_DESCRIPCION_TEXT',
                name: 'TIPO_BUSES_DESCRIPCION_TEXT',
                value: "",
                vtype: 'uppercase',
                readOnly: false,
                allowBlank: true,
                width: 300,
                height: 120
            },{
                fieldLabel: 'CAPACIDAD (TONELADAS)',
                id: 'TIPO_BUSES_CAPACIDAD',
                name: 'TIPO_BUSES_CAPACIDAD',
                value: "",
                vtype: 'uppercase',
                xtype: "numberfield",
                readOnly: false,
                allowBlank: true
         
            },{
                xtype: 'fileuploadfield',
                id: 'filedata',
                emptyText: 'Seleccione imagen a subir...',
                fieldLabel: 'ARCHIVO',
                buttonText: 'EXAMINAR...',
                disable: false,
                allowBlank: true
            }],
            buttons: [{
                text: jsNombreBoton,
                id: 'Guardar',
                name: 'Guardar',
                iconCls: 'icon-save',   
                handler: function () {
                    cadena=Ext.getCmp('filedata').getValue();
                    array = cadena.split('.');
                    cont = cadena.split('.').length;
                    anchoArray = array[0];
                    tipo = array[cont - 1]; 
                   
                      if (newForm.getForm().isValid()) {
                        form_action = 1;
                        //--------------ADICIONAR-----------------------
                        if (sw == "0") {
                          if(tipo=='jpg' || tipo=='png' || tipo=='JPG' || tipo=='PNG' || tipo=='JPEG' || tipo=='jpeg')
                          {
                            newForm.getForm().submit({

                                url: '../servicios/blpTipoBusesAjax.php?option=NEW',
                                waitMsg: 'GUARDANDO REGISTRO ...',
                                success: function (form, action) {
                                    storeUsuarios.reload();
                                    Ext.MessageBox.alert("MENSAJE", "SE REGISTRO CON EXITO");
                                    Ext.getCmp('TIPO_BUSES_ID').reset();
                                    Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                                    Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').reset();
                                    Ext.getCmp('TIPO_BUSES_CAPACIDAD').reset();
                                    Ext.getCmp('filedata').reset();
                                     winForm.hide();
                                },
                                failure: function (form, action) {
                                    Ext.MessageBox.alert("MENSAJE", "FALLA AL GUARDAR REGISTRO");
                                }
                            });
                          }
                          else{
                                Ext.MessageBox.alert("MENSAJE", "FORMATO INCOMPATIBLE");
                          }
                        } else //---------------MODIFCAR----------------------
                        {
                            if(cadena!="")
                            {
                              if(tipo=='jpg' || tipo=='png' || tipo=='JPG' || tipo=='PNG')
                              {
                                var rec = grdpnlUser.getSelectionModel().getSelected();
                                if (!rec) {
                                    return false;
                                }
                                var value = rec.get('TIPO_BUSES_ID');
                                //-------------------------------
                                newForm.getForm().submit({
                                    url: '../servicios/blpTipoBusesAjax.php',
                                    method: "POST",
                                    params: {
                                        "option": "UPD",
                                        "i": value
                                    },
                                    waitMsg: 'REGISTRO MODIFICADO ...',
                                    success: function (form, action) {
                                        storeUsuarios.reload();
                                        Ext.MessageBox.alert("MENSAJE", "SE MODIFICO CON EXITO");
                                        Ext.getCmp('TIPO_BUSES_ID').reset();
                                        Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                                        Ext.getCmp('filedata').reset();
                                        Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').reset();
                                        Ext.getCmp('TIPO_BUSES_CAPACIDAD').reset();
                                         winForm.hide();
                                    },
                                    failure: function (form, action) {
                                         Ext.MessageBox.alert("MENSAJE", "REGISTRO NO MODIFICADO");
                                    }
                                });
                              }
                                else{
                                Ext.MessageBox.alert("MENSAJE", "FORMATO INCOMPATIBLE");
                                }
                            }
                            else{
                                var rec = grdpnlUser.getSelectionModel().getSelected();
                                if (!rec) {
                                    return false;
                                }
                                var value = rec.get('TIPO_BUSES_ID');
                                //-------------------------------
                                newForm.getForm().submit({
                                    url: '../servicios/blpTipoBusesAjax.php',
                                    method: "POST",
                                    params: {
                                        "option": "UPD_2",
                                        "i": value
                                    },
                                    waitMsg: 'REGISTRO MODIFICADO ...',
                                    success: function (form, action) {
                                        storeUsuarios.reload();
                                        Ext.MessageBox.alert("MENSAJE", "SE MODIFICO CON EXITO");
                                        Ext.getCmp('TIPO_BUSES_ID').reset();
                                        Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                                        Ext.getCmp('filedata').reset();
                                        Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').reset();
                                        Ext.getCmp('TIPO_BUSES_CAPACIDAD').reset();
                                         winForm.hide();
                                    },
                                    failure: function (form, action) {
                                         Ext.MessageBox.alert("MENSAJE", "REGISTRO NO MODIFICADO");
                                    }
                                });
                            }
                        }
                       
                    }
                
                }
            }, {

                text: 'CALCELAR',
                iconCls: 'icon-cancel',   
                handler: function () {
                     Ext.getCmp('TIPO_BUSES_ID').reset();
                Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                Ext.getCmp('filedata').reset();
                Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').reset();
                Ext.getCmp('TIPO_BUSES_CAPACIDAD').reset();
                    winForm.hide();

                }
            }]
        });

        var preview = new Ext.Panel({  
            width:250,  
            height:250,  
            html: '<img id="preview" />' //imagen vacía  
        });   


        winForm = new Ext.Window({
            id: 'FormAdiModi',
            name: 'FormAdiModi',
            layout: 'column',
            //closeAction: 'hide',
            //plain: true,
            width:750,  
            height:340,  
            modal: true,  
            bodyStyle: 'padding:10px;background-color:#fff',  

            title: 'NUEVO USUARIO',
            items: [newForm]
        });

        var btnNew = new Ext.Action({
            id: "btnNew",
            text: "NUEVO",
            iconCls: 'icon-add',
            handler: function () {
                Ext.getCmp('TIPO_BUSES_ID').reset();
                Ext.getCmp('TIPO_BUSES_DESCRIPCION').reset();
                Ext.getCmp('filedata').reset();
                Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').reset();
                Ext.getCmp('TIPO_BUSES_CAPACIDAD').reset();
                sw = 0;
                Ext.getCmp('Guardar').setText('GUARDAR');
                Ext.getCmp('FormAdiModi').setTitle('ADICION');
                winForm.show(this);
            }
        });

        function doCargaFuncionarios(id) {
            Ext.Ajax.request({
                url: "../servicios/blpTipoBusesAjax.php",
                method: "POST",
                //params: {"option": "LST_ID", "id":id, "pageSize": 100, "limit": 100, "start": 0},
                params: {
                    "option": "LST",
                    "pageSize": 10000,
                    "limit": 10000,
                    "start": 0
                }
            });
        }

        var btnUpd = new Ext.Action({
            id: "btnUpd",
            text: "MODIFICAR",
            iconCls: 'icon-edit',
            handler: function onUpdate() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    Ext.MessageBox.alert("MENSAJE", "SELECCIONE UN REGISTRO");
                    return false;
                }
                Ext.getCmp('TIPO_BUSES_ID').setValue(rec.get('TIPO_BUSES_ID'));
                Ext.getCmp('TIPO_BUSES_DESCRIPCION').setValue(rec.get('TIPO_BUSES_DESCRIPCION'));
                Ext.getCmp('TIPO_BUSES_DESCRIPCION_TEXT').setValue(rec.get('TIPO_BUSES_DESCRIPCION_TEXT'));
                //Ext.get('preview').dom.src = rec.get('img');
                var value = rec.get('TIPO_BUSES_ID');
                winForm.show(this);
                Ext.getCmp('Guardar').setText('MODIFICAR');
                Ext.getCmp('FormAdiModi').setTitle('MODIFICACION ');
                sw = "1";
            }

        });

        var btnDel = new Ext.Action({
            id: "btnDel",
            text: "DAR DE BAJA",
            iconCls: 'icon-del',
            handler: function onDelete() {
                var rec = grdpnlUser.getSelectionModel().getSelected();
                if (!rec) {
                    Ext.MessageBox.alert("MENSAJE", "SELECCIONE UN REGISTRO");
                    return false;
                }
                var value = rec.get('TIPO_BUSES_ID');
                var value2 = rec.get('TOTAL');
                if(value2==0)
                {
                    Ext.MessageBox.confirm('MENSAJE', 'REALMENTE DESEA ELMINAR TIPO DE BUS?', function (id, value2){                              
                    if (id === 'yes') { 
                        Ext.Ajax.request({
                            url: "../servicios/blpTipoBusesAjax.php",
                            method: "POST",
                            params: {
                                "option": "DEL",
                                "i": value
                            },
                            success: function (result, request) {
                                Ext.MessageBox.alert("MENSAJE", "REGISTRO ELIMINADO");
                                storeUsuarios.reload();
                            },
                            failure: function (result, request) {
                                Ext.MessageBox.alert("MENSAJE", "REGISTRO NO ELIMINADO!!!");
                            }
                        });
                    }
                    });
                }
                else{
                    Ext.MessageBox.alert("MENSAJE", "NO PUEDE ELIMINAR EL REGISTRO YA QUE HAY BUSES QUE SON DE ESTE TIPO");
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
            store: storeUsuarios,
            displayInfo: true,
            displayMsg: "Displaying users " + "{" + "0" + "}" + " - " + "{" + "1" + "}" + " of " + "{" + "2" + "}",
            emptyMsg: "No roles to display",
            items: ["-", "Page size:", cboPageSize]
        });
        function renderAcciones(value, p, record) {
      //console.log(value);
      var vPant = record.data.TIPO_BUSES_ICONO;

            str = "<img src="+vPant+" title='' width='75' height='75'>"
    
            return str;
        }
        var number=new Ext.grid.RowNumberer();
        var cmodel = new Ext.grid.ColumnModel({
            defaults: {
                //width:30,
                sortable: true
            },

            columns: [number,{
                id: "ID",
                header: "ID",
                dataIndex: "TIPO_BUSES_ID",
                hidden: false,
                hideable: true,
                width: 20
            }, {
                header: "NOMBRE",
                dataIndex: "TIPO_BUSES_DESCRIPCION",
                align: "left",
                hidden: false,
                hideable: true,
                width: 80,
                editor: new Ext.form.TextField({})
            },{
                header: "DESCRIPCION",
                dataIndex: "TIPO_BUSES_DESCRIPCION_TEXT",
                align: "left",
                hidden: false,
                hideable: true,
                width: 100,
                editor: new Ext.form.TextField({})
            },{
                header: "CAPACIDAD<BR> (EN TONELADAS)",
                dataIndex: "TIPO_BUSES_CAPACIDAD",
                align: "left",
                hidden: false,
                hideable: true,
                width: 30,
                editor: new Ext.form.TextField({})
            },{
                header: "CANTIDAD DE BUSES<BR>QUE PERTENECEN A ESTE TIPO",
                dataIndex: "TOTAL",
                align: "left",
                hidden: false,
                hideable: true,
                width: 30,
                editor: new Ext.form.TextField({})
            },{header: "IMAGEN <BR> DE BUS", dataIndex: 'TIPO_BUSES_ICONO', sortable: true, align: 'center', flex: 1, width:40, renderer: renderAcciones}]
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
            store: storeUsuarios,
            colModel: cmodel,
            selModel: smodel,

            columnLines: true,
            viewConfig: {
                forceFit: true
            },
            enableColumnResize: true,
            enableHdMenu: true, //Menu of the column

            tbar: [btnNew, btnUpd, btnDel, "->"],
            bbar: pagingUser,

            style: "margin: 0 auto 0 auto;",
            width: '50%',
            height: '450',
            title: LABEL_TITLE_PANEL_1,

            renderTo: "divMain",
            listeners:{
                'cellclick': function (grdPanel, rowIndex, cellIndex, e, colIndex) {
                
                        sIcono = grdpnlUser.store.getAt(rowIndex).data["TIPO_BUSES_ICONO"];
                      
                }
            }
            
        });

        //Initialize events
        storeProcess(pageSize, pageSize, 0);

        cboPageSize.setValue(pageSize);

        var viewport = new Ext.Viewport({
            layout: 'fit',
            items: [grdpnlUser]
        });


    }
}

Ext.onReady(acl.application.init, acl.application);