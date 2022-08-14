<?php

$conexion = new mysqli('localhost', 'root', '', 'cobro_buses_origen', 3306);
@mysqli_query($conexion, "SET NAMES 'utf8' COLLATE 'utf8_bin'");
if (mysqli_connect_errno()) {
    printf("La conexión con el servidor de base de datos falló: %s\n", mysqli_connect_error());
    exit();
}

$a = isset($_REQUEST["idRuta"]) ? $_REQUEST["idRuta"] : 0;
$b = isset($_REQUEST["idCajero"]) ? $_REQUEST["idCajero"] : 0;
$c = isset($_REQUEST["fecha1"]) ? $_REQUEST["fecha1"] : 0;
$d = isset($_REQUEST["sturno"]) ? $_REQUEST["sturno"] : 0;

$sFechaHoy    = date('Y-m-d');
$sFechaManana = date('Y-m-d', strtotime($sFechaHoy) + 86400);
$sFecha1      = trim($c); //fecha
$sFecha2      = date('Y-m-d', strtotime($sFecha1) + 86400);
$sRuta        = trim($a); //ruta o patio
$sTurno       = trim($d); //turno
$sCajero      = trim($b); //cajero 

$hora1  = '06:00:00';
$hora2  = '14:00:00';
$hora3  = '22:00:00';
$hora11 = '05:59:59';
$hora22 = '13:59:59';
$hora33 = '21:59:59';

$sSQL = " ";

if ((int) $sRuta > 0) {
    $sSQL = $sSQL . " lqd_ruta_id = '$sRuta'	AND ";
}
if ((int) $sCajero > 0) {
    $sSQL = $sSQL . " lqd_cajero  = '$sCajero' 	AND ";
}
switch ((int) $sTurno) {
    case 0:
        if (!$sFecha1 == 0) {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFecha1 . " " . $hora1 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFecha2 . " " . $hora11 . "' AND";
        } else {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFechaHoy . " " . $hora1 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFechaManana . " " . $hora11 . "' AND";
        }
        break;
    case 1:
        if (!$sFecha1 == 0) {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFecha1 . " " . $hora1 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFecha1 . " " . $hora22 . "' AND";
        } else {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFechaHoy . " " . $hora1 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFechaHoy . " " . $hora22 . "' AND";
        }
        break;
    case 2:
        if (!$sFecha1 == 0) {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFecha1 . " " . $hora2 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFecha1 . " " . $hora33 . "' AND";
        } else {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFechaHoy . " " . $hora2 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFechaHoy . " " . $hora33 . "' AND";
        }
        break;
    case 3:
        if (!$sFecha1 == 0) {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFecha1 . " " . $hora3 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFecha2 . " " . $hora11 . "' AND";
        } else {
            $sSQL = $sSQL . " DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '" . $sFechaHoy . " " . $hora3 . "' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '" . $sFechaManana . " " . $hora11 . "' AND";
        }
        break;
}

$sSQL1 = "SELECT lqd_ruta_id,
				(SELECT RUTA_DESCRIPCION 
				FROM mb_rutas 
				WHERE RUTA_ID =  lqd_ruta_id
				) AS ruta,
				lqd_id,
				LQD_CAJERO,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = LQD_CAJERO
				) AS cajero, 
				lqd_anfitrion,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = lqd_anfitrion
				) AS anfitrion, 
				(SELECT tipo_herramienta_codigo
				FROM mb_tipos_herramienta
				WHERE tipo_herramienta_id = LQD_TIPO_HERRAMIENTA_ID
				) AS bus,
				lqd_nd,
				(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '1' AND (lqd_ruta_id = '1' OR lqd_ruta_id = '2')))as impNormal,
				(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '5' AND lqd_ruta_id = '3'))as impNormalSur,
				lqd_pd,
				(lqd_pd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '3'))as impPreferencial,
				lqd_nn,
				(lqd_nn*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '2'))as impNocturno, 
				(lqd_nd+lqd_pd+lqd_nn)as cantTotal, 
				lqd_monto, 
				lqd_registro,
				lqd_montosf,
				(
				lqd_monto +	lqd_montosf
				)as totalRecaudado,
				lqd_nro_magico
				FROM mb_liq_manuales
				WHERE  			
				" . $sSQL . "			
				lqd_estado = 'ACTIVO'
				
				order by ruta,cajero,lqd_registro 
			 ";

$resultado        = $conexion->query($sSQL1);
$consultacajeros  = "SELECT 
				lqd_id,
				LQD_CAJERO,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = LQD_CAJERO
				) AS cajero				
				FROM mb_liq_manuales
				WHERE 
				" . $sSQL . "			
				lqd_estado = 'ACTIVO'
				group by LQD_CAJERO";
$resultadoCajeros = $conexion->query($consultacajeros);

$consultarutas  = "SELECT 
				lqd_ruta_id,
				(SELECT RUTA_DESCRIPCION 
				FROM mb_rutas 
				WHERE RUTA_ID =  lqd_ruta_id
				) AS ruta,
				lqd_id,
				LQD_CAJERO,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = LQD_CAJERO
				) AS cajero				
				FROM mb_liq_manuales
				WHERE 
				" . $sSQL . "			
				lqd_estado = 'ACTIVO'
				group by lqd_ruta_id";
$resultadoRutas = $conexion->query($consultarutas);

if ($resultado->num_rows > 0) {
    
    date_default_timezone_set('America/La_Paz');
    
    if (PHP_SAPI == 'cli')
        die('Este archivo solo se puede ver desde un navegador web');
    
    /** Se agrega la libreria PHPExcel */
    require_once 'lib/PHPExcel/PHPExcel.php';
    
    // Se crea el objeto PHPExcel
    $objPHPExcel = new PHPExcel();
    
    // Se asignan las propiedades del libro
    $objPHPExcel->getProperties()->setCreator("Codedrinks") //Autor
        ->setLastModifiedBy("Codedrinks") //Ultimo usuario que lo modificó
        ->setTitle("Reporte Excel con PHP y MySQL")->setSubject("Reporte Excel con PHP y MySQL")->setDescription("Reporte Cajeros")->setKeywords("reporte cajeros")->setCategory("Reporte excel");
    
    //--
    $estiloTituloReporte = array(
        'font' => array(
            'name' => 'Verdana',
            'bold' => true,
            'italic' => false,
            'strike' => false,
            'size' => 16,
            'color' => array(
                'rgb' => 'FFFFFF'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => 'FF220835'
            )
        ),
        'borders' => array(
            'allborders' => array(
                'style' => PHPExcel_Style_Border::BORDER_NONE
            )
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            'rotation' => 0,
            'wrap' => TRUE
        )
    );
    
    $estiloTituloColumnas = array(
        'font' => array(
            'name' => 'Arial',
            'bold' => true,
            'color' => array(
                'rgb' => 'FFFFFF'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
            'rotation' => 90,
            'startcolor' => array(
                'rgb' => 'c47cf2'
            ),
            'endcolor' => array(
                'argb' => 'FF431a5d'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            'wrap' => TRUE
        )
        
    );
    
    $estiloInformacion = new PHPExcel_Style();
    $estiloInformacion->applyFromArray(array(
        'font' => array(
            'name' => 'Arial',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => 'FFd9b7f4'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        )
    ));
    
    //----
    $estiloInformacion1 = new PHPExcel_Style();
    $estiloInformacion1->applyFromArray(array(
        'font' => array(
            'name' => 'Arial',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => '88EFED86'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        )
    ));
    
    //----
    $estiloInformacion2 = new PHPExcel_Style();
    $estiloInformacion2->applyFromArray(array(
        'font' => array(
            'name' => 'Arial',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => '88F77181'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        )
    ));
    
    //----
    $estiloInformacion3 = new PHPExcel_Style();
    $estiloInformacion3->applyFromArray(array(
        'font' => array(
            'name' => 'Arial',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => '887FDB9C'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        )
    ));
    //----
    $estiloInformacion4 = new PHPExcel_Style();
    $estiloInformacion4->applyFromArray(array(
        'font' => array(
            'name' => 'Arial',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array(
                'argb' => '887DABD8'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'left' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'right' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        )
    ));
    
    $tituloReporte   = "REPORTE CAJEROS - " . $sFecha1;
    $titulosColumnas = array(
        'ID RUTA',
        'RUTA',
        'ID LIQUIDACION',
        'ID CAJERO',
        'CAJERO',
        'ID ANFITRION',
        'ANFITRION',
        'BUS',
        'NORMALES',
        'NORMAL Bs.',
        'PREFERENTES',
        'PREFERENTES Bs.',
        'NOCTURNOS',
        'NOCTURNOS Bs.',
        'PASAJEROS',
        'TOTAL Bs.',
        'SOBRANTE Bs.',
        'RECAUDADO Bs.',
        'REGISTRO',
        'NRO. MAGICO'
    );
    
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A1:P1');
    
    // Se agregan los titulos del reporte
    $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1', $tituloReporte)->setCellValue('A3', $titulosColumnas[1])->setCellValue('B3', $titulosColumnas[4])->setCellValue('C3', $titulosColumnas[6])->setCellValue('D3', $titulosColumnas[7])->setCellValue('E3', $titulosColumnas[8])->setCellValue('F3', $titulosColumnas[9])->setCellValue('G3', $titulosColumnas[10])->setCellValue('H3', $titulosColumnas[11])->setCellValue('I3', $titulosColumnas[12])->setCellValue('J3', $titulosColumnas[13])->setCellValue('K3', $titulosColumnas[14])->setCellValue('L3', $titulosColumnas[15])->setCellValue('M3', $titulosColumnas[16])->setCellValue('N3', $titulosColumnas[17])->setCellValue('O3', $titulosColumnas[18])->setCellValue('P3', $titulosColumnas[19]);
    
    //Se agregan los datos de los alumnos
    
    $sumNormales       = 0.0;
    $sumPreferente     = 0.0;
    $sumNocturno       = 0.0;
    $sumTotal          = 0.0;
    $sumSobrante       = 0.0;
    $sumTotalRecaudado = 0.0;
    $i                 = 4;
    
    while ($row1 = mysqli_fetch_assoc($resultadoCajeros)) {
        $r1[] = $row1;
    }
    while ($row2 = mysqli_fetch_assoc($resultado)) {
        $r2[] = $row2;
    }
    while ($row3 = mysqli_fetch_assoc($resultadoRutas)) {
        $r3[] = $row3;
    }
    $s = $objPHPExcel->setActiveSheetIndex(0);
    foreach ($r1 as $filaCajero) {
        $valorX = $filaCajero['LQD_CAJERO'];
        foreach ($r2 as $fila) {
            if ($valorX == $fila['LQD_CAJERO']) {
                $s->setCellValue('A' . $i, $fila['ruta']); //--							
                $s->setCellValue('B' . $i, $fila['cajero']); //--							
                $s->setCellValue('C' . $i, $fila['anfitrion']); //--
                $s->setCellValue('D' . $i, $fila['bus']); //--
                $s->setCellValue('E' . $i, $fila['lqd_nd']); //--
                if ($fila['lqd_ruta_id'] == '3') {
                    $s->setCellValue('F' . $i, $fila['impNormalSur']); //--
                    $sumNormales = $sumNormales + $fila['impNormalSur'];
                } else {
                    $s->setCellValue('F' . $i, $fila['impNormal']); //--
                    $sumNormales = $sumNormales + $fila['impNormal'];
                }
                $s->setCellValue('G' . $i, $fila['lqd_pd']); //--
                $s->setCellValue('H' . $i, $fila['impPreferencial']); //--
                $s->setCellValue('I' . $i, $fila['lqd_nn']); //--
                $s->setCellValue('J' . $i, $fila['impNocturno']); //--
                $s->setCellValue('K' . $i, $fila['cantTotal']); //--
                $s->setCellValue('L' . $i, $fila['lqd_monto']); //--
                $s->setCellValue('M' . $i, $fila['lqd_montosf']); //--
                $s->setCellValue('N' . $i, $fila['totalRecaudado']); //--
                $s->setCellValue('O' . $i, $fila['lqd_registro']); //--							
                $s->setCellValue('P' . $i, $fila['lqd_nro_magico']); //--							
                
                $sumPreferente     = $sumPreferente + $fila['impPreferencial'];
                $sumNocturno       = $sumNocturno + $fila['impNocturno'];
                $sumTotal          = $sumTotal + $fila['lqd_monto'];
                $sumSobrante       = $sumSobrante + $fila['lqd_montosf'];
                $sumTotalRecaudado = $sumTotalRecaudado + $fila['totalRecaudado'];
                
                $s->setSharedStyle($estiloInformacion1, "E" . $i . ":F" . $i);
                $s->setSharedStyle($estiloInformacion2, "G" . $i . ":H" . $i);
                $s->setSharedStyle($estiloInformacion3, "I" . $i . ":J" . $i);
                $s->setSharedStyle($estiloInformacion4, "K" . $i . ":N" . $i);
                $s->setSharedStyle($estiloInformacion, "A" . $i . ":D" . $i);
                $s->setSharedStyle($estiloInformacion, "O" . $i . ":P" . $i);
                
                $i++;
            }
        }
        
        $s->setCellValue('F' . $i, $sumNormales);
        $s->setCellValue('H' . $i, $sumPreferente);
        $s->setCellValue('J' . $i, $sumNocturno);
        $s->setCellValue('L' . $i, $sumTotal);
        $s->setCellValue('M' . $i, $sumSobrante);
        $s->setCellValue('N' . $i, $sumTotalRecaudado);
        
        $s->getStyle('F' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
        $s->getStyle('F' . $i)->getFill()->getStartColor()->setRGB('FFFFFF');
        
        $sumNormales       = 0.0;
        $sumPreferente     = 0.0;
        $sumNocturno       = 0.0;
        $sumTotal          = 0.0;
        $sumSobrante       = 0.0;
        $sumTotalRecaudado = 0.0;
        $i++;
    }
    $i++; //end foreach
    
    $s->setCellValue('A' . $i, 'TOTALES POR RUTA');
    $s->mergeCells('A' . $i . ':B' . $i);
    $s->setSharedStyle($estiloInformacion4, "A" . $i . ":B" . $i);
    $i++;
    $sum = 0.0;
    foreach ($r3 as $filaRuta) {
        $s->setCellValue('A' . $i, $filaRuta['ruta']);
        foreach ($r2 as $monto) {
            if ($filaRuta['ruta'] == $monto['ruta']) {
                if ($monto['lqd_ruta_id'] == '3') {
                    $sum = $sum + ($monto['impNormalSur'] + $monto['impPreferencial'] + $monto['impNocturno'] + $monto['lqd_montosf']);
                } else {
                    $sum = $sum + ($monto['impNormal'] + $monto['impPreferencial'] + $monto['impNocturno'] + $monto['lqd_montosf']);
                }
            }
        }
        $s->setCellValue('B' . $i, $sum);
        $s->setSharedStyle($estiloInformacion, "A" . $i . ":B" . $i);
        $sum = 0.0;
        $i++;
    }
    
    $objPHPExcel->getActiveSheet()->getStyle('A1:P1')->applyFromArray($estiloTituloReporte);
    $objPHPExcel->getActiveSheet()->getStyle('A3:P3')->applyFromArray($estiloTituloColumnas);
    
    for ($i = 'A'; $i <= 'P'; $i++) {
        //$objPHPExcel->setActiveSheetIndex(0)			
        $s->getColumnDimension($i)->setAutoSize(TRUE);
    }
    // Se asigna el nombre a la hoja
    $objPHPExcel->getActiveSheet()->setTitle('REPORTE CAJEROS');
    
    // Se activa la hoja para que sea la que se muestre cuando el archivo se abre
    $objPHPExcel->setActiveSheetIndex(0);
    // Inmovilizar paneles 
    //$objPHPExcel->getActiveSheet(0)->freezePane('A4');
    $objPHPExcel->getActiveSheet(0)->freezePaneByColumnAndRow(0, 4);
    
    // Se manda el archivo al navegador web, con el nombre que se indica (Excel2007)
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="Reportedecajeros' . $sFecha1 . '.xlsx"');
    header('Cache-Control: max-age=0');
    
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter->save('php://output');
    exit;
    
} else {
    ?>
	<script type="text/javascript">
		alert("No hay resultados para mostrar");
		document.location="blpreporte.php"
	</script>
	<?php
    
    //print_r('No hay resultados para mostrar');
}
?>