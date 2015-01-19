function Start ()
{
	window.open ("chrome://binggrabb/content/Main.xul", "bmarks", "centerscreen,chrome,width=500,height=650");
}

var Bing =
{
    github_url: "https://github.com/CCrashBandicot",
	home_url: "http://exploit4arab.net/",
	about_text: "Bing DOrker v2.0\n By CrashBandicot\npastebin.com/u/CrashBandicot",

	Home: function ()
	{
		window.open (this.home_url);
	},
	Redirect: function ()
	{
		window.open (this.github_url);
	},
	
	About: function ()
	{
		alert (this.about_text);
	},

	GET: function (url, cookie = false, user_agent = false)
	{
		var xmlHttp = false;
		if (!user_agent)
			user_agent = content.window.navigator.userAgent;

		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest ();
		else
			xmlHttp = new ActiveXObject ("Microsoft.XMLHTTP");

		xmlHttp.open ("GET", url, false);
		xmlHttp.setRequestHeader ('User-Agent', user_agent);

		if (cookie)
			xmlHttp.setRequestHeader ('Cookie', cookie)

		xmlHttp.send ();

		return xmlHttp.responseText;
	},

	Grab: function ()
	{
		var dork   = document.getElementById ("user_dork").value, xmlHttp = false,
		cookie = "MUID=1A3E9F0A1C95686D36FF998A18956B6C; ANON=A=97AEAEA6ACE959C6736AEDC2FFFFFFFF&E=fdd&W=2; NAP=V=1.9&E=f83&C=P0SkaSI7RJ_K4BonRmQrYilv5ZzD5FpQ4_UoAzh6P66xHQcEHvHo9A&W=2; _EDGE_V=1; MUIDB=1A3E9F0A1C95686D36FF998A18956B6C; SRCHD=SM=1&D=3450822&MS=3450822&AF=NOFORM; SRCHUID=V=2&GUID=A4AF59E326E94F90A2D72D9E3BDD6BFB; SRCHUSR=AUTOREDIR=0&GEOVAR=&DOB=20140724; SRCHHPGUSR=CW=1349&CH=634&NEWWND=1&NRSLT=50&SRCHLANG=&ADLT=STRICT; _U=1Q4LfZxrNPnayJULjaTLuHR0j4JIaP9-pm4aDVNG6iK5noHEfNMbzAGC_FE7Ago-zqBvDBYuhSvm29GlgesroDRmIF3FIuImOpDg_CwZeJwxA0Y2S59bGt-yPYmHP2vY5; s_vnum=1409598331287%26vn%3D1; s_nr=1407006801318; MSFPC=ID=e3b82bc8c4f21f448b48067a9b458297&CS=3&LV=201408&V=1; _FP=ui=ar-SA; _EDGE_CD=u=ar-SA; _SS=SID=0EA9E67E527841AC8F05DFC3FD10CFFB&bIm=581214&nhIm=09-; WLS=TS=63544386535; _HOP=; SRCHS=PC=MOZI; SCRHDN=ASD=0&DURL=#",
		regex1  = /<h2 class="sb_h3 cttl"><a href="(.*?)"/ig, i = 1, data = "",
		matches = [], match = "", regex2 = /class="sb_pagN"/i, count = 0;

		while (1)
		{
			data = this.GET ("http://www.bing.com/search?q=" + dork + "&first=" + i, cookie, "SamsungI8910/SymbianOS/9.1 Series60/3.0");

			while (match = regex1.exec (data))
			{
				var url = match[1];
				var parse = new URL (url);

				url = parse.protocol + "//" + parse.host + "/";

				if (matches.indexOf (url) == -1)
				{
					count++;
					matches.push (url);
				}
			}

			if (!regex2.exec (data))
				break;

			i += 50;
		}

		document.getElementById ("result_box").value = matches.join ("\n");
		document.getElementById ("count_urls").value = "Found " + count + " Domains";
	}
};
