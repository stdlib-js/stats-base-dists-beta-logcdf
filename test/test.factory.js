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
var ln = require( '@stdlib/math-base-special-ln' );
var randu = require( '@stdlib/random-base-randu' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var cdf = require( '@stdlib/stats-base-dists-beta-cdf' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var EPS = require( '@stdlib/constants-float64-eps' );
var factory = require( './../lib/factory.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NaN, 1.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `1` when provided a number greater than or equal to one for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.5, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 100.0 );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 10.0 );
	t.equal( y, 0.0, 'returns expected value' );

	y = logcdf( 1.0 );
	t.equal( y, 0.0, 'returns expected value' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-infinity` when provided a number smaller than or equal to zero for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.5, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( -100.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( -10.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( -1.0 );
	t.equal( y, NINF, 'returns expected value' );

	y = logcdf( 0.0 );
	t.equal( y, NINF, 'returns expected value' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 0.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( 1.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( 1.0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 0.5 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( -1.0, 0.5 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NINF, 1.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NINF, PINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	logcdf = factory( NINF, NaN );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'the created function evaluates the logcdf', function test( t ) {
	var expected;
	var logcdf;
	var alpha;
	var beta;
	var i;
	var x;
	var y;

	for ( i = 0; i < 1000; i++ ) {
		x = ( randu()*2.0 ) + EPS;
		alpha = ( randu()*100.0 ) + EPS;
		beta = ( randu()*100.0 ) + EPS;
		logcdf = factory( alpha, beta );
		y = logcdf( x );
		expected = ln( cdf( x, alpha, beta ) );
		t.equal( y, expected, 'x: '+x+', alpha: '+alpha+', beta: '+beta+', y: '+y+', expected: '+expected );
	}
	t.end();
});
