/**
 * Tucker Johnson
 * Creative Coding Spring 2022
 */

// Variables that are needed across the entire scope of this program
var starInPlace = [];   // Array to hold all Shape objects
let inPlaceNum = 40;    // Number of Shapes to be stored in starInPlace array
let stopped = false;    // Is only true when user executed command to terminate drawing

// Setup P5 Method
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(25);
    let radii = 0
    for (let i = 0; i < inPlaceNum; i++) {
        let d = 100;
        let xVal = (width / 2) + 200 * Math.cos(radii);
        let yVal = (height / 2) + 200 * Math.sin(radii);
        radii = radii + (360 / inPlaceNum) * Math.PI / 180;
        let a = 0.05;//random(0.07, 0.05);
        let e = 0.01;
        let color = [255, 0, 0, 255];
        let o = random(40, 255);
        let p = 5;
        //xVal, yVal, diameter, iangle, color, ease, opacity, starPoints
        starInPlace.push(new Shape(xVal, yVal, d, a, color, e, o, p, radii, 200));
    }
    rectMode(CENTER);
}
// Reinitializes the array by repopulating it with inPlaceNum number of stars
function resetSketch() {
    starInPlace = [];
    let radii = 0
    for (let i = 0; i < inPlaceNum; i++) {
        let d = 100;
        let xVal = (width / 2) + 200 * Math.cos(radii);
        let yVal = (height / 2) + 200 * Math.sin(radii);
        radii = radii + (360 / inPlaceNum) * Math.PI / 180;
        let a = 0.05;//random(0.07, 0.05);
        let e = 0.01;
        let color = [255, 0, 0, 255];
        let o = random(40, 255);
        let p = 5;
        //xVal, yVal, diameter, iangle, color, ease, opacity, starPoints
        starInPlace.push(new Shape(xVal, yVal, d, a, color, e, o, p, radii, 200));
    }
}
// Draw P5 method
function draw() {
    background(0, 0);
    if (keyIsDown(67)) {
        // When key (C) is pressed the sketch clears
        fill(0, 0, 0, 15);
        rect(width / 2, height / 2, innerWidth, innerHeight);
    }
    if (keyIsDown(82)) {
        // When key (R) is pressed the sketch resets
        resetSketch();
        stopped = false;
    }
    if (keyIsDown(83)) {
        // When key (S) is pressed the stars disappear
        stopFunction();
        stopped = true;
    }
    // Only draw if the stop variable is false
    if (stopped == false) {
        for (let i = 0; i < inPlaceNum; i++) {
            push();
            starInPlace[i].move();
            starInPlace[i].display();
            pop();
        }
    }

}
// function to define star objects 
class Shape {
    // Constructor to create star object
    constructor(xVal, yVal, diameter, iangle, color, ease, opacity, starPoints, radii, move) {
        this.xVal = xVal;   // change to vector
        this.yVal = yVal;
        this.d = diameter;  // Size of shape
        this.ia = iangle;   // Angle to update rotation
        this.a = this.ia;   // Angle to update rotation
        this.c = color;     // Color of stars
        this.e = ease;      // Ease of movement of rotation
        this.o = opacity;   // Opacity value
        this.p = starPoints;// How many points there are on the stars
        this.rai = radii;   // Helps determine what position star will take in circle orientation
        this.m = move;      // Helps increase the vector of each star when the circle is increasing or decreasing


        // Display Object
        this.display = function () {
            fill(this.c[0], this.c[1], this.c[2], this.o);
            ninjaStar(0, 0, this.d / 5, this.p);
        }

        // Function that handles moving and updating the rotation
        // of the stars.
        this.move = function () {
            // Based on the mouse position either increase or decrease the mouse rotation
            // speed
            if (mouseY > height / 2) {
                this.a -= mouseX * this.ia * this.e;
                this.a -= mouseY * this.ia * this.e;
            } else {
                this.a += mouseX * this.ia * this.e;
                this.a += mouseY * this.ia * this.e;
            }
            // Logic that handles moving the mouse toward or away from the center of the canvas
            if (mouseX > width / 2) {
                this.m += 1;
                this.xVal = (width / 2) + (this.m) * Math.cos(this.rai);
                this.yVal = (height / 2) + (this.m) * Math.sin(this.rai);
            } 
            else {
                this.m -= 1;
                this.xVal = (width / 2) + this.m * Math.cos(this.rai);
                this.yVal = (height / 2) + this.m * Math.sin(this.rai);
            }

            translate(this.xVal, this.yVal);
            rotate(this.a);
        }
    }
}
// Terminates all the stars by popping them all from their array
function stopFunction() {
    for (let i = 0; i < inPlaceNum; i++) {
        starInPlace.pop();
    }
}
// When the mouse is released after being pressed the color of
// the stars are changed
function mouseReleased() {
    let color = [random(0, 255), random(0, 255), random(0, 255)];
    for (let i = 0; i < inPlaceNum; i++) {
        starInPlace[i].c = color;
    }

}

// Draws a ninja like star - star but offset // method works
// best with odd number values 
function ninjaStar(centerX, centerY, radius, numPoints) {
    beginShape();
    let radii = 0;
    for (let i = 0; i < numPoints; i++) {
        let xVal = centerX + (radius * 3) * Math.cos(radii);
        let yVal = centerY + (radius * 3) * Math.sin(radii);

        vertex(xVal, yVal);
        radii = radii + (360 / numPoints) * Math.PI / 180;

        let x1 = centerX + (radius) * Math.cos(radii);
        let y1 = centerY + (radius) * Math.sin(radii);
        vertex(x1, y1);
    }
    endShape(CLOSE);
}