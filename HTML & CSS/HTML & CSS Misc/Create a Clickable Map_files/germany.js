	function _labelPos(path, d) {
		var r = path.centroid(d);
		r[0] -= 9; 
			switch(d.properties.abbr) {
					case 'Thüringen': 
						r[0] -= 15; r[1] += 5;
					break;
					case 'Hessen': 
						r[0] -= 5; r[1] += 0;
					break;
					case 'Bayern': 
						r[0] += 0; r[1] += 0;
					break;
					case 'Nordrhein-Westfalen': 
						r[0] -= 45; r[1] += 0;
					break;
					case 'Baden-Württemberg': 
						r[0] -= 45; r[1] -= 5;
					break;
					case 'Schleswig-Holstein': 
						r[0] -= 150; r[1] += 5;
					break;
					case 'Mecklenburg-Vorpommern': 
						r[0] -= 65; r[1] += 5;
					break;
					case 'Bremen': 
					case 'Saarland': 
						r[0] -= 120; r[1] += 5;
					break;
					case 'Rheinland-Pfalz': 
						r[0] -= 38; r[1] += 8;
					break;
					case 'Niedersachsen': 
						r[0] -= 35; r[1] += 5;
					break;
					case 'Sachsen-Anhalt': 
						r[0] -= 32; r[1] += 13;
					break;
					case 'Berlin': 
						r[0] += 80; r[1] += 5;
					break;
 
					case 'Sachsen': 
						r[0] -= 15; r[1] -= 0;
					break;
					case 'Brandenburg': 
						r[0] -= 40; r[1] -= 25;
					break; 
					case 'Hamburg': 
						r[0] -= 125; r[1] -= 13;
					break;
 
				default: console.log(d.properties.abbr);
			}
 
		return r;
	}

	function _labelIsExt(path, d) {

		var r = _labelPos(path, d);
		r[0] += 9;
			switch(d.properties.abbr) { 
					case 'Saarland': 
					case 'Bremen': 
						r[0] += 40; r[1] -= 5;
					break;
					case 'Hamburg': 
						r[0] += 46; r[1] -= 5;
					break;
					case 'Berlin': 
						r[0] -= 10; r[1] -= 5;
					break;
					case 'Schleswig-Holstein': 
						r[0] += 100; r[1] -= 5;
					break;
				default:
					return;
			}
		 
		return r; 
	}
