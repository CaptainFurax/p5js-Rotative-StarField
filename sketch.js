p5.disableFriendlyErrors = true;
let cvSiz;
let sf = new Array( 256 );
let rendr = false;
//
function preload() { AtariST = loadFont('rsc/AtariST8x16SystemFont.ttf'); }
//
function setup()
{
  pixelDensity(1);
  angleMode(DEGREES);
  frameRate(30);
  //
  cvSiz = createVector(1024,768);
  createCanvas(cvSiz.x, cvSiz.y).id( "myCvs" );
  //
  Star.orig = createVector( width/2, height/2 );
  Star.dmax = dist(Star.orig.x, Star.orig.y, width, height);
  //
  for ( let i = 0; i < sf.length; i++ )
    sf[i] = new Star();
  //
  windowResized();
}
//
function draw()
{
  background( 0,0,0,255);
  for ( let i = 0; i < sf.length; i++ )
  {
    sf[i].update();
    sf[i].render( rendr );
    if ( sf[i].frontiers() )
      sf[i].init();
  }
  push();
    fill("darkgoldenrod");
    textSize(width / 50 );
    textAlign(CENTER);
    textFont(AtariST);
    text("Hit the Space Bar => Swap to Subliminal 'Freedom' Color",width/2,height-20);
  pop();
}
//
function keyPressed()
{
  if ( keyIsDown(32) )
    rendr = !rendr;
}
//
function windowResized(){
  let ratio  = createVector( windowWidth / cvSiz.x, windowHeight / cvSiz.y );
  if ( windowWidth > windowHeight && ratio.x > ratio.y )
  {
    select("#myCvs").style("width", round(cvSiz.x * ratio.y) + "px");
    select("#myCvs").style("height", windowHeight + "px");
  } else
  {
    select("#myCvs").style("width", windowWidth  + "px");
    select("#myCvs").style("height", round(cvSiz.y * ratio.x) + "px");
  }
}
/*
*/
class Star
{
    static orig;
    static dmax;
    constructor() { this.init(); }
    //
    init()
    {
        this.StartAng = random( 360 );
        this.r = random(0,width/2);
        this.pos = createVector( Star.orig.x + cos( this.StartAng ) * this.r, Star.orig.y + sin( this.StartAng ) * this.r );
        this.col = [];
    }
    //
    update()
    {
        this.d = dist(this.pos.x, this.pos.y, Star.orig.x, Star.orig.y );
        this.r += this.d/24;
        //
        this.pos.x = Star.orig.x + cos( this.StartAng + frameCount ) * this.r;
        this.pos.y = Star.orig.y + sin( this.StartAng + frameCount ) * this.r;
        this.siz = map( this.d, 0, Star.dmax, 2, 6 );
    }
    //
    render( rendr )
    {
        let a = map( this.d, 0, Star.dmax, 32, 255 );
        this.col = (rendr)?(this.pos.y>Star.orig.y) ? [254,213,1,a]:[1,91,187,64 + a]:[255, 255, 255, a];
        push();
          stroke( this.col );
          strokeWeight( this.siz );
          point( this.pos );
        pop();
    }
    //
    frontiers() { return ( this.d > Star.dmax ); }
}
