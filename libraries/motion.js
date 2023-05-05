// MOJA2023 ----------------------------------

var sensor = {
  x: 0,
  y: 0,
  z: 0,
  difference: 0,
  threshold: 0,
  hasNewValue: false
};

var accX=0;
var accY=0;
var accZ=0;
var accXOld=0;
var accYOld=0;
var accZOld=0;

var faktor = 100;


function doSensor(e)
  {
     accX = Math.round(faktor*e.acceleration.x);
     accY = Math.round(faktor*e.acceleration.y);
     accZ = Math.round(faktor*e.acceleration.z);

    sensor.difference =  distance3D(accX,accY,accZ, accXOld,accYOld,accZOld);

document.getElementById("showdata").innerHTML=sensor.difference;

    if (sensor.difference > sensor.threshold)
    {
       // console.log("difference: ", difference);
        sensor.x = accX;
        sensor.y = accY;
        sensor.z =accZ;
        sensor.hasNewValue = true;

        accXOld=accX;
        accYOld=accY;
        accZOld=accZ;
    }
  else
    {
        sensor.hasNewValue = false;
    }

}


//-----------3D distance used to calculate difference between new and old values ---------
 function distance3D(xNew,yNew,zNew,xOld,yOld,zOld)
{
    let a = xNew - xOld;
    let b = yNew - yOld;
    let c = zNew - zOld;

    let afstand = Math.round(Math.sqrt(a * a + b*b + c*c));
    return afstand;
}


//----------------------------REQUEST PERMISSION ON IOS DEVICeS --------------------------
function touchStarted()
{

  if (typeof DeviceMotionEvent.requestPermission === 'function')
  {
      DeviceMotionEvent.requestPermission()
            .then(permissionState => {
      if (permissionState === 'granted')
        {
                    window.addEventListener("devicemotion", doSensor, false);
                }
              })
            .catch(console.error);
     }

     else
  {
    window.addEventListener("devicemotion", doSensor, false);
  }





}
