//
//	Match-Game - Juan Camilo G.
//

function cambiarColor(selector) {
	$(selector).animate({
			opacity: '0.5',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'orange');
			},
			queue: true
		}, 600)
		.delay(900)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '0.9'
		}, {
			step: function () {
				$(this).css('color', 'orange');
				cambiarColor('h1.main-titulo');
			},
			queue: true
		});
}

function dulcesAleatorios(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function cuadriculaDulces(arrayType, index) {
	var colDulces1 = $('.col-1').children();
	var colDulces2 = $('.col-2').children();
	var colDulces3 = $('.col-3').children();
	var colDulces4 = $('.col-4').children();
	var colDulces5 = $('.col-5').children();
	var colDulces6 = $('.col-6').children();
	var colDulces7 = $('.col-7').children();
	var columnasDulces = $([colDulces1, colDulces2, colDulces3, colDulces4,
		colDulces5, colDulces6, colDulces7
	]);
	if (typeof index === 'number') {
		var filaDulces = $([colDulces1.eq(index), colDulces2.eq(index), colDulces3.eq(index),
			colDulces4.eq(index), colDulces5.eq(index), colDulces6.eq(index),
			colDulces7.eq(index)
		]);
	} else {
		index = '';
	}
	if (arrayType === 'columns') {
		return columnasDulces;
	} else if (arrayType === 'rows' && index !== '') {
		return filaDulces;
	}
}

function candyRows(index) {
	var filaDulces = cuadriculaDulces('rows', index);
	return filaDulces;
}

function columnasDulces(index) {
	var columnaDulceIni = cuadriculaDulces('columns');
	return columnaDulceIni[index];
}

function validacionColumna() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var posicionDulce = [];
		var posicionDulce2 = [];
		var columnaDulceIni = columnasDulces(j);
		var comparacionV = columnaDulceIni.eq(0);
		var gap = false;
		for (var i = 1; i < columnaDulceIni.length; i++) {
			var ubiComp = comparacionV.attr('src');
			var ubiDulce = columnaDulceIni.eq(i).attr('src');

			if (ubiComp != ubiDulce) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						posicionDulce2.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					posicionDulce2.push(i);
				}
				counter += 1;
			}
			comparacionV = columnaDulceIni.eq(i);
		}
		if (posicionDulce2.length > 2) {
			posicionDulce = $.merge(posicionDulce, posicionDulce2);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		contadorDulc = posicionDulce.length;
		if (contadorDulc >= 3) {
			borrarColDul(posicionDulce, columnaDulceIni);
			iniciarPuntuacion(contadorDulc);
		}
	}
}
function borrarColDul(posicionDulce, columnaDulceIni) {
	for (var i = 0; i < posicionDulce.length; i++) {
		columnaDulceIni.eq(posicionDulce[i]).addClass('delete');
	}
}

function validacionFila() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var posicionDulce = [];
		var posicionDulce2 = [];
		var filaDulces = candyRows(j);
		var comparacionV = filaDulces[0];
		var gap = false;
		for (var i = 1; i < filaDulces.length; i++) {
			var ubiComp = comparacionV.attr('src');
			var ubiDulce = filaDulces[i].attr('src');

			if (ubiComp != ubiDulce) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						posicionDulce2.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					posicionDulce2.push(i);
				}
				counter += 1;
			}
			comparacionV = filaDulces[i];
		}
		if (posicionDulce2.length > 2) {
			posicionDulce = $.merge(posicionDulce, posicionDulce2);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		contadorDulc = posicionDulce.length;
		if (contadorDulc >= 3) {
			borrarFilDul(posicionDulce, filaDulces);
			iniciarPuntuacion(contadorDulc);
		}
	}
}
function borrarFilDul(posicionDulce, filaDulces) {
	for (var i = 0; i < posicionDulce.length; i++) {
		filaDulces[posicionDulce[i]].addClass('delete');
	}
}

function iniciarPuntuacion(contadorDulc) {
	var puntos = Number($('#score-text').text());
	switch (contadorDulc) {
		case 3:
			puntos += 25;
			break;
		case 4:
			puntos += 50;
			break;
		case 5:
			puntos += 75;
			break;
		case 6:
			puntos += 100;
			break;
		case 7:
			puntos += 200;
	}
	$('#score-text').text(puntos);
}

function tableroPuntos() {
	puntosTablero();
}

function puntosTablero() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulces = $(this).children().length;
		var agrega = top - dulces;
		for (var i = 0; i < agrega; i++) {
			var tipoDulces = dulcesAleatorios(1, 5);
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + tipoDulces + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + tipoDulces + '.png" class="element"></img>');
			}
		}
	});
	addDulces();
	validacionIni();
}

function validacionIni() {
	validacionColumna();
	validacionFila();
	if ($('img.delete').length !== 0) {
		cancelarAnimacion();
	}
}

function addDulces() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function desabDulces() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainCandyMovement(event, moverDulce) {
	moverDulce.position.top = Math.min(100, moverDulce.position.top);
	moverDulce.position.bottom = Math.min(100, moverDulce.position.bottom);
	moverDulce.position.left = Math.min(100, moverDulce.position.left);
	moverDulce.position.right = Math.min(100, moverDulce.position.right);
}

function swapCandy(event, moverDulce) {
	var moverDulce = $(moverDulce.draggable);
	var dragSrc = moverDulce.attr('src');
	var soltarDulce = $(this);
	var dropSrc = soltarDulce.attr('src');
	moverDulce.attr('src', dropSrc);
	soltarDulce.attr('src', dragSrc);

	setTimeout(function () {
		tableroPuntos();
		if ($('img.delete').length === 0) {
			moverDulce.attr('src', dragSrc);
			soltarDulce.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function comprobarTab(resultado) {
	if (resultado) {
		tableroPuntos();
	}
}

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var resultado = actualValue += 1;
	$('#movimientos-text').text(resultado);
}

function cancelarAnimacion() {
	desabDulces();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 300,
			complete: function () {
				borrDulces()
					.then(comprobarTab)
					.catch(mostrarError);
			},
			queue: true
		});
}

function mostrarError(error) {
	console.log(error);
}

function borrDulces() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

function finJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('!!!!!Game Over!!!!!!');
	$('div.puntos, div.moves, div.panel-puntos').width('100%');
	
}

function iniJuego() {

	cambiarColor('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		tableroPuntos();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finJuego
		})
	});
}

$(function() {
	iniJuego();
});

