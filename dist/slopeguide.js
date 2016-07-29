function slopeguide(scale,contourInterval){
	var width = 5*1000*(contourInterval/((0.05)*scale))+10;
	var height = 65;
	var zero = 0;
	var center = width/2;
	var point = 0.3527777777;//one point in mm
	var font = "Arial Narrow";//font to use


	var svg = '<svg width="'+width+'mm" height="'+height+'mm" viewBox="0 0 '+width+' '+height+'" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">';

	svg += '<text stroke="none" fill="black" x="'+center+'" y="4" style="text-anchor:middle;font-size:'+(9*point)+';font-family:'+font+';font-weight:bold;">SLOPE GUIDE</text>';
	
	svg += '<text stroke="none" fill="black" x="'+(center-2.5*1000*(contourInterval/((0.15)*scale)))+'" y="'+(4+2+(6*point))+'" style="text-anchor:end;font-size:'+(6*point)+';font-family:'+font+';">PERCENTAGE</text>';
	svg += '<text stroke="none" fill="black" x="'+(center+2.5*1000*(contourInterval/((0.15)*scale)))+'" y="'+(4+2+(6*point))+'" style="text-anchor:start;font-size:'+(6*point)+';font-family:'+font+';">DEGREE</text>';

	var d1 = 'M '+(center-2.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));
	var d2 = 'M '+(center-1.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));
	var d3 = 'M '+(center-0.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));
	var d4 = 'M '+(center+0.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));
	var d5 = 'M '+(center+1.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));
	var d6 = 'M '+(center+2.5*1000*(contourInterval/((0.15)*scale)))+','+((7+(12*point)));

	for (var i=0; i<=10; i++){
		svg += '<text stroke="none" fill="black" x="'+(center-2.5*1000*(contourInterval/((0.15-0.01*i)*scale))-1)+'" y="'+((7+(12*point))+i*5)+'" style="text-anchor:end;font-size:'+(6*point)+';font-family:'+font+';">'+(15-i)+'%</text>';
		svg += '<text stroke="none" fill="black" x="'+(center+2.5*1000*(contourInterval/((0.15-0.01*i)*scale))+1)+'" y="'+((7+(12*point))+i*5)+'" style="text-anchor:start;font-size:'+(6*point)+';font-family:'+font+';">'+(Math.atan(0.15-0.01*i)/(Math.PI/180)).toFixed(1)+'°</text>';

		svg += '<path stroke="black" fill="none" stroke-width="0.1" d="M '+(center-2.5*1000*(contourInterval/((0.15-0.01*i)*scale)))+','+((7+(12*point))+i*5)+' l '+(5*1000*(contourInterval/((0.15-0.01*i)*scale)))+',0" />';

		d1 += ' L '+(center-2.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5);
		d2 += ' L '+(center-1.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5)
		d3 += ' L '+(center-0.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5)
		d4 += ' L '+(center+0.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5)
		d5 += ' L '+(center+1.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5)
		d6 += ' L '+(center+2.5*1000*(contourInterval/((0.15-0.01*(i))*scale)))+','+((7+(12*point))+i*5)

	}
	svg += '<path stroke="black" fill="none" stroke-width="0.2" d="'+d1+'" />';
	svg += '<path stroke="black" fill="none" stroke-width="0.1" d="'+d2+'" />';
	svg += '<path stroke="black" fill="none" stroke-width="0.1" d="'+d3+'" />';
	svg += '<path stroke="black" fill="none" stroke-width="0.1" d="'+d4+'" />';
	svg += '<path stroke="black" fill="none" stroke-width="0.1" d="'+d5+'" />';
	svg += '<path stroke="black" fill="none" stroke-width="0.2" d="'+d6+'" />';

	svg += '</svg>';
	return svg;
}
