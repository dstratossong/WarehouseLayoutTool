var numbers = [
	1000,	900,	500,	400,	100,	90,
	50,		40,		10,		9,		5,		4,		1];

var l = numbers.length;

var letters = [ 
	"M",  "CM",  "D",  "CD", "C",  "XC",
	"L",  "XL",  "X",  "IX", "V",  "IV", "I" ];

function toRoman(n) {
	var roman = "";
	var counter = 0;
	while (!(n == 0 || counter > l)) {
		if (n >= numbers[counter]) {
			n -= numbers[counter];
			roman += letters[counter];
		}
		else {
			counter ++;
		}
	}
	
	return roman;
}

function toLowerCaseRoman(n) {
	return toRoman(n).toLowerCase();
}

function toArabic (roman) {
	roman = roman.toUpperCase();
	var arabic = 0;
	while (roman.length() > 0) {
		for (var i = 0; i < l ; i ++) {
			var k = letters[i].length();
			if (roman.length() < k) continue;
			var s = roman.substring(0, k);
			if (s.equals(letters[i])){
				arabic += numbers[i];
				roman = roman.substring(k, roman.length());
			}
		}
	}
	return arabic;
}