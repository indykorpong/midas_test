"use strict";
function getClockAngle(hh_mm) {
    let [hour, minute] = hh_mm.split(":").map(Number);
    hour = hour % 12;
    // hour angle
    // 12 hours = 360 degrees
    // 1 hour = 30 degrees
    // 60 minutes = 30 degrees
    // 1 minute = 0.5 degrees
    const hourAngle = hour * 30 + minute * 0.5;
    // minute angle
    // 60 minutes = 360 degrees
    // 1 minute = 6 degrees
    const minuteAngle = minute * 6;
    // angle between hour and minute
    let angle = Math.abs(hourAngle - minuteAngle);
    // if angle is more than 180 degrees, subtract it from 360
    if (angle > 180) {
        angle = 360 - angle;
    }
    return angle;
}
