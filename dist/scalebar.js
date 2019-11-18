function scalebar(scale,showkm,showmiles,shownautical){
	var width = 0;
	var height = 0;
	var zero = 0;
	var center = 0;
	var point = 0.3527777777;//one point in mm
	var font = "Arial Narrow";//font to use
	var kmStep = 0.0001; //5 Meters
	if (scale > 10) 	kmStep = 	0.0005; 
	if (scale >= 50) 	kmStep = 	0.001; 
	if (scale > 100) 	kmStep = 	0.005; 
	if (scale >= 500) 	kmStep = 	0.01; 
	if (scale > 1000) 	kmStep = 	0.05; 
	if (scale >= 5000) 	kmStep = 	0.1; 
	if (scale > 10000) 	kmStep = 	0.5;
	if (scale >= 50000) kmStep = 	1; //1 kilometer
	if (scale > 100000) kmStep = 	5;
	if (scale >= 500000) kmStep = 	10; 
	if (scale > 1000000) kmStep = 	50;
	if (scale >= 5000000) kmStep = 	100; 
	if (scale > 10000000) kmStep = 	500;
	var km = Math.floor(scale/(10*kmStep*1000)); //number of steps to show
	var kmUnit = (1000*kmStep*1000)/scale;
	var kmMeasureUnit = "Meter";
	if (kmStep >= 1){
		kmMeasureUnit = "Kilometers";
	}else{
		kmStep *= 1000;
	}

	var milesStep = 0.1*0.914; //1 Yards
	if (scale > 10) 	milesStep = 	0.5*0.914; 
	if (scale >= 50)	milesStep = 	1*0.914; 
	if (scale > 100) 	milesStep = 	5*0.914; 
	if (scale >= 500) 	milesStep = 	10*0.914; 
	if (scale > 1000) 	milesStep = 	50*0.914; 
	if (scale >= 5000)	milesStep = 	100*0.914; 
	if (scale > 10000) 	milesStep = 	500*0.914;
	if (scale >= 50000) milesStep = 	1*1609.344; //1 mile
	if (scale > 100000) milesStep = 	5*1609.344;
	if (scale >= 500000) milesStep = 	10*1609.344; 
	if (scale > 1000000) milesStep = 	50*1609.344;
	if (scale >= 5000000) milesStep = 	100*1609.344; 
	if (scale > 10000000) milesStep = 	500*1609.344;

	var miles = Math.floor(scale/(10*milesStep));
	var milesUnit = (1000*milesStep)/scale;
	var milesMeasureUnit = "Yards";
	if (milesStep < 1609.344){
		milesStep = milesStep/0.914;
	}else{
		milesMeasureUnit = "Statute Miles";
		milesStep = milesStep/1609.344;
	}
	
	var nauticalmilesStep = 0.0001; //5 Cables
	if (scale > 10) 	nauticalmilesStep = 	0.0005; 
	if (scale >= 50) 	nauticalmilesStep = 	0.001; 
	if (scale > 100) 	nauticalmilesStep = 	0.005; 
	if (scale >= 500) 	nauticalmilesStep = 	0.01; 
	if (scale > 1000) 	nauticalmilesStep = 	0.05; 
	if (scale >= 5000) 	nauticalmilesStep = 	0.1; 
	if (scale > 10000) 	nauticalmilesStep = 	0.5;
	if (scale >= 50000) nauticalmilesStep = 	1; //1 nautical mile
	if (scale > 100000) nauticalmilesStep = 	5;
	if (scale >= 500000) nauticalmilesStep = 	10; 
	if (scale > 1000000) nauticalmilesStep = 	50;
	if (scale >= 5000000) nauticalmilesStep = 	100;
	if (scale > 10000000) nauticalmilesStep = 	500;

	var nauticalmiles = Math.floor(scale/(10*nauticalmilesStep*1852)); 
	var nauticalmilesUnit = (1000*nauticalmilesStep*1852)/scale;
	if((nauticalmilesUnit*nauticalmiles)<(milesUnit*miles))nauticalmiles++;//looks better if it is longer than miles
	var nauticalmilesMeasureUnit = "Cables";
	if (nauticalmilesStep >= 1){
		nauticalmilesMeasureUnit = "Nautical Miles";
	}else{
		nauticalmilesStep *= 10;
	}
	 //viewBox="0 0 100 120"
	
	zero = Math.max(kmUnit,milesUnit,nauticalmilesUnit);
	var width = (Math.max((km*kmUnit)+zero,(miles*milesUnit)+zero,(nauticalmiles*nauticalmilesUnit)+zero));
	zero += 5;//add some padding 
	center = (width / 2)+5;//calculate center and add padding
	width += 20;//add space for text
	if (scale >= 1000000)scale = Math.floor(scale/100000)+" 000,000"
	if (scale >= 1000)scale = Math.floor(scale/1000)+",000"
	var svg = '<svg width="'+width+'mm" height="20mm" viewBox="0 0 '+width+' 20" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">';
	//svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+',4 l 100,0" />';


	
	svg += '<text stroke="none" fill="black" x="'+center+'" y="4" text-anchor="middle" font-size="'+(9*point)+'" font-family="'+font+'" font-weight="bold">Scale 1:' + scale + '</text>';
	var offset = 9;

	if(showkm){
		svg += '<text stroke="none" fill="black" x="'+(zero-kmUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+kmStep+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l -'+(kmUnit)+',0 0,0.7 '+(kmUnit)+',0" />';
		for(var i = 1; i<=5; i=i+2){
			svg += '<path stroke="none" fill="black" stroke-width="0.1" d="M '+(zero-kmUnit/5*i)+','+offset+' l '+(kmUnit/5)+',0 0,0.7 -'+(kmUnit/5)+',0" />';
		}
		for (var i = 0; i<km;i++){
			svg += '<text stroke="none" fill="black" x="'+(zero+i*kmUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+(kmStep<1?(i*kmStep).toPrecision(1):(i*kmStep))+'</text>';
			if(i%2!=0){
				svg += '<path stroke="none" fill="black" d="M '+(zero+i*kmUnit)+','+offset+' l '+(kmUnit)+',0 0,0.7 -'+(kmUnit)+',0" />';
			}
		}
		svg += '<text stroke="none" fill="black" x="'+(zero+i*kmUnit-1)+'" y="'+(offset-0.5)+'" text-anchor="left" font-size="'+(7*point)+'" font-family="'+font+'">'+(kmStep<1?(i*kmStep).toPrecision(1):(i*kmStep))+' '+kmMeasureUnit+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l '+(kmUnit*km)+',0 0,0.7 -'+(kmUnit*km)+',0" />';

		offset += 4.8;
	}
	if(showmiles){
		svg += '<text stroke="none" fill="black" x="'+(zero-milesUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+milesStep+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l -'+(milesUnit)+',0 0,0.7 '+(milesUnit)+',0" />';
		for(var i = 1; i<=5; i=i+2){
			svg += '<path stroke="none" fill="black" stroke-width="0.1" d="M '+(zero-milesUnit/5*i)+',13.8 l '+(milesUnit/5)+',0 0,0.7 -'+(milesUnit/5)+',0" />';
		}
		for (var i = 0; i<miles;i++){
			svg += '<text stroke="none" fill="black" x="'+(zero+i*milesUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+(milesStep<1?(i*milesStep).toPrecision(1):(i*milesStep))+'</text>';
			if(i%2!=0){
				svg += '<path stroke="none" fill="black" d="M '+(zero+i*milesUnit)+','+offset+' l '+(milesUnit)+',0 0,0.7 -'+(milesUnit)+',0" />';
			}		
		}
		svg += '<text stroke="none" fill="black" x="'+(zero+i*milesUnit-1)+'" y="'+(offset-0.5)+'" text-anchor="left" font-size="'+(7*point)+'" font-family="'+font+'">'+(milesStep<1?(i*milesStep).toPrecision(1):(i*milesStep))+' '+milesMeasureUnit+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l '+(milesUnit*miles)+',0 0,0.7 -'+(milesUnit*miles)+',0" />';

		offset += 4.8;
	}
	if(shownautical){
		svg += '<text stroke="none" fill="black" x="'+(zero-nauticalmilesUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+nauticalmilesStep+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l -'+(nauticalmilesUnit)+',0 0,0.7 '+(nauticalmilesUnit)+',0" />';
		for(var i = 1; i<=5; i=i+2){
			svg += '<path stroke="none" fill="black" stroke-width="0.1" d="M '+(zero-nauticalmilesUnit/5*i)+','+offset+' l '+(nauticalmilesUnit/5)+',0 0,0.7 -'+(nauticalmilesUnit/5)+',0" />';
		}
		for (var i = 0; i<nauticalmiles;i++){
			svg += '<text stroke="none" fill="black" x="'+(zero+i*nauticalmilesUnit)+'" y="'+(offset-0.5)+'" text-anchor="middle" font-size="'+(7*point)+'" font-family="'+font+'">'+(nauticalmilesStep<1?(i*nauticalmilesStep).toPrecision(1):(i*nauticalmilesStep))+'</text>';
			if(i%2!=0){
				svg += '<path stroke="none" fill="black" d="M '+(zero+i*nauticalmilesUnit)+','+offset+' l '+(nauticalmilesUnit)+',0 0,0.7 -'+(nauticalmilesUnit)+',0" />';
			}	
		}
		svg += '<text stroke="none" fill="black" x="'+(zero+i*nauticalmilesUnit-1)+'" y="'+(offset-0.5)+'" text-anchor="left" font-size="'+(7*point)+'" font-family="'+font+'">'+(nauticalmilesStep<1?(i*nauticalmilesStep).toPrecision(1):(i*nauticalmilesStep))+' '+nauticalmilesMeasureUnit+'</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+zero+','+offset+' l '+(nauticalmilesUnit*nauticalmiles)+',0 0,0.7 -'+(nauticalmilesUnit*nauticalmiles)+',0" />';
	}
	svg += '</svg>';
	return svg;
}