/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var randu = require( '@stdlib/random-base-randu' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var cdf = require( '@stdlib/stats-base-dists-beta-cdf' );
var ln = require( '@stdlib/math-base-special-ln' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var EPS = require( '@stdlib/constants-float64-eps' );
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns expected value' );
	y = logcdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns expected value' );
	y = logcdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns expected value' );
	t.end();
});

tape( 'if provided a number greater than or equal to one for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 100.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 10.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 1.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns expected value' );

	t.end();
});

tape( 'if provided a number less than or equal to zero for `x` and a finite `alpha` and `beta`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( NINF, 0.5, 1.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( -100.0, 0.5, 1.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( -1.0, 0.5, 1.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( 0.0, 0.5, 1.0 );
	t.equal( y, NINF, 'returns expected value' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'the function evaluates the logcdf', function test( t ) {
	var expected;
	var alpha;
	var beta;
	var i;
	var x;
	var y;

	for ( i = 0; i < 1000; i++ ) {
		x = ( randu()*2.0 ) + EPS;
		alpha = ( randu()*100.0 ) + EPS;
		beta = ( randu()*100.0 ) + EPS;
		y = logcdf( x, alpha, beta );
		expected = ln( cdf( x, alpha, beta ) );
		t.equal( y, expected, 'x: '+x+', alpha: '+alpha+', beta: '+beta+', y: '+y+', expected: '+expected );
	}
	t.end();
});
