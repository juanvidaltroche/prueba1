<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']))
  //  header("location:index.php");
?>
<!DOCTYPE HTML>
<html>
  <head><meta http-equiv="content-type" content="text/html; charset=UTF-8">	

    <!-- librerias -->

    <!--Ext and ux styles -->
    <link href="../ext/cronograma/extjs-4.2.0/resources/css/ext-all.css" rel="stylesheet" type="text/css"/>

    <!--Scheduler styles-->
    
    <link href="../ext/cronograma/resources/css/sch-all.css" rel="stylesheet" type="text/css"/>

    <!--Implementation specific styles-->    
    
    <link href="../ext/cronograma/css/examples.css"rel="stylesheet" type="text/css"/>
	<link href="../ext/cronograma/css/print.css" rel="stylesheet" type="text/css" />

    <!--Ext lib and UX components-->
    
    <script src="../ext/cronograma/extjs-4.2.0/ext-all.js" type="text/javascript"></script>

    <!--Scheduler files-->
    
    <script src="../ext/cronograma/sch-all-debug.js" type="text/javascript"></script>

    <!--Application files-->
    
    <script src="../ext/cronograma/examples-shared.js" type="text/javascript"></script>
    <!-- css -->
        <style type="text/css">
    .icon-task
{
    background: transparent url(../ext/cronograma/images/LeftNavTaskIcon.gif) no-repeat left center;
}

.icon-clock
{
    padding-left:20px;
    background: url(../ext/cronograma/images/clock.png) no-repeat left center !important;
    display:block;
}

.icon-earth
{
    padding-left:20px;
    background: url(../ext/cronograma/images/earth.png) no-repeat left center !important;
    display:block;
}

.sch-event 
{
    color: #FFF;
    text-shadow: rgba(0,0,0,.2) 0 -1px 0;
    -moz-border-radius:5px;
    -webkit-border-radius: 5px;
    background-color:Navy;
    cursor: pointer;
}

.sch-event .sch-event-inner
{
    line-height: 0.9em;
    white-space:nowrap;
}

.sch-event-header
{
    font-weight:bold;
	overflow:hidden;
    font-size:0.9em;
}

.sch-event-footer
{
    padding-left:2px;
}

.sch-event-hover 
{
    -webkit-box-shadow: 1px 1px 1px rgba(100, 100, 100, 0.5);
    -moz-box-shadow: 1px 1px 1px rgba(100, 100, 100, 0.5); 
    border-color:#666;
}

/*  -----------------------------------
    Styling of the event tooltip 
    ----------------------------------- */

.eventTip
{
    padding:5px;
}

.eventTip dd
{
    margin-bottom:17px;
    padding-left:28px;
}

.eventTip dd:last-child
{
    margin-bottom:0px !important;
}

.eventTip dt
{
    padding-left:26px;
    font-weight:bold;
    padding-bottom:7px;
}


/*  -----------------------------------
    Styling of log rows
    ----------------------------------- */

.evt-row
{
    padding: 9px 0;
}

.evt-row span
{
    margin-left:5px;
}

.evt-row:nth-child(odd)
{
    background:whitesmoke;
}


.event
{
    background:url(../ext/cronograma/images/lightning.png) no-repeat left center;
}

.evt-time
{
    color:Gray;
    background:url(../ext/cronograma/images/lightning.png) no-repeat left center;
    padding-left:20px;
}

.evt-name 
{
    font-weight:bold;
}

.evt-source 
{
    text-decoration:underline;
}

.icon-delete
{
    background:url(../ext/cronograma/images/delete.png) no-repeat left center;
}

.locked
{
    background:url(../ext/cronograma/images/lock.png) no-repeat left center;
}

.unlocked
{
    background:url(../ext/cronograma/images/lock_open.png) no-repeat left center;
}

.x-panel-body > span
{
    display: none !important;
}

    </style>
    <!-- css -->



    <script type="text/javascript">
    function DecodeHtmlEntities(str) {
          try {
              var txt = document.createElement('textarea');
              txt.innerHTML = str;
              return txt.value;
          } catch (e) {
              return str;
          }
      }
      function EncodingText(str) {
          var res = str;
          for (var i = 160; i < 256; i++) {
              var newcaracter = "&#" + i + ";";
              var oldcaracter = DecodeHtmlEntities(newcaracter);
              res = res.replace(oldcaracter, newcaracter);
          }
          return res;
      }
      function caracteres_especiales(str) {
          str = (DecodeHtmlEntities(str));
          return str;
      }
Ext.ns('App');

Ext.Loader.setConfig({ enabled : true, disableCaching : true });
Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.require([
    'Sch.panel.SchedulerGrid'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    App.Scheduler.init();
});

	
	
	var global_fecha = new Date();

	var g_dia  = global_fecha.getDate();	
	var g_mes = global_fecha.getMonth();
	var g_anio = global_fecha.getFullYear();
	
App.Scheduler = {


    
    // Bootstrap function
    init : function() {
	 Sch.preset.Manager.registerPreset("dayNightShift", {
                  timeColumnWidth: 35,
                  rowHeight: 32,
                  displayDateFormat: 'G:i',
                  shiftIncrement: 1,
                  shiftUnit: "DAY",
                  timeResolution: {
                      unit: "MINUTE",
                      increment: 1
                  },
                  defaultSpan: 24,
                  headerConfig: {
                      bottom: {
                          unit: "HOUR",
                          increment: 1,
                          dateFormat: 'G'
                      },
                      middle: {
                          unit: "HOUR",
                          increment: 1,
                          renderer: function (startDate, endDate, headerConfig, cellIdx) {
                              // Setting align on the header config object
                              headerConfig.align = 'center';

                              if (startDate.getHours() === 0) {
                                  // Setting a custom CSS on the header cell element
                                  headerConfig.headerCls = 'nightShift';
                                  return Ext.Date.format(startDate, 'M d') + ' Night Shift';
                              }
                              else {
                                  // Setting a custom CSS on the header cell element
                                  headerConfig.headerCls = 'dayShift';
                                  return Ext.Date.format(startDate, 'M d') + ' Day Shift';
                              }
                          }
                      },
                      top: {
                          unit: "DAY",
                          increment: 1,
                          dateFormat: 'd M Y'
                      }
                  }
              });
	
	
        
        this.scheduler = this.createScheduler();
        
        var container = new Ext.Panel({
            layout : 'border',
            height : ExampleDefaults.height,
            width : ExampleDefaults.width,
            renderTo : 'example-container',
            items : [
                this.scheduler                       
            ]
        });

        this.scheduler.resourceStore.load();
    },
    
    renderer : function (item, resourceRec, row, col, ds) {
        var bookingStart = item.getStartDate();
        
        return {
            headerText : Ext.Date.format(bookingStart, "G:i"),
            footerText : item.getName()
        };
    },
    
    createScheduler : function() {
        Ext.define('MyEvent', {
            extend : 'Sch.model.Event',
            fields : ['Location']
        });

        // Store holding all the resources
        var resourceStore = new Sch.data.ResourceStore({
            proxy : {
                type : 'ajax',
                url : '../servicios/blpitinerarioMatrizAjax.php?option=LST',
                reader : {
                    type : 'json',
                    root : 'staff'
                }
            },
            model : 'Sch.model.Resource'
        });

        // Store holding all the events
        var eventStore = new Sch.data.EventStore({
            model : 'MyEvent'
        });

        resourceStore.on('load', function() {
            eventStore.loadData(resourceStore.proxy.reader.jsonData.tasks);
        });
		  
		  
					Ext.define('Rutas', {
					extend: 'Ext.data.Model',
					fields: [
						{name: 'RUTA_ID', type: 'string'},
						{name: 'RUTA_DESCRIPCION',  type: 'string'}						
					]
				});
				
				var storeRutas = Ext.create('Ext.data.Store', {
					model: 'Rutas',
					proxy: {
						type: 'ajax',
						url: '../servicios/blpitinerarioMatrizAjax.php?option=RUTAS',
						reader: {
							type: 'json',
							root: 'resultRoot'
						}
					},
					autoLoad: true
				});
        
        var s = Ext.create("Sch.SchedulerPanel", {
            region      : 'center',
            loadMask    : true,
            rowHeight   : 30,
            timeAxis : new MyTimeAxis(),
            columns     : [
                {
                    xtype           : 'actioncolumn',
                    align           : 'center',
                    width           : 30,
                    menuDisabled    : true,
                    
                    items           : [
                        {
                            icon    : '../ext/cronograma/images/delete.png', 
                            tooltip : 'Delete row',
                            handler : function(grid, rowIndex, colIndex) {
                                resourceStore.removeAt(rowIndex);
                            }
                        }
                    ]
                },
                { header : 'PUMAS', sortable:true, width:130, dataIndex : 'Name' },
				 { header : 'ID BUS', sortable:true, width:130, dataIndex : 'IdBus', hideable:true,hidden:true },
				 { header : 'BUS', sortable:true, width:130, dataIndex : 'Ba' , hideable:true,hidden:true}
            ],
            
             // Setup view configuration
            startDate : new Date(g_anio, g_mes, g_dia, 8),
            endDate : new Date(g_anio, g_mes, g_dia, 18),
            viewPreset: 'hourAndDay',
            eventRenderer : this.renderer,
            
            // Simple template with header and footer
            eventBodyTemplate : new Ext.Template(
                '<span class="sch-event-header">{headerText}</span>' + 
                '<div class="sch-event-footer">{footerText}</div>'
            ),
            
            resourceStore : resourceStore,
            eventStore : eventStore,
            border : true,
			//--
			onEventCreated: function (newEventRecord) {
			
                      // Overridden to provide some defaults before adding it to the store
                      newEventRecord.set('Title', 'Hello...');
                      
					  console.log(newEventRecord.data.ResourceId);
                      console.log(newEventRecord.data.StartDate);
                      console.log(newEventRecord.data.EndDate);
					  
					  console.log(newEventRecord);

                      var fechainicio = newEventRecord.data.StartDate;
                      var fechafin = newEventRecord.data.EndDate;
                      var id = newEventRecord.data.ResourceId;

					  /*var Date = '24/02/2009';
						var elem = uneDate.split('/');
						dia = elem[0];*/
						
						var fecha_inicio = ( fechainicio.getHours()+":"+fechainicio.getMinutes());
						var fecha_fin = ( fechafin.getHours()+":"+fechafin.getMinutes());
					  
                     
                        Ext.MessageBox.confirm('Confirmar', 'Esta seguro de esta acción?', function showResult(btn){
                            if(btn == 'yes'){
                                //-- ajax para guardar cambios 
                               var myMask = new Ext.LoadMask(Ext.getBody(), 
			                    {
				                    msg: "CARGANDO..."
                                });
			                    myMask.show();			
                                //-- AJAX                                
                                Ext.Ajax.request({
  			                    	url: "../servicios/blpitinerarioMatrizAjax.php?option=NUEVO",
                                    method: "POST",
                                    params: {  										
                                        "id":id,                                         
                                         "fechainicio":fecha_inicio,                                          
                                         "fechafin":fecha_fin                                  
                                    },
                                    success: function (result, request) {                    
                                        myMask.hide();
                                        sched.eventStore.load();
                                       
                                    },
                                    failure: function (result, request) {
                                        myMask.hide();
                                        Ext.MessageBox.alert("Error", "ERROR DE SERVIDOR");
                                    }
                                });
                                //-- END AJAX
                            }else{
                            sched.eventStore.load();
                            }//END IF
                        });
                  },
				  onEventUpdate: function (newEventRecord) {
                      // Overridden to provide some defaults before adding it to the store
                      newEventRecord.set('Title', 'Hello...');
                      console.log(newEventRecord.data.ResourceId);
                      console.log(newEventRecord.data.StartDate);
                      console.log(newEventRecord.data.EndDate);             

                     
                        Ext.MessageBox.confirm('Confirmar', 'Esta seguro de esta acción?', function showResult(btn){
                            if(btn == 'yes'){
                             
                            }else{
                            sched.eventStore.load();
                            }//END IF
                        });
                  },
			//--
            tbar : [
                {
                    iconCls : 'icon-previous',
                    scale : 'medium',
                    handler : function() {
                        s.shiftPrevious();
                    }
                },
                {
                    iconCls : 'icon-next',
                    scale : 'medium',
                    handler : function() {
                        s.shiftNext();
                    }
                },
                '                     ',
                {
				fieldLabel: 'Ruta',
                xtype : 'combo',
                id : 'eventCombo',
                store : storeRutas,
                triggerAction : 'all',
                editable : false,
                value : "-- Ruta --",
				hiddenName: 'H_RUTA_ID',
				displayField: 'RUTA_DESCRIPCION',
				valueField: 'RUTA_ID',
				listeners: {
                  select: function (combo, record, index) {  
				  //console.log(record[0].get('RUTA_ID'));		
						resourceStore.load({
							params:{RUTA_ID: record[0].get('RUTA_ID')}
						});
										
					}
                }
                },
                '->',
                {
                    iconCls : 'unlocked',
                    scale : 'medium',
                    text : 'desbloqueado',
                    enableToggle : true,
                    handler : function() {
                        s.setReadOnly(this.pressed);
                        this.setIconCls(this.pressed ? 'locked' : 'unlocked');
                        this.setText(this.pressed ? 'bloqueado' : 'Bloquear');
                    }
                }
            ],
            
            tooltipTpl : new Ext.XTemplate(
                '<dl class="eventTip">', 
                    '<dt class="icon-clock">Time</dt><dd>{[Ext.Date.format(values.StartDate, "Y-m-d G:i")]}</dd>',
                    '<dt class="icon-task">Task</dt><dd>{Name}</dd>',
                    '<dt class="icon-earth">Location</dt><dd>{Location}&nbsp;</dd>',
                '</dl>'
            ).compile()
        });

        return s;
    }
};



Ext.define('MyTimeAxis', {
    extend : "Sch.data.TimeAxis", 
    continuous : false,

    generateTicks : function(start, end, unit, increment) {
        // Use our own custom time intervals 
        if (unit === Sch.util.Date.HOUR) {
            var ticks = [];

            while (start < end) {
                if (start.getHours() >= 8 && start.getHours() <= 18) {
                    ticks.push({
                        start : start,
                        end : Sch.util.Date.add(start, Sch.util.Date.HOUR, 1)
                    });
                }
                start = Sch.util.Date.add(start, Sch.util.Date.HOUR, 1);
            }
            return ticks;
        } else {
            return MyTimeAxis.superclass.generateTicks.apply(this, arguments);
        }
    }
});

    </script>    
    
    <title>SAE</title>
  </head>
  <body>    
    <div id="example-container">
    </div>
  </body>
</html>