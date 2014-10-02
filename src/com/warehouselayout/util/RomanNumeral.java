package com.warehouselayout.util;

public class RomanNumeral {

	private static int[] numbers = {
		1000,	900,	500,	400,	100,	90,
		50,		40,		10,		9,		5,		4,		1};
	private static int l = numbers.length;
	private static String[] letters = { 
		"M",  "CM",  "D",  "CD", "C",  "XC",
		"L",  "XL",  "X",  "IX", "V",  "IV", "I" };

	public static String toRoman(int n) {
		String roman = "";
		int counter = 0;
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
	
	public static String toLowerCaseRoman(int n) {
		return toRoman(n).toLowerCase();
	}
	
	public static int toArabic (String roman) {
		roman = roman.toUpperCase();
		int arabic = 0;
		while (roman.length() > 0) {
			for (int i = 0; i < l ; i ++) {
				int k = letters[i].length();
				if (roman.length() < k) continue;
				String s = roman.substring(0, k);
				if (s.equals(letters[i])){
					arabic += numbers[i];
					roman = roman.substring(k, roman.length());
				}
			}
		}
		return arabic;
	}
	
	public static void main (String args[]) {
		System.out.println(toArabic("iii"));
		System.out.println(toArabic("dlix"));
	}
}