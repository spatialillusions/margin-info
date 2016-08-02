function griddeclinationdiagram(TrueNorth,MagneticNorth,year,zone,color){
	var tnOffset = 0;
	var mnOffset = 0;
	var drawTrueNorth = TrueNorth
	var drawMagneticNorth = MagneticNorth;

	function arc(angle,radius){
		var arc = '<path stroke="' + color + '" stroke-width="0.15" stroke-dasharray="1.5,0.5" fill="none" d="m 50,' + (150-radius) + ' a ' + radius + ',' + radius + ' 0 0,' + (angle>0?1:0) + ' ' + (Math.sin(angle*2*Math.PI/360)*radius) + ',' + (radius - Math.cos(angle*2*Math.PI/360)*radius) + '" />'
		return arc;
	} 
	
	//If angle is less than 0.1 it should be drawn as 0
	if(Math.abs(drawTrueNorth)<0.05)drawTrueNorth = 0;
	if(Math.abs(drawMagneticNorth)<0.05)drawMagneticNorth = 0;

	//No angle should be drawn less than 3 degrees
	if((drawTrueNorth < 0 && drawMagneticNorth <0)||(drawTrueNorth > 0 && drawMagneticNorth > 0)){
		//Same side of Grid North
		if(Math.abs(drawTrueNorth) <= Math.abs(drawMagneticNorth)){
			//True North less than Magnetic North
			tnOffset = 62;
			mnOffset = 39.5;
			if(Math.abs(drawTrueNorth)<3)drawTrueNorth = drawTrueNorth/Math.abs(drawTrueNorth)*3;
			if((Math.abs(drawMagneticNorth) - Math.abs(drawTrueNorth)) < 3)drawMagneticNorth = ( Math.abs(drawMagneticNorth) / drawMagneticNorth ) * ( Math.abs(drawTrueNorth) + 3 );
		}else{
			//True North more than Magnetic North
			mnOffset = 39.5;
			if(Math.abs(drawMagneticNorth)<3)drawMagneticNorth = drawMagneticNorth/Math.abs(drawMagneticNorth)*3;
			if((Math.abs(drawTrueNorth) - Math.abs(drawMagneticNorth)) < 3)drawTrueNorth = ( Math.abs(drawTrueNorth) / drawTrueNorth ) * ( Math.abs(drawMagneticNorth) + 3 );
		}
	}else{
		//Different sides of Grid North
		if(drawTrueNorth != 0 && Math.abs(drawTrueNorth)<3)drawTrueNorth = drawTrueNorth/Math.abs(drawTrueNorth)*3;
		if(drawMagneticNorth != 0 && Math.abs(drawMagneticNorth)<3)drawMagneticNorth = drawMagneticNorth/Math.abs(drawMagneticNorth)*3;
	};

	var svg = '<svg width="100mm" height="120mm" viewBox="0 30 100 120" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">';

//Grid North
	svg += '<path stroke="' + color + '" stroke-width="0.1" d="m 50,150 l 0,-105" />';
	svg += '<text stroke="none" fill="' + color + '" x="50" y="44" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">GN</text>';
	if(zone != ''){
		svg += '<text stroke="none" fill="' + color + '" x="50" y="40" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">ZONE ' + zone + '</text>';
	}else{
		svg += '<path stroke="' + color + '" stroke-width="0.1" d="m 50,42 l 0,-15" />';
	};
	svg += '<g transform="rotate(-90 52.5 91.5 )"><text stroke="none" fill="' + color + '" x="54.5" y="91.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">GRID NORTH</text></g>';

//True North
	var rotate = (drawTrueNorth>0?-90:90);
	if(drawTrueNorth == 0) rotate = (drawMagneticNorth<0?-90:90);
	
	svg += '<g transform="rotate(' + drawTrueNorth +' 50 150 )">';
	svg += '<path stroke="' + color + '" stroke-width="0.1" d="m 50,' + (150 - tnOffset) + ' l 0,-40" />';
	svg += '<path stroke="none" fill="' + color + '" d="m 50,' + (110 - tnOffset) + ' 0.31166,0.92698 0.98662,0.0102 -0.79405,0.5804 0.29465,0.93243 -0.8024,-0.56827 -0.80453,0.56606 0.29814,-0.93161 -0.79187,-0.58258 0.98666,-0.007 z" />';
	svg += '<g transform="rotate(' + rotate + ' 50 ' + (129.5 - tnOffset) + ' )"><text stroke="none" fill="' + color + '" x="50" y="' + (132 - tnOffset) + '" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">TRUE NORTH</text></g>';
	svg += '</g>';
	svg += tnOffset==0?arc(drawTrueNorth,35):arc(drawTrueNorth,82);
	
	var textX = 50;
	if(drawMagneticNorth == 0){
		textX += (TrueNorth>0?15:-15);
	}else{
		textX += (MagneticNorth<0?15:-15);
	};
	if((drawTrueNorth > 0 && drawMagneticNorth <= 0)||(drawTrueNorth < 0 && drawMagneticNorth >= 0))textX += (Math.sin(drawTrueNorth*2*Math.PI/360)*(tnOffset==0?35:82));
	
	if(drawTrueNorth != 0){	
		svg += '<text style="fill:' + color + ';stroke:none;font-family:Arial;" x="' + textX + '"  y="' + (tnOffset==0?(150-35):(150-82)) + '">';
		svg += '<tspan x="' + textX + '" dy="-1.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">GRID CONVERGENCE </tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">' + Math.abs(TrueNorth.toFixed(1)) + '° (' + (Math.abs(TrueNorth.toFixed(1))*6400/360).toFixed(0) + ' MILS) ' + (TrueNorth<0?'WEST':'EAST') + '</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;"> FOR CENTER OF SHEET</tspan>';
		svg += '</text>';
	};
//Magnetic North
	var rotate = (drawMagneticNorth>0?-90:90);
	if(drawMagneticNorth == 0) rotate = (drawTrueNorth<0?-90:90);
	
	svg += '<g transform="rotate(' + drawMagneticNorth +' 50 150 )">';
	svg += '<path stroke="' + color + '" stroke-width="0.1" d="m 50,150 l 0,-102" />';
	if(drawMagneticNorth <= 0)svg += '<path stroke="none" fill="' + color + '" d="m 50,48 -0.14453,0 c -0.45382,2.43168 -1.14104,4.0851 -1.64062,4.98736 0.60373,-0.55552 1.04267,-0.88022 1.78125,-1.00689 z" />';	
	if(drawMagneticNorth >= 0)svg += '<path stroke="none" fill="' + color + '" d="m 50,48 0.14453,0 c 0.45382,2.43168 1.14104,4.0851 1.64062,4.98736 -0.60373,-0.55552 -1.04267,-0.88022 -1.78125,-1.00689 z" />';	
	svg += '<g transform="rotate(' + rotate + ' 50 ' + (126 - mnOffset) + ' )"><text stroke="none" fill="' + color + '" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;" x="50" y="' + (128.5 - mnOffset) + '" >MAGNETIC NORTH</text></g>';
	svg += '</g>';

	svg += arc(drawMagneticNorth,51);

	var textX = 50 + (MagneticNorth>0?15:-15)
	textX += (Math.sin(drawMagneticNorth*2*Math.PI/360)*51);
	
	svg += '<text style="fill:' + color + ';stroke:none;font-family:Arial;" x="' + textX + '"  y="' + (150-51 + (51 - Math.cos(drawMagneticNorth*2*Math.PI/360)*51)) + '">';
	svg += '<tspan x="' + textX + '" dy="-1.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">' + year + '</tspan>';
	svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">G-M ANGLE</tspan>';
	svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">' + Math.abs(MagneticNorth.toFixed(1)) + '° (' + (Math.abs(MagneticNorth.toFixed(1))*6400/360).toFixed(0) + ' MILS) ' + (MagneticNorth<0?'WEST':'EAST') + '</tspan>';
	svg += '</text>';
 	if(drawMagneticNorth != 0){           
		svg += '<text style="fill:' + color + ';stroke:none;font-family:Arial;" x="' + textX + '"  y="128.5">';
		svg += '<tspan x="' + textX + '" dy="0" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">TO CONVERT A</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">MAGNETIC AZIMUTH</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">TO A GRID AZIMUTH</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;"><tspan text-decoration = "underline">' + (MagneticNorth<0?'SUBTRACT':'ADD') + '</tspan> G-M-ANGLE</tspan>';
		svg += '</text>';

		svg += '<text style="fill:' + color + ';stroke:none;font-family:Arial;" x="' + textX + '"  y="142">';
		svg += '<tspan x="' + textX + '" dy="0" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">TO CONVERT A</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">GRID AZIMUTH TO A</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;">MAGNETIC AZIMUTH</tspan>';
		svg += '<tspan x="' + textX + '" dy="2.5" style="text-align:center;text-anchor:middle;font-size:2.5px;font-family:Arial;"><tspan text-decoration = "underline">' + (MagneticNorth>0?'SUBTRACT':'ADD') + '</tspan> G-M-ANGLE</tspan>';
		svg += '</text>';
	}
	svg += '</svg>';
	return svg;
}
