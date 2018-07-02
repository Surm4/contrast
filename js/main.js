var option="rgb";
var opacity1=1;

var color1;
var color2;
var rgba1;
var rgba2;

var r1 = 74;
var g1 = 81;
var b1 = 91;

var r2 = 214;
var g2 = 214;
var b2 = 214;

var r1a = 74;
var g1a = 81;
var b1a = 91;

var l1;
var l2;

var ran;
ratio();
HorR();
toggle("ca");

function toggle(i) {
	if (option==="hexa" && i!=="ca") {
		$(".cb").css("filter", "none").css("opacity", 1);
		$(".ca").css("filter", "blur(.1rem)").css("opacity", 0.3);
		$(".range").css("filter", "none").css("opacity", 1).css("pointer-events", "auto");
		$(".put").attr("placeholder", "e.g. rgb(255, 255, 255)");
		$(".put").attr("maxlength", 18);
		$(".put").val("");
		$(".o").css("filter", "none").css("opacity", 1);
		option="rgb";
		$(".range").val(1);
		opacity1=1;
		HorR();
}
	else if (option==="rgb" && i!=="cb") {
		$(".ca").css("filter", "none").css("opacity", 1);
		$(".cb").css("filter", "blur(.1rem)").css("opacity", 0.3);
		$(".range").css("filter", "blur(.1rem)").css("opacity", 0.3).css("pointer-events", "none");
		$(".put").attr("placeholder", "e.g. #FFFFFF");
		$(".put").attr("maxlength", 7);
		$(".put").val("");
		$(".o").css("filter", "blur(.1rem)").css("opacity", 0.3);
		option="hexa";
		$(".range").val(1);
		opacity1=1;
		HorR();
	}
}



$(".put").keyup(function(){
	if (option==="hexa") {
		if (this.id==="c1") {
			color1 = this.value;
			color1 = color1.replace(/\s/g,'');
			$(this).val(color1);
			if (color1.length===7) {
				if (color1.includes("#")===true){
					$(".text").css("color", color1);
					$(this).css("background-color", "white");
					HtoR(color1, 1, "hexa");
				}
				else {
					color1 = color1.substr(1,color1.length);
					color1 = "#"+color1;
					$(this).val(color1);
					$(".text").css("color", color1);
					$(this).css("background-color", "white");
					HtoR(color1, 1, "hexa");
				}
			}
			else if (color1.length===0 || color1.length===null) {
				$(this).css("background-color", "white");
			}
			else {
			$(this).css("background-color", "#ff495a");
			}
		}
		else if (this.id==="c2") {
			color2 = this.value;
			color2 = color2.replace(/\s/g,'');
			$(this).val(color2);
			if (color2.length===7) {
				if (color2.includes("#")===true){
					$(".right").css("background-color", color2);
					$(this).css("background-color", "white");
					HtoR(color2, 2, "hexa");
				}
				else {
					color2 = color2.substr(1,color2.length);
					color2 = "#"+color2;
					$(this).val(color2);
					$(".right").css("background-color", color2);
					$(this).css("background-color", "white");
					HtoR(color2, 2, "hexa");
				}
			}
			else if (color2.length===0 || color2.length===null) {
				$(this).css("background-color", "white");
			}
			else {
			$(this).css("background-color", "#ff495a");
			}
		}
	}
	else if (option==="rgb") {
		var pattern = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
		if (this.id==="c1" && pattern.test(this.value)===true) {
			$(this).css("background-color", "white");
			rgba1=this.value;
			rgba1=rgba1.replace(/\s/g,'');
			rgba1=rgba1.substr(4,rgba1.length);
			rgba1=rgba1.substr(0, rgba1.length-1);
			rgba1=rgba1.split(",");
			r1a=rgba1[0];
			g1a=rgba1[1];
			b1a=rgba1[2];
			$(".text").css("color", "rgba("+r1a+","+g1a+","+b1a+","+opacity1+")");
			HtoR("none", 1, "rgb");
		}
		else if (this.id==="c2" && pattern.test(this.value)===true) {
			$(this).css("background-color", "white");
			rgba2=this.value;
			rgba2=rgba2.replace(/\s/g,'');
			rgba2=rgba2.substr(4,rgba2.length);
			rgba2=rgba2.substr(0, rgba2.length-1);
			rgba2=rgba2.split(",");
			r2=rgba2[0];
			g2=rgba2[1];
			b2=rgba2[2];
			$(".right").css("background-color", "rgb("+r2+","+g2+","+b2+")");
			HtoR("none", 2, "rgb");
		}
		else {
			$(this).css("background-color", "#ff495a");
		}
	}
});


$(".range").on( "input", function(){
	let id = this.id;
		if (id==="o1") {
			let val = this.value;
			val = Number(val);
			opacity1 = val;
			console.log(opacity1)
			$(".text").css("color", "rgba("+r1a+","+g1a+","+b1a+","+opacity1+")");
			HtoR("none", 1, "rgb");
	}
});

function HorR() {
if (option==="hexa") {
	$(".range").off("click");
	$( ".range" ).click(function( event ) {
	this.value=1;
	opacity1=1;
	});
}
else if (option==="rgb") {
	$(".range").off("click");
	$( ".range" ).click(function( event ) {
		if (this.id==="o1") {
				opacity1=this.value;
				$("#"+this.id).val(opacity1);
		}
	});
}
}

function HtoR(c, o, opt) {
	if (opt==="hexa") {
		if (o===1) {
			if (c.charAt(0)==="#") {
				let doMath = c.substring(1,7);
				r1 = parseInt(doMath.substring(0,2),16);
				g1 = parseInt(doMath.substring(2,4),16);
				b1 = parseInt(doMath.substring(4,6),16);
				ratio();
			}
		}
		else if (o===2) {
			if (c.charAt(0)==="#") {
				let doMath = c.substring(1,7);
				r2 = parseInt(doMath.substring(0,2),16);
				g2 = parseInt(doMath.substring(2,4),16);
				b2 = parseInt(doMath.substring(4,6),16);
				ratio();
			}
		}
	}
	else if (opt==="rgb") {
		if (o===1) {
			r1 = opacity1*r1a+(1-opacity1)*r2; 
			g1 = opacity1*g1a+(1-opacity1)*g2; 
			b1 = opacity1*b1a+(1-opacity1)*b2; 
			ratio();
		}
		else if (o===2) {
			r1 = opacity1*r1a+(1-opacity1)*r2; 
			g1 = opacity1*g1a+(1-opacity1)*g2; 
			b1 = opacity1*b1a+(1-opacity1)*b2; 
			ratio();
		}
	}
}


function ratio() {
var rc1 = r1/255;
var gc1 =g1/255;
var bc1 = b1/255;
			if (rc1 <= 0.03928) {
			rc1 = rc1/12.92;
			}
			else {
			rc1 = Math.pow(((rc1 +0.055)/1.055), 2.4);
			}

			if (gc1 <= 0.03928) {
			gc1 = gc1/12.92;
			}
			else {
			gc1 = Math.pow(((gc1 +0.055)/1.055), 2.4);
			}

			if (bc1 <= 0.03928) {
			bc1 = bc1/12.92;
			}
			else {
			bc1 = Math.pow(((bc1 +0.055)/1.055), 2.4);
			}
			l1 = 0.2126 * rc1 + 0.7152 * gc1 + 0.0722 * bc1;
			
			/////////////////////

			var rc2 = r2/255;
			var gc2 =g2/255;
			var bc2 = b2/255;
			if (rc2 <= 0.03928) {
			rc2 = rc2/12.92;
			}
			else {
			rc2 = Math.pow(((rc2 +0.055)/1.055), 2.4);
			}

			if (gc2 <= 0.03928) {
			gc2 = gc2/12.92;
			}
			else {
			gc2 = Math.pow(((gc2 +0.055)/1.055), 2.4);
			}

			if (bc2 <= 0.03928) {
			bc2 = bc2/12.92;
			}
			else {
			bc2 = Math.pow(((bc2 +0.055)/1.055), 2.4);
			}
			l2 = 0.2126 * rc2 + 0.7152 * gc2 + 0.0722 * bc2;
			
			
			var contrast;
			if (l1<l2) {
			contrast = (l2 + 0.05) / (l1 + 0.05);
			}
			else if (l1>l2) {
			contrast = (l1 + 0.05) / (l2 + 0.05);
			}
			else {
			contrast = (l1 + 0.05) / (l2 + 0.05);
			}
	
	if (isNaN(contrast)===true) {
	$(".lText").text("Contrast Ratio: Error");
	} 
	else {
	contrast = contrast.toFixed(2);
	if (contrast>=3 && contrast<4.5) {
		$(".lText").html("Contrast Ratio: <span style='color: #8a8a8a;'>"+ contrast +" ... it's okay.</span>");
	}
	else if  (contrast>=4.5 && contrast<7) {
		$(".lText").html("Contrast Ratio: <span style='color: #118259;'>"+ contrast +" - good.</span>");
	}
	else if  (contrast>7) {
		$(".lText").html("Contrast Ratio: <span style='color: #2876d8;'>"+ contrast +" - excellent.</span>");
	}
	else {
		$(".lText").html("Contrast Ratio: <span style='color: #c63d3d;'>"+ contrast +" ... nahh, bad contrast.</span>");
	}
	}
}
