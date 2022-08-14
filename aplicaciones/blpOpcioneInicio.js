
Ext.namespace("acl");
//=================================== 2013-6-18 primero inicio
	var summaryTemporal = new Ext.ux.grid.GroupSummary();    
	Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
		 return v+(record.data.CANTIDAD*record.data.TARIFA_UNITARIA)
	}; 

//=================================== 2013-6-18 primero fin
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_PANEL_1 = "Conteo Actual";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "Buscar ...";
var sw=0;
var sw1=0;
var sw2=0;
var sw3=0;
//var usuario = "<?php print_r($_SESSION['usr_session']); ?>"
//var sesion = "<?php echo $_SESSION['usr_session'] ?>";
//var sesion = session.getValue("usr_session"); 
//alert (sesion);
//var usuario = "<?php session_start(); print_r($_SESSION['usr_session']); ?>"
/*var summary = new Ext.ux.grid.GroupSummary();    
	Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
		 return v+(record.data.CANTIDAD*record.data.TARIFA_UNITARIA)
	}; */

acl.application = {
  init:function(){
  
    storeProgramacionProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      myMask.show();  
	  
	  
	  //obtener sumam total
      Ext.Ajax.request({
      url: "../servicios/blpReporte11Ajax.php",
      method: "POST",
      params: {"option": "LST", "pageSize": n, "limit": r, "start": i},
      success:function (result, request) {
	  var x = Ext.util.JSON.decode(result.responseText);
	  //Ext.getCmp('SUMA_TOTAL').setValue(x.resultRoot[0].TOTAL);  
	  console.log(Ext.util.JSON.decode(result.responseText));
      console.log(x.resultRoot[0].TOTAL);
                },
      failure:function (result, request) {
                  myMask.hide();
                  Ext.MessageBox.alert("Alert", LABEL_FAILURE_LOAD);
                }
      });
    };
	 //***************************************OPCIONES
	function doInsertarGiro()
	{
		var jsTablaGiroTmp;
		var jsTablaTrxTmp;
		var jsSwSincro = true;

	     Ext.Ajax.request({
            url: "../servicios/blpTransaccionClienteAjax.php",
            method: "POST",
            params: {"option": "COUNTGIROS","progId":Ext.getCmp('PROGRAMACION').getValue()},
        success:function (result, request) {
		var x = Ext.util.JSON.decode(result.responseText);
			Ext.getCmp('TRX_GIRO_ID').setValue(x.resultRoot[0].GIRO_NRO);	
        },
            failure:function (result, request) {
                      jsSwSincro = false;
                    }
      });
	}
	
	var formOpciones = new Ext.FormPanel({
	layout: 'column',
	region: 'center',			
	width: 810,
	height: 100,
	collapsible:true,
	bodyStyle: 'padding: 10px 10px 10px 10px;',
	labelWidth: 120,
	items: [{
                xtype: 'button',
				text: 'INICIAR DIA',
				iconCls: 'icon-add',
				colums:'2',
				width: 150,
				height:40,
				handler: function() {		doInsertarGiro(); 		}
			},{
             	xtype: 'button',
				text: 'CERRAR GIRO',
				iconCls: 'icon-add',
				colums:'1',
				width: 150,
				height:40,
				handler: function() {		doInsertarGiro(); 		}
			},{
                xtype: 'button',
				text: 'CONTINUAR DIA',
				iconCls: 'icon-add',
				colums:'3',
				width: 150,
				height:40,
				handler: function() {	alert(123);
				var url = "../aplicaciones/blpPP.php" ;
                location.replace(url);	}
			},{
                xtype: 'button',
				text: 'CERRAR DIA',
				iconCls: 'icon-add',
				colums:'4',
				width: 150,
				height:40,
				handler: function() {		}
		    }						
            ]
	});

	

    var viewport = new Ext.Viewport({
        layout : 'fit',
		//autoscroll:true,
        items : [ 
		            {
                    xtype: 'panel',
                    split: true,
                    flex: 1,
                    bodyStyle: 'padding:5px;',
                    height: 30,
                    width:200,
					defaults:{autoScroll: true},
					items:[formOpciones]
					}					
		]
    });
  }
}

Ext.onReady(acl.application.init, acl.application);
