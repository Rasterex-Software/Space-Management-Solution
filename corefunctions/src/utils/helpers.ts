// TODO:JS->TS:CHECK review the methods/objects exported and decide if they should be organised some other way, in other files

import * as THREE from 'three';

import {
    Globals,
    Users,
    RxCore_GUI_Users,
    set_tool,
    MarkupSaveState
} from '../internal';

export function decimalToHex(d:string|number) {
    let hex = Number(d).toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    hex = hex.toUpperCase();
    hex = "#" + hex;
    return hex;
}


export function get_polygon_centroid(ptsorg: { slice: () => any[]; }) {

    let pts = [];
    pts = ptsorg.slice();

    let first = pts[0], last = pts[pts.length - 1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    let twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;
    for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x * p2.y - p2.x * p1.y;
        twicearea += f;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;
    return { x: x / f, y: y / f };
}

export function areIntersecting(v1x1: any, v1y1: any, v1x2: any, v1y2: any, v2x1: number, v2y1: number, v2x2: number, v2y2: number) {
    const a1 = v1y2 - v1y1;
    const b1 = v1x1 - v1x2;
    const c1 = (v1x2 * v1y1) - (v1x1 * v1y2);

    let d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
    let d2 = (a1 * v2x2) + (b1 * v2y2) + c1;

    if (d1 > 0 && d2 > 0) {
        return 0;
    }
    if (d1 < 0 && d2 < 0) {
        return 0;
    }
    const a2 = v2y2 - v2y1;
    const b2 = v2x1 - v2x2;
    const c2 = (v2x2 * v2y1) - (v2x1 * v2y2);

    d1 = (a2 * v1x1) + (b2 * v1y1) + c2;
    d2 = (a2 * v1x2) + (b2 * v1y2) + c2;

    if (d1 > 0 && d2 > 0) {
        return 0;
    }
    if (d1 < 0 && d2 < 0) {
        return 0;
    }

    if ((a1 * b2) - (a2 * b1) == 0.0) {
        return 2;
    }

    return 1;

}

export function isEven(value: number) {
    return (value % 2 == 0);
    //    return true;
    //else
    //    return false;
}

export function insidepolygonpoints(scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, path: { points: number[]; gotsubpath: any; subpaths: { points: number[]; }[]; }, mouse: { x: any; y: any; }, startpoint: { x: any; y: any; }) {
    let intersections = 0;
    let rayx1 = startpoint.x;
    let rayy1 = startpoint.y;
    let rayx2 = mouse.x;
    let rayy2 = mouse.y;

    let sidex1 = 0;
    let sidey1 = 0;
    let sidex2 = 0;
    let sidey2 = 0;
    //var sides = 0;


    for (let counter = 0; counter < path.points.length; counter += 2) {

        sidex1 = ((path.points[counter] - mediax) * scalefactor);
        sidey1 = ((mediah - path.points[counter + 1]) * scalefactor);
        //close polygon if not closed
        if (counter + 3 < path.points.length) {
            sidex2 = ((path.points[counter + 2] - mediax) * scalefactor);
            sidey2 = ((mediah - path.points[counter + 3]) * scalefactor);
        } else {
            sidex2 = ((path.points[0] - mediax) * scalefactor);
            sidey2 = ((mediah - path.points[1]) * scalefactor);

        }

        sidex1 += offsetx;
        sidey1 += offsety;
        sidex2 += offsetx;
        sidey2 += offsety;

        intersections += areIntersecting(rayx1, rayy1, rayx2, rayy2, sidex1, sidey1, sidex2, sidey2);
        //sides ++;

    }
    /*console.log(intersections);
    console.log('sides:' + sides);
    console.log(path.points.length);
    cntximg.strokeStyle = "black";
    cntximg.lineWidth = 2;
    cntximg.beginPath();
    cntximg.moveTo(rayx1,rayy1);
    cntximg.lineTo(rayx2,rayy2);
    cntximg.stroke();*/

    if (path.gotsubpath) {
        for (let scount = 0; scount < path.subpaths.length; scount++) {
            for (let counter = 0; counter < path.subpaths[scount].points.length; counter += 2) {

                sidex1 = ((path.subpaths[scount].points[counter] - mediax) * scalefactor);
                sidey1 = ((mediah - path.subpaths[scount].points[counter + 1]) * scalefactor);
                //close polygon if not closed
                if (counter + 3 < path.subpaths[scount].points.length) {
                    sidex2 = ((path.subpaths[scount].points[counter + 2] - mediax) * scalefactor);
                    sidey2 = ((mediah - path.subpaths[scount].points[counter + 3]) * scalefactor);
                } else {
                    sidex2 = ((path.subpaths[scount].points[0] - mediax) * scalefactor);
                    sidey2 = ((mediah - path.subpaths[scount].points[1]) * scalefactor);

                }

                sidex1 += offsetx;
                sidey1 += offsety;
                sidex2 += offsetx;
                sidey2 += offsety;

                intersections += areIntersecting(rayx1, rayy1, rayx2, rayy2, sidex1, sidey1, sidex2, sidey2);

            }

        }
    }
    //console.log(intersections);
    /*if (!isEven(intersections)){
        cntximg.strokeStyle = "black";
        cntximg.lineWidth = 2;
        cntximg.beginPath();
        cntximg.moveTo(rayx1,rayy1);
        cntximg.lineTo(rayx2,rayy2);
        cntximg.stroke();
        cntximg.strokeStyle = "yellow";
        cntximg.lineWidth = 4;


    }*/

    return !isEven(intersections);

}

export function getUnitlength(value:number) {
    let dimValue = 0;
    let dpi = Globals.DocObj.pages[Globals.DocObj.currentpage].DPI;
    let DPmm = dpi / 25.4;
    let DPInch = dpi;

    //var mscale = MeasureScale;

    let mscale = Globals.DocObj.pages[Globals.DocObj.currentpage].getMeasureScale();
    if (mscale ==  undefined){
        mscale = Globals.MeasureScale;
    }

    //var scalefactor = DocObj.pages[DocObj.currentpage].dscale / this.scaling;

    //dimValue = ((value  / DocObj.pages[DocObj.currentpage].MainImageScaling) / DocObj.pages[DocObj.currentpage].dscale)*MeasureScale;// * scalefactor;
    //value without the scale factor to estblish value independent from zoom factor.
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs) {
        dpi = 72;
        DPmm = dpi / 25.4;
        DPInch = dpi;
    }

    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml || Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs || Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        dimValue = ((value / Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale)) * mscale; // * scalefactor;
    } else {
        dimValue = ((value / Globals.DocObj.pages[Globals.DocObj.currentpage].MainImageScaling)) * mscale; // * scalefactor;
    }

    dimValue = dimValue / Globals.unitscale;

    if (dpi != 0) {
        switch (Globals.Unitofmeasure) {
            case 1:
                dimValue = dimValue / DPmm;
                break;
            case 2:
                dimValue = dimValue / DPInch;
                break;
            case 3:
                //dimvalue= dimvalue;
                break;
        }
    } else {
        if (!Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml) {
            dimValue = dimValue / Globals.DocObj.pages[Globals.DocObj.currentpage].OriginalScale;
        }
    }
    return dimValue;
}

export function getAngleWithXAxis(r:number, x:number, y:number, onoff:any) {
    //ranges: -22.5 to 22.5, 22.5 to 67.5, 67.5 to 112.5, 112.5 to 157.5, 157.5 to 202.5, 202.5 to 247.5, 247.5 to 292.5,292.5 to 337.5
    const ranges = [
        {
            minX:r * Math.cos(22.5 * (Math.PI / 180)),
            maxX:r * Math.cos(0)
        },
        {
            minX:r * Math.cos(67.5 * (Math.PI / 180)),
            maxX:r * Math.cos(22.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(112.5 * (Math.PI / 180)),
            maxX:r * Math.cos(67.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(157.5 * (Math.PI / 180)),
            maxX:r * Math.cos(112.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(180 * (Math.PI / 180)),
            maxX:r * Math.cos(157.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(202.5 * (Math.PI / 180)),
            maxX:r * Math.cos(247.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(247.5 * (Math.PI / 180)),
            maxX:r * Math.cos(292.5 * (Math.PI / 180))
        },
        {
            minX:r * Math.cos(292.5 * (Math.PI / 180)),
            maxX:r * Math.cos(337.5 * (Math.PI / 180))
        }
    ];

    /*
     , Direction: {
     right: 'Right',
     topRight: 'TopRight',
     forward: 'Forward',
     topLeft: 'TopLeft',
     left: 'Left',
     bottomLeft: 'BottomLeft',
     backward: 'Backward',
     bottomRight: 'BottomRight'
     }

     */

    //this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };


    //var bonoff = (onoff == 1);

    let distance = Math.sqrt((Math.abs(x) * Math.abs(x)) + (Math.abs(y) * Math.abs(y)));
    let _endNormal = new THREE.Vector2(x, y).normalize();
    //we make all positions project on circle, as we multiply scale 'r'.
    let _end = _endNormal.clone().multiplyScalar(r);
    //console.log(_end.x);
    //console.log(_end.y);
    //so we only need to compare the 2 ranges in same quadrant
    if (_end.x >= 0 && _end.y >= 0) {
        //first quadrant
        if (distance > 50) {
            if (ranges[0].maxX >= _end.x && _end.x >= ranges[0].minX) {
                //right
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = (onoff == 1);
                //return 'Right';//this.Direction.right;
            } else if (ranges[1].maxX >= _end.x && _end.x >= ranges[1].minX) {
                //top right
                //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollRight = onoff;
                //console.log('top right');
                //return 'TopRight';//this.Direction.topRight;
            } else if (ranges[2].maxX >= _end.x && _end.x >= ranges[2].minX) {
                //forward
                //console.log('forward');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = (onoff == 1);
                //return 'Forward';// this.Direction.forward;
            }
        } else {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = (onoff == 1);
            //return 'Up';
        }
    } else if (_end.x <= 0 && _end.y >= 0) {
        //second quadrant
        if (distance > 50) {
            if (ranges[2].maxX >= _end.x && _end.x >= ranges[2].minX) {
                //forward
                //console.log('forward');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveForward = (onoff == 1);
                //return 'Forward';//this.Direction.forward;
            } else if (ranges[3].maxX >= _end.x && _end.x >= ranges[3].minX) {
                //top left
                //DocObj.pages[DocObj.currentpage].walkthroughcontrol.moveState.rollLeft = onoff;
                //console.log('top left');
                //return 'TopLeft';//this.Direction.topLeft;
            } else if (ranges[4].maxX >= _end.x && _end.x >= ranges[4].minX) {
                //left
                //console.log('left');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = (onoff == 1);
                //return 'Left';//this.Direction.left;
            }
        } else {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveUp = (onoff == 1);
            //return 'Up';
        }
    } else if (_end.x <= 0 && _end.y <= 0) {
        //third quadrant
        if (distance > 50) {
            if (ranges[4].maxX >= _end.x && _end.x >= ranges[4].minX) {
                //left
                //console.log('left');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveLeft = (onoff == 1);
                //return 'Left';// this.Direction.left;
            } else if (ranges[5].maxX >= _end.x && _end.x >= ranges[5].minX) {
                //bottom left
                //console.log('bottom left');
                //return 'BottomLeft';// this.Direction.bottomLeft;
            } else if (ranges[6].maxX >= _end.x && _end.x >= ranges[6].minX) {
                //backward
                //console.log('backward');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = (onoff == 1);
                //return 'Backward';//this.Direction.backward;
            }
        } else {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = (onoff == 1);
            //return 'Down';
        }
    } else if (_end.x >= 0 && _end.y <= 0) {
        //fourth quadrant
        if (distance > 50) {
            if (ranges[6].maxX >= _end.x && _end.x >= ranges[6].minX) {
                //backward
                //console.log('backward');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveBackward = (onoff == 1);
                //return 'Backward';// this.Direction.backward;
            } else if (ranges[7].maxX >= _end.x && _end.x >= ranges[7].minX) {
                //bottom right
                //console.log('bottom right');
                //return 'BottomRight';// this.Direction.bottomRight;
            } else if (ranges[0].maxX >= _end.x && _end.x >= ranges[0].minX) {
                //right
                //console.log('right');
                Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveRight = (onoff == 1);
                //return 'Right';// this.Direction.right;
            }
        } else {
            Globals.DocObj.pages[Globals.DocObj.currentpage].walkthroughcontrol.moveDown = (onoff == 1);
            //return 'Down';
        }
    }
    //}
}
declare var ActiveXObject:any;
export function parseXML(text:any) {
    let doc;
    /*
    // TODO:JS->TS:FIX this can no longer be used in IE11
    Starting with IE11, the navigator object supports plugins and mimeTypes
    properties. In addition, the window.ActiveXObject property is hidden from the DOM.
    https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/dn423948(v=vs.85)
    */

    // if (window.ActiveXObject) { // JS->TS:INFO
    if (typeof ActiveXObject!=='undefined') { // JS->TS:INFO
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(text);
    // } else if (window.DOMParser) { // JS-TS:INFO
    } else if (typeof DOMParser!=='undefined') {
        const parser = new DOMParser();
        doc = parser.parseFromString(text, "text/xml");
    } else {
        throw new Error("Cannot parse XML");
    }


    // doc = $.parseXML(text); // TODO:JS->TS:CHECK the above code has been commented out and temporarly replaced by the jQuery method ( since this was already being used in other places)

    return doc;
}

export function convertHexrgb(hex:any) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return {
        r : r,
        g : g,
        b : b
    };
}


export function rect_rotated(x1:any,y1:any,x2:any,y2:any){
    let centercanvX = (Globals.canvasowidth / 2);
    let centercanvY = (Globals.canvasoheight / 2);
    let CanvRotRad = 0;
    let transrect = {x1:x1,x2:x2,y1:y1,y2:y2};

    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 0:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            // return transpoint; // TODO:JS->TS:CHECK replaced transpoint with transrect
            return transrect;
            break;
        case 90:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation + 180) * (Math.PI / 180);
            //CanvRotRad = (DocObj.pages[DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 270:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation - 180) * (Math.PI / 180);
            //CanvRotRad = (DocObj.pages[DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 180:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            break;
    }

    const cosangle = Math.cos(CanvRotRad);
    const sinangle = Math.sin(CanvRotRad);
    const hw = x1 - centercanvX;
    const hh = y1 - centercanvY;
    const newx = (hw * cosangle) - (hh * sinangle);
    const newy = (hw * sinangle) + (hh * cosangle);
    const hw2 = x2 - centercanvX;
    const hh2 = y2 - centercanvY;
    const newx2 = (hw2 * cosangle) - (hh2 * sinangle);
    const newy2 = (hw2 * sinangle) + (hh2 * cosangle);

    transrect = {x1:newx,y1:newy, x2:newx2, y2:newy2};
    transrect.x1 = centercanvX + transrect.x1;
    transrect.y1 = centercanvY + transrect.y1;
    transrect.x2 = centercanvX + transrect.x2;
    transrect.y2 = centercanvY + transrect.y2;

    let tempy;
    let tempx;
    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 90:
            tempy = transrect.y2;
            transrect.y2 = transrect.y1;
            transrect.y1 = tempy;
            break;
        case 270:
            tempx = transrect.x2;
            transrect.x2 = transrect.x1;
            transrect.x1 = tempx;
            break;
        case 180:
            tempy = transrect.y2;
            transrect.y2 = transrect.y1;
            transrect.y1 = tempy;
            tempx = transrect.x2;
            transrect.x2 = transrect.x1;
            transrect.x1 = tempx;
            break;
    }
    return transrect;
}

export function mouse_rotated(x:any,y:any){
    let centercanvX = (Globals.canvasowidth / 2);
    let centercanvY = (Globals.canvasoheight / 2);
    let CanvRotRad = 0;
    let transpoint = {x:x,y:y};
    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 0:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            return transpoint;
            break;
        case 90:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation + 180) * (Math.PI / 180);
            break;
        case 270:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation - 180) * (Math.PI / 180);
            break;
        case 180:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            break;
    }
    const cosangle = Math.cos(CanvRotRad);
    const sinangle = Math.sin(CanvRotRad);
    const hw = x - centercanvX;
    const hh = y - centercanvY;
    const newx = (hw * cosangle) - (hh * sinangle);
    const newy = (hw * sinangle) + (hh * cosangle);
    transpoint = {x:newx,y:newy};
    transpoint.x = centercanvX + transpoint.x;
    transpoint.y = centercanvY + transpoint.y;
    return transpoint;
}

export function rotate_pointrad(point:any, originX:any, originY:any, radians:any) {
    //var new_x_point = old_x_point * cos(Angle) - old_y_point * sin(Angle);
    //var new_y_point = old_y_point * cos(Angle) + old_x_point * sin(Angle);
    const transpx = point.x - originX;
    const transpy = point.y - originY;

    return {
        x: (Math.cos(radians) * (transpx) - Math.sin(radians) * (transpy)) + originX,
        y: (Math.sin(radians) * (transpx) + Math.cos(radians) * (transpy)) + originY
    };
}

export function rotate_point(point:any, originX:any, originY:any, angle:any) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (point.x-originX) - Math.sin(angle) * (point.y-originY) + originX,
        y: Math.sin(angle) * (point.x-originX) + Math.cos(angle) * (point.y-originY) + originY
    };
}

export function isObjectEqual(a:any, b:any) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

//Short code
export function matchRuleShort(str:any, rule:any) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

export function convertHex(hex:string, opacity:any) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}

export function setTransp(color:any, opacity:any) {
    const colors = color.split(",");
    let r = colors[0].split("(");
    r = r[1].trim();
    const g = colors[1].trim();
    const b = colors[2].trim();
    const alpha = colors[3].trim();

    return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
}

export function sqr(x:any) {
    return x * x;
}

export function dist2(v:any, w:any) {
    return sqr(v.x - w.x) + sqr(v.y - w.y);
}

export function distToSegmentSquared(p:any, v:any, w:any) {
    let l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return dist2(p, v);
    if (t > 1) return dist2(p, w);
    return dist2(p, {
        x:v.x + t * (w.x - v.x),
        y:v.y + t * (w.y - v.y)
    });
}

export function distToSegment(p:any, v:any, w:any) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
}

export function wordWrap(str:any, maxWidth:any) {
    let newLineStr = "\n";
    let done = false;
    let res = '';
    do {
        let found = false;
        // Inserts new line at first whitespace of the line
        for (let i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res + str;
}

export function testWhite(x:any) {
    const white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
}

export function wrapText(context:any, text:any, x:any, y:any, maxWidth:any, lineHeight:any) {

    let bNeedsplit = true;
    let line = '',
        lineCount = 0,
        i,
        test,
        metrics;

    let crlines = text.split('\n');
    let words:any = [];
    let splitwords:any = [];

    for (let crn = 0;crn < crlines.length;crn++){
        line = '';
        lineCount = 0;
        i = 0;
        let metrics = context.measureText(crlines[crn]);
        if (metrics.width > maxWidth ){
            words = words.concat(crlines[crn].split(' '));
            words.push('\n');
        }else{
            words.push(crlines[crn]);
            words.push('\n');
        }
    }

    for (i = 0; i < words.length; i++) {
        if(words[i] != '\n'){
            let splitresult = splitstring(context, words[i], maxWidth,splitwords);
            while(splitresult.bNeedSplit){
                splitresult = splitstring(context, splitresult.remainer, maxWidth,splitwords);
            }
        }else{
            splitwords.push(words[i]);
        }
    }

    let bConcat = true;
    for (i = 0; i < splitwords.length; i++) {
        if(splitwords[i] != '\n'){
            test = line + splitwords[i] + ' ';
            metrics = context.measureText(test);
            if (metrics.width > maxWidth && i > 0) {
                context.fillText(line, x, y);
                line = splitwords[i] + ' ';
                y += lineHeight;
                lineCount++;
            }
            else {
                line = test;
            }
        }else{
            bConcat = false;
            context.fillText(line, x, y);
            line = '';
            y += lineHeight;
        }
    }
    /*context.fillText(line, x, y);
    y += lineHeight;*/

    //var words = text.split(' ');
}

export function splitstring(context:any, text:any, maxwidth:any, resultarray:any){
    let test = text;
    let bNeedsplit = false;

    let metrics = context.measureText(test);
    while (metrics.width > maxwidth && test.length > 1) {
        // Determine how much of the word will fit
        test = test.substring(0, test.length - 1);
        metrics = context.measureText(test);
    }

    let remainer;
    if (text != test) {
        resultarray.push(test);
        remainer = text.substr(test.length);
        metrics = context.measureText(remainer);
        if(metrics.width > maxwidth){
            bNeedsplit = true;
        }else{
            bNeedsplit = false;
            resultarray.push(remainer);
        }
    }else{
        resultarray.push(test);
        bNeedsplit = false;
    }

    return {
       bNeedSplit : bNeedsplit,
       remainer : remainer,
       resultarray : resultarray
    };
}

export function insidepolygon(scalefactor:any,dx:any,dy:any,xoffset:any,yoffset:any,
                              polygon:any,mouse:any,startpoint:any){
    let intersections = 0;
    let rayx1 = startpoint.x;
    let rayy1 = startpoint.y;
    let rayx2 = mouse.x;
    let rayy2 = mouse.y;

    for (let counter = 0; counter < polygon.length; counter++) {
        let sidex1 = (polygon[counter].x1 - xoffset) * scalefactor;
        sidex1 += dx;
        let sidey1 = (polygon[counter].y1 - yoffset) * scalefactor;
        sidey1 += dy;
        let sidex2 = (polygon[counter].x2 - xoffset) * scalefactor;
        sidex2 += dx;
        let sidey2 = (polygon[counter].y2 - yoffset) * scalefactor;
        sidey2 += dy;
        intersections += areIntersecting(rayx1,rayy1,rayx2,rayy2,sidex1,sidey1,sidex2,sidey2);
    }
    //console.log(intersections);
    //var within = (intersections == 0);
    return !isEven(intersections);
    //return (intersections == 0);
}

export function GetLicense() {

    /* Andriy TODO: REMOVE, prevent checking licenses */

    //LicenseID = 50942768;
    //bLicenseAquired = true;

    //return;
    /*var formData = new FormData();

     //text/plain
     formData.append("MfcISAPICommand", "FormRequest");
     formData.append("Command", "OpenSession");
     formData.append("LicenseType", "Normal");
     formData.enctype = "text/plain";*/
    const licmode = 'LicenseMode' + 'RxView360' + Globals.OEMFlag;
    let geturl;

    if(Globals.bUseCompanyFeature){
        geturl = Globals.openUsessionurl + '&' + 'RxView360' + Globals.szLicenCompanyFeature + '&2.0' + '&' + Globals.signature;

    }else{
        geturl = Globals.openUsessionurl + '&' + 'RxView360' + Globals.OEMFlag + '&2.0' + '&' + Globals.signature;
    }

    if(Globals.OEMFlag == 'bypass'){
        Globals.LicenseID = ''+50942768; // TODO:JS->TS:CHECK check if this should be string or number
        Globals.bLicenseAquired = true;
        return;
    }

    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', geturl, false);
    } catch (e) {
        alert("Error 1 - " + e);
    }

    xhr.send();

    const xmlDoc = xhr.responseText;
    const responsArray = xmlDoc.split(':');
    if (responsArray[0] == 'OK') {
        const licensearr = responsArray[1].split(',');
        Globals.LicenseID = licensearr[0];
        Globals.bLicenseAquired = true;
        if (Globals.OEMFlag == 'OEM') {
            //$('.disableOpenClose').remove();
        }
    } else {
        alert(xmlDoc);
    }
}


export function rgbToHex(color:any) {
    let bg = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x:string) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
}


export function FreeLicense() {
    if(!Globals.bLicenseAquired){
        return;
    }
    const geturl = Globals.closesessionurl + '&' + Globals.LicenseID;
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', geturl, false);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    xhr.send();

    const xmlDoc = xhr.responseText; // TODO:JS->TS:INFO xmlDoc is not used
    Globals.bLicenseAquired = false;
    /*var responsArray = xmlDoc.split(':');
     if(responsArray[0] == 'OK'){
     var licensearr = responsArray[1].split(',');
     LicenseID = licensearr[0];
     }*/
}


export function belowlimitExtent(zoomscalefactor: any){
    let belowlimit = true;

    let pagedim = Globals.DocObj.pages[Globals.DocObj.currentpage].getpagedim();

    let wlimit = Globals.canvasowidth - 30;
    let hlimit = Globals.canvasoheight - 30;

    if((pagedim.w / zoomscalefactor) < wlimit && (pagedim.h / zoomscalefactor) < hlimit){
        belowlimit = false;
        //scalechanged = false;
        //DocObj.pages[DocObj.currentpage].zoomall();
    }

    /*if (DocObj.pages[DocObj.currentpage].usepdfjs) {

    }else if (DocObj.pages[DocObj.currentpage].usevectorxml) {


        if (DocObj.pages[DocObj.currentpage].initialscale > DocObj.pages[DocObj.currentpage].dscalevector) {
            //scalechanged = false;
            //DocObj.pages[DocObj.currentpage].zoomall();
            belowlimit = false;

        }


    } else {
        if (DocObj.pages[DocObj.currentpage].initialscale > (DocObj.pages[DocObj.currentpage].dscale / DocObj.pages[DocObj.currentpage].bitmapratio)) {
            //scalechanged = false;
            //DocObj.pages[DocObj.currentpage].zoomall();
            belowlimit = false;
        }

    }*/

    if(!Globals.bLimitZoomOut){
        belowlimit = true;
    }

    return belowlimit;
}




export function getUserInfo(){
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', Globals.userInfoURL, true);
    } catch (e) {
        alert("Error 1 - " + e);
    }
    try {
        xhr.responseType = '';
    } catch (e) {
        //alert("Error 2 - " + e);
    }

    xhr.onload = (e:any)=> {
        if (xhr.status == 200) {
            let xmlDoc:any = xhr.responseXML;  // TODO:JS->TS:INFO added any since the assignment with .documentElement changes its type
            if (xmlDoc == null || xmlDoc.documentElement == null) {
                xmlDoc = $.parseXML(xhr.responseText).documentElement;
            }
            if (xmlDoc.getElementsByTagName('ID')[0] != undefined) {
                Globals.signature = xmlDoc.getElementsByTagName('ID')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('name')[0] != undefined) {
                Globals.DisplayName = xmlDoc.getElementsByTagName('name')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('color')[0] != undefined) {
                Globals.markupcolor = xmlDoc.getElementsByTagName('color')[0].firstChild.nodeValue;
            }
            if (xmlDoc.getElementsByTagName('layer')[0] != undefined) {
                Globals.markuplayer = xmlDoc.getElementsByTagName('layer')[0].firstChild.nodeValue;
            }

            if (xmlDoc.getElementsByTagName('canChangeLayer')[0] != undefined) {
                Globals.bCanChangeLayer = (xmlDoc.getElementsByTagName('canChangeLayer')[0].firstChild.nodeValue == '1');
            }

            Globals.Userlist[0] = new Users(Globals.signature, Globals.DisplayName, Globals.markuplayer, Globals.markupcolor);
            if (RxCore_GUI_Users != undefined) {
                RxCore_GUI_Users.setUserlist(Globals.Userlist);
            }
            /*
             <ID>Demo</ID>
             <name>Demo User</name>
             <color>#ff0000</color>
             <layer>5</layer>
            */

        } else if (xhr.status == 404) {
            alert("XML could not be found");
        } else if (xhr.status == 503) {
            alert("Server is down");
        }
    };
    xhr.send();
}

// TODO:JS->TS:CHECK TODO:JS->TS:FIX !!! 'i' used outside loop
export function getTextdim(ctx:any, text:any, font: any){
    let textwidth = 0;
    let textheight = font.height;
    let textarray = text.split('\n');
    ctx.save();
    ctx.font = font.fontstringScaled;


    let i=0;
    for ( i = 0; i < textarray.length; i++) {
        let dimsel = ctx.measureText(textarray[i]);
        if (textwidth < dimsel.width){
            textwidth = dimsel.width;
        }

    }

    const hpadding = textheight / 2 * i;  // TODO:JS->TS:CHECK TODO:JS->TS:FIX !!! i used outside for
    textheight = (textheight * i) + hpadding;   // TODO:JS->TS:CHECK TODO:JS->TS:FIX !!! i used outside for
    textwidth += 10;

    ctx.restore();

    return {w:textwidth,h:textheight};
}


export function set3DToolType(selected:any, type:any) {
    if (!Globals.documentopen) {
        return;
    }
    if (Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml) {
        //unselelectallmarkup();
        const toolType = (selected) ? type : Globals.DocObj.curcontrol3D;
        //tool = new tools[toolType]();
        set_tool(toolType, {});
    }
}

export function GetPageObject() {
    return Globals.DocXMLPrint;
}

export function GetPaperWidth() {
    return Globals.PaperWidth;
}

export function GetPaperHeight() {
    return Globals.PaperHeight;
}

export function printfocus() {
    //printWin = window.open(imagedataurl,"Print");
    if(Globals.CompareObj != undefined){
        if(Globals.CompareObj.printref != undefined){
            Globals.CompareObj.printClose();
        }
    }
    Globals.printWin.focus();
    Globals.printWin.close();
}

export function getrotpoint(width:any, height:any, x:any, y:any, anglerad: any){
    const cosangle = Math.cos(anglerad);
    const sinangle = Math.sin(anglerad);

    const hw = x - width;
    const hh = y - height;

    const newx = (hw * cosangle) - (hh * sinangle);
    const newy = (hw * sinangle) + (hh * cosangle);

    const transpoint = {x:newx, y:newy};
    transpoint.x = width + transpoint.x;
    transpoint.y = height + transpoint.y;
    return transpoint;
}


export function getDocObj() {
    return Globals.DocObj;
}


export function instanceReset(){
    Globals.initialized = false;
    //defaultLayout.offsetWidth = 0;
    //defaultLayout.offsetHeight = 0;
}

export function GetTempID() {
    return Globals.DocObj.selectedmarkup;
}

export function GetDisplayName(sign:string) {
    let signfound = false;
    let displayname = 'default user';

    for (let i = 0; i < Globals.Userlist.length; i++) {
        if (Globals.Userlist[i].Signature == sign) {
            signfound = true;
            displayname = Globals.Userlist[i].DisplayName;

        }
    }
    return displayname;
}

export function getSignState(sign:string){
    let signfound = false;
    let displaystate = true;

    for (let i = 0; i < Globals.Userlist.length; i++) {
        if (Globals.Userlist[i].Signature == sign) {
            signfound = true;
            displaystate = Globals.Userlist[i].display;
        }
    }
    return displaystate;
}


export function DeactivateAll() {
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        Globals.OpenFiles[i].bActive = false;
    }
}

export function CloseCompare() {
    Globals.documentcompare = false;
    Globals.OpenfileNames = [];
    Globals.CompareObj.Close();
    for (let i = 0; i < Globals.OpenFiles.length; i++) {
        if (Globals.OpenFiles[i].Type == 'Compare') {
            Globals.OpenFiles.splice(i, 1);
        }
    }
    Globals.CompareObj = {};

    /*DocObj = OpenFiles[OpenFiles.length - 1];
     DocObj.SetActive();*/

    /*if (DocObj.pages[DocObj.currentpage].usevectorxml){
     DocObj.pages[DocObj.currentpage].draw_vector(true);
     }
     drawmarkupAll(cntximg);*/

    //DocObj.SetActive();
}


export function setSmoothingEnabledEx(enabled:any, ctx:any){
    if (ctx) {
        ctx.imageSmoothingEnabled = enabled;
        ctx.mozImageSmoothingEnabled = enabled;
        ctx.msImageSmoothingEnabled = enabled;
    }
}

export function setSmoothingEnabled(enabled:any) {
    //var context = canvaso.getContext('2d');
    if (Globals.contexto) {

        Globals.contexto.imageSmoothingEnabled = enabled;
        Globals.contexto.mozImageSmoothingEnabled = enabled;
        Globals.contexto.msImageSmoothingEnabled = enabled;
    }
}

export function printCanvas(imagedataurl:string) {
    Globals.printWin = window.open(imagedataurl, "Print");

    /*if(DocObj.pages[DocObj.currentpage].usevectorxml){
     printWin = window.open('printsvg.htm',"Print");
     }else{
     printWin = window.open(imagedataurl,"Print");
     }*/

    //    printWin.focus();
}

export function comparedrawcheck(){
    if(Globals.CompareObj.pages[1].VectorPageObj.firstdrawcompare && Globals.CompareObj.pages[0].VectorPageObj.firstdrawcompare){
        Globals.CompareObj.pages[1].VectorPageObj.firstdrawcompare = false;
        Globals.CompareObj.pages[0].VectorPageObj.firstdrawcompare = false;
        Globals.CompareObj.draw_compare(true);
    }
}

export function checkUniqueID(ID:any){
    let bidunique = true;
    for (let curdoc = 0;curdoc < Globals.OpenFiles.length;curdoc++){
        for (let curmarkup = 0; curmarkup < Globals.OpenFiles[curdoc].markuplist.length; curmarkup++) {
            if (Globals.OpenFiles[curdoc].markuplist[curmarkup] != null) {
                if(Globals.OpenFiles[curdoc].markuplist[curmarkup].getUniqueID() == ID){
                    bidunique = false;
                }
            }
        }

    }
    return bidunique;
}

export function ortho_rotate(point:any){
    let centercanvX = (Globals.canvasowidth / 2);
    let centercanvY = (Globals.canvasoheight / 2);
    let CanvRotRad = 0;
    let transpoint = {x:point.x,y:point.y};

    switch(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation){
        case 0:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            return transpoint;
            break;
        case 90:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 270:
            CanvRotRad = (Globals.DocObj.pages[Globals.DocObj.currentpage].drotation) * (Math.PI / 180);
            break;
        case 180:
            CanvRotRad = Globals.DocObj.pages[Globals.DocObj.currentpage].drotation * (Math.PI / 180);
            break;
    }

    let cosangle = Math.cos(CanvRotRad);
    let sinangle = Math.sin(CanvRotRad);

    let hw = point.x - centercanvX;
    let hh = point.y - centercanvY;

    let newx = (hw * cosangle) - (hh * sinangle);
    let newy = (hw * sinangle) + (hh * cosangle);

    transpoint = {x:newx,y:newy};
    transpoint.x = centercanvX + transpoint.x;
    transpoint.y = centercanvY + transpoint.y;

    return transpoint;
}


export function getDiagonal(width:any, height:any){
    let dimwsq = Math.pow(width, 2);
    let dimhsq = Math.pow(height, 2);
    let dimdiag = Math.sqrt((dimwsq + dimhsq));

    return dimdiag;
}

export function MousePosradiusdrwext(centre:any, mousepos:any) {
    let bIswithin = false;

    let xdiff = Math.max(centre.x, mousepos.x) - Math.min(centre.x, mousepos.x);
    let ydiff = Math.max(centre.y, mousepos.y) - Math.min(centre.y, mousepos.y);

    let radius = getDiagonal(xdiff, ydiff);

    let radiusnegx = centre.x - radius;
    let radiusposx = centre.x + radius;
    let radiusnegy = centre.y - radius;
    let radiusposy = centre.y + radius;


    if(Globals.DocObj.pages[Globals.DocObj.currentpage].drotation == 0){

        if (radiusnegx > Globals.DocObj.pages[Globals.DocObj.currentpage].startx && radiusposx < Globals.DocObj.pages[Globals.DocObj.currentpage].endx){
            if(radiusnegy > Globals.DocObj.pages[Globals.DocObj.currentpage].starty && radiusposy < Globals.DocObj.pages[Globals.DocObj.currentpage].endy){
                bIswithin = true;
            }

        }
        if (bIswithin){
            if (mousepos.x > Globals.DocObj.pages[Globals.DocObj.currentpage].startx && mousepos.x < Globals.DocObj.pages[Globals.DocObj.currentpage].endx) {
                if (mousepos.y > Globals.DocObj.pages[Globals.DocObj.currentpage].starty && mousepos.y < Globals.DocObj.pages[Globals.DocObj.currentpage].endy) {
                    bIswithin = true;
                }
            }
        }
    } else {
        const rotrect = Globals.DocObj.pages[Globals.DocObj.currentpage].rotatedRect();

        if (radiusnegx > rotrect.x && radiusposx < rotrect.w){
            if(radiusnegy > rotrect.y && radiusposy < rotrect.h){
                bIswithin = true;
            }
        }
        if(bIswithin){
            if (mousepos.x > rotrect.x && mousepos.x < rotrect.w) {
                if (mousepos.y > rotrect.y && mousepos.y < rotrect.h) {
                    bIswithin = true;
                }
            }
        }
    }
    return bIswithin;
}