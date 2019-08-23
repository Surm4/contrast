const $score = document.querySelector(".lText");
const $range = document.querySelector(".range");
const $text = document.querySelector(".text");
const $cb = document.querySelector(".cb");
const $ca =  document.querySelector(".ca");
const $put = document.querySelector(".put");
const $o = document.querySelector(".o");
const $right = document.querySelector(".right");
const $puts = document.querySelectorAll(".put");

let option = "rgb";
let opacity1 = 1;

let color1;
let color2;
let rgba1;
let rgba2;

let r1 = 74;
let g1 = 81;
let b1 = 91;

let r2 = 214;
let g2 = 214;
let b2 = 214;

let r1a = 74;
let g1a = 81;
let b1a = 91;

const toggle = (i) => {
	if (option === "hexa" && i !== "ca") {
		$cb.style.cssText = `filter: none; opacity: 1`;
		$ca.style.cssText = `filter: blur(.1rem); opacity: 0.3`;
		$range.style.cssText = `filter: none; opacity: 1; pointer-events: auto`;
		$puts.forEach(el => el.setAttribute("placeholder", "e.g. rgb(255, 255, 255)"));
		$puts.forEach(el => el.setAttribute("maxlength", 18));
		$o.style.cssText = `filter: none; opacity: 1`;
		option = "rgb";
	}
	else if (option === "rgb" && i !== "cb") {
		$ca.style.cssText = `filter: none; opacity: 1`;
		$cb.style.cssText = `filter: blur(.1rem); opacity: 0.3`;
		$range.style.cssText = `filter: blur(.1rem); opacity: 0.3; pointer-events: none`;
		$puts.forEach(el => el.setAttribute("placeholder", "e.g. #FFFFFF"));
		$puts.forEach(el => el.setAttribute("maxlength", 7));
		$o.style.cssText = `filter: blur(.1rem); opacity: 0.3`;
		option = "hexa";
	}
	$put.value = "";
	$range.value = 1;
	opacity1 = 1;
	HorR();
};

const HtoR = (c, o, opt) => {
	if (opt === "hexa") {
		let doMath = c.substring(1, 7);
		if (o === 1) {
			if (c.charAt(0) === "#") {
				r1 = parseInt(doMath.substring(0, 2), 16);
				g1 = parseInt(doMath.substring(2, 4), 16);
				b1 = parseInt(doMath.substring(4, 6), 16);
			}
		}
		else if (o === 2) {
			if (c.charAt(0) === "#") {
				r2 = parseInt(doMath.substring(0, 2), 16);
				g2 = parseInt(doMath.substring(2, 4), 16);
				b2 = parseInt(doMath.substring(4, 6), 16);
			}
		}
	}
	else if (opt === "rgb") {
		if (o === 1) {
			r1 = opacity1 * r1a + (1 - opacity1) * r2;
			g1 = opacity1 * g1a + (1 - opacity1) * g2;
			b1 = opacity1 * b1a + (1 - opacity1) * b2;
		}
		else if (o === 2) {
			r1 = opacity1 * r1a + (1 - opacity1) * r2;
			g1 = opacity1 * g1a + (1 - opacity1) * g2;
			b1 = opacity1 * b1a + (1 - opacity1) * b2;
		}
	}
	ratio();
}

const HorR = () => {
	if (option === "hexa") {
		setOpacityFull();
		setTextColor();
	}
	else if (option === "rgb") {
		setTextColor();
	}
};

const setOpacityFull = () => {
	$range.value = 1;
	opacity1 = 1;
};

const setTextColor = (color) => {
		opacity1 = parseFloat($range.value);
		HtoR("none", 1, "rgb");
		$text.style.cssText = `color: rgba(${r1a}, ${g1a}, ${b1a}, ${opacity1})`;
		
};

const removeListeners = () => {
	$range.removeEventListener("click", setOpacityFull);
};

const setScoreMsg = (htmlString) => {
	$score.innerHTML = htmlString;
};

const defineScoreMsg = contrast => {
	if (isNaN(contrast) === true) {
		setScoreMsg("Contrast Ratio: Error");
	}
	else {
		contrast = contrast.toFixed(2);
		if (contrast >= 3 && contrast < 4.5) {
			setScoreMsg(`Contrast Ratio: <span style='color: #8a8a8a;'> ${contrast}  ... it's okay.</span>`);
		}
		else if (contrast >= 4.5 && contrast < 7) {
			setScoreMsg(`Contrast Ratio: <span style='color: #8a8a8a;'> ${contrast}  - good.</span>`);
		}
		else if (contrast > 7) {
			setScoreMsg(`Contrast Ratio: <span style='color: #8a8a8a;'> ${contrast}  - excellent.</span>`);
		}
		else {
			setScoreMsg(`Contrast Ratio: <span style='color: #8a8a8a;'> ${contrast}  ... nahh, bad contrast.</span>`);
		}
	}
};

const ratio = () => {
	let contrast, l1, l2;
	let rc1 = r1 / 255;
	let gc1 = g1 / 255;
	let bc1 = b1 / 255;

	rc1 = rc1 <= 0.03928 ? rc1 / 12.92 : rc1 = Math.pow(((rc1 + 0.055) / 1.055), 2.4);
	gc1 = gc1 <= 0.03928 ? gc1 = gc1 / 12.92 : gc1 = Math.pow(((gc1 + 0.055) / 1.055), 2.4);
	bc1 = bc1 <= 0.03928 ? bc1 = bc1 / 12.92 : bc1 = Math.pow(((bc1 + 0.055) / 1.055), 2.4);

	l1 = 0.2126 * rc1 + 0.7152 * gc1 + 0.0722 * bc1;

	let rc2 = r2 / 255;
	let gc2 = g2 / 255;
	let bc2 = b2 / 255;

	rc2 = rc2 <= 0.03928 ? rc2 = rc2 / 12.92 : rc2 = Math.pow(((rc2 + 0.055) / 1.055), 2.4);
	gc2 = gc2 <= 0.03928 ? gc2 = gc2 / 12.92 : gc2 = Math.pow(((gc2 + 0.055) / 1.055), 2.4);
	bc2 = bc2 <= 0.03928 ? bc2 = bc2 / 12.92 : bc2 = Math.pow(((bc2 + 0.055) / 1.055), 2.4);

	l2 = 0.2126 * rc2 + 0.7152 * gc2 + 0.0722 * bc2;

	if (l1 < l2) {
		contrast = (l2 + 0.05) / (l1 + 0.05);
	}
	else if (l1 > l2) {
		contrast = (l1 + 0.05) / (l2 + 0.05);
	}
	else {
		contrast = (l1 + 0.05) / (l2 + 0.05);
	}

	defineScoreMsg(contrast);
};

const colorHandling = (self) => {
	self = self.replace(/\s/g, '').substr(4, self.length);
	return self.substr(0, self.length - 1).split(",");
};

const keyupHandle = (event) => {
	const self = event.target;
	if (option === "hexa") {
		if (self.id === "c1") {
			color1 = self.value;
			color1 = color1.replace(/\s/g, '');
			self.value = color1;
			if (color1.length === 7) {
				if (!color1.includes("#") === true) {
					color1 = color1.substr(1, color1.length);
					color1 = "#" + color1;
					self.value = color1;
				}
				$text.style.cssText = `color: ${color1}`;
				self.style.cssText = "background-color: white";
				HtoR(color1, 1, "hexa");
			}
			else if (color1.length === 0 || color1.length === null) {
				self.style.cssText = "background-color: white";
			}
			else {
				self.style.cssText = "background-color: #ff495a";
			}
		}
		else if (self.id === "c2") {
			color2 = self.value;
			color2 = color2.replace(/\s/g, '');
			self.value = color2;
			if (color2.length === 7) {
				if (!color2.includes("#") === true) {
					color2 = color2.substr(1, color2.length);
					color2 = "#" + color2;
					self.value = color2;
				}
				$right.style.cssText = `background-color: ${color2}`;
				self.style.cssText = "background-color: white";
				HtoR(color2, 2, "hexa");
			}
			else if (color2.length === 0 || color2.length === null) {
				self.style.cssText = "background-color: white";
			}
			else {
				self.style.cssText = "background-color: #ff495a";
			}
		}
	}
	else if (option === "rgb") {
		let pattern = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
		if (self.id === "c1" && pattern.test(self.value) === true) {
			self.style.cssText = "background-color: white";
			rgba1 = colorHandling(self.value);
			[r1a, g1a, b1a] = [rgba1[0], rgba1[1], rgba1[2]];
			$text.style.cssText = `color rgba(${r1a}, ${g1a}, ${b1a}, ${opacity1})`;
			HtoR("none", 1, "rgb");
		}
		else if (self.id === "c2" && pattern.test(self.value) === true) {
			self.style.cssText = "background-color: white";
			rgba2 = colorHandling(self.value);
			[r2, g2, b2] = [rgba2[0], rgba2[1], rgba2[2]];
			$right.style.cssText = `background-color: rgb(${r2}, ${g2}, ${b2})`;
			HtoR("none", 2, "rgb");
		}
		else {
			self.style.cssText = "background-color: #ff495a";
		}
	}
};

ratio();
HorR();
toggle("ca");

$range.addEventListener("input", setTextColor);
$puts.forEach(el => el.addEventListener("keyup", keyupHandle.bind(event)));

